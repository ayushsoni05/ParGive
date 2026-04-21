'use client';

import { motion } from 'framer-motion';
import { Trophy, HelpCircle, Calendar, Sparkles, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';

const RECENT_DRAW = {
  id: '41',
  date: 'March 31, 2026',
  numbers: [12, 35, 42, 8, 21],
  totalPool: '$58,400',
  winners: {
    '5-match': 0,
    '4-match': 3,
    '3-match': 42
  }
};

const PAST_DRAWS = [
  { id: '40', date: 'Feb 28, 2026', numbers: [4, 18, 45, 33, 9], totalPool: '$52,100' },
  { id: '39', date: 'Jan 31, 2026', numbers: [22, 11, 40, 5, 29], totalPool: '$49,800' },
];

export default function DrawResults() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">Monthly Draw #41</h1>
        <p className="mt-4 text-lg text-slate-400">Winning numbers for March 2026. Was it your lucky round?</p>
      </div>

      {/* Main Draw Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card mb-16 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent p-12 text-center"
      >
        <div className="mb-8 flex justify-center gap-4">
          {RECENT_DRAW.numbers.map((num, i) => (
            <motion.div
              key={i}
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-3xl font-black text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.4)] md:h-24 md:w-24 md:text-5xl"
            >
              {num}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-amber-500">
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Total Prize Pool</span>
            <Sparkles size={20} />
          </div>
          <div className="text-5xl font-black text-white md:text-7xl">{RECENT_DRAW.totalPool}</div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 text-sm font-medium text-slate-400 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 p-6">
            <span className="text-xs uppercase tracking-widest text-slate-500">5-Match</span>
            <span className="text-xl font-bold text-white">{RECENT_DRAW.winners['5-match']} Winners</span>
            <span className="text-xs text-amber-400">Rollover to next draw!</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 p-6">
            <span className="text-xs uppercase tracking-widest text-slate-500">4-Match</span>
            <span className="text-xl font-bold text-white">{RECENT_DRAW.winners['4-match']} Winners</span>
            <span className="text-xs text-emerald-400">$6,813 each</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 p-6">
            <span className="text-xs uppercase tracking-widest text-slate-500">3-Match</span>
            <span className="text-xl font-bold text-white">{RECENT_DRAW.winners['3-match']} Winners</span>
            <span className="text-xs text-emerald-400">$347 each</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Draw Mechanics */}
        <section>
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-white">
            <HelpCircle className="text-emerald-400" size={24} /> How it Works
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                title: '5-Number Match (40% Pool)',
                desc: 'Match all 5 of your latest golf scores to the drawn numbers. If no one wins, the pool rolls over to next month as a massive Jackpot.'
              },
              {
                title: '4-Number Match (35% Pool)',
                desc: 'Match 4 out of 5 scores. The prize is split equally among all winners in this tier.'
              },
              {
                title: '3-Number Match (25% Pool)',
                desc: 'Match 3 out of 5 scores. A great way to earn back your subscription and more while giving to charity.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Draw History */}
        <section>
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-white">
            <History className="text-slate-400" size={24} /> Past Draws
          </h2>
          <div className="flex flex-col gap-4">
            {PAST_DRAWS.map((draw) => (
              <div key={draw.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10">
                <div>
                  <div className="text-sm font-bold text-white">Draw #{draw.id}</div>
                  <div className="text-xs text-slate-500">{draw.date}</div>
                </div>
                <div className="flex gap-2">
                  {draw.numbers.map((n, i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white">
                      {n}
                    </div>
                  ))}
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-bold text-emerald-400">{draw.totalPool}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Total Pool</div>
                </div>
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 py-4 text-sm font-medium text-slate-400 transition-all hover:text-white">
              View Full History <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-20 flex flex-col items-center justify-center gap-6 rounded-[32px] bg-emerald-500/5 p-12 text-center">
        <Trophy size={48} className="text-emerald-400" />
        <h3 className="text-3xl font-bold text-white">Don't miss the next one!</h3>
        <p className="max-w-xl text-slate-400">Subscribers are automatically entered every month. Start your performance tracking today.</p>
        <Link href="/signup" className="btn-primary px-10 py-4">
          Join the Next Draw <Sparkles size={20} />
        </Link>
      </div>
    </div>
  );
}
