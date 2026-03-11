"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Hash, Video, MessageSquare, Lightbulb, Send, Loader2 } from "lucide-react";

const aiTools = [
  { id: "caption", label: "Generate Captions", icon: Sparkles, description: "Create engaging captions for your posts" },
  { id: "hashtags", label: "Suggest Hashtags", icon: Hash, description: "Find trending hashtags for maximum reach" },
  { id: "script", label: "Write Script", icon: Video, description: "Generate video scripts with hooks & CTAs" },
  { id: "reply", label: "Auto-Reply", icon: MessageSquare, description: "Draft authentic replies to comments" },
  { id: "ideas", label: "Content Ideas", icon: Lightbulb, description: "Get 10 unique content ideas for your niche" },
];

export function AIAssistantSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<'nvidia' | 'groq' | 'gemini'>('gemini');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse("");

    // Simulate AI response (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResponse(`🤖 Generated with ${provider.toUpperCase()}:\n\nHere are 3 engaging captions for your content:\n\n1. ✨ "Transform your morning routine with these 5 simple habits that changed everything for me. Which one resonates with you? 👇"\n#morningroutine #productivity #lifestyle\n\n2. 🚀 "Stop scrolling and start creating. Your future self will thank you! Here's what I learned this week..."\n#contentcreator #motivation #growth\n\n3. 💡 "The secret nobody tells you about going viral: It's not about the algorithm — it's about the story. Here's mine..."\n#viral #storytelling #authenticity`);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Powered by NVIDIA NIM • Groq • Google Gemini</p>
        </div>
      </div>

      {/* AI Provider Selector */}
      <div className="flex gap-2">
        {(['gemini', 'groq', 'nvidia'] as const).map((p) => (
          <Button
            key={p}
            variant={provider === p ? "default" : "outline"}
            size="sm"
            onClick={() => setProvider(p)}
            className="capitalize"
          >
            {p === 'nvidia' ? '🟢 NVIDIA' : p === 'groq' ? '⚡ Groq' : '💎 Gemini'}
          </Button>
        ))}
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {aiTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
              selectedTool === tool.id
                ? 'border-violet-500 bg-violet-500/10 shadow-md'
                : 'hover:border-violet-500/50'
            }`}
          >
            <tool.icon className="h-6 w-6 mb-2 text-violet-500" />
            <p className="font-medium text-sm">{tool.label}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedTool ? aiTools.find(t => t.id === selectedTool)?.label : "Ask Crevo AI anything..."}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={selectedTool === 'caption' ? "Describe your post content or topic..."
                : selectedTool === 'hashtags' ? "Enter your topic and target platform..."
                : selectedTool === 'script' ? "What's the video about? Include duration..."
                : selectedTool === 'reply' ? "Paste the comment you want to reply to..."
                : selectedTool === 'ideas' ? "Describe your niche and target platform..."
                : "Ask me anything about content creation, social media strategy, or analytics..."
              }
              className="w-full min-h-[120px] p-4 rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Using: <span className="font-medium capitalize">{provider}</span> • {selectedTool || 'General'} mode
            </p>
            <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Generate</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Response */}
      {response && (
        <Card className="border-violet-500/30 bg-violet-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-violet-500" /> AI Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm font-sans">{response}</pre>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">📋 Copy</Button>
              <Button variant="outline" size="sm">📝 Use in Post</Button>
              <Button variant="outline" size="sm">🔄 Regenerate</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
