// Delad kod för Fullt Hus Stripe-skript.
import Stripe from 'stripe';

export const PAKET = {
  synas:    { namn: 'Synas',     kr: 1495 },
  vaxa:     { namn: 'Växa',      kr: 2995 },
  fullthus: { namn: 'Fullt hus', kr: 5495 },
};
export const PILOT_KUPONG = 'PILOT50';      // 50 % i 3 månader
export const MOMS_META = { app: 'fullthus', typ: 'moms25' };

export async function stripeKlient(argv = process.argv) {
  const key = process.env.STRIPE_API_KEY;
  if (!key) {
    console.error('Saknar STRIPE_API_KEY. Kör: export STRIPE_API_KEY=sk_test_...');
    process.exit(1);
  }
  // fetch-klienten respekterar NODE_USE_ENV_PROXY (behövs i Claudes molnmiljö), och fungerar som vanligt annars.
  const stripe = new Stripe(key, { httpClient: Stripe.createFetchHttpClient() });
  // Fråga Stripe vilket läge nyckeln faktiskt har. I Claudes molnmiljö byter proxyn ut nyckeln,
  // så det som står i STRIPE_API_KEY säger inget om det är test eller live.
  const live = (await stripe.balance.retrieve()).livemode;
  if (live && !argv.includes('--live')) {
    console.error('Nyckeln går mot det RIKTIGA kontot (live). Lägg till --live om du verkligen vill ändra där. Inget ändrat.');
    process.exit(1);
  }
  if (!live && argv.includes('--live')) {
    console.error('Du skrev --live men nyckeln är en testnyckel. Inget ändrat.');
    process.exit(1);
  }
  console.log(live ? 'Läge: LIVE (riktiga kunder och pengar)' : 'Läge: test');
  return stripe;
}

export async function hittaMoms(stripe) {
  for await (const tr of stripe.taxRates.list({ active: true, limit: 100 })) {
    if (tr.metadata?.app === MOMS_META.app && tr.metadata?.typ === MOMS_META.typ) return tr;
  }
  return null;
}

export const lookupKey = (paket, intervall) => `fullthus_${paket}_${intervall}`;
