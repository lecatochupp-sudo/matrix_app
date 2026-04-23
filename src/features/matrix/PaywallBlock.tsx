"use client";

import { LockIcon } from "lucide-react";

interface PaywallBlockProps {
  title: string;
  isLocked: boolean;
  children: React.ReactNode;
  onUnlock?: () => void;
}

export function PaywallBlock({ title, isLocked, children, onUnlock }: PaywallBlockProps) {
  return (
    <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-white mb-6">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {isLocked && <LockIcon className="h-4 w-4 text-slate-400" />}
      </div>
      
      <div className={`p-6 ${isLocked ? 'blur-md select-none pointer-events-none' : ''}`}>
        {children}
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-[2px]">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 text-center max-w-xs">
            <p className="text-sm text-slate-600 mb-4">Этот раздел доступен только в расшифровке</p>
            <button 
              onClick={onUnlock}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Открыть доступ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
