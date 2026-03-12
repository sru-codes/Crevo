"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { MagneticButton } from '@/components/animations';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, isLoading, isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated && user) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
        
        {/* Decorative backdrop */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your Creator Operating System.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email Address / Admin Key
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="e.g. user@example.com OR admin@crevo.com"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full h-12 bg-white text-black hover:bg-zinc-200 transition-colors rounded-lg font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <span className="flex items-center">
                <LogIn className="w-4 h-4 mr-2" /> Sign In securely
              </span>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400 relative z-10">
          Don't have an account?{' '}
          <Link href="/register" className="text-white hover:underline font-medium">
            Request Access
          </Link>
        </p>

        <div className="mt-6 pt-6 border-t border-zinc-800/50 text-xs text-zinc-500 text-center relative z-10 space-y-2">
           <p><strong>Demo Mode credentials:</strong></p>
           <p>Type <code className="bg-zinc-800 px-1 rounded text-zinc-300">admin@crevo.com</code> to enter as Super Admin.</p>
           <p>Type any other email to trigger the pending verification flow.</p>
        </div>

      </div>
    </div>
  );
}
