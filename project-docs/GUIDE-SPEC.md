# ByOwners.com — Guide Writing Spec (for writers/agents)

ByOwners.com is an independent owner-to-owner marketplace + education hub: sell, rent, or buy homes,
land, vehicles and small businesses directly from owners (no agent required). Audience: US homeowners,
landlords, buyers, and private sellers, mostly first-timers doing it themselves. Goal of every guide:
genuinely help the reader finish the job, earn trust (E-E-A-T), rank in Google, and pass Google AdSense
"valuable content" review.

## File format
- One file per guide: `_guides/<slug>.md` (slug given in your assignment; use it exactly).
- Front matter (YAML) EXACTLY like this — all keys required unless marked optional:

```yaml
---
title: "How to Sell Your House By Owner: The Complete Step-by-Step Guide"
description: "140–160 character meta description with the primary keyword, written to earn the click."
category: selling        # one of: selling, renting, buying, vacation, money, legal, vehicles, business, safety, marketing
date: 2026-10-05         # given in your assignment
last_modified_at: 2026-11-02
reading_time: 12         # minutes, ≈ words / 220, rounded
featured: false          # true only if your assignment says so
cta: seller              # one of: seller, landlord, buyer, car, business, pro, vacation
tags: [fsbo, pricing]    # 2–5 lowercase tags
takeaways:               # 3–5 one-sentence key takeaways (plain text)
  - "..."
faqs:                    # 4–6 Q&As (plain text, 1–3 sentences each) — become FAQPage schema
  - q: "..."
    a: "..."
sources:                 # 3–6 authoritative sources you actually checked (gov, NAR research, CFPB, IRS, HUD, FTC, EPA, state agencies, major universities)
  - name: "IRS Publication 523, Selling Your Home"
    url: "https://www.irs.gov/publications/p523"
---
```

## Body rules
- 1,300–2,000 words of original, specific, practical writing. No fluff, no AI clichés ("in today's fast-paced world",
  "delve", "navigate the complexities", "unlock", "game-changer", "it's important to note").
- Do NOT write an H1 (the layout prints the title). Start with a 2–3 sentence intro paragraph that states who the
  guide is for and what they'll be able to do after reading.
- Structure with `##` and `###` headings (at least 5 `##` sections). Include at least ONE Markdown pipe table and ONE
  numbered step list or checklist. Short paragraphs (2–4 sentences). Use **bold** for key terms sparingly.
- Concrete numbers, examples, and worked math where useful (e.g., "On a $400,000 sale, a 5.5% total commission is $22,000").
  Label illustrative numbers as examples. Any statistic must be verifiable — check it with WebSearch/WebFetch and cite it in `sources`.
  If you cannot verify a stat, don't use it.
- Be accurate about US law at a general level and say when rules vary by state/city. Where appropriate add one sentence like
  "Rules vary by state — confirm with a local real estate attorney." Don't over-disclaim; the layout already shows a disclaimer.
- Internal links (2–5 per guide) using root-relative paths ONLY from this list:
  - Guides: `/guides/<slug>/` — slugs listed below
  - Tools: `/tools/commission-savings-calculator/`, `/tools/mortgage-calculator/`, `/tools/seller-net-proceeds-calculator/`,
    `/tools/rental-property-calculator/`, `/tools/rent-vs-buy-calculator/`, `/tools/home-affordability-calculator/`,
    `/tools/closing-cost-estimator/`
  - Pages: `/checklist/` (interactive FSBO checklist), `/get-started/` (free owner plan / matching), `/sell/` (list free),
    `/listings/` (browse by-owner listings), `/resources/`, `/pros/` (find vetted pros)
- External links only to authoritative sources (also listed in `sources`). Never link to competitors' listing sites.
- NEVER include any email address, phone number, or the words "click the ads". Don't mention AdSense.
- Don't promote or disparage brands. Avoid trademarks as headings (e.g., don't title anything with "Vrbo", "Zillow", "Realtor").
  If you mention REALTOR®, use it correctly (it's a NAR membership mark) — better to just say "agent" or "real estate agent".
- NEVER use the character sequences `{{`, `}}`, `{%`, `%}` anywhere (Jekyll Liquid will break).
- Don't use raw HTML except, optionally, `<div class="callout">...</div>` is NOT allowed either — keep pure Markdown.
- End with a short `## Next steps` section (3–4 bullets linking to relevant internal pages/tools).
- US English. Second person ("you"). Confident, plain, expert tone — like a seasoned real estate attorney + investor explaining it to a friend.

## All guide slugs (for internal linking)
| slug | category |
|---|---|
| how-to-sell-your-house-by-owner | selling |
| how-to-price-a-home-for-sale-by-owner | selling |
| documents-needed-to-sell-a-house-by-owner | legal |
| flat-fee-mls-explained | selling |
| how-to-market-a-for-sale-by-owner-home | marketing |
| negotiating-offers-without-an-agent | selling |
| closing-a-for-sale-by-owner-sale | legal |
| seller-disclosure-requirements | legal |
| how-to-rent-out-your-house-by-owner | renting |
| tenant-screening-guide-for-landlords | renting |
| how-to-set-the-right-rent-price | renting |
| lease-agreement-essentials | legal |
| fair-housing-rules-for-private-landlords | legal |
| how-to-buy-a-house-directly-from-the-owner | buying |
| owner-financing-explained | buying |
| short-term-vacation-rental-owner-guide | vacation |
| capital-gains-tax-when-selling-your-home | money |
| seller-closing-costs-explained | money |
| how-to-sell-a-car-by-owner | vehicles |
| how-to-sell-a-business-by-owner | business |
| avoid-scams-buying-selling-renting-by-owner | safety |
| home-staging-and-listing-photos-on-a-budget | marketing |
| real-estate-commission-rule-changes-explained | money |
| how-to-sell-land-by-owner | selling |
