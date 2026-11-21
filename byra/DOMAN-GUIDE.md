# fullthusbyra.se: koppla domänen till hemsidan (cirka 20 min)

Domänen är köpt hos Loopia (utan DNS-paket). Vi styr den gratis via Cloudflare. Gör stegen i ordning och säg till Claude efter varje steg, så kontrollerar Claude att det har slagit igenom.

## Steg 1: Cloudflare-konto (5 min, gratis)
1. Gå till **dash.cloudflare.com/sign-up** och skapa konto med fullthus.se@gmail.com. Slå på tvåstegsverifiering.
2. Välj **Add a domain** (Lägg till domän) → skriv `fullthusbyra.se` → välj **Free**-planen (0 kr).
3. Cloudflare visar två **nameservers** (namnservrar), till exempel `anna.ns.cloudflare.com` och `bob.ns.cloudflare.com`. Låt fliken vara öppen.

## Steg 2: peka domänen till Cloudflare hos Loopia (5 min)
1. Logga in på **Loopia Kundzon** (customerzone.loopia.se).
2. Välj domänen `fullthusbyra.se` → **Ändra DNS-servrar / namnservrar** → välj att använda **egna/externa** namnservrar.
3. Klistra in de två adresserna från Cloudflare och spara.
4. Tillbaka i Cloudflare: tryck **Check nameservers**. Det kan ta från några minuter till några timmar innan Cloudflare säger "Active".

## Steg 3: lägg in hemsidan i Cloudflare (5 min)
Cloudflare → `fullthusbyra.se` → **DNS → Records → Add record**. Ta först bort eventuella gamla A- eller CNAME-poster för `@` och `www`. Lägg sedan till dessa. Viktigt: ställ **Proxy status** på **DNS only** (grått moln) på alla.

| Type | Name | Content |
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

## Steg 4: tala om för GitHub (2 min)
1. Öppna https://github.com/charlienordstrom890-dotcom/Full-controll/settings/pages
2. **Custom domain:** skriv `fullthusbyra.se` → **Save**.
3. När kontrollen blir grön (minuter till några timmar): kryssa i **Enforce HTTPS**.

Klart: https://fullthusbyra.se visar hemsidan.

## Steg 5: mejl på domänen (senare)
hej@fullthusbyra.se: gratis via Zoho Mail eller med Google Workspace. Posterna läggs in i samma DNS-lista i Cloudflare. Se `MEJL-GOOGLE-WORKSPACE.md` (byt fullthus.se mot fullthusbyra.se).
