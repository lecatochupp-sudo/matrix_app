"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from "@/components/Header";
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const handleReturn = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('paid', 'true');
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-8 pt-48 text-center">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-12"
        >
            <CheckCircle2 size={80} className="text-indigo-500" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black italic text-white mb-8 tracking-tighter uppercase">Оплата прошла</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-serif italic mb-16 leading-relaxed">
            Ваша матрица успешно разблокирована. Мы также отправили полную версию отчета на вашу почту. Погрузитесь в тайны вашей судьбы прямо сейчас.
        </p>

        <div className="relative group inline-block">
            <div className="absolute inset-0 bg-indigo-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <button 
                onClick={handleReturn}
                className="relative px-16 py-8 bg-white text-indigo-950 font-black uppercase text-sm tracking-[0.4em] rounded-[32px] hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl"
            >
                <Sparkles size={24} /> Вернуться к результатам <ArrowRight size={24} />
            </button>
        </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
