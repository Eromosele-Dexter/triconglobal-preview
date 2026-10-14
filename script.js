import { initializeStaticPreview } from './static-preview.js';
import { initializeMotion } from './motion.js';
import { INQUIRY_TYPES } from './inquiry-contract.js';
import { informationPages } from './information-pages.js';
import { callPage } from './call-page.js';
import { applyLanguage, toggleLanguage, translate, getLanguage } from './language.js';
import { submitInquiry } from './submit-inquiry.js';

const commodities = {
  cocoa: {
    name: 'Cocoa beans',
    slug: 'cocoa',
    index: '01',
    origin: 'Nigerian origin',
    intro: 'A structured pathway for buyers who need origin context, documentation and commercial terms before an introduction.',
    uses: 'Chocolate, cocoa ingredients, food manufacturing',
    fields: [['Commodity', 'Cocoa beans'], ['Origin', 'Nigeria'], ['Intended uses', 'Chocolate and cocoa processing'], ['Available grades', 'To be confirmed with supplier'], ['Indicative terms', 'FOB / CIF options subject to offer'], ['Documentation', 'Specs, samples and inspection options subject to confirmation']],
  },
  sesame: {
    name: 'Sesame seeds',
    slug: 'sesame',
    index: '02',
    origin: 'Nigerian origin',
    intro: 'A clean commercial route for ingredient buyers who require clarity on specifications, packaging and shipment terms.',
    uses: 'Tahini, bakery, food ingredients, wholesale',
    fields: [['Commodity', 'Sesame seeds'], ['Origin', 'Nigeria'], ['Intended uses', 'Food ingredients and processing'], ['Quality parameters', 'To be confirmed with supplier'], ['Indicative terms', 'FOB / CIF options subject to offer'], ['Documentation', 'Specs, samples and inspection options subject to confirmation']],
  },
  cashew: {
    name: 'Cashew nuts',
    slug: 'cashew',
    index: '03',
    origin: 'Nigerian origin',
    intro: 'A documentation-led pathway for processors, distributors and buyers assessing raw or processed cashew opportunities.',
    uses: 'Cashew processing, snacks, ingredient supply',
    fields: [['Commodity', 'Cashew nuts'], ['Origin', 'Nigeria'], ['Intended uses', 'Processing, snack and ingredient supply'], ['Grade / count', 'To be confirmed with supplier'], ['Indicative terms', 'FOB / CIF options subject to offer'], ['Documentation', 'Specs, samples and inspection options subject to confirmation']],
  },
};

const navItems = [
  ['/commodities', 'Commodities'], ['/how-we-work', 'How we work'], ['/buyers', 'For buyers'], ['/suppliers', 'For suppliers'], ['/quality', 'Quality'],
];

const mark = `<img class="brand-mark" src="/keystone-reversed.svg" alt="" aria-hidden="true" />`;

function header(active = '') {
  return `<a href="#main" class="skip-link">Skip to content</a>
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="/" aria-label="Tricon Global Trading home">${mark}<span class="brand-wordmark"><span class="brand-name">TRICON</span><span class="brand-sub">Global trading · Nigeria to North America</span></span></a>
      <nav class="site-nav" aria-label="Primary navigation">${navItems.map(([href, label]) => `<a href="${href}" ${active === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
      <div class="header-actions"><button class="lang-toggle" type="button" aria-label="Language selector">EN / FR</button><a class="button button-primary" href="/contact">Request a quote <span aria-hidden="true">↗</span></a><button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span></button></div>
    </div></header>`;
}

function footer() {
  return `<div class="disclosure"><div class="container disclosure-inner"><p><strong>Intermediary disclosure.</strong> Tricon introduces qualified buyers and suppliers; it does not own, store, ship, insure or guarantee the commodities. Buyer and supplier contract directly. Commercial instruments such as NCNDA or IMFPA are subject to appropriate legal review and jurisdictional requirements.</p><a class="text-link" href="/intermediary-disclosure">Read the boundaries</a></div></div>
  <footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-intro"><a class="brand" href="/">${mark}<span class="brand-wordmark"><span class="brand-name">TRICON</span><span class="brand-sub">Global trading</span></span></a><p>A disciplined commercial bridge between Nigerian origin and qualified North American demand.</p></div><div class="footer-col"><h3>Explore</h3><a href="/commodities">Commodities</a><a href="/how-we-work">How we work</a><a href="/quality">Quality</a><a href="/insights">Insights</a></div><div class="footer-col"><h3>Work with us</h3><a href="/buyers">For buyers</a><a href="/suppliers">For suppliers</a><a href="/contact">Request a quote</a><a href="/book-a-call">Book a call</a></div><div class="footer-col"><h3>Company</h3><a href="/about">About Tricon</a><a href="/intermediary-disclosure">Intermediary disclosure</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><div class="footer-bottom"><span>© 2026 Tricon Global Trading. All rights reserved.</span><span>Nigeria → Canada / North America</span></div></div></footer>`;
}

function corridorGraphic() {
  return `<div class="corridor-panel" aria-label="Illustration of the Nigeria to North America trade corridor"><div class="corridor-grid"></div><svg class="corridor-svg" viewBox="0 0 500 330" role="img" aria-label="Lagos to Montreal corridor"><path class="lane-ghost" d="M48 262 C150 236 186 205 252 194 S380 150 453 68"/><path class="lane-ghost" d="M48 284 C160 262 206 230 274 214 S390 170 453 94"/><path class="lane" d="M48 270 C138 250 188 214 250 202 S375 148 453 76"/><circle class="node" cx="48" cy="270" r="9"/><circle class="node-core" cx="48" cy="270" r="3"/><circle class="node" cx="250" cy="202" r="9"/><circle class="node-core" cx="250" cy="202" r="3"/><circle class="node" cx="453" cy="76" r="9"/><circle class="node-core" cx="453" cy="76" r="3"/><text x="54" y="252">ORIGIN</text><text x="258" y="184">TERMS</text><text x="390" y="58">DEMAND</text></svg><div class="corridor-label origin"><span>Origin / port</span><strong>Lagos · Apapa / Tin Can</strong></div><div class="corridor-label destination"><span>Market focus</span><strong>Montréal · Canada</strong></div><div class="corridor-tag">FOB · CIF · direct contracts</div></div>`;
}

function trustStrip() {
  return `<section class="trust-strip"><div class="container trust-grid"><div class="trust-item"><span class="trust-number">01</span><h3>Screened suppliers</h3><p>Registration, export readiness and product information are part of the review.</p></div><div class="trust-item"><span class="trust-number">02</span><h3>Documents first</h3><p>Specs, samples and inspection options before anyone meets.</p></div><div class="trust-item"><span class="trust-number">03</span><h3>Terms in writing</h3><p>Commercial terms are clarified before a buyer introduction.</p></div><div class="trust-item"><span class="trust-number">04</span><h3>Direct contracts</h3><p>Buyer and exporter negotiate and contract directly.</p></div></div></section>`;
}

function commodityMark(type) {
  if (type === 'cocoa') return `<svg class="commodity-mark" viewBox="0 0 200 200"><path d="M52 160 C20 122 31 60 85 44 C129 31 171 57 168 104 C165 154 102 181 52 160Z"/><path d="M83 44 C72 70 74 105 101 141 C118 161 140 168 156 158"/><path d="M51 160 C91 141 118 105 130 45"/><circle cx="96" cy="92" r="22"/></svg>`;
  if (type === 'sesame') return `<svg class="commodity-mark" viewBox="0 0 200 200"><path d="M37 146 C69 119 101 91 149 40"/><path d="M58 128 C43 106 55 83 79 87 C83 60 105 50 123 66 C143 58 160 76 151 96 C177 105 167 132 143 132 C129 158 98 162 83 143 C68 154 48 153 37 146Z"/><circle cx="70" cy="112" r="4"/><circle cx="99" cy="92" r="4"/><circle cx="124" cy="113" r="4"/><circle cx="128" cy="77" r="4"/></svg>`;
  return `<svg class="commodity-mark" viewBox="0 0 200 200"><path d="M48 145 C20 107 42 54 91 44 C137 34 172 63 158 111 C146 153 82 174 48 145Z"/><path d="M51 144 C85 124 108 90 129 50"/><path d="M76 143 C92 127 122 126 142 139"/><path d="M45 107 C75 95 112 94 151 108"/></svg>`;
}

function commodityCard(c) {
  return `<article class="commodity-card" data-commodity="${c.slug}">${commodityMark(c.slug)}<div class="card-top"><span class="card-index">${c.index}</span><span class="card-origin">${c.origin}</span></div><h3>${c.name}</h3><p>${c.intro}</p><div class="card-footer"><span>${c.uses}</span><a class="text-link" href="/commodities/${c.slug}">View pathway</a></div></article>`;
}

function home() {
  return `${header('/')}
  <main id="main"><section class="hero"><div class="container hero-grid"><div class="reveal"><span class="eyebrow">Nigeria to North America</span><h1>Trade with more <em>proof</em> between the parties.</h1><p class="hero-copy">Tricon connects qualified North American buyers with Nigerian suppliers through an evidence-led screening process for cocoa, sesame and cashew, with the terms, documents and boundaries clear before an introduction.</p><div class="hero-ctas"><a class="button button-primary button-arrow" href="/contact">Request a quote</a><a class="button button-ghost" href="/commodities">View commodities</a></div><div class="hero-note"><span>Built for <strong>procurement teams, processors and importers</strong>, not anonymous marketplace traffic.</span></div></div>${corridorGraphic()}</div></section>${trustStrip()}<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">The offer</span><h2>Three commodities.<br><em class="serif">One standard</em> of clarity.</h2></div><p>Every pathway starts with the same question: what does a serious buyer need to see before a conversation is worth having?</p></div><div class="commodity-grid">${Object.values(commodities).map(commodityCard).join('')}</div></div></section>
  <section class="section section-tint"><div class="container process-grid"><div class="process-intro"><span class="eyebrow">How it works</span><h2>Short enough to move. Rigorous enough to trust.</h2><p>Tricon is the connective tissue, not the seller, importer or exporter of record. The buyer and supplier ultimately negotiate and contract directly.</p><a class="button button-outline button-arrow" href="/how-we-work">See the process</a></div><div class="process-steps"><div class="process-step"><span class="process-step-num">01 / SOURCE</span><div><h3>Start with a real requirement</h3><p>Tell us what you need, where it needs to land and which commercial terms matter.</p></div></div><div class="process-step"><span class="process-step-num">02 / VERIFY</span><div><h3>Review the evidence</h3><p>We align supplier registration, origin, specifications, documentation and available inspection options.</p></div></div><div class="process-step"><span class="process-step-num">03 / INTRODUCE</span><div><h3>Make the right connection</h3><p>Once the brief and boundaries are clear, Tricon introduces the right parties for direct discussion.</p></div></div><div class="process-step"><span class="process-step-num">04 / REPEAT</span><div><h3>Stay close to the relationship</h3><p>Our value is built around repeat shipments generated from qualified relationships, not one-off handoffs.</p></div></div></div></div></section>
  <section class="section"><div class="container quality-layout"><div class="quality-copy"><span class="eyebrow">Quality, without theatre</span><h2>We show what is known, and label what is not.</h2><p>Commercial trust is not a badge. It is the discipline of separating verified information, supplier-provided material and details that still need confirmation.</p><div class="checklist"><span class="check-item">Company registration</span><span class="check-item">Export capability</span><span class="check-item">Product specifications</span><span class="check-item">Origin and packaging</span><span class="check-item">Samples and reports</span><span class="check-item">Inspection options</span></div><a class="button button-outline button-arrow" style="margin-top:28px" href="/quality">Our quality approach</a></div><div class="summary-card"><div class="summary-heading"><span>Screening summary / 001</span><strong>Evidence before enthusiasm.</strong></div><div class="summary-rows"><div class="summary-row"><span>Supplier identity</span><span>Requested</span></div><div class="summary-row"><span>Product / origin</span><span>Aligned to brief</span></div><div class="summary-row"><span>Specifications</span><span>To be confirmed</span></div><div class="summary-row"><span>Inspection / samples</span><span>Discussed per offer</span></div><div class="summary-row"><span>Commercial terms</span><span>Written before intro</span></div></div><div class="summary-foot">A working model, not a guarantee of quality or performance.</div></div></div></section>
  <section class="corridor-band"><div class="container corridor-band-grid"><div><span class="eyebrow">The corridor</span><h2>Origin has context. Demand has a destination.</h2><p>We translate a North American requirement into a commercial brief that can be answered at origin, with port, Incoterm and documentation questions in the room early.</p></div><div class="route-map"><span class="route-point nigeria"></span><span class="route-point lagos"></span><span class="route-point montreal"></span><span class="route-point north-america"></span><span class="route-label one">Origin<strong>Nigeria</strong></span><span class="route-label two">Port<strong>Lagos</strong></span><span class="route-label three">Market<strong>Montréal</strong></span><span class="route-label four">Demand<strong>North America</strong></span><span class="route-incoterms">FOB · CIF</span></div></div></section>
  <div class="role-split"><section class="role-panel"><span class="eyebrow">For buyers</span><h2>Bring a brief. Leave with a clearer next step.</h2><p>For importers, processors and procurement teams looking for origin-linked agricultural commodities with a transparent path to supplier dialogue.</p><ul class="role-list"><li>Share product, volume, destination and timing</li><li>Understand what can be confirmed before an introduction</li><li>Request samples or documentation where available</li></ul><a class="button button-light button-arrow" href="/buyers">Buyer pathway</a></section><section class="role-panel"><img class="role-mark" src="/keystone.svg" alt="" aria-hidden="true" /><span class="eyebrow">For suppliers</span><h2>Show the work behind the offer.</h2><p>For Nigerian exporters and suppliers prepared to answer commercial questions with documentation, consistency and clear expectations.</p><ul class="role-list"><li>Share company, product and origin details</li><li>Explain export experience and available terms</li><li>Be ready for qualified buyer requirements</li></ul><a class="button button-outline button-arrow" href="/suppliers">Supplier pathway</a></section></div>
  </main>${footer()}`;
}

function pageHero(kicker, title, copy, pills = []) {
  return `<section class="page-hero"><div class="container page-hero-grid"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1></div><div class="page-hero-copy"><p>${copy}</p>${pills.length ? `<div class="page-hero-meta">${pills.map(p => `<span class="meta-pill">${p}</span>`).join('')}</div>` : ''}</div></div></section>`;
}

function commoditiesPage() {
  return `${header('/commodities')}${pageHero('Commodity pathways', 'The product comes with a brief.', 'Explore the initial commodity pathways. These pages are built to help a qualified buyer decide whether a conversation is worth starting, not to imply inventory ownership or fixed availability.', ['COCOA', 'SESAME', 'CASHEW'])}<main id="main" class="page-content"><div class="container"><div class="filter-row"><button class="filter-button active" data-filter="all">All pathways</button><button class="filter-button" data-filter="cocoa">Cocoa</button><button class="filter-button" data-filter="sesame">Sesame</button><button class="filter-button" data-filter="cashew">Cashew</button></div><div class="commodity-grid" id="commodity-grid">${Object.values(commodities).map(commodityCard).join('')}</div></div></main>${footer()}`;
}

function commodityDetail(slug) {
  if (!Object.hasOwn(commodities, slug)) return notFound();
  const c = commodities[slug];
  return `${header('/commodities')} ${pageHero(`${c.index} / ${c.origin}`, c.name, c.intro, ['ORIGIN: NIGERIA', 'PATHWAY: B2B'])}<main id="main" class="page-content"><div class="container"><div class="split-copy"><div><span class="eyebrow">Specification view</span><h2>See the shape of the conversation before you have it.</h2></div><div><p>Tricon’s role is to make the commercial brief legible on both sides of the corridor. The fields below are a starting point for alignment, not a substitute for supplier documentation, sampling or buyer due diligence.</p><div class="note-box"><strong>Important boundary</strong> Availability, grade, volume, certifications, pricing and inspection results are supplier-specific and require confirmation before any commercial introduction.</div></div></div><section class="page-section" style="margin-top:92px"><h2>Indicative brief</h2><p class="lead">A concise data layer for procurement teams, processors and importers to react to.</p><div class="data-table">${c.fields.map(([label, value]) => `<div class="data-row"><span class="data-label">${label}</span><span class="data-value">${['Available grades','Quality parameters','Grade / count','Documentation','Indicative terms'].includes(label) ? `<span class="confirmed">${value}</span>` : value}</span></div>`).join('')}</div></section><section class="page-section"><h2>Ready to make it specific?</h2><p class="lead">Share the destination, volume, timing and commercial terms that matter. We will tell you what needs to be confirmed before the next step.</p><a class="button button-primary button-arrow" href="/contact?commodity=${c.slug}">Request a quote for ${c.name}</a></section></div></main>${footer()}`;
}

function howWeWork() {
  const faqs = [['Who contracts with whom?', 'The buyer and supplier ultimately negotiate and contract directly. Tricon facilitates the connection and supports the commercial relationship; it is not the seller, importer or exporter of record unless separately established.'], ['What does verification mean here?', 'It means reviewing available company, product, origin, documentation and commercial information before an introduction. It does not mean Tricon guarantees quality, payment, delivery or performance.'], ['Where do NCNDA and IMFPA fit?', 'They may be considered as commercial/legal instruments to protect a relationship and establish fee arrangements, but they are not presented as automatically enforceable. Appropriate legal counsel should review the documents for the jurisdictions and transaction structure involved.']];
  return `${header('/how-we-work')}${pageHero('The operating model', 'A shorter distance between a requirement and a real conversation.', 'Tricon creates commercial clarity before buyer and supplier identities are introduced. The work is in the brief, the evidence and the handoff.', ['SOURCE', 'VERIFY', 'ALIGN', 'INTRODUCE'])}<main id="main" class="page-content"><div class="container"><div class="split-copy"><div><span class="eyebrow">How we work</span><h2>Built around the moment before the handshake.</h2></div><div><p>A qualified buyer should not have to sort through a vague offer. A credible supplier should not be exposed to an unqualified lead. Tricon sits between those two risks and makes the first conversation more useful.</p><p>We gather the brief, screen the available information, surface the commercial questions, and introduce the parties when the context is clear enough to move forward.</p><div class="note-box"><strong>Direct contracting</strong> The buyer and supplier negotiate and contract directly. Tricon does not take physical possession of the goods or guarantee product, payment, delivery or performance.</div></div></div><section class="page-section" style="margin-top:100px"><div class="process-steps"><div class="process-step"><span class="process-step-num">01 / SOURCE</span><div><h3>Translate the requirement</h3><p>Commodity, destination, volume, timing, preferred Incoterm and the quality or documentation questions that cannot be skipped.</p></div></div><div class="process-step"><span class="process-step-num">02 / VERIFY</span><div><h3>Screen the supplier pathway</h3><p>Company registration, export capability, product origin, specifications, packaging, certifications, inspection options, references and available history, as applicable and as available.</p></div></div><div class="process-step"><span class="process-step-num">03 / ALIGN</span><div><h3>Put the terms in the room</h3><p>We work toward a written commercial offer such as FOB Apapa, FOB Tin Can Island or CIF Montréal where appropriate, subject to supplier confirmation.</p></div></div><div class="process-step"><span class="process-step-num">04 / INTRODUCE</span><div><h3>Connect qualified parties</h3><p>Once the brief and any appropriate commercial protections have been reviewed, buyer and supplier can speak directly.</p></div></div><div class="process-step"><span class="process-step-num">05 / REPEAT</span><div><h3>Stay close to the relationship</h3><p>Tricon’s long-term value is measured by durable, repeat commercial relationships, not by pretending to control the transaction.</p></div></div></div></section><section class="page-section"><h2>Questions worth answering early.</h2><div class="accordion">${faqs.map(([q, a]) => `<div class="accordion-item"><button class="accordion-trigger" type="button"><span>${q}</span><span>+</span></button><div class="accordion-panel">${a}</div></div>`).join('')}</div></section></div></main>${footer()}`;
}

function rolePage(type) {
  const buyer = type === 'buyers';
  const title = buyer ? 'A better first brief for the buyer side.' : 'A clearer standard for the supplier side.';
  const copy = buyer ? 'For importers, food manufacturers, processors and distributors who need a serious view of origin-linked supply before spending time on a transaction.' : 'For Nigerian exporters and suppliers who can answer the commercial questions that make an introduction worth having.';
  const criteria = buyer ? ['Company and role', 'Commodity and desired specification', 'Required volume and frequency', 'Delivery location and timing', 'Preferred Incoterm or landed-cost frame', 'Samples, inspection or documentation needs'] : ['Company registration and contact', 'Product, origin and available volumes', 'Export experience and port readiness', 'Specifications, packaging and certifications', 'Inspection, sampling and documentation capability', 'Commercial terms and North American fit'];
  return `${header(`/${type}`)}${pageHero(buyer ? 'For buyers' : 'For suppliers', title, copy, buyer ? ['REQUEST A QUOTE', 'NORTH AMERICA'] : ['APPLY TO BE CONSIDERED', 'NIGERIA'])}<main id="main" class="page-content"><div class="container"><div class="split-copy"><div><span class="eyebrow">${buyer ? 'A qualified inquiry' : 'A supplier application'}</span><h2>${buyer ? 'Bring the details that make a conversation useful.' : 'Credibility starts with what you can document.'}</h2></div><div><p>${buyer ? 'The fastest way to know whether there is a fit is to share the requirement with enough shape for the other side to respond. A commodity name alone is not a brief.' : 'Tricon is looking for suppliers who can make a clear, evidence-led case for their product, origin, capability and commercial readiness. Completing an application does not guarantee a buyer introduction.'}</p><div class="note-box"><strong>${buyer ? 'No marketplace noise' : 'No automatic approval'}</strong>${buyer ? 'We use your information to understand the commercial fit, not to publish it as a public request.' : 'Supplier details are reviewed for fit and completeness. Any partnership or introduction remains subject to confirmation and appropriate diligence.'}</div></div></div><section class="page-section" style="margin-top:100px"><h2>${buyer ? 'What to include in your request' : 'What we look for'}</h2><div class="data-table">${criteria.map((item, i) => `<div class="data-row"><span class="data-label">0${i + 1}</span><span class="data-value">${item}</span></div>`).join('')}</div></section><section class="page-section"><h2>${buyer ? 'Start with the brief.' : 'Start with the evidence.'}</h2><p class="lead">${buyer ? 'The three-step form takes less than a minute to frame the opportunity. We will follow up on the details that need to be confirmed.' : 'Use the application to give us a first view of your company, product, origin and commercial readiness. Uploads can be handled in a later, secure exchange if the initial fit is relevant.'}</p><a class="button button-primary button-arrow" href="/contact?role=${buyer ? 'buyer' : 'supplier'}">${buyer ? 'Request a quote' : 'Apply as a supplier'}</a></section></div></main>${footer()}`;
}

function quality() {
  const rows = [['Company identity', 'Registration and ownership details where available'], ['Export capability', 'Experience, port readiness and relevant documentation'], ['Product information', 'Origin, specifications, packaging and intended uses'], ['Commercial readiness', 'Pricing frame, Incoterms and available shipment terms'], ['Evidence options', 'Samples, inspection reports or certificates where applicable'], ['Relationship boundaries', 'Clear statement of what Tricon does and does not undertake']];
  return `${header('/quality')}${pageHero('Quality & verification', 'A method for making uncertainty visible.', 'Trust is built by showing the source of the information, the question still open and the next document needed. That is the standard.', ['SCREEN', 'DOCUMENT', 'CLARIFY'])}<main id="main" class="page-content"><div class="container"><div class="split-copy"><div><span class="eyebrow">Screening summary</span><h2>Not a badge. A working file.</h2></div><div><p>Tricon’s quality approach is a commercial screening methodology. It helps buyers understand what is available, what can be documented and what still requires independent confirmation.</p><p>Where sampling, SGS, Cotecna or other inspection options are relevant, they are discussed as part of the transaction context, never as invented proof or a blanket guarantee.</p><div class="note-box"><strong>Confirmation language</strong> Any field marked “to be confirmed” requires supplier documentation, buyer due diligence or both before it should be treated as a commercial fact.</div></div></div><section class="page-section" style="margin-top:100px"><h2>The screening file</h2><p class="lead">A flexible checklist that can expand with the buyer’s requirement and the supplier’s offer.</p><div class="data-table">${rows.map(([label, value]) => `<div class="data-row"><span class="data-label">${label}</span><span class="data-value">${value}</span></div>`).join('')}</div></section><section class="page-section"><h2>Boundaries matter.</h2><div class="accordion"><div class="accordion-item open"><button class="accordion-trigger" type="button"><span>What Tricon does</span><span>−</span></button><div class="accordion-panel">Finds and screens commercial pathways, facilitates communication, presents supplier offers professionally, helps buyers understand available specifications, and supports the relationship through repeat-shipment conversations.</div></div><div class="accordion-item"><button class="accordion-trigger" type="button"><span>What Tricon does not do</span><span>+</span></button><div class="accordion-panel">Tricon does not purchase, own, store or ship the goods; it does not guarantee product quality, delivery or payment; and it does not represent itself as exporter or importer of record unless that role is separately established.</div></div><div class="accordion-item"><button class="accordion-trigger" type="button"><span>How legal instruments are treated</span><span>+</span></button><div class="accordion-panel">NCNDA and IMFPA may be considered in a transaction structure, but they are commercial/legal instruments subject to appropriate legal review, jurisdictional requirements and the specific facts of the deal.</div></div></div></section></div></main>${footer()}`;
}

function contact() {
  return `${header('/contact')}${pageHero('Start a conversation', 'Make the brief specific.', 'Tell us whether you are buying or supplying, what commodity is in view, and where the requirement sits. The form is designed to qualify a conversation, not create a public listing.', ['3 STEPS', 'EMAIL INTAKE', 'EN / FR'])}<main id="main" class="page-content"><div class="container form-wrap"><div class="form-intro"><span class="eyebrow">Request a quote</span><h2>A little more context makes the next step better.</h2><p>Use this short intake for buyer requirements, supplier applications or a general trade conversation. Your request is emailed to triconglobaltrading@gmail.com. We use your details to respond to this inquiry. No submission implies an offer, acceptance or commitment.</p><div class="note-box"><strong>What happens next</strong> We review the brief, identify the questions that need confirmation and respond with a sensible next step if there is a potential fit.</div></div><div class="form-card"><div class="progress"><div class="progress-step active" data-progress="1">01 / role</div><div class="progress-step" data-progress="2">02 / brief</div><div class="progress-step" data-progress="3">03 / timing</div></div><form id="rfq-form"><div class="form-step active" data-step="1"><h3>Who are you?</h3><p>Start with the side of the corridor you represent.</p><div class="field-grid"><div class="field"><label for="name">Name</label><input id="name" name="name" required placeholder="Your name" /></div><div class="field"><label for="company">Company</label><input id="company" name="company" required placeholder="Company name" /></div><div class="field"><label for="role">Your role</label><select id="role" name="role" required><option value="">Select one</option><option value="buyer">Buyer / importer</option><option value="supplier">Supplier / exporter</option><option value="other">Other trade partner</option></select></div><div class="field"><label for="email">Work email</label><input id="email" name="email" type="email" required placeholder="name@company.com" /></div></div><div class="form-actions"><span></span><button class="button button-primary" type="button" data-next>Continue <span aria-hidden="true">→</span></button></div></div><div class="form-step" data-step="2"><h3>What is the brief?</h3><p>Give the conversation enough shape to be useful.</p><div class="field-grid"><div class="field"><label for="commodity">Commodity</label><select id="commodity" name="commodity" required><option value="">Select one</option><option value="cocoa">Cocoa beans</option><option value="sesame">Sesame seeds</option><option value="cashew">Cashew nuts</option><option value="multiple">Multiple commodities</option></select></div><div class="field"><label for="volume">Required volume</label><input id="volume" name="volume" required placeholder="e.g. 1 x 20' container / monthly" /></div><div class="field"><label for="destination">Delivery location</label><input id="destination" name="destination" required placeholder="City / port / country" /></div><div class="field"><label for="incoterm">Preferred Incoterm</label><select id="incoterm" name="incoterm"><option value="">Select if known</option><option>FOB Apapa</option><option>FOB Tin Can Island</option><option>CIF Montréal</option><option>Other / to discuss</option></select></div></div><div class="form-actions"><button class="button-back" type="button" data-back>← Back</button><button class="button button-primary" type="button" data-next>Continue <span aria-hidden="true">→</span></button></div></div><div class="form-step" data-step="3"><h3>When should we talk?</h3><p>Timing helps us frame the right next question.</p><div class="field-grid"><div class="field"><label for="timing">Purchase timing</label><select id="timing" name="timing" required><option value="">Select one</option><option>Exploring now</option><option>Within 30 days</option><option>Within 90 days</option><option>Recurring requirement</option></select></div><div class="field"><label for="frequency">Purchase frequency</label><select id="frequency" name="frequency"><option value="">Select if known</option><option>One shipment</option><option>Monthly</option><option>Quarterly</option><option>To be determined</option></select></div><div class="field full"><label for="details">Additional requirements</label><textarea id="details" name="details" placeholder="Specifications, documentation, sample or inspection questions..."></textarea></div></div><label class="consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this inquiry and have read the <a href="/privacy" target="_blank" rel="noopener">Privacy notice</a>.</span></label><div class="honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="website" tabindex="-1" autocomplete="off" /></div><p class="form-error" role="alert" hidden></p><div class="form-actions"><button class="button-back" type="button" data-back>← Back</button><button class="button button-primary" type="submit">Send brief <span aria-hidden="true">↗</span></button></div></div></form><div class="success-state" id="success-state" aria-live="polite"><span class="success-mark">✓</span><h3>Quote request sent.</h3><p>Your request has been emailed to triconglobaltrading@gmail.com. We will reply to the email you provided with the next step.</p><a class="button button-outline" href="/">Back to the corridor</a></div></div></div></main>${footer()}`;
}

function legalPage(title, kicker, body) {
  return `${header()}${pageHero(kicker, title, 'A concise page for a careful commercial relationship.') }<main id="main" class="page-content"><div class="container"><div class="split-copy"><div><span class="eyebrow">Tricon Global Trading</span><h2>${title}</h2></div><div>${body}</div></div></div></main>${footer()}`;
}

function notFound() { return `${header()}<main id="main" class="not-found"><div><span class="eyebrow">404 / route not found</span><h1 class="serif" style="font-size:64px;margin:18px 0">That page is off the lane.</h1><p class="muted">The page you requested does not exist. Please check the address or return home.</p><a class="button button-primary button-arrow" href="/">Return home</a></div></main>${footer()}`; }

function render() {
  const siteBase = document.querySelector('base')?.getAttribute('href').replace(/\/$/, '') || '';
  const path = window.location.pathname.slice(siteBase.length).replace(/\/$/, '') || '/';
  let html;
  if (path === '/') html = home();
  else if (path === '/commodities') html = commoditiesPage();
  else if (/^\/commodities\/(cocoa|sesame|cashew)$/.test(path)) html = commodityDetail(path.split('/')[2]);
  else if (path === '/how-we-work') html = howWeWork();
  else if (path === '/buyers' || path === '/suppliers') html = rolePage(path.slice(1));
  else if (path === '/quality') html = quality();
  else if (path === '/contact') html = contact();
  else if (path === '/book-a-call') html = callPage(header, pageHero, footer);
  else if (Object.hasOwn(informationPages, path)) {
    const page = informationPages[path];
    html = legalPage(page.title, page.kicker, page.body);
  }
  else if (path === '/intermediary-disclosure') html = legalPage('Intermediary disclosure', 'Commercial boundaries', '<p>Tricon introduces qualified buyers and suppliers and facilitates the commercial relationship. It does not purchase, own, store, insure or ship the goods; it does not guarantee product quality, delivery, payment or performance; and it is not the importer or exporter of record unless separately established.</p><p>The buyer and supplier ultimately negotiate and contract directly. Any commission arrangement, non-circumvention or fee-protection agreement should be drafted and reviewed for the applicable transaction and jurisdiction.</p>');
  else html = notFound();
  document.querySelector('#app').innerHTML = html;
  document.title = path === '/' ? 'Tricon Global Trading: Proof before introduction' : `${document.querySelector('h1')?.textContent || 'Tricon Global Trading'} | Tricon Global Trading`;
  const siteBasePath = siteBase;
  if (siteBasePath) {
    document.querySelectorAll('a[href^="/"], img[src^="/"]').forEach(element => {
      let attribute = 'href';
      if (element.tagName === 'IMG') attribute = 'src';
      element.setAttribute(attribute, siteBasePath + element.getAttribute(attribute));
    });
  }
  // Put each page's introduction inside the main landmark without changing its layout.
  const main = document.querySelector('#main');
  const hero = document.querySelector('.page-hero');
  if (hero) main.before(hero);
  if (hero) {
    main.prepend(hero);
    main.classList.remove('page-content');
    const content = document.createElement('div');
    content.className = 'page-content';
    while (main.children.length > 1) content.append(main.children[1]);
    main.append(content);
  }
  document.querySelectorAll('option').forEach(option => {
    if (!option.hasAttribute('value')) option.value = option.textContent;
  });
  document.querySelectorAll('input:not([type=checkbox])').forEach(input => {
    input.maxLength = 200;
    if (input.type === 'email') input.maxLength = 254;
  });
  document.querySelectorAll('textarea').forEach(textarea => textarea.maxLength = 3000);
  bindInteractions();
  initializeStaticPreview();
  applyLanguage();
  document.title = `${document.querySelector('h1').textContent} | Tricon Global Trading`;
  window.scrollTo({ top: 0, behavior: 'instant' });
  initializeMotion();
}

const FIRST_INTAKE_STEP = 1;
const LAST_INTAKE_STEP = 3;
const SUPPORTED_ROLES = new Set(['buyer', 'supplier', 'other']);
const SUPPORTED_COMMODITIES = new Set(['cocoa', 'sesame', 'cashew', 'multiple']);

function navigate(href) {
  window.history.pushState({}, '', href);
  render();
  const main = document.querySelector('#main');
  main.setAttribute('tabindex', '-1');
  main.focus({ preventScroll: true });
}

function bindInteractions() {
  document.querySelectorAll('a[href^="/"]').forEach(link => link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    const isLocalNavigation = href && !href.startsWith('//') && !link.hasAttribute('download') && !link.target;
    if (!isModifiedClick && isLocalNavigation) {
      event.preventDefault();
      navigate(href);
    }
  }));
  const navToggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.site-nav');
  navigation.id = 'primary-navigation';
  navToggle.setAttribute('aria-controls', navigation.id);
  navToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelector('.site-header').addEventListener('keydown', event => {
    const isMenuOpen = navigation.classList.contains('open');
    if (event.key === 'Escape' && isMenuOpen) {
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
  const languageToggle = document.querySelector('.lang-toggle');
  languageToggle.addEventListener('click', () => toggleLanguage());
  document.querySelectorAll('.filter-button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(filterButton => {
        filterButton.classList.remove('active');
        filterButton.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      document.querySelectorAll('.commodity-card').forEach(card => {
        const isMatchingCommodity = button.dataset.filter === 'all' || card.dataset.commodity === button.dataset.filter;
        card.hidden = !isMatchingCommodity;
      });
    });
  });
  document.querySelectorAll('.accordion-trigger').forEach((trigger, index) => {
    const item = trigger.closest('.accordion-item');
    const panel = item.querySelector('.accordion-panel');
    trigger.id = `faq-trigger-${index}`;
    panel.id = `faq-panel-${index}`;
    trigger.setAttribute('aria-controls', panel.id);
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', trigger.id);
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      let indicator = '+';
      if (isOpen) indicator = '−';
      trigger.querySelector('span:last-child').textContent = indicator;
    });
  });
  bindForm();
  const callForm = document.querySelector('#call-form');
  if (callForm) {
    callForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (callForm.reportValidity()) await submitInquiry(callForm, INQUIRY_TYPES.CALL, document.querySelector('#call-success'));
    });
  }
}

function bindForm() {
  const form = document.querySelector('#rfq-form');
  if (!form) return;
  // Validate the visible step ourselves so Enter never targets hidden required fields.
  form.noValidate = true;
  let currentStep = FIRST_INTAKE_STEP;
  const steps = [...form.querySelectorAll('.form-step')];
  const progress = [...document.querySelectorAll('.progress-step')];
  const successState = document.querySelector('#success-state');
  const setStep = nextStep => {
    currentStep = nextStep;
    steps.forEach(step => step.classList.toggle('active', Number(step.dataset.step) === currentStep));
    progress.forEach(item => item.classList.toggle('active', Number(item.dataset.progress) <= currentStep));
    const heading = steps[currentStep - FIRST_INTAKE_STEP].querySelector('h3');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  };
  const isActiveStepValid = () => {
    const activeStep = steps[currentStep - FIRST_INTAKE_STEP];
    for (const input of activeStep.querySelectorAll('input, select, textarea')) {
      if (!input.reportValidity()) return false;
    }
    return true;
  };
  const advanceStep = () => {
    if (isActiveStepValid()) setStep(Math.min(LAST_INTAKE_STEP, currentStep + FIRST_INTAKE_STEP));
  };
  form.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', advanceStep));
  form.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => {
    setStep(Math.max(FIRST_INTAKE_STEP, currentStep - FIRST_INTAKE_STEP));
  }));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (currentStep < LAST_INTAKE_STEP) {
      advanceStep();
      return;
    }
    if (!isActiveStepValid()) return;
    await submitInquiry(form, INQUIRY_TYPES.QUOTE, successState);
  });
  const parameters = new URLSearchParams(window.location.search);
  const selectedRole = parameters.get('role');
  const selectedCommodity = parameters.get('commodity');
  if (SUPPORTED_ROLES.has(selectedRole)) form.querySelector('#role').value = selectedRole;
  if (SUPPORTED_COMMODITIES.has(selectedCommodity)) form.querySelector('#commodity').value = selectedCommodity;
}

window.addEventListener('popstate', render);
render();
