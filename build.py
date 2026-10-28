#!/usr/bin/env python3
"""Bouwt index.html op uit de bestanden in src/.

Nooit index.html handmatig aanpassen: wijzig een bestand in src/ en draai
dit script opnieuw.

De app-JS staat niet in één bestand maar als losse pagina's/modules in
src/js/, opgesplitst in core/ (hulpfuncties, app-infrastructuur), data/
(oefenvragen en naslaginhoud), content/ (modules/theorie/formules) en
pages/ (één bestand per scherm in de app). src/js/manifest.json bepaalt de
volgorde waarin ze aan elkaar geplakt worden tot één <script>-blok — die
volgorde is functioneel: latere bestanden bouwen voort op eerdere (bv. een
pagina gebruikt data die eerder is gedefinieerd), dus verander de volgorde
niet zonder dat te controleren. Voeg een nieuw bestand toe aan het
manifest op de plek waar het logisch bij hoort (tests/check.js leest
hetzelfde manifest, dus die blijft automatisch in sync).
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
JS_DIR = SRC / "js"


def build():
    template = (SRC / "template.html").read_text(encoding="utf-8")
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js_files = json.loads((JS_DIR / "manifest.json").read_text(encoding="utf-8"))
    js = "".join((JS_DIR / f).read_text(encoding="utf-8") for f in js_files)

    if "%%CSS%%" not in template:
        raise SystemExit("src/template.html mist de %%CSS%% placeholder")
    if "%%APP_JS%%" not in template:
        raise SystemExit("src/template.html mist de %%APP_JS%% placeholder")

    output = template.replace("%%CSS%%\n", css).replace("%%APP_JS%%\n", js)

    (ROOT / "index.html").write_text(output, encoding="utf-8")
    print(f"index.html gebouwd uit {len(js_files)} JS-bestanden ({len(output)} bytes)")


if __name__ == "__main__":
    build()
