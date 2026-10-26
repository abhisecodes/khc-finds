# KHC Finds — Architecture & Developer Documentation

> **A curated, editorial affiliate product discovery platform and technology journal built with modern, framework-free Vanilla HTML5, CSS3, and JavaScript (ES6).**

---

## 📂 Project Directory Structure

```text
d:\KHC Website\
│
├── index.html              # Homepage (Magazine Hero Bento Grid + Product Catalog + Feed)
├── style.css               # Unified Design System (Cobalt & Volt Lime Palette, Typography, Layouts)
├── app.js                  # Core Client Engine (Product Catalog Database, Filters, Modal Drawer)
├── nav.js                  # Global Navigation Bar Controller & GA4 Analytics Tracker
├── 404.html                # Custom 404 Error Page
│
├── products/               # Individual Static Product Specifications Pages
│   ├── index.html          # Full Catalog View
│   ├── lg-43nu87-ai-4k-tv/ # Dedicated review & specs page
│   ├── philips-43pqt8100-qled-tv/
│   ├── samsung-43-miniled-4k-tv/
│   ├── samsung-24-curved-monitor/
│   ├── logitech-mk215-wireless-combo/
│   └── wesley-luxur-45l-travel-backpack/
│
├── blog/                   # Editorial Journal & Buying Guides
│   ├── index.html          # Blog Listing Index
│   ├── 43-inch-4k-tv-shootout-2026/
│   ├── ergonomic-desk-blueprint/
│   └── one-bag-travel-mastery/
│
├── news/                   # Technology Intelligence & Hardware Standards Dispatches
│   ├── index.html          # Tech News Index
│   ├── custom-silicon-ai-infrastructure/
│   ├── fido-alliance-passkey-cross-platform-sync/
│   └── vesa-displayport-2-1b-specification/
│
├── editor/                 # Internal Editorial Studio (Visual Article Publisher & CMS)
│   ├── index.html          # Editor UI
│   ├── editor.css          # Studio Styles
│   └── editor.js           # Drafts, JSON Export/Import, Unsplash Picker
│
├── assets/                 # Static Media & Images
│   ├── products/           # Curated Product Photography
│   └── storefront.png      # Social Share / Open Graph Banner
│
├── about/                  # About Page (Editorial Team & Mission)
├── contact/                # Contact Desk
├── disclosure/             # Statutory Amazon Affiliate Disclosure Policy
├── privacy/                # Privacy Policy & Cookies Information
│
├── sitemap.xml             # Search Engine Sitemap
├── robots.txt              # Search Engine Crawling Directives
├── server.ps1              # Lightweight Local PowerShell Development Server
└── vercel.json             # Vercel Deployment & Route Rewriting Rules
```

---

## 🚀 Quick Start (Running Locally)

This site is built with pure static web standards (**zero npm install / zero build steps required**).

### Option 1: Using the Included PowerShell Server (Windows)
Run the built-in server script from PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 3000
```
Open your browser at: `http://localhost:3000`

### Option 2: Using Any Standard HTTP Server
- **Python**: `python -m http.server 3000`
- **Node/npx**: `npx serve .`
- **VS Code**: Use the *Live Server* extension on `index.html`.

---

## 🛒 How Affiliate Links & Products Work

Every product on KHC Finds lives in the `products` array inside [`app.js`](file:///d:/KHC%20Website/app.js).

### Data Schema for a Product
```javascript
{
  id: "prod-sony-bravia-55",
  title: "Sony Bravia 55\" 4K Google TV",            // Concise title (fits 2 lines max)
  brand: "Sony",
  category: "cat-tv",                               // Matches categories[].id
  price: 57990,                                     // Current selling price (INR)
  oldPrice: 89900,                                  // MRP / Previous price (calculates % OFF)
  affiliateUrl: "https://link.amazon/YOUR_CODE",    // Amazon Affiliate Referral Link
  pageUrl: "/products/sony-bravia-55/",             // Dedicated static specs page route
  image: "/assets/products/sony-bravia-55.jpg",     // High-res product photo
  whyRecommend: "Crisp XR Triluminos Pro color accuracy with Acoustic Surface Audio.",
  overview: "Detailed 2-3 sentence technical overview...",
  pros: [
    "XR Cognitive Processor delivers natural color rendering",
    "Acoustic Surface Audio vibrates the screen for centered dialogue"
  ],
  cons: [
    "Premium pricing compared to entry-level LED options"
  ],
  specifications: {
    "Screen Size": "55 Inches (139 cm)",
    "Resolution": "4K Ultra HD (3840 x 2160)",
    "Display Tech": "Direct LED with XR Contrast Booster",
    "Refresh Rate": "120Hz Native",
    "Audio": "20W Acoustic Multi-Audio"
  }
}
```

### Where This Data Appears Automatically:
1. **Homepage Catalog Cards**: Displays image, brand, short title, price, discount badge, and the `Specs` & `Analysis` buttons.
2. **Category Filter Scroller**: Automatically filters when a user taps a category pill.
3. **Instant Search**: Matches titles, brands, and why-recommend blurbs in real-time.
4. **Interactive Modal Popup**: Tapping **Analysis** opens the rich specification drawer where the primary CTA button links directly to `affiliateUrl`.

---

## 🎨 Design System & Color Tokens

Defined in [`style.css`](file:///d:/KHC%20Website/style.css):

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--accent-color` | `#2B59FF` | **Cobalt Blue**: Primary brand color, links, badges, action focus |
| `--accent-lime` | `#D2FD38` | **Volt Lime**: High-energy discount badges, sale pills, accents |
| `--text-primary` | `#0C1024` | **Deep Obsidian Navy**: Ultra-high contrast text & dark elements |
| `--text-secondary` | `#5F6B84` | **Slate Secondary**: Subtitles, metadata, specifications labels |
| `--bg-color` | `#F5F7FD` | **Canvas Tint**: Off-white background with subtle grid overlay |
| `--font-heading` / `--font-body` | `'Plus Jakarta Sans'` | Modern geometric typography |

---

## 📰 Editorial Content (Blog & News)

- **Buying Guides**: Add to the `articles` array in [`app.js`](file:///d:/KHC%20Website/app.js) and create the static page under `blog/<slug>/index.html`.
- **Editorial Studio**: Visit `/editor/` locally to visually write, preview, and export articles with custom rich blocks (Pros/Cons grids, specs tables, product callout cards, and verdict boxes).

---

## 🚢 Production Deployment

The project is pre-configured for **Vercel** with clean route rewriting in [`vercel.json`](file:///d:/KHC%20Website/vercel.json):
```json
{
  "cleanUrls": true,
  "trailingSlash": true
}
```
Deploying live simply requires committing your changes and pushing to the `main` branch on GitHub:
```bash
git add .
git commit -m "Your update message"
git push origin main
```
Vercel automatically builds and publishes the production site in ~15-30 seconds.
