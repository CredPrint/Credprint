// src/types/pdf-parse.d.ts

// This tells TypeScript that a module named "pdf-parse" exists.
declare module "pdf-parse" {
  // Define the structure of the data object it returns
  interface PdfParseData {
    numpages: number;
    numrender: number;
    info: any; 
    metadata: any;
    text: string;
    version: string;
  }

  // Define the main function that is exported
  type PdfParse = (dataBuffer: Buffer) => Promise<PdfParseData>;

  // This is the critical line:
  // It tells TypeScript that this module's *default export* IS this function.
  const pdf: PdfParse;
  export default pdf;
}