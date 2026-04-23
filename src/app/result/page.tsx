import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { calculateHealthDetailed } from "@/domain/calculations/healthDetailedProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { FullMatrixChart } from "@/features/matrix/FullMatrixChart";
import { Header } from "@/components/Header";
import Link from "next/link";
import { Sparkles, Lock, ShieldCheck, ArrowRight, Download, History, Zap, Heart, DollarSign, Star, AlertCircle } from "lucide-react";

// --- Safe Default Data ---
const getEmptyData = () => ({
  diagonal: { left: 0, top: 0, right: 0, bottom: 0, center: 0 },
  money: { entrance: 0, main: 0, result: 0 },
  love: { entrance: 0, main: 0, result: 0 },
  ancestral: { topRight: 0, bottomRight: 0, bottomLeft: 0, topLeft: 0 },
  destiny: { heaven: 0, earth: 0, social: 0 },
  health: { chakra1:0, chakra2:0, chakra3:0, chakra4:0, chakra5:0, chakra6:0, chakra7:0 }
});

export default async function ResultPage({ searchParams }: { searchParams: any }) {
  // 1. Safe Params Extraction
  const name = searchParams?.name || "Аноним";
  const date = searchParams?.date;
  const gender = searchParams?.gender || "female";
  const paid = searchParams?.paid === "true";

  if (!date) {
    return redirect("/");
  }

  // 2. Calculation & DB Safety Layer
  let data: any = getEmptyData();
  let healthData: any[] = [];
  let personalityDesc = null;
  let calculationError = false;

  try {
    // Проверка формата даты перед парсингом
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
        throw new Error("Invalid date format");
    }

    const { day, month, year } = parseBirthDate(date);
    data = calculateFullMatrix(day, month, year);
    healthData = calculateHealthDetailed(data);
    
    // Безопасный запрос к БД (не валим всё, если БД лежит)
    try {
        const block = await prisma.contentBlock.findFirst({
            where: { code: `arcana_${data.diagonal.left}_description` }
        });
        personalityDesc = block?.content;
    } catch (dbErr) {
        console.error("Database connection issue:", dbErr);
    }

  } catch (err) {
    console.error("Calculation Error:", err);
    calculationError = true;
  }

  const age = date ? (new Date().getFullYear() - parseInt(date.split('.').pop() || "2000")) : 0;
  const baseParams = new URLSearchParams({ name, date, gender, paid: "true" }).toString();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 pb-40 font-sans selection:bg-indigo-500/30">
      <Header />
      
      {/* Meta Status Bar */}
      <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">
                {calculationError ? "Fallback Mode" : "Verified Protocol"}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 pt-16">
        
        {/* Error Alert if something went wrong */}
        {calculationError && (
            <div className="mb-12 p-6 bg-rose-500/10 border border-rose-500/20 rounded-[32px] flex items-center gap-4 text-rose-400">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest">Ошибка интерпретации</p>
                    <p className="text-xs opacity-70">Некоторые данные не удалось рассчитать. Пожалуйста, проверьте дату рождения.</p>
                </div>
            </div>
        )}

        <header className="mb-24 text-center">
            <h1 className="text-6xl md:text-[100px] font-black italic tracking-tighter text-white mb-8 bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-none">
                {name}
            </h1>
            <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                <span>{date}</span>
                <span>{age} Years</span>
                <span>{gender}</span>
            </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
            {/* Left: Diagram */}
            <div className="xl:col-span-7 space-y-20">
                <div className="relative bg-[#121826] border border-white/5 rounded-[40px] p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />
                    <FullMatrixChart data={data} />
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { l: "Energy", v: data.diagonal.center, c: "text-indigo-400" },
                        { l: "Karma", v: data.diagonal.bottom, c: "text-rose-400" },
                        { l: "Ancestor", v: data.ancestral.topRight, c: "text-amber-400" }
                    ].map((m, i) => (
                        <div key={i} className="bg-[#121826] border border-white/5 p-8 rounded-[32px]">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">{m.l}</p>
                            <p className={`text-4xl font-black ${m.c}`}>{m.v}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Interpretations */}
            <div className="xl:col-span-5 space-y-6">
                <div className="bg-[#121826] border border-white/5 p-10 rounded-[40px]">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6 flex items-center gap-3">
                        <Zap className="w-4 h-4 text-indigo-400" /> Вибрация Личности
                    </h3>
                    <p className="text-slate-400 leading-relaxed italic font-serif text-lg">
                        {personalityDesc || "Ваша энергия указывает на путь глубокого самопознания и трансформации. Полная расшифровка формируется..."}
                    </p>
                </div>

                {/* Locked Block Preview */}
                {!paid && (
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-[40px] shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
                        <h3 className="text-3xl font-black text-white italic mb-6">Полный Отчет</h3>
                        <p className="text-indigo-100 text-sm mb-10 leading-relaxed">Откройте 45 страниц детального анализа вашей судьбы, денег и отношений.</p>
                        <Link href={`/result?${baseParams}`} className="flex items-center justify-between w-full py-5 px-8 bg-white text-indigo-700 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-transform hover:scale-105">
                            Разблокировать <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>

        {/* Debug Crypt - Strictly Hidden */}
        <footer className="mt-40 pt-20 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
            <details className="group">
                <summary className="list-none cursor-pointer text-center text-[9px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Panel</summary>
                <div className="mt-10 p-8 bg-black/40 rounded-[32px] border border-white/5 font-mono text-[9px] text-slate-600 overflow-x-auto">
                    <pre>{JSON.stringify({ status: calculationError ? "fallback" : "ok", params: { name, date, gender, paid }, data }, null, 4)}</pre>
                </div>
            </details>
        </footer>
      </main>
    </div>
  );
}
