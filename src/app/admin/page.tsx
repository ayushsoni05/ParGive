'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Trophy, 
  Heart, 
  Settings, 
  Play, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreHorizontal,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const MOCK_STATS = [
  { label: 'Total Users', value: '1,240', change: '+12%', icon: <Users size={20} /> },
  { label: 'Total Prize Pool', value: '$124,500', change: '+$14k', icon: <Trophy size={20} /> },
  { label: 'Charity Impact', value: '$42,300', change: '+8%', icon: <Heart size={20} /> },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Draws');
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const runSimulation = () => {
    // Mock simulation logic
    setSimulationResult({
      winners: { '5-match': 0, '4-match': 2, '3-match': 28 },
      totalPool: '$58,400',
      numbers: [12, 19, 44, 5, 32]
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 p-6">
        <div className="mb-10 text-xl font-bold tracking-tighter text-white">
          <span className="text-emerald-400">Admin</span>Panel
        </div>
        
        <nav className="flex flex-col gap-2">
          {['Overview', 'Users', 'Draws', 'Charities', 'Winners', 'Settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab === 'Overview' && <TrendingUp size={18} />}
              {tab === 'Users' && <Users size={18} />}
              {tab === 'Draws' && <Play size={18} />}
              {tab === 'Charities' && <Heart size={18} />}
              {tab === 'Winners' && <Trophy size={18} />}
              {tab === 'Settings' && <Settings size={18} />}
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <ShieldCheck size={14} /> Admin Authenticated
            </div>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {MOCK_STATS.map((stat, i) => (
                <div key={i} className="premium-card">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">{stat.icon}</div>
                    <span className="text-xs font-bold text-emerald-400">{stat.change}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                  <div className="mt-1 text-3xl font-black text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="premium-card">
              <h3 className="mb-6 text-lg font-bold text-white">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-800" />
                      <div>
                        <div className="text-sm font-bold text-white">New Subscription</div>
                        <div className="text-xs text-slate-500">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-emerald-400">+$29.00</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Draws' && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="premium-card">
                <h3 className="mb-6 text-lg font-bold text-white">Configure Next Draw</h3>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">Draw Logic</label>
                    <select className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-emerald-500">
                      <option>Random Generation</option>
                      <option>Algorithmic (Least Frequent Scores)</option>
                      <option>Algorithmic (Most Frequent Scores)</option>
                    </select>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 p-4 text-sm text-amber-500">
                    <AlertCircle className="mb-2" size={20} />
                    The 5-Number Match jackpot for this draw is currently $45,000 including rollovers.
                  </div>
                  <button 
                    onClick={runSimulation}
                    className="btn-primary w-full justify-center py-4 text-lg"
                  >
                    Run Simulation
                  </button>
                </div>
              </div>

              {simulationResult && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="premium-card border-emerald-500/30"
                >
                  <h3 className="mb-6 text-lg font-bold text-white">Simulation Results</h3>
                  <div className="mb-8 flex justify-center gap-2">
                    {simulationResult.numbers.map((n: number, i: number) => (
                      <div key={i} className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-xl font-black text-slate-900 shadow-lg shadow-emerald-500/20">
                        {n}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">5-Match Winners</span>
                      <span className="font-bold text-white">{simulationResult.winners['5-match']}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">4-Match Winners</span>
                      <span className="font-bold text-white">{simulationResult.winners['4-match']}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">3-Match Winners</span>
                      <span className="font-bold text-white">{simulationResult.winners['3-match']}</span>
                    </div>
                  </div>
                  <button className="mt-8 w-full rounded-xl bg-emerald-500 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-emerald-400">
                    Publish Official Results
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly */}
        {activeTab === 'Winners' && (
          <div className="flex flex-col gap-6">
            <div className="premium-card">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Pending Verification</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input type="text" placeholder="Search winners..." className="rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white outline-none" />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/5">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Match</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Proof</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { user: 'Tiger W.', email: 'tiger@woods.com', match: '4-Match', amount: '$6,813', status: 'Pending' },
                      { user: 'Rory M.', email: 'rory@mcilroy.com', match: '3-Match', amount: '$347', status: 'Pending' },
                    ].map((winner, i) => (
                      <tr key={i} className="transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{winner.user}</div>
                          <div className="text-xs">{winner.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400">{winner.match}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-white">{winner.amount}</td>
                        <td className="px-6 py-4">
                          <button className="text-xs font-semibold text-emerald-400 hover:underline">View Screenshot</button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-900 hover:bg-emerald-400">Approve</button>
                            <button className="rounded-lg bg-white/5 px-3 py-1 text-xs font-bold text-white hover:bg-white/10">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
