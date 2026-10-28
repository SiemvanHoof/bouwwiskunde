# Bouwwiskunde Startblok

Oefenapp voor HBO Bouwkunde-studenten die net beginnen: rekenen, wiskunde,
natuurkunde, bouwfysica, installaties, bouweconomie en bouwkundige begrippen.
Live op <https://siemvanhoof.github.io/bouwwiskunde/>, repo
`https://github.com/SiemvanHoof/bouwwiskunde.git` (branch `main`, bestanden in
de hoofdmap zodat GitHub Pages ze direct kan serveren).

## Belangrijkste regel: nooit index.html direct aanpassen

`index.html` is **build-output**, gegenereerd door `build.py` uit de
bestanden in `src/`. Werk altijd zo:

1. Wijzig alleen bestanden in `src/`.
2. Draai `python3 build.py` om `index.html` opnieuw te genereren.
3. Draai `node tests/check.js` en controleer dat de uitkomst eindigt met
   `errors 0`.
4. Pas daarna committen/pushen (en vraag het eerst aan Siem, zie onderaan).

## Structuur

| Bestand | Inhoud |
|---|---|
| `src/template.html` | De volledige HTML-pagina, met twee placeholders: `%%CSS%%` en `%%APP_JS%%` |
| `src/style.css` | Alle CSS (komt op de plek van `%%CSS%%`) |
| `src/app.js` | Alle app-logica en inhoud/data (vragen, formules, theorie) — komt op de plek van `%%APP_JS%%` |
| `build.py` | Plakt template + css + js aan elkaar tot `index.html` |
| `tests/check.js` | Controleert of `index.html` klopt met `src/` en of de basisstructuur in orde is |
| `index.html` | **Gegenereerd bestand** — niet handmatig bewerken |
| `firebase-config.js` | Eigen Firebase-koppeling (accounts/opslag), los bestand, niet gegenereerd |
| `firestore.rules` | Firestore-beveiligingsregels |
| `manifest.webmanifest`, `icon*.png/svg` | PWA-icoon en naam ("Zet op beginscherm") |
| `sw.js` | Service worker, laat de app ook zonder internet werken |

`src/app.js` is nu nog één bestand met zowel app-logica als alle
oefeninhoud (vragen, formules, theorie per module). Dat mag verder
opgesplitst worden (bijv. per vak een eigen databestand) zodra dat nodig
wordt — pas dan ook `build.py` aan om de extra bestanden mee te nemen, en
houd de round-trip-test in `tests/check.js` werkend.

## Afspraken voor de inhoud

- Alle teksten in begrijpelijk Nederlands, geschreven voor een student die
  net start met HBO Bouwkunde — geen onnodig jargon, leg vaktermen de
  eerste keer kort uit.
- De app moet goed werken op een telefoon van 390 px breed: geen
  horizontale scroll, knoppen en tekst goed leesbaar/tikbaar.

## Workflow

- Altijd eerst `python3 build.py` en `node tests/check.js` draaien en op
  `errors 0` controleren voordat er gecommit wordt.
- Altijd expliciet toestemming vragen aan Siem voordat er naar `main`
  gepusht wordt.
