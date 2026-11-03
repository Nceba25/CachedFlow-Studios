# Cachedflow Technologies — Website (Portfolio of Evidence, Part 2)

Student: Nceba Majola (ST10537199)
Module: Website Development
Site pages: cachedflow.html (Home), features.html, pricing.html, about.html, contact.html

This README documents the research and decision-making that informed the design and content of the site, following on from the proposal submitted in Part 1.

---

## 1. Purpose of this document

The Part 1 proposal set out the goals, target audience, KPIs, and a low-fidelity wireframe for Cachedflow Technologies. This README records the research that shaped how those goals were translated into the five HTML pages, and lists the sources consulted.

---

## 2. Competitor and market research

To position Cachedflow's messaging correctly, I looked at how existing B2B lead-generation and sales-outreach tools present themselves, since these are the closest comparable products/services:

- Apollo.io and Hunter.io — reviewed for how they explain "email outreach" in plain, benefit-led language rather than technical jargon, which shaped the one-line feature descriptions used on the Home and Features pages (e.g. "Targeted outreach that reaches qualified prospects directly").
- Woodpecker.co and Reply.io — reviewed for typical B2B SaaS pricing tier structure (Free/Basic → Starter → Team/Business), which informed the three-tier layout on pricing.html.
- HubSpot's free-tools pages — used as a reference for how a CRM feature is described to a non-technical small-business owner in one sentence.

Findings were adapted, not copied — all copy on the site was written from scratch for Cachedflow's own value proposition (ethical, data-driven B2B outreach for South African SMEs), per the mission and vision statements in the proposal.

## 3. Target audience research

The proposal defines the audience as small and medium-sized businesses, tech companies, marketing agencies, recruitment firms, financial service providers, and growth-stage startups. This shaped content decisions:

- Copy avoids technical/sales jargon (e.g. "less time chasing leads, more time closing them") because the brief in the proposal notes the audience is "unfamiliar with the brand" and needs the value proposition explained without a sales call.
- The About page tells a short founding story rather than a formal corporate history, since a startup audience responds better to founder-led narratives than to institutional tone.
- Navigation was deliberately kept to five items (Home, Features, Pricing, About, Contact), consistent with Nielsen Norman Group guidance that primary navigation should stay small and predictable for first-time visitors.

## 4. Content and copywriting research

- Hero section wording ("Start your free trial") was chosen over a longer headline based on general conversion-copy guidance that a single clear action outperforms multiple competing messages above the fold.
- Testimonials on the Home page are explicitly framed in the proposal as illustrative (fictional, since Cachedflow has no live customers yet at PoE stage) — included to demonstrate the social-proof pattern common to SaaS landing pages, not as real customer claims.
- Feature descriptions were kept to one sentence per feature on the Home page and expanded to two–three sentences on the dedicated Features page, following the common SaaS pattern of "teaser on the homepage, detail on the feature page."

## 5. Design and visual research

- Colour palette (Deep Blue #2E5FA3, Soft Teal #4FC1B8, Off-white #FAFAFA, Charcoal #2B2B2B, Coral #FF6B5E) was selected in Part 1 based on general colour-psychology references associating blue with trust/professionalism, and a single accent colour (coral) reserved only for call-to-action buttons, so CTAs stand out against the rest of the page.
- Layout pattern (hero → feature icons → social proof → footer on the homepage) follows a widely used SaaS landing-page structure, cross-checked against the low-fidelity wireframe in the Part 1 proposal.
- Accessibility: alt text was added to every image (logo and feature icons) and form labels are explicitly associated with their inputs (label for=""), with reference to the W3C Web Content Accessibility Guidelines (WCAG 2.1), cited in the Part 1 proposal references.

## 6. Pricing research

Pricing tiers (R100 Basic / R1,499 Starter / R2,999 Team) were benchmarked against typical South African SaaS and outreach-tool pricing structures at the Basic/Starter/Team tier pattern, then simplified into a three-column comparison table on pricing.html, matching the structure proposed in Part 1.

## 7. Technical research

- Hosting/domain: Vercel (free tier) as primary hosting option, with Afrihost/Hostinger as a shared-hosting fallback, and domain registration via Domains.co.za or Namecheap — carried over directly from the Part 1 technical requirements research.
- Embedded map: the Google Maps iframe embed on contact.html uses Google's standard embed API (no API key required for basic embeds), referenced against Google's Maps Embed API documentation.

## 8. References

- Afrihost, 2026. Web Hosting Plans. [online] Available at: https://www.afrihost.com [Accessed 2026].
- Domains.co.za, 2026. Domain Registration Pricing. [online] Available at: https://www.domains.co.za [Accessed 2026].
- Vercel Inc., 2026. Pricing. [online] Available at: https://vercel.com/pricing [Accessed 2026].
- W3C, 2023. Web Content Accessibility Guidelines (WCAG) 2.1. [online] Available at: https://www.w3.org/TR/WCAG21/ [Accessed 2026].
- Nielsen Norman Group. Navigation menus and website usability heuristics. [online] Available at: https://www.nngroup.com [Accessed 2026].
- Apollo.io, Hunter.io, Woodpecker.co, Reply.io, HubSpot — reviewed as comparable B2B lead-generation/outreach products for feature-copy and pricing-tier conventions. [Accessed 2026].
- Google. Maps Embed API documentation. [online] Available at: https://developers.google.com/maps/documentation/embed [Accessed 2026].

---

## 9. Notes for markers

All testimonials, team bios, and the company itself are fictional/illustrative for the purposes of this assignment, as stated in the Part 1 proposal. Research above reflects the sources and conventions consulted while building the site; direct visual/content copying from any competitor was avoided — all HTML, copy, and structure were authored independently for this submission.

## Changelog: Part 3

### Version 3.0 (2026)

#### File structure and bug fixes
- Renamed `cachedflow.index.html` to `index.html` so the home page loads automatically when hosted.
- Matched the stylesheet name `styles.css` (capitalisation) across all pages, because case-sensitive hosts treat `Styles.css` and `styles.css` as different files.
- Updated the navigation links on every page to point to `index.html`.
- Checked and corrected image paths and file names.

#### JavaScript interactivity (`js/main.js`)
- Added an accordion on the Features page that expands and collapses each feature, with keyboard support and `aria-expanded` attributes.
- Added a monthly/annual billing toggle on the Pricing page that updates the displayed prices.
- Added a responsive hamburger menu that toggles the navigation on mobile screens.
- Added fade-in-on-scroll animations using `IntersectionObserver`, and hover transitions on buttons and cards in `styles.css`.
- Added an interactive Leaflet map of Bryanston, Sandton on the Contact page, with a marker and popup.

#### Image gallery and lightbox
- Built an image gallery on the Features page. The image data (source, alt text, caption) is stored in a JavaScript array and the thumbnails are generated through DOM manipulation.
- Clicking a thumbnail opens a lightbox with a larger image, caption, image counter, and previous/next arrows.
- The lightbox closes with the X button, the Esc key, or by clicking outside the image, and the arrow keys change images.
- Images use `loading="lazy"` for faster page loading.

#### Dynamic content
- Added a live search, category filter and sort function that updates the displayed content without reloading the page.

#### Forms and validation
- Created `enquiry.html` for service, plan and partnership enquiries, with a plan selector, enquiry type, preferred date, and a character counter on the message box. Once the form is validated, the user sees a response related to their selected plan.
- Updated `contact.html` with extra fields (phone number and message type). Once validated, the details are compiled into an email for the recipient and a confirmation is shown to the customer.
- Added HTML5 validation attributes (`required`, `type`, `pattern`, `minlength`, `maxlength`, `min`).
- Added JavaScript validation for email format, South African phone numbers, dates (no past dates) and message length, with inline error messages and error styling.
- Added AJAX submission with `fetch()`, including a loading state, a success message, and error handling, without reloading the page.
- Added `enquiry.html` to the navigation and footer on all pages.

#### Search engine optimisation
- Wrote a unique `<title>` and meta description for each page.
- Reviewed heading structure so that each page has one `<h1>` followed by logical `<h2>`/`<h3>` headings.
- Added descriptive file names and alt text for all images.
- Added Open Graph tags for social media sharing and canonical tags.
- Created `robots.txt` and `sitemap.xml` listing all pages.
- Added internal links between related pages.

#### Performance and security
- Deferred script loading (`defer`) and lazy-loaded images to improve page speed.
- Added `rel="noopener noreferrer"` to external links.
- Removed inline event handlers and avoided inserting raw user input with `innerHTML`.

#### Documentation and repository
- Added explanatory comments to the HTML, CSS and JavaScript files.
- Updated this README with the Part 3 changelog and references.
- Committed regularly to GitHub with descriptive commit messages.
- Deployed the website to (Netlify / GitHub Pages): (add your live link here).










