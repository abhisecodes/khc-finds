"use client"

import React, { useState, useEffect, useRef } from "react"
import { MessageSquare, X, Send, Sparkles, MessageCircleCode } from "lucide-react"

interface Message {
  role: "user" | "model"
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hey there! 👋 I am your KHC Finds Product Assistant. Looking for anything specific? Ask me about 'mouses under 2000', 'note-taking', or 'smart plugs'!" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (res.ok) {
        const reply = await res.json()
        setMessages([...newMessages, reply])
      } else {
        setMessages([...newMessages, { role: "model", content: "Oops, I encountered an issue. Please try again." }])
      }
    } catch (e) {
      console.error(e)
      setMessages([...newMessages, { role: "model", content: "Failed to connect. Please check your network." }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  // Basic markdown link compiler for chat bubbles
  const renderBubbleText = (text: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex))
      }
      
      const linkText = match[1]
      const href = match[2]
      
      parts.push(
        <a
          key={matchIndex}
          href={href}
          className="text-purple-600 dark:text-purple-400 font-extrabold hover:underline inline-flex items-center"
        >
          {linkText}
        </a>
      )
      
      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Overlay */}
      {isOpen && (
        <div className="glass-panel w-[350px] sm:w-[400px] h-[500px] rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0c0c0f]/95 shadow-2xl flex flex-col mb-4 overflow-hidden transform scale-100 origin-bottom-right transition-all duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">KHC AI Assistant</span>
                <span className="text-[10px] text-purple-200">Online & Ready</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/10"
                      : "bg-gray-100 dark:bg-white/[0.03] text-gray-800 dark:text-gray-200 rounded-bl-none border border-black/[0.02] dark:border-white/[0.04]"
                  }`}
                >
                  {msg.role === "model" ? renderBubbleText(msg.content) : msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading bubble */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-white/[0.03] text-gray-400 p-3.5 rounded-2xl rounded-bl-none border border-black/[0.02] dark:border-white/[0.04] text-xs flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions footer */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-black/[0.03] dark:border-white/[0.03] flex flex-wrap gap-1.5 bg-black/[0.01] dark:bg-white/[0.01]">
              {[
                "Suggest budget finds 💸",
                "Best AI tools 🤖",
                "Oakwood stand info 🪵"
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickPrompt(chip.replace(/ [^ ]+$/, ""))}
                  className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] px-2.5 py-1 rounded-full hover:border-purple-500 hover:text-purple-600 transition-all duration-200"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0c0c0f] flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations..."
              className="flex-grow px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-xl outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-purple-600 disabled:opacity-50 text-white rounded-xl shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/25 transform hover:scale-105 active:scale-95 transition-all glow-primary"
        aria-label="Toggle chat widget"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircleCode className="w-6 h-6" />}
      </button>
    </div>
  )
}
