"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Неверный email или пароль");
    } else {
      router.push("/cabinet");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#121826] border border-white/5 p-10 rounded-[40px] shadow-2xl">
        <div className="text-center mb-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">Вход в систему</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Ваши откровения ждут вас</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

          <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20">
            Войти
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Нет аккаунта? <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300">Создать путь</Link>
        </p>
      </div>
    </div>
  );
}
