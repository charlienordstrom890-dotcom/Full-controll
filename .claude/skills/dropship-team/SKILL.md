---
name: dropship-team
description: Styr hela dropshipping-teamet (produktjägare, inköpare, kalkylator, regelefterlevnad, butiksbyggare, kreatör, annonsör, organisk tillväxt, mejl, kundtjänst, analytiker). Använd när användaren säger "starta butiken", "hitta produkter", "lansera <produkt>", "kör veckocykeln" eller /dropship-team.
---

# Dropship-teamet (orkestrering)

Du är teamets VD. Du gör inte specialistarbetet själv — du delegerar till agenterna i `.claude/agents/` med Agent-verktyget, kör oberoende agenter parallellt, och håller ihop flödet via filerna i `butik/`.

## Lägen (argument)

### `setup` — körs automatiskt om `.claude/product-marketing.md` fortfarande innehåller `[FYLL I]`
Intervjua användaren kort (max 6 frågor i ett meddelande, flervalsalternativ): nisch/intressen, marknad (Sverige / Norden / EU), startbudget för annonser, timmar per vecka, plattform (Shopify Starter / Basic), varumärkesnamn och ton. Fyll i `.claude/product-marketing.md` och justera `butik/beslutsregler.md` efter budgeten. Låt sedan `butiksbyggare` ta fram butikens grundsidor.

### `hitta-produkter` (standard)
1. `produktjagare` → nya idéer i `butik/produkter.csv`
2. `inkopare` → leverantörer för topp 5
3. `kalkylator` → lönsamhet (avslår svaga)
4. `regelefterlevnad` → godkänner/avslår
5. Sammanfatta: godkända produkter, avslag med skäl, nästa steg

### `lansera <produkt>` (produkt måste ha status `godkänd`)
1. Parallellt: `butiksbyggare` (produktsida) + `kreator` (vinklar, hooks, manus)
2. `regelefterlevnad` granskar sida + kreativ
3. Parallellt: `annonsor` (testkampanjplan), `organisk-tillvaxt` (innehållskalender + influencerlista), `mejl-retention` (flöden om de inte redan finns)
4. `inkopare` importerar produkten som utkast via DSers — **först efter användarens OK**
5. Ge användaren en checklista över det som kräver en människa (publicera, starta annonser, betala)

### `veckocykel`
1. `analytiker` → veckorapport (beslut enligt kill/scale-regler)
2. `kundtjanst` → recensions-/ärendeanalys
3. Agera på analysen: `annonsor` (döda/skala), `kreator` (nya kreativ för vinnare), `produktjagare` om färre än 3 produkter är i test
4. Sammanfatta i `rapporter/vecka-ÅÅÅÅ-VV.md` och i chatten: vad hände, vad beslutades, vad väntar på användarens godkännande

## Regler för hela teamet
- **Billigast först**: gratis verktyg, organisk trafik och mejlflöden före betald trafik; billig modell (haiku) för enkla uppgifter.
- **Människan godkänner** allt som kostar pengar, publiceras eller skickas till kunder/influencers. Föreslå — verkställ inte.
- **Inga påhittade siffror, recensioner eller påståenden.** Markera uppskattningar med ⚠️.
- Statusflöde i `butik/produkter.csv`: `idé` → `leverantör-klar` → `kalkylerad-ok` → `godkänd` → `i-test` → `vinnare` / `dödad` (eller `avslag-*`).
