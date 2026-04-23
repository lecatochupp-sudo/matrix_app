"use client";

import { useSearchParams, useRouter, redirect } from "next/navigation";
import { Suspense, useMemo } from "react";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { Header } from "@/components/Header";
import { ResultHero } from "@/components/ResultHero";
import { DiagramCard } from "@/components/DiagramCard";
import { KeyMetrics } from "@/components/KeyMetrics";
import { TechnicalSection } from "@/components/TechnicalSection";
import { SectionBlock } from "@/features/matrix/SectionBlock";
import { getArcanaContent, REPORT_SECTIONS } from "@/lib/contentProvider";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, AlertCircle, Loader2, Star, CheckCircle2 } from "lucide-react";

const getEmptyData = () => ({
  diagonal: { left: 0, top: 0, right: 0, bottom: 0, center: 0 },
  money: { entrance: 0, main: 0, result: 0 },
  love: { entrance: 0, main: 0, result: 0 },
  ancestral: { topRight: 0, bottomRight: 0, bottomLeft: 0, topLeft: 0 },
  destiny: { heaven: 0, earth: 0, social: 0 },
  health: { chakra1:0, chakra2:0, chakra3:0, chakra4:0, chakra5:0, chakra6:0, chakra7:0 }
});

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('name') || "Аноним";
  const date = searchParams.get('date');
  const gender = searchParams.get('gender') || "female";
  const paid = searchParams.get('paid') === "true";

  if (!date) return redirect("/");

  const { data, calculationError } = useMemo(() => {
    try {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) throw new Error("Invalid date format");
      const { day, month, year } = parseBirthDate(date);
      return { data: calculateFullMatrix(day, month, year), calculationError: false };
    } catch (err) {
      console.error("Calculation Error:", err);
      return { data: getEmptyData(), calculationError: true };
    }
  }, [date]);

  const baseParams = searchParams.toString();
  const metrics = [
    { label: "Энергия", value: data.diagonal.center, colorClass: "text-indigo-400" },
    { label: "Карма", value: data.diagonal.bottom, colorClass: "text-rose-400" },
    { label: "Род", value: data.ancestral.topRight, colorClass: "text-amber-400" }
  ];

  const handleUnlock = () => router.push(`/paywall?${baseParams}`);

  return (
    <main className="max-w-7xl mx-auto px-6 pt-16 pb-40 relative">
        <ResultHero name={name} date={date} age={0} gender={gender} data={data} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 mb-32">
          {/* Visual Sticky Sidebar (Diagram) */}
          <div className="xl:col-span-6">
            <div className="sticky top-32">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-16"
                >
                    <DiagramCard data={data} />
                </motion.div>
                <KeyMetrics metrics={metrics} />
                
                {!paid && (
                    <div className="mt-12 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[40px] text-center">
                        <p className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4">Статус анализа: 12%</p>
                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mb-6">
                            <div className="w-[12%] h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        </div>
                        <p className="text-xs text-slate-500 italic mb-8">Разблокируйте полный отчет, чтобы получить доступ к остальным 88% вашего персонального разбора.</p>
                        <button onClick={handleUnlock} className="w-full py-5 bg-white text-indigo-950 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                            Открыть полный доступ <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>
          </div>

          {/* Infinite Report List */}
          <div className="xl:col-span-6 space-y-4">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-grow bg-white/5" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Personal Report</span>
                <div className="h-px flex-grow bg-white/5" />
            </div>

            {REPORT_SECTIONS.map((section, idx) => {
                const arcana = idx % 2 === 0 ? data.diagonal.left : data.diagonal.center; // Demo logic
                const content = getArcanaContent(arcana);
                const isLocked = !paid && !section.isFree;

                return (
                    <SectionBlock 
                        key={section.id}
                        title={section.title}
                        isLocked={isLocked}
                        onUnlock={handleUnlock}
                        teaser={content.teaser}
                    >
                        <div className="space-y-6">
                            <p className="text-indigo-400 font-bold text-xl italic">{content.title}</p>
                            <p>{content.personality}</p>
                            {section.id === 'money' && <p>{content.money}</p>}
                            {section.id === 'love' && <p>{content.love}</p>}
                            <div className="flex items-center gap-2 mt-8 text-[10px] font-black uppercase text-slate-700 tracking-widest">
                                <CheckCircle2 size={12} className="text-indigo-500" /> Сектор проанализирован
                            </div>
                        </div>
                    </SectionBlock>
                );
            })}

            {/* Bottom Final CTA */}
            {!paid && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[56px] text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <Star className="w-12 h-12 text-white mx-auto mb-8 animate-spin-slow" />
                    <h3 className="text-4xl font-black text-white italic mb-6 leading-tight uppercase">Ваш отчет готов<br/>на 100%</h3>
                    <p className="text-indigo-100 mb-12 max-w-md mx-auto opacity-80">Получите 50+ страниц глубокого анализа вашей судьбы в одном PDF файле.</p>
                    <button onClick={handleUnlock} className="px-12 py-6 bg-white text-indigo-950 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
                        Разблокировать всё
                    </button>
                </motion.div>
            )}
          </div>
        </div>

        <TechnicalSection data={{ params: { name, date, gender, paid }, data }} />
    </main>
  );
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-40 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10" />
      </div>

      <Header />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 text-indigo-500 animate-spin" /></div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
