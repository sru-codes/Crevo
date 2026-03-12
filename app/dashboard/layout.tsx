"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Shield, Clock, XCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, isLoading, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading security state...</p>
        </div>
      </div>
    );
  }

  // Not authenticated, wait for router redirect
  if (!isAuthenticated || !user) {
    return null; 
  }

  // User IS authenticated, but status is PENDING or REJECTED
  if (user.role === 'user' && user.status !== 'verified') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
          
          {user.status === 'pending' ? (
            <>
              <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-6 opacity-80" />
              <h1 className="text-2xl font-semibold text-white mb-2">Account Pending Verification</h1>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Your account has been created successfully, but it requires administrator approval before you can access the dashboard. Please check back later.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6 opacity-80" />
              <h1 className="text-2xl font-semibold text-white mb-2">Access Denied</h1>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Your account registration was rejected by the administrator. Please contact support.
              </p>
            </>
          )}

          <Button 
            onClick={() => {
              logout();
              router.push('/login');
            }} 
            variant="outline" 
            className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // Verified User or Admin -> Show full dashboard
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* If Admin, show a banner at top */}
      {user.role === 'admin' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 z-50"></div>
      )}
      
      <div className="flex-1 overflow-x-hidden pt-1 relative">
        {user.role === 'admin' && (
           <div className="sticky top-0 bg-red-900/20 border-b border-red-500/20 px-6 py-2 flex items-center justify-between z-40 backdrop-blur-md">
             <div className="flex items-center gap-3 text-red-400 font-medium text-sm tracking-wide">
               <Shield className="w-4 h-4" />
               ADMINISTRATOR MODE
             </div>
             <Button variant="ghost" size="sm" onClick={() => router.push('/admin')} className="text-red-300 hover:text-white hover:bg-red-800/30 h-7 text-xs">
               Manage Users
             </Button>
           </div>
        )}

        {children}
      </div>
    </div>
  );
}
