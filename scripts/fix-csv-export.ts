import * as fs from 'fs';

function filterCSVLines(inputPath: string, outputPath: string): void {
    try {
        // Read the file content
        const content: string = fs.readFileSync(inputPath, 'utf-8');
        
        // Split into lines and filter out empty lines
        const lines: string[] = content.split('\n').filter(line => line.trim());
        
        // Define the patterns to match - now with semicolon
        const patterns: RegExp[] = [
            // /^BT-\d+-0(?:;|$|\r)/,
            // /^BT-\d+-00(?:;|$|\r)/,
            // /^BT-\d+-000(?:;|$|\r)/,
            // /^BG-\d+-0(?:;|$|\r)/,
            // /^BG-\d+-00(?:;|$|\r)/,
            // /^BG-\d+-000(?:;|$|\r)/,
            /^BT-X-.*(?:;|$|\r)/,
            /^BG-X-.*(?:;|$|\r)/
        ];
        
        // Filter out lines that match any of the patterns
        const filteredLines: string[] = lines.filter(line => {
            const trimmedLine = line.trim();
            return !patterns.some(pattern => pattern.test(trimmedLine));
        });
        
        // Write the filtered content back to a new file
        // Preserve the original line endings
        const outputContent = filteredLines.join('\n');
        fs.writeFileSync(outputPath, outputContent, 'utf-8');
        
        console.log(`Processed successfully. Removed ${lines.length - filteredLines.length} lines.`);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
// Example usage
const inputFile = 'misc/EXTENDED_BT_MAPPING.csv';
const outputFile = 'src/lib/invoice/CII/OUT_EXTENDED_BT_MAPPING.csv';

filterCSVLines(inputFile, outputFile);
