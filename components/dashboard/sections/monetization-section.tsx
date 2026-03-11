"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, Gift, BarChart3, Plus } from "lucide-react";

const revenueStreams = [
  { source: "Sponsorships", amount: 4500, change: "+12%", icon: "🤝", color: "bg-green-500" },
  { source: "Ad Revenue", amount: 2800, change: "+8%", icon: "📺", color: "bg-blue-500" },
  { source: "Affiliate Links", amount: 1200, change: "+23%", icon: "🔗", color: "bg-purple-500" },
  { source: "Paid Community", amount: 950, change: "+5%", icon: "👥", color: "bg-orange-500" },
  { source: "Merchandise", amount: 680, change: "-3%", icon: "🛍️", color: "bg-pink-500" },
  { source: "Donations/Tips", amount: 320, change: "+15%", icon: "💝", color: "bg-yellow-500" },
];

const recentTransactions = [
  { id: "1", name: "TechBrand Sponsorship", amount: 2500, date: "Mar 10, 2026", status: "completed" },
  { id: "2", name: "YouTube AdSense", amount: 1200, date: "Mar 8, 2026", status: "completed" },
  { id: "3", name: "Amazon Affiliate Payout", amount: 450, date: "Mar 7, 2026", status: "pending" },
  { id: "4", name: "Patreon Monthly", amount: 380, date: "Mar 5, 2026", status: "completed" },
  { id: "5", name: "Merch Sale", amount: 89, date: "Mar 4, 2026", status: "completed" },
];

export function MonetizationSection() {
  const totalRevenue = revenueStreams.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Monetization</h2>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Revenue</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div><p className="text-xs text-muted-foreground">This month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Growth</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-500">+18.5%</div><p className="text-xs text-muted-foreground">vs last month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active Deals</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">7</div><p className="text-xs text-muted-foreground">Sponsorships & partnerships</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">RPM</CardTitle><BarChart3 className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">$4.82</div><p className="text-xs text-muted-foreground">Revenue per mille</p></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenue Streams</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.source} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stream.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{stream.source}</p>
                      <p className={`text-xs ${stream.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stream.change} this month</p>
                    </div>
                  </div>
                  <span className="font-bold">${stream.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${tx.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
