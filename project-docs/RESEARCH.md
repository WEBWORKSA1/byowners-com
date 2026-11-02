# ByOwners.com — Competitive Research

Last updated: 2026-11-02. Research for ByOwners.com, an independent owner-to-owner marketplace and education hub (homes, rentals, land, vehicles, small businesses). The site is static Jekyll on GitHub Pages, and its forms post to a form-to-email service.

---

## 0. Method, coverage and limits (read first)

| Item | Result |
|---|---|
| Sites reviewed | **59** competitors and adjacent sites, plus 6 authority sources (FTC, Google AdSense policy, USPTO record via Justia, the 11th Circuit TCPA ruling, Colorado DRE, HUD/Roommates case law) |
| Fetched directly (WebFetch) | **0**. Every WebFetch failed with `getaddrinfo ENOTFOUND` (tried zillow.com, forsalebyowner.com, fsbo.com and houzeo.com). This session's network allowlist blocks those hosts. The tool says to stop retrying, so I did. **To fetch sites directly, add those hosts in the session's network settings.** |
| Via search | **59 of 59** (WebSearch, mode "standard"). Every row in the table is marked "(via search)". |
| Search budget | The shared limit of 200 WebSearch calls per turn ran out after about 55 queries. A few planned checks were not run: Zillow Premier Agent/Flex fee, Realtor.com ReadyConnect pricing, Opendoor's exact question list, NAR settlement details, Zillow Listing Access Standards, and Redfin's free rental listing. Anything that depends on them is marked **(unverified)**. |
| Source quality | Many prices come from review blogs owned by competitors (Houzeo, Clever, Beycome, HomeLight), and these often disagree. I give **ranges and name the source type**. Check any price on the vendor's own page before publishing it on ByOwners.com, and show a "last checked" date. |
| Legend | **(official)** = the vendor's own page or help center, as surfaced by search. **(3rd-party)** = a review or blog. **(unverified)** = conflicting or single-source. **†** = a common UI pattern from general industry knowledge that I could not re-check this session because fetching was blocked. |

---

## 1. Sites reviewed

| # | Site | URL | Category | Standout features | Lead-gen mechanics (forms / funnels / steps / fields) | Monetization | Design / UX patterns |
|---|---|---|---|---|---|---|---|
| 1 | Zillow, FSBO + Rental Manager (via search) | zillow.com/for-sale-by-owner, zillow.com/rental-manager | Portal (sale + rent) | Free FSBO listing; approval takes about 72h (HomeLight, unverified); open-house dates; 3D/video tour; buyers only see FSBO listings after switching the filter to "By owner & other"; listing can be updated any time; 90-day duration (unverified). Rental Manager: online applications, screening, rent payments. | FSBO listing form (details, photos, price, open houses); renter application funnel; buyer contact forms | Agent advertising (Premier Agent, pricing unverified). Rental Manager: first listing free, then $9.99/week for each additional listing (reported since 2021, 3rd-party); premium rental listing $29.99 for 90 days (3rd-party). Screening is $29 per applicant (sources disagree on who pays). | Hero search, map/list split view, filter chips, heart/save, saved searches†; an estimate on every property page† |
| 2 | Realtor.com (via search) | realtor.com | Portal (MLS-fed) | "My Home" owner dashboard (2017) that tracks value, equity and financing, with estimates from three AVM providers (Collateral Analytics, CoreLogic, Quantarium); Seller's Marketplace (2020) compares iBuyer offers; Offerpad instant cash offer integration (2024) | Address in → estimated cash offer (select markets) → compare options; agent contact forms | Agent lead products (pricing unverified); iBuyer partner integrations | Address-first owner entry; dashboard that keeps owners coming back |
| 3 | Redfin (via search) | redfin.com/what-is-my-home-worth | Brokerage + portal | Redfin Estimate updates daily for on-market homes and weekly for off-market; only shown where enough comparable sales exist. "Owner Estimate" lets owners pick their own comps. Free, no-obligation pricing consultation. | "What's my home worth" → request agent consultation; tour requests | Brokerage listing/buy-side fees; partner-agent referrals | Valuation page includes "how the estimate is calculated" (transparency) |
| 4 | Trulia (via search) | trulia.com | Portal (Zillow Group) | "What Locals Say" polls and reviews since 2018 (dog-friendliness, sidewalks, safety after dark, parking); about 30 neighborhood overlay maps (schools, amenities, commute); crime map removed in 2022 citing bias | Agent lead routing (Zillow network) | Agent advertising | Neighborhood heat-map overlays; story-style neighborhood content |
| 5 | Homes.com (via search) | homes.com | Portal (CoStar) | Routes buyers to the listing agent; GreatSchools data; data layers (population density, months of supply, rent vs own, median income, school rating); estimates "from 4 sources"; "Homes AI" assistant | Listing-agent contact form | Listing-agent memberships (unverified) | Map data layers; AI search assistant |
| 6 | ForSaleByOwner.com (via search) | forsalebyowner.com | FSBO listing site | Reviews describe one free plan with no MLS access and no syndication (3rd-party, unverified) | Seller signup | Free listing; likely partner upsells (unverified) | n/a. Brand to avoid (see §3) |
| 7 | FSBO.com (via search) | fsbo.com | FSBO + flat-fee MLS | **FSBO package $99.95:** 6-month listing, unlimited photos, 1 video, Redfin in most markets, syndication claims. **MLS package $399.95:** 6-month MLS listing, up to 20 photos, buyer-agent compensation offer required; MLS handled by a third-party broker. (3rd-party, consistent across sources) | Package checkout; sign store | Packages; yard signs sold separately | Two-package comparison table |
| 8 | Houzeo (via search) | houzeo.com | Flat-fee MLS | Silver/Gold/Platinum plans. Prices conflict: $199–$379 upfront plus 0.5–1.25% at closing, and a $999 minimum is reported. Platinum adds broker support, concierge, call forwarding and rush service. Reports 4.8/5 from about 4,982 reviews (3rd-party). | Plan picker → checkout; very large SEO blog | Upfront fee plus % at closing | Programmatic "best FSBO sites in [state]" pages; review-count badges |
| 9 | ByOwner.com (via search) | byowner.com | FSBO + flat-fee MLS | Basic from $95, MLS $195 "national base" (Houzeo review and ByOwner's own blog); Datanyze cites $499, which conflicts. MLS live within 24h; licensed in 37 states; cancellation fees mentioned. | Package checkout | Packages; full-service tier | Head-to-head comparison blog posts. Brand to avoid (see §3). |
| 10 | Owners.com, historical (via search) | owners.com | Flat-fee MLS (closed) | Altisource bought it in Nov 2014 for $20M plus up to $7M in earnouts; 6-month listing cost $395 (2015); expanded into buyer rebates, agents and loans; shut down by Dec 31, 2019 | n/a | Flat fee + loans/closing services | Lesson: a thin-margin FSBO business model is fragile |
| 11 | Craigslist housing (via search) | craigslist.org | Classifieds | **Apartment posts are free except $5 in Boston, Chicago and the NY area**; office/commercial posts are $5 (official help page). Has a scam page at /about/scams. BBB: more than half of rental scam listings go unidentified. | Anonymous email relay reply†; flagging | Paid posts in a few cities and categories | Minimal text lists; "deal locally" warning |
| 12 | Facebook Marketplace (via search) | facebook.com/marketplace | Social classifieds | Rental filters: location, price, beds, baths, type, sq ft, pets; 360° photos; partner feeds (Apartment List, Zumper, 2017). **FTC: about half of rental-scam reports (12 months to June 2025) started with a fake Facebook ad.** Scammers copy Zillow listings onto Marketplace (Spectrum News, Feb 2026). | Messenger chat | Free; ads | Filters + chat; a cautionary example for trust & safety |
| 13 | Apartments.com Rental Manager (via search) | apartments.com/rental-manager | Rental portal (CoStar) | **Free listing for 4 or fewer units, with 21 days of standard visibility** (official help); free applications and screening reports for landlords; renters pay $29–$29.99, reusable for 30 days (up to 10 applications); rent comparison reports; co-signer and guarantor support | Online application funnel; landlord listing form | Renter-paid application fees; paid placements for larger properties | Help center + landlord resources hub |
| 14 | Zumper (via search) | zumper.com | Rental portal | First few listings free, syndicated to PadMapper, Realtor.com and Bing; verified listings are labeled; Instant Apply; promoted listings about $10 per listing or $50/month (3rd-party, unverified) | Instant Apply; messaging | Promoted listings; verified badge | "Verified" labels; mobile-first |
| 15 | HotPads (via search) | hotpads.com | Rental portal (Zillow) | Map-first with **draw-your-own search boundary**; listings managed in Zillow Rental Manager and syndicated to Zillow and Trulia | Contact forms | Through Zillow Rental Manager fees | Map-first UI; draw search |
| 16 | Rent.com (via search) | rent.com | Rental portal (RentPath) | Founded 2000; sister sites ApartmentGuide, Rentals.com, RentalHouses.com; renter content: moving tips, neighborhood overviews, rent affordability calculator | Lead forms to property managers | Property-manager advertising (unverified) | Calculator used as a content asset (thin data) |
| 17 | TurboTenant (via search) | turbotenant.com | Landlord software | **$0 tier: unlimited listings, applications/screening, rent collection, maintenance**; paid tiers about $12.42–$16.58/month (2026, 3rd-party); renters pay for screening; card payments 3.49%, ACH free; landlord forms pack | Free signup → upsell; free forms as lead magnets | Renter-paid screening; subscriptions; payment fees | Free core features, paid for by the renter side |
| 18 | Avail (via search) | avail.com | Landlord software (Realtor.com) | **Unlimited $0 / Unlimited Plus $9 per unit per month** (official pricing page); ACH $2.50 on the free tier, 3.5% for cards; state-specific leases (reported) | Free signup | Per-unit SaaS + payment fees | State-specific lease builder |
| 19 | RentRedi (via search) | rentredi.com | Landlord software | **$29.95/month monthly or $12/month billed annually** (official); unlimited units; screening extra; syndicates to Zillow, Trulia and HotPads; free tenant app | Trial signup | Subscription + screening | Discount for paying annually |
| 20 | Furnished Finder (via search) | furnishedfinder.com | Mid-term rentals (travel nurses) | **$199 per listing per year** (2026, best-supported; older figures $99/$179); no booking commissions; **landlord verification: background check, proof of ownership, public-records check that the property exists**; $5.99 host verification fee (reported); tenant screening through KeyCheck/TransUnion for $44.99, applicant-paid by default | Owner signup; tenant messaging | Annual listing subscription; visibility plans $7.99–$11.99/month (reported) | "Verified landlord" trust; "Is it legit?" content |
| 21 | Vrbo (via search) | vrbo.com | Vacation rentals (Expedia Group) | Pay-per-booking about 8% (5% commission + 3% processing); an undated Expedia newsroom page says a flat 12%; the subscription ($499–$699/year) has been **closed to new hosts since Aug 28, 2025** (reported) | Host signup → booking | Host commission + traveler fees | n/a. **Trademark: VRBO word mark, Reg. No. 5681113** |
| 22 | Airbnb host pages (via search) | airbnb.com/host | Short-term rentals | **Earnings estimator** uses the past 12 months of bookings for similar listings: nightly earnings × nights, minus host fee, excluding taxes and expenses (official help); AirCover host liability "up to $3M" (3rd-party, unverified) | Location/room type → estimate → "get started" | Host and guest service fees | Estimator used as the top-of-funnel hook |
| 23 | BizBuySell (via search) | bizbuysell.com | Business for sale | Owner tiers **Basic $65.95, Showcase $89.95, Diamond $199.95 per month on a 6-month term** (official FAQ); 3, 6 or 12-month terms; no commission or success fee; can push listings to BizQuest | Listing wizard; buyer inquiry forms | Monthly listing subscriptions; broker memberships | Tiered exposure |
| 24 | BizQuest (via search) | bizquest.com | Business for sale | Claims 2.5M+ network visits a month; no commissions; **option to hide the business location**; "publish in about 5 minutes"; tiers about $59–$349/month (3rd-party, unverified) | Listing + inquiry forms | Monthly listing fees | Confidential-location toggle |
| 25 | Flippa (via search) | flippa.com | Online business marketplace | Listing fees from about $29 up to $499–$699 packages (3rd-party); **mandatory success fees** (official) at reported rates of 5–15%; escrow through Escrow.com about 0.89% (reported); buyer verification | Listing wizard; auctions and offers | Listing fee + success fee + escrow | Auctions plus offers; verification badges |
| 26 | Acquire.com (via search) | acquire.com | Startup marketplace | Seller listing free (one source says $25/month); success fee about 4–10%; paid buyer subscriptions (~$390+/year); **mutual NDA on every access request** (official); platform does **no** seller due diligence (official FAQ) | Buyer "request access" + NDA | Buyer subscriptions + success fee | Gated data room |
| 27 | LoopNet (via search) | loopnet.com | Commercial real estate (CoStar) | Basic is free but shown only to CoStar professionals. Silver → Gold (3rd in search rank) → Platinum (2nd) → Diamond (1st; HD video, drone footage, broker photo). Prices conflict ($89–$2,499/month). | Inquiry forms | Search rank sold by tier | Openly pay-to-play ranking |
| 28 | Crexi (via search) | crexi.com | Commercial real estate | Free basic listing and search; online auctions; Intelligence data subscription about $249/month (reported) | Inquiry forms; auction registration | Premium marketing, data subscription, auctions | Free core + paid data |
| 29 | LandWatch / Land.com network (via search) | landwatch.com | Land listings | About 514K listings on the search page; network includes Land.com, Lands of America and LandAndFarm; owner pricing not found | Inquiry forms | Listing memberships (unverified) | State/county browse; acreage filters† |
| 30 | LandFlip (via search) | landflip.com | Land listings | Run by former land brokers; spin-off sites (FarmFlip, CommercialFlip); FarmFlip says no commissions and offers tiered plans | n/a | Tiered plans (unverified) | Niche spin-off sites |
| 31 | Autotrader (via search) | autotrader.com | Vehicles | **Private seller: $25 Basic / $50 Featured / $90 Premium; extra photos $20; vehicle history report $15** (included with Premium); Classics is a separate product at $59.95–$149.95 | Seller listing wizard | Private-seller packages; dealer subscriptions | Good / better / best tiers with add-ons |
| 32 | Cars.com (via search) | cars.com/sell | Vehicles | Free private listing, live within 24h of approval; **seller's phone not shown, buyers use a contact form**; dealer instant offer with payment after inspection within 3 business days. One source says private listings were discontinued, which conflicts. | Instant-offer funnel; contact-form relay | Dealer subscriptions | Phone masking |
| 33 | CarGurus (via search) | cargurus.com | Vehicles | **IMV deal ratings (Great / Good / Fair / Overpriced)**; private listing $4.95 (contested: NerdWallet 2025 says private listing isn't possible); wind-down of Instant Max Cash Offer approved Aug 2025 (reported) | Cash-offer form | Dealer subscriptions | Deal-rating badges |
| 34 | Kelley Blue Book (via search) | kbb.com | Vehicle valuation | **Instant Cash Offer: VIN or plate + state → style and mileage → color, features and mods → condition → offer valid 7 days**, redeemed at participating dealers after inspection; may be below KBB Trade-In Value | 4–5 step funnel with VIN/plate shortcut | Dealer program fees (unverified); ads | Plate-to-VIN shortcut; 7-day offer expiry for urgency |
| 35 | Edmunds (via search) | edmunds.com/appraisal | Vehicle valuation | Appraisal Report (an estimate) is separate from the instant offer (CarMax, 7 days); TMV assumes "clean" condition; **shows a TMV estimate when no offer is available, so the user never hits a dead end**; tells private sellers to use the "Private Party" price; "10 steps to selling your car" guide | VIN/plate → details → offer or fallback value | Dealer leads; ads | Fallback result; step-by-step guide |
| 36 | Boat Trader (via search) | boattrader.com | Boats | Basic package runs two weeks; Enhanced and Premium run longer with extras; one-time listing fee (amounts not public) | Listing packages | Listing fees; dealer ads | Tiers based on run time |
| 37 | RV Trader (via search) | rvtrader.com | RVs | Private packages about $69.95–$249.95 (guide) or about $80–$350 (2026 comparison); price shown only at checkout; AI listing tool launched 2025 (trade press) | Listing wizard | One-time packages | AI-assisted listing writer |
| 38 | eBay Motors (via search) | ebay.com/motors | Vehicles | Low-volume sellers: **free insertion; success fee $60 if ≤$2,000, $125 if >$2,000** (official table, undated) | Auction / Buy It Now | Success fees | Auction + fixed price |
| 39 | Bring a Trailer (via search) | bringatrailer.com | Enthusiast vehicle auctions | $99 listing; "Plus" $429 with professional photos (reported); buyer fee 5% (minimum $250, cap $7,500 reported); open community comments; Verified Checkout | Submission → curation → auction | Seller fee + buyer premium | Comments build trust in the listing; curated auctions |
| 40 | PrivateAuto (via search) | privateauto.com | Peer-to-peer vehicles | **ID verification (driver's license, facial recognition), proof of funds before meeting, bank-integrated payments ("not escrow"), e-signed bill of sale before money moves**; fees inconsistent ($25 listing; $80 or $150 closing) | Listing + in-app scheduling | Listing + closing fees | Full trust stack for private sales |
| 41 | Opendoor (via search) | opendoor.com | iBuyer | **Address + home details → preliminary offer → free assessment → final offer in 5–7 business days with an itemized fee breakdown → choose close date**; cancel without penalty before closing; service fee varies by market (historically about 5%) | Multi-step funnel that starts with the address | Service fee + resale margin | Address-first CTA; itemized net sheet |
| 42 | Offerpad (via search) | offerpad.com | iBuyer | "Free, no-obligation" request form → estimated Express offer (within 24h reported); close in 8–60 days; Flex listing option; service fee about 5% (4–7% reported); 1% cancellation fee; **free local move within 50 miles** (reported) | Offer request form | Service fee; Flex commissions | Perks highlighted in the pitch |
| 43 | HomeLight (via search) | homelight.com | Agent matching | **About a 2-minute questionnaire (property + when you want to sell) → typically 3 agent matches** (3rd-party); free to consumers; agents pay a referral fee (25% most cited, 33% in one source; the help center gives no number) | Multi-step quiz funnel | Referral fees; Simple Sale; loans | Quiz funnel; large comparison/review blog |
| 44 | Clever Real Estate (via search) | listwithclever.com | Discount agent matching | **1.5% listing fee ($3,000 minimum)** with partner agents; Clever earns a referral fee at closing; publishes "best flat-fee MLS in [state/city]" pages | Lead form → concierge → agent intros | Referral fees from agents | Programmatic state/city pages |
| 45 | UpNest (via search) | upnest.com | Agent marketplace | Seller enters details and confirms about a 90-day timeline → 2–6 local agents send competing proposals | Form → proposals | Agent fees (unverified) | "Agents compete for you" framing |
| 46 | Ideal Agent (via search) | idealagent.com | Agent matching | A single matched agent at a 2% listing commission; "free, no obligation" | Form → one match | Referral fee | Single match keeps it simple |
| 47 | Beycome (via search) | beycome.com | Flat-fee MLS | Tiers $99 / $399 / $999–$1,399 (its own pages disagree); unlimited photos; listing stays active until close; buyer rebate up to 2%; **"agent vs Beycome" commission calculator**; city ranking pages | Calculator → signup | Flat fees; buyer-side commission | Savings calculator used as a CTA |
| 48 | Fizber (via search) | fizber.com | FSBO + flat-fee MLS | Free listing on Fizber and Redfin; MLS about $270–$395; basic plan allows only 6 photos; 0.5% closing fee in CO, ND, SD and WY; Premium adds **priority placement + featured banner** | Package checkout | Flat fees; featured placement | "Featured" upsell |
| 49 | Rightmove (via search) | rightmove.co.uk | UK portal (agents only) | **Instant Valuation**: ML model on public and Rightmove data, shown as a range, refreshed about every 30 days; sold prices from HM Land Registry since 1995; option to request an agent valuation | Valuation → agent valuation request | Agent subscriptions | **Programmatic sold-price pages per town** (/house-prices/london.html) |
| 50 | Zoopla (via search) | zoopla.co.uk | UK portal | **Estimate requires sign-in** (captures the account); estimate range; property timeline; owners can refine the estimate against nearby listings; MyHome has 4M+ owners; "book an agent valuation"; buyer-demand and agent-comparison tools (2025) | Gated estimate → dashboard → valuation request | Agent subscriptions + seller leads | Owner dashboard as the lead engine |
| 51 | Purplebricks (via search) | purplebricks.co.uk | UK hybrid/online agent | Fixed fee paid upfront; "pay later" financing; **sold to Strike for £1 (May 2023)**; £999 fee (June 2023); moved to a "free" model (Dec 2023) | Valuation booking | Fixed fee, then add-on services | Lesson: upfront fees that depend on financing are fragile |
| 52 | OpenRent (via search) | openrent.co.uk | UK landlord platform | Free 3-month listing on its own site; paid ads about £29–£49 including Rightmove and Zoopla; Rent Now £69; tenant referencing £20–£30 per tenant (prices vary by date) | Listing → enquiries → Rent Now | Low à-la-carte fees | Clear, itemized pricing |
| 53 | REALTOR.ca (via search) | realtor.ca | Canada portal (CREA) | Only member brokers can list; DDF syndication for brokers; FSBO owners can appear only through flat-fee brokers; CREA claims copyright over the listing compilation | Agent contact | Member-funded | A closed ecosystem, for contrast |
| 54 | Domain.com.au (via search) | domain.com.au | Australia portal | Home Price Guide covers about 13M properties (PriceFinder data); Property Profile states it is "not an advertisement"; Track My Home updates the estimate; corrections only through a form | Address → estimate → track or contact agent | Agent subscriptions | Estimate for any address |
| 55 | realestate.com.au (via search) | realestate.com.au | Australia portal (REA) | realEstimate (PropTrack AVM); owner dashboard tracks 3M properties (about 30% of homes, company figure); realAssist AI; free property report + local agent price estimate | Track property → agent appraisal | Agent subscriptions; seller leads | Owner dashboard; AI Q&A |
| 56 | Apartment List (via search) | apartmentlist.com | Rental portal | **About a 5-minute quiz (budget, move-in date, neighborhoods, must-have amenities, pets) → "Perfect Matches" vs "Flex Matches"**; a Trustpilot complaint cites 15+ questions and a forced phone number | Quiz funnel with phone required | Property-side fees (unverified) | Onboarding starts with a quiz |
| 57 | Bankrate calculators (via search) | bankrate.com/mortgages/mortgage-calculator | Finance content | Mortgage calculator with **editable taxes, insurance and HOA (can be set to 0); extra payments (monthly, yearly, one-time); Schedule tab with annual and monthly amortization**; hub of calculators | Rate tables → lender leads | Lender lead-gen + ads | Calculator on top, explainer article below |
| 58 | NerdWallet calculators (via search) | nerdwallet.com/mortgages/calculators | Finance content | Mortgage calculator includes taxes, insurance, HOA and **PMI**; affordability uses the **28/36 rule** (inputs: ZIP, pretax income, down payment, monthly debts, credit score); rent vs buy shows break-even and opportunity cost and **discloses its assumptions** | Calculator → lender CTAs | Affiliate / lead-gen | Calculator hub; assumptions stated openly |
| 59 | Nolo (via search) | nolo.com | Legal content | Encyclopedia articles (FSBO vs agent, required disclosures, capital gains exclusion of $250K single / $500K joint); **legal dictionary term pages** ("for sale by owner"); state articles (e.g., California); paid book "Selling Your House" | Lawyer directory† | Books and forms; attorney directory ads† | Glossary pages; state pages |

---

## 2. Cross-site synthesis

### (a) Must-have features for an owner-to-owner marketplace

1. **A free basic listing.** Almost every challenger offers one: Zillow FSBO, Fizber, ForSaleByOwner.com, Apartments.com (4 or fewer units), TurboTenant, Zumper (first few), Crexi, LoopNet Basic, Cars.com. Paid features sit on top of the free tier.
2. **Clear category entry points.** Homes for sale / Rentals / Land / Vehicles / Businesses, plus Vacation & mid-term. Specialists (BizBuySell, LandWatch, Autotrader, Furnished Finder) win because their fields and filters fit the category.
3. **Category-specific listing fields.**
   - Homes: beds, baths, sq ft, lot, year built, HOA, open-house dates, video/3D link.
   - Rentals: rent, deposit, available date, lease length, pets, utilities, application link.
   - Land: acres, zoning, road access, utilities, survey.
   - Vehicles: year/make/model, mileage, VIN, title status, history report.
   - Businesses: asking price, revenue, cash flow, industry, reason for selling, hide-location toggle (BizQuest).
4. **Masked contact.** Buyers reach the owner through a form or relay; the owner's phone and email are not public (Cars.com, Craigslist).
5. **Search and filters:** location, price, beds/baths, type, sq ft, pets (Facebook's rental filter set). Map view (HotPads), favorites and saved searches.
6. **Listing lifecycle:** moderation or approval before publishing (Zillow about 72h reported; Cars.com within 24h), an expiry date (Apartments.com 21 days, Zillow 90 days reported, FSBO.com 6 months, Boat Trader 2 weeks basic), and renewal.
7. **Valuation or calculators.** Every major portal has a pricing tool: Redfin, Zoopla, Rightmove, Domain, REA, KBB, Edmunds. Calculators are the content-friendly equivalent (Bankrate, NerdWallet, Beycome).
8. **Trust layer:** "verified" labels with a stated meaning (Zumper, Furnished Finder), scam warnings, a report-listing route, and safe-payment guidance (FTC).
9. **Education hub:** step-by-step guides, checklists, state-specific legal notes, a glossary (Nolo, Edmunds, Opendoor).
10. **Paths to professionals:** flat-fee MLS, attorneys, inspectors, photographers. Owners who start DIY often buy help later, which is HomeLight's and Clever's model.

### (b) Lead-gen patterns that convert best (with specifics)

| Pattern | Who | Specifics observed | Static-site version for ByOwners |
|---|---|---|---|
| **Address- or VIN-first valuation / offer** | Opendoor, Offerpad, Realtor.com+Offerpad, Redfin, KBB, Edmunds, Domain, REA | The hero has one field. Opendoor: address → home details → preliminary offer → free assessment → final offer in 5–7 business days, with itemized fees. KBB: VIN or plate+state → style/mileage → color/features/mods → condition → offer valid **7 days** (4–5 steps). Edmunds always returns a value: a TMV estimate when there is no offer. | Hero field "Enter your ZIP or address" → 4-step "Free pricing & selling plan" form. **Do not promise an instant automated valuation** (there's no data). Promise a comparable-sales worksheet plus calculator links, and always show something useful on the thank-you page (net-proceeds calculator prefilled). |
| **Multi-step quiz → match** | HomeLight (~2 min, property + timeline → ~3 agents), UpNest (confirms ~90-day timeline → 2–6 proposals), Apartment List (~5 min; budget, move-in, neighborhoods, amenities, pets), Ideal Agent (1 match) | Short quizzes win. Apartment List was criticized for 15+ questions and a forced phone number. | `/get-started/`: **5 steps, 8 fields at most**, progress bar, phone optional with an unchecked consent box. Steps: (1) what you're doing (sell home / rent out / sell land / sell vehicle / sell business / buy) → (2) ZIP + type → (3) timeline (ASAP / 1–3 mo / 3–6 mo / 6+ / exploring) → (4) help wanted (checkboxes) → (5) name + email (+ optional phone + consent). |
| **Gated estimate / owner dashboard** | Zoopla (sign-in required; MyHome 4M+ owners), realestate.com.au (3M properties tracked), Redfin Owner Estimate, Realtor.com My Home | Recurring engagement turns into a seller lead when the owner is ready | Static substitute: an **email "Owner Plan" series** through a newsletter service (monthly checklist and market-reading tips). Don't gate calculator results. |
| **Savings / earnings calculator as the hook** | Beycome (agent vs flat fee), Airbnb (12 months of similar-listing data), NerdWallet rent vs buy, Bankrate | Shows the dollar benefit before asking for anything | Commission-savings and net-proceeds calculators each end with one CTA ("List free" / "Get your free owner plan"). |
| **Good / better / best packages** | Autotrader $25/$50/$90; BizBuySell $65.95/$89.95/$199.95 per month; FSBO.com $99.95/$399.95; LoopNet ranked tiers; Fizber free/MLS/Premium | Three tiers, with the middle one anchored | Free / Featured / Featured+Sponsor-boost, paid through static payment links. |
| **"Free, no obligation" + perks** | Offerpad (free local move ≤50 mi), Redfin ("free, no-obligation consultation"), Ideal Agent ("free, no obligation") | Lowers the commitment barrier | Use the same microcopy on every form, and put "we never sell your phone number without permission" next to the submit button. |
| **Expiry / urgency** | KBB and Edmunds/CarMax offers valid 7 days | Honest deadline | Only use real deadlines (e.g., "featured placement runs 30 days"). |
| **Trust badges at the point of conversion** | Houzeo 4.8/5 from ~4,982 reviews (reported), Zumper "verified", Furnished Finder verification | Badges sit right beside the CTA | Show only real counts. Before you have reviews, use process badges ("Every listing reviewed by a person", "No agent required", "Free to list"). |
| **Exit intent, sticky CTAs** | **Not observed this session** (fetching blocked). These are common industry patterns†. | n/a | Sticky mobile CTA bar is P1 (must not cover ads). Exit-intent is P3 at most, guides only, once per session. |

### (c) Content and SEO patterns

- **Programmatic location pages:** Rightmove's sold-prices-by-town pages; Clever, Houzeo and Beycome's "best flat-fee MLS / FSBO sites in [state or city]". → ByOwners: **state pages** covering disclosure forms, whether the state uses attorneys or escrow, transfer tax, and landlord deposit limits. Each one written and reviewed by hand, never mass-generated thin pages (AdSense and Helpful Content risk).
- **Calculator hubs with explainers:** Bankrate and NerdWallet put the explanation and FAQ under the tool and **state their assumptions** (NerdWallet rent vs buy assumes 9% down and about 6% closing costs).
- **Legal encyclopedia and glossary:** Nolo's legal dictionary has a page per term ("for sale by owner"), plus topic articles and state articles.
- **Step-by-step guides:** Edmunds "10 steps to selling your car"; Opendoor "How to sell a house by owner".
- **Trust and "is it legit?" content:** Furnished Finder and Zumper publish pages answering their own legitimacy questions.
- **Method transparency:** Redfin, Rightmove and Zoopla explain how their estimates work and their limits; Domain says a profile "is not an advertisement".
- **Competitor comparison/review content** is a major traffic driver for Houzeo, Clever, HomeLight and Beycome. It has high intent but carries **trademark and accuracy risk**. ByOwners should write by *type* ("listing-only vs flat-fee MLS vs discount agent vs cash buyer") and not use brand-name headings.
- **Neighborhood and local content** (Trulia What Locals Say) needs heavy moderation, so it's P3.

### (d) Design patterns

- **Hero:** one search or address field with tabs (Buy / Rent / Sell)†. Address-first CTA (Opendoor, Offerpad, Redfin, Zoopla).
- **Category tiles** for Homes / Rentals / Land / Vehicles / Businesses / Vacation.
- **Listing cards:** photo, price, 3–4 key facts, location (city), badge (Featured / Verified / Open house), heart/save†.
- **Filters:** location, price, beds, baths, type, sq ft, pets (Facebook set); category-specific filters for vehicles and businesses.
- **Maps:** HotPads draw-boundary; Trulia's ~30 overlays; Homes.com data layers. For a static site, show approximate pins (city or ZIP centroid) only.
- **Saved searches and favorites**†. For a static site: favorites in localStorage, and alerts through per-category RSS-to-email.
- **Deal badges:** CarGurus IMV (Great / Good / Fair / Overpriced). Not feasible without data, so skip it.
- **Package comparison tables:** FSBO.com, Autotrader, BizBuySell, Houzeo.
- **Data transparency blocks:** "How this estimate works", "last updated".
- **Phone masking / contact form:** Cars.com.

### (e) Monetization models and typical pricing (verified ranges, with caveats)

| Model | Examples and price points found | Confidence |
|---|---|---|
| FSBO listing only | $0 (Zillow FSBO, Fizber free tier, ForSaleByOwner.com); **$99.95 for 6 months** (FSBO.com); ByOwner basic **$95** | Medium (3rd-party, fairly consistent) |
| Flat-fee MLS | ByOwner **$195** (its own blog; one source says $499); Beycome **$99–$1,399**; Fizber **~$270–$395**; FSBO.com **$399.95**; Houzeo **$199–$379 + 0.5–1.25% at closing (reported $999 minimum)**; historical Owners.com **$395** (2015) | Medium-low (sources conflict) |
| Discount agent / matching | Clever **1.5% ($3,000 minimum)**; Ideal Agent **2%**; HomeLight referral fee paid by the agent **~25%** (33% in one source) | Medium |
| iBuyer service fee | Opendoor **varies by market (historically ~5%)**; Offerpad **~5% (4–7% reported) + 1% cancellation** | Medium |
| Rental listing fees | Zillow **first listing free, then $9.99/week per listing**; premium **$29.99 for 90 days** (reported); Apartments.com **free for ≤4 units**; Craigslist **$5 in Boston/Chicago/NY, free elsewhere**; Furnished Finder **$199/year**; Zumper promoted **~$10/listing or $50/month** (unverified) | Medium |
| Renter-paid screening | Apartments.com **$29–$29.99**; Zillow **$29**; Furnished Finder/KeyCheck **$44.99**; OpenRent **£20–£30** | Medium |
| Landlord SaaS | TurboTenant **$0 / ~$12–$17 per month**; Avail **$0 / $9 per unit per month**; RentRedi **$12/month annual, $29.95 monthly** | Medium-high (official pages for Avail and RentRedi) |
| Vacation commissions | Vrbo **~8% pay-per-booking** (or 12% per an undated Expedia page); subscription **$499–$699/year, closed to new hosts since Aug 2025** | Medium |
| Vehicle listings | Autotrader **$25 / $50 / $90** (+$20 photos, $15 history report); Autotrader Classics **$59.95–$149.95**; eBay Motors **$60 / $125 success fee**; Bring a Trailer **$99 (+5% buyer fee, $250 min, cap ~$7,500)**; PrivateAuto **$25 + closing fee**; RV Trader **~$70–$350**; CarGurus **$4.95 (contested)** | Medium |
| Business listings | BizBuySell **$65.95 / $89.95 / $199.95 per month** (official FAQ, 6-month term); BizQuest **~$59–$349/month** (unverified); Flippa **~$29–$699 + success fee**; Acquire.com **free or $25/month + ~4–10% success fee; buyer subscriptions ~$390+/year** | Medium (BizBuySell high) |
| Commercial | LoopNet Silver–Diamond **$89–$2,499/month (conflicting)**; Crexi Intelligence **~$249/month** | Low-medium |
| Featured / priority upsell | Fizber Premium (priority + featured banner); Zillow premium rental $29.99; Furnished Finder visibility **$7.99–$11.99/month** (reported); LoopNet rank tiers | Medium |
| Agent/partner advertising and leads | Zillow, Realtor.com, Zoopla, REA all run on agent subscriptions and seller leads (exact pricing **unverified** this session) | n/a |

**Suggested ByOwners price points (recommendation, not market data):**
- Free basic listing.
- **Featured: $19–$29 for 30 days** for homes, rentals and land (near Zillow's $29.99 rental premium).
- **Featured vehicle: $15–$25 for 30 days** (below Autotrader's $50 Featured).
- **Featured business: $29–$49 for 30 days** (well below BizBuySell's monthly tiers).
- Category or guide **sponsorships priced monthly**, labeled "Sponsored".

### (f) Trust and safety features

- **Owner verification:** Furnished Finder checks the landlord's background, proof of ownership (deed or tax record) and that the property exists in public records. PrivateAuto verifies driver's licenses, uses facial recognition and checks proof of funds.
- **Honest verification labels:** Zumper says "not all listings are verified, but we clearly label those that are".
- **Masked contact and relays:** Cars.com hides phone numbers; Craigslist relays email†.
- **Moderation before publishing:** Zillow FSBO approval about 72h (reported); Cars.com within 24h.
- **Scam education (FTC):**
  - Never pay by **wire, gift card or crypto**; a credit card gives the best protection.
  - **Don't pay before seeing the property or signing a lease.**
  - Search the address together with the owner's name, and watch for rent far below comparable units.
  - Be wary of "out of the country" owners and pressure to decide fast.
  - Report to **ReportFraud.ftc.gov** and the state attorney general.
  - The FTC has received about **65,000 rental-scam reports since 2020**, and about half of recent reports started with a fake Facebook ad.
- **Listing hijacking:** scammers copy real listings and repost them (Zillow listings onto Facebook; Craigslist). → Add a "Report this listing" link and a visible "Listed on ByOwners on [date] · Listing ID".
- **Escrow and verified checkout:** Bring a Trailer Verified Checkout; Flippa through Escrow.com (~0.89% reported); PrivateAuto signs the bill of sale before money moves.
- **Confidentiality for businesses:** Acquire.com's mutual NDA; BizQuest's hide-location option.
- **Fair housing:** FHA §804(c) bars discriminatory ad statements. HUD has found liability for a discriminatory Craigslist ad. Roommates.com: the 9th Circuit (2012) held roommate preferences fall outside the FHA, and CDA §230 can shield platforms. HUD still applies advertising rules to otherwise-exempt housing. → Moderate rental copy and warn about risky phrases at submission.

---

## 3. Implement on ByOwners.com (static Jekyll + form-to-email)

### P1: launch-critical (all doable statically)

1. **Category IA + hero:** tabs Buy / Rent / Sell & List, one search box, and 6 category tiles (Homes, Rentals, Land, Vehicles, Businesses, Vacation & mid-term).
2. **Free "List by owner" submission** at `/sell/`. One multi-step form with category-specific fields, using JS show/hide and a single POST to the form service.
   - Required checkboxes: "I'm the owner or authorized", "No discriminatory preferences (Fair Housing)", "Info is accurate".
   - Honeypot field and a minimum fill time to block spam.
   - A person reviews each submission and publishes it as a `_listings/*.md` file. Show "Reviewed [date]".
3. **Listing card + detail layout:** gallery, price, key facts, **approximate location only (city/ZIP)**, open-house dates, video-tour link, "Listed/Updated/Expires" dates, Listing ID, and explained badges (Featured = paid; Verified = documents checked).
4. **Masked "Contact the owner" form** on every listing. It posts the listing ID to the form service and ByOwners relays it, so owner phone and email are never published. A short scam-warning box (FTC rules) sits right above the submit button.
5. **Client-side search and filters:** Jekyll builds a `listings.json` index; filter by category, location, price, beds/baths, type and pets; sort; favorites in localStorage on a "Saved" page.
6. **Calculator suite** (7 tools already planned): commission savings, seller net proceeds, mortgage (taxes/insurance/HOA/PMI, amortization, extra payments, as Bankrate and NerdWallet do), affordability (28/36), rent vs buy (state assumptions), rental property, closing costs. Each gets an explainer, FAQ and **one CTA**. Never gate results behind email.
7. **"Free Owner Plan" quiz funnel** at `/get-started/`: 5 steps, 8 fields at most, progress bar, phone optional, partner-contact consent **unchecked by default**, with the kinds of partners named.
8. **Pricing-help CTA, framed honestly:** "Get a free pricing worksheet" (ZIP/address → property basics → timeline → email). It is **not** an instant AVM. The thank-you page links the net-proceeds calculator so the user never hits a dead end (Edmunds lesson).
9. **Trust & Safety center** at `/safety/`: FTC payment rules, a "verify the owner" checklist, safe showing and test-drive tips, a "Report a listing" form, an explanation of the verification process, and a scam-warning block reused on listings and contact forms.
10. **Education hub:** the 24 spec'd guides plus the interactive `/checklist/`, each with a dated "last reviewed" stamp and cited authoritative sources (Nolo-style depth, Edmunds-style steps).
11. **"Ways to sell by owner" comparison page:** listing-only vs flat-fee MLS vs discount agent vs cash buyer, using the **price ranges in §2(e) with a "last checked" date**, organized by type and not by brand names.
12. **Featured listing and sponsorship products** paid through static payment links (Stripe Payment Links or PayPal buttons). Labels: "Featured" (paid placement) and "Sponsored"; fixed 30-day terms; a refund policy page.
13. **Pros directory + "Get matched"** at `/pros/`: flat-fee MLS brokers, real estate attorneys, inspectors, title/escrow, photographers, landlord-software partners. Clear **disclosure of any paid relationship**.
14. **Sticky mobile CTA bar** ("List free" / "Free owner plan"). It must never overlap or crowd ad units (AdSense accidental-click rule).
15. **AdSense-ready policy pages:** About (who runs it), Contact (form), Privacy (cookies and ads; a Google-certified CMP for EEA/UK visitors, required since early 2024 per prior knowledge, verify), Terms, Listing & Content Policy, Advertising & Affiliate Disclosure, Editorial Policy. Ads labeled only "Advertisements" or "Sponsored Links".
16. **Structured data:** Article, FAQPage and BreadcrumbList on guides; Organization; listing-appropriate schema (e.g., schema.org RealEstateListing / Car / Offer, verify the current spec); an XML sitemap that excludes expired listings.

### P2: after launch

- **State pages** (50 + DC), written by hand: disclosure form names, attorney vs escrow state, transfer taxes, security-deposit limits, sources.
- **Saved-search alerts:** a per-category RSS/JSON feed plus a newsletter service doing RSS-to-email.
- **Map view** with Leaflet and approximate pins (check the tile provider's usage policy, or use a commercial tile key).
- **"Owner Verified" tier** (Furnished Finder model): owner uploads a deed, tax bill or vehicle title through the form service's file upload; manual check; badge with the verification date; can be bundled into Featured.
- Open-house calendar page; **printable flyer + QR code generator** (client-side PDF) for yard signs and vehicle windows.
- Downloadable lead magnets: seller net sheet, rental application template and showing checklist (optional email, never required).
- Glossary (A–Z) with one page per important term (Nolo pattern).
- **Donations** ("Support independent owner resources") through Ko-fi, Buy Me a Coffee or a Stripe link.
- Newsletter "Owner Plan" drip (Zoopla/REA engagement, done with email instead of a dashboard).
- Business listings: "hide exact location" and "NDA required for financials" options (BizQuest, Acquire.com).

### P3: needs a backend, data or partners

- Owner accounts and dashboard; in-app messaging inbox; listing analytics.
- A real AVM or instant valuation (needs licensed data); deal-rating badges (CarGurus IMV).
- Identity verification (e.g., Stripe Identity), escrow or payment rails (PrivateAuto, Bring a Trailer models), auctions.
- Crowdsourced neighborhood reviews (Trulia What Locals Say), map data layers, AI assistant.
- Exit-intent modal (guides only, once per session, never covering ads). Test it, and drop it if it hurts engagement.

### AVOID

**Trademarks and branding**
- **"Vrbo" / "VRBO":** a registered word mark (USPTO Reg. No. 5,681,113 per Justia; brand of Expedia Group through HomeAway). Vrbo began as an abbreviation of "Vacation Rentals by Owner", so **don't use "Vacation Rentals by Owner" (or "VRBO") as a section name, product name, heading, URL slug or ad keyword**. Use "owner-direct vacation rentals" or "vacation homes from owners".
- **ByOwner.com, ForSaleByOwner.com, FSBO.com, Owners.com:** "ByOwners" sits close to "ByOwner.com". Don't copy their logos, colors or taglines, and don't imply any affiliation. Get a **trademark clearance search / attorney opinion before filing or heavy branding**. Avoid comparison pages that rank them by name.
- **Other marks:** REALTOR® (a NAR membership mark; say "agent"), Zestimate, Redfin Estimate, realEstimate, Kelley Blue Book / "Instant Cash Offer", Airbnb, Superhost, AirCover, MLS® (in Canada, CREA marks). Don't use these as feature names or headings.
- **Don't scrape or copy listings or photos** from other portals or MLSs (CREA asserts copyright over its listing compilation; MLS/IDX rules apply). Copied listings are also how most rental scams work.

**AdSense pitfalls** (Google program policies)
- Never ask for clicks or offer incentives ("click the ads", "support us by clicking").
- **No ads next to buttons, forms, navigation or dropdowns**, where they could cause accidental clicks. Keep ads away from the contact-owner form, quiz steps, calculators' Calculate buttons and the sticky CTA bar.
- Don't put ads under misleading headings like "Resources" or "Helpful links". Label them only "Advertisements" or "Sponsored Links".
- No ads in pop-ups or pop-unders. Keep interstitials off pages that carry ads.
- Avoid **thin or auto-generated pages carrying ads**: empty category pages, expired listings, one-line listings, form thank-you pages (inference from the valuable-inventory rules; verify).
- Paid "Featured" or "Sponsored" listings must look clearly different from Google ads.

**Lead-gen legal risk**
- **Fees contingent on a closing paid to an unlicensed party** (e.g., a % of the agent's commission) can break **state real estate license laws**. Colorado DRE notes that RESPA still applies to referral fees paid to unlicensed persons, and that a broker *may* pay a **pre-set fee to a lead-generation company for a list of prospects**. → Sell **flat per-lead or flat monthly advertising/sponsorship**, not success fees, unless licensed. Get a real estate attorney's review per state.
- **RESPA §8:** take no kickbacks from mortgage, title or settlement providers for referrals. Price marketing at fair market value, never tied to closings.
- **TCPA:** the FCC's one-to-one consent rule was **vacated Jan 24, 2025** (*Insurance Marketing Coalition v. FCC*), but prior express (written) consent still applies to autodialed or texted marketing. Use unchecked consent boxes, name partner categories, keep consent logs (the form service's timestamped emails), and honor opt-outs.
- **Fair Housing:** don't let rental listings carry discriminatory preferences. Moderate them, warn at submission, and publish a fair-housing notice.

**Product and honesty**
- Don't label anything "instant valuation" or "verified" without real data or a real process. Don't invent review counts, "X sellers saved $Y" claims or testimonials.
- Don't publish an owner's exact street address, phone or email unless they choose to (safety for vacant land and rentals; listing hijacking).
- Don't charge large upfront fees backed by financing (Purplebricks sold for £1 in 2023), and don't rely on one revenue line (Owners.com closed in 2019).
- Don't gate calculator results or guides behind email. It hurts UX and makes the "valuable content" case for AdSense weaker.
- Don't use localStorage for anything that has to persist (listings, leads). It's per-browser and can be wiped.

---

## 4. Key sources (all found through WebSearch on 2026-11-02)

- Craigslist posting fees (official): https://www.craigslist.org/about/help/posting_fees
- FTC Rental Listing Scams: https://consumer.ftc.gov/articles/rental-listing-scams · FTC rental scam analysis (Dec 2025): https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-analysis-shows-consumers-have-lost-millions-rental-scams
- Google AdSense program policies: https://support.google.com/adsense/answer/48182 · Ad placement policies: https://support.google.com/adsense/answer/1346295
- VRBO trademark record: https://trademarks.justia.com/872/61/vrbo-87261544.html · Vrbo history: https://en.wikipedia.org/wiki/Vrbo
- 11th Cir. vacates one-to-one consent: https://www.mofo.com/resources/insights/250130-eleventh-circuit-vacates-fcc-s-tcpa-one-to-one-consent-rule
- Colorado DRE on RESPA and referral fees: https://dre.colorado.gov/sites/dre/files/documents/Commission%20Position%2003%20-%20RESPA%20and%20Referral%20Fees.pdf
- Apartments.com applicant cost: https://propertyhelp.apartments.com/article/13-applicant-cost
- Avail pricing: https://www.avail.com/pricing · RentRedi pricing: https://www.rentredi.com/pricing/ · TurboTenant pricing: https://turbotenant.com/pricing
- Furnished Finder owner verification: https://www.furnishedfinder.com/Resources/owner-verification-report · fees: https://www.hostfully.com/blog/furnished-finder-fees/
- Vrbo fees: https://www.hostfully.com/blog/vrbo-host-fees/ · Airbnb estimator: https://www.airbnb.com/help/article/4145
- BizBuySell listing FAQ: https://www.bizbuysell.com/create-a-listing-FAQ/ · BizQuest sell page: https://bizquest.com/sell-a-business/
- Flippa fees (support): https://support.flippa.com/hc/en-us/articles/360000774276 · Acquire.com seller FAQ: https://help.acquire.com/seller-faqs-1
- LoopNet ad packages: https://www.loopnet.com/solutions/ad-packages/ad-packages-overview
- eBay Motors fees: https://www.ebay.com/help/selling/fees-credits-invoices/motors-fees?id=4127
- Cars.com how-to sell: https://www.cars.com/sell/how-to · KBB ICO FAQ: https://www.kbb.com/company/faq/ico · Edmunds appraisal: https://www.edmunds.com/appraisal/
- Autotrader vs CarGurus (Autotrader pricing): https://www.autotrader.com/car-shopping/autotrader-listings-vs-cargurus-listings
- Opendoor how it works: https://help.opendoor.com/selling/how-it-works/how-selling-to-opendoor-works · Offerpad review: https://www.bankrate.com/real-estate/offerpad-review
- HomeLight cost: https://help.homelight.com/hc/en-us/articles/360002947414-what-does-homelight-cost- · Clever: https://www.listwithclever.com/
- Redfin estimate: https://www.redfin.com/redfin-estimate · Rightmove valuation: https://www.rightmove.co.uk/house-value · Zoopla estimate range: https://help.zoopla.co.uk/hc/en-gb/articles/360005670638-What-does-the-estimated-price-range-mean
- Domain Home Price Guide: https://domain.com.au/street-profile · REA tracked homes: https://eliteagent.com/three-million-australian-homes-tracked-on-realestate-com-au/
- Bankrate mortgage calculator: https://www.bankrate.com/mortgages/mortgage-calculator/ · NerdWallet calculators: https://www.nerdwallet.com/mortgages/calculators
- Nolo FSBO vs agent: https://www.nolo.com/legal-encyclopedia/real-estate-agent-sell-house-30259.html · Nolo disclosures: https://www.nolo.com/legal-encyclopedia/required-disclosures-selling-real-estate-30027.html
- Owners.com acquisition: https://www.inman.com/2014/12/01/owners-com-snapped-up-by-online-auction-platform-operator/
- Purplebricks sale to Strike: https://www.estateagenttoday.co.uk/breaking-news/2023/5/purplebricks-agrees-sale-to-strike-for-1
- Realtor.com My Home / iBuyer comparison: https://www.nationalmortgagenews.com/news/realtorcom-introduces-my-home-to-compete-with-zillows-zestimate · Offerpad + Realtor.com: https://investor.offerpad.com/news-releases/news-details/2024/Offerpad-Brings-Cash-Offers-to-More-Sellers-Through-a-New-Integration-with-Realtor.com/default.aspx
- Zillow rental fees (3rd-party): https://hemlane.com/resources/zillow-is-charging-for-rentals
- FSBO.com / Houzeo / ByOwner / Fizber / Beycome pricing (3rd-party reviews): https://listwithclever.com/reviews/fsbocom/ · https://www.bankrate.com/real-estate/houzeo-review · https://www.houzeo.com/blog/byowner-com-company-reviews/ · https://listwithclever.com/real-estate-blog/fizber-reviews/ · https://www.beycome.com/faq
- Apartment List matching: https://www.apartmentlist.com/renter-life/best-apartment-search-tools
- PrivateAuto: https://privateauto.com · Bring a Trailer fees (3rd-party): https://hypercars.io/blog/bring-a-trailer-fees
- Roommates.com / Fair Housing (summary): https://faculty.law.harvard.edu/joseph-singer/?p=647
