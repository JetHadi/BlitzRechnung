default: all

NPX = npx

INVOICE_SCHEMA_DEPENDENCIES = \
	peppol-bis-invoice-3/structure/syntax/ubl-invoice.xml \
	peppol-bis-invoice-3/structure/codelist/*.xml

all: \
	src/schema/invoice.schema.json \
	src/invoice/invoice.interface.ts \
	src/invoice/invoice.schema.ts \
	src/schema/mapping.schema.json \
	src/mapping/mapping.interface.ts \
	src/mapping/mapping.schema.ts \
	documentation/BusinessTerms.md

src/lib/invoice/UBL/peppolSchema/invoice.schema.json: scripts/parse-ubl-structure.mts $(INVOICE_SCHEMA_DEPENDENCIES)
	$(NPX) tsx $< >$@ || rm -f $@
	$(NPX) ajv compile --spec=draft2019 -s $@ || rm -f $@

src/lib/invoice/UBLinvoice.interface.ts: scripts/json-schema-to-interface.mts src/schema/invoice.schema.json
	$(NPX) tsx $< src/schema/invoice.schema.json $@
	$(NPX) eslint $@ --fix

src/lib/invoice/UBL/invoice.schema.ts: scripts/json-schema-to-typescript.mts src/schema/invoice.schema.json
	$(NPX) tsx $< invoice
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@

src/lib/invoice/UBL/mapping.schema.json: scripts/transform-ubl-mapping.mts src/schema/invoice.schema.json
	$(NPX) tsx $< src/schema/invoice.schema.json $@
	$(NPX) ajv compile --spec=draft2019 -s $@ || rm -f $@

src/lib/invoice/UBL/mapping.interface.ts: scripts/json-schema-to-interface.mts src/schema/mapping.schema.json
	$(NPX) tsx $< src/schema/mapping.schema.json $@
	$(NPX) eslint $@ --fix

src/lib/invoice/UBL/mapping.schema.ts: scripts/json-schema-to-typescript.mts src/schema/mapping.schema.json
	$(NPX) tsx $< mapping
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@



allWin: \
	src\schema\invoice.schema.json \
	src\invoice\invoice.interface.ts \
	src\invoice\invoice.schema.ts \
	src\schema\mapping.schema.json \
	src\mapping\mapping.interface.ts \
	src\mapping\mapping.schema.ts \
	documentation\BusinessTerms.md

src\schema\invoice.schema.json: scripts\parse-ubl-structure.mts $(INVOICE_SCHEMA_DEPENDENCIES)
	$(NPX) tsx $< >$@ || del /F /Q $@
	$(NPX) ajv compile --spec=draft2019 -s $@ || del /F /Q $@

src\invoice\invoice.interface.ts: scripts\json-schema-to-interface.mts src\schema\invoice.schema.json
	$(NPX) tsx $< src\schema\invoice.schema.json $@
	$(NPX) eslint $@ --fix

src\invoice\invoice.schema.ts: scripts\json-schema-to-typescript.mts src\schema\invoice.schema.json
	$(NPX) tsx $< invoice
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@

src\schema\mapping.schema.json: scripts\transform-ubl-mapping.mts src\schema\invoice.schema.json
	$(NPX) tsx $< src\schema\invoice.schema.json $@
	$(NPX) ajv compile --spec=draft2019 -s $@ || del /F /Q $@

src\mapping\mapping.interface.ts: scripts\json-schema-to-interface.mts src\schema\mapping.schema.json
	$(NPX) tsx $< src\schema\mapping.schema.json $@
	$(NPX) eslint $@ --fix

src\mapping\mapping.schema.ts: scripts\json-schema-to-typescript.mts src\schema\mapping.schema.json
	$(NPX) tsx $< mapping
	$(NPX) eslint $@ --fix
	$(NPX) prettier --write $@

.PHONY: clean cleanWin all allWin

clean:
	rm -f src/schema/*.json \
		src/invoice/invoice.interface.ts src/mapping/mapping.interface.ts \
		src/invoice/invoice.schema.ts src/mapping/mapping.schema.ts

cleanWin:
	del /F /Q src\schema\*.json
	del /F /Q src\invoice\invoice.interface.ts src\mapping\mapping.interface.ts
	del /F /Q src\invoice\invoice.schema.ts src\mapping\mapping.schema.ts
