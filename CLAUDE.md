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
| `src/js/` | Alle app-JS, als losse bestanden (zie hieronder) — samen komen ze op de plek van `%%APP_JS%%` |
| `src/js/manifest.json` | Bepaalt welke `src/js/`-bestanden er zijn en in welke volgorde ze aan elkaar geplakt worden |
| `build.py` | Plakt template + css + alle js-bestanden (volgens manifest.json) aan elkaar tot `index.html` |
| `tests/check.js` | Controleert of `index.html` klopt met `src/` en of de basisstructuur in orde is |
| `index.html` | **Gegenereerd bestand** — niet handmatig bewerken |
| `firebase-config.js` | Eigen Firebase-koppeling (accounts/opslag), los bestand, niet gegenereerd |
| `firestore.rules` | Firestore-beveiligingsregels |
| `manifest.webmanifest`, `icon*.png/svg` | PWA-icoon en naam ("Zet op beginscherm") |
| `sw.js` | Service worker, laat de app ook zonder internet werken |

### src/js/ in detail

Geen bundler, geen ES-modules — gewoon platte scripts die `build.py` in
een vaste volgorde achter elkaar plakt tot één `<script>`-blok (de
volgorde staat in `src/js/manifest.json` en is functioneel: een later
bestand mag iets gebruiken dat een eerder bestand heeft gedefinieerd).

- `src/js/core/` — hulpfuncties en app-infrastructuur die overal gebruikt
  worden (helpers, figuren/SVG, opslag, rekenmachine-parser, navigatie,
  account-sync, Firebase-login, boot).
- `src/js/data/` — de oefenvragen en naslaginhoud per vak/onderwerp
  (rekenen & wiskunde, natuurkunde/installaties/bouweconomie, begrippen
  en hun toelichtingen/voorbeelden).
- `src/js/content/` — hoe die data tot modules/vakken wordt samengevoegd:
  moduledefinities, theorie, formulekaarten, formule-uitleg.
- `src/js/pages/` — **één bestand per scherm** in de app: home (vandaag),
  herhalen, zo-leer-je-hier, hoofdstuk, begrippen, praktijkopdrachten,
  fouten, formuleblad, toetsen, rekenmachine.

Nieuw bestand toevoegen? Zet het in de juiste map én voeg het toe aan
`src/js/manifest.json` op de plek waar het logisch (en functioneel) hoort
— anders komt het niet in de build terecht.

## Inlogpoort

Als `firebase-config.js` een echte Firebase-config bevat, moet je inloggen
of een account maken vóórdat je de rest van de app te zien krijgt — dat
scherm (`#authGate` in `src/template.html`, logica in
`src/js/core/auth-firebase.js`: `updateGate()`/`gateFormHtml()`/`bindGate()`)
verbergt dan `#appShell` (de hele app incl. zwevende rekenmachine-knop) en
toont in plaats daarvan het inlog/registreer-formulier. Zonder (geldige)
Firebase-config slaat de poort zichzelf over en werkt de app lokaal, zoals
voorheen. Verander je iets aan navigatie/boot (`src/js/core/boot.js`,
`src/js/core/nav-sidebar.js`), test dan dat de poort nog steeds werkt: niet
ingelogd → alleen het inlogscherm zichtbaar, geen flits van de app ervoor.

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
