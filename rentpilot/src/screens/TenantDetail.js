import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, CreditCard, Gauge, MessageSquare, ScanLine } from 'lucide-react';
import Header from '../components/Header';
import { tenants, properties } from '../data/mockData';

const paymentStatusStyle = {
  paid: 'text-emerald-500',
  late: 'text-amber-500',
  overdue: 'text-red-500',
};

export default function TenantDetail({ tenantId, onBack, onModal, showToast }) {
  const tenant = tenants.find(t => t.id === tenantId);
  if (!tenant) return null;

  const property = properties.find(p => p.id === tenant.propertyId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Header title="Tenant" onBack={onBack} />

      <div className="px-5 pt-16 pb-8">
        {/* Profile Card */}
        <div className="glass-card flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-lg font-bold text-brand-600">
            {tenant.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{tenant.name}</p>
            <p className="text-sm text-gray-400">{property?.address}, Apt {tenant.apartment}</p>
            <p className="text-sm font-semibold text-brand-500">€{tenant.rent}/month</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={15} className="text-gray-400" />
            <span className="text-sm text-gray-600">{tenant.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={15} className="text-gray-400" />
            <span className="text-sm text-gray-600">{tenant.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={15} className="text-gray-400" />
            <span className="text-sm text-gray-600">Move-in: {new Date(tenant.moveIn).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onModal('message')}
            className="ios-btn-primary flex items-center justify-center gap-2"
          >
            <MessageSquare size={15} />
            Send message
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onModal('meter')}
            className="ios-btn-secondary flex items-center justify-center gap-2"
          >
            <ScanLine size={15} />
            Meter reading
          </motion.button>
        </div>

        {/* Payments */}
        <p className="section-title">Recent Payments</p>
        <div className="glass-card p-0 overflow-hidden mb-5">
          {tenant.payments.map((payment, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${
              i < tenant.payments.length - 1 ? 'border-b border-gray-50' : ''
            }`}>
              <div className="flex items-center gap-3">
                <CreditCard size={15} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">€{payment.amount}</p>
                  <p className="text-xs text-gray-400">{new Date(payment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold capitalize ${paymentStatusStyle[payment.status]}`}>
                {payment.status}
              </span>
            </div>
          ))}
        </div>

        {/* Meter Readings */}
        <p className="section-title">Meter Readings</p>
        <div className="glass-card p-0 overflow-hidden">
          {tenant.meterReadings.map((reading, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${
              i < tenant.meterReadings.length - 1 ? 'border-b border-gray-50' : ''
            }`}>
              <div className="flex items-center gap-3">
                <Gauge size={15} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 capitalize">{reading.type}</p>
                  <p className="text-xs text-gray-400">{new Date(reading.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {reading.value} {reading.type === 'water' ? 'm³' : 'kWh'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
