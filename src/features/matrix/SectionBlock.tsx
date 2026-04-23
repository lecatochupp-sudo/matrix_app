"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, ChevronUp, Sparkles, ArrowRight } from "lucide-react";

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
    <div className={`group relative border border-white/5 rounded-[48px] overflow-hidden transition-all duration-700 ${isLocked ? 'bg-slate-900/10' : 'bg-[#121826]/40 backdrop-blur-3xl'}`}>
      <button 
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        className="w-full p-10 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-6">
          <div className={`w-1.5 h-10 rounded-full transition-all duration-500 ${isLocked ? 'bg-slate-800' : 'bg-gradient-to-b from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]'}`} />
          <h3 className="text-2xl font-black italic tracking-tight text-white uppercase">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
            {isLocked ? (
              <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2">
                <Lock className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Locked</span>
              </div>
            ) : (
              isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />
            )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-12">
              <div className="relative">
                {isLocked ? (
                  <div className="space-y-6">
                    <p className="text-slate-400 italic leading-relaxed text-lg font-serif">
                      {previewText || "Энергия этого сектора определяет фундаментальные аспекты вашей реализации..."}
                    </p>
                    
                    {teaser && (
                        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
                            <p className="text-amber-500/80 text-sm italic font-serif">“{teaser}”</p>
                        </div>
                    )}

                    <div className="relative group/btn">
                        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                        <button 
                          onClick={onUnlock}
                          className="relative w-full py-6 bg-white text-indigo-950 font-black uppercase text-[11px] tracking-[0.3em] rounded-[24px] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                          <Sparkles className="w-4 h-4" /> Разблокировать анализ <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-300 leading-relaxed font-serif text-lg italic space-y-4">
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
