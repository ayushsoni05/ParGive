'use client';

import { motion } from 'framer-motion';
import { Gavel, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-emerald-500 selection:text-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors mb-12 font-black uppercase tracking-widest text-xs">
          <ChevronLeft size={16} /> Back to Hub
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 md:p-20 rounded-[60px] border-emerald-500/10"
        >
          <div className="h-20 w-20 rounded-[32px] bg-amber-500/10 flex items-center justify-center text-amber-400 mb-10">
            <Gavel size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10">TERMS OF <br/><span className="text-amber-500">ENGAGEMENT</span></h1>
          
          <div className="space-y-8 text-slate-400 font-medium leading-relaxed text-lg">
            <p>By entering the ParGive ecosystem, you agree to uphold the highest standards of integrity in golf performance tracking and philanthropic contribution.</p>
            <h2 className="text-white text-2xl font-black tracking-tight mt-12">1. SCORE INTEGRITY</h2>
            <p>All submitted scores must be verified by at least one other player or a club official. Fraudulent score submission will lead to immediate expulsion from the Obsidian Elite circle.</p>
            <h2 className="text-white text-2xl font-black tracking-tight mt-12">2. SUBSCRIPTION & DRAWS</h2>
            <p>Monthly draws are conducted via a provably fair algorithm. Subscription fees are non-refundable as they are immediately allocated to selected charities.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
