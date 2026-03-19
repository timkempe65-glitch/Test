import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, ChevronRight, MapPin } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { properties, tenants } from '../data/mockData';

export default function Properties({ onNavigate }) {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Properties</h1>
      <p className="text-sm text-gray-400 mb-6">{properties.length} properties · {tenants.length} tenants</p>

      <div className="space-y-3">
        {properties.map((property, i) => {
          const propertyTenants = tenants.filter(t => t.propertyId === property.id);
          return (
            <motion.button
              key={property.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('propertyDetail', { propertyId: property.id })}
              className="w-full glass-card flex items-center gap-4 text-left active:bg-gray-50"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-gray-900 truncate">{property.address}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    {property.city}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Users size={11} />
                    {propertyTenants.length} tenants
                  </span>
                </div>
                <p className="text-sm font-semibold text-emerald-500 mt-1">€{property.monthlyIncome.toLocaleString()}/mo</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </PageWrapper>
  );
}
