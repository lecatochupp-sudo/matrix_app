import React from 'react';

interface TechnicalSectionProps {
  data: any;
}

export function TechnicalSection({ data }: TechnicalSectionProps) {
  return (
    <footer className="mt-40 pt-20 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
      <details className="group">
        <summary className="list-none cursor-pointer text-center text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">
          Technical Details & Debug
        </summary>
        <div className="mt-10 p-8 bg-black/40 rounded-[32px] border border-white/5 font-mono text-[9px] text-slate-600 overflow-x-auto">
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
      </details>
    </footer>
  );
}
