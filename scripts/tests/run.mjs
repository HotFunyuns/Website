// Runs every scripts/tests/*.test.mjs with Node's built-in test runner.
//
// A runner rather than `node --test scripts/tests/`, because Node 20 (the CI
// version) and Node 22+ disagree about directory and glob arguments; passing an
// explicit file list works on both.

import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(here)
  .filter((name) => name.endsWith('.test.mjs'))
  .sort()
  .map((name) => join(here, name));

const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
