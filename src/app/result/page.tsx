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
import { buildAllSections } from "@/lib/content/contentSectionBuilder";
import { ReportNavigation } from "@/components/result/ReportNavigation";
import { ForecastTimeline } from "@/components/result/ForecastTimeline";
import { motion } from "framer-motion";
import { ArrowRight, Star, Loader2, CheckCircle2, Lock } from "lucide-react";

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

  const { data, sections, calculationError } = useMemo(() => {
    try {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) throw new Error("Invalid date format");
      const { day, month, year } = parseBirthDate(date);
      const matrixData = calculateFullMatrix(day, month, year);
      const reportSections = buildAllSections(matrixData, paid);
      return { data: matrixData, sections: reportSections, calculationError: false };
    } catch (err) {
      console.error("Calculation Error:", err);
      return { data: getEmptyData(), sections: [], calculationError: true };
    }
  }, [date, paid]);

  const baseParams = searchParams.toString();
  const metrics = [
    { label: "Энергия", value: data.diagonal.center, colorClass: "text-indigo-400" },
    { label: "Карма", value: data.diagonal.bottom, colorClass: "text-rose-400" },
    { label: "Род", value: data.ancestral.topRight, colorClass: "text-amber-400" }
  ];

  const handleUnlock = () => router.push(`/paywall?${baseParams}`);

  // Mock forecast data for timeline
  const forecastItems = [
    { year: 2026, age: 36, energy: data.diagonal.right, description: "Год материальной реализации и расширения влияния. Время, когда внутренние наработки превращаются в конкретные результаты." },
    { year: 2027, age: 37, energy: 7, description: "Период активного движения и достижения целей. Рекомендуется фокус на командной работе и дальних поездках." },
    { year: 2028, age: 38, energy: 10, description: "Год удачи и потоковых состояний. Важно доверять интуиции и не сопротивляться переменам." }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 pt-16 pb-40 relative">
        <ResultHero name={name} date={date} age={0} gender={gender} data={data} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 mb-32">
          {/* Sidebar / Diagram */}
          <div className="xl:col-span-6">
            <div className="sticky top-32">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-16">
                    <DiagramCard data={data} />
                </motion.div>
                <KeyMetrics metrics={metrics} />
                
                {!paid && (
                    <div className="mt-12 p-10 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-500/20 rounded-[48px] text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6">Анализ завершен на 15%</p>
                        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mb-8">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "15%" }}
                                transition={{ duration: 2 }}
                                className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                            />
                        </div>
                        <button onClick={handleUnlock} className="w-full py-6 bg-white text-indigo-950 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all">
                            Разблокировать остальные 85% <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>
          </div>

          {/* Report Sections */}
          <div className="xl:col-span-6 space-y-8">
            <ReportNavigation />

            {sections.map((section) => (
                <div key={section.id} id={`section-${section.id}`}>
                    <SectionBlock 
                        title={section.title}
                        isLocked={section.isLocked}
                        onUnlock={handleUnlock}
                        teaser={section.teaser}
                        previewText={section.previewText}
                    >
                        {section.id === 'forecast' ? (
                            <ForecastTimeline items={forecastItems} />
                        ) : (
                            <div className="space-y-8">
                                <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[32px] mb-8">
                                   <div className="flex items-center gap-4 mb-3">
                                       <span className="text-4xl font-black italic text-indigo-400 tracking-tighter">{section.energy}</span>
                                       <div className="h-px flex-grow bg-indigo-500/10" />
                                       <span className="text-[10px] font-black uppercase text-indigo-500/60 tracking-widest">Код Энергии</span>
                                   </div>
                                   <p className="text-xl font-bold text-white italic mb-1">{section.energyName}</p>
                                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{section.energyTheme}</p>
                                </div>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-serif text-xl italic whitespace-pre-line">
                                    {section.fullText}
                                </div>
                                <div className="flex items-center gap-3 mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <CheckCircle2 size={16} className="text-indigo-500" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Сектор полностью проанализирован</span>
                                </div>
                            </div>
                        )}
                    </SectionBlock>
                </div>
            ))}

            {!paid && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-32 p-16 bg-gradient-to-br from-[#0a0f1d] to-[#121826] border border-white/5 rounded-[64px] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] -mr-48 -mt-48" />
                    <Star className="w-12 h-12 text-indigo-500 mx-auto mb-10 animate-pulse" />
                    <h3 className="text-5xl font-black text-white italic mb-8 uppercase leading-tight tracking-tighter">Ваша книга судьбы<br/>готова</h3>
                    <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto font-serif italic">52 страницы персонального анализа, которые изменят ваше представление о себе.</p>
                    <button onClick={handleUnlock} className="px-16 py-8 bg-white text-indigo-950 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
                        Получить полный доступ
                    </button>
                </motion.div>
            )}
          </div>
        </div>

        <TechnicalSection data={{ params: { name, date, gender, paid }, data, sections }} />
    </main>
  );
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-40 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[150px] rounded-full" />
      </div>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#070b14]"><div className="flex flex-col items-center gap-6"><Loader2 className="w-16 h-16 text-indigo-500 animate-spin" /><p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">Calculating your destiny...</p></div></div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
