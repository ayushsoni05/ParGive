'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Heart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Subscribe() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Standard Impact',
      monthlyPrice: 15,
      yearlyPrice: 144, // $12/mo
      features: [
        'Monthly Draw Entry (1 ticket)',
        'Track up to 5 scores',
        'Standard charity contribution (10%)',
        'Digital winner certificate',
      ],
      icon: <Zap className="text-emerald-400" />,
      tag: 'Most Popular'
    },
    {
      name: 'Hero Partner',
      monthlyPrice: 29,
      yearlyPrice: 288, // $24/mo
      features: [
        'Priority Draw Entry (3 tickets)',
        'Track up to 5 scores',
        'Enhanced charity contribution (up to 25%)',
        'Ad-free experience',
        'Exclusive partner events',
      ],
      icon: <Shield className="text-amber-500" />,
      tag: 'Best Value'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">Choose Your Impact</h1>
        <p className="mt-4 text-lg text-slate-400">Join the movement. Every subscription drives change.</p>
        
        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="flex h-8 w-14 items-center rounded-full bg-emerald-500/20 p-1 transition-all"
          >
            <div className={`h-6 w-6 rounded-full bg-emerald-500 transition-all ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>Yearly <span className="ml-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase text-emerald-400">Save 20%</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`premium-card relative flex flex-col justify-between overflow-hidden ${i === 1 ? 'border-amber-500/30' : ''}`}
          >
            {plan.tag && (
              <div className={`absolute right-0 top-0 rounded-bl-xl px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${i === 1 ? 'bg-amber-500 text-slate-900' : 'bg-emerald-500 text-white'}`}>
                {plan.tag}
              </div>
            )}

            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-white/5 p-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12}
                </span>
                <span className="text-slate-500"> / month</span>
                {billingCycle === 'yearly' && (
                  <p className="mt-2 text-sm text-emerald-400">Billed annually (${plan.yearlyPrice})</p>
                )}
              </div>

              <ul className="flex flex-col gap-4 text-slate-400">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`btn-primary mt-12 w-full justify-center py-4 ${i === 1 ? 'bg-amber-500 text-slate-900 hover:bg-amber-600' : ''}`}
              onClick={() => router.push('/onboarding')}
            >
              Get Started <ArrowRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-4 rounded-3xl bg-emerald-500/5 p-12 text-center text-slate-400">
        <Heart size={40} className="text-emerald-400" />
        <h4 className="text-2xl font-bold text-white">Direct Impact Distribution</h4>
        <p className="max-w-xl">
          We believe in transparency. 10% of every subscription goes directly to your selected charity. 
          The rest powers the prize pools (40% for the Jackpot!) and the ParGive engine.
        </p>
      </div>
    </div>
  );
}
