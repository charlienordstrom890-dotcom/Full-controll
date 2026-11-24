# Stripe: gör klart allt, steg för steg (cirka 25 min)

Gör stegen på datorn i dashboard.stripe.com. Kontrollera uppe till vänster att du är i **Fullt hus** och att det **inte** står "Testläge" eller "Sandbox". Menynamnen kan vara på engelska; båda står med.

## Steg 1: Företagsuppgifter (3 min)
1. Tryck på **kugghjulet** uppe till höger → **Inställningar (Settings)**.
2. Under **Företag (Business)**: välj **Företagsuppgifter → Offentliga uppgifter (Public details)**.
3. **Webbplats (Website):** `https://fullthusbyra.se`
4. **Support-e-post (Support email):** `fullthus.se@gmail.com`
5. **Supporttelefon:** ditt mobilnummer (krävs ibland, syns på kvitton).
6. Tryck **Spara (Save)**.

## Steg 2: Logga och färg (5 min)
1. Inställningar → **Företag → Varumärke (Branding)**.
2. **Ikon (Icon):** ladda upp `byra/varumarke/Fullt-Hus-profilbild-1000x1000.png` (den mörka med tre röda prickar).
3. **Logga (Logo):** ladda upp Fullt Hus-loggan från `byra/varumarke/`.
4. **Varumärkesfärg (Brand color):** `#C8322B`
5. **Accentfärg (Accent color):** `#1A1A1A`
6. Tryck **Spara**. Till höger ser du hur fakturan och betalsidan kommer att se ut.

## Steg 3: Momsnumret på fakturorna (2 min)
1. Inställningar → **Billing → Fakturor (Invoices)**.
2. Leta upp **Skatte-ID för kontot (Account tax IDs)** → **Lägg till (Add)**.
3. Typ: **EU VAT / Momsregistreringsnummer**. Värde: `SE050726485101`.
4. Spara.

## Steg 4: Fakturans standardinställningar (5 min)
Samma sida (Billing → Fakturor):
1. **Standardsidfot (Default footer):**
   ```
   Godkänd för F-skatt · Momsreg.nr SE050726485101 · Fullt Hus · fullthusbyra.se
   ```
2. **Betalningsvillkor (Default payment terms / Net):** **30 dagar**.
3. **Fakturanummer-prefix:** låt Stripe föreslå, eller skriv `FH`.
4. Tryck **Spara**.

## Steg 5: Påminnelser och mejl till kunden (3 min)
1. Inställningar → **Billing → Abonnemang och e-post (Subscriptions and emails)**.
2. Slå på:
   - **Skicka fakturor till kunder via e-post**
   - **Skicka påminnelse** 3 dagar **efter** förfallodagen
   - **Skicka kvitton** för lyckade betalningar
   - **Mejla kunden när ett kort misslyckas** (failed payments)
3. Under **Hantera misslyckade betalningar**: låt Stripe försöka dra kortet igen (Smart Retries). Om alla försök misslyckas: välj **markera abonnemanget som obetalt** (inte avsluta).
4. Spara.

## Steg 6: Kundportalen (3 min)
1. Inställningar → **Billing → Kundportal (Customer portal)**.
2. Tryck **Aktivera länk (Activate link)**.
3. Slå på:
   - **Fakturor:** visa fakturahistorik
   - **Betalningsmetoder:** kunden kan byta kort
   - **Kunduppgifter:** namn, e-post, adress, momsnummer
   - **Abonnemang → Avsluta:** ja, **i slutet av perioden** (det matchar "ingen bindningstid")
   - **Byt paket:** ja, mellan Synas, Växa och Fullt hus (månad)
4. **Länkar:** Villkor och Integritet = `https://fullthusbyra.se`
5. Spara. Kopiera portallänken och skicka den till Claude, så hamnar den i välkomstmejlet till nya kunder.

## Steg 7: Säkerhet (2 min)
1. Klicka på ditt namn uppe till höger → **Profil**.
2. Kontrollera att **tvåstegsverifiering** är påslagen.
3. Lägg till en **reservkod** och spara den i din lösenordshanterare.

## Steg 8: Säg "Stripe klart" till Claude
Claude läser då av kontot och kontrollerar att webbplats, support-e-post, logga, momsnummer och kundportal finns. Därefter gör Claude en provfaktura i testläget, så att du ser hur den ser ut innan någon riktig kund får en.

---

### När en kund säger ja
Säg till Claude: *"Ny kund: [företag], [e-post], paket Växa, pilot, faktura"*. Claude skapar kunden och abonnemanget i Stripe, och fakturan går ut automatiskt. Kunden kan välja att betala med kort direkt på fakturasidan.
