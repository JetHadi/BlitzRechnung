import re

def process_text_and_write(input_file, output_file):
    
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    processed_lines = []
    for line in lines:
        # Regex für Kardinalitäten mit Wortgrenze
        cardinality_pattern = r'\b(\d+\s*\.\.\s*(?:\d+|unbound))\b(?=\s+\S+)'
        
        while True:
            match = re.search(cardinality_pattern, line)
            if not match:
                break

            cardinality = match.group(1)
            # Finde das nächste Wort nach der Kardinalität
            next_word_match = re.search(r'\S+', line[match.end():])

            if next_word_match:
                # Berechne die absolute Position des nächsten Wortes
                word_start = match.end() + next_word_match.start()
                word_end = match.end() + next_word_match.end()
                next_word = line[word_start:word_end]
                
                # Entferne die Kardinalität von ihrer ursprünglichen Position
                line = line[:match.start()] + line[match.end():]
                
                # Finde die neue Position des Wortes nach der Entfernung der Kardinalität
                new_word_pos = line.find(next_word)
                
                # Füge die Kardinalität nach dem Wort ein
                if new_word_pos != -1:
                    insert_pos = new_word_pos + len(next_word)
                    line = line[:insert_pos] + ' ' + cardinality + line[insert_pos:]

        processed_lines.append(line)

    # Schreiben der verarbeiteten Zeilen in die Ausgabedatei
    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines(processed_lines)

# Beispielaufruf
input_file = "../misc/hardCopyCIIBT.txt"
output_file = "../misc/hardCopyCIIBT_edit.txt"

process_text_and_write(input_file, output_file)
