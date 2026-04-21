'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    { q: "How is my handicap tracked?", a: "We utilize a rolling 5-score pool. Your best 3 scores out of your last 5 submissions determine your current impact tier." },
    { q: "Where does the money go?", a: "90% of all subscription fees after platform maintenance are directed to the charity you select in your dashboard." },
    { q: "How do I win the Monthly Draw?", a: "Every validated score submission counts as an entry. Higher performance tiers receive additional multipliers for the draw." }
  ];

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
          <div className="h-20 w-20 rounded-[32px] bg-blue-500/10 flex items-center justify-center text-blue-400 mb-10">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">FREQUENTLY <br/><span className="text-blue-500">ASKED</span></h1>
          
          <div className="space-y-12">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-2xl font-black text-white tracking-tight">{faq.q}</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-lg">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
