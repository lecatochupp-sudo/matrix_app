"use client";

import { useSearchParams, useRouter, redirect } from "next/navigation";
import { Suspense } from "react";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { Header } from "@/components/Header";
import { ResultHero } from "@/components/ResultHero";
import { DiagramCard } from "@/components/DiagramCard";
import { KeyMetrics } from "@/components/KeyMetrics";
import { TechnicalSection } from "@/components/TechnicalSection";
import { SectionBlock } from "@/features/matrix/SectionBlock";
import { getArcanaContent } from "@/lib/contentProvider";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, AlertCircle, Zap, DollarSign, Heart, Star, Download, Bookmark, User, Loader2 } from "lucide-react";

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

  let data: any = getEmptyData();
  let calculationError = false;

  try {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) throw new Error("Invalid date format");
    const { day, month, year } = parseBirthDate(date);
    data = calculateFullMatrix(day, month, year);
  } catch (err) {
    console.error("Calculation Error:", err);
    calculationError = true;
  }

  const age = date ? (new Date().getFullYear() - parseInt(date.split('.').pop() || "2000")) : 0;
  const baseParams = searchParams.toString();

  const personalityContent = getArcanaContent(data.diagonal.left);
  const moneyContent = getArcanaContent(data.money.main);
  const loveContent = getArcanaContent(data.love.main);
  const destinyContent = getArcanaContent(data.destiny.social);

  const metrics = [
    { label: "Энергия", value: data.diagonal.center, colorClass: "text-indigo-400" },
    { label: "Карма", value: data.diagonal.bottom, colorClass: "text-rose-400" },
    { label: "Род", value: data.ancestral.topRight, colorClass: "text-amber-400" }
  ];

  const handleUnlock = () => {
    router.push(`/paywall?${baseParams}`);
  };

  const handleMockAction = (action: string) => {
    alert(`${action} будет доступно в полной версии. Сейчас вы перейдете к оплате.`);
    handleUnlock();
  };

  return (
    <main className="max-w-7xl mx-auto px-8 pt-16">
        {calculationError && (
          <div className="mb-12 p-8 bg-rose-500/10 border border-rose-500/20 rounded-[40px] flex items-center gap-6 text-rose-400">
            <AlertCircle className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-black uppercase tracking-widest">Ошибка расчета</p>
              <p className="text-xs opacity-70">Проверьте корректность введенной даты рождения.</p>
            </div>
          </div>
        )}

        <ResultHero name={name} date={date} age={age} gender={gender} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-32 mb-40">
          <div className="xl:col-span-7">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-20"
            >
                <DiagramCard data={data} />
            </motion.div>
            
            <KeyMetrics metrics={metrics} />
          </div>

          <div className="xl:col-span-5 space-y-12">
            <SectionBlock title="Личные Качества" isLocked={false}>
              <p>{personalityContent?.personality}</p>
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Код Личности</p>
                  <p className="text-2xl font-black italic text-indigo-400">{data.diagonal.left}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => handleMockAction('Save')} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-500">
                        <Bookmark size={20} />
                    </button>
                    <button onClick={() => handleMockAction('Account')} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-500">
                        <User size={20} />
                    </button>
                </div>
              </div>
            </SectionBlock>

            <SectionBlock title="Ваша Миссия" isLocked={false}>
              <p>{personalityContent?.mission}</p>
              <div className="mt-8 p-8 bg-indigo-500/5 rounded-[32px] border border-indigo-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 flex items-center gap-2">
                        <Zap size={12} /> Теневое проявление
                    </p>
                    <p className="text-sm italic opacity-70 font-serif leading-relaxed">{personalityContent?.shadow}</p>
                </div>
              </div>
            </SectionBlock>

            <div className="p-10 bg-white/5 border border-white/5 rounded-[48px] flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all" onClick={() => handleMockAction('PDF')}>
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
                        <Download size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white uppercase italic">Скачать PDF отчет</p>
                        <p className="text-xs text-slate-500">Полная версия (52 страницы)</p>
                    </div>
                </div>
                <ArrowRight size={20} className="text-slate-700 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-40">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-1.5 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500">Premium Content</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">Тайны Судьбы</h2>
            <p className="text-slate-500 mt-4 font-serif italic text-lg italic">Расшифровка всех сфер вашей жизни</p>
          </div>

          <div className="space-y-12">
            <SectionBlock 
                title="Финансы и Реализация" 
                isLocked={!paid} 
                onUnlock={handleUnlock}
                previewText="Узнайте, где скрыт ваш денежный максимум и какие действия блокируют приток изобилия..."
                teaser={personalityContent?.teaser}
            >
                <div className="flex items-center gap-6 mb-10 p-6 bg-indigo-500/5 rounded-[32px] border border-indigo-500/10">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Денежная энергия</p>
                        <p className="text-2xl font-black italic text-white">{data.money.main}</p>
                    </div>
                </div>
                <p>{moneyContent?.money}</p>
            </SectionBlock>

            <SectionBlock 
                title="Любовь и Отношения" 
                isLocked={!paid}
                onUnlock={handleUnlock}
                previewText="Какой партнер станет для вас идеальным и как проработать кармические узлы в паре..."
                teaser="🔒 Ваш сценарий любви и точки входа в гармоничные отношения..."
            >
                <div className="flex items-center gap-6 mb-10 p-6 bg-rose-500/5 rounded-[32px] border border-rose-500/10">
                    <div className="p-4 bg-rose-500/10 rounded-2xl text-rose-400">
                        <Heart size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Энергия отношений</p>
                        <p className="text-2xl font-black italic text-white">{data.love.main}</p>
                    </div>
                </div>
                <p>{loveContent?.love}</p>
            </SectionBlock>

            <SectionBlock 
                title="Предназначение" 
                isLocked={!paid}
                onUnlock={handleUnlock}
                previewText="Ваша социальная и духовная роль в этом воплощении. То, что вы должны дать миру..."
                teaser="🔒 Глубокий смысл вашей жизни и вектор реализации на 10 лет..."
            >
                <div className="flex items-center gap-6 mb-10 p-6 bg-amber-500/5 rounded-[32px] border border-amber-500/10">
                    <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Социальная роль</p>
                        <p className="text-2xl font-black italic text-white">{data.destiny.social}</p>
                    </div>
                </div>
                <p>{destinyContent?.personality}</p>
            </SectionBlock>
          </div>
        </div>

        {!paid && (
          <div className="mt-40 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-800 p-20 rounded-[64px] shadow-2xl shadow-indigo-500/20 relative overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-250 -mt-250 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full -ml-150 -mb-150 blur-[80px]" />
              
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mb-12"
                >
                    <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                        <Sparkles className="w-16 h-16 text-white" />
                    </div>
                </motion.div>

                <h3 className="text-5xl md:text-7xl font-black text-white italic mb-8 tracking-tighter leading-none uppercase">РАСКРОЙТЕ СВОЮ СУДЬБУ ПОЛНОСТЬЮ</h3>
                <p className="text-indigo-100 text-xl mb-16 max-w-3xl leading-relaxed font-serif italic">
                    Получите доступ к 50+ страницам персонального анализа. Разберите блоки в деньгах, сценарии в отношениях и ваше истинное предназначение. Это самое полное руководство по вашей жизни.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                    <button 
                        onClick={handleUnlock}
                        className="group relative px-16 py-8 bg-white text-indigo-950 font-black uppercase text-xs tracking-[0.4em] rounded-[32px] hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl"
                    >
                        Разблокировать всё <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="flex flex-col justify-center text-left px-4">
                        <p className="text-white font-black text-xl italic tracking-tighter">2 490 ₽</p>
                        <p className="text-indigo-200 text-[9px] font-black uppercase tracking-widest opacity-60">Единоразовый доступ</p>
                    </div>
                </div>
            </div>
          </div>
        )}

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
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      }>
        <ResultContent />
      </Suspense>
    </div>
  );
}
