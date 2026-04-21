'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Heart, ArrowRight, Target, Play, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#020408] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* 3D Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, rotate, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#020408]" />
          <img 
            src="/hero_3d_golf_impact_1776806093015.png" 
            alt="Premium 3D Visual"
            className="w-full h-full object-cover opacity-60 scale-110"
          />
        </motion.div>

        {/* Floating Motion Graphics */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
              animate={{ 
                x: [Math.random() * 100, Math.random() * 500, Math.random() * 100],
                y: [Math.random() * 100, Math.random() * 500, Math.random() * 100],
                rotate: [0, 360],
              }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"
            />
          ))}
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md mb-8">
              <Zap size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Next Gen Golf Philanthropy</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              DRIVE <span className="text-emerald-500 italic">IMPACT.</span><br />
              NOT JUST <span className="text-white/20">DISTANCE.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-12">
              The world's first high-stakes philanthropy engine where your handicap fuels global change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="group relative px-12 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">START YOUR ROUND <ArrowRight size={20} /></span>
                <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <button className="flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:text-emerald-400 transition-colors">
                <div className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50">
                  <Play size={18} fill="currentColor" />
                </div>
                WATCH MOTION SHOWCASE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Motion Showcase Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 group"
            >
              <img 
                src="/hero_3d_golf_impact_1776806093015.png" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Motion Graphic" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-20 w-20 rounded-full bg-emerald-500 text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10 p-6 glass-card rounded-2xl opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <div className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1">Interactive Feature</div>
                <div className="text-lg font-black text-white">3D PERFORMANCE MAPPING</div>
              </div>
            </motion.div>

            <div className="space-y-12">
              <div className="inline-block h-1 w-20 bg-emerald-500" />
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                VISUALIZE YOUR <br />
                <span className="text-white/40">GIVING JOURNEY.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-black">PRECISION IMPACT</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Every Stableford point is tracked and converted into measurable charitable metrics in real-time.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-black">ELITE VERIFICATION</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Our 3D verification engine ensures all scores are validated before the monthly draw.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Call to Action */}
      <section className="py-40 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[150px] animate-pulse" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card p-20 rounded-[60px] text-center max-w-4xl border-emerald-500/20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">READY TO CHANGE <br />THE GAME?</h2>
          <Link href="/signup" className="btn-primary inline-flex items-center gap-3 text-xl">
            JOIN THE OBSIDIAN ELITE <ArrowRight size={24} strokeWidth={3} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
