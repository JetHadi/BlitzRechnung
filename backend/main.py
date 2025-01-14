# backend/main.py
from functions import create_facturx_xml
from fastapi import FastAPI, Response, Header
from pydantic import BaseModel
from typing import Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
from facturx import xml_check_xsd, generate_from_file
import logging
import os
from lxml import etree

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


# Set up logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


@app.post("/generate-facturx")
async def generate_facturx(
    invoice_data: InvoiceData, x_request_id: Optional[str] = Header(None)
):
    try:
        logger.debug("Starting generate_facturx with request_id: %s", x_request_id)
        request_id = invoice_data.requestId or x_request_id
        if not request_id:
            return Response(
                content="Request ID is required",
                status_code=400,
                media_type="text/plain",
            )

        # Generate XML content
        logger.debug("Generating XML content")
        xml_content = create_facturx_xml(invoice_data.dict())

        # Ensure proper encoding when writing
        if isinstance(xml_content, str):
            xml_content = xml_content.encode('utf-8')

        # If the content doesn't start with XML declaration, add it
        if not xml_content.startswith(b'<?xml'):
            xml_content = b'<?xml version="1.0" encoding="UTF-8"?>\n' + xml_content

        # Validate XML structure before saving
        try:
            etree.fromstring(xml_content)
        except Exception as e:
            return Response(
                content=f"Invalid XML structure: {str(e)}",
                status_code=422,
                media_type="text/plain"
            )

        # Create directories if they don't exist
        base_dir = os.path.join(os.getcwd(), "shared")
        xml_dir = os.path.join(base_dir, "xml")
        output_dir = os.path.join(base_dir, "output")
        os.makedirs(xml_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        # Define file paths
        xml_filename = f"invoice-{request_id}.xml"
        xml_path = os.path.join(xml_dir, xml_filename)
        pdf_path = os.path.join(base_dir, "pdfs", f"invoice-{request_id}.pdf")
        output_path = os.path.join(output_dir, f"invoice-{request_id}-facturx.pdf")

        logger.debug(
            "File paths: XML=%s, PDF=%s, Output=%s", xml_path, pdf_path, output_path
        )

        # Save XML
        logger.debug("Saving XML file")
        with open(xml_path, "wb") as xml_file:
            xml_file.write(xml_content)

        # Check files exist
        if not os.path.exists(pdf_path):
            logger.error("PDF file not found at: %s", pdf_path)
            return Response(
                content=f"PDF file not found for request ID: {request_id}",
                status_code=404,
                media_type="text/plain",
            )
        if not os.path.exists(xml_path):
            logger.error("XML file not found at: %s", xml_path)
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

        with open(xml_path, 'rb') as xml_file:
            xml_content = xml_file.read()

        logger.debug("Generating Factur-X PDF")
        try:
            generate_from_file(
                pdf_file=pdf_path,
                xml=xml_content,
                output_pdf_file=output_path,
                pdf_metadata=pdf_metadata,
                check_xsd=True,
                level="en16931",
                lang="de-DE",
                afrelationship="alternative",
            )
        except Exception as gen_error:
            logger.error("Error generating Factur-X PDF: %s", str(gen_error))
            raise

        logger.debug("Reading generated PDF")
        try:
            with open(output_path, "rb") as pdf_file:
                content = pdf_file.read()
        except Exception as read_error:
            logger.error("Error reading generated PDF: %s", str(read_error))
            raise

        logger.debug("Cleaning up output file")
        # if os.path.exists(output_path):
        #     os.remove(output_path)

        return Response(
            content=content,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=invoice-{request_id}-facturx.pdf",
                "X-Request-ID": request_id,
            },
        )

    except Exception as e:
        logger.error("Failed to generate Factur-X PDF: %s", str(e), exc_info=True)
        return Response(
            content=f"Failed to generate Factur-X PDF: {str(e)}",
            status_code=500,
            media_type="text/plain",
        )
