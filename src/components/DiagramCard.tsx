import React from 'react';
import { FullMatrixChart } from "@/features/matrix/FullMatrixChart";

interface DiagramCardProps {
  data: any;
}

export function DiagramCard({ data }: DiagramCardProps) {
  return (
    <div className="relative bg-[#121826] border border-white/5 rounded-[40px] p-10 shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />
      <FullMatrixChart data={data} />
    </div>
  );
}
