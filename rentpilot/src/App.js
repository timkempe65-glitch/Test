import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import Dashboard from './screens/Dashboard';
import Properties from './screens/Properties';
import PropertyDetail from './screens/PropertyDetail';
import Tenants from './screens/Tenants';
import TenantDetail from './screens/TenantDetail';
import AiAssistant from './screens/AiAssistant';
import InvoiceScan from './screens/modals/InvoiceScan';
import MeterReading from './screens/modals/MeterReading';
import StatementPreview from './screens/modals/StatementPreview';
import SendMessage from './screens/modals/SendMessage';
import Toast from './components/Toast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [screen, setScreen] = useState({ type: 'tab' });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = (screenType, params = {}) => {
    setScreen({ type: screenType, ...params });
  };

  const goBack = () => {
    setScreen({ type: 'tab' });
  };

  const renderScreen = () => {
    switch (screen.type) {
      case 'propertyDetail':
        return <PropertyDetail propertyId={screen.propertyId} onBack={goBack} onNavigate={navigate} onModal={setModal} showToast={showToast} />;
      case 'tenantDetail':
        return <TenantDetail tenantId={screen.tenantId} onBack={goBack} onModal={setModal} showToast={showToast} />;
      default:
        switch (activeTab) {
          case 'dashboard':
            return <Dashboard onNavigate={navigate} onModal={setModal} />;
          case 'properties':
            return <Properties onNavigate={navigate} />;
          case 'tenants':
            return <Tenants onNavigate={navigate} />;
          case 'ai':
            return <AiAssistant />;
          default:
            return <Dashboard onNavigate={navigate} onModal={setModal} />;
        }
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-surface relative overflow-hidden">
      <div className="pb-24 min-h-screen">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>

      {screen.type === 'tab' && (
        <BottomNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setScreen({ type: 'tab' }); }} />
      )}

      <AnimatePresence>
        {modal === 'invoice' && <InvoiceScan onClose={() => setModal(null)} showToast={showToast} />}
        {modal === 'meter' && <MeterReading onClose={() => setModal(null)} showToast={showToast} />}
        {modal === 'statement' && <StatementPreview onClose={() => setModal(null)} showToast={showToast} />}
        {modal === 'message' && <SendMessage onClose={() => setModal(null)} showToast={showToast} tenantName={screen.tenantName} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
