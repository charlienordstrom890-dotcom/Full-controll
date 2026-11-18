# Kom igång med Fullt Hus: den enklaste vägen

Cirka en kväll och några hundra kronor. Gör stegen i ordning. Allt som kräver ditt personnummer eller kort måste du göra själv.

## 1. Företaget (gratis, gör först eftersom F-skatten tar tid)
- [ ] Registrera **enskild firma** och ansök om **F-skatt** på verksamt.se. Företag vill att leverantörer har F-skatt. Annars måste de dra skatt på det de betalar dig.
- [ ] Moms: om du räknar med att sälja för mindre än 120 000 kr per år kan du ansöka om momsbefrielse. Då tar du inte ut moms ⚠️ kontrollera reglerna hos Skatteverket. Annars momsregistrerar du dig och lägger på 25 % moms.
- [ ] Ett separat bankkonto för firman (enklare bokföring).

## 2. Domän (cirka 100–250 kr första året)
- [ ] Köp **fullthus.se** hos en svensk domänleverantör (till exempel Loopia, One.com eller Miss Hosting). Jämför priset för år två, eftersom första året ofta är rabatterat.
- Reserv om den hunnit tas: fullthusbyra.se, fullabord.se, krogarhjalpen.se. Alla såg lediga ut 2026-11-18.

## 3. Mejl: hej@fullthus.se (gratis)
- [ ] **Zoho Mail, gratisplanen:** 1 domän, upp till 5 adresser, webbmejl och app ⚠️ kontrollera att gratisplanen finns för din region när du registrerar dig. Följ guiden "lägg till domän", som visar vilka DNS-poster du klistrar in hos domänleverantören (cirka 15 min).
- Alternativ: många domänleverantörer har billig e-post i paket. Eller vidarebefordra hej@fullthus.se till din vanliga Gmail.
- [ ] Slå på tvåstegsverifiering.

## 4. Hemsidan live (gratis)
- [ ] Skapa ett gratis formulär i **Tally** med frågorna från granskningsformuläret (namn, ort, typ, ditt namn, e-post), och ett med frågorna i `byra/introduktionsformular.md`.
- [ ] Be Claude: *"gör hemsidan redo att publicera med Tally-länken X"*. Då kopplas formuläret och sidan får rätt filhuvud.
- [ ] **Cloudflare Pages** (gratis) → *Upload assets* → dra in mappen → koppla fullthus.se under *Custom domains*.

## 5. Betalning: Stripe
Ja, Stripe passar bra för abonnemang och fungerar i Sverige.
- [ ] Skapa ett konto på stripe.com. Det kräver firmans uppgifter och bankkonto.
- [ ] Skapa tre **produkter med återkommande pris**: Synas 1 495 kr/mån, Växa 2 995 kr/mån, Fullt hus 5 495 kr/mån, plus moms om du är momsregistrerad. Lägg till ett **introduktionspris** (kupong 50 % i 3 månader) för de första kunderna.
- [ ] Skapa en **Payment Link** per paket. Det kräver ingen kod. Kunden betalar med kort, och Stripe drar beloppet automatiskt varje månad.
- [ ] Många restauranger vill hellre ha **faktura**. Stripe kan skicka återkommande fakturor som kunden betalar med banköverföring eller kort.
- Avgifter: enligt Stripe ligger kortavgifterna i Sverige oftast på cirka 1–3 % plus några kronor per betalning ⚠️ kolla stripe.com/se/pricing för exakta priser.

## 6. Avtal (be Claude om utkast)
- [ ] Kundavtal på en sida: vad som ingår, att kunden godkänner allt innan publicering, att kunden äger materialet, en månads uppsägning och hur betalning sker.
- [ ] Personuppgiftsbiträdesavtal (behövs när du hanterar deras nyhetsbrevslista).

## 7. Första kunden
- [ ] Kolla Boulangeries Google-profil själv (checklistan i granskningen, 10 min).
- [ ] Gå dit en lugn eftermiddag med PDF:en i mobilen, eller mejla den med utkastet i granskningen.
- [ ] Säger de ja: `/byra ny-kund boulangerie` → de fyller i formuläret → `/byra manad boulangerie`.

Kostnad för att komma igång: domän cirka 100–250 kr. Allt annat är gratis tills du får betalt.
