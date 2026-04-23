import MatrixCirclePro from "@/components/ui/MatrixCirclePro";

export default function WhatIsMatrixPremium() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center py-24 px-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          ЧТО ТАКОЕ <br />
          <span className="text-purple-400">МАТРИЦА?</span>
        </h2>

        <p className="text-lg opacity-70 mb-10 max-w-lg">
          Это глубокая система самопознания, которая объединяет древнюю мудрость чисел
          и современный психоанализ.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "ЛИЧНОСТЬ", desc: "Ваш врождённый потенциал" },
            { title: "РЕАЛИЗАЦИЯ", desc: "Точки роста и успеха" },
            { title: "ОТНОШЕНИЯ", desc: "Сценарии взаимодействия" },
            { title: "КАРМА", desc: "Уроки и задачи души" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#111118] p-5 rounded-xl border border-white/5 hover:border-purple-500/30 transition"
            >
              <div className="text-sm font-semibold mb-2">
                {item.title}
              </div>
              <div className="text-xs opacity-60">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <MatrixCirclePro />
          <div className="absolute inset-0 blur-3xl bg-purple-500/10 rounded-full"></div>
        </div>

        <div className="mt-6 bg-[#0f0f18] px-6 py-4 rounded-xl border border-purple-500/20 text-center">
          <div className="text-xs tracking-widest text-purple-400 mb-1">
            VERIFIED PROTOCOL
          </div>
          <div className="text-sm opacity-70">
            Анализ 22 ключевых энергий вашего воплощения
          </div>
        </div>
      </div>
    </section>
  );
}