import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';

export type UserRole = 'admin' | 'operator' | 'supervisor';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  center: string;
};

export type MailItem = {
  id: string;
  timestamp: string;
  scannedImage: string;
  ocrText: string;
  parsedFields: {
    name: string;
    houseNo: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  originalPincode: string;
  aiSuggestion: {
    correctedPincode: string;
    deliveryHub: string;
    nodalCenter: string;
    confidence: number;
    flags: string[];
    reasoning: string;
  };
  status: 'pending' | 'approved' | 'escalated' | 'routed' | 'ambiguous';
  confidence: number;
  qrCode: string;
  history: HistoryEntry[];
  needsReview: boolean;
  processingTime?: number;
};

export type HistoryEntry = {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  changes: string;
  reasonCode?: string;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'dashboard' && user) {
    return <DashboardLayout user={user} onLogout={handleLogout} />;
  }

  return null;
}
