"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardSection } from "@/types";

export default function DashboardPage() {
  const [currentSection, setCurrentSection] = useState<DashboardSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <DashboardSidebar
        selected={currentSection}
        onSelect={setCurrentSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold capitalize">
              {currentSection === "ai-assistant" ? "AI Assistant" : currentSection.replace(/-/g, " ")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-medium">CR</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <DashboardHome section={currentSection} />
        </div>
      </main>
    </div>
  );
}
