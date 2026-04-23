"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from "@/components/Header";
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Star, ArrowRight, Loader2 } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "990 ₽",
    description: "Базовый разбор ключевых энергий",
    features: ["Личные качества", "Предназначение", "Теневые стороны"],
    icon: Zap,
    color: "text-slate-400",
    bg: "bg-slate-500/5"
  },
  {
    name: "Premium",
    price: "2 490 ₽",
    description: "Полная карта вашей судьбы",
    features: ["Всё из Basic", "Денежный канал", "Любовный сценарий", "Карта здоровья"],
    icon: Star,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    recommended: true
  },
  {
    name: "VIP",
    price: "4 990 ₽",
    description: "Максимальный анализ + прогноз",
    features: ["Всё из Premium", "Прогноз на 10 лет", "Родовые программы", "PDF-отчет (50 стр)"],
    icon: ShieldCheck,
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  }
];

function PaywallContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const baseParams = searchParams.toString();

  const handleSelect = (plan: string) => {
    const params = new URLSearchParams(baseParams);
    params.set('plan', plan);
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-8 pt-24">
        <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black italic text-white mb-6 tracking-tighter uppercase">Выберите ваш путь</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-serif italic">Откройте полную расшифровку вашей матрицы и получите ключи к управлению своей судьбой.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-10 rounded-[48px] border ${plan.recommended ? 'border-indigo-500/30 bg-[#121826]/60' : 'border-white/5 bg-[#121826]/30'} flex flex-col`}
                >
                    {plan.recommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20">
                            Recommended
                        </div>
                    )}

                    <div className={`w-14 h-14 rounded-2xl ${plan.bg} flex items-center justify-center mb-8`}>
                        <plan.icon className={plan.color} size={28} />
                    </div>

                    <h3 className="text-3xl font-black text-white italic mb-2 uppercase">{plan.name}</h3>
                    <p className="text-slate-500 text-sm mb-8 font-serif italic">{plan.description}</p>
                    
                    <div className="text-5xl font-black text-white mb-10 tracking-tighter">{plan.price}</div>

                    <div className="space-y-4 mb-12 flex-grow">
                        {plan.features.map((f, j) => (
                            <div key={j} className="flex items-start gap-3">
                                <Check size={16} className="text-indigo-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-slate-400">{f}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => handleSelect(plan.name)}
                        className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${plan.recommended ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        Выбрать <ArrowRight size={16} />
                    </button>
                </motion.div>
            ))}
        </div>

        <div className="mt-20 text-center">
            <button 
                onClick={() => router.back()}
                className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors"
            >
                Вернуться к бесплатному анализу
            </button>
        </div>
    </main>
  );
}

export default function PaywallPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-20">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      }>
        <PaywallContent />
      </Suspense>
    </div>
  );
}
