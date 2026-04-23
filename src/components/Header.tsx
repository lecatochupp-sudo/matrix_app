"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-black/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">Matrix<span className="text-indigo-500">Pro</span></span>
        </Link>
        
        <div className="flex items-center gap-8">
          {session ? (
            <div className="flex items-center gap-6">
              <Link href="/cabinet" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Кабинет
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
