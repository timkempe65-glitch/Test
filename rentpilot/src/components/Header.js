import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function Header({ title, onBack, right }) {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-lg z-40 border-b border-gray-100">
      <div className="flex items-center justify-between h-14 px-4">
        {onBack ? (
          <button onClick={onBack} className="flex items-center gap-0.5 text-brand-500 -ml-1">
            <ChevronLeft size={22} />
            <span className="text-sm font-medium">Back</span>
          </button>
        ) : (
          <div className="w-16" />
        )}
        <h1 className="text-[15px] font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">{title}</h1>
        {right || <div className="w-16" />}
      </div>
    </div>
  );
}
