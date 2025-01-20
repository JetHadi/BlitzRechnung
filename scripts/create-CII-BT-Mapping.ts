import * as fs from 'fs';

function addNewlines(content: string): string {
    return content.replace(/(BT-\d+(?:-\d+)?|BG-\d+(?:-\d+)?)/g, '$1\n');
}

// Read file, process it, and write to new file
function processFile(inputPath: string, outputPath: string): void {
    try {
        // Read the input file
        const content: string = fs.readFileSync(inputPath, 'utf8');
        console.log(content)
        // Process the content
        const modifiedContent: string = addNewlines(content);
        
        // Write to output file
        fs.writeFileSync(outputPath, modifiedContent);
        
        console.log('File processed successfully!');
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

// Example usage
processFile('/Users/hadi/Dev/BlitzRechnung/src/lib/invoice/CII/hardcopyBT.txt', '/Users/hadi/Dev/BlitzRechnung/src/lib/invoice/CII/OUT_hardcopyBT.txt');
