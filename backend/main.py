# backend/main.py
from functions import create_facturx_xml
from fastapi import FastAPI, Response, Header
from pydantic import BaseModel
from typing import Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
from facturx import xml_check_xsd
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
        try:
            with open(xml_path, "rb") as xml_file:
                xml_check_xsd(xml_file, flavor="factur-x", level="basic")
        except Exception as validation_error:
            os.remove(xml_path)  # Clean up invalid file
            return Response(
                content=f"XML Validation failed: {str(validation_error)}",
                status_code=422,
                media_type="text/plain",
            )

        return Response(
            content=xml_content,
            media_type="application/xml",
            headers={
                "Content-Disposition": f"attachment; filename={xml_filename}",
                "X-Request-ID": request_id,
            },
        )

    except Exception as e:
        return Response(
            content=f"XML Generation failed: {str(e)}",
            status_code=422,
            media_type="text/plain",
        )
