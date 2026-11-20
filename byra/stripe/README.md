# Stripe för Fullt Hus

## Plan (vad vi använder och inte)

| Stripe-produkt | Använder vi? | Varför |
|---|---|---|
| **Billing** | Ja | Månads- och årsabonnemang, pilotkupong 50 % i 3 månader |
| **Invoicing** | Ja | Restauranger betalar helst faktura, 30 dagar. Stripe mejlar fakturan varje period |
| **Payments** | Ja, kort | Den som vill betala med kort gör det på Stripes fakturasida; sedan dras kortet automatiskt |
| **Tax** | Nej, inte nu | All försäljning är svensk B2B med 25 % moms. En gratis manuell skattesats räcker. Stripe Tax tar en avgift per transaktion och behövs först vid försäljning till andra länder |
| **Connect** | Nej | Connect är för plattformar som tar betalt åt andra säljare. Fullt Hus tar bara betalt för sina egna tjänster, och kunderna betalar annonser direkt till Meta |

Hemsidan är statisk (GitHub Pages), så vi bygger ingen kassa på sidan. Kunden får en faktura- eller betallänk via mejl när avtalet är klart. Det kräver ingen server och inga hemliga nycklar på hemsidan.

## Kom igång

1. **Skapa Stripe-konto** på stripe.com med fullthus.se@gmail.com. Testläget fungerar direkt, innan F-skatten är klar.
2. **Ge Claude en testnyckel** (`sk_test_...`) via det säkra formuläret Claude visar. Klistra aldrig in nycklar i chatten.
3. Claude kör:
   ```sh
   cd byra/stripe && npm install
   node setup.mjs        # moms 25 %, tre paket (månad + år), pilotkupong
   node ny-kund.mjs --namn "Testkafé" --epost test@example.com --paket vaxa --pilot
   ```
4. Testa betalning med testkortet `4242 4242 4242 4242`, valfritt framtida datum och CVC.

## Inställningar i Dashboard (gör en gång, innan livekörning)

Inställningar → **Fakturor**:
- Fakturamall, sidfot: `Godkänd för F-skatt · Momsreg.nr SE[ditt personnummer utan bindestreck]01 · Org.nr [personnummer]`
- Betalningsvillkor: 30 dagar
- Språk: svenska
- Påminnelser: e-post 3 dagar efter förfallodag

Inställningar → **Kundportal**: slå på, så att kunderna själva kan byta kort, se kvitton och säga upp.

Inställningar → **Kontoinformation**: företagets namn "Fullt Hus", fullthus.se@gmail.com, logga från `byra/varumarke/`.

## Livekörning (när F-skatt och moms är godkända)

1. Aktivera kontot i Stripe (personnummer, bankkonto).
2. Kör `node setup.mjs --live` med livenyckeln.
3. Ny kund: `node ny-kund.mjs ... --live`.

## Varje ny kund

```sh
# Faktura 30 dagar, pilotpris
node ny-kund.mjs --namn "Boulangerie i Vaxholm AB" --epost info@exempel.se --paket vaxa --pilot --orgnr 556721-5677

# Kort, årsbetalning
node ny-kund.mjs --namn "Kafé X" --epost x@exempel.se --paket synas --ar --betalning kort
```
Eller gör samma sak i Dashboard: Kunder → Ny kund → Skapa abonnemang (välj priset, moms 25 %, kupongen PILOT50, "Skicka faktura").
