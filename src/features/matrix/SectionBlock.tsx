"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface SectionBlockProps {
  title: string;
  isLocked: boolean;
  children: React.ReactNode;
  onUnlock?: () => void;
  previewText?: string;
}

export function SectionBlock({ title, isLocked, children, onUnlock, previewText }: SectionBlockProps) {
  const [isOpen, setIsOpen] = useState(!isLocked);

  return (
    <div className={`group relative border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 ${isLocked ? 'bg-slate-900/20' : 'bg-slate-900/40 backdrop-blur-xl'}`}>
      <button 
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-1 h-8 rounded-full transition-colors ${isLocked ? 'bg-slate-700' : 'bg-indigo-500'}`} />
          <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">{title}</h3>
        </div>
        {isLocked ? (
          <Lock className="w-5 h-5 text-amber-500/50" />
        ) : (
          isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-10">
              <div className={`prose prose-invert max-w-none ${isLocked ? 'mask-blur' : ''}`}>
                {isLocked ? (
                  <div className="relative">
                    <p className="text-slate-500 italic leading-relaxed mb-6">
                      {previewText || "Энергия этого сектора определяет фундаментальные аспекты вашей реализации. В глубокой расшифровке вы узнаете о скрытых талантах и кармических задачах..."}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070b14] z-10" />
                    <button 
                      onClick={onUnlock}
                      className="relative z-20 w-full py-4 bg-white/5 border border-amber-500/20 text-amber-500 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Открыть полный доступ
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-300 leading-relaxed font-serif text-lg italic">
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
