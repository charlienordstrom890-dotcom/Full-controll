// Delad kod för Fullt Hus Stripe-skript.
import Stripe from 'stripe';

export const PAKET = {
  synas:    { namn: 'Synas',     kr: 1495 },
  vaxa:     { namn: 'Växa',      kr: 2995 },
  fullthus: { namn: 'Fullt hus', kr: 5495 },
};
export const PILOT_KUPONG = 'PILOT50';      // 50 % i 3 månader
export const MOMS_META = { app: 'fullthus', typ: 'moms25' };

export function stripeKlient(argv = process.argv) {
  const key = process.env.STRIPE_API_KEY;
  if (!key) {
    console.error('Saknar STRIPE_API_KEY. Kör: export STRIPE_API_KEY=sk_test_...');
    process.exit(1);
  }
  if (key.startsWith('sk_live') && !argv.includes('--live')) {
    console.error('Det här är en LIVE-nyckel. Lägg till --live om du verkligen vill ändra i ditt riktiga konto.');
    process.exit(1);
  }
  // fetch-klienten respekterar NODE_USE_ENV_PROXY (behövs i Claudes molnmiljö), och fungerar som vanligt annars.
  return new Stripe(key, { httpClient: Stripe.createFetchHttpClient() });
}

export async function hittaMoms(stripe) {
  for await (const tr of stripe.taxRates.list({ active: true, limit: 100 })) {
    if (tr.metadata?.app === MOMS_META.app && tr.metadata?.typ === MOMS_META.typ) return tr;
  }
  return null;
}

export const lookupKey = (paket, intervall) => `fullthus_${paket}_${intervall}`;
