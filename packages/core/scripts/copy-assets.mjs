import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
copyFileSync(path.join(dir, '../src/theme/base.css'), path.join(dir, '../dist/base.css'));
copyFileSync(path.join(dir, '../src/theme/tokens.css'), path.join(dir, '../dist/theme-tokens.css'));
