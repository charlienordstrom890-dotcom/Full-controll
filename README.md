# Full-controll — automatiserat dropshipping-team

Ett team av AI-agenter i Claude Code som hittar produkter, räknar lönsamhet, kollar lagkrav, bygger butiken och sköter marknadsföringen för en dropshipping-butik utan eget lager. Fokus: Sverige/EU och lägsta möjliga kostnad.

## Kom igång
1. Öppna repot i Claude Code.
2. Kör `/dropship-team setup`: teamet intervjuar dig och fyller i `.claude/product-marketing.md`.
3. Kör `/dropship-team hitta-produkter`.
4. Kör `/dropship-team lansera <produkt>` på en godkänd produkt.
5. Kör `/dropship-team veckocykel` en gång i veckan (eller automatiskt, se nedan).

## Teamet (`.claude/agents/`)
| Agent | Gör | Modell |
|---|---|---|
| produktjagare | hittar och poängsätter produkter (TikTok, Amazon, Google Trends, Meta Ad Library, AliExpress) | sonnet |
| inkopare | jämför leverantörer, landad kostnad, fraktid; importerar via DSers | sonnet |
| kalkylator | bidrag, break-even-ROAS, prissättning — grindvakt | haiku |
| regelefterlevnad | GPSR, CE, ångerrätt, marknadsföringslagen, varumärken — grindvakt | sonnet |
| butiksbyggare | produktsidor, SEO, konvertering, policysidor | sonnet |
| kreator | annonsvinklar, hooks, UGC-manus, bildbriefer | sonnet |
| annonsor | Meta/TikTok/Google, testbudget, kill/scale-regler | sonnet |
| organisk-tillvaxt | TikTok/Reels-kalender, mikroinfluencers, SEO | sonnet |
| mejl-retention | välkomst, övergiven varukorg, efterköp, återvinning | sonnet |
| kundtjanst | svarsmallar, returer, recensionsanalys | haiku |
| analytiker | veckorapport och åtgärdslista | haiku |

Teamet **föreslår**, du **godkänner**: inga köp, annonsstarter, publiceringar eller utskick sker utan ditt OK.

Flödet: `idé → leverantör-klar → kalkylerad-ok → godkänd → i-test → vinnare / dödad`, spårat i `butik/produkter.csv`. Gränserna står i `butik/beslutsregler.md`.

## Skills (`.claude/skills/`)
`dropship-team` är orkestreringen. Övriga 55 är de bästa öppna (MIT) skills som finns på GitHub för e-handel och marknadsföring, utvalda och kopierade med licens:

- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills): copywriting, CRO, annonskreativ, erbjudanden, mejl, social, AI-SEO, prissättning
- [thatrebeccarae/claude-marketing](https://github.com/thatrebeccarae/claude-marketing): Meta-, TikTok- och Google Ads, Shopify, Klaviyo, slöseri-sökare, konkurrentannonser
- [nexscope-ai/ecommerce-skills](https://github.com/nexscope-ai/ecommerce-skills): dropshipping-produktresearch, trendprodukter, marginalkalkyl, Shopify-setup/SEO/flöden, influencers
- [CosmoBlk/email-marketing-bible](https://github.com/CosmoBlk/email-marketing-bible): mejlmarknadsföring

Se `KALLOR.md` för exakt lista.

## Billigaste stacken
| Behov | Billigast | Kostnad (⚠️ kolla aktuella priser) |
|---|---|---|
| Butik | Shopify Starter (säljer via länk/social, ingen full temabutik) → Basic när du har en vinnare | Starter ca 5 USD/mån + 5 % avgift; Basic ca 24–32 €/mån beroende på betalperiod |
| Leverantör/order | DSers gratisplan (AliExpress/1688, upp till 3 000 produkter) + DSers MCP i `.mcp.json` | 0 kr |
| Mejl | Shopify Email (gratis månadskvot) → Klaviyo när listan växer | 0 kr i början |
| Trafik | Organiskt TikTok/Reels + mikroinfluencers mot provision, gratis Google-listningar | 0 kr + produktkostnad |
| Annonser | Meta/TikTok-test enligt beslutsreglerna | ca 450–600 kr per testad produkt |
| Bild/video | Leverantörens material + CapCut/Canva gratis | 0 kr |
| AI | Claude-abonnemang (Pro/Max) i stället för API; haiku för enkla agenter | abonnemanget |

**Bra att veta om Sverige/EU:** moms gäller från första kronan på import, EU tar sedan juli 2026 en fast tull per vara i småpaket under 150 €, och enligt GPSR krävs en EU-baserad ansvarig person för produkter från Kina. Därför prioriterar teamet leverantörer med EU-lager. Agenten `regelefterlevnad` kollar detta, men den ersätter inte en rådgivare.

## Full automation
`.github/workflows/dropship-team.yml` kör teamet på måndagar (veckocykel) och torsdagar (nya produkter) och sparar rapporterna i repot. Lägg till hemligheten `CLAUDE_CODE_OAUTH_TOKEN` (skapas med `claude setup-token`, använder ditt abonnemang) eller `ANTHROPIC_API_KEY` under *Settings → Secrets → Actions*. Saker som kostar pengar eller publiceras väntar alltid på dig.

## Billig massgenerering (valfritt)
[freellmapi](https://github.com/tashfeenahmed/freellmapi) samlar gratiskvoter från många LLM-leverantörer bakom ett OpenAI-kompatibelt API. Det är användbart för massgenerering av till exempel hundratals produkttexter. Agentteamet kör däremot på Claude.
