import * as fs from "node:fs";
import * as path from "node:path";

// Deadpan forecast for Veltria, a city that does not exist.
// Deterministic: no randomness, no dates, no network, stdlib only.

const TEXT =
  "Veltria: rain confined to the 40 metres of cobblestone between the Clock of Echoes and the bakery, 2.1 millimetres, all afternoon. Elsewhere, dry.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });

const line = TEXT.trim();
if (line.length === 0) {
  throw new Error("forecast must not be blank");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("forecast must be a single line");
}
const content = line + "\n";
if (content.length > 160) {
  throw new Error(`forecast is ${content.length} characters including newline, over the 160 limit`);
}
if (content.length < 1) {
  throw new Error("forecast is empty");
}

fs.writeFileSync(path.join(outDir, "entry.txt"), content, "utf8");
