// Skapar en kund och ett abonnemang. Stripe mejlar kunden fakturan eller betallänken.
//
//   node ny-kund.mjs --namn "Boulangerie i Vaxholm AB" --epost info@exempel.se \
//     --paket vaxa [--ar] [--pilot] [--betalning faktura|kort] [--orgnr 556...] [--momsnr SE...01]
//
// --betalning faktura (standard): faktura varje period, 30 dagar att betala.
// --betalning kort: första fakturan betalas med kort på Stripes sida, sedan dras kortet automatiskt.
import { parseArgs } from 'node:util';
import { PAKET, PILOT_KUPONG, stripeKlient, hittaMoms, lookupKey } from './lib.mjs';

const { values: a } = parseArgs({ options: {
  namn: { type: 'string' }, epost: { type: 'string' }, paket: { type: 'string' },
  ar: { type: 'boolean' }, pilot: { type: 'boolean' }, betalning: { type: 'string', default: 'faktura' },
  orgnr: { type: 'string' }, momsnr: { type: 'string' }, live: { type: 'boolean' }, help: { type: 'boolean' },
} });

if (a.help || !a.namn || !a.epost || !PAKET[a.paket] || !['faktura', 'kort'].includes(a.betalning)) {
  console.log('Användning: node ny-kund.mjs --namn "Kafé X" --epost x@y.se --paket synas|vaxa|fullthus [--ar] [--pilot] [--betalning faktura|kort] [--orgnr ...] [--momsnr SE...01]');
  process.exit(a.help ? 0 : 1);
}

const stripe = await stripeKlient();
const moms = await hittaMoms(stripe);
if (!moms) { console.error('Kör setup.mjs först.'); process.exit(1); }

const pris = (await stripe.prices.list({ lookup_keys: [lookupKey(a.paket, a.ar ? 'ar' : 'manad')] })).data[0];
if (!pris) { console.error('Hittar inte priset. Kör setup.mjs först.'); process.exit(1); }

const MOMSNR = 'SE050726485101';
const FAKTURA_SIDFOT = `Godkänd för F-skatt · Momsreg.nr ${MOMSNR} · Fullt Hus · fullthusbyra.se`;
const vartMomsId = (await stripe.taxIds.list({ limit: 100 })).data.find(t => t.value === MOMSNR);
if (!vartMomsId) { console.error('Momsnumret saknas i Stripe. Kör foretag.mjs först.'); process.exit(1); }

const kund = await stripe.customers.create({
  name: a.namn, email: a.epost, preferred_locales: ['sv'],
  invoice_settings: { footer: FAKTURA_SIDFOT },
  address: { country: 'SE' },
  metadata: { app: 'fullthus', ...(a.orgnr ? { orgnr: a.orgnr } : {}) },
  ...(a.momsnr ? { tax_id_data: [{ type: 'eu_vat', value: a.momsnr }] } : {}),
});

const faktura = a.betalning === 'faktura';
const sub = await stripe.subscriptions.create({
  customer: kund.id,
  items: [{ price: pris.id }],
  default_tax_rates: [moms.id],
  invoice_settings: { account_tax_ids: [vartMomsId.id] },
  ...(a.pilot ? { discounts: [{ coupon: PILOT_KUPONG }] } : {}),
  collection_method: faktura ? 'send_invoice' : 'charge_automatically',
  ...(faktura ? { days_until_due: 30 } : {
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription', payment_method_types: ['card'] },
  }),
  metadata: { app: 'fullthus', paket: a.paket },
  expand: ['latest_invoice'],
});

let inv = sub.latest_invoice;
if (faktura && inv?.status === 'draft') inv = await stripe.invoices.finalizeInvoice(inv.id);
if (faktura) await stripe.invoices.sendInvoice(inv.id);

console.log(`Kund: ${kund.id}  Abonnemang: ${sub.id}  Status: ${sub.status}`);
console.log(`Första fakturan: ${inv?.hosted_invoice_url ?? '(se Dashboard)'}`);
console.log(faktura
  ? 'Fakturan är mejlad till kunden (i testläge skickas inga riktiga mejl).'
  : 'Skicka länken ovan till kunden. När kortet är betalt dras det automatiskt varje period.');
