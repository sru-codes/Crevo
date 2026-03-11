"use client";

import { DashboardSection as DashboardSectionType } from "./sections/dashboard-section";
import { OverviewSection } from "./sections/overview-section";
import { PostsSection } from "./sections/posts-section";
import { AnalyticsSection } from "./sections/analytics-section";
import { EngagementSection } from "./sections/engagement-section";
import { CampaignsSection } from "./sections/campaigns-section";
import { CustomersSection } from "./sections/customers-section";
import { UsersSection } from "./sections/users-section";
import { SettingsSection } from "./sections/settings-section";
import { CommunitySection } from "./sections/community-section";
import { MonetizationSection } from "./sections/monetization-section";
import { AIAssistantSection } from "./sections/ai-assistant-section";
import { AutomationsSection } from "./sections/automations-section";
import { MediaSection } from "./sections/media-section";
import { IntegrationsSection } from "./sections/integrations-section";
// New sections ported from P1 (Postiz)
import { CalendarSection } from "./sections/calendar-section";
import { AICopilotSection } from "./sections/ai-copilot-section";
import { PostCreatorSection } from "./sections/post-creator-section";
import type { DashboardSection } from "@/types";

export function DashboardHome({ section }: { section: DashboardSection }) {
  switch (section) {
    case "overview":
      return <OverviewSection />;
    case "posts":
      return <PostsSection />;
    case "analytics":
      return <AnalyticsSection />;
    case "engagement":
      return <EngagementSection />;
    case "campaigns":
      return <CampaignsSection />;
    case "customers":
      return <CustomersSection />;
    case "users":
      return <UsersSection />;
    case "settings":
      return <SettingsSection />;
    case "community":
      return <CommunitySection />;
    case "monetization":
      return <MonetizationSection />;
    case "ai-assistant":
      return <AIAssistantSection />;
    case "ai-copilot":
      return <AICopilotSection />;
    case "automations":
      return <AutomationsSection />;
    case "media":
      return <MediaSection />;
    case "integrations":
      return <IntegrationsSection />;
    case "calendar":
      return <CalendarSection />;
    case "post-creator":
      return <PostCreatorSection />;
    default:
      return <DashboardSectionType />;
  }
}
