"use client";

import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section className="py-40 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-10"
        >
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Что такое<br/>Матрица Судьбы?</h2>
            <div className="h-1 w-20 bg-indigo-500" />
            <p className="text-xl text-slate-400 font-serif italic leading-relaxed">
                Это система самопознания на стыке психологии и нумерологии. В её основе лежит 22 энергии, которые зашифрованы в вашей дате рождения.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
                Матрица — это не гадание. Это карта вашего потенциала. Она объясняет, почему в вашей жизни происходят те или иные события, и дает четкие инструкции, как изменить свою реальность через работу над собой.
            </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
        >
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full" />
            <div className="aspect-square bg-slate-900 border border-white/5 rounded-[64px] flex items-center justify-center p-12 relative overflow-hidden group">
                <div className="text-[120px] font-black text-indigo-500/20 group-hover:scale-110 transition-transform duration-1000">22</div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <p className="text-white font-black uppercase text-xs tracking-[0.4em] mb-4">Core Energies</p>
                    <p className="text-slate-400 text-sm italic">Каждая вершина матрицы — это ключ к вашей реализации</p>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
