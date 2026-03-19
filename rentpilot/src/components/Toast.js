import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  info: 'bg-brand-500',
};

export default function Toast({ message, type = 'success' }) {
  const Icon = icons[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className={`${colors[type]} text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 text-sm font-medium`}>
        <Icon size={18} />
        {message}
      </div>
    </motion.div>
  );
}
