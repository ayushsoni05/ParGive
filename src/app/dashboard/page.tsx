import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Heart, 
  Calendar, 
  Plus, 
  Edit2, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  Info
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
      
      if (profileData) setProfile(profileData);
      fetchScores(user.id);
    };
    checkUser();
  }, [router]);

  const [charity, setCharity] = useState<any>(null);

  useEffect(() => {
    if (profile?.charities) {
      setCharity(profile.charities);
    }
  }, [profile]);

  const fetchScores = async (userId: string) => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (data) setScores(data);
    setLoading(false);
  };

  const [winnings, setWinnings] = useState<any[]>([]);
  const fetchWinnings = async (userId: string) => {
    const { data } = await supabase
      .from('winners')
      .select('*')
      .eq('user_id', userId);
    if (data) setWinnings(data);
  };

  const [nextDraw, setNextDraw] = useState<any>(null);
  const fetchDraws = async () => {
    const { data } = await supabase
      .from('draws')
      .select('*')
      .eq('status', 'published')
      .order('draw_date', { ascending: true })
      .limit(1);
    
    if (data && data.length > 0) setNextDraw(data[0]);
  };

  useEffect(() => {
    fetchDraws();
  }, []);

  const handleAddScore = async () => {
    if (!newScore.score || !newScore.date || !user) return;
    
    // Check current count
    const { count, error: countError } = await supabase
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count !== null && count >= 5) {
      // Find oldest score to delete
      const { data: oldest } = await supabase
        .from('scores')
        .select('id')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(1)
        .single();

      if (oldest) {
        await supabase
          .from('scores')
          .delete()
          .eq('id', oldest.id);
      }
    }

    // Add to DB
    const { data: inserted, error } = await supabase
      .from('scores')
      .insert([
        { 
          user_id: user.id, 
          score: parseInt(newScore.score), 
          date: newScore.date 
        }
      ])
      .select()
      .single();

    if (inserted) {
      fetchScores(user.id);
    }
    
    setNewScore({ score: '', date: '' });
    setShowScoreModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Hello, {user?.user_metadata?.full_name || 'Golfer'}</h1>
          <p className="text-slate-400">Welcome to your impact dashboard.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subscription</span>
            <span className="text-sm font-semibold text-emerald-400">
              {profile?.plan_type ? (profile.plan_type.charAt(0).toUpperCase() + profile.plan_type.slice(1)) : 'No Plan'} • {profile?.subscription_status || 'Inactive'}
            </span>
          </div>
          <Link href="/subscribe" className="rounded-full bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10">
            <CreditCard size={20} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content (2/3) */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="premium-card bg-emerald-500/5">
              <div className="mb-4 flex items-center justify-between">
                <Trophy className="text-amber-500" size={24} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Winnings</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white">
                  ${winnings.reduce((acc, w) => acc + Number(w.prize_amount), 0).toLocaleString()}
                </span>
                <span className="mb-1 text-sm text-emerald-400">Total</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Info size={14} /> 
                {winnings.some(w => w.status === 'pending') 
                  ? `Payout of $${winnings.filter(w => w.status === 'pending').reduce((acc, w) => acc + Number(w.prize_amount), 0)} is pending` 
                  : 'No pending payouts'}
              </div>
            </div>

            <div className="premium-card bg-rose-500/5">
              <div className="mb-4 flex items-center justify-between">
                <Heart className="text-rose-500" size={24} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Charity</span>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{charity?.name || 'Not Selected'}</h3>
                <span className="rounded-lg bg-rose-500/10 px-2 py-1 text-xs font-bold text-rose-400">{profile?.charity_percentage || 10}% Impact</span>
              </div>
              <Link href="/onboarding" className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-400 hover:underline">
                Update Charity <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Winner Verification */}
          {winnings.some(w => w.status === 'pending' && !w.proof_url) && (
            <div className="premium-card border-amber-500/50 bg-amber-500/5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Action Required: Verify Your Win</h3>
                  <p className="text-sm text-slate-400">Please upload a screenshot of your scores to claim your prize.</p>
                </div>
                <button className="btn-primary whitespace-nowrap bg-amber-500 text-slate-900 hover:bg-amber-400">
                  Upload Proof
                </button>
              </div>
            </div>
          )}

          {/* Score Management */}
          <div className="premium-card">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Latest Performance</h3>
                <p className="text-sm text-slate-500">Only your last 5 scores are retained for the draw.</p>
              </div>
              <button 
                onClick={() => setShowScoreModal(true)}
                className="btn-primary rounded-xl px-4 py-2 text-sm"
              >
                <Plus size={18} /> New Score
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {loading ? (
                <div className="py-10 text-center text-slate-500">Loading your performance data...</div>
              ) : scores.length === 0 ? (
                <div className="py-10 text-center text-slate-500">No scores entered yet. Start your round!</div>
              ) : (
                scores.map((score, i) => (
                  <div key={score.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xl font-black text-white">
                        {score.score}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Stableford Points</div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar size={12} /> {score.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>


        {/* Sidebar (1/3) */}
        <div className="flex flex-col gap-8">
          {/* Upcoming Draw */}
          <div className="premium-card border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Calendar className="text-amber-500" size={20} /> Next Prize Draw
            </h3>
            {nextDraw ? (
              <>
                <div className="mb-6">
                  <div className="text-3xl font-black text-white">
                    {new Date(nextDraw.draw_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-slate-400">Draw #{nextDraw.id.slice(0, 4)} • Monthly Classic</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-slate-500">
                    <span>Prize Pool Tiers</span>
                    <span>Active Pool</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">5-Number Match</span>
                    <span className="font-bold text-white">${(nextDraw.total_prize_pool * 0.4).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">4-Number Match</span>
                    <span className="font-bold text-white">${(nextDraw.total_prize_pool * 0.35).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">3-Number Match</span>
                    <span className="font-bold text-white">${(nextDraw.total_prize_pool * 0.25).toLocaleString()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-slate-500">No upcoming draws scheduled.</div>
            )}
            <Link href="/draws" className="mt-8 block w-full rounded-xl bg-white/5 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white/10">
              View Mechanics
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="premium-card">
            <h3 className="mb-4 text-lg font-bold text-white">Impact Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2"><TrendingUp size={18} className="text-emerald-500" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Contribution</div>
                  <div className="font-bold text-white">$145.50 this year</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2"><Heart size={18} className="text-rose-400" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Supported Cause</div>
                  <div className="font-bold text-white">Ocean Cleanse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Entry Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-white">Add New Score</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-400">Stableford Points (1-45)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="45"
                  value={newScore.score}
                  onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Date Played</label>
                <input 
                  type="date" 
                  value={newScore.date}
                  onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowScoreModal(false)}
                  className="flex-1 rounded-xl bg-white/5 py-4 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddScore}
                  className="btn-primary flex-1 justify-center py-4 text-lg"
                >
                  Save Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
