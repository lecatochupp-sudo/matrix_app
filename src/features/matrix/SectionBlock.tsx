"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, ChevronUp, Sparkles, ArrowRight, EyeOff } from "lucide-react";

interface SectionBlockProps {
  title: string;
  isLocked: boolean;
  children: React.ReactNode;
  onUnlock?: () => void;
  previewText?: string;
  teaser?: string;
}

export function SectionBlock({ title, isLocked, children, onUnlock, previewText, teaser }: SectionBlockProps) {
  const [isOpen, setIsOpen] = useState(!isLocked);

  return (
    <div className={`group relative border rounded-[56px] overflow-hidden transition-all duration-1000 ${isLocked ? 'border-white/5 bg-[#0a0f1d]/40' : 'border-white/10 bg-[#121826]/60 backdrop-blur-3xl shadow-2xl'}`}>
      <button 
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        className="w-full p-12 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-8">
          <div className={`w-2 h-12 rounded-full transition-all duration-700 ${isLocked ? 'bg-slate-800' : 'bg-gradient-to-b from-indigo-400 via-indigo-600 to-violet-600 shadow-[0_0_30px_rgba(99,102,241,0.4)]'}`} />
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none mb-1">{title}</h3>
            {!isLocked && <p className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500/60">Full Insight Activated</p>}
          </div>
        </div>
        <div className="flex items-center gap-6">
            {isLocked ? (
              <div className="px-6 py-2 bg-amber-500/5 border border-amber-500/20 rounded-full flex items-center gap-3">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Premium Insight</span>
              </div>
            ) : (
              <div className={`p-4 rounded-full border border-white/5 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-white/5' : ''}`}>
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </div>
            )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-12 pb-16">
              <div className="relative">
                {isLocked ? (
                  <div className="space-y-8">
                    <div className="relative">
                        <p className="text-slate-400 italic leading-relaxed text-xl font-serif opacity-40 select-none">
                          {previewText || "Энергия этого сектора определяет фундаментальные аспекты вашей реализации. Именно здесь скрыты ответы на вопросы, которые вы задаете себе годами..."}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1d]/80 to-[#0a0f1d] z-10" />
                    </div>
                    
                    <div className="p-10 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-[40px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                            <EyeOff size={100} className="text-indigo-400" />
                        </div>
                        <p className="text-indigo-400 text-sm font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                            <Sparkles size={16} /> Самое важное скрыто
                        </p>
                        <p className="text-slate-300 text-lg font-serif italic leading-relaxed relative z-10">
                            {teaser || "В этой части разбора мы раскроем ваш истинный потенциал и те блоки, которые мешают вашему росту прямо сейчас."}
                        </p>
                        <p className="mt-6 text-slate-500 text-sm italic font-serif opacity-80">
                            "Ваш реальный потенциал в этой сфере раскрывается только при глубоком анализе всех 12 линий..."
                        </p>
                    </div>

                    <div className="relative group/btn">
                        <div className="absolute -inset-4 bg-indigo-600 blur-3xl opacity-0 group-hover/btn:opacity-20 transition-all duration-700" />
                        <button 
                          onClick={onUnlock}
                          className="relative w-full py-8 bg-white text-indigo-950 font-black uppercase text-xs tracking-[0.5em] rounded-[32px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                        >
                          Получить полный разбор <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-300 leading-relaxed font-serif text-xl italic space-y-6">
                    {children}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
