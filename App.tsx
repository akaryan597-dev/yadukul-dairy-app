
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/login/LoginPage';
import OwnerPanel from './pages/owner/OwnerPanel';
import StaffPanel from './pages/staff/StaffPanel';
import CustomerPanel from './pages/customer/CustomerPanel';
import { Role } from './types';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-gray-900 font-sans">
          <AppContent />
        </div>
      </DataProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case Role.OWNER:
      return <OwnerPanel />;
    case Role.STAFF:
      return <StaffPanel />;
    case Role.CUSTOMER:
      return <CustomerPanel />;
    default:
      return <LoginPage />;
  }
};

export default App;
