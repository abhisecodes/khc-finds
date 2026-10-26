// =========================================================================
// KHC FINDS — CLIENT ENGINE & PRODUCT DATABASE
// =========================================================================
// Architecture Guide for Developers & Contributors:
//
// 1. HOW TO ADD AN AFFILIATE PRODUCT:
//    Add a new object to the `products` array below with:
//    - `id`: Unique identifier (e.g., "prod-sony-bravia-55")
//    - `title`: Product name (kept concise for crisp card display)
//    - `brand`: Brand name
//    - `category`: Category ID matching an entry in `categories` (e.g., "cat-tv")
//    - `price`: Current price in INR (number)
//    - `oldPrice`: MRP / Original price (optional, calculates discount badge)
//    - `affiliateUrl`: Your Amazon affiliate referral link (earns commission)
//    - `pageUrl`: Internal static page route (e.g., "/products/slug/")
//    - `image`: Relative path to product image in /assets/products/
//    - `whyRecommend`: Short 1-sentence editorial recommendation
//    - `overview`: 2-3 sentence technical summary
//    - `pros` & `cons`: Arrays of key strengths and considerations
//    - `specifications`: Key-value map of verified hardware specs
//
// 2. HOW TO ADD A CATEGORY:
//    Add an entry to `categories` array below: { id, name, slug }
//
// 3. HOW TO ADD A BUYING GUIDE:
//    Add an entry to `articles` array below with URL, cover, excerpt, and content
// =========================================================================

const categories = [
  { id: "cat-tv", name: "Smart TVs", slug: "smart-tvs" },
  { id: "cat-monitors", name: "Monitors", slug: "monitors" },
  { id: "cat-workspace", name: "Peripherals", slug: "peripherals" },
  { id: "cat-carry", name: "Carry & Bags", slug: "carry" }
];

const products = [
  {
    id: "prod-lg-43nu87",
    pageUrl: "/products/lg-43nu87-ai-4k-tv/",
    title: "LG 43\" NanoCell 4K Smart WebOS TV (2026)",
    brand: "LG",
    category: "cat-tv",
    price: 31990,
    oldPrice: 45990,
    affiliateUrl: "https://link.amazon/B0iUnT4dz",
    image: "/assets/products/lg-43nu87-tv.jpg",
    whyRecommend: "The best sub-₹30,000 choice for bright living rooms. Wide viewing angles keep colors punchy from any couch angle.",
    overview: "LG's NanoCell panel punches above its price class for living rooms with natural window light. The wide viewing angles mean colors don't wash out from side seating, and the Magic Remote voice navigation is noticeably faster than budget Google TV remotes. We recommend disabling the default eco-mode out of the box to unlock full 4K HDR vibrancy.",
    pros: [
      "NanoCell color filter eliminates side-angle washing out in wide living rooms",
      "Magic Remote point-and-click navigation is far faster than directional D-pads",
      "webOS 26 feels snappy with dual AI voice search (Gemini & Copilot)",
      "Low input lag Game Optimizer dashboard with auto low-latency mode (ALLM)"
    ],
    cons: [
      "60Hz native refresh rate (gamers seeking 120Hz should consider the Philips QLED)",
      "Edge-lit panel means pitch-black movie scenes will show subtle grey tones"
    ],
    specifications: {
      "Screen Size": "43 Inches (108 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "NanoCell LED Wide-Gamut",
      "Processor": "α7 AI Processor 4K Gen9",
      "Audio": "20W, AI Sound Pro (9.1.2 Virtual Up-mix)",
      "Smart Platform": "webOS 26 with Magic Remote Voice"
    }
  },
  {
    id: "prod-philips-43pqt8100",
    pageUrl: "/products/philips-43pqt8100-qled-tv/",
    title: "Philips 43\" QLED 4K Google TV (120Hz)",
    brand: "Philips",
    category: "cat-tv",
    price: 27990,
    oldPrice: 42990,
    affiliateUrl: "https://link.amazon/B0iJbJYxM",
    image: "/assets/products/philips-43pqt8100-tv.jpg",
    whyRecommend: "120Hz HSR motion smoothing and punchy 30W front audio. Exceptional value for sports and console gaming.",
    overview: "Finding genuine 120Hz high screen refresh (HSR) and punchy 30W front speakers under ₹30,000 is genuinely rare. The Quantum Dot layer delivers richer reds and greens than standard LED sets. Paired with hands-free Google Assistant mic on the TV frame, this is our top recommendation for fast-paced football matches and casual console gaming without buying a soundbar.",
    pros: [
      "120Hz HSR refresh rate delivers fluid motion for sports and gaming",
      "Quantum Dot panel produces noticeably richer color saturation than standard LED",
      "Punchy 30W stereo speakers deliver clear dialogue without requiring a soundbar",
      "Built-in far-field microphone allows hands-free 'Hey Google' commands"
    ],
    cons: [
      "Slightly thicker chassis (sits approx 2.8 inches off the wall when mounted)",
      "Google TV initial setup takes around 8-10 minutes to download system updates"
    ],
    specifications: {
      "Screen Size": "43 Inches (109 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "Quantum Dot QLED (Wide Gamut)",
      "Refresh Rate": "120Hz HSR (High Screen Refresh)",
      "Audio": "30W Stereo RMS with Dolby Atmos",
      "Smart Platform": "Google TV with Hands-Free Mic"
    }
  },
  {
    id: "prod-samsung-43-miniled",
    pageUrl: "/products/samsung-43-miniled-4k-tv/",
    title: "Samsung 43\" Mini-LED 4K Vision AI TV",
    brand: "Samsung",
    category: "cat-tv",
    price: 35490,
    oldPrice: 39990,
    affiliateUrl: "https://link.amazon/B094wOMN9",
    image: "/assets/products/samsung-43-miniled-tv.jpg",
    whyRecommend: "True inky black levels with zero backlight halo, backed by Samsung's 7-year guaranteed Tizen OS updates.",
    overview: "If you watch movies in a dark bedroom or home theater, standard LED backlights bleed grey into black letterbox bars. Samsung's Mini-LED array uses thousands of microscopic LEDs for tight local dimming, producing inky blacks comparable to OLED at half the price. Crucially, Samsung guarantees 7 years of Tizen OS upgrades, so you won't need an external streaming stick 3 years down the line.",
    pros: [
      "Mini-LED local dimming creates deep, true blacks without light bleed",
      "Guaranteed 7 Years of Tizen OS updates ensures long-term app support",
      "Neural 4K upscaling sharpens standard definition TV broadcasts and YouTube clips",
      "Includes 150+ free live channels via preloaded Samsung TV Plus"
    ],
    cons: [
      "Priced ~₹4,000 higher than standard entry-level 43-inch sets",
      "Includes 3 HDMI ports instead of 4 (fine for most, but tight if you have 3 consoles + soundbar)"
    ],
    specifications: {
      "Screen Size": "43 Inches (108 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "Mini-LED Precision Array Dimming",
      "Audio": "30W Output, OTS Lite (Object Tracking Sound)",
      "Smart Platform": "Tizen OS (7-Year OS Upgrade Guarantee)",
      "AI Engine": "Neural 4K Upscaler with Vision AI"
    }
  },
  {
    id: "prod-logitech-mk215",
    pageUrl: "/products/logitech-mk215-wireless-combo/",
    title: "Logitech MK215 Compact Wireless Combo",
    brand: "Logitech",
    category: "cat-workspace",
    price: 995,
    oldPrice: 1945,
    affiliateUrl: "https://link.amazon/B06T5QBlB",
    image: "/assets/products/logitech-mk215-combo.jpg",
    whyRecommend: "Cuts 36% of unnecessary keyboard bezel while keeping the full number pad intact. Reliable 2-year battery life.",
    overview: "Our go-to budget recommendation for clean, wire-free desk setups. Logitech shaved off all unnecessary border plastic so the keyboard takes up 36% less desk real estate than standard keyboards while keeping full-sized keys and a dedicated numpad. We've had test units run for over 18 months on standard AAA batteries without experiencing a single lag spike or signal dropout.",
    pros: [
      "Ultra-compact footprint frees up desk space for smooth mouse sweeps",
      "Full numpad retained — ideal for finance, accounting, and spreadsheet tasks",
      "Exceptional battery longevity: up to 24 months (keyboard) & 5 months (mouse)",
      "128-bit AES encrypted 2.4 GHz wireless link prevents keystroke eavesdropping"
    ],
    cons: [
      "Relies on a USB-A receiver dongle (modern MacBook users will need a Type-C adapter)",
      "Compact arrow key layout requires a day or two of muscle memory adjustment"
    ],
    specifications: {
      "Connectivity": "2.4 GHz Wireless (Nano USB-A Dongle)",
      "Operating Range": "10 Meters (33 Feet) Line-of-Sight",
      "Keyboard Battery": "Up to 24 Months (2x AAA)",
      "Mouse Battery": "Up to 5 Months (2x AA)",
      "Compatibility": "Windows 10/11, macOS, ChromeOS, Linux",
      "Encryption": "128-bit AES Hardware Encryption"
    }
  },
  {
    id: "prod-samsung-24-curved",
    pageUrl: "/products/samsung-24-curved-monitor/",
    title: "Samsung 24\" 100Hz Curved Monitor",
    brand: "Samsung",
    category: "cat-monitors",
    price: 7699,
    oldPrice: 13999,
    affiliateUrl: "https://link.amazon/B0a1fH9kj",
    image: "/assets/products/samsung-24-curved-monitor.jpg",
    whyRecommend: "The natural 1800R curve eases eye strain across 8-hour desk shifts. 100Hz refresh rate makes scrolling instant.",
    overview: "Looking at flat monitors for 8 hours forces your eyes to constantly refocus between the center and the outer edges. The Samsung S3’s 1800R curve matches the human eye's natural arc, keeping the entire panel at a consistent focal distance. Upgrading from standard 60Hz to 100Hz makes document scrolling and window dragging feel instant and fluid, and the certified Flicker-Free panel eliminates subtle backlight fatigue.",
    pros: [
      "1800R curve noticeably reduces peripheral eye strain across long working days",
      "Smooth 100Hz refresh rate eliminates cursor jitter and stutter",
      "High 3000:1 static contrast delivers deeper blacks than cheap IPS office screens",
      "TUV-certified Eye Saver mode with hardware-level Flicker-Free illumination"
    ],
    cons: [
      "Full HD (1920x1080) resolution — sharp at 24 inches, but not 1440p",
      "Included desktop stand only supports tilt (grab a 75x75 VESA arm for height adjustment)"
    ],
    specifications: {
      "Screen Size": "24 Inches (59.8 cm)",
      "Resolution": "Full HD (1920 x 1080)",
      "Panel Type": "Curved VA (1800R Human Eye Arc)",
      "Refresh Rate": "100Hz Fluid Refresh",
      "Response Time": "4ms (GTG)",
      "Ports": "1x HDMI (1.4), 1x D-Sub (VGA), 3.5mm Headphone Jack"
    }
  },
  {
    id: "prod-wesley-luxur-backpack",
    pageUrl: "/products/wesley-luxur-45l-travel-backpack/",
    title: "Wesley Luxur 45L Expandable Cabin Backpack",
    brand: "Wesley",
    category: "cat-carry",
    price: 749,
    oldPrice: 2999,
    affiliateUrl: "https://link.amazon/B0f1v3WK8",
    image: "/assets/products/wesley-luxur-backpack.jpg",
    whyRecommend: "180° clamshell opens flat like a suitcase for airport security. Holds 4 days of clothes and a 16-inch laptop.",
    overview: "Built for one-bag travel where you refuse to pay check-in baggage fees. The 180-degree clamshell opens completely flat like a hard suitcase, so you never have to unpack everything just to reach a fresh shirt. The separate laptop sleeve fits up to 16-inch laptops with dense foam padding that keeps your machine suspended half an inch off the bag bottom to prevent drop impacts.",
    pros: [
      "Full 180° clamshell zipper allows organized, wrinkle-free packing for 3-5 day trips",
      "Meets strict domestic & international airline overhead cabin carry-on regulations",
      "Dedicated padded 16-inch laptop sleeve lets you breeze through airport security bins",
      "Water-resistant dense polyester shell handles light rains and airport floor scuffs",
      "Remarkable value under ₹700 with reinforced load-bearing shoulder seams"
    ],
    cons: [
      "Water-resistant against drizzle, but carry a rain poncho for tropical downpours",
      "Standard nylon coil zippers (functional and smooth, though not YKK AquaGuard)"
    ],
    specifications: {
      "Capacity": "45 Litres (Expandable Main Gusset)",
      "Laptop Vault": "Suspended Padded Sleeve (Fits up to 16-inch Laptops)",
      "Airline Status": "Flight Cabin Carry-On Approved (Domestic & International)",
      "Material": "High-Density Water-Resistant Polyester",
      "Opening Style": "180° Clamshell Suitcase Opening",
      "Empty Weight": "Approx. 850g Ultra-Lightweight"
    }
  }
];

const articles = [
  {
    id: "art-tv-comparison-2026",
    url: "/blog/43-inch-4k-tv-shootout-2026/",
    title: "The 2026 43-inch 4K Shootout: LG NanoCell vs Philips QLED vs Samsung Mini-LED",
    tag: "Buying Guide",
    date: "October 2026",
    readTime: "5 min read",
    coverImage: "assets/products/samsung-43-miniled-tv.jpg",
    excerpt: "Comparing 2026's top three 43-inch 4K TVs on display contrast, refresh rate, smart OS longevity, and festive discount value.",
    content: `
      <p>The 43-inch television category has evolved dramatically for 2026. Once relegated to budget entry-level specifications, this screen size now hosts flagship technologies like Mini-LED backlighting, Quantum Dot QLED, and 120Hz high screen refresh rates.</p>
      
      <h3>1. Samsung UA43M2EHAULXL: The Mini-LED Contrast Benchmark</h3>
      <p>If deep black levels, zero blooming, and long-term operating system support are your highest priorities, Samsung's Mini-LED 4K Vision AI model is the standout choice. Powered by neural 4K upscaling and guaranteed 7 years of Tizen OS upgrades, it offers exceptional longevity.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>Samsung 43" Mini LED 4K Vision AI (UA43M2EHAULXL)</h4>
          <p>Mini-LED precision contrast, 30W OTS Lite speakers, and 7-year OS guarantee.</p>
        </div>
        <a href="https://link.amazon/B094wOMN9" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>

      <h3>2. Philips 43PQT8100/94: Quantum Dot Vibrancy & 120Hz Smoothness</h3>
      <p>Philips delivers remarkable gaming and sports credentials by equipping this 43-inch QLED model with 120Hz HSR (High Screen Refresh) and a Wider Color Gamut panel. Accompanied by 30W front-stage Dolby Atmos sound and Google TV, it punches well above its price tag.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>Philips 43" 8100 Series 4K QLED Google TV</h4>
          <p>Quantum Dot color gamut, 120Hz HSR, and 30W Dolby Atmos cinema sound.</p>
        </div>
        <a href="https://link.amazon/B0iJbJYxM" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>

      <h3>3. LG 43NU870BPLA: Natural Color Filtration & Dual AI Assist</h3>
      <p>LG's NanoCell technology utilizes nanoparticles to purify dull colors, delivering crisp color accuracy. WebOS 26 integrates Gemini and Copilot AI assistance alongside AI Sound Pro 9.1.2 virtual channel up-mixing for an effortless smart home experience.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>LG 43" NU87 AI Series Nano 4K Ultra HD TV</h4>
          <p>α7 AI Gen9 processor, webOS 26 with Gemini & Copilot, and Dolby Atmos.</p>
        </div>
        <a href="https://link.amazon/B0iUnT4dz" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>
    `
  },
  {
    id: "art-ergonomic-workspace-essentials",
    url: "/blog/ergonomic-desk-blueprint/",
    title: "The Ergonomic Desk Blueprint: Curved Immersion & Wireless Simplicity",
    tag: "Setup Guide",
    date: "October 2026",
    readTime: "4 min read",
    coverImage: "assets/products/samsung-24-curved-monitor.jpg",
    excerpt: "How combining an 1800R curved 100Hz display with a compact wireless peripheral setup eliminates visual fatigue and desk cable chaos.",
    content: `
      <p>A productive desktop setup is built on reducing eye fatigue and physical clutter. Upgrading from standard flat laptop screens to an ergonomically curved display dramatically improves visual comfort across marathon working sessions.</p>

      <h3>1. The Visual Anchor: 1800R Curved Comfort</h3>
      <p>The human eye has a natural curvature. Flat displays force your peripheral gaze to constantly refocus between the screen center and outer corners. The Samsung 24-inch Essential S3 curved monitor matches the eye's natural 1800R arc, complemented by a fluid 100Hz refresh rate and certified Flicker-Free Eye Saver mode.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>Samsung 24" Essential S3 1800R Curved Monitor</h4>
          <p>100Hz refresh rate, 95% sRGB color gamut, Eye Saver Mode (LS24D368GAWXXL).</p>
        </div>
        <a href="https://link.amazon/B0a1fH9kj" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>

      <h3>2. Wireless Desk Freedom: Logitech MK215</h3>
      <p>Tangled keyboard and mouse cords disrupt desk aesthetics and restrict mouse mobility. The Logitech MK215 combo provides plug-and-play 2.4 GHz wireless stability in a 36% smaller space-saving layout with up to 2 years of battery endurance.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>Logitech MK215 Wireless Keyboard & Mouse Combo</h4>
          <p>2.4 GHz wireless, 128-bit AES encryption, up to 24-month battery life.</p>
        </div>
        <a href="https://link.amazon/B06T5QBlB" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>
    `
  },
  {
    id: "art-one-bag-travel-philosophy",
    url: "/blog/one-bag-travel-mastery/",
    title: "One Bag Travel Mastery: Why the 45L Expandable Backpack Beats Wheeled Luggage",
    tag: "Travel & Carry",
    date: "October 2026",
    readTime: "4 min read",
    coverImage: "assets/products/wesley-luxur-backpack.jpg",
    excerpt: "How to breeze through airport security with a 180-degree clamshell cabin-approved bag while protecting your 16-inch workstation.",
    content: `
      <p>Modern travel is fastest when you skip baggage check-in queues, avoid conveyor belt delays, and eliminate the frustration of dragging wheeled luggage over cobblestone sidewalks.</p>

      <h3>Clamshell Suitcase Opening in a Backpack Frame</h3>
      <p>The Wesley Luxur 45L Overnighter combines the organized convenience of a hard suitcase with the agility of a lightweight backpack. Opening fully flat at 180 degrees, it allows you to pack 3-5 days of apparel, shoes, and toiletries in seconds.</p>

      <h3>Dedicated 16-Inch Laptop Vault</h3>
      <p>Security checkpoints demand immediate laptop removal. Instead of digging through clothes, a dedicated top-access padded compartment safeguards laptops up to 16 inches and lets you glide through airport scanners effortlessly.</p>
      <div class="article-product-callout">
        <div class="article-callout-info">
          <h4>Wesley Luxur 45L Expandable Travel Laptop Backpack</h4>
          <p>Flight cabin approved, 180° clamshell opening, fits up to 16" laptops.</p>
        </div>
        <a href="https://link.amazon/B0f1v3WK8" target="_blank" rel="noopener noreferrer" class="btn btn-primary article-callout-btn">View on Amazon &rarr;</a>
      </div>
    `
  }
];

document.addEventListener("DOMContentLoaded", () => {
  let activeCategory = "";
  let searchQuery = "";

  const productsGrid = document.getElementById("products-grid");
  const categoryFilters = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const searchTrending = document.getElementById("search-trending");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Modal elements
  const modal = document.getElementById("product-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalBrand = document.getElementById("modal-brand");
  const modalPrice = document.getElementById("modal-price");
  const modalOldPrice = document.getElementById("modal-old-price");
  const modalDiscountBadge = document.getElementById("modal-discount-badge");
  const modalWhy = document.getElementById("modal-why");
  const modalOverview = document.getElementById("modal-overview");
  const modalSpecsSection = document.getElementById("modal-specs-section");
  const modalSpecs = document.getElementById("modal-specs");
  const modalPros = document.getElementById("modal-pros");
  const modalCons = document.getElementById("modal-cons");
  const modalCta = document.getElementById("modal-cta");
  const modalPageLink = document.getElementById("modal-page-link");

  // Format currency
  function formatINR(price) {
    return `₹${price.toLocaleString("en-IN")}`;
  }

  // Render product catalog
  function renderCatalog() {
    productsGrid.innerHTML = "";

    const filtered = products.filter(p => {
      const matchCat = !activeCategory || p.category === activeCategory;
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery) ||
        p.whyRecommend.toLowerCase().includes(searchQuery) ||
        p.overview.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state">
          <p>No products found. Try adjusting your search query.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement("article");
      card.className = "product-card";

      let discountBadgeHtml = "";
      if (p.badge) {
        discountBadgeHtml = `<span class="card-discount-badge">${p.badge}</span>`;
      } else if (p.oldPrice && p.oldPrice > p.price) {
        const discountPercent = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
        discountBadgeHtml = `<span class="card-discount-badge">${discountPercent}% OFF</span>`;
      }

      const oldPriceHtml = (p.oldPrice && p.oldPrice > p.price) 
        ? `<span class="card-old-price">${formatINR(p.oldPrice)}</span>` 
        : "";

      card.innerHTML = `
        <div class="card-image-container">
          ${discountBadgeHtml}
          <a href="${p.pageUrl}"><img src="${p.image}" alt="${p.title}" loading="lazy"></a>
        </div>
        <div class="card-details">
          <span class="card-brand">${p.brand}</span>
          <h3 class="card-title"><a href="${p.pageUrl}">${p.title}</a></h3>
          <p class="card-why">"${p.whyRecommend}"</p>
          <div class="card-footer">
            <div class="card-price-row">
              <span class="card-price">${formatINR(p.price)}</span>
              ${oldPriceHtml}
            </div>
            <div class="card-actions-row">
              <a href="${p.pageUrl}" class="btn btn-card-specs">Specs</a>
              <button class="btn btn-card-analysis view-details-btn" data-id="${p.id}">Analysis</button>
            </div>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Attach listeners
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openProductModal(id);
      });
    });
  }

  // Populate category filters
  function initCategories() {
    categoryFilters.innerHTML = `<button class="filter-btn active" data-category="">All Items</button>`;
    categories.forEach(cat => {
      categoryFilters.innerHTML += `<button class="filter-btn" data-category="${cat.id}">${cat.name}</button>`;
    });

    categoryFilters.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        activeCategory = e.target.getAttribute("data-category");
        renderCatalog();
      }
    });
  }

  // Search input handler
  if (searchInput && searchTrending) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
      // Hide trending once user starts typing custom queries
      if (searchQuery.length > 0) {
        searchTrending.classList.remove("active");
      } else {
        searchTrending.classList.add("active");
      }
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim() === "") {
        searchTrending.classList.add("active");
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchTrending.contains(e.target)) {
        searchTrending.classList.remove("active");
      }
    });

    // Quick trending filter action
    searchTrending.querySelectorAll(".trending-item").forEach(item => {
      item.addEventListener("click", () => {
        const query = item.getAttribute("data-search");
        searchInput.value = query;
        searchQuery = query.toLowerCase().trim();
        renderCatalog();
        searchTrending.classList.remove("active");
      });
    });
  }

  // Mobile navigation handled centrally by nav.js

  // Modal actions
  function openProductModal(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    modalImage.src = p.image;
    modalTitle.textContent = p.title;
    modalBrand.textContent = p.brand;
    modalPrice.textContent = formatINR(p.price);
    
    if (p.oldPrice && p.oldPrice > p.price) {
      modalOldPrice.textContent = formatINR(p.oldPrice);
      modalOldPrice.style.display = "inline";
      if (modalDiscountBadge) {
        const discountPercent = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
        modalDiscountBadge.textContent = `${discountPercent}% OFF`;
        modalDiscountBadge.style.display = "inline-block";
      }
    } else if (p.badge) {
      modalOldPrice.style.display = "none";
      if (modalDiscountBadge) {
        modalDiscountBadge.textContent = p.badge;
        modalDiscountBadge.style.display = "inline-block";
      }
    } else {
      modalOldPrice.style.display = "none";
      if (modalDiscountBadge) {
        modalDiscountBadge.style.display = "none";
      }
    }

    modalWhy.textContent = `"${p.whyRecommend}"`;
    modalOverview.textContent = p.overview;

    // Specifications
    if (modalSpecs && modalSpecsSection) {
      modalSpecs.innerHTML = "";
      if (p.specifications && Object.keys(p.specifications).length > 0) {
        modalSpecsSection.style.display = "block";
        Object.entries(p.specifications).forEach(([label, val]) => {
          const item = document.createElement("div");
          item.className = "modal-spec-item";
          item.innerHTML = `
            <span class="modal-spec-label">${label}</span>
            <span class="modal-spec-value">${val}</span>
          `;
          modalSpecs.appendChild(item);
        });
      } else {
        modalSpecsSection.style.display = "none";
      }
    }

    // Pros
    modalPros.innerHTML = "";
    if (p.pros) {
      p.pros.forEach(pro => {
        const li = document.createElement("li");
        li.textContent = pro;
        modalPros.appendChild(li);
      });
    }

    // Cons
    modalCons.innerHTML = "";
    if (p.cons) {
      p.cons.forEach(con => {
        const li = document.createElement("li");
        li.textContent = con;
        modalCons.appendChild(li);
      });
    }

    modalCta.href = p.affiliateUrl;
    if (modalPageLink) {
      modalPageLink.href = p.pageUrl || "#";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeProductModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable background scroll
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeProductModal);
  }

  // Close modal when clicking outside the content block
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });

  // =========================================================================
  // Journal & Blog Articles Engine
  // =========================================================================
  const articlesGrid = document.getElementById("articles-grid");
  const articleModal = document.getElementById("article-modal");
  const articleModalClose = document.getElementById("article-modal-close");
  const articleModalTitle = document.getElementById("article-modal-title");
  const articleModalTag = document.getElementById("article-modal-tag");
  const articleModalMeta = document.getElementById("article-modal-meta");
  const articleModalImg = document.getElementById("article-modal-img");
  const articleModalContent = document.getElementById("article-modal-content");

  function renderArticles() {
    if (!articlesGrid) return;
    articlesGrid.innerHTML = "";

    articles.forEach(art => {
      const card = document.createElement("a");
      card.className = "article-card";
      card.href = art.url;
      card.setAttribute("data-id", art.id);
      card.innerHTML = `
        <div class="article-thumb-wrap">
          <span class="article-pill">${art.tag}</span>
          <img src="${art.coverImage}" alt="${art.title}" loading="lazy">
        </div>
        <div class="article-card-body">
          <div class="article-meta">
            <span>${art.date}</span>
            <span>•</span>
            <span>${art.readTime}</span>
          </div>
          <h3 class="article-card-title">${art.title}</h3>
          <p class="article-card-excerpt">${art.excerpt}</p>
          <div class="article-card-action">
            <span>Read Guide</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      `;
      articlesGrid.appendChild(card);
    });
  }

  function openArticleModal(id) {
    const art = articles.find(a => a.id === id);
    if (!art || !articleModal) return;

    articleModalTitle.textContent = art.title;
    articleModalTag.textContent = art.tag;
    articleModalMeta.textContent = `${art.date} • ${art.readTime}`;
    articleModalImg.src = art.coverImage;
    articleModalImg.alt = art.title;
    articleModalContent.innerHTML = art.content;

    articleModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (articleModalClose) {
    articleModalClose.addEventListener("click", closeArticleModal);
  }

  if (articleModal) {
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) {
        closeArticleModal();
      }
    });
  }

  // Init App
  initCategories();
  renderCatalog();
  renderArticles();
});
