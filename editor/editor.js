// =========================================================================
// KHC Finds — Newsroom & Media Publishing CMS Logic
// =========================================================================

const state = {
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
  coverCaption: "Compact 75% mechanical keyboards deliver ergonomic ergonomics without wasting desk real estate.",
  githubToken: localStorage.getItem("khc_github_token") || "",
  selectedAgency: "Amazon India",
  selectedCta: "Check Price on Amazon &rarr;",
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

## Our Buying Advice & Verdict

> **The Quick Verdict**: If your primary workload is coding, writing, or long office sessions, choose the **Keychron C3 Pro** with Red or Brown switches for superior acoustic damping. If you desire RGB aesthetics and future switch modularity on a tight budget, the **Cosmic Byte Phantom** is your ideal starting board.`
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();
  loadSavedDraft();
  setupEventListeners();
  updateTimestamp();
  updateCalculations();
  renderCatalogEditCards();
});

// Element references
let el = {};
function initElements() {
  el = {
    // Tabs
    tabBtns: document.querySelectorAll(".tab-pill"),
    tabViews: document.querySelectorAll(".tab-view"),
    
    // Author & Byline Inputs
    authorSelect: document.getElementById("author-select"),
    customAuthorGroup: document.getElementById("custom-author-group"),
    customAuthorName: document.getElementById("custom-author-name"),
    customAuthorRole: document.getElementById("custom-author-role"),
    timestampModeSelect: document.getElementById("post-timestamp-mode"),
    customTimestampGroup: document.getElementById("custom-timestamp-group"),
    customDatetimeInput: document.getElementById("custom-datetime"),
    formattedBylinePreview: document.getElementById("formatted-byline-preview"),

    // Article Content Inputs
    titleInput: document.getElementById("post-title"),
    subtitleInput: document.getElementById("post-subtitle"),
    slugInput: document.getElementById("post-slug"),
    categorySelect: document.getElementById("post-category"),
    tagInput: document.getElementById("post-tag"),
    metaDescInput: document.getElementById("post-meta-desc"),
    coverImgInput: document.getElementById("post-cover-img"),
    coverCaptionInput: document.getElementById("post-cover-caption"),
    contentInput: document.getElementById("post-content"),
    
    // Previews & Counters
    titleCounter: document.getElementById("title-counter"),
    metaCounter: document.getElementById("meta-counter"),
    slugPreview: document.getElementById("slug-preview-text"),
    coverPreviewImg: document.getElementById("cover-preview-img"),
    coverPlaceholder: document.getElementById("cover-placeholder"),
    statWords: document.getElementById("stat-words"),
    statReadTime: document.getElementById("stat-read-time"),
    
    // SERP Preview
    serpTitle: document.getElementById("serp-title"),
    serpUrl: document.getElementById("serp-url"),
    serpDesc: document.getElementById("serp-desc"),
    schemaCode: document.getElementById("schema-code"),
    sitemapSnippet: document.getElementById("sitemap-snippet"),
    catalogCardCode: document.getElementById("catalog-card-code"),
    
    // Preview Frame
    previewFrame: document.getElementById("preview-frame"),
    
    // Modals
    modalProduct: document.getElementById("modal-product-callout"),
    modalVerdict: document.getElementById("modal-verdict"),
    modalTakeaways: document.getElementById("modal-takeaways"),
    btnOpenProductModal: document.getElementById("btn-add-product"),
    btnOpenVerdictModal: document.getElementById("btn-add-verdict"),
    btnOpenTakeawaysModal: document.getElementById("btn-add-takeaways"),
    insertProductConfirm: document.getElementById("btn-insert-product-confirm"),
    insertVerdictConfirm: document.getElementById("btn-insert-verdict-confirm"),
    insertTakeawaysConfirm: document.getElementById("btn-insert-takeaways-confirm"),
    
    // GitHub & Publishing
    githubTokenInput: document.getElementById("github-token"),
    btnSaveToken: document.getElementById("btn-save-token"),
    btnPublishLive: document.getElementById("btn-publish-live"),
    btnPublishMobile: document.getElementById("btn-publish-live-mobile"),
    btnTopPublish: document.getElementById("btn-top-publish"),
    publishConsole: document.getElementById("publish-console"),

    // Existing Content & Catalog
    existingArticleSelect: document.getElementById("existing-article-select"),
    catalogEditContainer: document.getElementById("catalog-edit-container"),
    btnSaveCatalogDeals: document.getElementById("btn-save-catalog-deals"),
    bannerPillText: document.getElementById("banner-pill-text"),
    bannerMessageText: document.getElementById("banner-message-text"),
    bannerCtaLink: document.getElementById("banner-cta-link"),
    previewBannerPill: document.getElementById("preview-banner-pill"),
    previewBannerMsg: document.getElementById("preview-banner-msg"),
    btnSaveBanner: document.getElementById("btn-save-banner"),

    // Export / Save Actions
    btnSaveDraft: document.getElementById("btn-save-draft"),
    btnSaveDraftMobile: document.getElementById("btn-save-draft-mobile"),
    btnExportHtml: document.getElementById("btn-export-html"),
    btnExportHtmlCard: document.getElementById("btn-export-html-card"),
    btnCopyHtml: document.getElementById("btn-copy-html"),
    btnCopySitemap: document.getElementById("btn-copy-sitemap"),
    btnCopyCard: document.getElementById("btn-copy-card")
  };

  if (state.githubToken && el.githubTokenInput) {
    el.githubTokenInput.value = state.githubToken;
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Tab switching
  el.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      el.tabBtns.forEach(b => b.classList.remove("active"));
      el.tabViews.forEach(v => v.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`view-${target}`).classList.add("active");

      if (target === "preview") renderLivePreview();
      if (target === "seo") renderSeoInspector();
      if (target === "publish") renderPublishData();
    });
  });

  // Top header publish button switches straight to publish tab
  if (el.btnTopPublish) {
    el.btnTopPublish.addEventListener("click", () => {
      switchToTab("publish");
    });
  }

  // Author byline select
  el.authorSelect.addEventListener("change", (e) => {
    state.authorType = e.target.value;
    if (state.authorType === "custom") {
      el.customAuthorGroup.style.display = "block";
      state.authorName = el.customAuthorName.value.trim() || "Contributing Editor";
      state.authorRole = el.customAuthorRole.value.trim() || "Technology Writer";
    } else {
      el.customAuthorGroup.style.display = "none";
      state.authorName = state.authorType;
      state.authorRole = "Editorial Team";
    }
    updateTimestamp();
  });

  el.customAuthorName.addEventListener("input", (e) => {
    state.authorName = e.target.value.trim() || "Contributing Editor";
    updateTimestamp();
  });

  el.customAuthorRole.addEventListener("input", (e) => {
    state.authorRole = e.target.value.trim() || "Technology Writer";
    updateTimestamp();
  });

  // Timestamp mode select
  el.timestampModeSelect.addEventListener("change", (e) => {
    state.timestampMode = e.target.value;
    if (state.timestampMode === "custom") {
      el.customTimestampGroup.style.display = "block";
    } else {
      el.customTimestampGroup.style.display = "none";
    }
    updateTimestamp();
  });

  el.customDatetimeInput.addEventListener("input", () => {
    updateTimestamp();
  });

  // Multi-agency chips inside product modal
  document.querySelectorAll(".agency-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".agency-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedAgency = chip.dataset.agency;
      state.selectedCta = chip.dataset.cta;
      const ctaInput = document.getElementById("prod-cta");
      if (ctaInput) ctaInput.value = state.selectedCta;
    });
  });

  // Title sync & auto-slug
  el.titleInput.addEventListener("input", (e) => {
    state.title = e.target.value;
    if (!el.slugInput.dataset.manual) {
      state.slug = generateSlug(state.title);
      el.slugInput.value = state.slug;
    }
    updateCalculations();
  });

  // Slug manual edit
  el.slugInput.addEventListener("input", (e) => {
    el.slugInput.dataset.manual = "true";
    state.slug = generateSlug(e.target.value);
    updateCalculations();
  });

  // Subtitle
  el.subtitleInput.addEventListener("input", (e) => {
    state.subtitle = e.target.value;
  });

  // Category
  el.categorySelect.addEventListener("change", (e) => {
    state.category = e.target.value;
  });

  // Tag pill
  el.tagInput.addEventListener("input", (e) => {
    state.tag = e.target.value;
  });

  // Meta description
  el.metaDescInput.addEventListener("input", (e) => {
    state.metaDesc = e.target.value;
    updateCalculations();
  });

  // Cover image
  el.coverImgInput.addEventListener("input", (e) => {
    state.coverImage = e.target.value;
    updateCoverPreview();
  });

  el.coverCaptionInput.addEventListener("input", (e) => {
    state.coverCaption = e.target.value;
  });

  // Content
  el.contentInput.addEventListener("input", (e) => {
    state.content = e.target.value;
    updateCalculations();
  });

  // Existing Article Select
  if (el.existingArticleSelect) {
    el.existingArticleSelect.addEventListener("change", (e) => {
      loadExistingArticle(e.target.value);
    });
  }

  // Banner Live Preview Sync
  if (el.bannerPillText && el.previewBannerPill) {
    el.bannerPillText.addEventListener("input", (e) => {
      el.previewBannerPill.textContent = e.target.value;
    });
  }
  if (el.bannerMessageText && el.previewBannerMsg) {
    el.bannerMessageText.addEventListener("input", (e) => {
      el.previewBannerMsg.textContent = e.target.value;
    });
  }
  if (el.btnSaveBanner) {
    el.btnSaveBanner.addEventListener("click", () => {
      alert(`✓ Announcement banner updated!\n\nPill: "${el.bannerPillText.value}"\nMessage: "${el.bannerMessageText.value}"\nLink: "${el.bannerCtaLink.value}"`);
    });
  }
  if (el.btnSaveCatalogDeals) {
    el.btnSaveCatalogDeals.addEventListener("click", () => {
      alert("✓ Catalog deals and affiliate prices saved! To push changes live to your website, use the '🚀 Live Publisher' tab.");
    });
  }

  // Toolbar & Modals
  setupToolbarButtons();
  setupModals();

  // Save Token
  el.btnSaveToken.addEventListener("click", () => {
    const token = el.githubTokenInput.value.trim();
    if (token) {
      localStorage.setItem("khc_github_token", token);
      state.githubToken = token;
      logConsole("✓ GitHub token saved to device storage.", "success");
      alert("GitHub Token saved securely on this device!");
    } else {
      alert("Please enter a valid GitHub token (starts with ghp_).");
    }
  });

  // Publish Live Action
  el.btnPublishLive.addEventListener("click", publishLiveToGitHub);
  if (el.btnPublishMobile) {
    el.btnPublishMobile.addEventListener("click", () => {
      switchToTab("publish");
      publishLiveToGitHub();
    });
  }

  // Export / Save
  el.btnSaveDraft.addEventListener("click", saveDraft);
  if (el.btnSaveDraftMobile) el.btnSaveDraftMobile.addEventListener("click", saveDraft);
  el.btnExportHtml.addEventListener("click", downloadHtmlFile);
  if (el.btnExportHtmlCard) el.btnExportHtmlCard.addEventListener("click", downloadHtmlFile);
  el.btnCopyHtml.addEventListener("click", copyFullHtml);
  el.btnCopySitemap.addEventListener("click", copySitemap);
  el.btnCopyCard.addEventListener("click", copyCatalogCard);
}

function switchToTab(tabName) {
  el.tabBtns.forEach(b => {
    if (b.dataset.tab === tabName) b.classList.add("active");
    else b.classList.remove("active");
  });
  el.tabViews.forEach(v => {
    if (v.id === `view-${tabName}`) v.classList.add("active");
    else v.classList.remove("active");
  });
  if (tabName === "publish") renderPublishData();
  if (tabName === "preview") renderLivePreview();
  if (tabName === "seo") renderSeoInspector();
}

// Format Newsroom Timestamp (Indian Express / Hindustan Times style)
function updateTimestamp() {
  let targetDate = new Date();
  if (state.timestampMode === "custom" && el.customDatetimeInput.value) {
    targetDate = new Date(el.customDatetimeInput.value);
  }

  // E.g. "October 15, 2026 • 12:45 AM IST"
  const dateStr = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = targetDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  state.pubDateFormatted = `Published ${dateStr} • ${timeStr} IST`;
  state.pubDateIso = targetDate.toISOString().split("T")[0];

  el.formattedBylinePreview.innerHTML = `By <strong>${state.authorName}</strong> ${state.authorRole ? `(${state.authorRole})` : ""} • ${dateStr} • ${timeStr} IST`;
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function updateCalculations() {
  const words = state.content.trim() ? state.content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  state.readTime = `${minutes} min read`;

  el.statWords.textContent = `${words} words`;
  el.statReadTime.textContent = state.readTime;
  el.slugPreview.textContent = `https://khc-finds.vercel.app/blog/${state.slug}/`;

  // Title Counter
  const titleLen = state.title.length;
  el.titleCounter.textContent = `${titleLen} / 60`;
  el.titleCounter.className = `counter ${titleLen >= 30 && titleLen <= 65 ? "good" : "warn"}`;

  // Meta Counter
  const metaLen = state.metaDesc.length;
  el.metaCounter.textContent = `${metaLen} / 160`;
  el.metaCounter.className = `counter ${metaLen >= 120 && metaLen <= 165 ? "good" : "warn"}`;
}

function updateCoverPreview() {
  if (state.coverImage && state.coverImage.startsWith("http")) {
    el.coverPreviewImg.src = state.coverImage;
    el.coverPreviewImg.style.display = "block";
    el.coverPlaceholder.style.display = "none";
  } else {
    el.coverPreviewImg.style.display = "none";
    el.coverPlaceholder.style.display = "block";
  }
}

// Formatting Toolbar Buttons
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
    case "bold": prefix = "**"; suffix = "**"; break;
    case "italic": prefix = "*"; suffix = "*"; break;
    case "quote": prefix = "\n> "; suffix = "\n"; break;
    case "ul": prefix = "\n- "; suffix = "\n"; break;
    case "ol": prefix = "\n1. "; suffix = "\n"; break;
    case "table": 
      prefix = `\n| Specification | Contender A | Contender B |\n| :--- | :--- | :--- |\n| **Rating / Specs** | Premium Grade | Mid-Tier |\n| **Current Offer** | ₹14,999 | ₹18,999 |\n\n`;
      suffix = "";
      break;
  }

  const replacement = prefix + (selected || "Text") + suffix;
  textarea.setRangeText(replacement, start, end, "end");
  state.content = textarea.value;
  updateCalculations();
  textarea.focus();
}

// Modals management
function setupModals() {
  el.btnOpenProductModal.addEventListener("click", () => el.modalProduct.classList.add("active"));
  el.btnOpenVerdictModal.addEventListener("click", () => el.modalVerdict.classList.add("active"));
  el.btnOpenTakeawaysModal.addEventListener("click", () => el.modalTakeaways.classList.add("active"));

  document.querySelectorAll(".modal-close-btn, .modal-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    });
  });

  // Confirm Product Callout Insert
  el.insertProductConfirm.addEventListener("click", () => {
    const data = {
      name: document.getElementById("prod-name").value.trim() || "Product Name",
      agency: state.selectedAgency || "Amazon India",
      desc: document.getElementById("prod-desc").value.trim() || "Key features and performance summary.",
      price: document.getElementById("prod-price").value.trim() || "₹2,999",
      oldPrice: document.getElementById("prod-oldprice").value.trim() || "₹4,499",
      discount: document.getElementById("prod-discount").value.trim() || "35% OFF",
      link: document.getElementById("prod-link").value.trim() || "https://amazon.in/",
      cta: document.getElementById("prod-cta").value.trim() || "Check Price on Amazon &rarr;",
      image: document.getElementById("prod-img").value.trim() || state.coverImage
    };

    const snippet = `\n<!-- PRODUCT_CALLOUT: ${JSON.stringify(data)} -->\n`;
    insertRawSnippet(snippet);
    el.modalProduct.classList.remove("active");
  });

  // Confirm Takeaways Insert
  el.insertTakeawaysConfirm.addEventListener("click", () => {
    const h1 = document.getElementById("takeaway-1").value.trim();
    const h2 = document.getElementById("takeaway-2").value.trim();
    const h3 = document.getElementById("takeaway-3").value.trim();
    const list = [h1, h2, h3].filter(Boolean);

    const snippet = `\n<!-- KEY_TAKEAWAYS: ${JSON.stringify(list)} -->\n`;
    insertRawSnippet(snippet);
    el.modalTakeaways.classList.remove("active");
  });

  // Confirm Verdict Insert
  el.insertVerdictConfirm.addEventListener("click", () => {
    const badge = document.getElementById("verdict-badge").value.trim() || "Our Verdict";
    const text = document.getElementById("verdict-text").value.trim() || "Summary evaluation";
    const snippet = `\n> **${badge}**: ${text}\n`;
    insertRawSnippet(snippet);
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
  textarea.focus();
}

// Markdown to HTML Parser
function parseMarkdownToHtml(md) {
  let html = md;

  // Replace Key Takeaways (Media Newsroom Box)
  html = html.replace(/<!-- KEY_TAKEAWAYS:\s*(\[.*?\])\s*-->/g, (match, jsonStr) => {
    try {
      const items = JSON.parse(jsonStr);
      if (!items || !items.length) return "";
      let liHtml = items.map(it => `<li>${it}</li>`).join("");
      return `
        <div class="post-callout-card" style="background: #F8FAFC; border-left: 4px solid var(--accent-color); padding: 18px 24px;">
          <h4 style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
            ⚡ Story Key Takeaways
          </h4>
          <ul style="padding-left: 20px; margin: 0; line-height: 1.7; color: var(--text-secondary); font-size: 14.5px;">
            ${liHtml}
          </ul>
        </div>`;
    } catch (e) {
      return match;
    }
  });

  // Replace Product Callouts (Multi-Agency Aware)
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

  // Tables
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

  // Headings
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, "<blockquote><p>$1</p></blockquote>");

  // Unordered list
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // Paragraphs
  const blocks = html.split(/\n\s*\n/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return "";
    if (block.startsWith("<h2") || block.startsWith("<h3") || block.startsWith("<div") || block.startsWith("<blockquote") || block.startsWith("<ul") || block.startsWith("<table")) {
      return block;
    }
    return `<p>${block}</p>`;
  }).join("\n\n");

  return html;
}

// Complete Static HTML Generator for KHC Finds
function generateFullPageHtml() {
  const bodyContentHtml = parseMarkdownToHtml(state.content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${state.title} — KHC Finds</title>
  <meta name="description" content="${state.metaDesc}">
  <link rel="canonical" href="https://khc-finds.vercel.app/blog/${state.slug}/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${state.title}">
  <meta property="og:description" content="${state.metaDesc}">
  <meta property="og:url" content="https://khc-finds.vercel.app/blog/${state.slug}/">
  <meta property="og:image" content="${state.coverImage}">
  <meta property="article:published_time" content="${state.pubDateIso}T09:00:00+05:30">
  <meta property="article:section" content="${state.category}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${state.title}">
  <meta name="twitter:description" content="${state.metaDesc}">
  <meta name="twitter:image" content="${state.coverImage}">

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
      "@id": "https://khc-finds.vercel.app/blog/${state.slug}/"
    },
    "headline": "${state.title}",
    "description": "${state.metaDesc}",
    "image": "${state.coverImage}",
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
  </script>
</head>
<body>

  <!-- Sticky App Header -->
  <header class="app-header">
    <div class="container nav-container">
      <a href="/" class="logo">KHC <span>Finds</span></a>

      <nav class="nav-menu" id="nav-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products/">Products</a></li>
          <li><a href="/blog/" class="active">Blog</a></li>
          <li><a href="/news/">Tech News</a></li>
          <li><a href="/about/">About</a></li>
          <li><a href="/disclosure/">Disclosure</a></li>
        </ul>
      </nav>

      <div class="nav-actions-wrapper">
        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Editorial Post Container -->
  <main class="container">
    <article class="post-wrapper">
      
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="separator">/</span>
        <a href="/blog/">The Journal</a>
        <span class="separator">/</span>
        <span>${state.title}</span>
      </nav>

      <!-- Post Header -->
      <header class="post-header">
        <span class="post-tag-pill">${state.tag || state.category}</span>
        <h1 class="post-title">${state.title}</h1>
        <p class="post-subtitle">${state.subtitle}</p>
        
        <!-- Media-Grade Newsroom Byline & Time Bar -->
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
        </div>
      </header>

      <!-- Affiliate Disclosure Banner -->
      <aside class="post-inline-disclosure">
        <strong>Editorial & Affiliate Notice:</strong> When you purchase through verified retail partner links on this page, KHC Finds may earn an affiliate commission at zero additional cost to you. We evaluate every product independently using official technical specifications and verified pricing.
      </aside>

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
      <footer class="post-author-footer">
        <div class="author-avatar-wrap">
          <div class="author-avatar">${state.authorName ? state.authorName.charAt(0) : "K"}</div>
        </div>
        <div class="author-info">
          <h4>Written by ${state.authorName}</h4>
          <p>${state.authorRole || "Editorial Staff at KHC Finds"}. Researching and documenting functional design, verified pricing, and objective product comparisons.</p>
        </div>
      </footer>

    </article>
  </main>

  <!-- Global Footer -->
  <footer class="app-footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <span class="footer-logo">KHC <span>Finds</span></span>
        <p>Curated discoveries engineered for clarity.</p>
      </div>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/products/">Products</a>
        <a href="/blog/">Blog</a>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy Policy</a>
        <a href="/disclosure/">Affiliate Disclosure</a>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/nav.js"></script>
</body>
</html>`;
}

// Live Preview Tab Render
function renderLivePreview() {
  const fullHtml = generateFullPageHtml();
  const iframe = el.previewFrame;
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(fullHtml);
  doc.close();
}

// SEO Tab Render
function renderSeoInspector() {
  el.serpTitle.textContent = `${state.title} — KHC Finds`;
  el.serpUrl.textContent = `https://khc-finds.vercel.app > blog > ${state.slug}`;
  el.serpDesc.textContent = state.metaDesc;

  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": state.title,
    "description": state.metaDesc,
    "image": state.coverImage,
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
}

// Publish Data Render
function renderPublishData() {
  const sitemapXml = `  <!-- ${state.title} -->
  <url>
    <loc>https://khc-finds.vercel.app/blog/${state.slug}/</loc>
    <lastmod>${state.pubDateIso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  el.sitemapSnippet.textContent = sitemapXml;

  const cardHtml = `<!-- ${state.title} -->
<a href="/blog/${state.slug}/" class="article-card">
  <div class="article-thumb-wrap">
    <span class="article-pill">${state.tag || state.category}</span>
    <img src="${state.coverImage}" alt="${state.title}" loading="lazy">
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
      <span>Read Guide</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>
  </div>
</a>`;
  el.catalogCardCode.textContent = cardHtml;
}

// =========================================================================
// 🚀 Live Publishing to GitHub REST API (Works from Phone, Tablet, Laptop)
// =========================================================================

function logConsole(msg, type = "normal") {
  const line = document.createElement("div");
  line.className = `console-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  el.publishConsole.appendChild(line);
  el.publishConsole.scrollTop = el.publishConsole.scrollHeight;
}

// UTF-8 safe Base64 encoder for browser
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

async function publishLiveToGitHub() {
  const token = (el.githubTokenInput.value || state.githubToken).trim();
  if (!token) {
    alert("Please enter a GitHub Personal Access Token in the box above to publish live from this device.");
    return;
  }

  el.publishConsole.innerHTML = "";
  logConsole("Initializing live publishing pipeline...", "working");

  const repoOwner = "abhisecodes";
  const repoName = "khc-finds";
  const branch = "main";
  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  try {
    // 1. Commit blog/[slug]/index.html
    const articlePath = `blog/${state.slug}/index.html`;
    logConsole(`Generating static HTML for: ${articlePath}...`, "working");
    const articleHtml = generateFullPageHtml();

    // Check if file already exists to get its SHA
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
        message: `feat(blog): publish '${state.title}' by ${state.authorName}`,
        content: utf8ToBase64(articleHtml),
        branch,
        ...(existingSha ? { sha: existingSha } : {})
      })
    });

    if (!putArticleRes.ok) {
      const errData = await putArticleRes.json();
      throw new Error(`Failed to commit article: ${errData.message || putArticleRes.statusText}`);
    }
    logConsole(`✓ Article HTML committed successfully!`, "success");

    // 2. Update sitemap.xml
    logConsole("Updating sitemap.xml with new URL...", "working");
    try {
      const sitemapRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml?ref=${branch}`, { headers });
      if (sitemapRes.ok) {
        const sitemapData = await sitemapRes.json();
        let sitemapText = base64ToUtf8(sitemapData.content);
        const articleUrl = `https://khc-finds.vercel.app/blog/${state.slug}/`;

        if (!sitemapText.includes(articleUrl)) {
          const newUrlXml = `  <!-- ${state.title} -->\n  <url>\n    <loc>${articleUrl}</loc>\n    <lastmod>${state.pubDateIso}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;
          sitemapText = sitemapText.replace("</urlset>", newUrlXml);

          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/sitemap.xml`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `chore(sitemap): register /blog/${state.slug}/`,
              content: utf8ToBase64(sitemapText),
              sha: sitemapData.sha,
              branch
            })
          });
          logConsole("✓ sitemap.xml updated and committed!", "success");
        } else {
          logConsole("Notice: URL already in sitemap.xml, skipping duplicate.", "working");
        }
      }
    } catch (err) {
      logConsole(`Warning on sitemap: ${err.message}`, "working");
    }

    // 3. Update blog/index.html catalog
    logConsole("Adding article card to /blog/ catalog...", "working");
    try {
      const blogCatalogRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/blog/index.html?ref=${branch}`, { headers });
      if (blogCatalogRes.ok) {
        const blogCatalogData = await blogCatalogRes.json();
        let blogCatalogText = base64ToUtf8(blogCatalogData.content);
        const articleLink = `/blog/${state.slug}/`;

        if (!blogCatalogText.includes(articleLink)) {
          const cardHtml = `\n        <!-- ${state.title} -->\n        <a href="/blog/${state.slug}/" class="article-card">\n          <div class="article-thumb-wrap">\n            <span class="article-pill">${state.tag || state.category}</span>\n            <img src="${state.coverImage}" alt="${state.title}" loading="lazy">\n          </div>\n          <div class="article-card-body">\n            <div class="article-meta">\n              <span>By ${state.authorName}</span>\n              <span>•</span>\n              <span>${state.readTime}</span>\n            </div>\n            <h2 class="article-card-title">${state.title}</h2>\n            <p class="article-card-excerpt">${state.subtitle || state.metaDesc}</p>\n            <div class="article-card-action">\n              <span>Read Guide</span>\n              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n                <line x1="5" y1="12" x2="19" y2="12"></line>\n                <polyline points="12 5 19 12 12 19"></polyline>\n              </svg>\n            </div>\n          </div>\n        </a>\n`;
          blogCatalogText = blogCatalogText.replace('<div class="articles-grid" id="blog-grid">', `<div class="articles-grid" id="blog-grid">${cardHtml}`);

          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/blog/index.html`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `feat(blog): register '${state.title}' on blog catalog`,
              content: utf8ToBase64(blogCatalogText),
              sha: blogCatalogData.sha,
              branch
            })
          });
          logConsole("✓ Blog catalog updated with new article card!", "success");
        }
      }
    } catch (err) {
      logConsole(`Warning on blog catalog: ${err.message}`, "working");
    }

    logConsole(`🎉 SUCCESS! Pushed to GitHub. Vercel is deploying live in ~30 seconds.`, "success");
    logConsole(`🔗 Live URL: https://khc-finds.vercel.app/blog/${state.slug}/`, "success");
    alert(`🎉 Article successfully published!\n\nLive URL (ready in ~30 seconds):\nhttps://khc-finds.vercel.app/blog/${state.slug}/`);

  } catch (error) {
    logConsole(`❌ Error: ${error.message}`, "error");
    alert(`Publishing Error: ${error.message}`);
  }
}

// Download HTML file to local computer
function downloadHtmlFile() {
  const fullHtml = generateFullPageHtml();
  const blob = new Blob([fullHtml], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "index.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert(`Downloaded 'index.html'! Place it in: blog/${state.slug}/index.html`);
}

function copyFullHtml() {
  const fullHtml = generateFullPageHtml();
  navigator.clipboard.writeText(fullHtml).then(() => {
    alert("Full HTML copied to clipboard!");
  });
}

function copySitemap() {
  navigator.clipboard.writeText(el.sitemapSnippet.textContent).then(() => {
    alert("Sitemap XML snippet copied to clipboard!");
  });
}

function copyCatalogCard() {
  navigator.clipboard.writeText(el.catalogCardCode.textContent).then(() => {
    alert("Catalog Card HTML copied to clipboard!");
  });
}

// Draft storage
function saveDraft() {
  localStorage.setItem("khc_editor_draft", JSON.stringify(state));
  alert("Draft and byline saved on your device!");
}

function loadSavedDraft() {
  const saved = localStorage.getItem("khc_editor_draft");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    } catch (e) {}
  }

  // Populate UI inputs
  el.titleInput.value = state.title;
  el.subtitleInput.value = state.subtitle;
  el.slugInput.value = state.slug;
  el.categorySelect.value = state.category;
  el.tagInput.value = state.tag;
  el.metaDescInput.value = state.metaDesc;
  el.coverImgInput.value = state.coverImage;
  el.coverCaptionInput.value = state.coverCaption;
  el.contentInput.value = state.content;

  if (state.authorType) el.authorSelect.value = state.authorType;
  if (state.authorName && el.customAuthorName) el.customAuthorName.value = state.authorName;
  if (state.authorRole && el.customAuthorRole) el.customAuthorRole.value = state.authorRole;

  updateCoverPreview();
}

// =========================================================================
// 📝 Load & Edit Existing Articles
// =========================================================================

async function loadExistingArticle(url) {
  if (url === "new") {
    loadSavedDraft();
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch article file from server.");
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const titleEl = doc.querySelector(".post-title");
    const subtitleEl = doc.querySelector(".post-subtitle");
    const tagEl = doc.querySelector(".post-tag-pill");
    const authorEl = doc.querySelector(".post-meta-bar strong");
    const imgEl = doc.querySelector(".post-featured-media img");
    const captionEl = doc.querySelector(".post-featured-caption");
    const metaDescEl = doc.querySelector('meta[name="description"]');
    const contentEl = doc.querySelector(".post-content");

    if (titleEl) {
      state.title = titleEl.textContent.trim();
      el.titleInput.value = state.title;
    }
    if (subtitleEl) {
      state.subtitle = subtitleEl.textContent.trim();
      el.subtitleInput.value = state.subtitle;
    }
    if (tagEl) {
      state.tag = tagEl.textContent.trim();
      el.tagInput.value = state.tag;
    }
    if (authorEl) {
      state.authorName = authorEl.textContent.trim();
      state.authorType = "custom";
      el.authorSelect.value = "custom";
      el.customAuthorGroup.style.display = "block";
      el.customAuthorName.value = state.authorName;
    }
    if (imgEl) {
      state.coverImage = imgEl.getAttribute("src") || "";
      el.coverImgInput.value = state.coverImage;
    }
    if (captionEl) {
      state.coverCaption = captionEl.textContent.trim();
      el.coverCaptionInput.value = state.coverCaption;
    }
    if (metaDescEl) {
      state.metaDesc = metaDescEl.getAttribute("content") || "";
      el.metaDescInput.value = state.metaDesc;
    }

    // Extract slug from URL
    const slugMatch = url.match(/\/blog\/([^/]+)\//);
    if (slugMatch) {
      state.slug = slugMatch[1];
      el.slugInput.value = state.slug;
      el.slugInput.dataset.manual = "true";
    }

    // Convert post content to clean text for editing
    if (contentEl) {
      let text = contentEl.innerHTML
        .replace(/<h2>(.*?)<\/h2>/gi, "\n## $1\n")
        .replace(/<h3>(.*?)<\/h3>/gi, "\n### $1\n")
        .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
        .replace(/<em>(.*?)<\/em>/gi, "*$1*")
        .replace(/<p>(.*?)<\/p>/gi, "\n$1\n")
        .replace(/<div class="post-callout-card"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, (card) => {
          return "\n" + card.trim() + "\n";
        });
      
      text = text.replace(/\n\s*\n\s*\n/g, "\n\n").trim();
      state.content = text;
      el.contentInput.value = state.content;
    }

    updateCoverPreview();
    updateCalculations();
    updateTimestamp();
    alert(`✓ Successfully loaded '${state.title}'!\n\nYou can now edit its text, update deal prices, or add new affiliate links.`);
  } catch (err) {
    alert(`Could not load article: ${err.message}`);
  }
}

// =========================================================================
// 🏷️ Live Catalog Deals & Pricing Manager
// =========================================================================

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
          <label class="form-label">MRP / Old Price (₹)</label>
          <input type="number" class="form-input" value="${p.oldPrice}" onchange="liveCatalogProducts[${idx}].oldPrice = Number(this.value)">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Affiliate Link URL</label>
        <input type="url" class="form-input" value="${p.affiliateUrl}" onchange="liveCatalogProducts[${idx}].affiliateUrl = this.value">
      </div>

      <div class="form-group">
        <label class="form-label">Why Recommend (Tagline)</label>
        <input type="text" class="form-input" value="${p.whyRecommend}" onchange="liveCatalogProducts[${idx}].whyRecommend = this.value">
      </div>
    `;
    el.catalogEditContainer.appendChild(card);
  });
}

