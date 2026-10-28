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

Nieuw begrippen-hoofdstuk toevoegen (zoals de modules `beroepen` en
`vervolgstudies`, vak Bouwkunde → categorie "Loopbaan en vervolgstudie")?
Volg het patroon in `content/modules-uitbreiding-5.js`: `addSub(ch, sub,
naam, [[begrip, uitleg], ...], scenarios?)` registreert de content in
`TERMS`/`TERMSUB`/`SCEN`, `T(ch, sub)` maakt er een oefenbare `sub` van
(hergebruikt dezelfde multiple-choice generator `genTerm` als alle andere
begrippenmodules), en `MODS.push(m); MOD[m.id]=m` registreert de module.
Kies een sub-id die nog nergens anders gebruikt wordt — `TERMSUB` is
app-breed, niet per hoofdstuk, dus hergebruik van een bestaande sub-id
overschrijft per ongeluk een andere module (geef sub-ids een duidelijk
voorvoegsel, zoals `ber-` of `vs-`, om dat te voorkomen). Voeg de module
daarna toe aan een categorie in `content/subjects.js`; de volgorde daar
bepaalt automatisch de code (bijv. `B-16`) en welke module eerst af moet
zijn (`m.prev`).

Nieuwe oefenvraag toevoegen aan een bestaand (reken-/formule-)hoofdstuk?
Controleer EERST of het concept al elders bestaat — lees de volledige
bestaande `gen*`-functie(s) van dat hoofdstuk (vaak dekt elk niveau 1/2/3
al een ander vraagtype, niet alleen een moeilijkere variant) én grep
breed op het onderwerp, want hetzelfde concept duikt soms in een heel
ander vak op (zie `Bouwwiskunde Techstack en structuur` in Obsidian voor
een lijst van ontdekte overlappen). Nieuwe generator: schrijf 'm in de
bijpassende `data/*.js`, voeg de sub toe aan `subs:`/`theory:` van de
module (via `add(id, sub, lesson)` in `modules-uitbreiding-1.js` voor
basismodules, of direct in de array voor `modules-uitbreiding-2.js`-
modules), voeg een `FC(...)`-kaart toe aan `FORMULAS[id]` in
`formulekaarten.js`, en werk het bijbehorende `G{}`-leerdoel bij. Test
daarna met een Node-fuzztest (zie sessiegeschiedenis): roep de nieuwe
`gen(l)` honderden keren per niveau aan en controleer op exceptions,
NaN/undefined antwoorden en (bij meerkeuze) dubbele opties.

## PWA: installeerbare app

De site is al een volwaardige PWA (`manifest.webmanifest` + `sw.js`,
geregistreerd in `src/template.html`) — geen native app store nodig.
`src/js/core/boot.js` vangt `beforeinstallprompt` op (`PWA_PROMPT`) en
herkent standalone/iOS (`isStandalone()`, `isIOS()`); de installatie-UI
staat op de Account-pagina (`pwaInstallHtml()`/`bindPwaInstall()` in
`src/js/core/auth-firebase.js`). Updates gaan automatisch: de SW gebruikt
network-first caching, en `src/template.html` herlaadt de pagina één keer
stil zodra een nieuwe service worker het overneemt (`controllerchange`).

## Logo / merkkleur

Het logo (een geometrische "B") en de merkkleur terracotta (`--brand:
#A6522E`, tekst erop `--on-brand`) staan los van de instelbare UI-
accentkleur (`--primary`, die de gebruiker kan wijzigen via Kleuren
kiezen). Het logo gebruikt daarom altijd `var(--brand)`, nooit
`var(--primary)`, zodat het merk niet verandert als iemand een andere
accentkleur kiest. Bronbestanden: `icon.svg` (512×512, ook bron voor
`icon-180/192/512.png` en de favicon), en dezelfde path-data inline in
`src/template.html` (zijbalk) en `src/js/core/auth-firebase.js`
(inlogscherm, 2×) — bij een logo-wijziging alle vier bijwerken. PNG's
zijn gegenereerd met headless Chrome (`--headless --screenshot`), niet
met een los SVG-rastertool; zie de sessiegeschiedenis voor het commando
als dat weer nodig is.

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
