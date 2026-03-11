"use client";

import { useState } from "react";
import { 
  Home, Calendar, BarChart2, Users, MessageCircle, Settings, 
  UserCheck, Target, Eye, Menu, Bot, Zap, DollarSign, 
  Image, Link2, Bell, Search, ChevronLeft, Edit, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DashboardSection } from "@/types";

const navItems: { key: DashboardSection; label: string; icon: React.ElementType; group: string }[] = [
  // Main
  { key: "dashboard", label: "Dashboard", icon: Home, group: "Main" },
  { key: "overview", label: "Overview", icon: Eye, group: "Main" },
  
  // Content
  { key: "post-creator", label: "Create Post", icon: Edit, group: "Content" },
  { key: "calendar", label: "Calendar", icon: Calendar, group: "Content" },
  { key: "posts", label: "All Posts", icon: Menu, group: "Content" },
  { key: "media", label: "Media Library", icon: Image, group: "Content" },
  { key: "ai-copilot", label: "AI Copilot", icon: Sparkles, group: "Content" },
  { key: "ai-assistant", label: "AI Settings", icon: Bot, group: "Content" },
  
  // Analytics
  { key: "analytics", label: "Analytics", icon: BarChart2, group: "Analytics" },
  { key: "engagement", label: "Engagement", icon: MessageCircle, group: "Analytics" },
  { key: "campaigns", label: "Campaigns", icon: Target, group: "Analytics" },
  
  // Audience
  { key: "customers", label: "Customers", icon: UserCheck, group: "Audience" },
  { key: "community", label: "Community", icon: Users, group: "Audience" },
  
  // Business
  { key: "monetization", label: "Monetization", icon: DollarSign, group: "Business" },
  { key: "automations", label: "Automations", icon: Zap, group: "Business" },
  { key: "integrations", label: "Integrations", icon: Link2, group: "Business" },
  
  // System
  { key: "users", label: "Users", icon: Users, group: "System" },
  { key: "settings", label: "Settings", icon: Settings, group: "System" },
];

export function DashboardSidebar({
  selected,
  onSelect,
  isOpen,
  onClose,
}: {
  selected: DashboardSection;
  onSelect: (key: DashboardSection) => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleItemClick = (key: DashboardSection) => {
    onSelect(key);
    if (onClose) onClose();
  };

  // Group nav items
  const groups = navItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative lg:translate-x-0 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col z-50 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-zinc-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Crevo
              </span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:text-white h-8 w-8 hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
          {/* Mobile Close */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:text-white h-8 w-8 lg:hidden"
            onClick={onClose}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Search (non-collapsed only) */}
        {!collapsed && (
          <div className="px-3 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 text-zinc-500 text-sm">
              <Search className="h-4 w-4 shrink-0" />
              <span>Search...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 text-[10px] font-mono">⌘K</kbd>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              {!collapsed && (
                <p className="px-3 mb-1.5 text-[10px] uppercase tracking-wider text-zinc-600 font-semibold">
                  {group}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <button
                    key={item.key}
                    className={cn(
                      "flex items-center w-full rounded-lg text-left transition-all duration-200 group",
                      collapsed ? "px-2 py-2.5 justify-center" : "px-3 py-2",
                      selected === item.key 
                        ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" 
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent"
                    )}
                    onClick={() => handleItemClick(item.key)}
                    title={collapsed ? item.label : undefined}
                    aria-current={selected === item.key ? "page" : undefined}
                  >
                    <item.icon className={cn(
                      "shrink-0 transition-colors",
                      collapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
                    )} />
                    {!collapsed && (
                      <span className="truncate text-sm">{item.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className={cn(
          "border-t border-zinc-800",
          collapsed ? "p-2" : "p-3"
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white text-xs font-medium">CR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">Creator</p>
                <p className="text-xs text-zinc-500 truncate">Free Plan</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center cursor-pointer">
                <span className="text-white text-xs font-medium">CR</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
