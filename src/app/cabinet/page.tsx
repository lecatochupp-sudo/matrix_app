import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Calendar, History, CreditCard, ChevronRight, FileText, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default async function CabinetPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { 
        orders: { include: { tariff: true }, orderBy: { createdAt: 'desc' } },
        calculations: { orderBy: { createdAt: 'desc' } }
    }
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300">
      <Header />
      
      <main className="max-w-6xl mx-auto px-8 py-20">
        <header className="mb-16">
            <h1 className="text-4xl font-black italic text-white mb-2 uppercase tracking-tighter">Святилище</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Ваши персональные откровения и история</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Статистика / Инфо */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#121826] border border-white/5 p-8 rounded-[32px]">
                    <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6">
                        <UserIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <p className="text-xl font-black text-white mb-1">{user?.name || "Искатель"}</p>
                    <p className="text-xs text-slate-500 font-bold mb-6">{user?.email}</p>
                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[10px] font-black uppercase text-slate-600 mb-2">Активный тариф</p>
                        <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Premium Access</p>
                    </div>
                </div>

                <div className="bg-indigo-600 p-8 rounded-[32px] text-white">
                    <h3 className="text-lg font-black mb-2 italic uppercase">Книга Судьбы</h3>
                    <p className="text-indigo-100 text-xs mb-6">Ваш персональный PDF отчет готов к скачиванию.</p>
                    <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" /> Скачать PDF
                    </button>
                </div>
            </div>

            {/* История расчетов */}
            <div className="lg:col-span-8 space-y-10">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <History className="w-5 h-5 text-slate-500" />
                        <h2 className="text-xl font-black text-white uppercase italic tracking-widest">История путей</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {user?.calculations.map((calc, i) => (
                            <Link 
                                key={i} 
                                href={`/result?name=${calc.name}&date=${calc.birthDate.toLocaleDateString('ru-RU')}&gender=${calc.gender}&paid=true`}
                                className="block group bg-[#121826] border border-white/5 p-6 rounded-[24px] hover:border-indigo-500/30 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-white italic group-hover:scale-110 transition-transform">
                                            {calc.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-black uppercase tracking-widest">{calc.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{calc.birthDate.toLocaleDateString('ru-RU')} • {calc.gender}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                        {user?.calculations.length === 0 && (
                            <div className="p-12 text-center bg-[#121826]/30 border border-dashed border-white/5 rounded-[32px]">
                                <p className="text-slate-600 uppercase text-[10px] font-black tracking-widest">История пуста</p>
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <CreditCard className="w-5 h-5 text-slate-500" />
                        <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Транзакции</h2>
                    </div>
                    <div className="bg-[#121826] rounded-[24px] border border-white/5 overflow-hidden">
                        <table className="w-full text-left text-xs uppercase tracking-widest font-black">
                            <thead className="bg-white/5 text-slate-500">
                                <tr>
                                    <th className="px-8 py-5">Дата</th>
                                    <th className="px-8 py-5">Продукт</th>
                                    <th className="px-8 py-5 text-right">Сумма</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {user?.orders.map((order, i) => (
                                    <tr key={i} className="text-slate-400 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-5">{order.createdAt.toLocaleDateString()}</td>
                                        <td className="px-8 py-5">Full Revelation</td>
                                        <td className="px-8 py-5 text-right text-indigo-400">{order.amount}₽</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </div>
  );
}
