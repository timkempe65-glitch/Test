import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Check, ScanLine, FileCheck } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { invoiceScanResult } from '../../data/mockData';

export default function InvoiceScan({ onClose, showToast }) {
  const [step, setStep] = useState('scan'); // scan, analyzing, result, confirm

  useEffect(() => {
    if (step === 'analyzing') {
      const timer = setTimeout(() => setStep('result'), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleConfirm = () => {
    setStep('confirm');
    setTimeout(() => {
      showToast('Invoice saved successfully');
      onClose();
    }, 1000);
  };

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
        className="w-full max-w-[430px] bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Scan Invoice</h2>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {step === 'scan' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-full h-52 bg-gray-100 rounded-2xl flex flex-col items-center justify-center mb-5 border-2 border-dashed border-gray-200">
                <Camera size={36} className="text-gray-300 mb-3" />
                <p className="text-sm text-gray-400">Take a photo or upload an invoice</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('analyzing')}
                  className="ios-btn-primary flex items-center justify-center gap-2"
                >
                  <Camera size={16} />
                  Take photo
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('analyzing')}
                  className="ios-btn-secondary flex items-center justify-center gap-2"
                >
                  <ScanLine size={16} />
                  Upload file
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LoadingSpinner text="Analyzing invoice with AI..." />
              <div className="space-y-2 mt-4">
                {['Detecting text...', 'Extracting amounts...', 'Categorizing...'].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.7 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.7 + 0.5 }}
                    >
                      <Check size={14} className="text-emerald-400" />
                    </motion.div>
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <FileCheck size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Invoice detected</p>
                  <p className="text-xs text-gray-400">{invoiceScanResult.confidence}% confidence</p>
                </div>
              </div>

              <div className="glass-card bg-gray-50 mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Provider</span>
                    <span className="text-sm font-medium text-gray-900">{invoiceScanResult.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Category</span>
                    <span className="text-sm font-medium text-brand-500">{invoiceScanResult.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Period</span>
                    <span className="text-sm font-medium text-gray-900">{invoiceScanResult.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Property</span>
                    <span className="text-sm font-medium text-gray-900">{invoiceScanResult.property}</span>
                  </div>
                  <hr className="border-gray-200" />
                  {invoiceScanResult.details.map((d, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-xs text-gray-500">{d.label}</span>
                      <span className="text-sm text-gray-700">€{d.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">€{invoiceScanResult.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mb-4">Does this look correct?</p>
              <div className="grid grid-cols-2 gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="ios-btn-secondary">
                  Edit manually
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm} className="ios-btn-primary flex items-center justify-center gap-2">
                  <Check size={16} />
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check size={28} className="text-emerald-500" />
              </motion.div>
              <p className="text-lg font-semibold text-gray-900">Saved!</p>
              <p className="text-sm text-gray-400">Invoice has been added to your records</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
