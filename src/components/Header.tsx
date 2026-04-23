"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToCalc = () => {
    if (isHome) {
      document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm -rotate-45" />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Matrix Destiny</span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
            <button 
                onClick={scrollToCalc}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
            >
                Как это работает
            </button>
            <button 
                onClick={scrollToCalc}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
            >
                Что вы узнаете
            </button>
            <Link 
                href={isHome ? "#calc" : "/"}
                onClick={(e) => {
                    if (isHome) {
                        e.preventDefault();
                        scrollToCalc();
                    }
                }}
                className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
            >
                Начать расчет
            </Link>
        </nav>
      </div>
    </header>
  );
}
