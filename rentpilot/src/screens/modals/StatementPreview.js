import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Mail, Check } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { statementPreview } from '../../data/mockData';

export default function StatementPreview({ onClose, showToast }) {
  const [step, setStep] = useState('generating'); // generating, preview

  useEffect(() => {
    const timer = setTimeout(() => setStep('preview'), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-end justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="w-full max-w-[430px] bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-white z-10">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Utility Statement</h2>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {step === 'generating' ? (
            <div>
              <LoadingSpinner text="Generating statement with AI..." />
              <div className="space-y-2 mt-4">
                {['Calculating costs per tenant...', 'Applying distribution keys...', 'Generating PDF preview...'].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.8 + 0.6 }}>
                      <Check size={14} className="text-emerald-400" />
                    </motion.div>
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* PDF Preview */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-5">
                {/* Document header */}
                <div className="text-center border-b border-gray-100 pb-4 mb-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Document Preview</p>
                  <h3 className="text-base font-bold text-gray-900">{statementPreview.title}</h3>
                  <p className="text-xs text-gray-500">{statementPreview.property}</p>
                  <p className="text-xs text-gray-400">Period: {statementPreview.period}</p>
                </div>

                {/* Cost Summary */}
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Cost Overview</p>
                <div className="space-y-2 mb-4">
                  {statementPreview.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5">
                      <div>
                        <p className="text-xs font-medium text-gray-700">{item.category}</p>
                        <p className="text-[10px] text-gray-400">Distributed {item.perUnit}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">€{item.total.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-900">Total</p>
                    <p className="text-base font-bold text-gray-900">€{statementPreview.totalCosts.toFixed(2)}</p>
                  </div>
                </div>

                {/* Tenant Breakdown */}
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Per Tenant</p>
                <div className="space-y-2">
                  {statementPreview.tenantBreakdowns.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-xs font-medium text-gray-700">{t.name} <span className="text-gray-400">({t.apt})</span></p>
                        <p className="text-[10px] text-gray-400">Prepaid: €{t.prepaid} · Actual: €{t.actual.toFixed(2)}</p>
                      </div>
                      <span className={`text-xs font-bold ${t.balance >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {t.balance >= 0 ? '+' : ''}€{t.balance.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { showToast('PDF downloaded'); onClose(); }}
                  className="ios-btn-secondary flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download PDF
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { showToast('Sent to all tenants'); onClose(); }}
                  className="ios-btn-primary flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Send to tenants
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
