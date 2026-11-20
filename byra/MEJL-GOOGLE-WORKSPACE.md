# Mejl med Google Workspace: hej@fullthus.se

Cirka 30 minuter. Kräver att du redan har köpt **fullthus.se**. Allt du ska skriva in står här.

**Kostnad:** Business Starter cirka 76,50 kr per användare och månad med årsavtal, eller cirka 91,70 kr per månad utan bindning (Googles prislista, november 2026). **Du behöver bara EN användare.** Övriga adresser blir gratis alias (se steg 4).

Du får: Gmail med din egen adress, Google Kalender med bokningssida för kundsamtal, Drive för kundmappar och Meet för videosamtal. Det är samma inloggning som du använder när kunderna ger dig åtkomst till sina Google-profiler.

---

## Steg 1: skapa Workspace (10 min)
1. Gå till **workspace.google.com/intl/sv** → **Kom igång**.
2. Företagsnamn: **Fullt Hus** · Antal anställda: **Bara du** · Land: **Sverige**.
3. Dina uppgifter: ditt namn och din vanliga e-post (för återställning).
4. "Har ditt företag en domän?" → **Ja** → skriv `fullthus.se`.
5. Din användare: **[förnamn]@fullthus.se**, till exempel `charlie@fullthus.se`.
6. Välj **Business Starter**. Betala med kort. Det finns ofta 14 dagars gratis provperiod.

## Steg 2: verifiera domänen (5 min)
Google visar en **TXT-post** som börjar med `google-site-verification=...`.
Hos domänleverantören → DNS → **Lägg till post**:

| Typ | Namn/värd | Värde |
|---|---|---|
| TXT | @ | `google-site-verification=…` (kopiera exakt från Google) |

Tillbaka i Google → **Verifiera**. Det kan ta från några minuter upp till ett par timmar.

## Steg 3: få mejlen att komma fram (5 min)
Ta **bort** eventuella gamla MX-poster hos domänleverantören och lägg till:

| Typ | Namn/värd | Värde | Prioritet |
|---|---|---|---|
| MX | @ | `smtp.google.com` | 1 |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | – |
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:hej@fullthus.se` | – |

Rör inte A- och CNAME-posterna för hemsidan (från DOMAN-GUIDE.md). De ska ligga kvar.

## Steg 4: gratis extra adresser (alias)
Admin-konsolen (admin.google.com) → **Användare** → klicka på dig → **Lägg till alternativa e-postadresser**:
- `hej@fullthus.se` (huvudadressen på hemsidan och i PDF:erna)
- `faktura@fullthus.se` (Stripe och kvitton)
- `info@fullthus.se` (folk gissar ofta på den)

Allt kommer in i samma inkorg. Gmail → Inställningar → Konton → **Skicka e-post som**: lägg till `hej@fullthus.se`, så kan du välja avsändare.

## Steg 5: DKIM, så att mejlen inte hamnar i skräpposten (5 min, gör 48 h efter steg 3)
admin.google.com → **Appar → Google Workspace → Gmail → Autentisera e-post** → **Generera ny post** (2048 bitar) → Google visar en TXT-post:

| Typ | Namn/värd | Värde |
|---|---|---|
| TXT | google._domainkey | `v=DKIM1; k=rsa; p=…` (kopiera exakt) |

Vänta en timme → **Börja autentisera**.

## Steg 6: säkerhet och signatur (5 min)
- [ ] **Tvåstegsverifiering:** myaccount.google.com → Säkerhet. Viktigt, eftersom kunderna ger dig åtkomst till sina konton.
- [ ] Profilbild: Fullt Hus-loggan.
- [ ] Signatur (Gmail → Inställningar → Signatur):

```
[Ditt namn]
Fullt Hus · Marknadsföring för kaféer och restauranger
hej@fullthus.se · fullthus.se
```

## Steg 7: Claude kontrollerar
Säg **"mejlen är klar"** till Claude. Claude kollar då att MX, SPF, DMARC och DKIM syns korrekt på internet och säger exakt vad som ska rättas om något saknas.

---

### Billigare alternativ
Zoho Mail har en gratisplan med upp till 5 adresser på egen domän (bara webb och app, ingen Google Drive eller Kalender). Välj den om du vill hålla kostnaden på 0 kr i början. Du kan byta till Workspace senare.
