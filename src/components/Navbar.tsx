'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Heart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link001 } from '@/components/ui/skiper-ui/skiper40';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/charities', label: 'CHARITIES' },
    { href: '/draws', label: 'MONTHLY DRAW' },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
      scrolled ? 'py-4 backdrop-blur-xl border-b border-white/5 bg-black/40' : 'py-8 bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3 text-3xl font-black tracking-tighter">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black group-hover:rotate-12 transition-transform">
            <Trophy size={20} fill="currentColor" />
          </div>
          <span className="hidden sm:block">PARGIVE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-12 md:flex">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link001 
                key={link.href} 
                href={link.href} 
                className={`text-[11px] font-black tracking-[0.3em] ${
                  pathname === link.href ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {link.label}
              </Link001>
            ))}
          </div>
          
          <Link href="/dashboard" className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-xs font-black tracking-widest text-black transition-all hover:pr-8 active:scale-95">
            DASHBOARD
            <LayoutDashboard size={14} className="absolute right-3 translate-x-10 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="relative z-50 text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-3xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="text-4xl font-black tracking-tighter hover:text-emerald-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link 
                href="/dashboard" 
                className="rounded-full bg-emerald-500 px-12 py-5 text-xl font-black text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                DASHBOARD
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

