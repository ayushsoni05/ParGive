'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Heart, LayoutDashboard, LogIn, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/charities', label: 'Charities', icon: <Heart size={18} /> },
    { href: '/draws', label: 'Monthly Draw', icon: <Trophy size={18} /> },
  ];

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-white/10 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter transition-transform hover:scale-105">
          <span className="bg-gradient-to-r from-emerald-400 to-amber-500 bg-clip-text text-transparent">PAR</span>
          <span className="text-white">GIVE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-400 ${
                pathname === link.href ? 'text-emerald-400' : 'text-slate-300'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <Link href="/dashboard" className="btn-primary">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-4 bg-slate-900/95 p-6 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/dashboard" 
            className="btn-primary justify-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
