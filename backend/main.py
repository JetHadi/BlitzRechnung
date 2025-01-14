# backend/main.py
from functions import create_facturx_xml
from fastapi import FastAPI, Response, Header
from pydantic import BaseModel
from typing import Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
from facturx import xml_check_xsd, generate_from_file

import os


app = FastAPI()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://blitzrechnung-web:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


class InvoiceData(BaseModel):
    headerForm: Dict[str, Any]
    firstSectionForm: Dict[str, Any]
    secondSectionForm: Dict[str, Any]
    mainSectionForm: Dict[str, Any]
    fourthSectionForm: Dict[str, Any]
    footerForm: Dict[str, Any]
    calculatedAmounts: Dict[str, Any]
    requestId: str


@app.post("/generate-facturx")
async def generate_facturx(
    invoice_data: InvoiceData, x_request_id: Optional[str] = Header(None)
):
    try:
        request_id = invoice_data.requestId or x_request_id
        if not request_id:
            return Response(
                content="Request ID is required",
                status_code=400,
                media_type="text/plain",
            )

        # Generate XML content
        xml_content = create_facturx_xml(invoice_data.dict())

        # Create a directory for XMLs if it doesn't exist
        xml_dir = os.path.join(os.getcwd(), "shared", "xml")
        os.makedirs(xml_dir, exist_ok=True)

        # Create XML file with request ID as prefix
        xml_filename = f"invoice-{request_id}.xml"
        xml_path = os.path.join(xml_dir, xml_filename)

        # Save and validate XML
        with open(xml_path, "wb") as xml_file:
            xml_file.write(xml_content)

        # Validate the XML
        # try:
        #     with open(xml_path, "rb") as xml_file:
        #         xml_check_xsd(xml_file, flavor="factur-x", level="en16931")
        # except Exception as validation_error:
        #     os.remove(xml_path)  # Clean up invalid file
        #     return Response(
        #         content=f"XML Validation failed: {str(validation_error)}",
        #         status_code=422,
        #         media_type="text/plain",
        #     )

        # Construct file paths
        base_dir = os.path.join(os.getcwd(), "shared")
        pdf_path = os.path.join(base_dir, "pdfs", f"invoice-{request_id}.pdf")
        xml_path = os.path.join(base_dir, "xml", f"invoice-{request_id}.xml")
        output_path = os.path.join(
            base_dir, "output", f"invoice-{request_id}-facturx.pdf"
        )

        # Check if files exist
        if not os.path.exists(pdf_path):
            return Response(
                content=f"PDF file not found for request ID: {request_id}",
                status_code=404,
                media_type="text/plain",
            )
        if not os.path.exists(xml_path):
            return Response(
                content=f"XML file not found for request ID: {request_id}",
                status_code=404,
                media_type="text/plain",
            )
        
        pdf_metadata = {
            "author": "Company Name GmbH",
            "keywords": "Invoice, Electronic Invoice, Factur-X",
            "title": "Invoice 2024-001",
            "subject": "Invoice from Company Name GmbH",
        }

        # Generate Factur-X PDF
        generate_from_file(
            pdf_file=pdf_path,
            xml = xml_path,
            output_pdf_file=output_path,
            pdf_metadata = pdf_metadata,
            check_xsd=True,
            level="en16931",
            lang='de-DE',
            afrelationship='alternative'
            
        )

        # Read generated PDF and return it
        with open(output_path, "rb") as pdf_file:
            content = pdf_file.read()

        # Clean up the generated file
        os.remove(output_path)

        return Response(
            content=content,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=invoice-{request_id}-facturx.pdf",
                "X-Request-ID": request_id,
            },
        )

    except Exception as e:
        return Response(
            content=f"Failed to generate Factur-X PDF: {str(e)}",
            status_code=500,
            media_type="text/plain",
        )
