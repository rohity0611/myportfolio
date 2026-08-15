import fs from "fs";
import path from "path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const folder = "D:\\myportfolio\\SCube";
const files = fs.readdirSync(folder).filter((f) => f.endsWith(".pdf"));

async function extractText(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await getDocument({ data }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

async function extractAll() {
  for (const file of files) {
    const filePath = path.join(folder, file);
    try {
      const text = await extractText(filePath);
      console.log("=== " + file + " ===");
      console.log(text.substring(0, 3000));
      console.log("\n---END---\n");
    } catch (e) {
      console.log("=== " + file + " === ERROR: " + e.message);
    }
  }
}
extractAll();
