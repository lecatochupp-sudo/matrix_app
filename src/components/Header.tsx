"use client";

import Link from "next/link";
import { User, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase italic">
            Matrix <span className="text-indigo-500">Destiny</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: 'КАК ЭТО РАБОТАЕТ', href: '/#how-it-works' },
            { name: 'ЧТО ВЫ УЗНАЕТЕ', href: '/#what-you-learn' },
            { name: 'ОТЗЫВЫ', href: '/#reviews' },
            { name: 'ЛИЧНЫЙ КАБИНЕТ', href: '/account' }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link 
          href="/#calc" 
          className="px-8 py-3 bg-indigo-600/10 border border-indigo-500/30 rounded-xl text-[10px] font-black tracking-[0.2em] text-white hover:bg-indigo-600 transition-all uppercase shadow-[0_0_20px_rgba(79,70,229,0.2)]"
        >
          Начать расчет
        </Link>
      </div>
    </header>
  );
}
