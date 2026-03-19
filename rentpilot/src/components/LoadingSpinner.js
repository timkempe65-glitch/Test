import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        className="w-10 h-10 border-3 border-brand-200 border-t-brand-500 rounded-full"
        style={{ borderWidth: 3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p className="text-sm text-gray-400 font-medium">{text}</p>
    </div>
  );
}
