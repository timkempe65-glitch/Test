import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { tenants, properties } from '../data/mockData';

const statusStyles = {
  paid: 'bg-emerald-50 text-emerald-600',
  overdue: 'bg-red-50 text-red-500',
  pending: 'bg-amber-50 text-amber-600',
};

export default function Tenants({ onNavigate }) {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Tenants</h1>
      <p className="text-sm text-gray-400 mb-6">{tenants.length} tenants across {properties.length} properties</p>

      <div className="glass-card p-0 overflow-hidden">
        {tenants.map((tenant, i) => {
          const property = properties.find(p => p.id === tenant.propertyId);
          return (
            <motion.button
              key={tenant.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('tenantDetail', { tenantId: tenant.id, tenantName: tenant.name })}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 ${
                i < tenants.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-sm font-semibold text-brand-600 flex-shrink-0">
                {tenant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900">{tenant.name}</p>
                <p className="text-xs text-gray-400">
                  {property?.address}, Apt {tenant.apartment}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${statusStyles[tenant.paymentStatus]}`}>
                  {tenant.paymentStatus}
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </PageWrapper>
  );
}
