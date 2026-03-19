import React from 'react';
import { motion } from 'framer-motion';
import { Users, Droplets, Flame, FileText, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { properties, tenants } from '../data/mockData';

export default function PropertyDetail({ propertyId, onBack, onNavigate, onModal }) {
  const property = properties.find(p => p.id === propertyId);
  const propertyTenants = tenants.filter(t => t.propertyId === propertyId);

  if (!property) return null;

  const waterChange = ((property.utilities.water.current - property.utilities.water.previous) / property.utilities.water.previous * 100).toFixed(1);
  const heatingChange = ((property.utilities.heating.current - property.utilities.heating.previous) / property.utilities.heating.previous * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Header title={property.address} onBack={onBack} />

      <div className="px-5 pt-16 pb-8">
        {/* Property Info Card */}
        <div className="glass-card mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-lg font-bold text-gray-900">{property.address}</p>
              <p className="text-sm text-gray-400">{property.zip} {property.city}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-500">€{property.monthlyIncome.toLocaleString()}</p>
              <p className="text-xs text-gray-400">per month</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={14} />
            <span>{propertyTenants.length} tenants · {property.units} units</span>
          </div>
        </div>

        {/* Utility Usage */}
        <p className="section-title mt-5">Utility Usage (Current Year)</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Droplets size={16} className="text-blue-500" />
              </div>
              <span className="text-xs font-medium text-gray-500">Water</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{property.utilities.water.current} {property.utilities.water.unit}</p>
            <p className={`text-xs font-medium mt-0.5 ${Number(waterChange) > 0 ? 'text-red-400' : 'text-emerald-500'}`}>
              {waterChange > 0 ? '+' : ''}{waterChange}% vs last year
            </p>
          </div>
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Flame size={16} className="text-orange-500" />
              </div>
              <span className="text-xs font-medium text-gray-500">Heating</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{property.utilities.heating.current.toLocaleString()} {property.utilities.heating.unit}</p>
            <p className={`text-xs font-medium mt-0.5 ${Number(heatingChange) > 0 ? 'text-red-400' : 'text-emerald-500'}`}>
              {heatingChange > 0 ? '+' : ''}{heatingChange}% vs last year
            </p>
          </div>
        </div>

        {/* Create Statement Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onModal('statement')}
          className="w-full ios-btn-primary flex items-center justify-center gap-2 mb-5"
        >
          <FileText size={16} />
          Create utility statement
        </motion.button>

        {/* Tenants */}
        <p className="section-title">Tenants</p>
        <div className="glass-card p-0 overflow-hidden">
          {propertyTenants.map((tenant, i) => (
            <motion.button
              key={tenant.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('tenantDetail', { tenantId: tenant.id, tenantName: tenant.name })}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 ${
                i < propertyTenants.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-sm font-semibold text-brand-600">
                {tenant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                <p className="text-xs text-gray-400">Apt {tenant.apartment} · €{tenant.rent}/mo</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                tenant.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                tenant.paymentStatus === 'overdue' ? 'bg-red-50 text-red-500' :
                'bg-amber-50 text-amber-600'
              }`}>
                {tenant.paymentStatus}
              </span>
              <ChevronRight size={16} className="text-gray-300" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
