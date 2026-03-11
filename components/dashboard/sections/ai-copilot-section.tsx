"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send, Sparkles, Loader2, Copy, ThumbsUp, ThumbsDown, RotateCcw,
  Image as ImageIcon, FileText, Hash, Lightbulb, MessageSquare,
  BarChart3, Wand2, Bot, User, Zap
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'caption' | 'hashtags' | 'script' | 'ideas' | 'analytics';
}

const QUICK_ACTIONS = [
  { icon: FileText, label: 'Generate Caption', prompt: 'Write an engaging social media caption about', type: 'caption' },
  { icon: Hash, label: 'Generate Hashtags', prompt: 'Generate trending hashtags for a post about', type: 'hashtags' },
  { icon: MessageSquare, label: 'Write Script', prompt: 'Write a short video script about', type: 'script' },
  { icon: Lightbulb, label: 'Content Ideas', prompt: 'Give me 5 content ideas about', type: 'ideas' },
  { icon: BarChart3, label: 'Analyze Trends', prompt: 'Analyze current social media trends for', type: 'analytics' },
  { icon: Wand2, label: 'Improve Post', prompt: 'Improve this social media post:', type: 'caption' },
];

const DEMO_RESPONSES: Record<string, string> = {
  caption: `✨ Here's a captivating caption for your post:

**"Every great journey starts with a single step — and this is ours! 🚀**

We're thrilled to announce something truly special that we've been working on for months. This isn't just a product launch; it's a movement toward making creativity accessible to everyone.

Stay tuned, because the best is yet to come! 💫

👉 Drop a 🔥 if you're excited!"

---
**Tips:** Use this with a carousel of behind-the-scenes photos for maximum engagement. Post between 6-8 PM for best reach.`,

  hashtags: `# 🏷️ Trending Hashtags for Your Post:

**Primary (High Volume):**
\`#ContentCreator\` \`#SocialMediaMarketing\` \`#DigitalMarketing\` \`#GrowYourBrand\` \`#Entrepreneurship\`

**Secondary (Medium Volume):**
\`#CreatorEconomy\` \`#ContentStrategy\` \`#BrandBuilding\` \`#MarketingTips\` \`#SocialMediaTips\`

**Niche (Low Competition):**
\`#CreatorTools\` \`#SocialMediaManager\` \`#ContentPlanning\` \`#GrowOnInstagram\` \`#TikTokGrowth\`

**Best Practice:** Use 15-20 hashtags on Instagram, 3-5 on Twitter/X, and 3-5 on LinkedIn.`,

  script: `# 🎬 Video Script (30-60 seconds)

**[HOOK - 0-3 seconds]**
"Stop scrolling — this changed how I create content forever."

**[PROBLEM - 3-8 seconds]**
"I used to spend HOURS managing my social media across 5 different platforms. Posting, scheduling, analyzing... it was exhausting."

**[SOLUTION - 8-20 seconds]**
"Then I found a way to manage everything from ONE dashboard. I schedule posts, generate AI content, track analytics, and even automate responses — all in one place."

**[PROOF - 20-35 seconds]**
"In just 30 days, my engagement went up 340%, I saved 12 hours per week, and my follower count doubled."

**[CTA - 35-45 seconds]**
"Want to try it? Link in bio. Trust me, your future self will thank you."

---
**Notes:** Film in portrait mode for TikTok/Reels. Add trending audio. Use jump cuts for energy.`,

  ideas: `# 💡 5 Content Ideas

1. **"Day in My Life" Vlog** — Show your creative process from morning to night. Behind-the-scenes content gets 3x more engagement than polished posts.

2. **Interactive Poll Series** — "This or That?" posts about industry topics. Drives comments and shares. Example: "SEO vs Paid Ads — which is more important in 2025?"

3. **Myth-Busting Thread** — "5 Social Media Myths That Are Killing Your Growth" — edutainment content that positions you as an expert.

4. **Collaboration Challenge** — Partner with 3 creators in your niche for a challenge series. Cross-pollinate audiences for mutual growth.

5. **Monthly Analytics Breakdown** — Share your real numbers (views, engagement, revenue). Transparency builds trust and gets bookmarked.

---
**Bonus:** Turn each idea into 3 pieces of content: a long-form video, a carousel, and a text post. That's 15 pieces from 5 ideas! 🎯`,

  analytics: `# 📊 Trend Analysis Report

**Current Top Trends:**

1. **Short-form Video Dominance** — TikTok & Reels continue to outperform static content by 5x in reach. Optimal length: 15-30 seconds.

2. **AI-Generated Content** — 67% of creators now use AI tools. Key: Use AI as a starting point, then add your personal voice.

3. **Community Building > Follower Count** — Platforms are prioritizing engagement rate over raw numbers. Focus on replies and DMs.

4. **Carousel Posts Resurgence** — On Instagram, carousels get 1.4x more reach than single images. Educational carousels perform best.

5. **Authenticity > Polish** — Raw, unfiltered content is outperforming highly produced content by 2.3x on most platforms.

**Recommendations:**
- Increase video content to 60% of your posting mix
- Post 1-2 carousels per week
- Respond to every comment within 1 hour
- Use trending audio within the first 24 hours of release`,
};

export function AICopilotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "👋 Hi! I'm your AI creative copilot powered by **NVIDIA NIM, Groq, and Google Gemini**.\n\nI can help you:\n- 📝 Write captions and scripts\n- #️⃣ Generate hashtags\n- 💡 Brainstorm content ideas\n- 📊 Analyze trends\n- ✨ Improve your existing posts\n\nWhat would you like to create today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (customPrompt?: string, type?: string) => {
    const messageText = customPrompt || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      type: (type as Message['type']) || 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setActiveType(type || 'text');

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

    const responseType = type || detectType(messageText);
    const responseContent = DEMO_RESPONSES[responseType] ||
      `I'll help you with that! Here's what I've generated:\n\n${messageText}\n\n*This is a demo response. Connect your AI API keys (NVIDIA, Groq, or Gemini) in Settings to get real AI-powered responses.*`;

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      type: responseType as Message['type'],
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    setActiveType(null);

    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const detectType = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('hashtag') || lower.includes('#')) return 'hashtags';
    if (lower.includes('caption')) return 'caption';
    if (lower.includes('script') || lower.includes('video')) return 'script';
    if (lower.includes('idea') || lower.includes('content')) return 'ideas';
    if (lower.includes('trend') || lower.includes('analyz') || lower.includes('analytics')) return 'analytics';
    return 'caption';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerate = (message: Message) => {
    handleSend(messages[messages.indexOf(message) - 1]?.content || '', message.type || 'text');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Creative Copilot</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Powered by NVIDIA NIM • Groq • Gemini</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex items-center gap-1">
            <Zap className="h-3 w-3" /> {messages.filter(m => m.role === 'assistant').length - 1} generations
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_ACTIONS.map(action => (
          <Button
            key={action.type}
            variant="outline"
            size="sm"
            className="text-xs gap-1 hover:bg-violet-500/10 hover:border-violet-500/50 transition-all"
            onClick={() => {
              setInput(action.prompt + ' ');
              document.getElementById('ai-input')?.focus();
            }}
          >
            <action.icon className="h-3 w-3" /> {action.label}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <Card className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map(message => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-blue-600'
            }`}>
              {message.role === 'assistant' ? <Sparkles className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
            </div>
            <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              }`}>
                {message.content}
              </div>
              {message.role === 'assistant' && message.id !== '0' && (
                <div className="flex items-center gap-1 mt-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => copyToClipboard(message.content)}><Copy className="h-3 w-3 mr-1" />Copy</Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => regenerate(message)}><RotateCcw className="h-3 w-3 mr-1" />Regen</Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ThumbsUp className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ThumbsDown className="h-3 w-3" /></Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Sparkles className="h-4 w-4 text-white animate-spin" /></div>
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 text-sm flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating {activeType ? activeType + '...' : '...'}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            id="ai-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything... (e.g., 'Write a caption for a fitness brand')"
            className="w-full px-4 py-3 pr-12 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled={isLoading}
          />
          <Button
            size="sm"
            className="absolute right-1 top-1 bottom-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
