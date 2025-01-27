import type { A4RechnungType } from "$lib/schema/rechnung";

export interface Invoice extends A4RechnungType {
    calculatedAmounts = {
        currency: string,
        lineTotalAmount: lineTotalAmount.toFixed(2),
        taxBasisTotalAmount: lineTotalAmount.toFixed(2),
        taxTotalAmount: taxTotalAmount.toFixed(2),
        grandTotalAmount: grandTotalAmount.toFixed(2),
        duePayableAmount: grandTotalAmount.toFixed(2)
      };
}