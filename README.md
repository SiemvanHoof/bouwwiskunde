# Bouwwiskunde Startblok

Oefenapp om je voor te bereiden op HBO Bouwkunde: rekenen, wiskunde, natuurkunde, bouwfysica, installaties, bouweconomie en alle bouwkundige begrippen. De app werkt in elke browser en op je telefoon, en bewaart je voortgang in je eigen account.

Als `firebase-config.js` is ingevuld, moet je eerst inloggen of een account maken voordat je de app kunt gebruiken — dat scherm komt automatisch als eerste.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | De hele app |
| `firebase-config.js` | Koppeling met je Firebase-project (accounts en opslag) |
| `firestore.rules` | Beveiliging: iedereen ziet alleen zijn eigen voortgang |
| `manifest.webmanifest`, `icon*.png`, `icon.svg` | Icoon en naam voor "Zet op beginscherm" |
| `sw.js` | Werkt ook zonder internet met de laatst geladen versie |

Zonder ingevulde `firebase-config.js` werkt de app ook zonder inloggen, maar dan blijft de voortgang alleen in die ene browser.

## Accounts aanzetten met Firebase (gratis, ±10 minuten)

1. Ga naar <https://console.firebase.google.com> en log in met je Google-account.
2. **Project toevoegen** → naam bijvoorbeeld `bouwwiskunde` → Google Analytics mag uit.
3. **Build → Authentication → Aan de slag**. Zet bij *Sign-in method* aan:
   - **E-mail/wachtwoord**
   - **Google** (kies je eigen e-mail als ondersteunings-e-mail)
4. Nog in Authentication: **Settings → Authorized domains → Domein toevoegen** → `siemvanhoof.github.io`
5. **Build → Firestore Database → Database maken** → locatie `eur3 (europe-west)` → *start in productiemodus*.
6. In Firestore: tab **Regels** → vervang alles door de inhoud van `firestore.rules` → **Publiceren**.
7. **Projectinstellingen** (tandwiel) → **Je apps** → het `</>`-icoon (web-app) → naam `bouwwiskunde` → registreren. Je ziet nu een blok `firebaseConfig = { apiKey: ..., ... }`.
8. Zet die zes waarden in `firebase-config.js` en commit het bestand.

De apiKey in `firebase-config.js` is bedoeld om openbaar te zijn; de beveiliging zit in de Firestore-regels uit stap 6.

## Online zetten met GitHub Pages

Repository → **Settings → Pages** → *Source: Deploy from a branch* → branch `main`, map `/ (root)` → **Save**.
Na een minuut staat de app op `https://siemvanhoof.github.io/<repo-naam>/`.

## App installeren op je telefoon

De site is een PWA (progressive web app): geen aparte app store nodig, installeren gaat via de website zelf en updates gaan vanzelf.

- **Android (Chrome/Edge):** open de site, ga naar **Account** (profielicoon) en tik op **Installeer app** — of gebruik het browsermenu (⋮) → *App installeren*. De app komt als icoon op je startscherm en werkt daarna ook offline.
- **iPhone/iPad (moet in Safari, niet Chrome):** open de site in Safari → deelicoon onderin → **Zet op beginscherm**. Apple staat geen installatieknop vanuit de website toe; dit is de enige manier.
- **Updaten:** gebeurt automatisch. Open je de geïnstalleerde app terwijl je internet hebt, dan laadt hij de nieuwste versie en herlaadt zichzelf één keer stil op de achtergrond.
