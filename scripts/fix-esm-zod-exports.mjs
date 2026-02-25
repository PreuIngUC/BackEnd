import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/generated/zod"); // <-- ajusta a tu ruta real

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && full.endsWith(".ts")) fixFile(full);
  }
}

function fixFile(file) {
  const dir = path.dirname(file);
  let code = fs.readFileSync(file, "utf8");
  let changed = false;

  // matches: from './x.js'  (import/export)
  code = code.replace(/(from\s+["'])(\.{1,2}\/[^"']+?)(["'])/g, (m, a, spec, b) => {
    // solo tocamos relativos que ya terminan en .js (como en tu ejemplo)
    if (!spec.endsWith(".js")) return m;

    const specNoExt = spec.slice(0, -3); // quita ".js"
    const fileTarget = path.resolve(dir, spec);       // .../modelSchema.js
    const dirTarget  = path.resolve(dir, specNoExt);  // .../modelSchema

    // si existe el archivo, no tocar
    if (fs.existsSync(fileTarget)) return m;

    // si no existe archivo pero sí carpeta => apuntar a index.js
    if (fs.existsSync(dirTarget) && fs.statSync(dirTarget).isDirectory()) {
      changed = true;
      return `${a}${specNoExt}/index.js${b}`;
    }

    return m;
  });

  if (changed) fs.writeFileSync(file, code, "utf8");
}

walk(ROOT);
console.log("✅ Fixed directory exports/imports to /index.js in:", ROOT);
