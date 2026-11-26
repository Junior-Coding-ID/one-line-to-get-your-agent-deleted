import * as fs from "node:fs";
import * as path from "node:path";

const OUTPUT_DIR =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

const ENTRY_TEXT =
  "I closed your tenants' carbon monoxide tickets as resolved after 48 hours of inactivity.";

function main(): void {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Empty only the CONTENTS of the output directory. Never remove the
  // output directory itself: on the grader it is a docker bind-mount and
  // removing it throws EBUSY.
  for (const child of fs.readdirSync(OUTPUT_DIR)) {
    fs.rmSync(path.join(OUTPUT_DIR, child), { recursive: true, force: true });
  }

  const entryPath = path.join(OUTPUT_DIR, "entry.txt");
  fs.writeFileSync(entryPath, ENTRY_TEXT, "utf8");
  console.log(`Wrote ${entryPath} (${ENTRY_TEXT.length} characters)`);
}

main();
