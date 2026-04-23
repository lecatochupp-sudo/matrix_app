"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Headphones, BookOpen } from "lucide-react";

const features = [
    { title: "Точность алгоритмов", icon: Cpu, desc: "Мы используем верифицированные формулы классической школы Матрицы Судьбы." },
    { title: "Глубина анализа", icon: BookOpen, desc: "Более 3600 уникальных текстовых атомов для составления вашего портрета." },
    { title: "Конфиденциальность", icon: ShieldCheck, desc: "Ваши данные зашифрованы и никогда не передаются третьим лицам." },
    { title: "Поддержка 24/7", icon: Headphones, desc: "Наша команда всегда готова помочь вам в интерпретации результатов." }
];

export function WhyUsSection() {
  return (
    <section className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Почему выбирают нас</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {features.map((f, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex gap-8 items-start"
                >
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-indigo-500">
                        <f.icon size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic mb-3">{f.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">{f.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
