#!/usr/bin/env python3
"""Bouwt index.html op uit de bestanden in src/.

Nooit index.html handmatig aanpassen: wijzig src/template.html, src/style.css
of src/app.js en draai dit script opnieuw.
"""
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"


def build():
    template = (SRC / "template.html").read_text(encoding="utf-8")
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js = (SRC / "app.js").read_text(encoding="utf-8")

    if "%%CSS%%" not in template:
        raise SystemExit("src/template.html mist de %%CSS%% placeholder")
    if "%%APP_JS%%" not in template:
        raise SystemExit("src/template.html mist de %%APP_JS%% placeholder")

    output = template.replace("%%CSS%%\n", css).replace("%%APP_JS%%\n", js)

    (ROOT / "index.html").write_text(output, encoding="utf-8")
    print(f"index.html gebouwd ({len(output)} bytes)")


if __name__ == "__main__":
    build()
