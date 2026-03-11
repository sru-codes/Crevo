"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Send, MessageSquare, Youtube, Twitter } from "lucide-react";

const demoMessages = [
  { id: "1", platform: "instagram", sender: "Sarah_Creates", message: "Love your latest post! Can we collab?", time: "2 min ago", avatar: "SC", unread: true },
  { id: "2", platform: "discord", sender: "TechFan_001", message: "When is the next live stream?", time: "15 min ago", avatar: "TF", unread: true },
  { id: "3", platform: "telegram", sender: "ContentKing", message: "Thanks for the shoutout! 🙏", time: "1 hr ago", avatar: "CK", unread: false },
  { id: "4", platform: "youtube", sender: "ViewerMax", message: "Great tutorial, learned a lot!", time: "3 hr ago", avatar: "VM", unread: false },
  { id: "5", platform: "twitter", sender: "@brand_partner", message: "Interested in a sponsored post? DM us.", time: "5 hr ago", avatar: "BP", unread: true },
];

const platformIcon = (platform: string) => {
  switch (platform) {
    case "instagram": return <Instagram className="h-4 w-4 text-pink-500" />;
    case "discord": return <MessageSquare className="h-4 w-4 text-indigo-500" />;
    case "telegram": return <Send className="h-4 w-4 text-blue-400" />;
    case "youtube": return <Youtube className="h-4 w-4 text-red-500" />;
    case "twitter": return <Twitter className="h-4 w-4 text-sky-400" />;
    default: return <MessageCircle className="h-4 w-4" />;
  }
};

export function CommunitySection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community Manager</h2>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" /> Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Unread Messages</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">23</div><p className="text-xs text-muted-foreground">Across all platforms</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Response Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">94%</div><p className="text-xs text-muted-foreground">Avg response time: 12 min</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Conversations</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">156</div><p className="text-xs text-muted-foreground">This week</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Sentiment Score</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-500">😊 Positive</div><p className="text-xs text-muted-foreground">87% positive interactions</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Unified Inbox</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoMessages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-accent/50 cursor-pointer ${msg.unread ? 'bg-accent/20 border-primary/20' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {platformIcon(msg.platform)}
                    <span className="font-medium text-sm">{msg.sender}</span>
                    {msg.unread && <span className="w-2 h-2 rounded-full bg-violet-500" />}
                    <span className="text-xs text-muted-foreground ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
                <Button variant="outline" size="sm">Reply</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
