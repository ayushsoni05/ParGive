'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, Heart, Trophy, ArrowRight, ShieldCheck, Users, Calendar, MousePointer2 } from 'lucide-react';
import { useRef } from 'react';
import { Link004 } from '@/components/ui/skiper-ui/skiper40';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springScroll, [0, 1], [0, 15]);
  const opacity = useTransform(springScroll, [0, 0.2], [1, 0]);
  const scale = useTransform(springScroll, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="flex flex-col bg-[#020408] min-h-[200vh] text-white overflow-x-hidden">
      {/* Hero Section with 3D Perspective */}
      <section className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        </div>

        <motion.div 
          style={{ opacity, scale, rotateX }}
          className="relative z-10 mx-auto max-w-7xl px-6 text-center preserve-3d"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Next-Gen Philanthropy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-black leading-[0.9] tracking-tighter md:text-9xl lg:text-[12rem]"
          >
            DRIVE <br />
            <span className="bg-gradient-to-b from-emerald-400 to-emerald-700 bg-clip-text text-transparent italic">IMPACT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 mx-auto max-w-2xl text-xl text-slate-400 font-medium leading-relaxed"
          >
            Where elite golf performance meets global humanitarian change. 
            Track every swing, join the inner circle, and transform scores into life-saving donations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row"
          >
            <Link href="/signup" className="group relative px-10 py-5 bg-emerald-500 text-black font-black text-xl rounded-2xl transition-all hover:scale-105 hover:rotate-1 shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
              JOIN THE MOVEMENT
              <ArrowRight className="inline-all ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link004 href="/charities" className="text-white font-bold text-xl uppercase tracking-widest">
              Explore Partners
            </Link004>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Scroll to Explore</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-emerald-500 to-transparent" />
        </motion.div>
      </section>

      {/* Floating 3D Cards Section */}
      <section className="relative z-20 px-6 py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Curated Selection",
                desc: "10% of every membership fee is direct-routed to high-impact charities you choose.",
                color: "emerald"
              },
              {
                icon: Target,
                title: "Precision Tracking",
                desc: "Our AI-powered engine analyzes your rolling 5 Stableford scores to gamify giving.",
                color: "emerald"
              },
              {
                icon: Trophy,
                title: "Elite Rewards",
                desc: "The better you play, the more we donate. Plus, exclusive monthly prize draws.",
                color: "emerald"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group p-10 rounded-[40px] preserve-3d"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:bg-emerald-500 group-hover:text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Statistics / Impact Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20">
            <div className="flex-1">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
                REAL TIME <br />
                <span className="text-emerald-500">IMPACT DATA</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-lg mb-12">
                We believe in radical transparency. Watch as every birdie on the course transforms into real-world change in real-time.
              </p>
              <Link href="/impact" className="inline-flex items-center gap-4 text-emerald-400 font-bold text-lg hover:gap-6 transition-all">
                VIEW GLOBAL DASHBOARD <ArrowRight />
              </Link>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[
                { label: "Total Raised", val: "$1.4M", sub: "+12% MoM" },
                { label: "Active Players", val: "18.5K", sub: "Global" },
                { label: "Draws Won", val: "542", sub: "Premium" },
                { label: "Charity Partners", val: "85+", sub: "Verified" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotateZ: i % 2 === 0 ? 1 : -1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
                >
                  <div className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-4xl font-black mb-1">{stat.val}</div>
                  <div className="text-[10px] text-slate-500 font-bold">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-40">
        <motion.div 
          whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
          className="relative overflow-hidden rounded-[60px] bg-emerald-500 p-20 text-center text-black"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
              READY TO PLAY <br /> FOR SOMETHING BIGGER?
            </h2>
            <p className="text-xl font-bold max-w-2xl mx-auto mb-12 opacity-80">
              Join the elite circle of golfers who are changing the world, one hole at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="px-12 py-6 bg-black text-white font-black text-2xl rounded-2xl hover:scale-110 transition-transform">
                GET STARTED NOW
              </Link>
            </div>
          </div>
          
          {/* 3D Decorative Orbs */}
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-black/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </motion.div>
      </section>
    </div>
  );
}

