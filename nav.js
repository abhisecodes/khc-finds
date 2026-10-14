// =========================================================================
// KHC Finds - Shared Navigation & Site-Wide GA4 Analytics
// =========================================================================

// Google Analytics 4 (GA4) Global Site-Wide Tracker
(function() {
  const GA_MEASUREMENT_ID = 'G-SXGVX77Y1R';
  if (!document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside drawer on mobile
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Auto-highlight active link based on current path
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath || (linkPath !== "/" && currentPath.startsWith(linkPath))) {
      link.classList.add("active");
    } else if (linkPath === "/" && currentPath !== "/") {
      link.classList.remove("active");
    }
  });
});
