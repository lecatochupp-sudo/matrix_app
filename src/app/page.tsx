import { CalculatorForm } from "@/components/CalculatorForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Матрица Судьбы</h1>
        <p className="text-lg text-slate-600">Узнайте свое предназначение и раскройте потенциал по дате рождения</p>
      </div>
      
      <CalculatorForm />

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
            <h4 className="font-semibold mb-2">Введите данные</h4>
            <p className="text-sm text-slate-500">Только дата рождения и пол для точного расчета</p>
        </div>
        <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
            <h4 className="font-semibold mb-2">Получите расчет</h4>
            <p className="text-sm text-slate-500">Мгновенная генерация вашей персональной матрицы</p>
        </div>
        <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
            <h4 className="font-semibold mb-2">Узнайте судьбу</h4>
            <p className="text-sm text-slate-500">Глубокий анализ всех сфер жизни и будущего</p>
        </div>
      </section>
    </main>
  );
}
