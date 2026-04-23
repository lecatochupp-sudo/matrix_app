"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from "@/components/Header";
import { useState } from 'react';
import { Lock, CreditCard, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') || "premium";
  const price = searchParams.get('price') || "2900";
  const [loading, setLoading] = useState(false);

  const planNames: Record<string, string> = {
    basic: "Basic",
    premium: "Premium",
    vip: "VIP"
  };

  const handlePay = () => {
    setLoading(true);
    console.log(`Processing payment for plan: ${planId}, Amount: ${price}`);
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('paid', 'true');
      router.push(`/success?${params.toString()}`);
    }, 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-8 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
                <h1 className="text-4xl font-black italic text-white mb-8 uppercase tracking-tighter">Оформление заказа</h1>
                <div className="bg-[#121826]/60 border border-white/5 p-8 rounded-[40px] mb-8">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Выбранный тариф</p>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-white italic uppercase">{planNames[planId] || "Premium"}</h3>
                        <span className="text-indigo-400 font-black">{parseInt(price).toLocaleString()} ₽</span>
                    </div>
                    <div className="h-px bg-white/5 mb-6" />
                    <ul className="space-y-3 text-sm text-slate-400 font-serif italic">
                        <li>• Полная расшифровка всех арканов</li>
                        <li>• Доступ к денежным стратегиям</li>
                        <li>• Анализ кармических задач</li>
                    </ul>
                </div>

                <div className="flex items-center gap-4 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl text-indigo-400/80">
                    <ShieldCheck size={20} />
                    <p className="text-xs font-medium">Безопасная оплата через защищенный шлюз</p>
                </div>
            </div>

            <div className="bg-[#121826]/40 border border-white/5 p-10 rounded-[48px]">
                <div className="flex items-center gap-4 mb-10">
                    <CreditCard className="text-slate-500" />
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Карта или СБП</h3>
                </div>

                <div className="space-y-6 mb-10">
                    <div>
                        <label className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Email для отчета</label>
                        <input 
                            type="email" 
                            placeholder="your@email.com"
                            className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-indigo-500/50 transition-colors"
                        />
                    </div>
                    <div className="p-6 border border-white/5 rounded-2xl bg-black/20 text-center italic text-sm text-slate-500">
                        Это демонстрационная страница оплаты. Нажмите кнопку ниже для имитации покупки.
                    </div>
                </div>

                <button 
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full py-6 bg-indigo-600 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-[24px] hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Оплатить {parseInt(price).toLocaleString()} ₽ <ArrowRight size={16} /></>}
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
                    <Lock size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
                </div>
            </div>
        </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-20">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
