# backend/main.py
from functions import create_facturx_xml
from fastapi import FastAPI, Response
from pydantic import BaseModel
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware

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
    print(invoice_data)
    try:
        xml_content = create_facturx_xml(invoice_data.dict())
        return Response(
            content=xml_content,
            media_type="application/xml",
            headers={"Content-Disposition": "attachment; filename=factur-x.xml"},
        )
    except Exception as e:
        return Response(content=str(e), status_code=422, media_type="text/plain")
