"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export function SettingsSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about your account activity</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Keys</p>
              <p className="text-sm text-muted-foreground">Manage your NVIDIA, Groq, and Gemini API keys</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Billing</p>
              <p className="text-sm text-muted-foreground">Manage your Crevo subscription and payment methods</p>
            </div>
            <Button variant="outline" size="sm">Billing Portal</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-500">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
