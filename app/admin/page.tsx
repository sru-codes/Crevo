"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { 
  ShieldCheck, 
  UserX, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  XCircle,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, allUsers, isAuthenticated, verifyUser, rejectUser, isLoading } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Guard routing
  if (mounted && !isLoading) {
    if (!isAuthenticated) {
      router.push('/login');
      return null;
    }
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return null;
    }
  }

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  const pendingUsers = allUsers.filter(u => u.status === 'pending');
  const verifiedUsers = allUsers.filter(u => u.status === 'verified');
  const rejectedUsers = allUsers.filter(u => u.status === 'rejected');

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-zinc-900 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 text-red-500">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-mono text-sm tracking-widest uppercase font-semibold">Admin Panel</span>
            </div>
            <h1 className="text-3xl font-bold text-white">User Verification Queue</h1>
            <p className="text-zinc-500 mt-1">Review and approve new creator registrations.</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:text-white bg-zinc-900">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-zinc-400 font-medium">Total Users</h3>
              <Database className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{allUsers.length}</p>
          </div>
          <div className="bg-zinc-900 border border-yellow-900/50 rounded-xl p-5 shadow-[0_0_15px_rgba(234,179,8,0.05)]">
            <div className="flex items-center justify-between">
              <h3 className="text-yellow-500 font-medium">Pending</h3>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{pendingUsers.length}</p>
          </div>
          <div className="bg-zinc-900 border border-green-900/30 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-green-500 font-medium">Verified</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{verifiedUsers.length}</p>
          </div>
          <div className="bg-zinc-900 border border-red-900/30 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-red-500 font-medium">Rejected</h3>
              <UserX className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{rejectedUsers.length}</p>
          </div>
        </div>

        {/* Pending Queue */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              Requires Action ({pendingUsers.length})
            </h2>
          </div>
          
          {pendingUsers.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <h3 className="text-zinc-300 font-medium">Inbox Zero</h3>
              <p className="text-zinc-500 text-sm mt-1">There are no users waiting for verification.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/50">
              {pendingUsers.map(u => (
                <div key={u.uid} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center font-bold text-lg border border-yellow-500/20">
                      {u.displayName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">{u.displayName || 'Unknown Name'}</h3>
                      <p className="text-zinc-400 text-sm">{u.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-sm">User ID: {u.uid}</span>
                        <span className="text-[10px] uppercase tracking-wider bg-yellow-950 text-yellow-500 border border-yellow-900 px-2 py-0.5 rounded-sm">Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => verifyUser(u.uid)} className="bg-green-600 hover:bg-green-500 text-white border-0">
                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                    </Button>
                    <Button onClick={() => rejectUser(u.uid)} variant="outline" className="border-red-900/50 text-red-500 hover:bg-red-950 hover:text-red-400">
                      <XCircle className="w-4 h-4 mr-2" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Verified */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl opacity-70">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-zinc-500" />
              Recently Handled
            </h2>
          </div>
          <div className="divide-y divide-zinc-800/50 max-h-96 overflow-y-auto">
             {[...verifiedUsers, ...rejectedUsers].filter(u => u.role !== 'admin').map(u => (
               <div key={u.uid} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-zinc-300 font-medium text-sm">{u.email}</h3>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${u.status === 'verified' ? 'bg-green-900/20 text-green-500' : 'bg-red-900/20 text-red-500'}`}>
                      {u.status.toUpperCase()}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
