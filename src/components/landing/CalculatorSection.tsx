"use client";

import { motion } from "framer-motion";
import { CalculatorForm } from "@/components/CalculatorForm";

export function CalculatorSection() {
  return (
    <section id="calc" className="py-56 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
        >
            <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-8 leading-[0.85]">Рассчитайте<br/>свою матрицу</h2>
            <p className="text-xl text-slate-400 font-serif italic max-w-2xl mx-auto">Введите свои данные для мгновенного бесплатного расчета ключевых показателей вашей судьбы.</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
        >
            {/* Обертка для стилизации формы под Dark Luxury */}
            <div className="bg-[#121826]/60 backdrop-blur-2xl border border-white/10 p-4 md:p-12 rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                <div className="[&_div.bg-white]:bg-transparent [&_div.bg-white]:border-none [&_div.bg-white]:shadow-none [&_div.bg-white]:p-0">
                    <style jsx global>{`
                        #calc input, #calc select {
                            background: rgba(0,0,0,0.4) !important;
                            border: 1px solid rgba(255,255,255,0.05) !important;
                            color: white !important;
                            height: 64px;
                            border-radius: 20px !important;
                        }
                        #calc label {
                            color: #64748b !important;
                            text-transform: uppercase;
                            font-size: 10px;
                            font-weight: 900;
                            letter-spacing: 0.2em;
                            margin-bottom: 12px;
                        }
                        #calc button[type="submit"] {
                            height: 72px;
                            border-radius: 24px;
                            background: white !important;
                            color: #070b14 !important;
                            font-weight: 900;
                            text-transform: uppercase;
                            letter-spacing: 0.2em;
                            font-size: 12px;
                            margin-top: 20px;
                        }
                        #calc div.flex.bg-slate-100 {
                            background: rgba(255,255,255,0.03) !important;
                            border-radius: 20px;
                            padding: 6px;
                            margin-bottom: 40px !important;
                        }
                        #calc div.flex.bg-slate-100 button.bg-white {
                            background: rgba(255,255,255,0.1) !important;
                            color: white !important;
                            border-radius: 14px;
                        }
                    `}</style>
                    <CalculatorForm />
                </div>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                <span>Safe SSL</span>
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
                <span>Private Data</span>
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
                <span>Instant Result</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
