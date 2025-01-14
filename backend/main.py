# backend/main.py
from functions import create_facturx_xml
from fastapi import FastAPI, Response
from pydantic import BaseModel
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
from facturx import xml_check_xsd


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




@app.post("/generate-facturx")
async def generate_facturx(invoice_data: InvoiceData):
    try:
        # Generate XML content
        xml_content = create_facturx_xml(invoice_data.dict())

        # Save to temporary file and validate
        with NamedTemporaryFile(delete=False, suffix=".xml") as temp_file:
            temp_file.write(xml_content)
            temp_file.flush()

            # Validate the XML
            try:
                with open(temp_file.name, "rb") as xml_file:
                    xml_check_xsd(xml_file, flavor="factur-x", level="basic")
            except Exception as validation_error:
                return Response(
                    content=f"XML Validation failed: {str(validation_error)}",
                    status_code=422,
                    media_type="text/plain",
                )

        # If validation passes, return the XML
        return Response(
            content=xml_content,
            media_type="application/xml",
            headers={"Content-Disposition": "attachment; filename=factur-x.xml"},
        )

    except Exception as e:
        return Response(
            content=f"XML Generation failed: {str(e)}",
            status_code=422,
            media_type="text/plain",
        )
