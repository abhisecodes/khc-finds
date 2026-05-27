export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  rating: number
  trendingScore: number
  affiliateLink: string
  imageUrl: string
  couponCode?: string
  isFeatured: boolean
  isSponsored: boolean
  viewsCount: number
  clicksCount: number
  categoryId: string
  tags: string[]
  publishedAt: string
  faqs?: { q: string; a: string }[]
  pros?: string[]
  cons?: string[]
  specifications?: Record<string, string>
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  summary: string
  imageUrl: string
  categoryId: string
  authorName: string
  publishedAt: string
  readTime: string
}

export interface SEOPage {
  id: string
  title: string
  slug: string
  type: "GUIDE" | "COMPARISON" | "LIST"
  targetKeywords: string
  description?: string | null
  content: string
  isPublished: boolean
}

export const seedCategories: Category[] = [
  {
    id: "cat-gadgets",
    name: "Viral Gadgets",
    slug: "viral-gadgets",
    description: "Trending tech, viral TikTok/Reels finds, and smart electronic items.",
    icon: "Tv"
  },
  {
    id: "cat-ai-tools",
    name: "AI Tools & Software",
    slug: "ai-tools",
    description: "Best artificial intelligence apps, SaaS, and productivity software.",
    icon: "BrainCircuit"
  },
  {
    id: "cat-budget",
    name: "Budget Finds",
    slug: "budget-finds",
    description: "Incredible values, cool utility products, and gizmos under ₹999.",
    icon: "Tag"
  },
  {
    id: "cat-creator",
    name: "Creator Essentials",
    slug: "creator-essentials",
    description: "Must-have lighting, mics, tripods, and gear to upgrade your setup.",
    icon: "Video"
  },
  {
    id: "cat-home",
    name: "Smart Home & Living",
    slug: "smart-home",
    description: "Intelligent lights, organization tools, and aesthetic desk upgrades.",
    icon: "Home"
  },
  {
    id: "cat-travel",
    name: "Travel Accessories",
    slug: "travel-accessories",
    description: "Portable chargers, organizers, and gadgets to make commuting a breeze.",
    icon: "Compass"
  }
]

export const seedTags: Tag[] = [
  { id: "tag-amazon", name: "Amazon Finds", slug: "amazon-finds" },
  { id: "tag-productivity", name: "Productivity", slug: "productivity" },
  { id: "tag-student", name: "Student Picks", slug: "student" },
  { id: "tag-under999", name: "Under ₹999", slug: "under-999" },
  { id: "tag-gaming", name: "Gaming Setup", slug: "gaming" },
  { id: "tag-coding", name: "For Coders", slug: "coding" },
  { id: "tag-wireless", name: "Wireless Tech", slug: "wireless" }
]

export const seedProducts: Product[] = [
  {
    id: "prod-1",
    title: "Zebronics Zeb-Transformer Gaming Keyboard & Mouse Combo",
    slug: "zebronics-zeb-transformer-combo",
    description: "The ultimate budget mechanical-feel gaming keyboard and mouse combo with dynamic multicolor LED lights.",
    longDescription: `Elevate your gaming setup without breaking the bank. The Zebronics Zeb-Transformer is a premium USB gaming keyboard and mouse combo designed for performance, comfort, and high-octane aesthetics.

### Key Features
- **Integrated Media Keys**: Control your music and volume on the fly without exiting your game.
- **Multicolor LED Backlighting**: Choose between multiple breathing lighting modes or turn them off for work.
- **Ergonomic Design**: Heavy-duty metal plate body ensures the keyboard stays anchored during intense sessions. The mouse features a comfortable grip fitting the natural curves of your hand.
- **DPI Adjustment**: Quick toggle mouse DPI settings (1000/1600/2400/3200 DPI) to match your gameplay sensitivity.

### Why We Recommend It
For students and budget-conscious gamers in India, this combo offers the perfect blend of durablity and futuristic looks. The metal panel feels heavy and premium, far exceeding its price point. It has tactile feedback that mimics mechanical switches, making typing and gaming incredibly satisfying.`,
    price: 1199,
    originalPrice: 1599,
    rating: 4.5,
    trendingScore: 92.5,
    affiliateLink: "https://amazon.in/dp/B078N29M55",
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
    couponCode: "ZEBTRANS50",
    isFeatured: true,
    isSponsored: false,
    viewsCount: 2405,
    clicksCount: 312,
    categoryId: "cat-gadgets",
    tags: ["amazon-finds", "gaming", "student"],
    publishedAt: "2026-05-20T10:00:00Z",
    faqs: [
      { q: "Is the keyboard mechanical?", a: "No, it is a membrane keyboard designed to have a tactile, mechanical-like keypress feel." },
      { q: "Does the backlight work with macOS?", a: "Yes, the lighting and keys are fully compatible with macOS, Windows, and Linux." }
    ],
    pros: [
      "Extremely robust metal chassis",
      "Gorgeous multi-zone breathing LED lights",
      "Very long braided durable cable",
      "Incredible value-for-money combo"
    ],
    cons: [
      "Keys are slightly noisy",
      "Keyboard is heavy to carry"
    ],
    specifications: {
      "Interface": "USB Type-A",
      "Cable Length": "1.8 Meters (Braided)",
      "Backlighting": "Multicolor Breathing LED",
      "Mouse Resolution": "Up to 3200 DPI"
    }
  },
  {
    id: "prod-2",
    title: "Portronics Ruffpad 8.5 Reusable LCD Slate",
    slug: "portronics-ruffpad-lcd-writing-slate",
    description: "An eco-friendly 8.5-inch electronic writing pad perfect for note-taking, calculations, and kids sketching.",
    longDescription: `Go paperless with the Portronics Ruffpad 8.5. This ultra-thin, lightweight electronic drawing and writing tablet is the ultimate companion for students, developers, and designers to jot down quick notes, pseudocode, or calculations.

### Crisp Screen & Easy Operations
The Ruffpad features an advanced high-contrast pressure-sensitive screen. Pressing down harder creates thicker strokes. One-touch erase cleans the screen instantly.

### Safety Lock
Features a key lock at the back, preventing accidental deletion of important notes.

### Durability
Housed in a shockproof ABS body, it survives bumps and falls. The CR2016 coin cell battery lasts up to a year and is easily replaceable.`,
    price: 249,
    originalPrice: 499,
    rating: 4.3,
    trendingScore: 89.0,
    affiliateLink: "https://amazon.in/dp/B08F7GDWXY",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    couponCode: "PORTPAD10",
    isFeatured: false,
    isSponsored: false,
    viewsCount: 5690,
    clicksCount: 840,
    categoryId: "cat-budget",
    tags: ["amazon-finds", "student", "under-999", "productivity"],
    publishedAt: "2026-05-22T08:00:00Z",
    faqs: [
      { q: "Can we save our drawings to a phone?", a: "No, this is a standalone device with no connectivity. You can take a photo of the slate with your phone if you wish to save it." },
      { q: "Is the battery included?", a: "Yes, it comes pre-installed with a battery and is ready to use out of the box." }
    ],
    pros: [
      "Incredibly cheap and eco-friendly",
      "Very lightweight and easy to carry",
      "Accidental erase lock switch",
      "StYLUS pen is included"
    ],
    cons: [
      "Screen is not backlit (needs good room lighting)",
      "Cannot save notes digitally"
    ]
  },
  {
    id: "prod-3",
    title: "Claude 3.5 Sonnet API Sandbox",
    slug: "claude-sonnet-developer-dashboard",
    description: "The gold standard LLM for coding assistants, reasoning, and context processing with 200k token window.",
    longDescription: `Anthropic's Claude 3.5 Sonnet sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency.

### Code Generation & Debugging
Claude excels at writing complex multi-file React architectures, optimizing database queries, and explaining sophisticated legacy systems.

### Fast Performance
Operates at twice the speed of Claude 3 Opus, making it ideal for real-time customer support chatbots, data extraction, and programming copilots.

### Large Context Window
Boasts a 200,000 token context window, allowing you to feed in entire directories, white papers, or financial ledgers in a single API call.`,
    price: 1650, // Rs equivalent of API usage / credits / subscription
    originalPrice: 2000,
    rating: 4.9,
    trendingScore: 98.2,
    affiliateLink: "https://anthropic.com/claude",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    couponCode: "CLAUDECODE",
    isFeatured: true,
    isSponsored: false,
    viewsCount: 8900,
    clicksCount: 1420,
    categoryId: "cat-ai-tools",
    tags: ["productivity", "coding"],
    publishedAt: "2026-05-24T12:00:00Z",
    faqs: [
      { q: "How much does it cost?", a: "Claude is free on the web. The Pro plan costs $20/month. Developer API pricing is based on input/output tokens." }
    ],
    pros: [
      "Unmatched coding and math capabilities",
      "Extremely long context window (200k tokens)",
      "Beautiful, clean web interface with Artifacts",
      "High speed response generation"
    ],
    cons: [
      "Free version has tight usage limits",
      "No image generation capabilities"
    ]
  },
  {
    id: "prod-4",
    title: "Digitek DTR 550 LW Lightweight Tripod",
    slug: "digitek-dtr-550-tripod",
    description: "A premium 3-way pan head tripod with cell phone mount, perfect for Reels, YouTube vlogging, and photography.",
    longDescription: `Upgrade your content creation with the Digitek DTR 550 LW. Crafted from high-grade aluminum, this lightweight tripod offers stability, durability, and multi-angle flexibility.

### 3-Way Pan Head
Provides complete control over your framing. Easily switch between horizontal landscapes and vertical portrait orientations for TikTok, Reels, and YouTube Shorts.

### Portable & Expandable
Folds down to a compact 52cm for travel and extends up to 170cm (5.5 feet) for full-body shots. Includes a convenient carry bag and a premium universal smartphone holder.`,
    price: 1299,
    originalPrice: 2499,
    rating: 4.4,
    trendingScore: 85.6,
    affiliateLink: "https://amazon.in/dp/B07N5F37G6",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    couponCode: "DIGITEK10",
    isFeatured: false,
    isSponsored: false,
    viewsCount: 3102,
    clicksCount: 450,
    categoryId: "cat-creator",
    tags: ["amazon-finds", "student", "wireless"],
    publishedAt: "2026-05-18T14:00:00Z",
    faqs: [
      { q: "Can this hold a heavy DSLR camera?", a: "Yes, it supports payloads up to 3 kg, making it perfect for entry-level and mid-range DSLRs, mirrorless cameras, and smartphones." }
    ],
    pros: [
      "Extremely affordable high-reach tripod",
      "Lightweight aluminum built",
      "Comes with mobile mount and carry bag",
      "Quick-release mounting plate"
    ],
    cons: [
      "Can feel unstable in strong outdoor winds",
      "Plastic knobs require gentle handling"
    ]
  },
  {
    id: "prod-5",
    title: "Oakwood Ergonomic Laptop Desk Stand",
    slug: "oakwood-ergonomic-laptop-desk-stand",
    description: "Handcrafted wooden laptop stand designed to improve posture, declutter your desk, and optimize laptop cooling.",
    longDescription: `Say goodbye to neck strain. The Oakwood Ergonomic Laptop Stand is a sleek, handcrafted wooden riser that brings your laptop screen to eye level.

### Premium Handcrafted wood
Made from premium walnut wood with anti-slip silicone cushions to keep your laptop safe from scratches.

### Natural Air Ventilation
The open-back design allows natural air circulation, preventing your laptop from overheating during intensive coding or gaming sessions.

### Declutter Your Workspace
Creates a storage space underneath the laptop where you can store your keyboard, mouse, or notebook when not in use.`,
    price: 1899,
    originalPrice: 2999,
    rating: 4.7,
    trendingScore: 91.0,
    affiliateLink: "https://amazon.in/dp/B09D8H7VYZ",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    couponCode: "WOODDESK",
    isFeatured: false,
    isSponsored: true,
    viewsCount: 4200,
    clicksCount: 680,
    categoryId: "cat-home",
    tags: ["productivity", "coding", "amazon-finds"],
    publishedAt: "2026-05-23T11:00:00Z",
    faqs: [
      { q: "Is it suitable for 16-inch laptops?", a: "Yes, it supports all laptop sizes from 11 inches to 17 inches." }
    ],
    pros: [
      "Beautiful aesthetic wooden finish",
      "Significantly improves eye-level posture",
      "Organized desk storage underneath",
      "Highly stable with no shaking"
    ],
    cons: [
      "Non-adjustable fixed height",
      "Takes up a fair amount of desk space"
    ]
  },
  {
    id: "prod-6",
    title: "Qubo Smart WiFi Plug (16A)",
    slug: "qubo-smart-wifi-plug-16a",
    description: "Control your heavy appliances like geysers, ACs, and water pumps from anywhere in the world with Alexa & Google Assistant.",
    longDescription: `Turn your regular home appliances into smart devices with the Qubo Smart WiFi Plug.

### App Control from Anywhere
Switch on your geyser from bed or schedule your air conditioner to cool the room before you arrive home, using the Qubo app.

### Voice Control
Works seamlessly with Amazon Alexa and Google Assistant. Turn appliances on or off with simple voice commands.

### Energy Monitoring
Tracks power consumption of connected appliances, helping you manage energy usage and reduce electricity bills.

### Scheduled Timers
Set automated schedules to turn appliances off after a set duration, preventing damage from overcharging or overheating.`,
    price: 899,
    originalPrice: 1490,
    rating: 4.2,
    trendingScore: 87.5,
    affiliateLink: "https://amazon.in/dp/B09B36RBSL",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    couponCode: "QUBOSMART",
    isFeatured: false,
    isSponsored: false,
    viewsCount: 3904,
    clicksCount: 520,
    categoryId: "cat-home",
    tags: ["amazon-finds", "under-999", "wireless"],
    publishedAt: "2026-05-19T09:00:00Z",
    faqs: [
      { q: "Do I need a separate smart hub?", a: "No, it connects directly to your home's 2.4 GHz WiFi network." }
    ],
    pros: [
      "Supports heavy load appliances (16 Amps)",
      "Real-time power monitoring stats",
      "Very reliable scheduled triggers",
      "Budget friendly price"
    ],
    cons: [
      "Does not connect to 5 GHz WiFi networks",
      "App interface is slightly slow"
    ]
  }
]

export const seedBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Build a Minimum Viable Coding Setup Under ₹5000",
    slug: "minimal-coding-setup-under-5000",
    summary: "A practical guide for engineering students in India to set up a productive coding desk with mechanical keyboards, laptop risers, and cables.",
    content: `Starting your coding journey as a student in India can be daunting, especially when you see Instagram and YouTube influencers showing off desk setups worth lakhs. The truth is, you don't need a 4K monitor, a walnut desk, or custom mechanical keyboards to write good code.

Here is a breakdown of how you can build a highly ergonomic, satisfying coding desk setup for under ₹5000.

### 1. Ergonomic Laptop Stand (Budget: ₹500 - ₹1200)
Hunching over your laptop for hours is a fast track to chronic neck pain. Raising your laptop screen to eye level is non-negotiable.
- **Our Pick**: [Portronics Ruffpad 8.5](file:///products/portronics-ruffpad-lcd-writing-slate) or an adjustable metal riser like the [Oakwood Stand](file:///products/oakwood-ergonomic-laptop-desk-stand).
- **Benefit**: Elevates the screen and optimizes airflow, cooling down your laptop during compilation tasks.

### 2. Tactile Keyboard & Mouse Combo (Budget: ₹1200 - ₹1500)
A separate keyboard and mouse allow your hands to rest at a comfortable 90-degree angle.
- **Our Pick**: [Zebronics Zeb-Transformer Combo](file:///products/zebronics-zeb-transformer-combo).
- **Benefit**: Heavy, robust typing surface with satisfying tactile travel and customizable backlights for late-night coding.

### 3. Desk Mat & Cable Organizers (Budget: ₹500)
A large felt or leather desk mat anchors your keyboard, protects your desk, and creates a clear mental space for work.
- **Tip**: Grab a pack of hook-and-loop cable ties to bundle charger cables behind your desk.

By focusing on ergonomics first and aesthetics second, you can create a clutter-free station that encourages you to sit down and build projects daily!`,
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-creator",
    authorName: "Abhishek Sharma",
    publishedAt: "2026-05-25T14:00:00Z",
    readTime: "4 min read"
  },
  {
    id: "blog-2",
    title: "Top 5 AI Coding Assistants in 2026: Compared",
    slug: "top-5-ai-coding-assistants-compared",
    summary: "An in-depth look at Claude 3.5 Sonnet, GitHub Copilot, Cursor, Gemini 2.0, and ChatGPT Pro for developer productivity.",
    content: `The programming landscape has shifted permanently. In 2026, writing software isn't just about syntax; it's about context orchestration and partnering with AI. Let's compare the top tools available for devs today.

### 1. Claude 3.5 Sonnet (Anthropic)
- **Strengths**: Graduate-level logical reasoning, complex refactoring, multi-file code understanding, and UI preview via Artifacts.
- **Redirection**: Read our full review of the [Claude 3.5 Sonnet API](file:///products/claude-sonnet-developer-dashboard).
- **Verdict**: Currently the undisputed champion for developer reasoning.

### 2. Cursor (Fork of VS Code)
- **Strengths**: Deeply integrated codebase index, inline edits, and auto-completions.
- **Verdict**: The best overall development environment interface for working with AI models.

### 3. GitHub Copilot
- **Strengths**: Lightning fast ghost-text suggestions and deep workspace integration.
- **Verdict**: The standard utility that every developer should leave enabled.`,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-ai-tools",
    authorName: "Ananya Iyer",
    publishedAt: "2026-05-26T09:00:00Z",
    readTime: "6 min read"
  }
]

export const seedSEOPages: SEOPage[] = [
  {
    id: "seo-1",
    title: "Best Budget Gadgets in India Under ₹999 (2026 Guide)",
    slug: "best-budget-gadgets-india",
    type: "GUIDE",
    targetKeywords: "best budget gadgets, gadgets under 999, cool tech under 1000",
    description: "Discover the ultimate list of viral gadgets, smart home tools, and student tech accessories in India priced under Rs. 999.",
    content: `# Best Budget Gadgets in India Under ₹999 (2026 Guide)

Finding cool tech on a tight budget can be hard. Fortunately, local Indian marketplaces are flooded with smart items that offer high utility without crossing the thousand-rupee mark. In this buying guide, we highlight the absolute best budget gadgets available today.

## Our Top Budget Picks

### 1. Portronics Ruffpad 8.5 Reusable Slate
* **Category**: Eco-Friendly Notepad
* **Price**: ₹249 (approx)
* **Link**: [View Portronics Ruffpad Details](file:///products/portronics-ruffpad-lcd-writing-slate)
* **Why it's great**: Perfect for calculations, doodles, and replacing scratch paper on your desk.

### 2. Qubo Smart WiFi Plug (16A)
* **Category**: Smart Home Plug
* **Price**: ₹899 (approx)
* **Link**: [View Qubo Smart Plug Details](file:///products/qubo-smart-wifi-plug-16a)
* **Why it's great**: Allows you to schedule heavy appliances like geysers or ACs using voice controls.

## Frequently Asked Questions

### Are gadgets under ₹999 durable?
Yes, brands like Portronics, Qubo, and Zebronics offer warranties ranging from 6 months to 1 year, making them highly reliable choices for daily use.

### Where can I find these products?
You can find them at discounted rates on Amazon India, Flipkart, and directly through brand stores. We include direct affiliate discount codes below!`,
    isPublished: true
  }
]
