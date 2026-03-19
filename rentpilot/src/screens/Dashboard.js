import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Bell, ScanLine, ChevronRight, CheckCircle2, AlertTriangle, Gauge, Sparkles } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { properties, recentActivity, notifications } from '../data/mockData';

const totalIncome = properties.reduce((sum, p) => sum + p.monthlyIncome, 0);

const activityIcons = {
  check: <CheckCircle2 size={16} className="text-emerald-500" />,
  alert: <AlertTriangle size={16} className="text-amber-500" />,
  meter: <Gauge size={16} className="text-brand-500" />,
  ai: <Sparkles size={16} className="text-violet-500" />,
};

export default function Dashboard({ onNavigate, onModal }) {
  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-400 font-medium">Good morning</p>
          <h1 className="text-2xl font-bold text-gray-900">RentPilot</h1>
        </div>
        <div className="relative">
          <Bell size={22} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Income & Expenses Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.div whileTap={{ scale: 0.97 }} className="glass-card">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp size={15} className="text-emerald-500" />
            </div>
            <span className="text-xs text-gray-400 font-medium">Income</span>
          </div>
          <p className="text-xl font-bold text-gray-900">€{totalIncome.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-500 font-medium mt-0.5">+3.2% vs last month</p>
        </motion.div>

        <motion.div whileTap={{ scale: 0.97 }} className="glass-card">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <TrendingDown size={15} className="text-red-400" />
            </div>
            <span className="text-xs text-gray-400 font-medium">Expenses</span>
          </div>
          <p className="text-xl font-bold text-gray-900">€1,284</p>
          <p className="text-[11px] text-red-400 font-medium mt-0.5">+8.1% vs last month</p>
        </motion.div>
      </div>

      {/* Notifications */}
      <div className="glass-card mb-4 p-3">
        {notifications.map((n, i) => (
          <div key={n.id} className={`flex items-center gap-3 py-2.5 ${i < notifications.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              n.type === 'error' ? 'bg-red-400' : n.type === 'warning' ? 'bg-amber-400' : 'bg-brand-400'
            }`} />
            <p className="text-[13px] text-gray-600 flex-1">{n.text}</p>
            <ChevronRight size={14} className="text-gray-300" />
          </div>
        ))}
      </div>

      {/* Scan Invoice Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onModal('invoice')}
        className="w-full glass-card flex items-center gap-3.5 mb-5 active:bg-gray-50"
      >
        <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center">
          <ScanLine size={20} className="text-brand-500" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-gray-900">Scan new invoice</p>
          <p className="text-xs text-gray-400">AI-powered document recognition</p>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </motion.button>

      {/* Recent Activity */}
      <p className="section-title">Recent Activity</p>
      <div className="glass-card p-0 overflow-hidden">
        {recentActivity.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 px-4 py-3.5 ${i < recentActivity.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
              {activityIcons[item.icon]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-gray-700 truncate">{item.text}</p>
              <p className="text-[11px] text-gray-400">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
