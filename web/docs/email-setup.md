# Transactional email setup for form submissions

## Recommended provider
Use **Resend** for lowest setup friction with Next.js and Vercel.

## Why Resend
- Fast domain onboarding and API key flow
- Good developer experience
- Simple API for transactional notifications from form submissions

## Setup steps
1. Create or log into a Resend account: [https://resend.com](https://resend.com).
2. Add sending domain (`konative.com` or subdomain like `mail.konative.com`).
3. Add DNS records Resend provides (SPF, DKIM, optional DMARC).
4. Verify the domain in Resend.
5. Create an API key scoped to production mail sending.
6. Set environment variables in Vercel and `.env.local`:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (example: `hello@konative.com`)

## Alternate providers
- Postmark: strong deliverability and templates
- SendGrid: flexible but heavier setup

## Minimum go-live checklist
- Domain verified in provider
- API key stored in Vercel env vars
- `RESEND_FROM_EMAIL` uses verified domain
- Test email sent successfully from preview and production
