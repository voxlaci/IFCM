# IFCM Digital Future — Design Rules

This document protects the visual identity and product principles of the prototype. Changes should extend this system rather than replace it.

## 1. Core principles

- Global, human and contemporary — never corporate or geographically exclusive.
- A digital home and useful community tool, not a static institutional brochure.
- Calm editorial layouts with moments of discovery and movement.
- Clear evidence, dates and sources. Never invent statistics, affiliations or historical facts.
- English is always the default language.
- The concept must remain clearly identified as an independent presidential-candidate proposal and not the official IFCM website.
- No personal candidate name or portrait may be introduced without an explicit new instruction.
- Do not describe IFCM as a European organisation or make European organisations visually dominant.

## 2. Colour system

These CSS variables in `styles.css` are canonical:

| Token | Hex | Use |
| --- | --- | --- |
| `--deep` | `#082522` | Hero, dark sections, navigation and primary contrast |
| `--ink` | `#142e2b` | Main text and dark interface elements |
| `--mint` | `#c9f3d8` | Community and light-background sections |
| `--lime` | `#dff45f` | Primary highlight, active elements and important calls to action |
| `--coral` | `#ff745c` | Editorial emphasis, secondary highlight and open-data signals |
| `--paper` | `#f6f3eb` | Main warm page background |
| `--white` | `#fffefa` | Cards and warm white surfaces |
| `--line` | `rgba(20, 46, 43, .18)` | Dividers and quiet borders |

Rules:

- Do not replace the palette or introduce a competing primary colour.
- Use lime sparingly for actions and essential emphasis.
- Use coral for warmth, editorial emphasis and incomplete/open-data states.
- Avoid pure black and cold grey page backgrounds.
- Maintain WCAG-readable contrast for text and interactive controls.

## 3. Typography

- Body and interface: **DM Sans**.
- Display headings: **Manrope**.
- Editorial italic emphasis inside major headings: **Georgia**, italic.
- Headings use tight letter spacing and confident scale.
- Eyebrows and section labels are uppercase, small and widely tracked.
- Avoid adding decorative fonts or using more than these three families.
- Never turn long paragraphs into all-caps text.

## 4. Layout and visual rhythm

- Use generous vertical spacing between major sections.
- Preserve alternating dark, mint, paper and white editorial zones.
- Prefer asymmetric editorial grids over generic equal card grids.
- Horizontal rails and slides are appropriate for people, events and directories.
- Cards should remain clean, mostly rectangular and lightly bordered.
- Pill shapes are reserved for language selectors, filters, tags and compact actions.
- Do not add heavy shadows, glassmorphism, gradients or ornamental effects that compete with the content.
- The sticky main navigation must remain available while scrolling.

## 5. Globe and map

- There must be one principal globe, placed near the beginning of the home page.
- Pins must be geographically attached to the globe surface, not orbit outside it like satellites.
- The globe should rotate automatically but must also support pointer/touch drag.
- Manual rotation must pause automatic movement and preserve the selected orientation.
- Pins should move with the globe and become hidden when located on its rear hemisphere.
- Every pin must have a meaningful label, category and destination or internal profile.
- Choirs not affiliated with IFCM must be identified as independent examples.
- Do not duplicate the globe elsewhere on the page.

## 6. Images

- Prefer authentic photographs of choirs, places, projects and public organisational activity.
- Do not use personal social-media photographs without permission.
- Keep source and permission information for every third-party image.
- President portraits must remain modest in size so low-resolution archive images do not appear pixelated.
- Do not upscale source images beyond a visually credible size.
- The generated Earth artwork may be used as the base globe image.

## 7. Interaction

- Every control must communicate what will happen.
- Use the current share icon and offer native sharing, major networks and copy link.
- All sections and internal pages should support sharing.
- Links to official sources should open in a new tab and be visibly labelled.
- Internal prototype content should remain inside the site whenever it already exists there.
- Forms must clearly indicate when they are demonstrations and must not imply that data was submitted when no backend exists.
- Animation must respect `prefers-reduced-motion`.

## 8. Language and accessibility

Supported languages:

1. English
2. Spanish
3. French
4. Mandarin Chinese
5. Portuguese
6. German
7. Italian
8. Hindi
9. Standard Arabic
10. Bengali
11. Russian
12. Urdu

Rules:

- Selecting a language must translate the complete visible page, including new sections.
- Language abbreviations themselves must never be translated.
- Arabic and Urdu layouts must use right-to-left direction.
- IFCM AI text, speech and listening should follow the selected language.
- Preserve semantic headings, form labels, keyboard access and visible focus states.
- All meaningful images require useful alternative text.

## 9. Content rules

- Use “Creators Transforming the World” as the central proposition.
- “Every member is an ambassador” is a core membership message.
- Prefer “committed” or “commitment” over “excellence”.
- Partnership content should explain tangible international reach and mutual benefit.
- Statistics must include source, publication year and geographic limitation.
- If reliable data does not exist, show the gap honestly rather than inventing a number.
- Do not reference European Choral Association or Europa Cantat as part of IFCM identity.
- External organisations may appear only when clearly identified as sources or independent examples.

## 10. Protected elements

Do not remove or materially change without explicit approval:

- Independent-concept disclaimer and IFCM Official link.
- Main headline and global positioning.
- One-world/global-community premise.
- IFCM history, presidents and ambassadors.
- Membership, partnership and three-year membership gift concepts.
- Multilingual selector and IFCM AI.
- Share controls.
- Official IFCM registration, login and source links.
- Existing colour and typography tokens.

## 11. Technical rules

- The repository root is the deployable static site.
- Keep `index.html` in the repository root.
- Use relative paths for local assets.
- Do not commit generated ZIP files, operating-system files, credentials or API secrets.
- Meta, payment, membership and AI credentials must only exist in secure server-side environments.
- Update cache-busting versions when changing production CSS or JavaScript.
- Test desktop and mobile layouts before each release.

