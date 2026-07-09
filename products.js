// =========================================================================
// KHC Finds - Affiliate Catalog Database
// =========================================================================
// To add, remove, or edit products, categories, or tags, simply edit this file!
// Make sure to preserve the array structure and comma formatting.

const categories = [
  {
    id: "cat-gadgets",
    name: "Viral Gadgets",
    slug: "viral-gadgets",
    description: "Trending tech and viral electronic items.",
    icon: "🎮"
  },
  {
    id: "cat-ai-tools",
    name: "AI Tools & Software",
    slug: "ai-tools",
    description: "Best artificial intelligence apps and productivity software.",
    icon: "🤖"
  },
  {
    id: "cat-budget",
    name: "Budget Finds",
    slug: "budget-finds",
    description: "Incredible values and cool utility products under ₹999.",
    icon: "💸"
  },
  {
    id: "cat-creator",
    name: "Creator Essentials",
    slug: "creator-essentials",
    description: "Lighting, mics, and gear to upgrade your setup.",
    icon: "🎥"
  },
  {
    id: "cat-home",
    name: "Smart Home & Living",
    slug: "smart-home",
    description: "Intelligent lights and aesthetic desk upgrades.",
    icon: "🏠"
  },
  {
    id: "cat-travel",
    name: "Travel Accessories",
    slug: "travel-accessories",
    description: "Gadgets and gear to make travel and commuting a breeze.",
    icon: "✈️"
  }
];

const tags = [
  { id: "tag-amazon", name: "Amazon Finds", slug: "amazon-finds" },
  { id: "tag-productivity", name: "Productivity", slug: "productivity" },
  { id: "tag-student", name: "Student Picks", slug: "student" },
  { id: "tag-under999", name: "Under ₹999", slug: "under-999" },
  { id: "tag-gaming", name: "Gaming Setup", slug: "gaming" },
  { id: "tag-coding", name: "For Coders", slug: "coding" },
  { id: "tag-wireless", name: "Wireless Tech", slug: "wireless" }
];

const products = [
  {
    id: "prod-1",
    title: "KHC Finds Curated Amazon Storefront",
    slug: "khc-storefront",
    description: "Browse our handpicked collections of viral gadgets, developer gear, and student picks directly on Amazon.",
    longDescription: "Welcome to KHC Finds! We curate the most useful, viral, and budget-friendly finds across the internet. Click the link below to browse our recommended storefront list directly on Amazon.\n\nMore amazing product curations, reviews, and deals comparison are coming very soon. Subscribe to our newsletter below to get weekly deal alerts!",
    price: 999, // placeholder non-zero price for display
    originalPrice: 1999,
    rating: 5.0,
    trendingScore: 99.0,
    affiliateLink: "https://link.amazon/B05WBZuKP",
    imageUrl: "assets/storefront.png",
    isFeatured: true,
    isSponsored: false,
    categoryId: "cat-gadgets",
    tags: ["amazon-finds", "productivity"],
    pros: [
      "100% verified curated recommendations",
      "Direct checkout on Amazon India",
      "Saves hours of search time"
    ],
    cons: [],
    specifications: {
      "Platform": "Amazon",
      "Curator": "KHC Finds",
      "Status": "Active"
    }
  }
];
