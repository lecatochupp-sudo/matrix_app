import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { FullMatrixChart } from "@/features/matrix/FullMatrixChart";
import { SectionBlock } from "@/features/matrix/SectionBlock";
import { Header } from "@/components/Header";
import Link from "next/link";
import { ArrowRight, Download, ShieldCheck, User, CreditCard } from "lucide-react";

export default async function ResultPage({ searchParams }: { searchParams: any }) {
  const { name, date, gender, paid } = searchParams;
  if (!date) redirect("/");

  const { day, month, year } = parseBirthDate(date);
  const data = calculateFullMatrix(day, month, year);
  const age = new Date().getFullYear() - year;
  const isPaid = paid === "true";

  const getInterpretation = async (code: string) => {
    const block = await prisma.contentBlock.findFirst({ where: { code } });
    return block?.content;
  };

  const personality = await getInterpretation(`arcana_${data.diagonal.left}_description`);
  const baseParams = new URLSearchParams({ name: name || "Аноним", date, gender, paid: "true" }).toString();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans selection:bg-indigo-500/30">
      <Header />
      
      {/* Premium Top Navigation */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/cabinet" className="flex items-center gap-2 hover:text-white transition-colors"><User className="w-3 h-3" /> Мои расчеты</Link>
            <button className="flex items-center gap-2 hover:text-white transition-colors opacity-50 cursor-not-allowed"><Download className="w-3 h-3" /> Сохранить PDF</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-black text-slate-500 uppercase">Analysis Stable</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-40">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center mb-32">
            <h1 className="text-8xl md:text-[140px] font-black italic tracking-tighter text-white mb-8 bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-none select-none">
                {name || "Аноним"}
            </h1>
            <div className="flex items-center gap-12 text-xs font-black uppercase tracking-[0.6em] text-slate-500 border-y border-white/5 py-6 px-12">
                <span>{date}</span>
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                <span>{age} Years</span>
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                <span>{gender === 'male' ? 'Yang' : 'Yin'}</span>
            </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 items-start">
            
            {/* LEFT: THE DIAGRAM (CENTERPIECE) */}
            <div className="xl:col-span-7 sticky top-32">
                <div className="relative group p-12 bg-slate-900/10 border border-white/5 rounded-[60px] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
                    <FullMatrixChart data={data} />
                </div>

                <div className="mt-12 grid grid-cols-3 gap-6">
                    <div className="bg-[#121826] p-8 rounded-[32px] border border-white/5 text-center">
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Сила Души</p>
                        <p className="text-4xl font-black text-indigo-400">{data.diagonal.center}</p>
                    </div>
                    <div className="bg-[#121826] p-8 rounded-[32px] border border-white/5 text-center">
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Карма</p>
                        <p className="text-4xl font-black text-rose-400">{data.diagonal.bottom}</p>
                    </div>
                    <div className="bg-[#121826] p-8 rounded-[32px] border border-white/5 text-center">
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Социум</p>
                        <p className="text-4xl font-black text-amber-400">{data.destiny.social}</p>
                    </div>
                </div>
            </div>

            {/* RIGHT: THE CONTENT STREAM */}
            <div className="xl:col-span-5 space-y-8">
                <SectionBlock title="Портрет Личности" isLocked={false}>
                    <p>{personality || "Ваша энергия олицетворяет глубокую трансформацию..."}</p>
                </SectionBlock>

                <SectionBlock title="Линия Денег" isLocked={!isPaid} previewText="Узнайте точки входа в ваш финансовый эгрегор и блокировки дохода...">
                    <div className="space-y-4">
                        <p className="font-bold text-amber-400 text-sm tracking-widest uppercase">Ваша финансовая триада: {data.money.entrance} — {data.money.main} — {data.money.result}</p>
                        <p>Для активации денежного потока вам необходимо...</p>
                    </div>
                </SectionBlock>

                <SectionBlock title="Линия Любви" isLocked={!isPaid} previewText="Раскройте код идеального партнера и кармические задачи ваших отношений...">
                    <div className="space-y-4">
                        <p className="font-bold text-rose-400 text-sm tracking-widest uppercase">Триада отношений: {data.love.entrance} — {data.love.main} — {data.love.result}</p>
                        <p>Ваш союз будет максимально гармоничным, если...</p>
                    </div>
                </SectionBlock>

                <SectionBlock title="Кармические задачи" isLocked={!isPaid}>
                    <p>Прошлые воплощения оставили след в виде {data.diagonal.bottom} аркана...</p>
                </SectionBlock>

                <SectionBlock title="Предназначение" isLocked={!isPaid}>
                    <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-[10px] text-slate-500 uppercase mb-1">Небо</p><p className="text-2xl font-black">{data.destiny.heaven}</p></div>
                        <div><p className="text-[10px] text-slate-500 uppercase mb-1">Земля</p><p className="text-2xl font-black">{data.destiny.earth}</p></div>
                    </div>
                </SectionBlock>

                {/* THE BIG UPGRADE CARD */}
                {!isPaid && (
                    <div className="p-1 border border-white/5 rounded-[42px] mt-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                        <div className="bg-[#0b0f1a] rounded-[40px] p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
                            <h3 className="text-3xl font-black italic text-white mb-4">Полная Книга Судьбы</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">45 страниц глубокого анализа вашей жизни</p>
                            
                            <ul className="space-y-4 mb-12">
                                {["Прогноз на 10 лет по месяцам", "Кармические узлы и задачи", "Детско-родительские программы", "PDF-отчет для печати"].map((li, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                        <ShieldCheck className="w-4 h-4 text-indigo-500" /> {li}
                                    </li>
                                ))}
                            </ul>

                            <Link href={`/result?${baseParams}`} className="group flex items-center justify-between w-full py-6 px-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all shadow-2xl shadow-indigo-600/30">
                                <span className="text-xs font-black uppercase tracking-[0.3em]">Открыть доступ за 990₽</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Technical Footer Section */}
        <footer className="mt-60 pt-20 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
            <details className="group">
                <summary className="list-none cursor-pointer flex flex-col items-center gap-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">System Diagnostic Panel</p>
                    <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
                </summary>
                <div className="mt-12 p-10 bg-black rounded-[40px] font-mono text-[10px] text-slate-500 leading-relaxed overflow-x-auto">
                    <pre>{JSON.stringify({ 
                        version: "Matrix-Pro-Commercial_2.4",
                        checksum: "0xAF23E1",
                        data: data 
                    }, null, 4)}</pre>
                </div>
            </details>
        </footer>

      </main>
    </div>
  );
}
