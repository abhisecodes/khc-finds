// =========================================================================
// KHC Finds — Newsroom & Media Publishing CMS Engine
// Modern, Mobile-First Editorial Suite
// =========================================================================

// Global Studio State
const state = {
  articleType: "blog", // "blog" or "news"
  title: "Best Mechanical Keyboards Under ₹3,000 in India (2026 Tested)",
  subtitle: "We tested tactile brown switches, hot-swappable sockets, and wireless latency across 5 budget mechanical keyboards worth your desk space.",
  slug: "best-mechanical-keyboards-under-3000",
  category: "Buying Guides",
  tag: "Buying Guide",
  authorType: "KHC Editorial Staff",
  authorName: "KHC Editorial Staff",
  authorRole: "Editorial Team",
  timestampMode: "now",
  customDateTime: "",
  pubDateFormatted: "",
  pubDateIso: "",
  readTime: "5 min read",
  metaDesc: "Discover the best budget mechanical keyboards under ₹3000 in India for 2026. Real testing on switch longevity, hot-swap PCB support, and Amazon festive deals.",
  coverImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
  coverCaption: "Compact 75% mechanical keyboards deliver ergonomic typing without wasting desk real estate.",
  coverFileName: "",
  coverFileSize: "",
  targetKeyword: "mechanical keyboard under 3000",
  githubToken: localStorage.getItem("khc_github_token") || "",
  selectedAgency: "Amazon India",
  selectedCta: "Check Price on Amazon &rarr;",
  activeArticleUrl: "/blog/best-mechanical-keyboards-under-3000/index.html",
  content: `<!-- KEY_TAKEAWAYS: ["Hot-swappable sockets and factory-lubed switches are now accessible under ₹3,000.","Keychron C3 Pro delivers the most reliable typing acoustics and open-source VIA customizability.","Cosmic Byte Phantom offers the best modularity for switch experimentation on a budget."] -->

The sub-₹3,000 mechanical keyboard market in India has drastically matured for 2026. Gone are the days when budget meant scratchy Blue clone switches in hollow plastic enclosures that echoed through your late-night work sessions.

Today, manufacturers are incorporating enthusiast-grade traits into entry-level price brackets: hot-swappable switch sockets, factory-lubricated stabilizers, sound-dampening EVA foam, and detachable braided USB-C connections.

In this tested shootout, we evaluate the best mechanical keyboard offerings currently available under ₹3,000 across Amazon, Flipkart, and authorized agency partners.

## 1. Keychron C3 Pro: The Typing Quality Standard

If pure typing feel and firmware customizability are your top priorities, the **Keychron C3 Pro** is the definitive benchmark in the budget category.

Featuring a compact 87-key Tenkeyless (TKL) footprint, the C3 Pro includes full QMK/VIA programmable firmware support, allowing you to rebind every single key and macro directly inside your web browser without installing background bloatware.

<!-- PRODUCT_CALLOUT: {"name":"Keychron C3 Pro QMK/VIA Wired Mechanical Keyboard","agency":"Amazon India","desc":"Red switch linear actuation, acoustic sound-absorbing foam, and full QMK/VIA web customizability.","price":"₹2,899","oldPrice":"₹4,499","discount":"36% OFF","link":"https://amazon.in/","cta":"Check Price on Amazon &rarr;","image":"https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80"} -->

## 2. Cosmic Byte Phantom: Hot-Swappable Customizer

For users who want to experiment with different switches down the line without desoldering, the **Cosmic Byte Phantom** provides a modular 3-pin hot-swappable PCB at an unbeatable price point.

The compact 68-key form factor preserves dedicated arrow keys while opening up maximum mouse glide room for low-DPI gaming and compact desk blueprints.

<!-- PRODUCT_CALLOUT: {"name":"Cosmic Byte Phantom 68-Key Hot-Swappable RGB","agency":"Flipkart","desc":"Hot-swappable Outemu brown tactile switches, per-key RGB backlighting, and braided Type-C cable.","price":"₹2,299","oldPrice":"₹3,499","discount":"34% OFF","link":"https://flipkart.com/","cta":"View Deal on Flipkart &rarr;","image":"https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"} -->

<!-- PROS_CONS: {"pros":["Hot-swappable switch sockets under ₹3,000","Detachable USB-C cables standard on top picks","Factory sound dampening foam reduces ping"],"cons":["Keycaps are mostly ABS rather than textured PBT","Companion software often limited to Windows OS"]} -->

<!-- FAQ_BLOCK: [{"q":"Are mechanical keyboards under ₹3000 durable?","a":"Yes, keyboards like the Keychron C3 Pro and Cosmic Byte Phantom use switches rated for 50 million keystrokes with reinforced ABS top plates."},{"q":"Which switch type is best for office work?","a":"Linear Red switches or subtle tactile Brown switches are recommended for office typing as they minimize noise compared to loud Blue clicky switches."}] -->

## Our Buying Advice & Verdict

> **The Quick Verdict**: If your primary workload is coding, writing, or long office sessions, choose the **Keychron C3 Pro** with Red or Brown switches for superior acoustic damping. If you desire RGB aesthetics and future switch modularity on a tight budget, the **Cosmic Byte Phantom** is your ideal starting board.`
};

// =========================================================================
// Built-in Article Registry (All 7 Published Tech News & Blogs)
// =========================================================================
const defaultArticles = [
  // 1. Dashboard Published Blog
  {
    title: "Best Mechanical Keyboards Under ₹3,000 in India (2026 Tested)",
    slug: "best-mechanical-keyboards-under-3000",
    type: "blog",
    category: "Buying Guides",
    tag: "Buying Guide",
    path: "/blog/best-mechanical-keyboards-under-3000/index.html",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    sourceBadge: "Newsroom CMS",
    cover: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80"
  },
  // 2. Editorial Blogs
  {
    title: "The 2026 43-inch 4K Shootout: LG NanoCell vs Philips QLED vs Samsung Mini-LED",
    slug: "43-inch-4k-tv-shootout-2026",
    type: "blog",
    category: "Buying Guides",
    tag: "Buying Guide",
    path: "/blog/43-inch-4k-tv-shootout-2026/index.html",
    date: "Oct 9, 2026",
    readTime: "5 min read",
    cover: "/assets/products/samsung-43-miniled-tv.jpg"
  },
  {
    title: "The Ergonomic Desk Blueprint: Curved Immersion & Wireless Simplicity",
    slug: "ergonomic-desk-blueprint",
    type: "blog",
    category: "Setup Guides",
    tag: "Setup Guide",
    path: "/blog/ergonomic-desk-blueprint/index.html",
    date: "Oct 9, 2026",
    readTime: "4 min read",
    cover: "/assets/products/samsung-24-curved-monitor.jpg"
  },
  {
    title: "One Bag Travel Mastery: Why the 45L Expandable Backpack Beats Wheeled Luggage",
    slug: "one-bag-travel-mastery",
    type: "blog",
    category: "Travel & Carry",
    tag: "Travel & Carry",
    path: "/blog/one-bag-travel-mastery/index.html",
    date: "Oct 9, 2026",
    readTime: "4 min read",
    cover: "/assets/products/wesley-luxur-backpack.jpg"
  },
  // 3. Tech News Articles
  {
    title: "Custom Silicon & AI Infrastructure: How ASIC Accelerators Are Shifting Datacenter Architectures",
    slug: "custom-silicon-ai-infrastructure",
    type: "news",
    category: "AI & Semiconductors",
    tag: "Semiconductors",
    path: "/news/custom-silicon-ai-infrastructure/index.html",
    date: "Oct 6, 2026",
    readTime: "4 min read",
    cover: "/assets/storefront.png"
  },
  {
    title: "VESA Finalizes DisplayPort 2.1b Specification: What It Means for Next-Gen Monitors",
    slug: "vesa-displayport-2-1b-specification",
    type: "news",
    category: "Display Tech",
    tag: "Hardware Standards",
    path: "/news/vesa-displayport-2-1b-specification/index.html",
    date: "Oct 7, 2026",
    readTime: "3 min read",
    cover: "/assets/products/samsung-24-curved-monitor.jpg"
  },
  {
    title: "FIDO Alliance Expands Cross-Platform Passkey Credential Exchange Specifications",
    slug: "fido-alliance-passkey-cross-platform-sync",
    type: "news",
    category: "Cybersecurity",
    tag: "Security & Auth",
    path: "/news/fido-alliance-passkey-cross-platform-sync/index.html",
    date: "Oct 8, 2026",
    readTime: "4 min read",
    cover: "/assets/storefront.png"
  }
];

// Curated Unsplash Stock Photos
const curatedStockPhotos = [
  { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80", title: "Mechanical Keyboard", tag: "Keyboards" },
  { url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80", title: "Minimal Desk Monitor", tag: "Workspaces" },
  { url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80", title: "Ultrawide Workspace", tag: "Monitors" },
  { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80", title: "Studio Headphones", tag: "Audio" },
  { url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80", title: "Semiconductor Hardware", tag: "Chips & AI" },
  { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80", title: "Travel Carry Backpack", tag: "Luggage" },
  { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80", title: "MacBook & Coffee", tag: "Laptops" },
  { url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80", title: "Smart Watch Tech", tag: "Wearables" }
];

let articleRegistry = [];
function initArticleRegistry() {
  const saved = localStorage.getItem("khc_article_registry");
  if (saved) {
    try {
      articleRegistry = JSON.parse(saved);
    } catch (e) {
      articleRegistry = [...defaultArticles];
    }
  } else {
    articleRegistry = [...defaultArticles];
  }

  // Ensure default articles exist
  defaultArticles.forEach(def => {
    if (!articleRegistry.some(a => a.path === def.path || a.slug === def.slug)) {
      articleRegistry.push(def);
    }
  });

  saveArticleRegistry();
}

function saveArticleRegistry() {
  localStorage.setItem("khc_article_registry", JSON.stringify(articleRegistry));
  if (el.libraryCountBadge) {
    el.libraryCountBadge.textContent = articleRegistry.length;
  }
}

// Live Products Catalog for Storefront
const liveCatalogProducts = [
  {
    id: "prod-lg-43nu87",
    brand: "LG",
    title: "LG 43\" NU87 AI Series Nano 4K Ultra HD (43NU870BPLA 2026)",
    price: 29990,
    oldPrice: 49990,
    discount: "40% OFF",
    affiliateUrl: "https://link.amazon/B0iUnT4dz",
    image: "/assets/products/lg-43nu87-tv.jpg",
    whyRecommend: "Crisp NanoCell 4K color reproduction paired with next-gen α7 AI processing."
  },
  {
    id: "prod-philips-43pqt8100",
    brand: "Philips",
    title: "PHILIPS 43\" 8100 Series 4K Ultra HD Smart QLED Google TV (43PQT8100/94)",
    price: 29999,
    oldPrice: 49990,
    discount: "40% OFF",
    affiliateUrl: "https://link.amazon/B0iJbJYxM",
    image: "/assets/products/philips-43pqt8100-tv.jpg",
    whyRecommend: "Rich Quantum Dot QLED color depth, 120Hz HSR motion smoothing, and 30W Dolby Atmos."
  },
  {
    id: "prod-samsung-43-miniled",
    brand: "Samsung",
    title: "Samsung 43\" Mini LED 4K Ultra HD Smart TV (UA43M2EHAULXL)",
    price: 33990,
    oldPrice: 49990,
    discount: "32% OFF",
    affiliateUrl: "https://link.amazon/B094wOMN9",
    image: "/assets/products/samsung-43-miniled-tv.jpg",
    whyRecommend: "Dense Mini-LED contrast matrix with 7-year guaranteed Tizen OS updates."
  },
  {
    id: "prod-samsung-24-curved",
    brand: "Samsung",
    title: "Samsung 24\" 1800R Curved Monitor 100Hz (LS24D368GAWXXL)",
    price: 7799,
    oldPrice: 13999,
    discount: "44% OFF",
    affiliateUrl: "https://link.amazon/B0a1fH9kj",
    image: "/assets/products/samsung-24-curved-monitor.jpg",
    whyRecommend: "1800R natural eye curvature matched with fluid 100Hz refresh rate and 95% sRGB."
  },
  {
    id: "prod-logitech-mk215",
    brand: "Logitech",
    title: "Logitech MK215 Wireless Keyboard and Mouse Combo",
    price: 1199,
    oldPrice: 1645,
    discount: "27% OFF",
    affiliateUrl: "https://link.amazon/B06dIjcHg",
    image: "/assets/products/logitech-mk215-combo.jpg",
    whyRecommend: "Ultra-compact 36% smaller desk footprint with up to 24-month battery endurance."
  },
  {
    id: "prod-wesley-luxur-backpack",
    brand: "Wesley",
    title: "Wesley Luxur 45L Expandable Cabin Approved Travel Backpack",
    price: 699,
    oldPrice: 2999,
    discount: "77% OFF",
    affiliateUrl: "https://link.amazon/B0f1v3WK8",
    image: "/assets/products/wesley-luxur-backpack.jpg",
    whyRecommend: "Massive 45-liter expandable packing capacity and 16-inch padded laptop vault."
  }
];

let pendingDeleteTarget = null;
let el = {};

document.addEventListener("DOMContentLoaded", () => {
  initElements();
  initArticleRegistry();
  loadSavedDraft();
  setupEventListeners();
  populateArticleDropdowns();
  renderArticlesLibrary();
  renderUnsplashPicker();
  updateTimestamp();
  updateCalculations();
  renderCatalogEditCards();
  startAutoSnapshots();
});

function initElements() {
  el = {
    // Tabs & Badges
    tabBtns: document.querySelectorAll(".tab-pill"),
    tabViews: document.querySelectorAll(".tab-view"),
    libraryCountBadge: document.getElementById("library-count-badge"),
    
    // Header Actions
    btnZenMode: document.getElementById("btn-zen-mode"),
    btnOpenRevisions: document.getElementById("btn-open-revisions"),
    btnOpenExport: document.getElementById("btn-open-export"),
    btnSaveDraft: document.getElementById("btn-save-draft"),
    btnTopPublish: document.getElementById("btn-top-publish"),
    cmsSaveStatus: document.getElementById("cms-save-status"),
    statusText: document.getElementById("status-text"),

    // Mobile View & Bottom Bar
    btnMobileSheet: document.getElementById("btn-mobile-sheet"),
    btnMobileSettings: document.getElementById("btn-mobile-settings"),
    composeAside: document.getElementById("compose-aside"),
    composeWritingCard: document.getElementById("compose-writing-card"),
    btnMobileNavCanvas: document.getElementById("btn-mobile-nav-canvas"),
    btnMobileNavBlocks: document.getElementById("btn-mobile-nav-blocks"),
    btnMobileNavSettings: document.getElementById("btn-mobile-nav-settings"),
    btnMobileNavPreview: document.getElementById("btn-mobile-nav-preview"),
    btnMobileNavSave: document.getElementById("btn-mobile-nav-save"),

    // Article Controls & Metadata
    articleTypeBtns: document.querySelectorAll("#article-type-selector .segmented-btn"),
    channelHint: document.getElementById("channel-hint"),
    sheetTypePill: document.getElementById("sheet-type-pill"),
    sheetSlugPill: document.getElementById("sheet-slug-pill"),
    existingArticleSelect: document.getElementById("existing-article-select"),
    optgroupNews: document.getElementById("optgroup-news"),
    optgroupBlog: document.getElementById("optgroup-blog"),
    btnViewCurrentLive: document.getElementById("btn-view-current-live"),
    btnDeleteCurrentArticle: document.getElementById("btn-delete-current-article"),
    btnSwitchToLibrary: document.getElementById("btn-switch-to-library"),

    // Content Form
    titleInput: document.getElementById("post-title"),
    subtitleInput: document.getElementById("post-subtitle"),
    slugInput: document.getElementById("post-slug"),
    categorySelect: document.getElementById("post-category"),
    tagInput: document.getElementById("post-tag"),
    keywordInput: document.getElementById("post-keyword"),
    metaDescInput: document.getElementById("post-meta-desc"),
    coverImgInput: document.getElementById("post-cover-img"),
    coverCaptionInput: document.getElementById("post-cover-caption"),
    contentInput: document.getElementById("post-content"),
    titleCounter: document.getElementById("title-counter"),
    metaCounter: document.getElementById("meta-counter"),
    slugPreview: document.getElementById("slug-preview-text"),

    // Canvas Stats
    statWords: document.getElementById("stat-words"),
    statReadTime: document.getElementById("stat-read-time"),
    statReadability: document.getElementById("stat-readability"),

    // Author & Byline
    authorSelect: document.getElementById("author-select"),
    customAuthorGroup: document.getElementById("custom-author-group"),
    customAuthorName: document.getElementById("custom-author-name"),
    customAuthorRole: document.getElementById("custom-author-role"),
    timestampModeSelect: document.getElementById("post-timestamp-mode"),
    customTimestampGroup: document.getElementById("custom-timestamp-group"),
    customDatetimeInput: document.getElementById("custom-datetime"),
    formattedBylinePreview: document.getElementById("formatted-byline-preview"),

    // Media & Image Upload
    coverDropArea: document.getElementById("cover-drop-area"),
    coverFileInput: document.getElementById("cover-file-input"),
    coverPreviewImg: document.getElementById("cover-preview-img"),
    coverPlaceholder: document.getElementById("cover-placeholder"),
    coverImageInfo: document.getElementById("cover-image-info"),
    coverFileName: document.getElementById("cover-file-name"),
    coverFileSize: document.getElementById("cover-file-size"),
    btnRemoveCoverImg: document.getElementById("btn-remove-cover-img"),
    btnImgModeLocal: document.getElementById("btn-img-mode-local"),
    btnImgModeUrl: document.getElementById("btn-img-mode-url"),
    btnOpenUnsplash: document.getElementById("btn-open-unsplash"),
    coverUrlInputWrap: document.getElementById("cover-url-input-wrap"),

    // Library Tab
    libraryArticlesContainer: document.getElementById("library-articles-container"),
    librarySearchInput: document.getElementById("library-search-input"),
    filterPills: document.querySelectorAll(".filter-pill"),
    btnRefreshLibrary: document.getElementById("btn-refresh-library"),
    btnLibraryNewPost: document.getElementById("btn-library-new-post"),

    // Preview Tab
    previewFrame: document.getElementById("preview-frame"),
    viewportBtns: document.querySelectorAll(".viewport-btn"),

    // SEO Tab
    serpBox: document.getElementById("serp-box"),
    serpTitle: document.getElementById("serp-title"),
    serpUrl: document.getElementById("serp-url"),
    serpDesc: document.getElementById("serp-desc"),
    btnSerpDesktop: document.getElementById("btn-serp-desktop"),
    btnSerpMobile: document.getElementById("btn-serp-mobile"),
    socialPreviewImg: document.getElementById("social-preview-img"),
    socialPreviewTitle: document.getElementById("social-preview-title"),
    socialPreviewDesc: document.getElementById("social-preview-desc"),
    schemaCode: document.getElementById("schema-code"),
    btnCopySchema: document.getElementById("btn-copy-schema"),
    seoScoreCircle: document.getElementById("seo-score-circle"),
    seoScoreVerdict: document.getElementById("seo-score-verdict"),
    seoCheckList: document.getElementById("seo-check-list"),

    // Publish Tab & Console
    githubTokenInput: document.getElementById("github-token-input"),
    btnSaveToken: document.getElementById("btn-save-token"),
    btnPublishLive: document.getElementById("btn-publish-live"),
    publishConsole: document.getElementById("publish-console"),
    btnDownloadHtml: document.getElementById("btn-download-html"),
    btnCopyHtml: document.getElementById("btn-copy-html"),
    sitemapSnippet: document.getElementById("sitemap-snippet"),
    btnCopySitemap: document.getElementById("btn-copy-sitemap"),

    // Catalog & Banner
    catalogEditContainer: document.getElementById("catalog-edit-container"),
    btnSaveCatalogDeals: document.getElementById("btn-save-catalog-deals"),
    bannerPillText: document.getElementById("banner-pill-text"),
    bannerMessageText: document.getElementById("banner-message-text"),
    bannerCtaLink: document.getElementById("banner-cta-link"),
    previewBannerPill: document.getElementById("preview-banner-pill"),
    previewBannerMsg: document.getElementById("preview-banner-msg"),
    btnSaveBanner: document.getElementById("btn-save-banner"),

    // Modals
    modalMobileBlocks: document.getElementById("modal-mobile-blocks"),
    modalProduct: document.getElementById("modal-product-callout"),
    btnOpenProductModal: document.getElementById("btn-add-product"),
    insertProductConfirm: document.getElementById("btn-insert-product-confirm"),
    modalTakeaways: document.getElementById("modal-takeaways"),
    btnOpenTakeawaysModal: document.getElementById("btn-add-takeaways"),
    insertTakeawaysConfirm: document.getElementById("btn-insert-takeaways-confirm"),
    modalProsCons: document.getElementById("modal-pros-cons"),
    btnOpenProsConsModal: document.getElementById("btn-add-pros-cons"),
    insertProsConsConfirm: document.getElementById("btn-insert-proscons-confirm"),
    modalFaq: document.getElementById("modal-faq"),
    btnOpenFaqModal: document.getElementById("btn-add-faq"),
    insertFaqConfirm: document.getElementById("btn-insert-faq-confirm"),
    modalQuote: document.getElementById("modal-quote"),
    btnOpenQuoteModal: document.getElementById("btn-add-quote"),
    insertQuoteConfirm: document.getElementById("btn-insert-quote-confirm"),
    modalCallout: document.getElementById("modal-callout"),
    btnOpenCalloutModal: document.getElementById("btn-add-callout"),
    insertCalloutConfirm: document.getElementById("btn-insert-callout-confirm"),
    modalVerdict: document.getElementById("modal-verdict"),
    btnOpenVerdictModal: document.getElementById("btn-add-verdict"),
    insertVerdictConfirm: document.getElementById("btn-insert-verdict-confirm"),
    modalUnsplash: document.getElementById("modal-unsplash"),
    modalRevisions: document.getElementById("modal-revisions"),
    revisionsList: document.getElementById("revisions-list"),
    modalExport: document.getElementById("modal-export"),
    modalDeleteConfirm: document.getElementById("modal-delete-confirm"),
    deleteTargetTitle: document.getElementById("delete-target-title"),
    deleteTargetPath: document.getElementById("delete-target-path"),
    btnConfirmDeleteAction: document.getElementById("btn-confirm-delete-action")
  };
}

// Event Listeners Setup
function setupEventListeners() {
  // Tab Bar Switching
  el.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Mobile Segmented Switcher (Canvas vs Settings)
  if (el.btnMobileSheet && el.btnMobileSettings) {
    el.btnMobileSheet.addEventListener("click", () => {
      el.btnMobileSheet.classList.add("active");
      el.btnMobileSettings.classList.remove("active");
      el.composeWritingCard.classList.remove("mobile-hidden");
      el.composeAside.classList.add("mobile-hidden");
    });

    el.btnMobileSettings.addEventListener("click", () => {
      el.btnMobileSettings.classList.add("active");
      el.btnMobileSheet.classList.remove("active");
      el.composeAside.classList.remove("mobile-hidden");
      el.composeWritingCard.classList.add("mobile-hidden");
    });
  }

  // Mobile Bottom Navigation Bar
  if (el.btnMobileNavCanvas) {
    el.btnMobileNavCanvas.addEventListener("click", () => {
      switchTab("editor");
      if (el.btnMobileSheet) el.btnMobileSheet.click();
      updateMobileBottomNav("canvas");
    });
  }
  if (el.btnMobileNavBlocks) {
    el.btnMobileNavBlocks.addEventListener("click", () => {
      el.modalMobileBlocks.classList.add("active");
    });
  }
  if (el.btnMobileNavSettings) {
    el.btnMobileNavSettings.addEventListener("click", () => {
      switchTab("editor");
      if (el.btnMobileSettings) el.btnMobileSettings.click();
      updateMobileBottomNav("settings");
    });
  }
  if (el.btnMobileNavPreview) {
    el.btnMobileNavPreview.addEventListener("click", () => {
      switchTab("preview");
      updateMobileBottomNav("preview");
    });
  }
  if (el.btnMobileNavSave) {
    el.btnMobileNavSave.addEventListener("click", () => {
      saveDraft();
    });
  }

  // Mobile Blocks Picker Cards
  document.querySelectorAll(".block-picker-card[data-block]").forEach(card => {
    card.addEventListener("click", () => {
      el.modalMobileBlocks.classList.remove("active");
      const block = card.dataset.block;
      if (block === "takeaways") el.modalTakeaways.classList.add("active");
      if (block === "product") el.modalProduct.classList.add("active");
      if (block === "proscons") el.modalProsCons.classList.add("active");
      if (block === "faq") el.modalFaq.classList.add("active");
      if (block === "verdict") el.modalVerdict.classList.add("active");
      if (block === "quote") el.modalQuote.classList.add("active");
      if (block === "callout") el.modalCallout.classList.add("active");
      if (block === "table") insertFormatting("table");
    });
  });

  // Zen Mode
  if (el.btnZenMode) {
    el.btnZenMode.addEventListener("click", () => {
      el.composeWritingCard.classList.toggle("zen-mode");
      const isZen = el.composeWritingCard.classList.contains("zen-mode");
      el.btnZenMode.classList.toggle("btn-publish-brand", isZen);
    });
  }

  // Header Actions
  if (el.btnSaveDraft) el.btnSaveDraft.addEventListener("click", saveDraft);
  if (el.btnTopPublish) el.btnTopPublish.addEventListener("click", () => switchTab("publish"));
  if (el.btnOpenRevisions) el.btnOpenRevisions.addEventListener("click", openRevisionsModal);
  if (el.btnOpenExport) el.btnOpenExport.addEventListener("click", () => el.modalExport.classList.add("active"));

  // Channel Selection (Blog vs News)
  el.articleTypeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      el.articleTypeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setArticleType(btn.dataset.type);
    });
  });

  // Story Fields
  el.titleInput.addEventListener("input", (e) => {
    state.title = e.target.value;
    if (!state.activeArticleUrl) {
      state.slug = generateSlug(state.title);
      el.slugInput.value = state.slug;
    }
    updateCalculations();
    markUnsaved();
  });

  el.subtitleInput.addEventListener("input", (e) => {
    state.subtitle = e.target.value;
    updateCalculations();
    markUnsaved();
  });

  el.slugInput.addEventListener("input", (e) => {
    state.slug = generateSlug(e.target.value);
    e.target.value = state.slug;
    updateCalculations();
    markUnsaved();
  });

  if (el.keywordInput) {
    el.keywordInput.addEventListener("input", (e) => {
      state.targetKeyword = e.target.value.trim().toLowerCase();
      updateCalculations();
    });
  }

  el.categorySelect.addEventListener("change", (e) => {
    state.category = e.target.value;
    markUnsaved();
  });

  el.tagInput.addEventListener("input", (e) => {
    state.tag = e.target.value;
    if (el.sheetTypePill) el.sheetTypePill.textContent = state.tag || state.category;
    markUnsaved();
  });

  el.metaDescInput.addEventListener("input", (e) => {
    state.metaDesc = e.target.value;
    updateCalculations();
    markUnsaved();
  });

  el.contentInput.addEventListener("input", (e) => {
    state.content = e.target.value;
    updateCalculations();
    markUnsaved();
  });

  // Author & Byline
  el.authorSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    state.authorType = val;
    if (val === "custom") {
      el.customAuthorGroup.style.display = "block";
      state.authorName = el.customAuthorName.value || "Staff Writer";
      state.authorRole = el.customAuthorRole.value || "Editorial Staff";
    } else {
      el.customAuthorGroup.style.display = "none";
      state.authorName = val;
      state.authorRole = "Editorial Team";
    }
    updateTimestamp();
    markUnsaved();
  });

  if (el.customAuthorName) {
    el.customAuthorName.addEventListener("input", (e) => {
      state.authorName = e.target.value;
      updateTimestamp();
      markUnsaved();
    });
  }

  if (el.customAuthorRole) {
    el.customAuthorRole.addEventListener("input", (e) => {
      state.authorRole = e.target.value;
      updateTimestamp();
      markUnsaved();
    });
  }

  el.timestampModeSelect.addEventListener("change", (e) => {
    state.timestampMode = e.target.value;
    if (state.timestampMode === "custom") {
      el.customTimestampGroup.style.display = "block";
    } else {
      el.customTimestampGroup.style.display = "none";
    }
    updateTimestamp();
    markUnsaved();
  });

  if (el.customDatetimeInput) {
    el.customDatetimeInput.addEventListener("input", () => {
      updateTimestamp();
      markUnsaved();
    });
  }

  // Cover Image
  el.btnImgModeLocal.addEventListener("click", () => {
    el.btnImgModeLocal.classList.add("active");
    el.btnImgModeUrl.classList.remove("active");
    el.coverDropArea.style.display = "block";
    el.coverUrlInputWrap.style.display = "none";
  });

  el.btnImgModeUrl.addEventListener("click", () => {
    el.btnImgModeUrl.classList.add("active");
    el.btnImgModeLocal.classList.remove("active");
    el.coverDropArea.style.display = "none";
    el.coverUrlInputWrap.style.display = "block";
  });

  el.btnOpenUnsplash.addEventListener("click", () => {
    el.modalUnsplash.classList.add("active");
  });

  el.coverDropArea.addEventListener("click", () => el.coverFileInput.click());
  el.coverFileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleCoverFileUpload(e.target.files[0]);
    }
  });

  el.coverImgInput.addEventListener("input", (e) => {
    state.coverImage = e.target.value.trim();
    updateCoverPreview();
    markUnsaved();
  });

  el.coverCaptionInput.addEventListener("input", (e) => {
    state.coverCaption = e.target.value.trim();
    markUnsaved();
  });

  el.btnRemoveCoverImg.addEventListener("click", () => {
    state.coverImage = "";
    state.coverFileName = "";
    state.coverFileSize = "";
    el.coverImgInput.value = "";
    el.coverFileInput.value = "";
    updateCoverPreview();
    markUnsaved();
  });

  // Existing Article Dropdown Selector
  el.existingArticleSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "new") {
      createNewArticle();
    } else {
      loadArticleFromPath(val);
    }
  });

  el.btnViewCurrentLive.addEventListener("click", () => {
    if (state.activeArticleUrl) {
      window.open(state.activeArticleUrl.replace("index.html", ""), "_blank");
    }
  });

  el.btnDeleteCurrentArticle.addEventListener("click", () => {
    if (state.activeArticleUrl) {
      const art = articleRegistry.find(a => a.path === state.activeArticleUrl);
      if (art) promptDeleteArticle(art);
    }
  });

  el.btnSwitchToLibrary.addEventListener("click", () => switchTab("library"));
  el.btnRefreshLibrary.addEventListener("click", renderArticlesLibrary);
  el.btnLibraryNewPost.addEventListener("click", () => {
    createNewArticle();
    switchTab("editor");
  });

  // Library Search & Filter
  el.librarySearchInput.addEventListener("input", renderArticlesLibrary);
  el.filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      el.filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      renderArticlesLibrary();
    });
  });

  // Preview Viewports
  el.viewportBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      el.viewportBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      el.previewFrame.style.width = btn.dataset.width;
    });
  });

  // SERP Mobile vs Desktop Switcher
  if (el.btnSerpDesktop && el.btnSerpMobile) {
    el.btnSerpDesktop.addEventListener("click", () => {
      el.btnSerpDesktop.classList.add("active");
      el.btnSerpMobile.classList.remove("active");
      el.serpBox.classList.remove("mobile-mode");
    });
    el.btnSerpMobile.addEventListener("click", () => {
      el.btnSerpMobile.classList.add("active");
      el.btnSerpDesktop.classList.remove("active");
      el.serpBox.classList.add("mobile-mode");
    });
  }

  // Schema Copy
  if (el.btnCopySchema) {
    el.btnCopySchema.addEventListener("click", () => {
      navigator.clipboard.writeText(el.schemaCode.textContent).then(() => {
        alert("Schema.org JSON-LD copied to clipboard.");
      });
    });
  }

  // GitHub Token & Live Publish
  if (el.githubTokenInput && state.githubToken) {
    el.githubTokenInput.value = state.githubToken;
  }

  el.btnSaveToken.addEventListener("click", () => {
    const token = el.githubTokenInput.value.trim();
    localStorage.setItem("khc_github_token", token);
    state.githubToken = token;
    alert("GitHub token saved securely on this device.");
  });

  el.btnPublishLive.addEventListener("click", publishLiveToGitHub);
  el.btnDownloadHtml.addEventListener("click", downloadHtmlFile);
  el.btnCopyHtml.addEventListener("click", copyFullHtml);
  el.btnCopySitemap.addEventListener("click", copySitemap);

  // Export Modal Tools
  document.getElementById("btn-export-html-modal").addEventListener("click", () => {
    el.modalExport.classList.remove("active");
    downloadHtmlFile();
  });
  document.getElementById("btn-export-md-modal").addEventListener("click", () => {
    el.modalExport.classList.remove("active");
    downloadMarkdownFile();
  });
  document.getElementById("btn-export-json-modal").addEventListener("click", () => {
    el.modalExport.classList.remove("active");
    exportDraftJson();
  });
  document.getElementById("btn-import-json-modal").addEventListener("click", () => {
    document.getElementById("import-json-input").click();
  });
  document.getElementById("import-json-input").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importDraftJson(e.target.files[0]);
    }
  });

  // Banner & Catalog Handlers
  el.bannerPillText.addEventListener("input", (e) => el.previewBannerPill.textContent = e.target.value);
  el.bannerMessageText.addEventListener("input", (e) => el.previewBannerMsg.textContent = e.target.value);
  el.btnSaveBanner.addEventListener("click", () => {
    alert("Announcement banner saved locally. Test live banner on localhost:3000!");
  });
  el.btnSaveCatalogDeals.addEventListener("click", () => {
    alert("Live product pricing and deals updated locally.");
  });

  // Delete Action Confirm
  el.btnConfirmDeleteAction.addEventListener("click", () => {
    if (pendingDeleteTarget) {
      deleteArticleLive(pendingDeleteTarget);
      el.modalDeleteConfirm.classList.remove("active");
      pendingDeleteTarget = null;
    }
  });

  // Modals & Toolbar Buttons
  setupToolbarButtons();
  setupModals();
}

function updateMobileBottomNav(activeItem) {
  [el.btnMobileNavCanvas, el.btnMobileNavSettings, el.btnMobileNavPreview].forEach(b => {
    if (b) b.classList.remove("active");
  });
  if (activeItem === "canvas" && el.btnMobileNavCanvas) el.btnMobileNavCanvas.classList.add("active");
  if (activeItem === "settings" && el.btnMobileNavSettings) el.btnMobileNavSettings.classList.add("active");
  if (activeItem === "preview" && el.btnMobileNavPreview) el.btnMobileNavPreview.classList.add("active");
}

function switchTab(tabId) {
  el.tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  el.tabViews.forEach(view => {
    view.classList.toggle("active", view.id === `view-${tabId}`);
  });

  if (tabId === "preview") renderLivePreview();
  if (tabId === "seo") renderSeoInspector();
  if (tabId === "publish") renderPublishData();
}

function setArticleType(type) {
  state.articleType = type;
  const isNews = type === "news";
  if (el.channelHint) {
    el.channelHint.innerHTML = isNews
      ? "Publishes to <code>/news/[slug]/</code> with semiconductor/standards tags and primary source citations."
      : "Publishes to <code>/blog/[slug]/</code> with affiliate card support and editorial breadcrumbs.";
  }
  if (el.sheetTypePill) {
    el.sheetTypePill.textContent = isNews ? "Tech News" : (state.tag || "Buying Guide");
  }
  updateCalculations();
  markUnsaved();
}

// Markdown to HTML Parser
function parseMarkdownToHtml(md) {
  let html = md;

  // 1. Key Takeaways
  html = html.replace(/<!-- KEY_TAKEAWAYS:\s*(\[.*?\])\s*-->/g, (match, jsonStr) => {
    try {
      const items = JSON.parse(jsonStr);
      if (!items || !items.length) return "";
      let liHtml = items.map(it => `<li>${it}</li>`).join("");
      return `
        <div class="post-callout-card" style="background: #F8FAFC; border-left: 4px solid var(--accent-color); padding: 18px 24px;">
          <h4 style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
            ⚡ Key Takeaways
          </h4>
          <ul style="padding-left: 20px; margin: 0; line-height: 1.7; color: var(--text-secondary); font-size: 14.5px;">
            ${liHtml}
          </ul>
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // 2. Product Callouts
  html = html.replace(/<!-- PRODUCT_CALLOUT:\s*(\{.*?\})\s*-->/g, (match, jsonStr) => {
    try {
      const p = JSON.parse(jsonStr);
      const agencyName = p.agency || "Amazon India";
      const ctaText = p.cta || `Check Price on ${agencyName} &rarr;`;
      return `
        <div class="post-callout-card">
          <div class="post-callout-grid">
            <img src="${p.image}" alt="${p.name}" class="post-callout-img" loading="lazy">
            <div class="post-callout-meta">
              <span style="font-family: var(--font-heading); font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-color); margin-bottom: 4px; display: block;">
                ${agencyName} Verified
              </span>
              <h4>${p.name}</h4>
              <p>${p.desc}</p>
              <div class="post-callout-pricing">
                <span class="price">${p.price}</span>
                ${p.oldPrice ? `<span class="old-price">${p.oldPrice}</span>` : ""}
                ${p.discount ? `<span class="discount">${p.discount}</span>` : ""}
              </div>
              <a href="${p.link}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary" style="display: inline-block;">
                ${ctaText}
              </a>
            </div>
          </div>
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // 3. Pros & Cons
  html = html.replace(/<!-- PROS_CONS:\s*(\{.*?\})\s*-->/g, (match, jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      const pros = data.pros || [];
      const cons = data.cons || [];
      return `
        <div class="post-pros-cons-box">
          <div class="pros-column">
            <h4>Pros</h4>
            <ul>${pros.map(p => `<li>${p}</li>`).join("")}</ul>
          </div>
          <div class="cons-column">
            <h4>Cons</h4>
            <ul>${cons.map(c => `<li>${c}</li>`).join("")}</ul>
          </div>
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // 4. FAQ Accordion
  html = html.replace(/<!-- FAQ_BLOCK:\s*(\[.*?\])\s*-->/g, (match, jsonStr) => {
    try {
      const faqs = JSON.parse(jsonStr);
      if (!faqs || !faqs.length) return "";
      const itemsHtml = faqs.map(f => `
        <details class="faq-item">
          <summary>${f.q}</summary>
          <div class="faq-answer"><p>${f.a}</p></div>
        </details>`).join("");
      return `
        <div class="post-faq-section">
          <h3 class="post-faq-title">Frequently Asked Questions</h3>
          ${itemsHtml}
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // 5. Pull Quote
  html = html.replace(/<!-- PULL_QUOTE:\s*(\{.*?\})\s*-->/g, (match, jsonStr) => {
    try {
      const q = JSON.parse(jsonStr);
      return `
        <figure class="post-pullquote">
          <blockquote class="pullquote-text">"${q.quote}"</blockquote>
          <figcaption class="pullquote-author">— ${q.speaker}${q.title ? `, ${q.title}` : ""}</figcaption>
        </figure>`;
    } catch (e) {
      return match;
    }
  });

  // 6. Callout Alert
  html = html.replace(/<!-- CALLOUT_BOX:\s*(\{.*?\})\s*-->/g, (match, jsonStr) => {
    try {
      const c = JSON.parse(jsonStr);
      return `
        <div class="post-callout-alert ${c.type || 'tip'}">
          <strong>${c.title || 'Notice'}:</strong> ${c.text || ''}
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // 7. Tables
  html = html.replace(/(\|.+?\|\n)+/g, (match) => {
    const rows = match.trim().split("\n");
    if (rows.length < 2) return match;
    let tableHtml = `<div class="compare-table-wrapper"><table class="compare-table"><thead><tr>`;
    const headers = rows[0].split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1);
    headers.forEach(h => { tableHtml += `<th>${h.trim()}</th>`; });
    tableHtml += `</tr></thead><tbody>`;

    for (let r = 2; r < rows.length; r++) {
      const cols = rows[r].split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1);
      tableHtml += `<tr>`;
      cols.forEach(c => {
        let text = c.trim().replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        tableHtml += `<td>${text}</td>`;
      });
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table></div>`;
    return tableHtml;
  });

  // 8. Headings
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");

  // 9. Formatting
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^---$/gim, "<hr class=\"post-divider\">");

  // 10. Blockquotes
  html = html.replace(/^> (.*$)/gim, "<blockquote><p>$1</p></blockquote>");

  // 11. Lists
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // 12. Paragraphs
  const blocks = html.split(/\n\s*\n/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return "";
    if (block.startsWith("<h2") || block.startsWith("<h3") || block.startsWith("<h4") || block.startsWith("<div") || block.startsWith("<figure") || block.startsWith("<blockquote") || block.startsWith("<ul") || block.startsWith("<table") || block.startsWith("<hr")) {
      return block;
    }
    return `<p>${block}</p>`;
  }).join("\n\n");

  return html;
}

// Generate Full Static HTML Page
function generateFullPageHtml() {
  const isNews = state.articleType === "news";
  const channelBase = isNews ? "news" : "blog";
  const channelTitle = isNews ? "Tech News" : "The Journal";
  const bodyContentHtml = parseMarkdownToHtml(state.content);

  // Extract FAQ schema if present
  let faqSchemaScript = "";
  const faqMatch = state.content.match(/<!-- FAQ_BLOCK:\s*(\[.*?\])\s*-->/);
  if (faqMatch) {
    try {
      const faqs = JSON.parse(faqMatch[1]);
      if (faqs && faqs.length) {
        const faqEntities = faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }));
        faqSchemaScript = `
  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ${JSON.stringify(faqEntities, null, 2)}
  }
  </script>`;
      }
    } catch (e) {}
  }

  const disclosureNotice = isNews ? `
      <!-- Editorial Independence Notice -->
      <aside class="post-inline-disclosure">
        <strong>Editorial Independence:</strong> KHC Finds Tech News maintains strict editorial independence. Reports are non-sponsored and verified against primary technical documentation and engineering disclosures.
      </aside>` : `
      <!-- Affiliate Disclosure Banner -->
      <aside class="post-inline-disclosure">
        <strong>Editorial & Affiliate Notice:</strong> When you purchase through verified retail partner links on this page, KHC Finds may earn an affiliate commission at zero additional cost to you. We evaluate every product independently using official technical specifications and verified pricing.
      </aside>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${state.title} — KHC Finds</title>
  <meta name="description" content="${state.metaDesc}">
  <link rel="canonical" href="https://khc-finds.vercel.app/${channelBase}/${state.slug}/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${state.title}">
  <meta property="og:description" content="${state.metaDesc}">
  <meta property="og:url" content="https://khc-finds.vercel.app/${channelBase}/${state.slug}/">
  <meta property="og:image" content="${state.coverImage || 'https://khc-finds.vercel.app/assets/storefront.png'}">
  <meta property="article:published_time" content="${state.pubDateIso}T09:00:00+05:30">
  <meta property="article:section" content="${state.category}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${state.title}">
  <meta name="twitter:description" content="${state.metaDesc}">
  <meta name="twitter:image" content="${state.coverImage || 'https://khc-finds.vercel.app/assets/storefront.png'}">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230F172A'/><text x='50%' y='68%' font-family='system-ui, sans-serif' font-weight='800' font-size='52' fill='%23FFFFFF' text-anchor='middle'>K</text></svg>">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="/style.css">

  <!-- Structured Data: Article Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://khc-finds.vercel.app/${channelBase}/${state.slug}/"
    },
    "headline": "${state.title}",
    "description": "${state.metaDesc}",
    "image": "${state.coverImage || 'https://khc-finds.vercel.app/assets/storefront.png'}",
    "datePublished": "${state.pubDateIso}T09:00:00+05:30",
    "author": {
      "@type": "Person",
      "name": "${state.authorName}",
      "jobTitle": "${state.authorRole}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KHC Finds",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khc-finds.vercel.app/assets/storefront.png"
      }
    }
  }
  </script>${faqSchemaScript}
</head>
<body>

  <!-- Sticky Header -->
  <header class="app-header">
    <div class="container nav-container">
      <a href="/" class="logo">KHC <span>Finds</span></a>

      <nav class="nav-menu" id="nav-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products/">Products</a></li>
          <li><a href="/blog/" ${!isNews ? 'class="active"' : ''}>Blog</a></li>
          <li><a href="/news/" ${isNews ? 'class="active"' : ''}>Tech News</a></li>
          <li><a href="/about/">About</a></li>
          <li><a href="/disclosure/">Disclosure</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Article Container -->
  <main class="container" style="padding-top: 32px; padding-bottom: 64px;">
    
    <article class="post-article-layout" style="max-width: 760px; margin: 0 auto;">
      
      <!-- Breadcrumb Navigation -->
      <nav class="post-breadcrumb" aria-label="Breadcrumb" style="font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
        <a href="/">Home</a> &gt; 
        <a href="/${channelBase}/">${channelTitle}</a> &gt; 
        <span>${state.category}</span>
      </nav>

      <!-- Post Header -->
      <header class="post-header">
        <span class="post-category-tag">${state.tag || state.category}</span>
        <h1 class="post-title">${state.title}</h1>
        ${state.subtitle ? `<p class="post-subtitle">${state.subtitle}</p>` : ""}
        
        <!-- Newsroom Byline & Time Bar -->
        <div class="post-meta-bar">
          <div class="post-meta-item">
            <span>By <strong>${state.authorName}</strong></span>
            ${state.authorRole && state.authorRole !== "Editorial Team" ? `<span style="font-size: 12px; color: var(--text-secondary); margin-left: 4px;">• ${state.authorRole}</span>` : ""}
          </div>
          <div class="post-meta-item">
            <span>•</span>
            <time datetime="${state.pubDateIso}">${state.pubDateFormatted}</time>
          </div>
          <div class="post-meta-item">
            <span>•</span>
            <span>${state.readTime}</span>
          </div>
          ${isNews ? `
          <div class="post-meta-item">
            <span>•</span>
            <span style="color: #10B981; font-weight: 600;">Verified Primary Source</span>
          </div>` : ""}
        </div>
      </header>

      ${disclosureNotice}

      <!-- Featured Image -->
      ${state.coverImage ? `
      <figure class="post-featured-media">
        <img src="${state.coverImage}" alt="${state.title}" loading="eager">
        ${state.coverCaption ? `<figcaption class="post-featured-caption">${state.coverCaption}</figcaption>` : ""}
      </figure>` : ""}

      <!-- Post Body Content -->
      <div class="post-content">
        ${bodyContentHtml}
      </div>

      <!-- Post Author Footer -->
      <footer class="post-author-footer" style="display: flex; gap: 16px; align-items: center; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; margin-top: 48px;">
        <div class="author-avatar" style="width: 50px; height: 50px; border-radius: 50%; background: #0F172A; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; flex-shrink: 0;">
          ${state.authorName ? state.authorName.charAt(0) : "K"}
        </div>
        <div class="author-info">
          <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700;">Written by ${state.authorName}</h4>
          <p style="margin: 0; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${state.authorRole || "Editorial Staff at KHC Finds"}. Documenting functional design, objective evaluations, and verified technical reporting.</p>
        </div>
      </footer>

    </article>
  </main>

  <!-- Global Footer -->
  <footer class="app-footer">
    <div class="container footer-content" style="display: flex; justify-content: space-between; align-items: center; padding: 32px 0;">
      <div class="footer-brand">
        <span class="footer-logo" style="font-weight: 800;">KHC <span>Finds</span></span>
        <p style="font-size: 12px; color: rgba(255,255,255,0.7); margin: 4px 0 0 0;">Curated discoveries engineered for clarity.</p>
      </div>
      <div class="footer-links" style="display: flex; gap: 16px; font-size: 13px;">
        <a href="/">Home</a>
        <a href="/products/">Products</a>
        <a href="/blog/">Blog</a>
        <a href="/news/">Tech News</a>
        <a href="/about/">About</a>
        <a href="/disclosure/">Disclosure</a>
      </div>
    </div>
  </footer>

  <script src="/nav.js"></script>
</body>
</html>`;
}

// Live Preview
function renderLivePreview() {
  let fullHtml = generateFullPageHtml();
  fullHtml = fullHtml.replace("<head>", `<head>\n  <base target="_blank">`);

  const iframe = el.previewFrame;
  if (!iframe) return;
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(fullHtml);
  doc.close();

  setTimeout(() => {
    try {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      innerDoc.querySelectorAll("a").forEach(a => {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
    } catch (e) {}
  }, 150);
}

// SEO & Social Inspector
function renderSeoInspector() {
  const channelBase = state.articleType === "news" ? "news" : "blog";
  el.serpTitle.textContent = `${state.title} — KHC Finds`;
  el.serpUrl.textContent = `https://khc-finds.vercel.app > ${channelBase} > ${state.slug}`;
  el.serpDesc.textContent = state.metaDesc || state.subtitle;

  if (el.socialPreviewTitle) el.socialPreviewTitle.textContent = state.title;
  if (el.socialPreviewDesc) el.socialPreviewDesc.textContent = state.metaDesc || state.subtitle;
  if (el.socialPreviewImg) el.socialPreviewImg.src = state.coverImage || "/assets/storefront.png";

  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": state.title,
    "description": state.metaDesc || state.subtitle,
    "image": state.coverImage || "https://khc-finds.vercel.app/assets/storefront.png",
    "datePublished": `${state.pubDateIso}T09:00:00+05:30`,
    "author": {
      "@type": "Person",
      "name": state.authorName,
      "jobTitle": state.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "KHC Finds",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khc-finds.vercel.app/assets/storefront.png"
      }
    }
  };

  el.schemaCode.textContent = JSON.stringify(schemaObj, null, 2);
  runSeoAuditor();
}

// SEO Readiness Health Auditor
function runSeoAuditor() {
  if (!el.seoCheckList) return;
  el.seoCheckList.innerHTML = "";

  let score = 100;
  const checks = [];

  // Check 1: Headline
  const tLen = state.title.length;
  if (tLen >= 35 && tLen <= 65) {
    checks.push({ status: "pass", label: `Headline length optimal (${tLen} chars)` });
  } else if (tLen < 35) {
    score -= 15;
    checks.push({ status: "warn", label: `Headline is short (${tLen} chars, aim for 35–65)` });
  } else {
    score -= 10;
    checks.push({ status: "warn", label: `Headline may truncate in SERP (${tLen} chars)` });
  }

  // Check 2: Meta description
  const mLen = state.metaDesc.length;
  if (mLen >= 120 && mLen <= 165) {
    checks.push({ status: "pass", label: `Meta description length optimal (${mLen} chars)` });
  } else if (mLen === 0) {
    score -= 25;
    checks.push({ status: "fail", label: `Meta description missing! Crucial for Google CTR.` });
  } else {
    score -= 10;
    checks.push({ status: "warn", label: `Meta description length (${mLen} chars, aim for 130–160)` });
  }

  // Check 3: Focus Keyword
  const kw = state.targetKeyword;
  if (kw) {
    const titleHas = state.title.toLowerCase().includes(kw);
    const bodyCount = (state.content.toLowerCase().match(new RegExp(kw, "g")) || []).length;
    if (titleHas && bodyCount >= 2) {
      checks.push({ status: "pass", label: `Focus keyword "${kw}" found in headline & body (${bodyCount}x)` });
    } else if (titleHas) {
      score -= 5;
      checks.push({ status: "warn", label: `Focus keyword found in headline, but low body density` });
    } else {
      score -= 15;
      checks.push({ status: "fail", label: `Focus keyword "${kw}" missing from headline` });
    }
  } else {
    checks.push({ status: "warn", label: `No focus keyword specified in story metadata` });
  }

  // Check 4: Cover Image
  if (state.coverImage) {
    checks.push({ status: "pass", label: `Cover image configured with high-res asset` });
  } else {
    score -= 15;
    checks.push({ status: "fail", label: `Missing featured cover image` });
  }

  // Check 5: Word count & depth
  const words = state.content.trim().split(/\s+/).length;
  if (words >= 400) {
    checks.push({ status: "pass", label: `Substantive editorial depth (${words} words)` });
  } else {
    score -= 10;
    checks.push({ status: "warn", label: `Short story length (${words} words, recommend 400+)` });
  }

  score = Math.max(0, Math.min(100, score));
  if (el.seoScoreCircle) el.seoScoreCircle.textContent = score;
  if (el.seoScoreVerdict) {
    el.seoScoreVerdict.textContent = score >= 85 ? "Excellent — Ready to Publish" : (score >= 65 ? "Good — Minor Improvements Suggested" : "Needs Attention Before Publishing");
  }

  checks.forEach(c => {
    const item = document.createElement("div");
    item.className = "seo-check-item";
    const symbol = c.status === "pass" ? "✓" : (c.status === "warn" ? "!" : "✕");
    item.innerHTML = `<span class="seo-check-icon ${c.status}">[${symbol}]</span><span>${c.label}</span>`;
    el.seoCheckList.appendChild(item);
  });
}

// Publish Data Snippet Render
function renderPublishData() {
  const channelBase = state.articleType === "news" ? "news" : "blog";
  const sitemapXml = `  <!-- ${state.title} -->
  <url>
    <loc>https://khc-finds.vercel.app/${channelBase}/${state.slug}/</loc>
    <lastmod>${state.pubDateIso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  el.sitemapSnippet.textContent = sitemapXml;
}

// GitHub REST API Publishing
function logConsole(msg, type = "normal") {
  const line = document.createElement("div");
  line.className = `console-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  el.publishConsole.appendChild(line);
  el.publishConsole.scrollTop = el.publishConsole.scrollHeight;
}

function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

async function publishLiveToGitHub() {
  const token = (el.githubTokenInput.value || state.githubToken).trim();
  if (!token) {
    alert("Please enter a GitHub Personal Access Token in the box above to publish live.");
    return;
  }

  el.publishConsole.innerHTML = "";
  logConsole("Initializing publishing pipeline...", "working");

  const isNews = state.articleType === "news";
  const channelBase = isNews ? "news" : "blog";
  const repoOwner = "abhisecodes";
  const repoName = "khc-finds";
  const branch = "main";
  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  try {
    // 0. Handle Local Cover Image Data URL Upload
    if (state.coverImage && state.coverImage.startsWith("data:")) {
      logConsole("Uploading local image to /assets/uploads/ on GitHub...", "working");
      try {
        const mimeMatch = state.coverImage.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (mimeMatch) {
          let ext = mimeMatch[1].toLowerCase().replace("jpeg", "jpg").replace("svg+xml", "svg");
          const imgFileName = `${state.slug}-cover.${ext}`;
          const imgRepoPath = `assets/uploads/${imgFileName}`;
          const base64Data = mimeMatch[2];

          let imgSha = null;
          try {
            const getImg = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imgRepoPath}?ref=${branch}`, { headers });
            if (getImg.ok) {
              const imgData = await getImg.json();
              imgSha = imgData.sha;
            }
          } catch (e) {}

          const putImgRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imgRepoPath}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `chore(media): upload cover image for '${state.slug}'`,
              content: base64Data,
              branch,
              ...(imgSha ? { sha: imgSha } : {})
            })
          });

          if (putImgRes.ok) {
            state.coverImage = `/${imgRepoPath}`;
            logConsole(`[OK] Local cover image uploaded to /${imgRepoPath}.`, "success");
          }
        }
      } catch (imgErr) {
        logConsole(`Image upload warning: ${imgErr.message}`, "working");
      }
    }

    // 1. Commit article static HTML file
    const articlePath = `${channelBase}/${state.slug}/index.html`;
    logConsole(`Generating static HTML for: ${articlePath}...`, "working");
    const articleHtml = generateFullPageHtml();

    let existingSha = null;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlePath}?ref=${branch}`, { headers });
      if (getRes.ok) {
        const getData = await getRes.json();
        existingSha = getData.sha;
      }
    } catch (e) {}

    logConsole(`Pushing ${articlePath} to GitHub branch '${branch}'...`, "working");
    const putArticleRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlePath}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `feat(${channelBase}): publish '${state.title}' by ${state.authorName}`,
        content: utf8ToBase64(articleHtml),
        branch,
        ...(existingSha ? { sha: existingSha } : {})
      })
    });

    if (!putArticleRes.ok) {
      const errData = await putArticleRes.json();
      throw new Error(`Failed to commit article: ${errData.message || putArticleRes.statusText}`);
    }
    logConsole(`[OK] Article HTML committed successfully.`, "success");

    // 2. Update sitemap.xml
    logConsole("Updating sitemap.xml with canonical URL...", "working");
    try {
      const sitemapRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml?ref=${branch}`, { headers });
      if (sitemapRes.ok) {
        const sitemapData = await sitemapRes.json();
        let sitemapText = base64ToUtf8(sitemapData.content);
        const articleUrl = `https://khc-finds.vercel.app/${channelBase}/${state.slug}/`;

        if (!sitemapText.includes(articleUrl)) {
          const newUrlXml = `  <!-- ${state.title} -->\n  <url>\n    <loc>${articleUrl}</loc>\n    <lastmod>${state.pubDateIso}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;
          sitemapText = sitemapText.replace("</urlset>", newUrlXml);

          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `chore(sitemap): register /${channelBase}/${state.slug}/`,
              content: utf8ToBase64(sitemapText),
              sha: sitemapData.sha,
              branch
            })
          });
          logConsole("[OK] sitemap.xml updated and committed.", "success");
        } else {
          logConsole("[Notice] URL already in sitemap.xml, skipping duplicate.", "working");
        }
      }
    } catch (err) {
      logConsole(`Warning on sitemap: ${err.message}`, "working");
    }

    // 3. Update catalog index.html feed
    const catalogPath = `${channelBase}/index.html`;
    const targetGridId = isNews ? 'news-grid' : 'blog-grid';
    logConsole(`Registering article card in /${channelBase}/ feed...`, "working");

    try {
      const catalogRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${catalogPath}?ref=${branch}`, { headers });
      if (catalogRes.ok) {
        const catalogData = await catalogRes.json();
        let catalogText = base64ToUtf8(catalogData.content);
        const articleLink = `/${channelBase}/${state.slug}/`;

        if (!catalogText.includes(articleLink)) {
          const cardHtml = `
        <!-- ${state.title} -->
        <a href="/${channelBase}/${state.slug}/" class="article-card">
          <div class="article-thumb-wrap">
            <span class="article-pill">${state.tag || state.category}</span>
            <img src="${state.coverImage || '/assets/storefront.png'}" alt="${state.title}" loading="lazy">
          </div>
          <div class="article-card-body">
            <div class="article-meta">
              <span>By ${state.authorName}</span>
              <span>•</span>
              <span>${state.readTime}</span>
            </div>
            <h2 class="article-card-title">${state.title}</h2>
            <p class="article-card-excerpt">${state.subtitle || state.metaDesc}</p>
            <div class="article-card-action">
              <span>${isNews ? 'Read Full Report' : 'Read Guide'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>\n`;

          catalogText = catalogText.replace(`<div class="articles-grid" id="${targetGridId}">`, `<div class="articles-grid" id="${targetGridId}">${cardHtml}`);

          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${catalogPath}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `feat(${channelBase}): register '${state.title}' on feed catalog`,
              content: utf8ToBase64(catalogText),
              sha: catalogData.sha,
              branch
            })
          });
          logConsole(`[OK] ${catalogPath} feed updated with new article card.`, "success");
        }
      }
    } catch (err) {
      logConsole(`Warning on catalog feed: ${err.message}`, "working");
    }

    // 4. Update Article Registry
    const publishedPath = `/${channelBase}/${state.slug}/index.html`;
    const existingIndex = articleRegistry.findIndex(a => a.path === publishedPath || a.slug === state.slug);
    const newEntry = {
      title: state.title,
      slug: state.slug,
      type: state.articleType,
      category: state.category,
      tag: state.tag,
      path: publishedPath,
      date: "Just now",
      readTime: state.readTime,
      sourceBadge: "Newsroom CMS",
      cover: state.coverImage || "/assets/storefront.png"
    };

    if (existingIndex >= 0) {
      articleRegistry[existingIndex] = newEntry;
    } else {
      articleRegistry.unshift(newEntry);
    }
    saveArticleRegistry();
    populateArticleDropdowns();
    renderArticlesLibrary();

    state.activeArticleUrl = publishedPath;
    if (el.existingArticleSelect) el.existingArticleSelect.value = publishedPath;
    if (el.btnViewCurrentLive) el.btnViewCurrentLive.disabled = false;
    if (el.btnDeleteCurrentArticle) el.btnDeleteCurrentArticle.disabled = false;

    logConsole(`[SUCCESS] Published to GitHub! Vercel is building live (~30s).`, "success");
    logConsole(`Live URL: https://khc-finds.vercel.app/${channelBase}/${state.slug}/`, "success");
    alert(`Article published successfully.\n\nLive URL (ready in ~30s):\nhttps://khc-finds.vercel.app/${channelBase}/${state.slug}/`);

  } catch (error) {
    logConsole(`[Error] Publishing failed: ${error.message}`, "error");
    alert(`Publishing Error: ${error.message}`);
  }
}

// Format Newsroom Timestamp
function updateTimestamp() {
  let targetDate = new Date();
  if (state.timestampMode === "custom" && el.customDatetimeInput && el.customDatetimeInput.value) {
    targetDate = new Date(el.customDatetimeInput.value);
  }

  const dateStr = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = targetDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  state.pubDateFormatted = `Published ${dateStr} • ${timeStr} IST`;
  state.pubDateIso = targetDate.toISOString().split("T")[0];

  if (el.formattedBylinePreview) {
    el.formattedBylinePreview.innerHTML = `By <strong>${state.authorName}</strong> ${state.authorRole ? `(${state.authorRole})` : ""} • ${dateStr} • ${timeStr} IST`;
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function calculateFleschScore(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 10) return { score: 70, label: "Readability: Standard" };
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  const score = Math.round(206.835 - (1.015 * (words.length / sentences)) - (84.6 * (syllables / words.length)));
  let label = "Readability: Standard";
  if (score >= 80) label = "Readability: Very Easy";
  else if (score >= 60) label = "Readability: Plain English";
  else if (score >= 40) label = "Readability: Technical / Complex";
  else label = "Readability: Highly Academic";
  return { score, label };
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function updateCalculations() {
  const words = state.content.trim() ? state.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  state.readTime = `${minutes} min read`;

  if (el.statWords) el.statWords.textContent = `${words} words`;
  if (el.statReadTime) el.statReadTime.textContent = state.readTime;

  const readability = calculateFleschScore(state.content);
  if (el.statReadability) el.statReadability.textContent = readability.label;

  const channelBase = state.articleType === "news" ? "news" : "blog";
  const slugPath = `/${channelBase}/${state.slug || "..."}/`;
  if (el.slugPreview) el.slugPreview.textContent = `https://khc-finds.vercel.app${slugPath}`;
  if (el.sheetSlugPill) el.sheetSlugPill.textContent = slugPath;

  // Title Counter
  const titleLen = state.title.length;
  if (el.titleCounter) {
    el.titleCounter.textContent = `${titleLen} / 60`;
    el.titleCounter.className = `counter ${titleLen >= 30 && titleLen <= 65 ? "good" : "warn"}`;
  }

  // Meta Counter
  const metaLen = state.metaDesc.length;
  if (el.metaCounter) {
    el.metaCounter.textContent = `${metaLen} / 160`;
    el.metaCounter.className = `counter ${metaLen >= 120 && metaLen <= 165 ? "good" : "warn"}`;
  }

  runSeoAuditor();
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function handleCoverFileUpload(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file (PNG, JPG, WebP, SVG, GIF).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    state.coverImage = e.target.result;
    state.coverFileName = file.name;
    state.coverFileSize = formatBytes(file.size);

    if (el.coverFileName) el.coverFileName.textContent = file.name;
    if (el.coverFileSize) el.coverFileSize.textContent = formatBytes(file.size);
    if (el.coverImageInfo) el.coverImageInfo.style.display = "flex";
    if (el.coverImgInput) el.coverImgInput.value = file.name;

    updateCoverPreview();
    markUnsaved();
  };
  reader.readAsDataURL(file);
}

function updateCoverPreview() {
  const hasImg = state.coverImage && (
    state.coverImage.startsWith("http") || 
    state.coverImage.startsWith("data:") || 
    state.coverImage.startsWith("/")
  );

  if (hasImg) {
    el.coverPreviewImg.src = state.coverImage;
    el.coverPreviewImg.style.display = "block";
    el.coverPlaceholder.style.display = "none";
    if (el.coverImageInfo && (state.coverFileName || state.coverImage.length > 50)) {
      if (el.coverFileName) el.coverFileName.textContent = state.coverFileName || "cover-image";
      if (el.coverFileSize) el.coverFileSize.textContent = state.coverFileSize || "Ready";
      el.coverImageInfo.style.display = "flex";
    }
  } else {
    el.coverPreviewImg.style.display = "none";
    el.coverPlaceholder.style.display = "flex";
    if (el.coverImageInfo) el.coverImageInfo.style.display = "none";
  }
}

// Unsplash Curated Stock Photo Picker
function renderUnsplashPicker() {
  if (!el.unsplashGrid) return;
  el.unsplashGrid.innerHTML = "";
  curatedStockPhotos.forEach(photo => {
    const item = document.createElement("div");
    item.className = "unsplash-thumb-item";
    item.innerHTML = `<img src="${photo.url}" alt="${photo.title}"><span class="unsplash-caption">${photo.title}</span>`;
    item.addEventListener("click", () => {
      state.coverImage = photo.url;
      state.coverFileName = photo.title;
      state.coverFileSize = "Unsplash CDN";
      if (el.coverImgInput) el.coverImgInput.value = photo.url;
      updateCoverPreview();
      el.modalUnsplash.classList.remove("active");
      markUnsaved();
    });
    el.unsplashGrid.appendChild(item);
  });
}

// Revision History Auto-Snapshots
function startAutoSnapshots() {
  setInterval(() => {
    saveRevisionSnapshot(false);
  }, 30000);
}

function saveRevisionSnapshot(manual = false) {
  const revisions = JSON.parse(localStorage.getItem("khc_editorial_revisions") || "[]");
  const words = state.content.trim().split(/\s+/).filter(Boolean).length;
  const snapshot = {
    timestamp: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    title: state.title,
    words,
    state: JSON.parse(JSON.stringify(state))
  };

  revisions.unshift(snapshot);
  if (revisions.length > 10) revisions.pop();
  localStorage.setItem("khc_editorial_revisions", JSON.stringify(revisions));
}

function openRevisionsModal() {
  const revisions = JSON.parse(localStorage.getItem("khc_editorial_revisions") || "[]");
  if (!el.revisionsList) return;
  el.revisionsList.innerHTML = "";

  if (!revisions.length) {
    el.revisionsList.innerHTML = `<p style="font-size: 13px; color: #64748B; text-align: center; padding: 20px;">No auto-saved revisions yet. They will appear here automatically every 30 seconds.</p>`;
  } else {
    revisions.forEach((rev, idx) => {
      const item = document.createElement("div");
      item.className = "revision-item";
      item.innerHTML = `
        <div class="revision-info">
          <span class="revision-time">${rev.date} • ${rev.timestamp}</span>
          <span class="revision-meta">${rev.title.slice(0, 45)}... • ${rev.words} words</span>
        </div>
        <button type="button" class="btn btn-action btn-xs" data-idx="${idx}">Restore</button>
      `;
      item.querySelector("button").addEventListener("click", () => {
        if (confirm(`Restore revision from ${rev.timestamp}? Any unsaved work will be overwritten.`)) {
          Object.assign(state, rev.state);
          loadStateIntoUi();
          el.modalRevisions.classList.remove("active");
          markSaved("Revision restored");
        }
      });
      el.revisionsList.appendChild(item);
    });
  }

  el.modalRevisions.classList.add("active");
}

// Formatting Toolbar
function setupToolbarButtons() {
  document.querySelectorAll(".tool-btn[data-cmd]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.dataset.cmd;
      insertFormatting(cmd);
    });
  });
}

function insertFormatting(cmd) {
  const textarea = el.contentInput;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);

  let prefix = "";
  let suffix = "";

  switch (cmd) {
    case "h2": prefix = "\n## "; suffix = "\n"; break;
    case "h3": prefix = "\n### "; suffix = "\n"; break;
    case "h4": prefix = "\n#### "; suffix = "\n"; break;
    case "bold": prefix = "**"; suffix = "**"; break;
    case "italic": prefix = "*"; suffix = "*"; break;
    case "strike": prefix = "~~"; suffix = "~~"; break;
    case "code": prefix = "`"; suffix = "`"; break;
    case "quote": prefix = "\n> "; suffix = "\n"; break;
    case "ul": prefix = "\n- "; suffix = "\n"; break;
    case "ol": prefix = "\n1. "; suffix = "\n"; break;
    case "hr": prefix = "\n\n---\n\n"; suffix = ""; break;
    case "table": 
      prefix = `\n| Key Parameter | Top Pick | Runner-Up |\n| :--- | :--- | :--- |\n| **Rating / Tier** | Editor's Choice | Best Value |\n| **Offer Price** | ₹2,899 | ₹2,299 |\n| **Warranty** | 1 Year Replacement | 1 Year Standard |\n\n`;
      suffix = "";
      break;
  }

  const replacement = prefix + (selected || "Text") + suffix;
  textarea.setRangeText(replacement, start, end, "end");
  state.content = textarea.value;
  updateCalculations();
  markUnsaved();
  textarea.focus();
}

function setupModals() {
  // Open modal buttons
  el.btnOpenProductModal.addEventListener("click", () => el.modalProduct.classList.add("active"));
  el.btnOpenVerdictModal.addEventListener("click", () => el.modalVerdict.classList.add("active"));
  el.btnOpenTakeawaysModal.addEventListener("click", () => el.modalTakeaways.classList.add("active"));
  el.btnOpenProsConsModal.addEventListener("click", () => el.modalProsCons.classList.add("active"));
  el.btnOpenFaqModal.addEventListener("click", () => el.modalFaq.classList.add("active"));
  el.btnOpenQuoteModal.addEventListener("click", () => el.modalQuote.classList.add("active"));
  el.btnOpenCalloutModal.addEventListener("click", () => el.modalCallout.classList.add("active"));

  // Agency Chips Selection
  document.querySelectorAll(".agency-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".agency-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedAgency = chip.dataset.agency;
      document.getElementById("prod-cta").value = chip.dataset.cta;
    });
  });

  // Close modals
  document.querySelectorAll(".modal-close-btn, .modal-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    });
  });

  // Modal Product Confirm
  el.insertProductConfirm.addEventListener("click", () => {
    const data = {
      name: document.getElementById("prod-name").value.trim() || "Product Name",
      agency: state.selectedAgency || "Amazon India",
      desc: document.getElementById("prod-desc").value.trim() || "Key features and performance summary.",
      price: document.getElementById("prod-price").value.trim() || "₹2,899",
      oldPrice: document.getElementById("prod-oldprice").value.trim() || "₹4,499",
      discount: document.getElementById("prod-discount").value.trim() || "36% OFF",
      link: document.getElementById("prod-link").value.trim() || "https://amazon.in/",
      cta: document.getElementById("prod-cta").value.trim() || "Check Price on Amazon &rarr;",
      image: document.getElementById("prod-img").value.trim() || state.coverImage
    };
    insertRawSnippet(`\n<!-- PRODUCT_CALLOUT: ${JSON.stringify(data)} -->\n`);
    el.modalProduct.classList.remove("active");
  });

  // Modal Takeaways Confirm
  el.insertTakeawaysConfirm.addEventListener("click", () => {
    const h1 = document.getElementById("takeaway-1").value.trim();
    const h2 = document.getElementById("takeaway-2").value.trim();
    const h3 = document.getElementById("takeaway-3").value.trim();
    const list = [h1, h2, h3].filter(Boolean);
    insertRawSnippet(`\n<!-- KEY_TAKEAWAYS: ${JSON.stringify(list)} -->\n`);
    el.modalTakeaways.classList.remove("active");
  });

  // Modal Pros & Cons Confirm
  el.insertProsConsConfirm.addEventListener("click", () => {
    const pros = document.getElementById("pros-input").value.split("\n").map(s => s.trim()).filter(Boolean);
    const cons = document.getElementById("cons-input").value.split("\n").map(s => s.trim()).filter(Boolean);
    insertRawSnippet(`\n<!-- PROS_CONS: ${JSON.stringify({ pros, cons })} -->\n`);
    el.modalProsCons.classList.remove("active");
  });

  // Modal FAQ Confirm
  el.insertFaqConfirm.addEventListener("click", () => {
    const q1 = document.getElementById("faq-q1").value.trim();
    const a1 = document.getElementById("faq-a1").value.trim();
    const q2 = document.getElementById("faq-q2").value.trim();
    const a2 = document.getElementById("faq-a2").value.trim();
    const q3 = document.getElementById("faq-q3").value.trim();
    const a3 = document.getElementById("faq-a3").value.trim();

    const list = [];
    if (q1 && a1) list.push({ q: q1, a: a1 });
    if (q2 && a2) list.push({ q: q2, a: a2 });
    if (q3 && a3) list.push({ q: q3, a: a3 });

    insertRawSnippet(`\n<!-- FAQ_BLOCK: ${JSON.stringify(list)} -->\n`);
    el.modalFaq.classList.remove("active");
  });

  // Modal Quote Confirm
  el.insertQuoteConfirm.addEventListener("click", () => {
    const quote = document.getElementById("quote-text").value.trim() || "Statement goes here.";
    const speaker = document.getElementById("quote-author").value.trim() || state.authorName;
    const title = document.getElementById("quote-role").value.trim() || state.authorRole;
    insertRawSnippet(`\n<!-- PULL_QUOTE: ${JSON.stringify({ quote, speaker, title })} -->\n`);
    el.modalQuote.classList.remove("active");
  });

  // Modal Callout Confirm
  el.insertCalloutConfirm.addEventListener("click", () => {
    const type = document.getElementById("callout-type").value;
    const title = document.getElementById("callout-title").value.trim() || "Notice";
    const text = document.getElementById("callout-text").value.trim() || "Important information.";
    insertRawSnippet(`\n<!-- CALLOUT_BOX: ${JSON.stringify({ type, title, text })} -->\n`);
    el.modalCallout.classList.remove("active");
  });

  // Modal Verdict Confirm
  el.insertVerdictConfirm.addEventListener("click", () => {
    const badge = document.getElementById("verdict-badge").value.trim() || "Our Verdict";
    const text = document.getElementById("verdict-text").value.trim() || "Summary evaluation.";
    insertRawSnippet(`\n> **${badge}**: ${text}\n`);
    el.modalVerdict.classList.remove("active");
  });
}

function insertRawSnippet(text) {
  const textarea = el.contentInput;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.setRangeText(text, start, end, "end");
  state.content = textarea.value;
  updateCalculations();
  markUnsaved();
  textarea.focus();
}

// Article Registry Population & Dropdowns
function populateArticleDropdowns() {
  if (!el.optgroupNews || !el.optgroupBlog) return;
  el.optgroupNews.innerHTML = "";
  el.optgroupBlog.innerHTML = "";

  articleRegistry.forEach(art => {
    const opt = document.createElement("option");
    opt.value = art.path;
    opt.textContent = art.title;
    if (art.type === "news") {
      el.optgroupNews.appendChild(opt);
    } else {
      el.optgroupBlog.appendChild(opt);
    }
  });

  if (state.activeArticleUrl) {
    el.existingArticleSelect.value = state.activeArticleUrl;
    el.btnViewCurrentLive.disabled = false;
    el.btnDeleteCurrentArticle.disabled = false;
  }
}

function renderArticlesLibrary() {
  if (!el.libraryArticlesContainer) return;
  el.libraryArticlesContainer.innerHTML = "";

  const query = (el.librarySearchInput ? el.librarySearchInput.value : "").trim().toLowerCase();
  const activeFilterBtn = document.querySelector(".filter-pill.active");
  const filterType = activeFilterBtn ? activeFilterBtn.dataset.filter : "all";

  const filtered = articleRegistry.filter(art => {
    const matchesFilter = filterType === "all" || art.type === filterType;
    const matchesQuery = !query || 
      art.title.toLowerCase().includes(query) || 
      (art.category && art.category.toLowerCase().includes(query)) ||
      (art.tag && art.tag.toLowerCase().includes(query)) ||
      art.slug.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  filtered.forEach(art => {
    const card = document.createElement("div");
    card.className = "library-card";
    const coverUrl = art.cover || (art.type === 'news' ? '/assets/storefront.png' : '/assets/products/samsung-43-miniled-tv.jpg');
    
    card.innerHTML = `
      <div class="library-card-thumb-wrap">
        <img src="${coverUrl}" alt="${art.title}" loading="lazy">
        <span class="library-card-pill">${art.tag || art.category}</span>
        ${art.sourceBadge ? `<span class="library-cms-source-badge">${art.sourceBadge}</span>` : ""}
      </div>
      <div class="library-card-body">
        <div class="library-card-meta">
          <span>${art.date}</span>
          <span>•</span>
          <span>${art.readTime}</span>
        </div>
        <h4 class="library-card-title">${art.title}</h4>
        <div class="library-card-footer">
          <button type="button" class="btn btn-action btn-xs btn-load-article" data-path="${art.path}">Edit in Studio</button>
          <a href="${art.path.replace('index.html', '')}" target="_blank" class="btn btn-action btn-xs">View Live &rarr;</a>
          <button type="button" class="btn btn-danger btn-xs btn-delete-article" data-slug="${art.slug}">Delete</button>
        </div>
      </div>
    `;

    card.querySelector(".btn-load-article").addEventListener("click", () => {
      loadArticleFromPath(art.path);
      switchTab("editor");
    });

    card.querySelector(".btn-delete-article").addEventListener("click", () => {
      promptDeleteArticle(art);
    });

    el.libraryArticlesContainer.appendChild(card);
  });
}

function promptDeleteArticle(art) {
  pendingDeleteTarget = art;
  el.deleteTargetTitle.textContent = art.title;
  el.deleteTargetPath.textContent = art.path;
  el.modalDeleteConfirm.classList.add("active");
}

async function deleteArticleLive(art) {
  const token = (el.githubTokenInput.value || state.githubToken).trim();
  if (!token) {
    alert("Please enter a GitHub Personal Access Token in the 'Deploy & Publish' tab to authenticate deletion.");
    switchTab("publish");
    return;
  }

  el.publishConsole.innerHTML = "";
  logConsole(`Initiating live deletion for: ${art.title}...`, "working");

  const repoOwner = "abhisecodes";
  const repoName = "khc-finds";
  const branch = "main";
  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  try {
    // 1. Delete static file from GitHub
    const repoFilePath = art.path.replace(/^\//, "");
    logConsole(`Checking GitHub file: ${repoFilePath}...`, "working");

    const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoFilePath}?ref=${branch}`, { headers });
    if (getRes.ok) {
      const fileData = await getRes.json();
      logConsole(`Removing ${repoFilePath} from GitHub repo...`, "working");
      const delRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoFilePath}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({
          message: `chore(${art.type}): delete '${art.title}' from live website`,
          sha: fileData.sha,
          branch
        })
      });
      if (delRes.ok) {
        logConsole(`[OK] Deleted static file ${repoFilePath}.`, "success");
      }
    }

    // 2. Remove card from catalog feed
    const catalogPath = `${art.type}/index.html`;
    try {
      const catRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${catalogPath}?ref=${branch}`, { headers });
      if (catRes.ok) {
        const catData = await catRes.json();
        let catText = base64ToUtf8(catData.content);
        const regex = new RegExp(`(\\s*<!--[\\s\\S]*?-->)?\\s*<a\\s+[^>]*href=["']\\/${art.type}\\/${art.slug}\\/["'][\\s\\S]*?<\\/a>`, 'i');
        if (regex.test(catText)) {
          catText = catText.replace(regex, "");
          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${catalogPath}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `chore(${art.type}): remove '${art.title}' card from catalog`,
              content: utf8ToBase64(catText),
              sha: catData.sha,
              branch
            })
          });
          logConsole(`[OK] Removed article card from ${catalogPath}.`, "success");
        }
      }
    } catch (e) {}

    // 3. Remove URL from sitemap.xml
    try {
      const siteRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml?ref=${branch}`, { headers });
      if (siteRes.ok) {
        const siteData = await siteRes.json();
        let siteText = base64ToUtf8(siteData.content);
        const urlRegex = new RegExp(`(\\s*<!--[\\s\\S]*?-->)?\\s*<url>\\s*<loc>https:\\/\\/khc-finds\\.vercel\\.app\\/${art.type}\\/${art.slug}\\/<\\/loc>[\\s\\S]*?<\\/url>`, 'i');
        if (urlRegex.test(siteText)) {
          siteText = siteText.replace(urlRegex, "");
          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `chore(sitemap): unregister /${art.type}/${art.slug}/`,
              content: utf8ToBase64(siteText),
              sha: siteData.sha,
              branch
            })
          });
          logConsole(`[OK] Unregistered URL from sitemap.xml.`, "success");
        }
      }
    } catch (e) {}

    // Remove from article registry
    articleRegistry = articleRegistry.filter(a => a.path !== art.path && a.slug !== art.slug);
    saveArticleRegistry();
    populateArticleDropdowns();
    renderArticlesLibrary();

    if (state.activeArticleUrl === art.path) {
      createNewArticle();
    }

    logConsole(`[SUCCESS] Article '${art.title}' deleted from GitHub & Vercel (~30s).`, "success");
    alert(`Article '${art.title}' deleted successfully.`);

  } catch (error) {
    logConsole(`[Error] Deletion failed: ${error.message}`, "error");
    alert(`Deletion Error: ${error.message}`);
  }
}

// Create New Post
function createNewArticle() {
  state.activeArticleUrl = "";
  state.title = "";
  state.subtitle = "";
  state.slug = "";
  state.category = state.articleType === "news" ? "AI & Semiconductors" : "Buying Guides";
  state.tag = state.articleType === "news" ? "Semiconductors" : "Buying Guide";
  state.metaDesc = "";
  state.coverImage = "";
  state.coverCaption = "";
  state.coverFileName = "";
  state.coverFileSize = "";
  state.content = "## Introduction\n\nStart drafting your story here...";

  loadStateIntoUi();
  el.existingArticleSelect.value = "new";
  el.btnViewCurrentLive.disabled = true;
  el.btnDeleteCurrentArticle.disabled = true;
  markUnsaved();
}

async function loadArticleFromPath(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Could not fetch article HTML");
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    state.activeArticleUrl = path;
    const titleEl = doc.querySelector("h1.post-title") || doc.querySelector("h1");
    if (titleEl) state.title = titleEl.textContent.trim();

    const subtitleEl = doc.querySelector(".post-subtitle");
    state.subtitle = subtitleEl ? subtitleEl.textContent.trim() : "";

    const metaDescEl = doc.querySelector('meta[name="description"]');
    state.metaDesc = metaDescEl ? metaDescEl.getAttribute("content") : "";

    const coverImgEl = doc.querySelector(".post-featured-media img");
    state.coverImage = coverImgEl ? coverImgEl.getAttribute("src") : "";

    const tagEl = doc.querySelector(".post-category-tag");
    if (tagEl) state.tag = tagEl.textContent.trim();

    const parts = path.split("/");
    state.articleType = parts[1] === "news" ? "news" : "blog";
    state.slug = parts[2];

    const contentEl = doc.querySelector(".post-content");
    if (contentEl) {
      state.content = contentEl.innerHTML
        .replace(/<h2>(.*?)<\/h2>/gi, "\n\n## $1\n\n")
        .replace(/<h3>(.*?)<\/h3>/gi, "\n\n### $1\n\n")
        .replace(/<h4>(.*?)<\/h4>/gi, "\n\n#### $1\n\n")
        .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
        .replace(/<em>(.*?)<\/em>/gi, "*$1*")
        .replace(/<p>(.*?)<\/p>/gi, "$1\n\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .trim();
    }

    loadStateIntoUi();
    el.btnViewCurrentLive.disabled = false;
    el.btnDeleteCurrentArticle.disabled = false;
    markSaved("Loaded article from disk");

  } catch (err) {
    alert(`Could not load article: ${err.message}`);
  }
}

function loadStateIntoUi() {
  el.titleInput.value = state.title || "";
  el.subtitleInput.value = state.subtitle || "";
  el.slugInput.value = state.slug || "";
  el.categorySelect.value = state.category || "Buying Guides";
  el.tagInput.value = state.tag || "Buying Guide";
  el.metaDescInput.value = state.metaDesc || "";
  el.coverImgInput.value = state.coverImage || "";
  el.coverCaptionInput.value = state.coverCaption || "";
  el.contentInput.value = state.content || "";
  if (el.keywordInput) el.keywordInput.value = state.targetKeyword || "";

  setArticleType(state.articleType || "blog");
  el.articleTypeBtns.forEach(b => b.classList.toggle("active", b.dataset.type === state.articleType));

  updateCoverPreview();
  updateTimestamp();
  updateCalculations();
}

// Catalog Cards Generator
function renderCatalogEditCards() {
  if (!el.catalogEditContainer) return;
  el.catalogEditContainer.innerHTML = "";

  liveCatalogProducts.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "catalog-item-card";
    card.innerHTML = `
      <div class="catalog-item-header">
        <img src="${p.image}" alt="${p.title}" class="catalog-item-thumb">
        <div class="catalog-item-info">
          <span class="catalog-item-brand">${p.brand}</span>
          <div class="catalog-item-title">${p.title}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="form-group">
          <label class="form-label">Deal Price (₹)</label>
          <input type="number" class="form-input" value="${p.price}" onchange="liveCatalogProducts[${idx}].price = Number(this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">MRP (₹)</label>
          <input type="number" class="form-input" value="${p.oldPrice}" onchange="liveCatalogProducts[${idx}].oldPrice = Number(this.value)">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Affiliate Link URL</label>
        <input type="url" class="form-input" value="${p.affiliateUrl}" onchange="liveCatalogProducts[${idx}].affiliateUrl = this.value">
      </div>

      <div class="form-group">
        <label class="form-label">Why Recommend</label>
        <input type="text" class="form-input" value="${p.whyRecommend}" onchange="liveCatalogProducts[${idx}].whyRecommend = this.value">
      </div>
    `;
    el.catalogEditContainer.appendChild(card);
  });
}

// Local Downloads & Exports
function downloadHtmlFile() {
  const channelBase = state.articleType === "news" ? "news" : "blog";
  const fullHtml = generateFullPageHtml();
  const blob = new Blob([fullHtml], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "index.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert(`Downloaded 'index.html'. Place it in: ${channelBase}/${state.slug}/index.html`);
}

function downloadMarkdownFile() {
  const md = `# ${state.title}\n\n> ${state.subtitle}\n\n${state.content}`;
  const blob = new Blob([md], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${state.slug || 'article'}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function exportDraftJson() {
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `khc-draft-${state.slug || 'untitled'}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importDraftJson(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      Object.assign(state, parsed);
      loadStateIntoUi();
      el.modalExport.classList.remove("active");
      markSaved("Imported draft JSON");
      alert("Draft imported successfully!");
    } catch (err) {
      alert("Invalid JSON draft file: " + err.message);
    }
  };
  reader.readAsText(file);
}

function copyFullHtml() {
  const fullHtml = generateFullPageHtml();
  navigator.clipboard.writeText(fullHtml).then(() => {
    alert("Full HTML copied to clipboard.");
  });
}

function copySitemap() {
  navigator.clipboard.writeText(el.sitemapSnippet.textContent).then(() => {
    alert("Sitemap XML snippet copied to clipboard.");
  });
}

// Draft storage & Status Indicators
function markUnsaved() {
  if (el.cmsSaveStatus && el.statusText) {
    el.cmsSaveStatus.className = "cms-save-status unsaved";
    el.statusText.textContent = "Unsaved edits";
  }
}

function markSaved(msg = "Draft saved locally") {
  if (el.cmsSaveStatus && el.statusText) {
    el.cmsSaveStatus.className = "cms-save-status saved";
    el.statusText.textContent = msg;
  }
}

function saveDraft() {
  localStorage.setItem("khc_editor_draft", JSON.stringify(state));
  saveRevisionSnapshot(true);
  markSaved("Draft saved on device");
  alert("Draft and editorial settings saved on this device.");
}

function loadSavedDraft() {
  const saved = localStorage.getItem("khc_editor_draft");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    } catch (e) {}
  }
  loadStateIntoUi();
  markSaved("Draft loaded");
}
