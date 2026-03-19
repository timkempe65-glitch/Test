import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Check, Droplets, Flame } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function MeterReading({ onClose, showToast }) {
  const [step, setStep] = useState('input'); // input, scanning, result
  const [type, setType] = useState('water');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setValue(type === 'water' ? '35.8' : '4720');
        setStep('result');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, type]);

  const handleSave = () => {
    showToast('Meter reading saved');
    onClose();
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
        className="w-full max-w-[430px] bg-white rounded-t-3xl"
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Meter Reading</h2>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {step === 'scanning' ? (
            <LoadingSpinner text="Scanning meter with AI..." />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Type Selector */}
              <p className="text-sm font-medium text-gray-500 mb-2">Meter type</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => { setType('water'); setValue(''); }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all ${
                    type === 'water' ? 'border-blue-400 bg-blue-50' : 'border-gray-100 bg-white'
                  }`}
                >
                  <Droplets size={18} className={type === 'water' ? 'text-blue-500' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${type === 'water' ? 'text-blue-600' : 'text-gray-500'}`}>Water</span>
                </button>
                <button
                  onClick={() => { setType('heating'); setValue(''); }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all ${
                    type === 'heating' ? 'border-orange-400 bg-orange-50' : 'border-gray-100 bg-white'
                  }`}
                >
                  <Flame size={18} className={type === 'heating' ? 'text-orange-500' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${type === 'heating' ? 'text-orange-600' : 'text-gray-500'}`}>Heating</span>
                </button>
              </div>

              {/* Value Input */}
              <p className="text-sm font-medium text-gray-500 mb-2">Reading value</p>
              <div className="relative mb-4">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={type === 'water' ? '0.0' : '0'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-lg font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {type === 'water' ? 'm³' : 'kWh'}
                </span>
              </div>

              {step === 'result' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 rounded-xl p-3 mb-4 flex items-center gap-2"
                >
                  <Check size={16} className="text-emerald-500" />
                  <p className="text-sm text-emerald-700">AI detected value: <strong>{value} {type === 'water' ? 'm³' : 'kWh'}</strong></p>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('scanning')}
                  className="ios-btn-secondary flex items-center justify-center gap-2"
                >
                  <Camera size={16} />
                  Scan meter
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  disabled={!value}
                  className="ios-btn-primary flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <Check size={16} />
                  Save
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
