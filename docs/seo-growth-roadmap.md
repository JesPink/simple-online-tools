# Simple Online Tools: SEO and product growth roadmap

**Owner:** Simple Online Tools  
**Working strategy:** Build fewer, more useful tools; validate search demand before expansion; earn relevant authority through original utility and distribution.  
**Status:** Execution blueprint, not a ranking forecast.  
**Last reviewed:** 2026-11-27

## Executive decision

Do not increase the number of tools as the primary growth tactic. The current site has evidence of search demand but weak organic acquisition and several product experiences that stop at basic detection or generation. Prioritize a small, coherent writing-tools cluster, starting with the Passive Voice Checker, and expand only when a tool has a demonstrated search opportunity and a defensible user benefit.

The site can retain its broader utility catalogue. The initial growth focus should be writing and text improvement because the Passive Voice page is the strongest current non-brand search signal. This is a focused entry point, not a commitment to remove other useful tools.

## Evidence baseline

### First-party Search Console data

Snapshots available to this project:

- Last 28 days, 2026-10-28 through 2026-11-24:
  - "passive voice checker": 57 impressions, average position 39.7.
  - "passive voice detector": 46 impressions, average position 15.8.
  - "passive voice fixer": 39 impressions, average position 61.9.
  - "value proposition generator": 20 impressions, average position 59.3.
  - The returned query rows recorded zero clicks during this period.
- Last 3 months, 2026-08-24 through 2026-11-24:
  - Passive Voice Detector: 425 impressions, 2 clicks, average position 35.6.
  - Value Proposition Generator: 145 impressions, 0 clicks, average position 52.7.
  - Meeting Cost Calculator: 19 impressions, 0 clicks, average position 38.4.

These are Search Console observations, not forecasts. Positions are averages across impressions and can vary by query, location, device, and time. Search volume estimates from third-party keyword tools must not be added to Search Console impressions.

### Technical crawl snapshot

The 2026-11-26 OpenSEO crawl returned 19 pages, all HTTP 200 and indexable, with one H1 each and no reported audit issues. The prior Search Console index snapshot had 9 indexed pages, 9 discovered but not indexed, and 1 crawled but not indexed. Recheck current indexation before making indexing claims or submitting further requests.

### Backlink observations supplied by the site owner

- Ahrefs: DR 0, 848 backlinks, 808 linking websites, with 40% of backlinks and 41% of linking websites reported as dofollow.
- Moz: DA 3, 127 linking root domains, 7 ranking keywords, Spam Score 11%.

These counts differ substantially and should not be merged. They may reflect different target scopes, crawl coverage, link filters, and update times. DR, DA, and Spam Score are third-party proprietary metrics, not Google metrics and not evidence of a Google penalty. Obtain the exports and compare the underlying referring domains before diagnosing link quality.

### Research limitation

OpenSEO's connected organization returned an insufficient-credit error for the latest keyword, SERP, and backlink research request. No new OpenSEO keyword difficulty, volume, competitor visibility, or backlink profile metrics are claimed in this roadmap. Refresh that research after credits are restored; meanwhile use Search Console and live SERP observations as directional evidence.

## Strategic pillars

### 1. Product quality before catalogue growth

A tool page should complete the user's task, not merely identify an issue or output generic text. Each flagship tool needs:

- A clear primary task and an obvious first action.
- Useful results in the user's original context, without redundant repeated content.
- Specific explanations and actionable next steps.
- Copy, download, apply, undo, or export actions where the task naturally requires them.
- Honest limitations and privacy behavior that match the implementation.
- Keyboard accessibility, responsive layout, useful empty/error states, and fast local execution.
- A regression suite with representative positive, negative, edge, and adversarial examples.

Do not describe heuristic tools as AI-powered or claim measured accuracy without a benchmark.

### 2. Passive Voice Checker as the first flagship

Current code inspection found that the tool:
- Selects one detection pattern per sentence, so compound sentences can be incompletely analyzed.
- Randomly chooses generic review prompts.
- Repeats the complete sentence in the suggestion card after already showing it in the highlighted results.
- Does not provide an active rewrite action.
- Uses heuristic confidence scores that are not calibrated probabilities.

The first V2 increment adds deterministic review guidance, removes the duplicate sentence from suggestion cards, and offers a conservative "Apply rewrite" action only for simple constructions with a named "by" agent and a supported verb form. It refuses rewrites when the sentence contains multiple passive auxiliaries or ambiguous context. This is intentionally a narrow first increment, not a complete grammar engine.

#### Required quality gates before calling V2 complete

1. Build a labeled corpus of at least 200 sentences, including:
   - Clear be-passives, get-passives, modal passives, and perfect passives.
   - Passive clauses with and without named agents.
   - Multiple passive clauses in one sentence.
   - Adjectival participles and non-agent "by" phrases.
   - Irregular verbs, adverbs, negation, questions, quotations, names with accents, and punctuation edge cases.
2. Measure precision and recall on a held-out set. Publish the test methodology and limitations; do not set a success threshold until a baseline is measured.
3. Ensure every rewrite preserves tense, subject/object meaning, modifiers, and punctuation. If the transformation cannot be proven safe by the supported rule set, do not offer an apply action.
4. Test that applying a rewrite changes only the intended sentence, then re-runs analysis; undo or a clear recovery path must be available.
5. Verify compound-clause handling separately. Do not report a sentence-level count as a count of every passive construction.
6. Run desktop and mobile browser regression tests, accessibility checks, and performance checks before release.

#### Follow-on product work

- Analyze multiple passive constructions per sentence without losing sentence context.
- Improve clause boundaries and punctuation preservation.
- Support actor input when the agent is omitted, but never fabricate an actor.
- Add per-match explanation and a safe "why this may be passive" rationale.
- Add an editable full-text rewrite preview only after clause-level mapping is reliable.
- Consider an optional language-model rewrite only if privacy, cost, latency, and serverless architecture are explicitly designed and disclosed. Do not send user text to a third-party service by default.

### 3. Search intent and page quality

For each tool page:

- Define one primary search intent and a small set of close variants.
- Confirm that the tool actually fulfills the promise implied by the title, description, H1, and FAQ.
- Compare the live first-page results and identify what the current leaders do that users value.
- Add original examples, transparent method details, edge cases, and limitations derived from testing the actual tool.
- Make the tool usable immediately; put supporting explanation after the interface.
- Use natural internal links between genuinely related tools and guides.
- Avoid arbitrary word-count targets, repeated keyword blocks, generic FAQs, and pages created only to target close keyword variants.

Do not rewrite a page that is already performing well without evidence that the change will improve its result. Treat title and meta-description changes as CTR experiments, not ranking guarantees.

### 4. Topic cluster and expansion gate

Initial cluster:
- Passive Voice Checker (flagship)
- Word Counter
- Case Converter
- A future Readability Analyzer or Sentence Structure Analyzer only if keyword and SERP research proves a distinct unmet need.

Do not create separate "detector", "checker", "fixer", and "converter" URLs if they serve the same intent. Prefer a feature on the existing page unless the search results demonstrate distinct intent and a genuinely distinct product.

Score every proposed tool from 1–5 on:
- Search demand and intent evidence.
- SERP competitiveness and realistic differentiation.
- Product usefulness and technical feasibility.
- Topical fit with existing tools.
- Linkability or shareability.
- Maintenance and accuracy risk.

Build only when the opportunity has clear demand, distinct intent, and a concrete product advantage. Launch one candidate at a time and review it before expanding.

### 5. Backlink diagnosis and authority

Do not disavow links based on DR 0, DA 3, Spam Score 11%, or a large raw backlink count.

Audit procedure:
1. Export referring domains and backlinks from Ahrefs, Moz, and Search Console.
2. Normalize domains and deduplicate them; preserve the source and export date.
3. Review top linking domains, new/lost links, anchor text, target URLs, followed/nofollowed status, topical relevance, and whether the link is editorial or sitewide.
4. Check Search Console Manual Actions and messages.
5. Investigate any known paid, automated, hacked, or manipulative link campaigns.
6. Seek removal or qualification of confirmed manipulative links. Consider disavow only when Google's stated conditions are met and the evidence supports it.

Link acquisition should be built around assets worth citing:
- An openly documented passive-voice benchmark and methodology.
- Useful classroom/writing examples and teaching resources.
- A genuinely better free tool that educators, editors, and writing resources can recommend.
- Relevant editorial outreach and selective inclusion in useful resource lists.

Do not buy followed links, automate directory submissions, exchange links at scale, or mass-email generic pitches. Measure relevant new referring domains and actual referral traffic, not just DR growth.

### 6. Indexing and technical foundations

Maintain the existing static-first, browser-based architecture and performance budget. Protect:
- Canonicals, index directives, sitemap correctness, robots rules, status codes, and trailing-slash consistency.
- Crawlable internal links to every important tool and category.
- One clear H1 and logical headings.
- Accessible controls and semantic result markup.
- No accidental duplicate pages, thin programmatic pages, or unsupported structured-data claims.
- Build, generated SEO validation, browser regression tests, and production verification.

Indexation is not solved by repeatedly requesting indexing. Improve page value, internal discovery, and unique purpose, then monitor URL Inspection and Search Console.

### 7. Distribution and original assets

The first linkable asset should be a transparent Passive Voice Checker evaluation resource:
- Publish the labeled dataset's methodology and aggregate results.
- Include examples of false positives, false negatives, and ambiguous cases.
- Explain how the tool handles omitted actors and why passive voice is not always wrong.
- Invite educators and writing specialists to review the methodology.
- Make the resource useful without requiring a backlink.

Prospect only pages that already reference writing tools, grammar resources, teaching materials, or language-learning resources. Personalize each outreach with the exact resource and reason it improves that page.

## 90-day execution sequence

| Window | Focus | Deliverable / exit gate |
|---|---|---|
| Days 1–14 | Passive Voice V2 increment | Deterministic suggestions, no duplicate sentence, conservative apply action, automated tests passing |
| Days 15–30 | Detection quality | Labeled corpus, measured precision/recall baseline, edge-case fixes, honest methodology |
| Days 31–45 | Search page and cluster | Page promise matches shipped features; useful examples, limitations, and relevant internal links |
| Days 46–60 | Backlink audit and linkable asset | Deduplicated referring-domain review; manual-action check; original benchmark resource |
| Days 61–75 | Distribution and next-tool research | Personalized outreach; keyword/SERP-backed next-tool decision |
| Days 76–90 | Measure and iterate | Search Console comparison, indexation review, engagement review, next-quarter priorities |

## Operating scorecard

Review weekly and monthly:

**Search acquisition**
- Organic clicks and non-brand clicks.
- Impressions by query cluster and landing page.
- CTR by query/page and device.
- Queries moving into top 20 and top 10.
- Indexed status of valuable pages.

**Product**
- Analyses started and completed.
- Rewrite previews and apply actions.
- Copy/export actions.
- Error rates and time to useful result.
- False-positive and false-negative rates on the labeled set.

**Authority and distribution**
- Relevant new referring domains.
- Editorial links to the flagship tool and benchmark asset.
- Referral visits and engagement.
- Outreach response and inclusion rates.

Do not treat page count, raw backlinks, DR/DA, Lighthouse score, or published word count as growth outcomes.

## Decision rules

- If impressions rise but clicks remain low, investigate query intent, SERP presentation, and CTR before adding more pages.
- If rankings remain weak despite improved product and page quality, compare live SERPs, authority gaps, and linkable assets before broadening the catalogue.
- If a tool attracts impressions but has poor engagement, improve the product before publishing more supporting content.
- If a tool cannot demonstrate distinct demand or a real user advantage, do not build it.
- If a backlink looks suspicious, investigate the actual linking page and history; do not disavow from a third-party score alone.

## Reference principles

- Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google disavow guidance: https://support.google.com/webmasters/answer/2648487
- Google Manual Actions report: https://support.google.com/webmasters/answer/9044175
- Ahrefs Domain Rating definition: https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr
- Moz metrics glossary: https://moz.com/learn/seo/seo-metrics

