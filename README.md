# IFCM Digital Future

Independent presidential-candidate proposal exploring what a useful, living and globally connected IFCM digital home could become. This is a prototype and not the official IFCM website.

## Current prototype

- Interactive rotating world with IFCM people, symposia, organisations and choirs.
- Historical IFCM presidents and the complete public IFCM Ambassador collection.
- Global calendar, searchable directory, membership and three-year membership gift.
- Member Home, opportunities, media, social channels and multilingual IFCM AI concierge.
- Partnership mission supported by published choral-participation research.
- Event Studio demonstrating submission, editorial approval and social publishing previews.
- Sharing controls, newsletter concept, advertising space and IFCM contacts.

## Languages

The interface supports English, Spanish, French, Mandarin Chinese, Portuguese, German, Italian, Hindi, Standard Arabic, Bengali, Russian and Urdu. English is the default language.

## Run locally

This is a static site. Serve the repository root with any static web server:

```bash
python3 -m http.server 8098
```

Then open `http://127.0.0.1:8098/`.

## Deploy

The prototype is published with Cloudflare Pages from the GitHub repository `voxlaci/IFCM`.

- Public preview: <https://imagineifcm.pages.dev/>
- Legacy redirect: <https://ifcm.pages.dev/> redirects to the public preview to avoid confusion.
- Production branch: `main`
- Build command: none
- Build output directory: `/`

Every pushed commit to `main` can trigger a new Cloudflare Pages deployment.

## Project documentation

- [`DESIGN_RULES.md`](DESIGN_RULES.md) defines the protected visual system, content principles and technical constraints.
- [`TASKS.md`](TASKS.md) records the prioritised roadmap and should be updated with each relevant commit.
- [`META-INTEGRATION.md`](META-INTEGRATION.md) describes the production requirements for approved Facebook and Instagram publishing.

## Event Studio

`admin.html` demonstrates event submission, poster preview, editorial approval, website publication, social captions and Facebook/Instagram previews. Approved demonstration events use browser storage.

Production social publishing requires the secure server-side Meta integration described in `META-INTEGRATION.md`.

## Publication notes

- Confirm permission for every third-party image, portrait and logo before a public campaign.
- Connect forms to consent-compliant services and add privacy/cookie documentation.
- Connect payments, member records and protected content only through authorised IFCM systems.
- Replace prototype AI research with an approved, monitored knowledge service.

The photorealistic Earth artwork was generated for this concept. Public factual links remain attributed to their original sources.
