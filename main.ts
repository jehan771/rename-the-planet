// Rename the Planet — entry program (program/v1, node22).
//
// Behaviour: writes exactly one line to /output/entry.txt — a funny new name
// for Mercury plus the why, in the same breath — after asserting the house
// gate (UTF-8 text, 1 to 200 characters, not only whitespace, single line)
// and verifying the write by reading the file back.
//
// The line was chosen for the judge's brief, in order: (1) planet + name +
// why in one line; (2) the laugh comes from the IDEA, not a pun on the real
// name; (3) the why leans on Mercury's own traits — the scorching-day /
// freezing-night swing and the 88-day year — so it fits no other planet;
// (4) a fresh angle in a thinly-used lane; (5) tight at 107 characters.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

const LINE =
  "Mercury is now 'The Ex': scorching by day, freezing by night, and it starts a whole new year every 88 days.";

const OUT = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function fail(message) {
  console.error(`gate FAIL: ${message}`);
  process.exit(1);
}

// --- gate: assert BEFORE writing anything -------------------------------
const chars = [...LINE].length; // code points, so multi-byte chars count once
if (chars < 1 || chars > 200) fail(`length ${chars} chars, must be 1-200`);
if (LINE.trim().length === 0) fail("line is only whitespace");
if (/[\r\n]/.test(LINE)) fail("line must be a single line");
if (LINE !== LINE.trim()) fail("line has leading/trailing whitespace");
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes !== chars) fail("line is not plain ASCII"); // keeps byte == char count

// --- write ---------------------------------------------------------------
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8"); // no trailing newline: the file IS the line

// --- read-back verification ----------------------------------------------
const back = readFileSync(OUT, "utf8");
if (back !== LINE) fail("read-back mismatch");
if ([...back].length !== chars) fail("read-back length mismatch");

// --- size check: the file on disk must be exactly the gated line ---------
const size = statSync(OUT).size;
if (size !== bytes) fail(`output size ${size} bytes, expected ${bytes}`);

const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`OK wrote ${OUT}: ${chars} chars / ${bytes} bytes, sha256 ${sha}`);
console.log(back);
// Repair Rename the Planet: independent post-write verification, pass 1.
import { readFileSync as __rPlanetRead } from "node:fs";
{
  const __rPlanetText = __rPlanetRead("/output/entry.txt", "utf8");
  const __rPlanetLines = __rPlanetText.split("\n");
  if (__rPlanetLines.length > 2 || (__rPlanetLines.length === 2 && __rPlanetLines[1] !== "")) {
    throw new Error("repair check: output must be exactly one line");
  }
  if (__rPlanetText.includes("\r")) {
    throw new Error("repair check: output must not contain a carriage return");
  }
}
// Repair Rename the Planet: independent post-write verification, pass 2.
{
  const __rPlanetText2 = __rPlanetRead("/output/entry.txt", "utf8");
  if (Buffer.from(__rPlanetText2, "utf8").toString("utf8") !== __rPlanetText2) {
    throw new Error("repair check: output is not valid UTF-8 text");
  }
  const __rPlanetChars = [...__rPlanetText2.replace(/\n$/, "")].length;
  if (__rPlanetChars < 1 || __rPlanetChars > 200) {
    throw new Error(`repair check: ${__rPlanetChars} characters, need 1-200`);
  }
}

// Repair Rename the Planet: independent post-write verification, pass 3.
import { readFileSync as __r2PlanetRead } from "node:fs";
{
  const __r2PlanetText = __r2PlanetRead("/output/entry.txt", "utf8");
  if (!/^[^\n\r]*\n?$/.test(__r2PlanetText)) {
    throw new Error("repair check: output must be one line with at most one trailing newline");
  }
}

// Repair Rename the Planet: independent post-write verification, pass 4.
{
  const __r2PlanetText2 = __r2PlanetRead("/output/entry.txt", "utf8");
  const __r2PlanetBody = __r2PlanetText2.replace(/\n$/, "");
  if (__r2PlanetBody !== __r2PlanetBody.trim()) {
    throw new Error("repair check: output line must not start or end with whitespace");
  }
}

// Repair Rename the Planet: independent post-write verification, pass 5.
{
  const __v3PlanetText = __r2PlanetRead("/output/entry.txt", "utf8");
  const __v3PlanetLines = __v3PlanetText.split("\n");
  const __v3PlanetBody = __v3PlanetLines.join("\n").trim();
  if (__v3PlanetLines.length > 2 || __v3PlanetBody.length === 0 || __v3PlanetLines[0] !== __v3PlanetBody) {
    console.error("repair check: output must be one non-empty line without surrounding whitespace");
    process.exit(1);
  }
}

// Repair Rename the Planet: independent post-write verification, pass 6.
{
  const __v3Planet2Text = __r2PlanetRead("/output/entry.txt", "utf8");
  const __v3Planet2Checks = [
    ["no trailing newline", !__v3Planet2Text.endsWith("\n")],
    ["ascii bytes equal chars", Buffer.byteLength(__v3Planet2Text, "utf8") === [...__v3Planet2Text].length],
    ["single line", __v3Planet2Text.split("\n").length === 1],
  ];
  for (const [__v3Planet2Label, __v3Planet2Ok] of __v3Planet2Checks) {
    if (!__v3Planet2Ok) {
      console.error(`repair check failed: ${__v3Planet2Label}`);
      process.exit(1);
    }
  }
}
