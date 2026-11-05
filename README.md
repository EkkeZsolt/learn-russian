# 🇷🇺 Orosz kvíz – telefonra

Mobilbarát orosz kvíz az **Orosz nyelvkönyv első 22 oldala** alapján (1. lecke: ábécé, `это / кто / что`, főnévnem, többes szám; 2. lecke eleje: család, foglalkozások, köszönések, névmások), plusz az **összes szám 1–100-ig**.

- **44 feladat, kb. 35–45 perc** alatt végigvihető, összesen 157 pont
- Mindenféle típus: válaszválasztós, beírós, igaz/hamis, mondatkiegészítés, párosítás, szórend-kirakás
- Minden magyarázat **magyarul** van
- Nincs hang / TTS
- A haladás **cookie-ban** mentődik (365 nap) – ha félbehagyod, ugyanott folytathatod
- Csak statikus fájlok, nincs build – GitHub Pages-en közvetlenül fut

## Használat telefonon

Nyisd meg a GitHub Pages címet a telefon böngészőjében, és kezd el a kvízt. Ha bezárod és később visszatérsz ugyanabban a böngészőben, a **Folytatás** gombbal onnan folytatod, ahol abbahagytad. Az **Újrakezdés** gomb törli a mentett haladást.

> Megjegyzés: a haladás cookie-ban van, ezért ha törlöd a böngésző cookie-jait / sütijeit, a mentés elvész. Másik böngészőben vagy másik eszközön sem látszik – eszközönként külön mentődik.

## Feltöltés GitHubra és GitHub Pages bekapcsolása

1. Hozz létre egy új repository-t a GitHubon `learn-russian` néven.
2. Töltsd fel ebbe a mappába ezeket a fájlokat:
   - `index.html`
   - `style.css`
   - `app.js`
   - `questions.js`
   - `README.md`
   - `.nojekyll`
   
   (Az `Orosz-nyelvkönyv.pdf` nem kell a működéshez, csak forrás volt.)
   
   Git-tel:
   ```bash
   git init
   git add index.html style.css app.js questions.js README.md .nojekyll
   git commit -m "Orosz kvíz"
   git branch -M main
   git remote add origin https://github.com/FELHASZNALONEVED/learn-russian.git
   git push -u origin main
   ```
3. A repository-ban: **Settings → Pages**
4. **Build and deployment → Source: Deploy from a branch**, Branch: `main` / `(root)`, majd **Save**.
5. Pár perc múlva elérhető lesz itt: `https://FELHASZNALONEVED.github.io/learn-russian/`

Ezt a címet nyisd meg telefonon – akár a kezdőképernyőre is kiteheted parancsikonként.

## Kérdések bővítése

A kérdések a `questions.js` fájlban vannak. Új feladatnál másolj le egy meglévő blokkot, adj neki új `id`-t, és írd át a szöveget. Típusok: `choice`, `fill`, `bool`, `input`, `match`, `order`. A számokat (1–100) a fájl elején lévő `numberRu` függvény állítja elő automatikusan.
