"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Plus, Play, Pause, Trash2, ArrowRight } from "lucide-react";

const demoAutomations = [
  { id: "1", name: "YouTube → Twitter Cross-post", trigger: "New YouTube video", action: "Post to Twitter", platform: "youtube → twitter", isActive: true, runs: 47 },
  { id: "2", name: "Welcome New Followers", trigger: "New follower on Instagram", action: "Send welcome DM", platform: "instagram", isActive: true, runs: 1283 },
  { id: "3", name: "Discord Role Assignment", trigger: "New Discord member", action: "Assign 'Community' role", platform: "discord", isActive: true, runs: 892 },
  { id: "4", name: "Weekly Analytics Report", trigger: "Every Monday 9 AM", action: "Generate & email report", platform: "all", isActive: false, runs: 23 },
  { id: "5", name: "Engagement Spike Alert", trigger: "Post gets 2x avg engagement", action: "Send notification", platform: "all", isActive: true, runs: 12 },
  { id: "6", name: "Content Recycler", trigger: "Post older than 90 days", action: "Suggest repost with changes", platform: "all", isActive: false, runs: 8 },
];

export function AutomationsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Automations</h2>
            <p className="text-sm text-muted-foreground">Set up workflows that run automatically</p>
          </div>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Create Automation</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Automations</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{demoAutomations.filter(a => a.isActive).length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Executions</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{demoAutomations.reduce((s, a) => s + a.runs, 0).toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Time Saved</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-500">~48 hrs</div><p className="text-xs text-muted-foreground">This month</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Your Automations</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoAutomations.map((auto) => (
              <div key={auto.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${auto.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <div>
                    <p className="font-medium">{auto.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="px-2 py-0.5 rounded bg-accent">{auto.trigger}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="px-2 py-0.5 rounded bg-accent">{auto.action}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{auto.runs} runs</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    {auto.isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
