'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CHARITIES = [
  { 
    id: '1', 
    name: 'Ocean Cleanse', 
    category: 'Environment', 
    desc: 'Leading the global effort to remove plastic from our oceans through innovative technology and community action.',
    impact: '$240k+ Raised',
    image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '2', 
    name: 'Youth Golf Assist', 
    category: 'Sport', 
    desc: 'Breaking down barriers to golf by providing equipment, coaching, and life skills to children in underserved communities.',
    impact: '5k+ Kids Helped',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '3', 
    name: 'Education Found', 
    category: 'Education', 
    desc: 'Ensuring every child has access to quality education. We build schools and provide scholarships in developing nations.',
    impact: '120 Schools Built',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '4', 
    name: 'Green Canopy', 
    category: 'Environment', 
    desc: 'Restoring the worlds ecosystems through massive reforestation and biodiversity protection projects.',
    impact: '1M+ Trees Planted',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '5', 
    name: 'Medical Bridge', 
    category: 'Health', 
    desc: 'Providing emergency medical supplies and training to conflict zones and areas hit by natural disasters.',
    impact: '200k Lives Affected',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '6', 
    name: 'Clean Water Project', 
    category: 'Health', 
    desc: 'Building sustainable water systems in communities lack access to safe drinking water.',
    impact: '300 Wells Dug',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Charities() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Environment', 'Sport', 'Education', 'Health'];

  const filteredCharities = CHARITIES.filter(c => 
    (activeCategory === 'All' || c.category === activeCategory) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white md:text-6xl">Our Impact Partners</h1>
          <p className="mt-4 text-lg text-slate-400">Explore the organizations that your monthly play directly supports.</p>
        </div>
        
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500/50 md:w-64"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCharities.map((charity, i) => (
          <motion.div
            key={charity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="premium-card group overflow-hidden p-0"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img src={charity.image} alt={charity.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold uppercase text-white">
                {charity.category}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{charity.name}</h3>
                <span className="text-xs font-bold text-emerald-400">{charity.impact}</span>
              </div>
              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">
                {charity.desc}
              </p>
              
              <div className="flex items-center justify-between">
                <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-emerald-400">
                  Profile <ExternalLink size={14} />
                </Link>
                <Link href="/signup" className="flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-white">
                  Support <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCharities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
          <Heart size={48} className="mb-4 opacity-10" />
          <p className="text-xl">No charities found matching your search.</p>
        </div>
      )}
    </div>
  );
}
