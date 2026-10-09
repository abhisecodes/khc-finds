// =========================================================================
// KHC Finds - Modern Mobile-App Style Client Application
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
    title: "LG 108 cms (43 inches) NU87 AI Series Nano 4K Ultra HD (3840 x 2160) Smart webOS LED TV 43NU870BPLA 2026",
    brand: "LG",
    category: "cat-tv",
    price: 29990,
    oldPrice: 49990,
    affiliateUrl: "https://link.amazon/B0iUnT4dz",
    image: "/assets/products/lg-43nu87-tv.jpg",
    whyRecommend: "Crisp NanoCell 4K color reproduction paired with next-gen α7 AI processing and immersive 9.1.2 virtual sound.",
    overview: "The LG 43NU870BPLA (2026 Edition) features a vivid 4K Ultra HD NanoCell display powered by LG's α7 AI Gen9 processor. Offering pure color filtration, AI Sound Pro with 9.1.2 virtual up-mixing, Dolby Atmos, and webOS 26 with integrated Gemini & Copilot AI assistance.",
    pros: [
      "Stunning 4K NanoCell color clarity and wide viewing angles",
      "AI Sound Pro (9.1.2 virtual channel up-mixing) & Dolby Atmos",
      "Next-gen webOS 26 featuring dual AI assistance (Gemini & Copilot)",
      "Game Optimizer dashboard with ALLM & eARC support"
    ],
    cons: [
      "Native refresh rate capped at 60Hz",
      "Peak brightness best suited for controlled ambient lighting"
    ],
    specifications: {
      "Screen Size": "43 Inches (108 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "NanoCell LED",
      "Processor": "α7 AI Processor 4K Gen9",
      "Audio": "20W, AI Sound Pro (9.1.2), Dolby Atmos",
      "Smart Platform": "webOS 26 (Gemini & Copilot)"
    }
  },
  {
    id: "prod-philips-43pqt8100",
    pageUrl: "/products/philips-43pqt8100-qled-tv/",
    title: "PHILIPS 109 cm (43 inches) 8100 Series 4K Ultra HD Smart QLED Google TV 43PQT8100/94",
    brand: "Philips",
    category: "cat-tv",
    price: 29999,
    oldPrice: 49990,
    affiliateUrl: "https://link.amazon/B0iJbJYxM",
    image: "/assets/products/philips-43pqt8100-tv.jpg",
    whyRecommend: "Rich Quantum Dot QLED color depth, 120Hz HSR motion smoothing, and powerful 30W Dolby Atmos audio.",
    overview: "The Philips 8100 Series 43PQT8100 brings Quantum Dot (QLED) panel technology to the compact 43-inch class. Features Wider Color Gamut, 120Hz HSR (High Screen Refresh) for fluid gaming and sports, cinema-grade Dolby Vision & Dolby Atmos with punchy 30W stereo speakers, and Google TV with hands-free Google Assistant voice control.",
    pros: [
      "Vibrant Quantum Dot QLED panel with Wider Color Gamut",
      "120Hz HSR refresh rate delivers ultra-smooth fast action",
      "Dolby Vision HDR combined with punchy 30W Dolby Atmos sound",
      "Google TV with personalized content and hands-free microphone"
    ],
    cons: [
      "Black levels slightly elevated compared to Mini-LED in pitch black rooms",
      "Slightly thicker chassis design"
    ],
    specifications: {
      "Screen Size": "43 Inches (109 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "Quantum Dot QLED",
      "Refresh Rate": "120Hz HSR (High Screen Refresh)",
      "Audio": "30W Stereo RMS with Dolby Atmos",
      "Smart Platform": "Google TV with Hands-Free Mic"
    }
  },
  {
    id: "prod-samsung-43-miniled",
    pageUrl: "/products/samsung-43-miniled-4k-tv/",
    title: "Samsung 43 inch (108cm) Mini LED 4K Vision AI 2026 Smart TV | 30W Speakers | 4K Upscaling | Mini-LED HDR | 150+ Channels | 7 Years OS Upgrade | UA43M2EHAULXL",
    brand: "Samsung",
    category: "cat-tv",
    price: 33990,
    oldPrice: 49990,
    affiliateUrl: "https://link.amazon/B094wOMN9",
    image: "/assets/products/samsung-43-miniled-tv.jpg",
    whyRecommend: "Flagship Mini-LED precision contrast combined with 7 years of guaranteed OS updates and Vision AI companion.",
    overview: "The Samsung UA43M2EHAULXL (2026 Edition) brings premium Mini-LED backlighting into the 43-inch form factor, achieving deep blacks and high contrast without backlight bleed. Equipped with Samsung's Vision AI Companion, neural 4K Upscaling, 30W speakers with Object Tracking Sound Lite, 150+ free live channels on Samsung TV Plus, and 7 years of guaranteed Tizen OS updates.",
    pros: [
      "Mini-LED local dimming creates exceptional contrast & deep blacks",
      "Guaranteed 7 Years of Tizen OS upgrades for ultimate longevity",
      "Built-in Vision AI Companion & neural 4K Upscaling",
      "150+ free live streaming channels via Samsung TV Plus"
    ],
    cons: [
      "Priced slightly above conventional LED competitors",
      "3 HDMI ports (4 would have been ideal for multi-console setups)"
    ],
    specifications: {
      "Screen Size": "43 Inches (108 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Display Tech": "Mini-LED Precision Array",
      "Audio": "30W Output, OTS Lite, Adaptive Sound",
      "Smart Platform": "Tizen OS (7-Year Upgrade Guarantee)",
      "AI Features": "Vision AI Companion, 4K Neural Upscaler"
    }
  },
  {
    id: "prod-logitech-mk215",
    pageUrl: "/products/logitech-mk215-wireless-combo/",
    title: "Logitech MK215 Wireless Keyboard and Mouse Combo for Windows, 2.4 GHz Wireless, Compact Design, 2-Year Battery Life(Keyboard),5 Month Battery Life(Mouse) PC/Laptop- Black",
    brand: "Logitech",
    category: "cat-workspace",
    price: 1295,
    oldPrice: 1645,
    affiliateUrl: "https://link.amazon/B06T5QBlB",
    image: "/assets/products/logitech-mk215-combo.jpg",
    whyRecommend: "Reliable plug-and-play 2.4 GHz wireless in a compact footprint with up to 2-year battery life.",
    overview: "Logitech MK215 is an ultra-compact wireless keyboard and mouse combo engineered for clutter-free workspaces. Featuring reliable 2.4 GHz wireless with a 10-meter range via a tiny USB receiver, 128-bit AES keyboard encryption, 36% smaller footprint than standard keyboards while retaining full keys and number pad, and incredible battery longevity (up to 24 months for keyboard, 5 months for mouse).",
    pros: [
      "Space-saving 36% smaller design with full numpad intact",
      "Rock-solid 2.4 GHz wireless connection with zero latency up to 10m",
      "Outstanding battery longevity: up to 24 months (keyboard) & 5 months (mouse)",
      "Plug-and-play simplicity with nano USB receiver"
    ],
    cons: [
      "Requires USB-A port for the wireless receiver (no Bluetooth)",
      "Keys are not backlit"
    ],
    specifications: {
      "Connectivity": "2.4 GHz Wireless (Nano USB Receiver)",
      "Operating Range": "10 Meters (33 Feet)",
      "Keyboard Battery": "Up to 24 Months (2x AAA)",
      "Mouse Battery": "Up to 5 Months (2x AA)",
      "Compatibility": "Windows 10/11, ChromeOS, PC & Laptop",
      "Encryption": "128-bit AES Wireless Encryption"
    }
  },
  {
    id: "prod-samsung-24-curved",
    pageUrl: "/products/samsung-24-curved-monitor/",
    title: "Samsung 24\" Curved Monitor|1800R Curved Screen|100Hz|4ms|SRGB 95%|Ports-HDMI,D-Sub,Headphone|Game Mode|EyeSaver Mode|16.7M Color Support|Flicker Free|Off Timer Plus|LS24D368GAWXXL|Black",
    brand: "Samsung",
    category: "cat-monitors",
    price: 7999,
    oldPrice: 13999,
    affiliateUrl: "https://link.amazon/B0a1fH9kj",
    image: "/assets/products/samsung-24-curved-monitor.jpg",
    whyRecommend: "1800R natural eye curvature matched with fluid 100Hz refresh rate and 95% sRGB color accuracy.",
    overview: "The Samsung Essential Monitor S3 (LS24D368GAWXXL) delivers an immersive visual experience with an 1800R curved VA panel designed around the human eye contour. Features a fast 100Hz refresh rate for tear-free fluid motion, 95% sRGB color gamut for faithful color reproduction, Game Mode for optimized contrast, and Eye Saver Mode with Flicker-Free tech to eliminate eye fatigue during long desk sessions.",
    pros: [
      "1800R curve provides cinematic immersion and reduces peripheral eye strain",
      "Smooth 100Hz refresh rate for fluid scrolling and casual gaming",
      "Rich 95% sRGB color coverage with 16.7 million colors",
      "Dedicated Eye Saver Mode and Flicker Free certified protection"
    ],
    cons: [
      "Full HD (1080p) resolution rather than 1440p",
      "Stand offers tilt adjustment only (no height adjustment)"
    ],
    specifications: {
      "Screen Size": "24 Inches (59.8 cm)",
      "Resolution": "Full HD (1920 x 1080)",
      "Panel Type": "VA Curved (1800R Curvature)",
      "Refresh Rate": "100Hz",
      "Response Time": "4ms (GTG)",
      "Ports": "1x HDMI (1.4), 1x D-Sub (VGA), Headphone Out"
    }
  },
  {
    id: "prod-wesley-luxur-backpack",
    pageUrl: "/products/wesley-luxur-45l-travel-backpack/",
    title: "Wesley Luxur 45 Ltrs Overnighter Expandable Travel Laptop Backpack, Flight Cabin Approved Carry On with 16 inch Laptop Compartment, Anti Theft feature business/Travel/Weekender/college Charcoal Black",
    brand: "Wesley",
    category: "cat-carry",
    price: 699,
    oldPrice: 2999,
    affiliateUrl: "https://link.amazon/B0f1v3WK8",
    image: "/assets/products/wesley-luxur-backpack.jpg",
    whyRecommend: "Massive 45-liter expandable packing capacity, flight cabin approved, and dedicated 16-inch padded laptop vault.",
    overview: "The Wesley Luxur 45L Overnighter is an expandable multi-functional travel backpack designed to meet international airline cabin carry-on regulations. Built with durable water-resistant polyester fabric, it features an expandable main packing compartment with suitcase-style 180-degree flat opening, dedicated padded pocket for up to 16-inch laptops, anti-theft hidden pockets, breathable honeycomb back padding, and compression side straps.",
    pros: [
      "Massive 45L expandable volume fits 3-5 days of travel apparel",
      "180° clamshell opening allows seamless airport security packing",
      "Dedicated 16-inch shockproof padded laptop & tablet sleeve",
      "Flight cabin approved carry-on dimensions for domestic & international airlines",
      "Exceptional value under ₹700 with water-resistant construction"
    ],
    cons: [
      "Water-resistant against drizzle, not fully waterproof in downpours",
      "Standard gauge zippers rather than heavy-duty metal zippers"
    ],
    specifications: {
      "Capacity": "45 Litres (Expandable)",
      "Laptop Fit": "Up to 16-inch Laptops",
      "Flight Cabin Status": "Approved Carry-On Dimensions",
      "Material": "High-Density Water-Resistant Polyester",
      "Opening Style": "180° Clamshell Suitcase Opening",
      "Weight": "Approx. 850g Lightweight"
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
            <div class="card-price-group">
              <span class="card-price">${formatINR(p.price)}</span>
              ${oldPriceHtml}
            </div>
            <div style="display: flex; gap: 8px;">
              <a href="${p.pageUrl}" class="btn btn-action" style="padding: 0 10px; font-size: 11.5px; height: 32px; display: inline-flex; align-items: center;">Specs</a>
              <button class="btn btn-action view-details-btn" data-id="${p.id}" style="padding: 0 10px; font-size: 11.5px; height: 32px;">Analysis</button>
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
