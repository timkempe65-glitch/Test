import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

const templates = [
  { label: 'Payment reminder', text: 'Dear tenant, this is a friendly reminder that your rent payment is due. Please transfer the amount at your earliest convenience. Thank you!' },
  { label: 'Meter reading request', text: 'Dear tenant, please submit your current meter readings (water and heating) by the end of this month. You can use the RentPilot app to scan your meters. Thank you!' },
  { label: 'Maintenance notice', text: 'Dear tenant, please be informed that maintenance work is scheduled for next week. We will notify you of the exact date and time. Thank you for your understanding.' },
];

export default function SendMessage({ onClose, showToast, tenantName }) {
  const [message, setMessage] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleTemplate = (template) => {
    setGenerating(true);
    setTimeout(() => {
      setMessage(template.text);
      setGenerating(false);
    }, 1200);
  };

  const handleSend = () => {
    showToast(`Message sent to ${tenantName || 'tenant'}`);
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
            <h2 className="text-lg font-bold text-gray-900">Send Message</h2>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {tenantName && (
            <p className="text-sm text-gray-400 mb-4">To: <span className="font-medium text-gray-600">{tenantName}</span></p>
          )}

          {/* AI Templates */}
          <p className="text-xs font-medium text-gray-400 mb-2">AI-generated templates</p>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {templates.map((t, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplate(t)}
                className="flex items-center gap-1.5 px-3 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
              >
                <Sparkles size={12} />
                {t.label}
              </motion.button>
            ))}
          </div>

          {/* Message Input */}
          <div className="relative mb-4">
            {generating ? (
              <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center">
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-gray-400"
                >
                  AI is writing...
                </motion.p>
              </div>
            ) : (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or use an AI template..."
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 resize-none transition-all"
              />
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-full ios-btn-primary flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Send size={16} />
            Send message
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
