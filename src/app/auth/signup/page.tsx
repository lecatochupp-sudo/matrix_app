"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { signUpAction } from "@/app/actions/auth";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function clientAction(formData: FormData) {
    setLoading(true);
    setError("");
    
    const result = await signUpAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/auth/signin");
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#121826] border border-white/5 p-10 rounded-[40px] shadow-2xl">
        <div className="text-center mb-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">Регистрация</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Начните свой путь самопознания</p>
        </div>

        <form action={clientAction} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Имя</label>
            <input 
              name="name"
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="Александр"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <input 
              name="email"
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Пароль</label>
            <input 
              name="password"
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50"
          >
            {loading ? "Создание..." : "Создать аккаунт"}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Уже есть аккаунт? <Link href="/auth/signin" className="text-indigo-400 hover:text-indigo-300">Войти</Link>
        </p>
      </div>
    </div>
  );
}
