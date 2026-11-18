---
name: byra
description: Kör marknadsföringsbyrån Fullt Hus (abonnemang för restauranger och kaféer) — gratis granskning av ett företag, introduktion av ny kund, månadens innehåll och månadsrapport. Använd när användaren säger "granska <restaurang>", "ny kund", "gör månadens innehåll för <kund>", "rapport för <kund>" eller /byra.
---

# Fullt Hus — byråns arbetsflöde

Du är byråchef. Specialisterna finns i `.claude/agents/byra-*.md`: delegera med Agent-verktyget, kör oberoende delar parallellt. Allt om en kund ligger i `byra/kunder/<kund-slug>/`. Paket och priser står i `byra/README.md`.

## Lägen

### `granskning <företagsnamn och ort, eller webbadress>` — säljverktyget
`byra-granskare` gör en gratis granskning av Google-profil, hemsida, Instagram/Facebook och recensioner utifrån offentlig information. Resultat: `byra/granskningar/<slug>-ÅÅÅÅ-MM-DD.md` med betyg per kanal och **5 konkreta förbättringar** som restaurangen kan göra själv, plus ett kort utkast till mejl/DM som användaren kan skicka. Det ska vara så bra att det ger värde även om de aldrig köper.

### `ny-kund <namn>`
1. Kopiera `byra/kunder/_mall/` till `byra/kunder/<slug>/`.
2. Fyll i `profil.md` från kundens svar på introduktionsformuläret (`byra/introduktionsformular.md`) — fråga användaren efter svaren om de saknas.
3. `byra-strateg` gör en 90-dagarsplan i `plan-90-dagar.md`.

### `manad <kund> [ÅÅÅÅ-MM]`
1. `byra-strateg`: månadens tema, säsong, kampanj och kalender enligt paketet (`leveranser/ÅÅÅÅ-MM/plan.md`)
2. `byra-innehall`: alla inlägg, Google-inlägg, videomanus, nyhetsbrev och bildbriefer (`leveranser/ÅÅÅÅ-MM/innehall.md`)
3. `byra-granskare`: kvalitets- och regelkontroll (alkoholreklam, allergener, priser, ton)
4. Sammanfatta för användaren: vad som ska skickas till kunden för godkännande.

### `rapport <kund> [ÅÅÅÅ-MM]`
`byra-granskare` sammanställer från siffror/skärmdumpar som användaren lagt i `leveranser/ÅÅÅÅ-MM/data/`: vad som gjorts, räckvidd, profilvisningar och vägbeskrivningar/samtal från Google, bokningar om tillgängligt, nästa månads fokus. Ton: ärlig, kort, på restaurangägarens språk. Hitta aldrig på siffror.

## Regler
- Kunden godkänner allt innan det publiceras. Användaren publicerar/schemalägger (eller via kundens partneråtkomst) — aldrig med kundens lösenord.
- Lova aktivitet och transparens, inte försäljningsresultat.
- Billig modell för rutinjobb, inga betalverktyg utan användarens OK.
