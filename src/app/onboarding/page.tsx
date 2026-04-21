'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOCK_CHARITIES = [
  { id: '1', name: 'Ocean Cleanse', category: 'Environment', desc: 'Saving our oceans through advanced plastic recovery.' },
  { id: '2', name: 'Youth Golf Assist', category: 'Sport', desc: 'Providing equipment and training to underprivileged youth.' },
  { id: '3', name: 'Education Found', category: 'Education', desc: 'Building schools in remote communities worldwide.' },
  { id: '4', name: 'Green Canopy', category: 'Environment', desc: 'Reforestation projects in the Amazon and beyond.' },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [contribution, setContribution] = useState(10);
  const [search, setSearch] = useState('');

  const filteredCharities = MOCK_CHARITIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-center px-6 py-20">
      <div className="mb-12 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2].map((s) => (
            <div 
              key={s} 
              className={`h-2 w-12 rounded-full transition-all ${step >= s ? 'bg-emerald-500' : 'bg-white/10'}`} 
            />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Step {step} of 2</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white">Select Your Charity</h1>
              <p className="mt-2 text-slate-400">Choose the cause your subscription will support.</p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search charities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-emerald-500/50"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCharities.map((charity) => (
                <button
                  key={charity.id}
                  onClick={() => setSelectedCharity(charity.id)}
                  className={`premium-card flex flex-col items-start gap-2 text-left transition-all ${
                    selectedCharity === charity.id ? 'border-emerald-500 bg-emerald-500/10' : ''
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{charity.category}</span>
                    {selectedCharity === charity.id && <Check size={18} className="text-emerald-500" />}
                  </div>
                  <h3 className="font-bold text-white">{charity.name}</h3>
                  <p className="text-sm text-slate-500">{charity.desc}</p>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedCharity}
              onClick={() => setStep(2)}
              className="btn-primary mt-4 w-full justify-center py-4 text-lg disabled:opacity-50"
            >
              Continue <ChevronRight size={20} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white">Impact Contribution</h1>
              <p className="mt-2 text-slate-400">Total transparency on how your subscription is split.</p>
            </div>

            <div className="premium-card bg-emerald-500/5">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-medium text-white">Minimum Contribution</span>
                <span className="text-2xl font-bold text-emerald-400">10%</span>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-sm text-slate-400">Would you like to increase your monthly impact?</label>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5"
                  value={contribution}
                  onChange={(e) => setContribution(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>10% (Default)</span>
                  <span>50% (Max)</span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-4xl font-black text-white">{contribution}%</span>
                  <p className="text-sm text-emerald-400">Total Contribution</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-6">
              <ShieldCheck className="mt-1 text-emerald-400" size={24} />
              <div>
                <h4 className="font-semibold text-white">Verified Allocation</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Your funds are split between your chosen charity ({contribution}%), 
                  the monthly prize pools (40%), and operational maintenance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="px-6 py-4 font-medium text-slate-400 hover:text-white">Back</button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="btn-primary w-full justify-center py-4 text-lg"
              >
                Confirm & Enter Dashboard <Heart size={20} className="fill-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
