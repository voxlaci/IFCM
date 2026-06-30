# IFCM Digital Future — Tasks

Last reviewed: 23 June 2026

## Priority 0 — Repository and publication

- [x] Establish `voxlaci/IFCM` as the principal repository.
- [x] Create the initial local Git history.
- [x] Authenticate GitHub CLI and push the initial commits to `main`.
- [x] Connect the GitHub repository to Cloudflare Pages.
- [x] Confirm the public `pages.dev` address: https://imagineifcm.pages.dev/.
- [x] Redirect the legacy `https://ifcm.pages.dev/` project to `https://imagineifcm.pages.dev/`.
- [ ] Add a custom domain or subdomain when selected.
- [ ] Verify HTTPS, redirects, caching and mobile rendering after deployment.

## Priority 1 — Globe

- [ ] Place every visible point on correct geographic coordinates.
- [ ] Replace orbit-like pin movement with true globe-surface projection.
- [ ] Hide pins located on the rear hemisphere.
- [ ] Add mouse and touch drag to rotate the globe manually.
- [ ] Pause automatic rotation during manual interaction.
- [ ] Resume rotation only when the visitor requests it.
- [ ] Check each president, ambassador, symposium, organisation and choir location.
- [ ] Test globe interaction on desktop, tablet and phone.

## Priority 1 — Content accuracy

- [ ] Review the International Choral Magazine archive for additional verified IFCM history.
- [ ] Reconfirm the complete chronology of IFCM presidents and acting presidents.
- [ ] Record a source URL and publication date for every historical statement.
- [ ] Review all IFCM Ambassador names, countries and symposium years.
- [ ] Distinguish IFCM members, IFCM projects and independent global choir examples.
- [ ] Add a visible “last verified” date to dynamic public information.

## Priority 1 — Visual quality

- [x] Reduce president portrait dimensions to avoid visible pixelation.
- [ ] Locate higher-resolution authorised president portraits where available.
- [ ] Check cropping and focal position for every portrait.
- [ ] Optimise large Earth and hero images for web delivery.
- [ ] Add responsive `srcset` or modern WebP/AVIF variants.
- [ ] Confirm image permissions and attribution before public campaigning.

## Priority 2 — Translation

- [ ] Test the complete page in all 12 languages.
- [ ] Confirm newly added partnership and research content is translated.
- [ ] Review human-quality translations for main campaign messages.
- [ ] Test Arabic and Urdu right-to-left layouts.
- [ ] Confirm language persistence between visits.
- [ ] Prevent organisation names, IFCM, WSCM and language codes from unwanted translation.

## Priority 2 — IFCM AI

- [ ] Replace prototype-only answers with a secure research and knowledge service.
- [ ] Create a curated IFCM source index.
- [ ] Return official source links with every factual answer.
- [ ] Add clear uncertainty and prototype notices.
- [ ] Expand symposium, membership, event, contact and project answers.
- [ ] Test speech recognition and text-to-speech in all supported languages.
- [ ] Add abuse protection, privacy rules and request limits.

## Priority 2 — Membership and community

- [ ] Confirm official IFCM membership categories, fees and country groups.
- [ ] Design the complete rapid membership flow.
- [ ] Connect secure online payments through an approved provider.
- [ ] Define consent and fulfilment for the three-year membership gift.
- [ ] Specify Member Home authentication and protected data access.
- [ ] Plan the opt-in member directory and privacy controls.
- [ ] Define mentorship, opportunities, repertoire and community-posting moderation.

## Priority 2 — Events and social publishing

- [ ] Replace browser storage with a secure event database.
- [ ] Add user accounts, submission states and editorial roles.
- [ ] Add poster validation, accessibility fields and image optimisation.
- [ ] Implement Meta Graph API publishing after IFCM approval.
- [ ] Add Facebook and Instagram token management on the server.
- [ ] Add retry logs, scheduled publishing and audit history.
- [ ] Add YouTube and newsletter distribution workflows where authorised.
- [ ] Ensure every event has share controls and a stable public URL.

## Priority 3 — Forms, legal and operations

- [ ] Connect partnership, advertising, newsletter and feedback forms.
- [ ] Add privacy policy, cookie policy, terms and campaign identification.
- [ ] Add consent records and unsubscribe handling.
- [ ] Define data retention and deletion procedures.
- [ ] Add spam protection without harming accessibility.
- [ ] Add analytics with privacy-respecting consent.
- [ ] Create an editorial maintenance guide for IFCM staff.

## Priority 3 — Quality assurance

- [ ] Validate HTML and inspect browser-console errors.
- [ ] Test keyboard-only navigation and visible focus.
- [ ] Test screen-reader landmarks, labels and alternative text.
- [ ] Run contrast and accessibility checks.
- [ ] Test Chrome, Safari, Firefox and Edge.
- [ ] Test common mobile sizes and slow connections.
- [ ] Check every official and external link.
- [ ] Establish a release checklist and version log.

## Working practice

- Make one focused commit for each coherent change.
- Use short, descriptive commit messages.
- Update this task list whenever a task is completed or reprioritised.
- Never commit passwords, access tokens, member databases or private personal data.
- Keep `main` deployable; use feature branches for risky or incomplete work.
