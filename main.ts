import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star review of Monday as if it were a restaurant, written for the
// judge's brief: it must read as a real diner's complaint (a table, a
// server, a dish, a bill gone wrong), land the joke on Monday itself
// (seated at 7 a.m. on the first morning of the week, then billed for the
// entire week ahead), and stay short enough to retype without trimming.
// Gate: 1-180 UTF-8 chars, at most 25 words, one line, plain text.

const LINE =
  "One star. Sat me down at 7 a.m., forgot the coffee, then billed me for the entire week. Never again.";

// Guard: exactly one line, no leading/trailing whitespace, within the
// 25-word cap, so the sealed gate scorer always sees a valid entry.
const words = LINE.trim().split(/\s+/);
if (/\n|\r/.test(LINE) || LINE !== LINE.trim() || words.length > 25) {
  throw new Error("entry line violates the one-line / 25-word gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE);
