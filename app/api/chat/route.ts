import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getProducts } from "@/lib/services/db-service"

// Simple local search matching for fallback
async function runLocalChatSearch(message: string) {
  const products = await getProducts()
  const q = message.toLowerCase()
  
  const matched = products.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => q.includes(t))
  )

  if (matched.length === 0) {
    return `Hello! I couldn't find any products in our catalog specifically matching your query. 
Explore our [Full Catalog](/explore) to see what's trending, or search for keywords like "keyboard", "Ruffpad", or "AI"!`
  }

  const itemsList = matched.map(p => `- **[${p.title}](/products/${p.slug})** (₹${p.price}) - ${p.description}`).join("\n")

  return `Hello! Based on our catalog, here are the best matches for your search:

${itemsList}

Click on any link to read our full review, see pros and cons, and copy discount coupon codes!`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    const userMessage = messages[messages.length - 1].content
    const apiKey = process.env.GEMINI_API_KEY

    // Fall back if API key is not configured
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      console.warn("GEMINI_API_KEY is not configured. Using local chatbot search fallback.")
      const localReply = await runLocalChatSearch(userMessage)
      return NextResponse.json({ role: "model", content: localReply })
    }

    // Fetch product catalog to provide context to Gemini
    const products = await getProducts()
    const catalogContext = products.map(p => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      rating: p.rating,
      category: p.categoryId,
      tags: p.tags
    }))

    const ai = new GoogleGenerativeAI(apiKey)
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" })

    const systemPrompt = `You are a helpful, expert AI Product Assistant for "KHC Finds", a premium affiliate discovery platform in India.
Your goal is to guide users to discover cool Amazon products, gadgets, AI tools, and accessories from our curated catalog.

Here is our current active product catalog:
${JSON.stringify(catalogContext, null, 2)}

Instructions:
1. Suggest products from the catalog that match the user's requirements (e.g. price, use case).
2. When mentioning a product, you MUST format it as a markdown link using: [Product Title](/products/slug).
3. If no products in the catalog match, tell the user you don't have that item yet but suggest they browse our general catalog [Explore Catalog](/explore).
4. Keep your responses concise (under 120 words), conversational, and focused on helping the user decide.
5. Format pricing in Rupees (₹).`

    // Format chat history for Gemini API
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }))
    ]

    const result = await model.generateContent({ contents })
    const replyText = result.response.text()

    if (!replyText) {
      throw new Error("Empty response from model")
    }

    return NextResponse.json({ role: "model", content: replyText })
  } catch (error) {
    console.error("Chatbot API error:", error)
    // Dynamic fallback on connection or formatting error
    const rawBody = await req.clone().json()
    const lastMsg = rawBody.messages?.[rawBody.messages.length - 1]?.content || "hello"
    const localReply = await runLocalChatSearch(lastMsg)
    return NextResponse.json({ role: "model", content: localReply })
  }
}
