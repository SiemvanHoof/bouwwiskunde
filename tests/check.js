#!/usr/bin/env node
// Controleert of index.html correct is opgebouwd uit src/.
// Draai na elke wijziging: node tests/check.js

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const readFile = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let errors = 0;
const fail = (msg) => {
  console.error("FOUT: " + msg);
  errors++;
};
const ok = (msg) => console.log("ok   " + msg);

// 1. Vereiste bestanden bestaan
const requiredFiles = [
  "src/template.html",
  "src/style.css",
  "src/app.js",
  "build.py",
  "index.html",
  "firebase-config.js",
  "manifest.webmanifest",
];
for (const f of requiredFiles) {
  if (fs.existsSync(path.join(ROOT, f))) ok(`${f} bestaat`);
  else fail(`${f} ontbreekt`);
}

if (errors > 0) {
  console.log(`\nerrors ${errors}`);
  process.exit(1);
}

const html = readFile("index.html");
const template = readFile("src/template.html");
const css = readFile("src/style.css");
const js = readFile("src/app.js");

// 2. index.html is daadwerkelijk gebouwd uit de huidige src/ bestanden
// split/join i.p.v. replace(): replace() behandelt $-tekens in de
// vervangstring speciaal (css/app.js staan vol met ${...}), split/join niet.
const expected = template
  .split("%%CSS%%\n").join(css)
  .split("%%APP_JS%%\n").join(js);
if (html === expected) {
  ok("index.html komt overeen met src/ (build.py is up-to-date gedraaid)");
} else {
  fail(
    "index.html komt NIET overeen met src/ — draai python3 build.py opnieuw"
  );
}

// 3. Geen placeholders blijven staan in het eindresultaat
if (html.includes("%%CSS%%") || html.includes("%%APP_JS%%")) {
  fail("index.html bevat nog een onvervangen placeholder (%%CSS%% of %%APP_JS%%)");
} else {
  ok("geen onvervangen placeholders in index.html");
}

// 4. Basisstructuur van de HTML
const structureChecks = [
  ["<!doctype html>", "doctype aanwezig"],
  ['<html lang="nl">', "taal is Nederlands (lang=\"nl\")"],
  ["<style>", "style-tag aanwezig"],
  ["</style>", "style-tag correct afgesloten"],
  ["</body>", "body correct afgesloten"],
  ["</html>", "html correct afgesloten"],
];
for (const [needle, msg] of structureChecks) {
  if (html.includes(needle)) ok(msg);
  else fail(`${msg} — "${needle}" niet gevonden`);
}

// 5. Mobielvriendelijke viewport (telefoon, geen horizontale scroll)
if (/<meta name="viewport" content="[^"]*width=device-width/.test(html)) {
  ok("viewport-meta voor mobiel is aanwezig");
} else {
  fail("viewport-meta met width=device-width ontbreekt");
}

// 6. <script> en <style> tags zijn in balans
const countTag = (str, tag) =>
  (str.match(new RegExp(`<${tag}(?:\\s[^>]*)?>`, "g")) || []).length;
const countCloseTag = (str, tag) =>
  (str.match(new RegExp(`</${tag}>`, "g")) || []).length;
for (const tag of ["script", "style"]) {
  const opens = countTag(html, tag);
  const closes = countCloseTag(html, tag);
  if (opens === closes) ok(`<${tag}> tags in balans (${opens})`);
  else fail(`<${tag}> tags niet in balans: ${opens} open vs ${closes} dicht`);
}

console.log(`\nerrors ${errors}`);
process.exit(errors === 0 ? 0 : 1);
