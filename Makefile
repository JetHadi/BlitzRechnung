default: all

NPX = npx

UBL_INVOICE_SCHEMA_DEPENDENCIES = \
	0_govDoc/peppol-bis-invoice-3/structure/syntax/ubl-invoice.xml \
	0_govDoc/peppol-bis-invoice-3/structure/codelist/*.xml

CII_INVIOCE_D22 = "0_govDocs/ZUGFeRD-3/Schema/5. CII D22B XSD/CrossIndustryInvoice_100pD22B.xsd"
CII_INVIOCE_BASIC = "0_govDocs/ZUGFeRD-3/Schema/2. Factur-X_1.07.2_BASIC/Factur-X_1.07.2_BASIC.xsd"
CII_INVIOCE_en16931 = "0_govDocs/ZUGFeRD-3/Schema/3. Factur-X_1.07.2_EN16931/Factur-X_1.07.2_EN16931.xsd"
CII_INVIOCE_EXTENDED = "0_govDocs/ZUGFeRD-3/Schema/4. Factur-X_1.07.2_EXTENDED/Factur-X_1.07.2_EXTENDED.xsd"

all: \
	src/lib/UBL/invoice/invoice.interface.ts src/lib/UBL/invoice/invoice.schema.ts \
	src/lib/CII/D22/invoice/invoice.interface.ts src/lib/CII//D22/invoice/invoice.schema.ts \
	src/lib/CII/BASIC/invoice/invoice.interface.ts src/lib/CII//BASIC/invoice/invoice.schema.ts \
	src/lib/CII/en16931/invoice/invoice.interface.ts src/lib/CII//en16931/invoice/invoice.schema.ts \
	src/lib/CII/EXTENDED/invoice/invoice.interface.ts src/lib/CII//EXTENDED/invoice/invoice.schema.ts \


src/lib/invoice/UBL/invoice.schema.json: scripts/parse-ubl-structure.mts $(UBL_INVOICE_SCHEMA_DEPENDENCIES)
	$(NPX) tsx $< >$@ || rm -f $@
	$(NPX) ajv compile --spec=draft2019 -s $@ || rm -f $@

src/lib/invoice/UBLinvoice.interface.ts: scripts/json-schema-to-interface.mts src/schema/invoice.schema.json
	$(NPX) tsx $< src/schema/invoice.schema.json $@
	$(NPX) eslint $@ --fix

src/lib/invoice/UBL/invoice.schema.ts: scripts/json-schema-to-typescript.mts src/schema/invoice.schema.json
	$(NPX) tsx $< invoice
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@


src/lib/invoice/CII/D22/invoice.schema.json: node_modules/jsonix/lib/jsonix-schema-compiler-full.jar $(CII_INVIOCE_D22)
	java -jar node_modules/jsonix-schema-compiler/lib/jsonix-schema-compiler-full.jar schema.xsd
	$(NPX) ajv compile --spec=draft2019 -s $@ || rm -f $@

src/lib/invoice/UBLinvoice.interface.ts: scripts/json-schema-to-interface.mts src/schema/invoice.schema.json
	$(NPX) tsx $< src/schema/invoice.schema.json $@
	$(NPX) eslint $@ --fix

src/lib/invoice/UBL/invoice.schema.ts: scripts/json-schema-to-typescript.mts src/schema/invoice.schema.json
	$(NPX) tsx $< invoice
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@

.PHONY: clean all

clean:
	rm -f \
		src/lib/UBL/invoice/invoice.interface.ts src/lib/UBL/invoice/invoice.schema.ts \
		src/lib/CII/D22/invoice/invoice.interface.ts src/lib/CII//D22/invoice/invoice.schema.ts \
		src/lib/CII/BASIC/invoice/invoice.interface.ts src/lib/CII//BASIC/invoice/invoice.schema.ts \
		src/lib/CII/en16931/invoice/invoice.interface.ts src/lib/CII//en16931/invoice/invoice.schema.ts \
		src/lib/CII/EXTENDED/invoice/invoice.interface.ts src/lib/CII//EXTENDED/invoice/invoice.schema.ts \