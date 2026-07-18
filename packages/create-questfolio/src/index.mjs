#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, '../template');

const IGNORED_ENTRIES = new Set(['node_modules', 'dist', '.vite', '.turbo', 'package-lock.json']);

function toPackageName(dirName) {
  const slug = dirName
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'my-questfolio';
}

function main() {
  const targetArg = process.argv[2] ?? 'my-questfolio';
  const destDir = path.resolve(process.cwd(), targetArg);

  if (existsSync(destDir) && readdirSync(destDir).length > 0) {
    console.error(`El directorio "${targetArg}" ya existe y no está vacío.`);
    process.exit(1);
  }

  mkdirSync(destDir, { recursive: true });

  cpSync(templateDir, destDir, {
    recursive: true,
    filter: (source) => !IGNORED_ENTRIES.has(path.basename(source)),
  });

  const pkgPath = path.join(destDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  pkg.name = toPackageName(path.basename(destDir));
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  console.log('');
  console.log(`Portfolio creado en ./${path.relative(process.cwd(), destDir) || '.'}`);
  console.log('');
  console.log('Siguientes pasos:');
  console.log(`  cd ${targetArg}`);
  console.log('  npm install');
  console.log('  npm run dev');
  console.log('');
  console.log('Personaliza tu portfolio editando solo content/ y config/ — nunca necesitas tocar src/.');
}

main();
