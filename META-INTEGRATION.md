# IFCM event publishing integration

The Event Studio currently demonstrates the complete editorial flow in the browser:

1. Event and poster submission.
2. Rights confirmation.
3. IFCM editorial approval.
4. Website calendar publication.
5. Facebook and Instagram post preview.
6. Simulated channel status.

It intentionally does not request or store production credentials.

## Current Meta requirements checked on 21 June 2026

### Facebook Page

Meta's Pages API documentation requires Facebook Login, a Page access token and the relevant Page permissions. For Page posts, the documented permissions include:

- `pages_manage_posts`
- `pages_read_engagement`
- `pages_manage_engagement`
- `pages_read_user_engagement`
- `publish_video` when publishing video

The app user must be able to perform the required Page tasks. Text/link posts use the `/{page_id}/feed` endpoint. Photo publishing uses `/{page_id}/photos`.

### Instagram

Instagram content publishing supports professional accounts. The media must be available on a publicly accessible server when Meta retrieves it.

Depending on the chosen login flow, the documented publishing permissions include:

- Instagram Login: `instagram_business_basic`, `instagram_business_content_publish`
- Facebook Login: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`

The connected Page may also require Page Publishing Authorization.

## Recommended production architecture

- IFCM administrator authentication with roles: submitter, editor and publisher.
- Database table for events, translations, approvals and channel status.
- Object storage for posters and other media.
- Server-side functions for Meta calls. Tokens must never be exposed in browser JavaScript.
- Webhooks or scheduled reconciliation to confirm publication status.
- Audit log containing approver, date, content version, channel response and retry history.
- Separate captions and image crops for Facebook and Instagram.
- Accessibility alt text and explicit image-rights confirmation.
- Automatic retries for temporary failures; manual review for permission or content errors.

## Environment values required in production

The exact names may differ by hosting provider:

```text
META_APP_ID=
META_APP_SECRET=
META_PAGE_ID=
META_PAGE_ACCESS_TOKEN=
INSTAGRAM_PROFESSIONAL_ACCOUNT_ID=
DATABASE_URL=
MEDIA_STORAGE_URL=
```

Do not place real values in files uploaded with the public website.

## Official references

- Instagram publishing: https://developers.facebook.com/docs/instagram-platform/content-publishing/
- Facebook Page posts: https://developers.facebook.com/docs/pages-api/posts/
