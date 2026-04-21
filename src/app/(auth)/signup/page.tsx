'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

export default function Signup() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Join ParGive</h1>
          <p className="mt-2 text-slate-400">Start your journey of golf and impact.</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Tiger Woods"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
              />
            </div>
          </div>

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
            <label className="text-sm font-medium text-slate-300">Password</label>
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
            {loading ? 'Creating Account...' : 'Create Account'}
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
          Already have an account? {' '}
          <Link href="/login" className="font-semibold text-emerald-400 hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
