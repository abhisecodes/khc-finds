import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// A helper for fallback content generation
function generateMockAIContent(productName: string, category: string) {
  const cleanName = productName.trim()
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  
  return {
    title: `${cleanName} - Premium Review`,
    slug,
    description: `A highly recommended, premium ${category.toLowerCase() || "item"} built to deliver top-tier performance, sleek aesthetics, and exceptional durability for daily use.`,
    longDescription: `## Full Hands-On Review

The **${cleanName}** is setting new standards in the ${category || "market"}. Designed for modern users who prioritize efficiency and durability, this product delivers on all counts.

### Build Quality & Ergonomics
Right out of the box, the first thing you notice is the premium build. The materials feel solid, and the layout is ergonomically optimized to prevent fatigue during extended usage.

### Key Performance Indicators
- **High Efficiency**: Deliver operations at double the standard benchmark rates.
- **Modern Styling**: Seamless integration into any premium desk setup or smart home ecosystem.
- **Sustainable Lifecycle**: Engineered with robust components that extend usage limits.

### Summary
If you are looking to upgrade your setup, this is a highly worthwhile investment. It offers exceptional value-for-money and is backed by a reliable manufacturer warranty.`,
    price: 999,
    originalPrice: 1499,
    rating: 4.6,
    trendingScore: 85,
    tags: ["amazon-finds", "productivity", "student"],
    pros: [
      "Extremely robust and premium build",
      "Ergonomically designed for long hours",
      "Incredible value compared to competitors"
    ],
    cons: [
      "Requires initial setup time",
      "Slightly heavy to carry"
    ],
    faqs: [
      { q: "Is this product covered by a warranty?", a: "Yes, it comes with a standard 1-year domestic manufacturer warranty." },
      { q: "Can we use this with macOS and Windows?", a: "Yes, it features cross-platform compatibility right out of the box." }
    ]
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productName, category } = body

    if (!productName) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // If API key is not present, fall back to mock generator
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      console.warn("GEMINI_API_KEY is not configured. Returning static mock AI content.")
      const mockData = generateMockAIContent(productName, category || "Gadget")
      return NextResponse.json(mockData)
    }

    // Initialize Google Gen AI
    const ai = new GoogleGenerativeAI(apiKey)
    // Use the latest flash model
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `You are an expert copywriter and SEO affiliate editor for a premium product discovery platform in India.
Analyze this product name: "${productName}" (Category: "${category || "General"}").
Generate a highly clickable, conversions-optimized review package in JSON format.

The JSON MUST contain exactly the following fields (do not wrap in markdown quotes, output raw JSON only):
{
  "title": "A clean, high-converting product title",
  "slug": "url-friendly-slug-for-product",
  "description": "A punchy, curiosity-inducing short description (1-2 sentences)",
  "longDescription": "Detailed markdown product review explaining design, features, and overall recommendation (approx 200-300 words). Use standard headings ##, ###, bullet points, and bold text.",
  "price": estimated numeric price in INR (e.g. 1499),
  "originalPrice": estimated numeric original price in INR (e.g. 2499),
  "rating": rating out of 5 (e.g. 4.5),
  "trendingScore": calculated trending popularity score from 50 to 98,
  "tags": ["array", "of", "3-4", "slug-style", "tags", "like", "amazon-finds", "productivity", "gaming"],
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con 1", "con 2"],
  "faqs": [
    { "q": "Faq Question 1?", "a": "Detailed answer." },
    { "q": "Faq Question 2?", "a": "Detailed answer." }
  ]
}

Ensure the output is valid JSON, directly parsable, and optimized for high-converting CTR.`

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })

    const text = result.response.text()
    if (!text) {
      throw new Error("Empty response from Gemini API")
    }

    const parsedJson = JSON.parse(text)
    return NextResponse.json(parsedJson)
  } catch (error) {
    console.error("Gemini API error:", error)
    // On any error (API rate limit, bad response format, parsing error), fallback gracefully
    const fallbackData = generateMockAIContent(
      (await req.clone().json()).productName || "Product", 
      (await req.clone().json()).category || "Gadget"
    )
    return NextResponse.json({
      ...fallbackData,
      _note: "Returned fallback data due to Gemini API connection error."
    })
  }
}
