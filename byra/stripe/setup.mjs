// Skapar Fullt Hus produktkatalog i Stripe. Går att köra flera gånger: det som redan finns återanvänds.
//   STRIPE_API_KEY=sk_test_... node setup.mjs
import { PAKET, PILOT_KUPONG, MOMS_META, stripeKlient, hittaMoms, lookupKey } from './lib.mjs';

const stripe = await stripeKlient();

// 1. Moms 25 % (manuell skattesats, gratis; Stripe Tax behövs inte för svensk B2B-moms)
let moms = await hittaMoms(stripe);
if (!moms) {
  moms = await stripe.taxRates.create({
    display_name: 'Moms', percentage: 25, inclusive: false, country: 'SE',
    jurisdiction: 'SE', description: 'Svensk moms 25 %', metadata: MOMS_META,
  });
  console.log('Skapade moms 25 %:', moms.id);
} else console.log('Moms finns redan:', moms.id);

// 2. Produkter och priser (månad + år med 2 månader gratis)
for (const [key, p] of Object.entries(PAKET)) {
  const finns = await stripe.prices.list({ lookup_keys: [lookupKey(key, 'manad'), lookupKey(key, 'ar')], expand: ['data.product'] });
  const harManad = finns.data.find(x => x.lookup_key === lookupKey(key, 'manad'));
  const harAr = finns.data.find(x => x.lookup_key === lookupKey(key, 'ar'));
  const productId = harManad?.product?.id ?? harAr?.product?.id ?? (await stripe.products.create({
    name: `Fullt Hus – ${p.namn}`,
    description: 'Marknadsföring för kaféer och restauranger, per månad. Ingen bindningstid.',
    metadata: { app: 'fullthus', paket: key },
  })).id;

  if (!harManad) {
    await stripe.prices.create({ product: productId, currency: 'sek', unit_amount: p.kr * 100,
      recurring: { interval: 'month' }, lookup_key: lookupKey(key, 'manad'), tax_behavior: 'exclusive',
      nickname: `${p.namn} per månad` });
  }
  if (!harAr) {
    await stripe.prices.create({ product: productId, currency: 'sek', unit_amount: p.kr * 10 * 100,
      recurring: { interval: 'year' }, lookup_key: lookupKey(key, 'ar'), tax_behavior: 'exclusive',
      nickname: `${p.namn} per år (2 månader gratis)` });
  }
  console.log(`Paket ${p.namn}: ${p.kr} kr/mån och ${p.kr * 10} kr/år (exkl. moms)`);
}

// 3. Pilotkupong: 50 % i 3 månader
try {
  await stripe.coupons.retrieve(PILOT_KUPONG);
  console.log('Pilotkupongen finns redan');
} catch {
  await stripe.coupons.create({ id: PILOT_KUPONG, name: 'Pilotkund 50 % i 3 månader',
    percent_off: 50, duration: 'repeating', duration_in_months: 3 });
  console.log('Skapade pilotkupong', PILOT_KUPONG);
}

console.log('\nKlart. Nästa steg: node ny-kund.mjs --help');
