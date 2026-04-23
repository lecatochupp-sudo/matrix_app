"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { CalculationStorage, SavedCalculation } from "@/lib/storage";
import { User, History, ArrowRight, Trash2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [history, setHistory] = useState<SavedCalculation[]>([]);

  useEffect(() => {
    setHistory(CalculationStorage.getAll());
  }, []);

  const handleClear = () => {
    if (confirm("Вы уверены, что хотите очистить историю расчетов?")) {
        CalculationStorage.clear();
        setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
                    <User size={40} className="text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">Личный Кабинет</h1>
                    <p className="text-slate-500 text-sm font-serif italic">Ваша персональная история расчетов</p>
                </div>
            </div>
            
            <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
            >
                <Trash2 size={12} /> Очистить историю
            </button>
        </div>

        {history.length === 0 ? (
            <div className="py-32 text-center border border-white/5 rounded-[48px] bg-white/[0.02]">
                <History size={48} className="text-slate-800 mx-auto mb-6" />
                <p className="text-xl font-serif italic text-slate-600 mb-8">У вас пока нет сохраненных расчетов</p>
                <Link href="/#calc" className="px-12 py-5 bg-white text-indigo-950 font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all inline-block">
                    Сделать первый расчет
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {history.map((calc, i) => (
                    <motion.div 
                        key={calc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-[#121826]/40 border border-white/5 rounded-[40px] hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Zap size={80} className="text-indigo-400" />
                        </div>
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-[9px] font-black uppercase text-indigo-500 tracking-widest mb-2">Расчет от {new Date(calc.timestamp).toLocaleDateString()}</p>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">{calc.name}</h3>
                            </div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <span className="text-[10px] font-black text-slate-500">{calc.date}</span>
                            </div>
                        </div>

                        <Link 
                            href={`/result?name=${encodeURIComponent(calc.name)}&date=${calc.date}&gender=${calc.gender}`}
                            className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase text-white hover:bg-indigo-600 transition-all group-hover:shadow-lg"
                        >
                            Открыть отчет <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
}
