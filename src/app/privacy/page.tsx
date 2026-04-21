'use client';

import { motion } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <div className="h-20 w-20 rounded-[32px] bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-10">
            <Shield size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10">PRIVACY <br/><span className="text-emerald-500">PROTOCOL</span></h1>
          
          <div className="space-y-8 text-slate-400 font-medium leading-relaxed text-lg">
            <p>At ParGive, we prioritize the integrity of your performance data and personal identity. Our systems are built on the Obsidian architecture, ensuring end-to-end encryption for all score submissions.</p>
            <h2 className="text-white text-2xl font-black tracking-tight mt-12">1. DATA HARVESTING</h2>
            <p>We only collect the metrics necessary to validate your handicap and facilitate charitable contributions. This includes scorecards, GPS metadata (where applicable for verification), and subscription details.</p>
            <h2 className="text-white text-2xl font-black tracking-tight mt-12">2. THE IMPACT LEDGER</h2>
            <p>Your contributions are logged on a transparent but anonymized ledger, allowing you to track your global impact without compromising your elite status.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
