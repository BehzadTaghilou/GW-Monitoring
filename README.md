# GW-Monitor — Windows-Desktop-Anwendung

Dieses Verzeichnis ist ein fertiges Electron-Projekt. Die Datei `dashboard.html`
darin ist **exakt die zuletzt bestätigte Dashboard-Version, ohne jede Änderung**.

## 🚀 Empfohlener Weg: automatisch bauen lassen, ohne irgendetwas zu installieren

Dieses Projekt enthält bereits eine GitHub-Actions-Konfiguration
(`.github/workflows/build-windows.yml`), die die `.exe` automatisch auf
GitHubs eigenen Servern baut — du brauchst dafür **kein Node.js und keine
Kommandozeile** auf deinem eigenen Rechner.

1. Kostenloses Konto auf [github.com](https://github.com) anlegen (falls noch nicht vorhanden).
2. Neues Repository erstellen (Private ist völlig ausreichend).
3. Den kompletten Inhalt dieses Ordners hochladen — entweder per Drag & Drop
   im Browser ("Add file" → "Upload files") oder per `git push`.
4. Zum Tab **"Actions"** im Repository wechseln — der Build startet automatisch.
5. Nach ca. 2–3 Minuten (grünes Häkchen ✅) auf den abgeschlossenen Lauf
   klicken → ganz unten bei **"Artifacts"** liegt eine ZIP-Datei
   `GW-Monitor-Windows-EXE` zum Download bereit. Darin befinden sich beide
   `.exe`-Dateien (Setup-Installer + Portable-Version).

## Alternative: selbst lokal bauen
Falls doch ein eigener Rechner mit Node.js verwendet werden soll:

1. [Node.js](https://nodejs.org) (Version 18+) installieren.
2. In diesem Ordner ein Terminal öffnen:
```
npm install
npm run dist
```
3. Ergebnis liegt im Ordner `dist/`.

## Was wurde hinzugefügt, um "wie echte Software" zu wirken?
- ✅ Eigenes App-Icon (`icon.ico`), erscheint in Taskleiste, Startmenü, Desktop-Verknüpfung und Datei-Explorer
- ✅ Professioneller Installations-Assistent (NSIS) mit **Sprachauswahl (Deutsch/Englisch)** beim Start der Installation
- ✅ Eintrag im **Startmenü** ("GW-Monitor") und optionale Desktop-Verknüpfung
- ✅ Eintrag in "Programme und Funktionen" (Systemsteuerung) inkl. sauberem Deinstallations-Assistent
- ✅ Eigener Fenstertitel, App-Menü (Datei/Ansicht/Sprache/Hilfe) und "Über GW-Monitor"-Dialog
- ✅ Menüleiste selbst umschaltbar zwischen Deutsch und Englisch (Menü → Sprache)

⚠️ **Wichtig zu wissen:** Der zweisprachige Teil betrifft die *Installer- und
App-Oberfläche* (Setup-Assistent, Fenstermenü, Info-Dialog) — **der Inhalt des
Dashboards selbst (Tabs, Beschriftungen, Diagramme) bleibt wie vereinbart
unverändert auf Deutsch**, exakt wie die zuletzt bestätigte Version. Falls
gewünscht auch die Dashboard-Oberfläche selbst zweisprachig machen zu lassen
(z. B. ein Sprachumschalter *innerhalb* des Dashboards, der alle Tab-Namen,
Achsenbeschriftungen usw. übersetzt), ist das ein separates, deutlich größeres
Projekt — bitte einfach Bescheid geben, falls das ebenfalls gewünscht ist.

## Warum wurde hier nicht bis zum Schluss gebaut?
Der Download der Electron-Binärdatei (~150 MB, von GitHub) ist durch die
Netzwerk-Einschränkungen dieser Sandbox blockiert. Der letzte Schritt (das
eigentliche Erzeugen der `.exe`) muss deshalb auf einem Rechner mit normalem
Internetzugang erfolgen — Windows, macOS oder Linux, das Betriebssystem des
Build-Rechners spielt keine Rolle, das Ergebnis ist trotzdem eine Windows-.exe.

## Voraussetzung
[Node.js](https://nodejs.org) (Version 18 oder neuer) auf dem Build-Rechner installieren.

## Schritte (nur 3 Befehle)

1. Diesen Ordner (`gw-monitor-app`) öffnen, darin ein Terminal / PowerShell öffnen.

2. Abhängigkeiten installieren:
```
npm install
```

3. Windows-Version bauen:
```
npm run dist
```

Nach ein paar Minuten liegen im Ordner `dist/` zwei fertige Dateien:
- **`GW-Monitor-Setup-1.0.0.exe`** → Installations-Assistent (mit Sprachauswahl DE/EN beim Start, Startmenü-Eintrag, Desktop-Verknüpfung, Deinstallation)
- **`GW-Monitor-Portable-1.0.0.exe`** → einzelne Datei, läuft ohne Installation direkt

Beide laufen auf jedem Windows-Rechner, ganz ohne Node.js oder sonstige
Vorinstallation beim Endnutzer.

## Schnelltest ohne fertige .exe (optional)
```
npm install
npm start
```

## Eigenes Icon oder Firmenname eintragen
- Icon: eigene `icon.ico` (mind. 256×256, mehrere Auflösungen empfohlen) anstelle der mitgelieferten Datei einsetzen.
- Firma/Copyright: in `package.json` die Felder `"author"` und `"copyright"` anpassen.
- App-Name im Startmenü: in `package.json` unter `"build" → "productName"` ändern.

## Später aktualisieren
Wenn sich `dashboard.html` später ändert: einfach die neue Datei in diesen
Ordner kopieren (denselben Dateinamen behalten) und erneut `npm run dist`
ausführen.
