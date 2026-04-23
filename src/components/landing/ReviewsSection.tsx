"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Елена К.",
        role: "Предприниматель",
        text: "Я была поражена точностью расчета. Матрица указала именно на те барьеры в бизнесе, которые я чувствовала интуитивно, но не могла сформулировать. Теперь у меня есть четкий план действий.",
        rating: 5
    },
    {
        name: "Марк С.",
        role: "Дизайнер",
        text: "Отчет помог мне понять, почему я быстро выгораю. Оказалось, я использовал не те энергии для работы. Перестроив свой график по рекомендациям, я стал гораздо продуктивнее.",
        rating: 5
    },
    {
        name: "Анна В.",
        role: "Психолог",
        text: "Использую матрицу как дополнительный инструмент в терапии. Система Matrix Destiny дает глубочайший анализ, который экономит месяцы работы. Рекомендую всем, кто ищет ответы.",
        rating: 5
    }
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-40 px-6 bg-indigo-600/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6">Отзывы</h2>
            <p className="text-slate-500 text-lg font-serif italic">Что говорят те, кто уже раскрыл свой код</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-[#121826]/60 border border-white/5 rounded-[48px] relative group hover:border-indigo-500/30 transition-all"
                >
                    <Quote className="absolute top-8 right-8 text-white/5 w-16 h-16 group-hover:text-indigo-500/10 transition-colors" />
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(r.rating)].map((_, j) => (
                            <Star key={j} size={14} fill="#facc15" className="text-amber-400" />
                        ))}
                    </div>

                    <p className="text-slate-300 leading-relaxed font-serif text-lg italic mb-8 relative z-10">
                        «{r.text}»
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black italic">
                            {r.name[0]}
                        </div>
                        <div>
                            <p className="text-white font-black uppercase text-[10px] tracking-widest">{r.name}</p>
                            <p className="text-slate-600 text-[9px] uppercase font-bold">{r.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
