// frontend/src/routes/(A4Page)/create/+page.server.ts
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/0_headerContainerDefaults";
import { FirstSectionContainerDefaults } from "$lib/types/1_firstSectionContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";
import { A4RechnungSchema, type A4RechnungType } from "$lib/schema/rechnung";
import { SecondSectionContainerDefaults } from "$lib/types/2_secondSectionContainerDefaults";
import { secondSectionContainerSchema } from "$lib/schema/2_secondSectionContainer";
import { mainSectionContainerSchema } from "$lib/schema/3_mainSectionContainer";
import { MainSectionContainerDefaults } from "$lib/types/3_mainSectionContainerDefaults";
import { FourthSectionContainerDefaults } from "$lib/types/4_fourthSectionContainerDefaults";
import { fourthSectionContainerSchema } from "$lib/schema/4_fourthSectionContainer";
import { FooterContainerDefaults } from "$lib/types/5_footerContainerDefaults";
import { footerContainerSchema } from "$lib/schema/5_footerContainer";
//import { getUnitCode } from "$lib/utils";
import { randomUUID } from "crypto";
import { DefaultUBLInvoice, type BusinessTerms } from "$lib/invoice/UBL/createDefaults/defaultUBLInvoice";

export const load: PageServerLoad = async () => {
  const startTime = performance.now();
  console.log("🚀 Starting page load at:", new Date().toISOString());

  const headerForm = await superValidate(HeaderContainerDefaults, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(FirstSectionContainerDefaults, zod(firstSectionContainerSchema));
  const secondSectionForm = await superValidate(SecondSectionContainerDefaults, zod(secondSectionContainerSchema));
  const mainSectionForm = await superValidate(MainSectionContainerDefaults, zod(mainSectionContainerSchema));
  const fourthSectionForm = await superValidate(FourthSectionContainerDefaults, zod(fourthSectionContainerSchema));
  const footerForm = await superValidate(FooterContainerDefaults, zod(footerContainerSchema));

  const loadTime = performance.now() - startTime;
  console.log(`✨ Page load completed in ${loadTime.toFixed(2)}ms`);

  return { headerForm: headerForm, firstSectionForm: firstSectionForm, secondSectionForm: secondSectionForm, mainSectionForm: mainSectionForm, fourthSectionForm: fourthSectionForm, footerForm: footerForm }
}

const getUnitCode = (unit: string): string => {
  const unitMapping: { [key: string]: string } = {
    'Stück': 'EA',    // one; unit (preferred code for pieces)
    'Stunde': 'HUR',   // hour
    'Tag': 'DAY',      // day
    'Kilogramm': 'KGM', // kilogram
    'Meter': 'MTR',    // meter
    'Liter': 'LTR'     // liter
  };

  return unitMapping[unit] || 'C62'; // default to C62 if unit not found
};


// FIXME: add correct data type for calculate Amounts
const calculateAmounts = (data : any) => {
  const positions = data.mainSectionForm.RechnungsPositionen.map((pos: { einheit: string; }) => ({
    ...pos,
    einheit: getUnitCode(pos.einheit)
  }));

  data.mainSectionForm.RechnungsPositionen = positions;
  let lineTotalAmount = 0;
  let taxTotalAmount = 0;

  // Initialize arrays for each BT
  let BT_116: (string | undefined)[] = [];
  let BT_117: (string | undefined)[] = [];
  let BT_118: (string | undefined)[] = [];
  let BT_119: (string | undefined)[] = [];
  let BT_120: (string | undefined)[] = [];
  let BT_121: (string | undefined)[] = [];
  let BT_126: (string | undefined)[] = [];
  let BT_129: (string | undefined)[] = [];
  let BT_130: (string | undefined)[] = [];
  let BT_131: (string | undefined)[] = [];
  let BT_146: (string | undefined)[] = [];
  let BT_151: (string | undefined)[] = [];
  let BT_152: (string | undefined)[] = [];
  let BT_153: (string | undefined)[] = [];

  interface TaxGroup {
    baseAmount: number;
    taxAmount: number;
  }

  interface TaxGroups {
    [key: string]: TaxGroup;
  }

  // Group positions by tax percentage to maintain order
  const taxGroups: TaxGroups = {};

  positions.forEach((pos : any, index : number) => {
    const lineNet = pos.anzahl * pos.einheitspreis;
    const lineTax = lineNet * (pos.ustProzent / 100);
    lineTotalAmount += lineNet;
    taxTotalAmount += lineTax;

    // Add position-specific BTs
    BT_126.push((index + 1).toString());
    BT_129.push(pos.anzahl.toString());
    BT_130.push(pos.einheit);
    BT_131.push(lineNet.toFixed(2));
    BT_146.push(pos.einheitspreis.toFixed(2));
    BT_151.push(pos.ustProzent === '0' ? 'E' : 'S');
    BT_152.push(pos.ustProzent);
    BT_153.push(pos.bezeichnung);

    if (!taxGroups[pos.ustProzent]) {
      taxGroups[pos.ustProzent] = {
        baseAmount: 0,
        taxAmount: 0
      };
    }
    taxGroups[pos.ustProzent].baseAmount += lineNet;
    taxGroups[pos.ustProzent].taxAmount += lineTax;
  });


  // Convert groups to ordered arrays
  Object.entries(taxGroups).forEach(([taxRate, amounts]) => {
    BT_116.push(amounts.baseAmount.toFixed(2));
    BT_117.push(amounts.taxAmount.toFixed(2));
    BT_119.push(taxRate);

    if (taxRate === '0') {
      BT_118.push('E');
      BT_120.push('Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG');
      BT_121.push(undefined);
    } else {
      BT_118.push('S');
      BT_120.push(undefined);
      BT_121.push(undefined);
    }
  });

  const grandTotalAmount = lineTotalAmount + taxTotalAmount;

  data.calculatedAmounts = {
    currency: "EUR",
    lineTotalAmount: lineTotalAmount.toFixed(2),
    taxBasisTotalAmount: lineTotalAmount.toFixed(2),
    taxTotalAmount: taxTotalAmount.toFixed(2),
    grandTotalAmount: grandTotalAmount.toFixed(2),
    duePayableAmount: grandTotalAmount.toFixed(2),
    BT_116,
    BT_117,
    BT_118,
    BT_119,
    BT_120,
    BT_121,
    BT_126,
    BT_129,
    BT_130,
    BT_131,
    BT_146,
    BT_151,
    BT_152,
    BT_153
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

      console.log(`📝 Form validation took: ${(performance.now() - validationStart).toFixed(2)}ms`);

      if (!A4Form.valid) {
        console.log('❌ Form validation failed');
        return fail(400, { objectForm: A4Form });
      }

      // Data Preparation for pdf creation
      const A4Data = JSON.stringify(A4Form.data) // passing down the whole header form to the url
      // console.log(A4Data)

      /*
      PDF creation process
      */
      const printUrl = `${event.url.origin}/read?data=${encodeURIComponent(A4Data)}`;
      console.log('PrintURL', printUrl)

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

      /*
      XML creation process
      */
      const invoiceData = calculateAmounts(A4Form.data)
      // console.log(invoiceData)
      const testInvoice = {
        "ubl:Invoice": {
          "cbc:CustomizationID": "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
          "cbc:ProfileID": "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
          "cbc:ID": 2222222,
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

      function addDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
      }


      const mappedBT: BusinessTerms = {
        BT_1: invoiceData.firstSectionForm.rechnungsnummer,
        BT_2: invoiceData.firstSectionForm.rechnungsdatum.toISOString().slice(0, 10),
        BT_3: "380", // TODO: maybe have a look at other BT-3 values if necessary
        BT_5: "EUR",
        BT_9: invoiceData.firstSectionForm.faelligkeitsdatum?.toISOString().slice(0, 10) || addDays(invoiceData.firstSectionForm.rechnungsdatum, 30).toISOString().slice(0, 10),
        // FIXME: Der Benutzer sollte den Hinweis bekommen, dass hier die juristisch eingetragene Person als Absendername (BT-27) angegeben werden muss
        BT_27: invoiceData.headerForm.absender_firma || invoiceData.headerForm.absender_name,
        BT_31: invoiceData.footerForm.absender_ustId,
        BT_32: invoiceData.footerForm.absender_steuernummer,
        // sollte übermittelt werden, falls Kleinunternehmer-Regelung stattfindet
        // FIXME: add Kleinunternehmer Boolean to Form
        BT_33: invoiceData.firstSectionForm.Kleinunternehmer ? '„Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG“' : undefined,
        BT_34: invoiceData.footerForm.absender_ustId ? {
          value: invoiceData.footerForm.absender_ustId,
          schemeID: "9930"
        } : undefined,
        BT_35: invoiceData.headerForm.absender_strasse,
        BT_37: invoiceData.headerForm.absender_ort,
        BT_38: invoiceData.headerForm.absender_plz,
        BT_40: "DE",
        // FIXME: Der Benutzer sollte eindeutig zwischen Firmenname und Kontaktperson unterscheiden
        BT_41: invoiceData.headerForm.absender_name || undefined,
        BT_42: invoiceData.headerForm.absender_telefon,
        BT_43: invoiceData.headerForm.absender_email,
        BT_44: invoiceData.firstSectionForm.empfaenger_firma || invoiceData.firstSectionForm.empfaenger_name,
        BT_45: invoiceData.firstSectionForm.empfaenger_firma ? invoiceData.firstSectionForm.empfaenger_name : undefined,
        // TODO: integrte europian invoices and therefore ustd for the buyer
        // FIXME: for UBL BT-49 is necessary for CII not. It will be made optional temporarily
        BT_49: {
          value: 'mail',
          schemeID: '9930'
        },
        BT_50: invoiceData.firstSectionForm.empfaenger_strasse,
        BT_52: invoiceData.firstSectionForm.empfaenger_ort,
        BT_53: invoiceData.firstSectionForm.empfaenger_plz,
        BT_55: "DE",
        // FIXME: Falls Zahlungsempfänger anders als Verkäufer ist, dann muss BT-59 angegeben werden.
        //BT_59: invoiceData.headerForm.absender_firma || invoiceData.headerForm.absender_name,
        // Zeitpunkt der Lieferung muss in DE mit angegeben werden, wenn keine genaue Angabe dann gilt Rechnungsdatum
        BT_72: invoiceData.firstSectionForm.rechnungsdatum.toISOString().slice(0, 10),
        // BT_59: invoiceData.headerForm.absender_firma || invoiceData.headerForm.absender_name,
        BT_106: invoiceData.calculatedAmounts.lineTotalAmount,
        BT_109: invoiceData.calculatedAmounts.taxBasisTotalAmount,
        BT_110: invoiceData.calculatedAmounts.taxTotalAmount,
        BT_112: invoiceData.calculatedAmounts.grandTotalAmount,
        BT_115: invoiceData.calculatedAmounts.duePayableAmount,
        /*
        für jeden Steuersatz muss ein eigener Eintrag hier erstellt werden.
        Ab hier sollte ein eigener Array entstehen
        //BG-23 -- Umsatzsteuer-Auflistung für die verschieden angefallenen Umsatzsteuern
        */
        BT_116: invoiceData.calculatedAmounts.BT_116, // Nettobetrag auf dem Steuer angewendet wird
        BT_117: invoiceData.calculatedAmounts.BT_117, // Steuerbetrag in Euro der dadurch entsteht
        BT_118: invoiceData.calculatedAmounts.BT_118, // Kategorie der Steuer -- Für 19% und 7% gilt Code = 'S', Bei Kleinunternehmer welche keine Umsatzszeuer ausweisen gilt Code = 'E'
        BT_119: invoiceData.calculatedAmounts.BT_119, // angefallener Steuersatz in Prozent
        BT_120: invoiceData.calculatedAmounts.BT_120,

        //BG-30 -- Rechnungspositions-Auflistungen
        BT_126: invoiceData.calculatedAmounts.BT_126, // Position des Artikels in der Liste (index)
        BT_129: invoiceData.calculatedAmounts.BT_129, // In Rechnung gestellte Menge der Position
        BT_130: invoiceData.calculatedAmounts.BT_130, // Code der Maßeinheit der in rechnung gestellten Menge
        BT_131: invoiceData.calculatedAmounts.BT_131, // Nettobetrag der in Rechnung gestellten Menge (Menge*Einheitspreis)
        BT_146: invoiceData.calculatedAmounts.BT_146, // Netto-Einheitspreis des Artikels
        BT_151: invoiceData.calculatedAmounts.BT_151, // Umsatzsteuerkategorie-Code (Entweder 'S' oder 'E')
        BT_152: invoiceData.calculatedAmounts.BT_152, // Umsatzsteuersatz der Position in Prozent
        BT_153: invoiceData.calculatedAmounts.BT_153,
      }

      const defaultUBLInvoice = new DefaultUBLInvoice;
      const createdXMLInvoice = defaultUBLInvoice.getInvoice(mappedBT)

      const formData = new FormData()

      formData.append('Invoice', JSON.stringify(createdXMLInvoice))
      formData.append('pdfPath', pdfPath)


      // create invoice
      // FIXME: create correct xml or pdf download link
      const createInvoiceResponse = await event.fetch('/api/create-invoice/Factur-X-EN16931', {
        method: 'POST',
        body: formData
      });

      if (!createInvoiceResponse.ok) {
        console.log('❌ Invoice generation failed');
        return fail(500, {
          A4Form,
          message: 'Invoice generation failed'
        });
      }


      // Convert response to base64 for serialization
      const contentType = createInvoiceResponse.headers.get('Content-Type');
      const buffer = await createInvoiceResponse.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString('base64');

      const totalTime = performance.now() - actionStart;

      return {
        A4Form,
        success: true,
        fileData: {
          content: base64Data,
          contentType,
          filename: `invoice-${Date.now()}.${contentType?.includes('xml') ? 'xml' : 'pdf'}`
        },
        message: `Document generated successfully in ${totalTime.toFixed(2)}ms!`
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
