import Link from 'next/link';
import { Heart, Mail, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-slate-950/50 px-6 py-12 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-emerald-400 to-amber-500 bg-clip-text text-transparent">PAR</span>
            <span className="text-white">GIVE</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            A monthly golf reward platform that puts impact first. Every swing supports a charity of your choice.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Platform</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-400">
            <li><Link href="/charities" className="hover:text-emerald-400">Directory</Link></li>
            <li><Link href="/draws" className="hover:text-emerald-400">Monthly Draws</Link></li>
            <li><Link href="/dashboard" className="hover:text-emerald-400">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Support</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-400">
            <li><Link href="/faq" className="hover:text-emerald-400">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Connect</h4>
          <div className="flex gap-4 text-slate-400">
            <Link href="#" className="hover:text-emerald-400"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-emerald-400"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-emerald-400"><Mail size={20} /></Link>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/5 pt-8 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} ParGive. All rights reserved.</p>
        <div className="flex items-center gap-1">
          Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> by ParGive Team
        </div>
      </div>
    </footer>
  );
}
