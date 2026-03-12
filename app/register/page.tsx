"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { register, isLoading, isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated && user) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, name);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-green-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Join Crevo</h1>
          <p className="text-zinc-400">Request access to the Creator Operating System.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="e.g. Creator Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="e.g. user@example.com"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email || !name}
            className="w-full h-12 bg-white text-black hover:bg-zinc-200 transition-colors rounded-lg font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <span className="flex items-center">
                <UserPlus className="w-4 h-4 mr-2" /> Request Account Verification
              </span>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400 relative z-10">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
