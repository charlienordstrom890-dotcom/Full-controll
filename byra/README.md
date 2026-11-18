# Fullt Hus — marknadsföring på abonnemang för restauranger och kaféer

Arbetsnamn. `fullthus.se` såg ledig ut i en DNS-kontroll 2026-11-18 (ej registrerad).

**Löfte:** "Vi fyller era bord — ni lagar maten." Byrån sköter Google-profil, sociala medier, nyhetsbrev och annonser; restaurangen godkänner med ett klick.

Bygger vidare på affärsplanen *AI-hemsidebyggare för restauranger & caféer* (hemsida 299 kr/mån). Marknadsföringen är ett tillägg till samma kunder.

## Varför restauranger och kaféer
- **Störst behov:** ägaren står i köket, innehållet måste uppdateras hela tiden (lunch, säsong, event) och Google-profilen avgör om gäster hittar dit.
- **Många kunder:** cirka 28 600 företag inom mat- och dryckesservering i Sverige (IBISWorld 2025).
- **Visuellt:** mat är lätt att göra bra innehåll av, och resultat (fler bokningar, fler vägbeskrivningar) går att visa.
- **Passar din befintliga affärsplan** — samma kunder, samma säljbesök.
- Nackdel: små marginaler och fler uppsägningar än i andra branscher → håll priserna låga, ingen bindningstid men årsrabatt, visa värde varje månad.

## Paket (exkl. moms, ingen bindningstid, 1 månads uppsägning)
| Paket | Pris/mån | Ingår |
|---|---|---|
| **Synas** | 1 495 kr | Google-profil (1 inlägg/vecka, nya bilder, svar på alla recensioner) + 8 inlägg Instagram/Facebook + månadsrapport |
| **Växa** | 2 995 kr | Allt i Synas + 12 inlägg + 4 reels-manus + nyhetsbrev 1/mån + säsongskampanj |
| **Fullt hus** | 5 495 kr | Allt i Växa + Meta-annonser lokalt (annonsbudget betalas av kunden, rekommenderat från 1 500 kr/mån) + kvartalsmöte |
| Tillägg: Hemsida | 299 kr | Enligt affärsplanen för AI-hemsidebyggaren |

Årsbetalning: 2 månader gratis. Startavgift: 0 kr (gör det lätt att säga ja).

## Arbetsflöde (kommandot `/byra`)
| Steg | Kommando | Din tid |
|---|---|---|
| Hitta kunder | `/byra granskning <restaurang, ort>` → skicka granskningen gratis | 10 min/st |
| Ny kund | `/byra ny-kund <namn>` + introduktionsformuläret | 30 min |
| Varje månad | `/byra manad <kund>` → granska → skicka för godkännande → schemalägg | 1–3 h/kund |
| Rapport | `/byra rapport <kund>` | 15 min/kund |

Team: `byra-strateg`, `byra-innehall`, `byra-granskare` (`.claude/agents/`), med de delade marknadsföringsskills i `.claude/skills/`.

## Verktyg (start)
| Behov | Verktyg | Kostnad |
|---|---|---|
| Betalning/abonnemang | Stripe Billing (kort, autogiro/faktura) | avgift per transaktion |
| Introduktionsformulär | Tally | gratis |
| Schemaläggning | Meta Business Suite (IG/FB), Google-profilen direkt | gratis |
| Godkännande | delad mapp per kund | gratis |
| Hemsida | `byra/hemsida/index.html` (förhandsvisning: https://claude.ai/artifact/9VA25vKvkLSZsSUbq48rJf). För riktig hosting: lägg `<!doctype html>` + charset/viewport överst, koppla formuläret till Tally/Formspree, ladda upp gratis till Cloudflare Pages/GitHub Pages | domän ca 100–200 kr/år |

## Ekonomi (exempel)
20 kunder, snitt 2 500 kr = **50 000 kr/mån**. Kostnader cirka 1 000–2 000 kr/mån + din tid (cirka 40–60 h/mån för 20 kunder).

## Innan första kunden
- [ ] Enskild firma med F-skatt (samma som för Vildpuls fungerar — lägg till verksamhetsbeskrivningen)
- [ ] Kundavtal: vad som ingår, godkännande, att kunden äger sitt material, uppsägning, ansvar
- [ ] Personuppgiftsbiträdesavtal (för nyhetsbrevslistor och kunddata)
- [ ] 2–3 första kunder till halva priset i 3 månader mot att få använda resultaten som kundcase
