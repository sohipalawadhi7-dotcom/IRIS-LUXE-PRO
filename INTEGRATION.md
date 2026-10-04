# Dokhoon Iris — Twilight integration

## What's where

| File | Role |
|---|---|
| `public/dokhoon-iris.css` | All styling. Served by Salla via `{{ 'dokhoon-iris.css' \| asset }}` (no build step needed). |
| `src/views/layouts/master.twig` | Base layout: Tajawal, stylesheet, brand tokens, Salla hooks, header/footer, global web components. |
| `src/views/components/header.twig` | Announcement bar + header (menu · centered logo · search/account/cart) + mobile burger. |
| `src/views/components/*.twig` | Home sections. Inline `<style>` blocks were removed; styling now comes only from the stylesheet. |
| `twilight.json` | Merchant-editable brand settings (below). |

## Brand tokens

`master.twig` writes these into `:root` after the stylesheet loads:

| Setting id | Token | Default |
|---|---|---|
| `di_cream` | `--di-cream` | `#F9F6F0` |
| `di_gold` | `--di-gold` | `#B08D57` |
| `di_black` | `--di-black` | `#1A1A1A` |
| `di_maroon` | `--color-primary` → `--di-maroon` | `#8C2D19` |
| `di_announcement` | announcement bar text | — |

The stylesheet reads Salla's `--color-primary` for maroon, so buttons, cart badge,
links and the quick-add button all follow `di_maroon` (Store Design → Theme settings).

## Class mapping

| Component | Wrapper classes | Styled by (CSS section) |
|---|---|---|
| Announcement bar | `.top-navbar > .container` | 03 |
| Header | `.store-header`, `.navbar-brand`, `.header-btn`, `.main-nav`, `salla-menu` | 04, 05, 20 |
| Hero | `.s-block--hero`, `.hb-hero*`, CTA = `.btn.btn--primary` | 06, 07, 21 |
| Categories | `.s-block--categories`, `.s-block__title`, `.category-card/-title/-subtitle` | 09, 10, 23 |
| Featured products | `.s-block--products`, `.s-product-card-*`, `.s-product-card-content-footer` | 11, 12, 24 |
| Store features | `.s-block--features`, `.feature-item`, `.feature-title` | 08, 25 |
| Testimonials | `.s-block--testimonials`, `.tst-*` | 14, 26 |
| Footer | `.store-footer`, `.social-link`, `.footer-bottom`, `.copyright` | 17, 27 |

## Data modes

Components render live data when the variable is passed, otherwise a static
fallback (so the preview is never empty):

| Component | Variable | Notes |
|---|---|---|
| Featured products | `products` | uses `is_on_sale` / `sale_price` / `regular_price`, falls back to `sale_price` / `price` |
| Categories | `categories` | optional `subtitle` per category (the small maroon line) |
| Hero | `slides` or `banners` | |
| Features | `features` | `{ title, description, icon }` |
| Testimonials | `testimonials` or `reviews` | |

`pages/index.twig` currently includes each component without passing data, so the
home page shows the fallback content until data is wired in.

## Preview

```bash
salla theme preview
```

## Verify before launch

Not checked against a live Salla build (no CLI/network in the authoring environment):

1. Header: the `<salla-menu>`, `<salla-search>`, `<salla-user-menu>` and
   `<salla-cart-summary>` slots — confirm the menu renders a `ul > li > a` list
   (the stylesheet targets that) and the search box fits the end edge.
2. Footer: `store.contacts`, `store.social`, `store.copyright` field names.
3. Toggle the preview language to check RTL ↔ LTR.
