'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Heart, 
  Calendar, 
  Plus, 
  Edit2, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_USER = {
  name: 'Sarah Drasner',
  plan: 'Hero Partner',
  status: 'Active',
  renewalDate: 'May 12, 2026',
  charity: 'Ocean Cleanse',
  charityPct: 15,
  totalWon: '$1,250',
  pendingPayout: '$250',
};

const MOCK_SCORES = [
  { id: '1', score: 38, date: '2026-04-15' },
  { id: '2', score: 42, date: '2026-04-10' },
  { id: '3', score: 35, date: '2026-04-05' },
  { id: '4', score: 40, date: '2026-03-28' },
  { id: '5', score: 37, date: '2026-03-20' },
];

export default function Dashboard() {
  const [scores, setScores] = useState(MOCK_SCORES);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [newScore, setNewScore] = useState({ score: '', date: '' });

  const handleAddScore = () => {
    if (!newScore.score || !newScore.date) return;
    
    const nextScores = [
      { id: Date.now().toString(), score: parseInt(newScore.score), date: newScore.date },
      ...scores
    ].slice(0, 5); // Rolling 5 logic
    
    setScores(nextScores);
    setNewScore({ score: '', date: '' });
    setShowScoreModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Hello, {MOCK_USER.name}</h1>
          <p className="text-slate-400">Welcome to your impact dashboard.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subscription</span>
            <span className="text-sm font-semibold text-emerald-400">{MOCK_USER.plan} • {MOCK_USER.status}</span>
          </div>
          <button className="rounded-full bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10">
            <CreditCard size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content (2/3) */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="premium-card bg-emerald-500/5">
              <div className="mb-4 flex items-center justify-between">
                <Trophy className="text-amber-500" size={24} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Winnings</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white">{MOCK_USER.totalWon}</span>
                <span className="mb-1 text-sm text-emerald-400">Total</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Info size={14} /> Payout of {MOCK_USER.pendingPayout} is currently pending
              </div>
            </div>

            <div className="premium-card bg-rose-500/5">
              <div className="mb-4 flex items-center justify-between">
                <Heart className="text-rose-500" size={24} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Charity</span>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{MOCK_USER.charity}</h3>
                <span className="rounded-lg bg-rose-500/10 px-2 py-1 text-xs font-bold text-rose-400">{MOCK_USER.charityPct}% Impact</span>
              </div>
              <Link href="/onboarding" className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-400 hover:underline">
                Update Charity <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Score Management */}
          <div className="premium-card">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Latest Performance</h3>
                <p className="text-sm text-slate-500">Only your last 5 scores are retained for the draw.</p>
              </div>
              <button 
                onClick={() => setShowScoreModal(true)}
                className="btn-primary rounded-xl px-4 py-2 text-sm"
              >
                <Plus size={18} /> New Score
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {scores.map((score, i) => (
                <div key={score.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xl font-black text-white">
                      {score.score}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Stableford Points</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={12} /> {score.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-500 transition-colors hover:text-white"><Edit2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (1/3) */}
        <div className="flex flex-col gap-8">
          {/* Upcoming Draw */}
          <div className="premium-card border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Calendar className="text-amber-500" size={20} /> Next Prize Draw
            </h3>
            <div className="mb-6">
              <div className="text-3xl font-black text-white">April 30, 2026</div>
              <div className="text-sm text-slate-400">Draw #42 • Monthly Classic</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-slate-500">
                <span>Prize Pool Tiers</span>
                <span>Active Pool</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">5-Number Match</span>
                <span className="font-bold text-white">$45,000 (Jackpot)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">4-Number Match</span>
                <span className="font-bold text-white">$12,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">3-Number Match</span>
                <span className="font-bold text-white">$4,200</span>
              </div>
            </div>
            <Link href="/draws" className="mt-8 block w-full rounded-xl bg-white/5 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white/10">
              View Mechanics
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="premium-card">
            <h3 className="mb-4 text-lg font-bold text-white">Impact Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2"><TrendingUp size={18} className="text-emerald-500" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Contribution</div>
                  <div className="font-bold text-white">$145.50 this year</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2"><Heart size={18} className="text-rose-400" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Supported Cause</div>
                  <div className="font-bold text-white">Ocean Cleanse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Entry Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-white">Add New Score</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-400">Stableford Points (1-45)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="45"
                  value={newScore.score}
                  onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Date Played</label>
                <input 
                  type="date" 
                  value={newScore.date}
                  onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowScoreModal(false)}
                  className="flex-1 rounded-xl bg-white/5 py-4 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddScore}
                  className="btn-primary flex-1 justify-center py-4 text-lg"
                >
                  Save Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
