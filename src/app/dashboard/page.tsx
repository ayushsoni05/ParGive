'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Heart, 
  Calendar, 
  Plus, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  Info,
  X,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { supabase, GolfScore } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [scores, setScores] = useState<GolfScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [newScore, setNewScore] = useState({ score: '', date: '' });
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [charity, setCharity] = useState<any>(null);
  const [winnings, setWinnings] = useState<any[]>([]);
  const [nextDraw, setNextDraw] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*, charities(name)')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
        if (profileData.charities) setCharity(profileData.charities);
      }
      
      fetchScores(user.id);
      fetchWinnings(user.id);
      fetchDraws();
    };
    checkUser();
  }, [router]);

  const fetchScores = async (userId: string) => {
    const { data } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    if (data) setScores(data);
    setLoading(false);
  };

  const fetchWinnings = async (userId: string) => {
    const { data } = await supabase
      .from('winners')
      .select('*')
      .eq('user_id', userId);
    if (data) setWinnings(data);
  };

  const fetchDraws = async () => {
    const { data } = await supabase
      .from('draws')
      .select('*')
      .eq('status', 'published')
      .order('draw_date', { ascending: true })
      .limit(1);
    if (data && data.length > 0) setNextDraw(data[0]);
  };

  const handleAddScore = async () => {
    if (!newScore.score || !newScore.date || !user) return;
    
    const { count } = await supabase
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count !== null && count >= 5) {
      const { data: oldest } = await supabase
        .from('scores')
        .select('id')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(1)
        .single();

      if (oldest) {
        await supabase.from('scores').delete().eq('id', oldest.id);
      }
    }

    const { data: inserted } = await supabase
      .from('scores')
      .insert([{ user_id: user.id, score: parseInt(newScore.score), date: newScore.date }])
      .select()
      .single();

    if (inserted) fetchScores(user.id);
    setNewScore({ score: '', date: '' });
    setShowScoreModal(false);
  };

  const totalWinnings = winnings.reduce((acc, w) => acc + Number(w.prize_amount), 0);

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-amber-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-20">
        {/* Header Section */}
        <header className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
              <Activity size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Dashboard</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter md:text-6xl">
              WELCOME, <span className="text-emerald-500 uppercase">{user?.user_metadata?.full_name?.split(' ')[0] || 'GOLFER'}</span>
            </h1>
            <p className="mt-2 text-lg font-medium text-slate-500">Your performance is currently fueling global change.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 rounded-[32px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Member Status</span>
              <span className="text-lg font-black text-emerald-400">
                {profile?.plan_type?.toUpperCase() || 'NO PLAN'} / {profile?.subscription_status?.toUpperCase() || 'INACTIVE'}
              </span>
            </div>
            <Link href="/subscribe" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition-transform hover:scale-110 active:scale-95">
              <CreditCard size={20} />
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Grid Content */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card group relative overflow-hidden p-8 rounded-[40px]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Trophy size={120} className="text-amber-500" />
                </div>
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Trophy size={24} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Total Prize Winnings</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black">${totalWinnings.toLocaleString()}</span>
                    <span className="text-emerald-500 font-bold text-sm">+2.4%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card group relative overflow-hidden p-8 rounded-[40px]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Heart size={120} className="text-rose-500" />
                </div>
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                    <Heart size={24} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Active Impact Partner</div>
                  <div className="text-3xl font-black mb-4">{charity?.name || 'Not Selected'}</div>
                  <Link href="/charities" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-400 hover:gap-4 transition-all">
                    SWITCH PARTNER <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Performance List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 rounded-[40px]"
            >
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">LATEST ROUNDS</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Showing your rolling 5 score pool.</p>
                </div>
                <button 
                  onClick={() => setShowScoreModal(true)}
                  className="flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-3 font-black text-black transition-all hover:scale-105 active:scale-95"
                >
                  <Plus size={20} strokeWidth={3} /> ADD SCORE
                </button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-20 text-center text-slate-500 font-bold animate-pulse">Syncing performance engine...</div>
                ) : scores.length === 0 ? (
                  <div className="py-20 text-center text-slate-500 border-2 border-dashed border-white/5 rounded-[32px]">
                    <Target size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="text-lg font-bold">Your scoreboard is currently empty.</p>
                  </div>
                ) : (
                  scores.map((score, i) => (
                    <motion.div 
                      key={score.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#020408] text-3xl font-black text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                          {score.score}
                        </div>
                        <div>
                          <div className="text-sm font-black uppercase tracking-widest text-slate-500 mb-1">Stableford</div>
                          <div className="flex items-center gap-2 text-white font-bold">
                            <Calendar size={14} className="text-emerald-500" /> {new Date(score.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="h-2 w-24 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(score.score / 45) * 100}%` }} />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Section */}
          <div className="flex flex-col gap-8">
            {/* Draw Card */}
            <motion.div 
              whileHover={{ rotateZ: 1 }}
              className="glass-card relative overflow-hidden p-10 rounded-[40px] border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-black">
                <Trophy size={28} />
              </div>
              <h3 className="text-2xl font-black mb-6">NEXT DRAW</h3>
              
              {nextDraw ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-black tracking-tighter">
                      {new Date(nextDraw.draw_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">ID: {nextDraw.id.slice(0, 8)}</div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Total Pool</span>
                      <span className="text-lg font-black text-white">${nextDraw.total_prize_pool.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 animate-pulse" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-slate-500 font-bold">Scanning for scheduled draws...</div>
              )}
              
              <Link href="/draws" className="mt-10 flex items-center justify-center w-full py-4 rounded-2xl bg-white/5 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                DRAW MECHANICS <ChevronRight size={14} />
              </Link>
            </motion.div>

            {/* Impact Stats */}
            <div className="glass-card p-10 rounded-[40px]">
              <h3 className="text-xl font-black mb-8 tracking-tight">COMMUNITY IMPACT</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Lifetime Gift</div>
                    <div className="text-xl font-black text-white">$1,240.00</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Lives Impacted</div>
                    <div className="text-xl font-black text-white">42 People</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Entry Modal */}
        <AnimatePresence>
          {showScoreModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg rounded-[40px] border border-white/10 bg-[#07090e] p-12 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                <button 
                  onClick={() => setShowScoreModal(false)}
                  className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="mb-8 text-4xl font-black tracking-tighter">SUBMIT ROUND</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Stableford Points (1-45)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="45"
                      placeholder="e.g. 38"
                      value={newScore.score}
                      onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-xl font-black text-white outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tournament Date</label>
                    <input 
                      type="date" 
                      value={newScore.date}
                      onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-lg font-bold text-white outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <button 
                      onClick={handleAddScore}
                      className="flex-1 py-5 rounded-2xl bg-emerald-500 text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                    >
                      CONFIRM SUBMISSION
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

