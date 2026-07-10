// =========================================================================
// KHC Finds - Modern Mobile-App Style Client Application
// =========================================================================

const categories = [
  { id: "cat-workspace", name: "Workspace", slug: "workspace" },
  { id: "cat-audio", name: "Audio", slug: "audio" },
  { id: "cat-carry", name: "Carry", slug: "carry" },
  { id: "cat-objects", name: "Objects", slug: "objects" }
];

const products = [
  {
    id: "prod-ear-a",
    title: "Nothing Ear (a)",
    brand: "Nothing",
    category: "cat-audio",
    price: 7999,
    oldPrice: 9999,
    affiliateUrl: "https://www.amazon.in/dp/B0D1Y9M8Q9",
    image: "assets/products/nothing-ear-a-main.webp",
    whyRecommend: "Iconic transparent aesthetics combined with rich high-res audio and robust ANC.",
    overview: "Nothing Ear (a) offers active noise cancellation up to 45dB, LDAC high-res audio support, and a slim, pocketable transparent case.",
    pros: ["Striking transparent case design", "Excellent bass response", "Comfortable fit"],
    cons: ["No wireless charging"],
    specifications: { "Driver": "11.6mm Dynamic", "ANC": "Up to 45dB", "Battery": "Up to 42.5h", "Bluetooth": "5.3" }
  },
  {
    id: "prod-keychron-k2",
    title: "Keychron K2 V2 Keyboard",
    brand: "Keychron",
    category: "cat-workspace",
    price: 7499,
    oldPrice: 8999,
    affiliateUrl: "https://www.amazon.in/dp/B0875N542Q",
    image: "assets/products/keychron-k2-main.webp",
    whyRecommend: "The wireless mechanical keyboard benchmark for both Mac and Windows setups.",
    overview: "A compact 75% layout mechanical keyboard featuring tactile Gateron switches, dual connectivity, and solid build quality.",
    pros: ["Mac & Windows layouts included", "Long-lasting 4000mAh battery", "Satisfying tactile feedback"],
    cons: ["High frame profile requires wrist rest"]
  },
  {
    id: "prod-muji-diffuser",
    title: "Muji Aroma Diffuser",
    brand: "MUJI",
    category: "cat-objects",
    price: 3990,
    oldPrice: 4990,
    affiliateUrl: "https://www.amazon.in/dp/B00V42B8H6",
    image: "assets/products/muji-diffuser-main.webp",
    whyRecommend: "An ultrasonic mist diffuser that doubles as a warm ambient nightlight.",
    overview: "Vaporizes water and essential oils using ultrasonic waves to create a soothing, fragrant mist inside minimalist living spaces.",
    pros: ["Quiet operation", "Double-stage LED glow", "Clean cylindrical aesthetic"],
    cons: ["Requires regular cleaning"]
  },
  {
    id: "prod-balolo-cockpit",
    title: "Balolo Setup Cockpit",
    brand: "Balolo",
    category: "cat-workspace",
    price: 18999,
    oldPrice: 22000,
    affiliateUrl: "https://www.amazon.in/dp/B09HN5B7W1",
    image: "assets/products/balolo-cockpit-main.webp",
    whyRecommend: "Premium solid oak monitor stand with a modular rail organizer grid.",
    overview: "Crafted in Germany from solid American oak and powder-coated steel to elevate screens and organize workspace peripherals.",
    pros: ["Solid oak and steel build", "Modular accessory attachment system", "Improves posture"],
    cons: ["Premium price segment"]
  },
  {
    id: "prod-peakdesign-backpack",
    title: "Peak Design Everyday Pack",
    brand: "Peak Design",
    category: "cat-carry",
    price: 24999,
    oldPrice: 28999,
    affiliateUrl: "https://www.amazon.in/dp/B07Z8GNZLD",
    image: "assets/products/peak-design-backpack-main.webp",
    whyRecommend: "Highly configurable dividers and quick dual side panel access.",
    overview: "Weatherproof 20L backpack made from 100% recycled 400D shell, designed for creators, commuters, and camera gears.",
    pros: ["Configurable FlexFold dividers", "Top MagLatch closure is secure", "Weatherproof shell"],
    cons: ["Slightly heavy empty frame"]
  },
  {
    id: "prod-aesop-balm",
    title: "Aesop Resurrection Balm",
    brand: "Aesop",
    category: "cat-objects",
    price: 2999,
    oldPrice: 3500,
    affiliateUrl: "https://www.amazon.in/dp/B002K63CMM",
    image: "assets/products/aesop-balm-main.webp",
    whyRecommend: "A grease-free botanical formulation that softens cuticles and dry hands.",
    overview: "Iconic amber tube containing mandarin rind, rosemary leaf, and cedarwood oil, recognized globally for modern bathroom design aesthetics.",
    pros: ["Rich herbal citrus fragrance", "Non-sticky, quick-dry absorption", "Iconic visual packaging"],
    cons: ["Fragile metal tube body"]
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
  const modalWhy = document.getElementById("modal-why");
  const modalOverview = document.getElementById("modal-overview");
  const modalPros = document.getElementById("modal-pros");
  const modalCons = document.getElementById("modal-cons");
  const modalCta = document.getElementById("modal-cta");

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
        p.whyRecommend.toLowerCase().includes(searchQuery);
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
      card.innerHTML = `
        <div class="card-image-container">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="card-details">
          <span class="card-brand">${p.brand}</span>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-why">"${p.whyRecommend}"</p>
          <div class="card-footer">
            <span class="card-price">${formatINR(p.price)}</span>
            <button class="btn btn-action view-details-btn" data-id="${p.id}">View Analysis</button>
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

  // Mobile navigation drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close on link click
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Modal actions
  function openProductModal(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    modalImage.src = p.image;
    modalTitle.textContent = p.title;
    modalBrand.textContent = p.brand;
    modalPrice.textContent = formatINR(p.price);
    
    if (p.oldPrice) {
      modalOldPrice.textContent = formatINR(p.oldPrice);
      modalOldPrice.style.display = "inline";
    } else {
      modalOldPrice.style.display = "none";
    }

    modalWhy.textContent = `"${p.whyRecommend}"`;
    modalOverview.textContent = p.overview;

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

  // Init App
  initCategories();
  renderCatalog();
});
