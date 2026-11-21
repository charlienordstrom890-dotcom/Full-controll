# Fullt Hus

Marknadsföring på abonnemang för restauranger, kaféer och bagerier. Det här repot innehåller hemsidan, byråns AI-team i Claude Code, granskningar, PDF:er, Instagram-material och Stripe-uppsättningen.

**Hemsida:** https://charlienordstrom890-dotcom.github.io/Full-controll/ (publiceras automatiskt från `byra/hemsida/`)

## Kom igång
Alla kommandon står i [`KOMMANDON.txt`](KOMMANDON.txt). De viktigaste:

| Kommando | Vad det gör |
|---|---|
| `/byra salj 10 <ort>` | Hittar lokala kaféer och restauranger som passar som kunder |
| `/byra granskning <företag, ort>` | Gratis granskning med 5 förbättringar och mejlutkast |
| `/byra ny-kund <namn>` | Kundprofil och 90-dagarsplan |
| `/byra manad <kund>` | En månads innehåll, kontrollerat mot reglerna |
| `/byra rapport <kund>` | Månadsrapport med verkliga siffror |

## Teamet (`.claude/agents/`)
- **byra-granskare:** granskningar, regelkontroll och rapporter. Får bara påstå fel som den själv har sett på företagets sida.
- **byra-strateg:** 90-dagars- och månadsplaner efter svensk säsong.
- **byra-innehall:** inlägg, Google-inlägg, reels-manus, nyhetsbrev och svar på recensioner.

## Skills (`.claude/skills/`)
`byra` är arbetsflödet. Övriga är öppna (MIT) marknadsföringsskills, bland annat från [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) och [thatrebeccarae/claude-marketing](https://github.com/thatrebeccarae/claude-marketing). Se [`KALLOR.md`](KALLOR.md).

## Mappar
| Mapp | Innehåll |
|---|---|
| `byra/hemsida/` | Hemsidan och byggskriptet |
| `byra/granskningar/` | Granskningar och PDF:er |
| `byra/kunder/` | En mapp per kund (mall i `_mall/`) |
| `byra/instagram/` | Instagram-bilder, höjdpunkter och texter |
| `byra/varumarke/` | Logga och profilbild |
| `byra/stripe/` | Stripe-skript: produkter, moms, pilotkupong, nya kunder |
| `byra/KOM-IGANG.md` | Steg för att starta byrån |
| `byra/DOMAN-GUIDE.md`, `byra/MEJL-GOOGLE-WORKSPACE.md` | Domän och mejl på egen domän |
