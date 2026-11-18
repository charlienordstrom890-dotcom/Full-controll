# fullthus.se: koppla domänen till hemsidan (cirka 15 minuter)

Hemsidan ligger redan gratis på GitHub Pages. Här kopplar du din egen adress till den. Du behöver bara klicka och klistra in. Allt tekniskt står färdigt nedan.

## Steg 0: slå på GitHub Pages (1 min, gratis, görs en gång)
1. Öppna https://github.com/charlienordstrom890-dotcom/Full-controll/settings/pages
2. Under **Build and deployment → Source**: välj **GitHub Actions**. (Det sparas direkt.)
3. Säg till Claude "Pages är på", så publiceras sidan. Den hamnar på https://charlienordstrom890-dotcom.github.io/Full-controll/

## Steg 1: köp domänen (5 min, cirka 100–250 kr)
1. Gå till en svensk domänleverantör, till exempel **loopia.se** eller **one.com**.
2. Sök på `fullthus.se` → lägg i varukorgen → **välj BARA domänen**, inget webbhotell, ingen hemsidebyggare och ingen e-post (det fixar vi gratis).
3. Betala och bekräfta e-posten du får.

## Steg 2: peka domänen mot hemsidan (5 min)
Hos domänleverantören: leta upp **DNS** (heter ofta "DNS-inställningar" eller "Hantera DNS"). Ta bort befintliga **A**- och **AAAA**-poster för `@` (domänen utan www), och lägg sedan till:

| Typ | Namn/värd | Värde |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | charlienordstrom890-dotcom.github.io |

(Står det "lämna tomt" i stället för `@` hos din leverantör så lämnar du fältet tomt.)

## Steg 3: tala om för GitHub vilken adress som gäller (2 min)
1. Öppna https://github.com/charlienordstrom890-dotcom/Full-controll/settings/pages
2. Under **Custom domain**: skriv `fullthus.se` → **Save**.
3. Vänta tills kontrollen blir grön (allt från några minuter till några timmar), och kryssa sedan i **Enforce HTTPS**.

Klart: https://fullthus.se visar hemsidan.

## Steg 4: mejlen hej@fullthus.se (gratis, 10 min)
1. Skapa ett konto på **zoho.com/mail** → välj gratisplanen ("Forever Free") → ange `fullthus.se`.
2. Zoho visar ett antal poster (**TXT** för verifiering, **MX** och **SPF/DKIM**). Lägg in exakt dem i samma DNS-inställningar som i steg 2. Ta inte bort A- och CNAME-posterna du lagt in.
3. Skapa adressen `hej@fullthus.se` och ladda ner Zoho Mail-appen på mobilen.

När mejlen fungerar skickar formuläret på hemsidan förfrågningarna dit.

## Fastnar du?
Ta en skärmdump av DNS-sidan hos domänleverantören och skicka den till Claude, så säger Claude exakt vad som ska ändras.
