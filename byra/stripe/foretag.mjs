// Lägger in Fullt Hus momsnummer och skapar kundportalen. Kan köras flera gånger (skapar inga dubbletter).
//
//   node foretag.mjs [--live]
import { PAKET, stripeKlient, lookupKey } from './lib.mjs';

export const MOMSNR = 'SE050726485101';
export const FAKTURA_SIDFOT = `Godkänd för F-skatt · Momsreg.nr ${MOMSNR} · Fullt Hus · fullthusbyra.se`;
const HEMSIDA = 'https://fullthusbyra.se';

const stripe = await stripeKlient();

// 1. Företagets momsnummer (skrivs ut på fakturorna)
let skatteId = (await stripe.taxIds.list({ limit: 100 })).data.find(t => t.value === MOMSNR);
if (!skatteId) skatteId = await stripe.taxIds.create({ type: 'eu_vat', value: MOMSNR });
console.log(`Momsnummer: ${skatteId.value} (${skatteId.id})`);

// 2. Kundportal: fakturor, byta kort, egna uppgifter, avsluta vid periodens slut, byta paket
const produkter = [];
for (const p of Object.keys(PAKET)) {
  const pris = (await stripe.prices.list({ lookup_keys: [lookupKey(p, 'manad')] })).data[0];
  if (pris) produkter.push({ product: pris.product, prices: [pris.id] });
}
const config = {
  business_profile: { headline: 'Fullt Hus: era fakturor och ert abonnemang', privacy_policy_url: HEMSIDA, terms_of_service_url: HEMSIDA },
  default_return_url: HEMSIDA,
  login_page: { enabled: true },
  features: {
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
    customer_update: { enabled: true, allowed_updates: ['name', 'email', 'address', 'tax_id'] },
    subscription_cancel: {
      enabled: true, mode: 'at_period_end', proration_behavior: 'none',
      cancellation_reason: { enabled: true, options: ['too_expensive', 'unused', 'switched_service', 'other'] },
    },
    subscription_update: {
      enabled: produkter.length > 1, default_allowed_updates: ['price'],
      proration_behavior: 'create_prorations', products: produkter,
    },
  },
  metadata: { app: 'fullthus' },
};
const befintlig = (await stripe.billingPortal.configurations.list({ limit: 100 })).data.find(c => c.metadata?.app === 'fullthus');
const portal = befintlig
  ? await stripe.billingPortal.configurations.update(befintlig.id, config)
  : await stripe.billingPortal.configurations.create(config);
console.log(`Kundportal: ${portal.id} aktiv=${portal.active} standard=${portal.is_default}`);
console.log(`Inloggningslänk för kunder: ${portal.login_page.url}`);
