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
  supervisorId?: string; // For sorters, links them to their supervisor
};

export type ActivityLog = {
  id: string;
  timestamp: string;
  action: 'upload' | 'submit' | 'approve' | 'reject' | 'mark_ambiguous' | 'edit' | 'escalate' | 'qr_regenerate';
  userId: string;
  userName: string;
  userRole: UserRole;
  details: string;
  reasonCode?: string;
  fieldChanges?: Record<string, { old: string; new: string }>;
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
  activityLog: ActivityLog[]; // New comprehensive activity tracking
  needsReview: boolean;
  processingTime?: number;
  uploadedBy: string; // User ID who scanned/uploaded
  uploadedByName: string; // User name
  uploadedByRole: UserRole; // User role
  submittedBy?: string; // User ID who submitted
  submittedByName?: string;
  reviewedBy?: string; // User ID who approved/rejected
  reviewedByName?: string;
  center: string; // Which center this was scanned at
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