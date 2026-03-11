"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Plus, Check, X, Instagram, Youtube, Twitter, MessageSquare, Send, Facebook } from "lucide-react";

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500", connected: true, accounts: 2, description: "Posts, Reels, Stories" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600", connected: true, accounts: 1, description: "Videos, Shorts, Community" },
  { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "from-zinc-700 to-black", connected: true, accounts: 1, description: "Tweets, Threads, Spaces" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600", connected: false, accounts: 0, description: "Posts, Reels, Groups" },
  { id: "discord", name: "Discord", icon: MessageSquare, color: "from-indigo-500 to-indigo-600", connected: true, accounts: 1, description: "Messages, Roles, Channels" },
  { id: "telegram", name: "Telegram", icon: Send, color: "from-sky-400 to-blue-500", connected: false, accounts: 0, description: "Messages, Channels, Bots" },
  { id: "tiktok", name: "TikTok", icon: () => <span className="text-lg">🎵</span>, color: "from-zinc-900 to-zinc-800", connected: false, accounts: 0, description: "Videos, Duets, Live" },
  { id: "linkedin", name: "LinkedIn", icon: () => <span className="text-lg">in</span>, color: "from-blue-600 to-blue-700", connected: false, accounts: 0, description: "Posts, Articles, Pages" },
  { id: "reddit", name: "Reddit", icon: () => <span className="text-lg">🤖</span>, color: "from-orange-500 to-orange-600", connected: false, accounts: 0, description: "Posts, Comments" },
  { id: "pinterest", name: "Pinterest", icon: () => <span className="text-lg">📌</span>, color: "from-red-400 to-red-500", connected: false, accounts: 0, description: "Pins, Boards" },
  { id: "threads", name: "Threads", icon: () => <span className="text-lg">🧵</span>, color: "from-zinc-800 to-black", connected: false, accounts: 0, description: "Threads, Replies" },
  { id: "bluesky", name: "Bluesky", icon: () => <span className="text-lg">🦋</span>, color: "from-sky-400 to-blue-400", connected: false, accounts: 0, description: "Posts, Feeds" },
];

export function IntegrationsSection() {
  const connectedCount = platforms.filter(p => p.connected).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Link2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Integrations</h2>
            <p className="text-sm text-muted-foreground">{connectedCount} of {platforms.length} platforms connected</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <Card key={platform.id} className={`hover:shadow-lg transition-all ${platform.connected ? 'border-green-500/30' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  {platform.connected ? (
                    <span className="flex items-center gap-1 text-xs text-green-500 font-medium px-2 py-1 rounded-full bg-green-500/10">
                      <Check className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground px-2 py-1 rounded-full bg-accent">
                      <X className="h-3 w-3" /> Not connected
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{platform.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{platform.description}</p>
                {platform.connected ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{platform.accounts} account(s)</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ) : (
                  <Button className="w-full" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
