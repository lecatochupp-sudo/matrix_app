"use client";

import { motion } from "framer-motion";
import { DollarSign, Heart, Zap, Shield, Target, Activity } from "lucide-react";

const benefits = [
    { title: "Деньги и Карьера", icon: DollarSign, color: "text-amber-400", desc: "Узнайте свои точки финансового роста и сферы максимальной прибыли." },
    { title: "Любовь и Близость", icon: Heart, color: "text-rose-400", desc: "Идеальный партнер, причины одиночества и секреты гармонии в паре." },
    { title: "Точка Вашей Силы", icon: Zap, color: "text-indigo-400", desc: "Где вы берете энергию и как перестать сливать её впустую." },
    { title: "Предназначение", icon: Target, color: "text-emerald-400", desc: "Ваша высшая роль и социальный путь на текущем этапе жизни." },
    { title: "Карма и Задачи", icon: Shield, color: "text-orange-400", desc: "Ошибки прошлого, которые влияют на настоящее, и способы их решения." },
    { title: "Карта Здоровья", icon: Activity, color: "text-blue-400", desc: "Взаимосвязь эмоций и физического состояния через карту чакр." }
];

export function BenefitsSection() {
  return (
    <section id="what-you-learn" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6">Ваш отчет содержит</h2>
            <p className="text-slate-500 text-lg font-serif italic">Детальный разбор каждой сферы вашей жизни на основе 22 энергий</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {benefits.map((b, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-[#121826]/40 border border-white/5 rounded-[48px] hover:border-white/10 transition-all group"
                >
                    <div className={`p-5 rounded-3xl bg-white/5 border border-white/5 w-fit mb-8 group-hover:scale-110 transition-transform ${b.color}`}>
                        <b.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-white italic mb-4 uppercase">{b.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-serif text-lg italic opacity-80">{b.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
