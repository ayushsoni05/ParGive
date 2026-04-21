'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Trophy, Heart, ArrowRight, Target, Play, Shield, Zap, Globe, Activity } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const videoSectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Scroll Effects
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Video Portal Scroll Effects
  const videoScale = useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0.8, 1.2, 1]);
  const videoRotateX = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const videoY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothVideoScale = useSpring(videoScale, springConfig);

  return (
    <div ref={containerRef} className="relative bg-[#020408] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* 1. Immersive Hero with 3D Depth */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0">
        <motion.div 
          style={{ scale: heroScale, rotateZ: heroRotate, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#020408]" />
          <img 
            src="/hero_3d_golf_impact_1776806093015.png" 
            alt="Premium 3D Visual"
            className="w-full h-full object-cover opacity-40 scale-125"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 backdrop-blur-xl mb-12 animate-float">
              <Activity size={16} className="text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">The Obsidian Protocol</span>
            </div>
            <h1 className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-[0.75] mb-12">
              BEYOND<br />
              <span className="text-emerald-500">PLAY.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-tight">
              A high-fidelity 3D philanthropy engine where your handicap transforms the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/signup" target="_blank" rel="noopener noreferrer" className="group relative px-16 py-6 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                <span className="relative z-10 flex items-center gap-3 text-xl">ENTER THE SYSTEM <ArrowRight size={24} strokeWidth={3} /></span>
                <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 3D Scroll Video Motion Graphic */}
      <section ref={videoSectionRef} className="relative min-h-screen py-40 flex items-center justify-center perspective-1000">
        <motion.div 
          style={{ 
            scale: smoothVideoScale, 
            rotateX: videoRotateX,
            y: videoY
          }}
          className="relative w-[90vw] max-w-7xl aspect-video rounded-[60px] overflow-hidden border border-white/10 glass-card preserve-3d group shadow-2xl"
        >
          {/* Animated Video Placeholder Graphic */}
          <div className="absolute inset-0 z-0">
             <img 
              src="/hero_3d_golf_impact_1776806093015.png" 
              className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" 
              alt="Motion Graphic Video" 
            />
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-32 w-32 rounded-full bg-emerald-500 text-black flex items-center justify-center cursor-pointer hover:bg-white transition-colors group/play"
            >
              <Play size={48} fill="currentColor" className="ml-2 group-hover/play:scale-125 transition-transform" />
            </motion.div>
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">THE MOTION OF GIVING</h2>
              <p className="text-emerald-400 font-black uppercase tracking-[0.4em] text-sm">Experience the 3D Impact Visualization</p>
            </div>
          </div>

          {/* Floating UI Elements over the 'video' */}
          <div className="absolute top-12 left-12 flex items-center gap-4">
             <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Processing Live Data</span>
          </div>
          <div className="absolute bottom-12 right-12 glass-card p-6 rounded-3xl border-emerald-500/20 max-w-xs">
             <div className="text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Global Contribution</div>
             <div className="text-3xl font-black text-white">$1,245,890.00</div>
             <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  className="h-full bg-emerald-500" 
                />
             </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Deep Features Section */}
      <section className="py-60 px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <div className="space-y-12">
                <div className="inline-flex items-center gap-4">
                  <div className="h-1 w-12 bg-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">The Mechanics of Change</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                  YOUR GAME, <br />
                  <span className="text-white/20">THEIR FUTURE.</span>
                </h2>
                <div className="space-y-10">
                  <div className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <Target size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2">PRECISION TRACKING</h4>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed">Our 3D engine visualizes your performance data across a rolling 5-score pool.</p>
                    </div>
                  </div>
                   <div className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                      <Trophy size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2">ELITE REWARDS</h4>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed">Participate in monthly high-stakes draws while driving direct impact.</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="relative">
                <motion.div 
                  initial={{ rotateY: 30, rotateX: 10 }}
                  whileInView={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="glass-card aspect-[4/5] rounded-[60px] overflow-hidden border-emerald-500/20"
                >
                  <img src="/hero_3d_golf_impact_1776806093015.png" className="w-full h-full object-cover scale-150 -translate-x-20 rotate-12 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent" />
                  <div className="absolute bottom-16 left-16 right-16 text-center">
                    <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">Live Performance Hub</div>
                    <Link href="/dashboard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-3xl font-black group">
                      OPEN DASHBOARD <ArrowRight className="group-hover:translate-x-4 transition-transform" strokeWidth={3} />
                    </Link>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. The Final Call to Action */}
      <section className="py-60 flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[150px] animate-pulse" />
        <div className="relative text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-12">
              THE CLUB <br />
              <span className="text-emerald-500">AWAITS.</span>
            </h2>
            <Link href="/signup" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-4 text-2xl py-8 px-20 rounded-[40px]">
              JOIN THE PROTOCOL <ArrowRight size={32} strokeWidth={3} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
