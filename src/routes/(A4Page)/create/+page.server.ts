// frontend/src/routes/(A4Page)/create/+page.server.ts
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/0_headerContainerDefaults";
import { FirstSectionContainerDefaults } from "$lib/types/1_firstSectionContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";
import { A4RechnungSchema } from "$lib/schema/rechnung";
import { SecondSectionContainerDefaults } from "$lib/types/2_secondSectionContainerDefaults";
import { secondSectionContainerSchema } from "$lib/schema/2_secondSectionContainer";
import { mainSectionContainerSchema } from "$lib/schema/3_mainSectionContainer";
import { MainSectionContainerDefaults } from "$lib/types/3_mainSectionContainerDefaults";
import { FourthSectionContainerDefaults } from "$lib/types/4_fourthSectionContainerDefaults";
import { fourthSectionContainerSchema } from "$lib/schema/4_fourthSectionContainer";
import { FooterContainerDefaults } from "$lib/types/5_footerContainerDefaults";
import { footerContainerSchema } from "$lib/schema/5_footerContainer";
import { getUnitCode } from "$lib/utils";
import { randomUUID } from "crypto";

export const load: PageServerLoad = async () => {
  const startTime = performance.now();
  console.log("🚀 Starting page load at:", new Date().toISOString());

  const headerForm = await superValidate(HeaderContainerDefaults, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(FirstSectionContainerDefaults, zod(firstSectionContainerSchema));
  const secondSectionForm = await superValidate(SecondSectionContainerDefaults, zod(secondSectionContainerSchema));
  const mainSectionForm = await superValidate(MainSectionContainerDefaults, zod(mainSectionContainerSchema));
  const fourthSectionForm = await superValidate(FourthSectionContainerDefaults, zod(fourthSectionContainerSchema));
  const footerForm = await superValidate(FooterContainerDefaults, zod(footerContainerSchema));

  console.log('UST: ', MainSectionContainerDefaults.RechnungsPositionen[0].ust)

  const loadTime = performance.now() - startTime;
  console.log(`✨ Page load completed in ${loadTime.toFixed(2)}ms`);

  return { headerForm: headerForm, firstSectionForm: firstSectionForm, secondSectionForm: secondSectionForm, mainSectionForm: mainSectionForm, fourthSectionForm: fourthSectionForm, footerForm: footerForm }
}

const calculateAmounts = (data) => {
  const positions = data.mainSectionForm.RechnungsPositionen.map(pos => ({
    ...pos,
    einheit: getUnitCode(pos.einheit) // Convert German label to code
  }));

  // Update the positions with converted units
  data.mainSectionForm.RechnungsPositionen = positions;
  let lineTotalAmount = 0;
  let taxTotalAmount = 0;

  // Calculate line totals and tax
  positions.forEach(pos => {
    const lineNet = pos.anzahl * pos.einheitspreis;
    const lineTax = lineNet * (pos.ustProzent / 100);
    lineTotalAmount += lineNet;
    taxTotalAmount += lineTax;
  });

  // Calculate grand total
  const grandTotalAmount = lineTotalAmount + taxTotalAmount;

  // Add calculated amounts and currency to the data
  data.calculatedAmounts = {
    currency: "EUR",
    lineTotalAmount: lineTotalAmount.toFixed(2),
    taxBasisTotalAmount: lineTotalAmount.toFixed(2),
    taxTotalAmount: taxTotalAmount.toFixed(2),
    grandTotalAmount: grandTotalAmount.toFixed(2),
    duePayableAmount: grandTotalAmount.toFixed(2)
  };

  return data;
};

export const actions: Actions = {
  default: async (event) => {
    const actionStart = performance.now();
    const requestId = randomUUID();
    console.log(`⚡ Action started at: ${new Date().toISOString()}`);
    // const formData = await event.request.formData();
    // console.log('Printing: ',jsonData)
    try {
      // Form Validation
      const validationStart = performance.now();

      const A4Form = await superValidate(event, zod(A4RechnungSchema));
      console.log('objectForm: ', A4Form)


      console.log(`📝 Form validation took: ${(performance.now() - validationStart).toFixed(2)}ms`);

      if (!A4Form.valid) {
        console.log('❌ Form validation failed');
        return fail(400, { objectForm: A4Form });
      }

      // Data Preparation
      const A4Data = JSON.stringify(A4Form.data) // passing down the whole header form to the url
      // console.log(A4Data)

      const printUrl = `${event.url.origin}/read?data=${encodeURIComponent(A4Data)}`;
      console.log('PrintURL', printUrl)

      // const RechnungsDaten = { Absenderdaten: form.data };

      // PDF Generation
      const pdfStart = performance.now();
      console.log('📄 Starting PDF generation request');

      const response = await event.fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ printUrl, requestId })
      });

      const result = await response.json();
      console.log(`📄 PDF generation took: ${(performance.now() - pdfStart).toFixed(2)}ms`);

      if (!result.success) {
        console.log('❌ PDF generation failed');
        return fail(500, {
          A4Form,
          message: 'PDF generation failed'
        });
      }

      const pdfPath: string = result.pdfPath

      const testInvoice = {
        "ubl:Invoice": {
          "cbc:CustomizationID": "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
          "cbc:ProfileID": "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
          "cbc:ID": 1234567890,
          "cbc:IssueDate": "2024-09-24",
          "cbc:DueDate": "2024-10-08",
          "cbc:InvoiceTypeCode": "380",
          "cbc:DocumentCurrencyCode": "EUR",
          "cbc:BuyerReference": "dept0815",
          "cac:InvoicePeriod": {
            "cbc:StartDate": "2024-04-23",
            "cbc:EndDate": "2024-09-23"
          },
          "cac:OrderReference": {
            "cbc:ID": "A7450891"
          },
          "cac:AccountingSupplierParty": {
            "cac:Party": {
              "cbc:EndpointID": "DE202526944",
              "cbc:EndpointID@schemeID": "9930",
              "cac:PartyName": {
                "cbc:Name": "Acme Ltd."
              },
              "cac:PostalAddress": {
                "cbc:StreetName": "42 Milky Way",
                "cbc:CityName": "Faraway",
                "cbc:PostalZone": 1234,
                "cac:Country": {
                  "cbc:IdentificationCode": "DE"
                }
              },
              "cac:PartyTaxScheme": [
                {
                  "cbc:CompanyID": "DE202526944",
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              ],
              "cac:PartyLegalEntity": {
                "cbc:RegistrationName": "Acme Ltd."
              },
              "cac:Contact": {
                "cbc:Name": "John Doe",
                "cbc:Telephone": "+49 221 765 43-21",
                "cbc:ElectronicMail": "jdoe@acme.com"
              }
            }
          },
          "cac:AccountingCustomerParty": {
            "cac:Party": {
              "cbc:EndpointID": "DE427984273",
              "cbc:EndpointID@schemeID": "9930",
              "cac:PartyName": {
                "cbc:Name": "Globex Corp."
              },
              "cac:PostalAddress": {
                "cbc:StreetName": "Globex Corp.",
                "cbc:CityName": "Springfield",
                "cbc:PostalZone": 80085,
                "cac:Country": {
                  "cbc:IdentificationCode": "DE"
                }
              },
              "cac:PartyTaxScheme": {
                "cbc:CompanyID": "DE427984273",
                "cac:TaxScheme": {
                  "cbc:ID": "VAT"
                }
              },
              "cac:PartyLegalEntity": {
                "cbc:RegistrationName": "Acme Ltd."
              }
            }
          },
          "cac:Delivery": {
            "cbc:ActualDeliveryDate": "2024-09-23",
            "cac:DeliveryLocation": {
              "cac:Address": {
                "cbc:StreetName": "Globex Corp.",
                "cbc:CityName": "Springfield",
                "cbc:PostalZone": 80085,
                "cac:Country": {
                  "cbc:IdentificationCode": "DE"
                }
              }
            },
            "cac:DeliveryParty": {
              "cac:PartyName": {
                "cbc:Name": "Globex Corp."
              }
            }
          },
          "cac:PaymentMeans": [
            {
              "cbc:PaymentMeansCode": 30,
              "cbc:PaymentMeansCode@name": "Bank Transfer",
              "cbc:PaymentID": "Invoice No. 1234567890",
              "cac:PayeeFinancialAccount": {
                "cbc:ID": "DE370800400123456789",
                "cbc:Name": "Acme Ltd.",
                "cac:FinancialInstitutionBranch": {
                  "cbc:ID": "DRESDEFF370"
                }
              }
            }
          ],
          "cac:PaymentTerms": {
            "cbc:Note": "Payable without deductions by October 08, 2024."
          },
          "cac:AllowanceCharge": [
            {
              "cbc:ChargeIndicator": "true",
              "cbc:AllowanceChargeReasonCode": "FC",
              "cbc:AllowanceChargeReason": "Freight costs",
              "cbc:Amount": 47.9,
              "cbc:Amount@currencyID": "EUR",
              "cbc:BaseAmount": 25597.74,
              "cbc:BaseAmount@currencyID": "EUR",
              "cac:TaxCategory": {
                "cbc:ID": "K",
                "cbc:Percent": 0,
                "cac:TaxScheme": {
                  "cbc:ID": "VAT"
                }
              }
            },
            {
              "cbc:ChargeIndicator": "false",
              "cbc:AllowanceChargeReasonCode": 95,
              "cbc:AllowanceChargeReason": "Discount",
              "cbc:MultiplierFactorNumeric": 3,
              "cbc:Amount": 767.93,
              "cbc:Amount@currencyID": "EUR",
              "cbc:BaseAmount": 25597.74,
              "cbc:BaseAmount@currencyID": "EUR",
              "cac:TaxCategory": {
                "cbc:ID": "AE",
                "cbc:Percent": 0,
                "cac:TaxScheme": {
                  "cbc:ID": "VAT"
                }
              }
            }
          ],
          "cac:TaxTotal": [
            {
              "cbc:TaxAmount": 42.28,
              "cbc:TaxAmount@currencyID": "EUR",
              "cac:TaxSubtotal": [
                {
                  "cbc:TaxableAmount": 15.24,
                  "cbc:TaxableAmount@currencyID": "EUR",
                  "cbc:TaxAmount": 2.9,
                  "cbc:TaxAmount@currencyID": "EUR",
                  "cac:TaxCategory": {
                    "cbc:ID": "S",
                    "cbc:Percent": 19,
                    "cac:TaxScheme": {
                      "cbc:ID": "VAT"
                    }
                  }
                },
                {
                  "cbc:TaxableAmount": 562.5,
                  "cbc:TaxableAmount@currencyID": "EUR",
                  "cbc:TaxAmount": 39.38,
                  "cbc:TaxAmount@currencyID": "EUR",
                  "cac:TaxCategory": {
                    "cbc:ID": "S",
                    "cbc:Percent": 7,
                    "cac:TaxScheme": {
                      "cbc:ID": "VAT"
                    }
                  }
                },
                {
                  "cbc:TaxableAmount": 18792.07,
                  "cbc:TaxableAmount@currencyID": "EUR",
                  "cbc:TaxAmount": 0,
                  "cbc:TaxAmount@currencyID": "EUR",
                  "cac:TaxCategory": {
                    "cbc:ID": "AE",
                    "cbc:Percent": 0,
                    "cbc:TaxExemptionReasonCode": "VATEX-EU-AE",
                    "cac:TaxScheme": {
                      "cbc:ID": "VAT"
                    }
                  }
                },
                {
                  "cbc:TaxableAmount": 3315,
                  "cbc:TaxableAmount@currencyID": "EUR",
                  "cbc:TaxAmount": 0,
                  "cbc:TaxAmount@currencyID": "EUR",
                  "cac:TaxCategory": {
                    "cbc:ID": "Z",
                    "cbc:Percent": 0,
                    "cac:TaxScheme": {
                      "cbc:ID": "VAT"
                    }
                  }
                },
                {
                  "cbc:TaxableAmount": 2192.9,
                  "cbc:TaxableAmount@currencyID": "EUR",
                  "cbc:TaxAmount": 0,
                  "cbc:TaxAmount@currencyID": "EUR",
                  "cac:TaxCategory": {
                    "cbc:ID": "K",
                    "cbc:Percent": 0,
                    "cbc:TaxExemptionReasonCode": "VATEX-EU-IC",
                    "cac:TaxScheme": {
                      "cbc:ID": "VAT"
                    }
                  }
                }
              ]
            }
          ],
          "cac:LegalMonetaryTotal": {
            "cbc:LineExtensionAmount": 25597.74,
            "cbc:LineExtensionAmount@currencyID": "EUR",
            "cbc:TaxExclusiveAmount": 24877.71,
            "cbc:TaxExclusiveAmount@currencyID": "EUR",
            "cbc:TaxInclusiveAmount": 24919.99,
            "cbc:TaxInclusiveAmount@currencyID": "EUR",
            "cbc:AllowanceTotalAmount": 767.93,
            "cbc:AllowanceTotalAmount@currencyID": "EUR",
            "cbc:ChargeTotalAmount": 47.9,
            "cbc:ChargeTotalAmount@currencyID": "EUR",
            "cbc:PayableAmount": 24919.99,
            "cbc:PayableAmount@currencyID": "EUR"
          },
          "cac:InvoiceLine": [
            {
              "cbc:ID": 1,
              "cbc:InvoicedQuantity": 120,
              "cbc:InvoicedQuantity@unitCode": "HUR",
              "cbc:LineExtensionAmount": 10200,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Design",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "AE",
                  "cbc:Percent": 0,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 85,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            },
            {
              "cbc:ID": 2,
              "cbc:InvoicedQuantity": 2,
              "cbc:InvoicedQuantity@unitCode": "H87",
              "cbc:LineExtensionAmount": 15.24,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Printer paper 500 sheets",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "S",
                  "cbc:Percent": 19,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 7.62,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            },
            {
              "cbc:ID": 3,
              "cbc:InvoicedQuantity": 3,
              "cbc:InvoicedQuantity@unitCode": "DAY",
              "cbc:LineExtensionAmount": 562.5,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Hotel room",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "S",
                  "cbc:Percent": 7,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 187.5,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            },
            {
              "cbc:ID": 4,
              "cbc:InvoicedQuantity": 17,
              "cbc:InvoicedQuantity@unitCode": "HUR",
              "cbc:LineExtensionAmount": 3315,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Setup static site generator",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "Z",
                  "cbc:Percent": 0,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 195,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            },
            {
              "cbc:ID": 5,
              "cbc:InvoicedQuantity": 48,
              "cbc:InvoicedQuantity@unitCode": "HUR",
              "cbc:LineExtensionAmount": 9360,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Template programming",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "AE",
                  "cbc:Percent": 0,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 195,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            },
            {
              "cbc:ID": 6,
              "cbc:InvoicedQuantity": 11,
              "cbc:InvoicedQuantity@unitCode": "HUR",
              "cbc:LineExtensionAmount": 2145,
              "cbc:LineExtensionAmount@currencyID": "EUR",
              "cac:Item": {
                "cbc:Name": "Penetration test",
                "cac:ClassifiedTaxCategory": {
                  "cbc:ID": "K",
                  "cbc:Percent": 0,
                  "cac:TaxScheme": {
                    "cbc:ID": "VAT"
                  }
                }
              },
              "cac:Price": {
                "cbc:PriceAmount": 195,
                "cbc:PriceAmount@currencyID": "EUR"
              }
            }
          ]
        }
      }

      const formData = new FormData()

      formData.append('Invoice', JSON.stringify(testInvoice))
      formData.append('pdfPath', pdfPath)


      // generate json for factur-x xml generation in FastAPI
      const PythonA4Data = calculateAmounts(A4Form.data);
      // console.log(PythonA4Data)
      const xmlResponse = await event.fetch('/api/create-invoice/UBL', {
        method: 'POST',
        body: formData
      });

      if (!xmlResponse.ok) {
        console.log('❌ XML generation failed');
        return fail(500, {
          A4Form,
          message: 'XML generation failed'
        });
      }

      const xmlContent = await xmlResponse.text();
      console.log(xmlContent)
      const totalTime = performance.now() - actionStart;
      console.log(`✅ Action completed successfully in ${totalTime.toFixed(2)}ms`);

      return {
        A4Form,
        success: true,
        pdfPath: result.pdfPath,
        xmlContent: xmlContent,
        message: `Form posted, PDF and XML generated successfully in ${totalTime.toFixed(2)}ms!`
      };

    } catch (error: any) {
      const errorTime = performance.now() - actionStart;
      console.error(`❌ Error after ${errorTime.toFixed(2)}ms:`, error);

      return fail(500, {
        form: error.form,
        message: 'Failed to generate PDF',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      const finalTime = performance.now() - actionStart;
      console.log(`🏁 Total action time: ${finalTime.toFixed(2)}ms`);
    }
  }
};
