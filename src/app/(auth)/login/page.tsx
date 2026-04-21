'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-400">Continue your impact journey.</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                placeholder="tiger@pargive.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Link href="#" className="text-xs text-emerald-400 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
              />
            </div>
          </div>

          <button 
            type="button"
            className="btn-primary mt-4 w-full justify-center py-4 text-lg"
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="h-[1px] w-full bg-white/10" />
            <span className="absolute bg-[#0f172a] px-4 text-xs font-medium uppercase tracking-widest text-slate-500">Or continue with</span>
          </div>

          <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all hover:bg-white/10">
            <Github size={20} /> GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? {' '}
          <Link href="/signup" className="font-semibold text-emerald-400 hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
