'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Heart, Trophy, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <div className="mb-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <ShieldCheck size={14} /> The Future of Golf Philanthropy
            </span>
          </div>
          
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
            Drive <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Impact</span>,<br /> 
            Not Just Distance.
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            The platform where your golf performance translates directly into global change. 
            Track scores, join monthly draws, and support the charities you love.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary px-10 py-4 text-lg">
              Start Your Impact <ArrowRight size={20} />
            </Link>
            <Link href="/charities" className="group flex items-center gap-2 px-6 py-4 font-semibold text-white transition-colors hover:text-emerald-400">
              Explore Charities <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats / Proof Section */}
      <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-6">
        {[
          { label: 'Total Raised', value: '$1.2M+', icon: <Heart className="text-rose-500" /> },
          { label: 'Active Golfers', value: '15,000+', icon: <Users className="text-emerald-500" /> },
          { label: 'Draws Won', value: '450+', icon: <Trophy className="text-amber-500" /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3 text-3xl font-bold text-white md:text-4xl">
              {stat.icon} {stat.value}
            </div>
            <div className="text-sm font-medium uppercase tracking-widest text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">How ParGive Works</h2>
          <p className="mt-4 text-slate-400">A seamless cycle of performance and philanthropy.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Subscribe & Select',
              desc: 'Join our community and pick a charity that resonates with you. 10% of your fee goes directly to them.',
              icon: <Heart size={32} className="text-emerald-400" />,
            },
            {
              title: 'Track Your Performance',
              desc: 'Enter your latest 5 Stableford scores. We handle the tracking; you focus on the swing.',
              icon: <Target size={32} className="text-emerald-400" />,
            },
            {
              title: 'Win & Give Back',
              desc: 'Participate in monthly draws. Match your scores to the winning numbers and win big while supporting causes.',
              icon: <Trophy size={32} className="text-emerald-400" />,
            },
          ].map((feature, i) => (
            <div key={i} className="premium-card flex flex-col items-start gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-emerald-600 to-teal-800 p-12 text-center text-white">
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-4xl font-bold md:text-5xl">Ready to make your rounds count?</h2>
            <p className="max-w-xl text-emerald-100">
              Join thousands of golfers who are turning their birdies into better futures for people in need.
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup" className="rounded-full bg-white px-8 py-3 font-bold text-emerald-900 transition-transform hover:scale-105">
                Join pargive Today
              </Link>
              <Link href="/charities" className="rounded-full border border-emerald-400 px-8 py-3 font-bold text-white transition-colors hover:bg-emerald-500/20">
                View Charities
              </Link>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
