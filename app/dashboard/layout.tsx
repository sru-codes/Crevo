import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Crevo - Creator Operating System',
  description: 'Manage your social media presence, content, analytics, and monetization from one powerful dashboard.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  );
}
