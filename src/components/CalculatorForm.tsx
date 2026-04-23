"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const calculatorSchema = z.object({
  name: z.string().optional().default("Аноним"),
  birthDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, "Формат ДД.ММ.ГГГГ"),
  gender: z.enum(["male", "female"]),
  type: z.enum(["matrix", "forecast_10"]),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

export function CalculatorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      type: "matrix",
      gender: "female",
    }
  });

  const selectedType = watch("type");

  async function onSubmit(data: CalculatorValues) {
    setLoading(true);
    // Имитация задержки и переход на страницу результата
    const params = new URLSearchParams({
        name: data.name || "Аноним",
        date: data.birthDate,
        gender: data.gender,
        type: data.type
    });
    router.push(`/result?${params.toString()}`);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => setValue("type", "matrix")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${selectedType === 'matrix' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Матрица судьбы
        </button>
        <button
          onClick={() => setValue("type", "forecast_10")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${selectedType === 'forecast_10' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Прогноз на 10 лет
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Имя</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              {...register("name")}
              placeholder="Аноним"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Дата рождения *</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              {...register("birthDate")}
              placeholder="ДД.ММ.ГГГГ"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          {errors.birthDate && <p className="mt-1 text-xs text-red-500">{errors.birthDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Пол *</label>
          <select
            {...register("gender")}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 disabled:opacity-70"
        >
          {loading ? "Рассчитываем..." : "Рассчитать"}
        </button>
      </form>
    </div>
  );
}
