// =========================================================================
// KHC Finds - Client Application Logic (Vanilla JS)
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- App State ---
  let currentProducts = [...products];
  let selectedCategory = "";
  let selectedTag = "";
  let searchVal = "";
  let sortBy = "trending";
  let viewMode = "grid"; // 'grid' or 'list'
  let wishlist = JSON.parse(localStorage.getItem("khc-wishlist") || "[]");

  // --- DOM Elements ---
  const header = document.getElementById("main-header");
  const searchInput = document.getElementById("search-input");
  const categoryContainer = document.getElementById("category-filter-list");
  const tagContainer = document.getElementById("tag-filter-list");
  const catalogCountInfo = document.getElementById("catalog-count-info");
  const sortSelect = document.getElementById("sort-select");
  const viewGridBtn = document.getElementById("view-grid-btn");
  const viewListBtn = document.getElementById("view-list-btn");
  const productContainer = document.getElementById("product-list-container");
  
  // Modal DOM
  const modal = document.getElementById("product-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalImg = document.getElementById("modal-img");
  const modalPrice = document.getElementById("modal-price");
  const modalOriginalPrice = document.getElementById("modal-original-price");
  const modalBuyLink = document.getElementById("modal-buy-link");
  const modalCouponBox = document.getElementById("modal-coupon-box");
  const modalCouponCode = document.getElementById("modal-coupon-code");
  const modalCouponCopyBtn = document.getElementById("modal-coupon-copy-btn");
  const modalCategory = document.getElementById("modal-category");
  const modalRating = document.getElementById("modal-rating");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLongDesc = document.getElementById("modal-long-desc");
  const modalSpecsContainer = document.getElementById("modal-specs-container");
  const modalSpecsTable = document.getElementById("modal-specs-table");
  const modalProsContainer = document.getElementById("modal-pros-container");
  const modalProsList = document.getElementById("modal-pros-list");
  const modalConsContainer = document.getElementById("modal-cons-container");
  const modalConsList = document.getElementById("modal-cons-list");

  // --- Header Scroll Effect ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Populate Sidebar Filters ---
  function initFilters() {
    // 1. Categories
    categoryContainer.innerHTML = `
      <button class="filter-btn active" data-category="">
        <span>📦</span>
        <span>All Categories</span>
      </button>
    `;
    categories.forEach(cat => {
      categoryContainer.innerHTML += `
        <button class="filter-btn" data-category="${cat.slug}">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
        </button>
      `;
    });

    // Category button click triggers
    categoryContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      
      categoryContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.category;
      applyFilters();
    });

    // 2. Tags
    tagContainer.innerHTML = `
      <button class="tag-btn active" data-tag="">All</button>
    `;
    tags.forEach(tag => {
      tagContainer.innerHTML += `
        <button class="tag-btn" data-tag="${tag.slug}">#${tag.name}</button>
      `;
    });

    // Tag button click triggers
    tagContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".tag-btn");
      if (!btn) return;

      tagContainer.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedTag = btn.dataset.tag;
      applyFilters();
    });
  }

  // --- Render Products List/Grid ---
  function renderProducts() {
    productContainer.innerHTML = "";

    if (currentProducts.length === 0) {
      productContainer.className = ""; // clear grid layout class
      productContainer.innerHTML = `
        <div class="glass-panel empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <h3>No products found</h3>
          <p>We couldn't find anything matching your filters. Try search keywords or changing category tags.</p>
        </div>
      `;
      return;
    }

    productContainer.className = viewMode === "grid" ? "products-grid" : "products-list";

    currentProducts.forEach(product => {
      const isSaved = wishlist.includes(product.id);
      const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

      const storeName = product.affiliateLink.includes("amazon")
        ? "Amazon"
        : product.affiliateLink.includes("flipkart")
        ? "Flipkart"
        : product.affiliateLink.includes("myntra")
        ? "Myntra"
        : "Partner Store";

      const storeComparisonHtml = `
        <div class="compare-row active">
          <span>• ${storeName}</span>
          <span>₹${product.price}</span>
        </div>
        <div class="compare-row">
          <span>• ${storeName === 'Amazon' ? 'Flipkart' : 'Amazon'}</span>
          <span>₹${Math.round(product.price * 1.05)}</span>
        </div>
      `;

      const cardHtml = `
        <article class="glass-card" data-id="${product.id}">
          <div class="card-badges">
            ${product.isFeatured ? '<span class="badge-featured">Featured</span>' : ''}
            ${discount > 15 ? `<span class="badge-saving">🔥 ${discount}% Off</span>` : ''}
          </div>

          <div class="card-actions">
            <button class="action-circle btn-share" title="Share Deal">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
            <button class="action-circle btn-wishlist ${isSaved ? 'saved' : ''}" title="Add to wishlist">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>

          <div class="product-img btn-details">
            <img src="${product.imageUrl}" alt="${product.title}" loading="lazy">
            <span class="store-tag">${storeName}</span>
          </div>

          <div class="card-body">
            <div class="card-rating-price">
              <div class="rating-box">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>${product.rating}</span>
              </div>
              <div class="price-box">
                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                <span class="current-price">₹${product.price}</span>
              </div>
            </div>

            <h3 class="card-title btn-details">${product.title}</h3>
            <p class="card-desc">${product.description}</p>

            <div class="compare-box">
              <span class="compare-title">Store comparison</span>
              ${storeComparisonHtml}
            </div>

            ${product.couponCode ? `
              <div class="coupon-box btn-coupon" data-coupon="${product.couponCode}">
                <span>Code: <span style="background: rgba(245, 158, 11, 0.15); padding: 1px 4px; border-radius: 3px; font-family: monospace;">${product.couponCode}</span></span>
                <span style="font-size: 7px; font-weight: 900; background: rgba(245,158,11,0.25); padding: 2px 4px; border-radius: 3px;">COPY</span>
              </div>
            ` : ''}

            <div class="btn-grid">
              <button class="btn-sm btn-secondary btn-details">Specs & Info</button>
              <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-primary">
                <span>Buy at ${storeName}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `;
      productContainer.innerHTML += cardHtml;
    });

    catalogCountInfo.innerHTML = `Showing <span>${currentProducts.length}</span> finds`;
  }

  // --- Filtering & Sorting Controller ---
  function applyFilters() {
    let filtered = [...products];

    // 1. Search Query text match
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.longDescription.toLowerCase().includes(q)
      );
    }

    // 2. Category selection matches
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // 3. Tag selection matches
    if (selectedTag) {
      filtered = filtered.filter(p => p.tags.includes(selectedTag));
    }

    // 4. Sort dropdown
    if (sortBy === "trending") {
      filtered.sort((a, b) => b.trendingScore - a.trendingScore);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === "highest_rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    currentProducts = filtered;
    renderProducts();
  }

  // --- Modal Specifications rendering ---
  function openModal(product) {
    modalImg.src = product.imageUrl;
    modalImg.alt = product.title;
    modalPrice.innerText = `₹${product.price}`;
    
    if (product.originalPrice) {
      modalOriginalPrice.innerText = `₹${product.originalPrice}`;
      modalOriginalPrice.style.display = "inline";
    } else {
      modalOriginalPrice.style.display = "none";
    }

    modalBuyLink.href = product.affiliateLink;
    const catObj = categories.find(c => c.id === product.categoryId);
    modalCategory.innerText = catObj ? catObj.name : "Product";
    modalRating.innerText = product.rating;
    modalTitle.innerText = product.title;
    modalDesc.innerText = product.description;
    modalLongDesc.innerText = product.longDescription;

    // Coupon block
    if (product.couponCode) {
      modalCouponBox.style.display = "flex";
      modalCouponCode.innerText = product.couponCode;
      modalCouponCopyBtn.innerText = "Copy";
      modalCouponCopyBtn.style.background = "rgba(245, 158, 11, 0.25)";
      modalCouponBox.dataset.coupon = product.couponCode;
    } else {
      modalCouponBox.style.display = "none";
    }

    // Spec sheets
    if (product.specifications && Object.keys(product.specifications).length > 0) {
      modalSpecsContainer.style.display = "block";
      modalSpecsTable.innerHTML = "";
      Object.entries(product.specifications).forEach(([key, val]) => {
        modalSpecsTable.innerHTML += `
          <div class="spec-item">
            <span class="spec-key">${key}</span>
            <span class="spec-val">${val}</span>
          </div>
        `;
      });
    } else {
      modalSpecsContainer.style.display = "none";
    }

    // Pros
    if (product.pros && product.pros.length > 0) {
      modalProsContainer.style.display = "block";
      modalProsList.innerHTML = "";
      product.pros.forEach(pro => {
        modalProsList.innerHTML += `<li>${pro}</li>`;
      });
    } else {
      modalProsContainer.style.display = "none";
    }

    // Cons
    if (product.cons && product.cons.length > 0) {
      modalConsContainer.style.display = "block";
      modalConsList.innerHTML = "";
      product.cons.forEach(con => {
        modalConsList.innerHTML += `<li>${con}</li>`;
      });
    } else {
      modalConsContainer.style.display = "none";
    }

    modal.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
  }

  // --- Event Listeners Bindings ---

  // Search input typing
  searchInput.addEventListener("input", (e) => {
    searchVal = e.target.value;
    applyFilters();
  });

  // Sort select dropdown changes
  sortSelect.addEventListener("change", (e) => {
    sortBy = e.target.value;
    applyFilters();
  });

  // Layout View mode switch
  viewGridBtn.addEventListener("click", () => {
    viewGridBtn.classList.add("active");
    viewListBtn.classList.remove("active");
    viewMode = "grid";
    renderProducts();
  });

  viewListBtn.addEventListener("click", () => {
    viewListBtn.classList.add("active");
    viewGridBtn.classList.remove("active");
    viewMode = "list";
    renderProducts();
  });

  // Global click listeners inside list container
  productContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".glass-card");
    if (!card) return;
    const productId = card.dataset.id;
    const product = products.find(p => p.id === productId);

    // Click on details triggers
    if (e.target.closest(".btn-details")) {
      e.preventDefault();
      openModal(product);
      return;
    }

    // Click on share trigger
    if (e.target.closest(".btn-share")) {
      e.preventDefault();
      const shareUrl = `${window.location.origin}/#details-${product.slug}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Product share link copied to clipboard!");
      return;
    }

    // Click on wishlist toggling
    if (e.target.closest(".btn-wishlist")) {
      e.preventDefault();
      const wlBtn = e.target.closest(".btn-wishlist");
      const idx = wishlist.indexOf(productId);
      if (idx > -1) {
        wishlist.splice(idx, 1);
        wlBtn.classList.remove("saved");
      } else {
        wishlist.push(productId);
        wlBtn.classList.add("saved");
      }
      localStorage.setItem("khc-wishlist", JSON.stringify(wishlist));
      return;
    }

    // Click on coupon copy
    if (e.target.closest(".btn-coupon")) {
      const couponCode = e.target.closest(".btn-coupon").dataset.coupon;
      navigator.clipboard.writeText(couponCode);
      alert(`Coupon code "${couponCode}" copied successfully!`);
    }
  });

  // Modal actions binding
  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Modal coupon copy button
  modalCouponCopyBtn.addEventListener("click", () => {
    const code = modalCouponBox.dataset.coupon;
    navigator.clipboard.writeText(code);
    modalCouponCopyBtn.innerText = "COPIED!";
    modalCouponCopyBtn.style.background = "var(--emerald)";
    setTimeout(() => {
      modalCouponCopyBtn.innerText = "COPY";
      modalCouponCopyBtn.style.background = "rgba(245, 158, 11, 0.25)";
    }, 2000);
  });

  // Newsletter form submission
  document.getElementById("newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    alert(`Thank you for subscribing with: ${email}! We'll notify you of deals.`);
    document.getElementById("newsletter-email").value = "";
  });

  // Coming Soon newsletter form submission
  const comingSoonForm = document.getElementById("coming-soon-newsletter");
  if (comingSoonForm) {
    comingSoonForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("coming-soon-email").value;
      alert(`Thank you! We will alert you at: ${email} when more curated products go live.`);
      document.getElementById("coming-soon-email").value = "";
    });
  }

  // --- App Initialization Execution ---
  initFilters();
  applyFilters();
});
