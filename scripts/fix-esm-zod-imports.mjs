import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/generated/zod"); // <-- AJUSTA a tu ruta real

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && (full.endsWith(".ts") || full.endsWith(".mts"))) fixFile(full);
  }
}

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");

  // agrega .js a imports/exports relativos que no tengan extensión
  // - soporta: import ... from "./x"
  // - soporta: export * from "./x"
  // - evita: "./x.js", "./x.json", "./x.node", etc.
  const re = /(from\s+["'])(\.{1,2}\/[^"']+?)(["'])/g;

  const next = code.replace(re, (m, a, spec, b) => {
    // si ya trae extensión, no tocar
    if (/\.(js|mjs|cjs|json|node)$/i.test(spec)) return m;
    return `${a}${spec}.js${b}`;
  });

  if (next !== code) fs.writeFileSync(file, next, "utf8");
}

walk(ROOT);
console.log("✅ Fixed ESM relative imports in:", ROOT);
