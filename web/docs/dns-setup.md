# DNS setup for konative.com on Vercel

## Current status
- Domain is added to Vercel project `konative-website`.
- `konative.com` and `www.konative.com` are attached to the project.
- Nameservers are currently not Vercel nameservers (`ns0.thescax.net`, `ns1.thescax.net`).

## Option A (recommended): delegate DNS to Vercel
1. In your registrar DNS settings for `konative.com`, set nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. Wait for propagation (usually minutes, up to 24-48 hours).
3. Verify with:
   - `vercel domains inspect konative.com`
   - `vercel domains inspect www.konative.com`

## Option B: keep external DNS and add records manually
If you prefer not to move nameservers, create these records at your registrar:

- Root domain:
  - Host: `@`
  - Type: `A`
  - Value: `76.76.21.21`

- WWW:
  - Host: `www`
  - Type: `CNAME`
  - Value: `cname.vercel-dns.com`

Remove conflicting records, forwarding, parking, or masking.

## Verification checklist
1. `vercel domains inspect konative.com` shows valid config.
2. `vercel domains inspect www.konative.com` shows valid config.
3. `curl -sL https://konative.com/ | rg "<html|__NEXT_DATA__|next"` returns app HTML.
