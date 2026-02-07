import { useState } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  MapPin,
  ChevronDown,
  Camera
} from 'lucide-react';
import type { User, MailItem, ActivityLog } from '../App';
import { DashboardPage } from './DashboardPage';
import { MailInboxPage } from './MailInboxPage';
import { AnalyticsPage } from './AnalyticsPage';
import { SettingsPage } from './SettingsPage';
import { ScannerPage } from './ScannerPage';

type DashboardLayoutProps = {
  user: User;
  onLogout: () => void;
};

type Page = 'dashboard' | 'scanner' | 'inbox' | 'analytics' | 'settings' | 'help';

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mailItems, setMailItems] = useState<MailItem[]>(() => {
    // Generate demo mail items with multiple operators
    const demoOperators = [
      { id: 'op-1', name: 'Rajesh Kumar', center: 'Delhi Central' },
      { id: 'op-2', name: 'Priya Sharma', center: 'Delhi Central' },
      { id: 'op-3', name: 'Amit Patel', center: 'Mumbai Central' },
      { id: 'op-4', name: 'Sanjay Verma', center: 'Delhi Central' }
    ];

    const demoItems: MailItem[] = [];
    const cities = [
      { city: 'Mumbai', state: 'Maharashtra', pincode: '400001', hub: 'DH-400', nodal: 'NC-40' },
      { city: 'Delhi', state: 'Delhi', pincode: '110001', hub: 'DH-110', nodal: 'NC-11' },
      { city: 'Bangalore', state: 'Karnataka', pincode: '560001', hub: 'DH-560', nodal: 'NC-56' },
      { city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', hub: 'DH-600', nodal: 'NC-60' },
      { city: 'Kolkata', state: 'West Bengal', pincode: '700001', hub: 'DH-700', nodal: 'NC-70' },
      { city: 'Hyderabad', state: 'Telangana', pincode: '500001', hub: 'DH-500', nodal: 'NC-50' },
      { city: 'Jaipur', state: 'Rajasthan', pincode: '302001', hub: 'DH-302', nodal: 'NC-30' }
    ];

    // Generate 20-30 demo mail items
    for (let i = 0; i < 25; i++) {
      const operator = demoOperators[Math.floor(Math.random() * demoOperators.length)];
      const location = cities[Math.floor(Math.random() * cities.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
      const processingTime = Math.floor(Math.random() * 30) + 30; // 30-60 seconds

      const mailId = `MAIL-${1000 + i}`;
      
      const initialActivityLog: ActivityLog = {
        id: `ACT-${mailId}-1`,
        timestamp,
        action: 'upload',
        userId: operator.id,
        userName: operator.name,
        userRole: 'operator',
        details: `Image uploaded and OCR processing initiated`,
        reasonCode: undefined,
        fieldChanges: undefined,
      };

      demoItems.push({
        id: mailId,
        timestamp,
        scannedImage: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f5f5f5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EEnvelope Image ${i + 1}%3C/text%3E%3C/svg%3E`,
        ocrText: `Sample Address ${i + 1}\n${location.city}, ${location.state}\n${location.pincode}`,
        parsedFields: {
          name: `Recipient ${i + 1}`,
          houseNo: `${Math.floor(Math.random() * 999) + 1}`,
          street: `Sample Street ${i + 1}`,
          locality: `${location.city} Locality`,
          city: location.city,
          state: location.state,
          pincode: location.pincode,
        },
        originalPincode: location.pincode,
        aiSuggestion: {
          correctedPincode: location.pincode,
          deliveryHub: location.hub,
          nodalCenter: location.nodal,
          confidence,
          flags: confidence < 85 ? ['Low confidence', 'Manual review suggested'] : [],
          reasoning: confidence > 85 
            ? 'High confidence match. All fields validated successfully.'
            : 'Address fields extracted but manual verification recommended.',
        },
        status: confidence > 85 ? 'routed' : 'pending',
        confidence,
        qrCode: `QR-${mailId}`,
        history: [{
          id: `HIST-${mailId}`,
          timestamp,
          action: 'Created',
          user: operator.name,
          changes: 'Mail item created and processed',
        }],
        activityLog: [initialActivityLog],
        needsReview: confidence < 85,
        uploadedBy: operator.id,
        uploadedByName: operator.name,
        uploadedByRole: 'operator',
        center: operator.center,
        processingTime,
      });
    }

    return demoItems;
  });

  const translations = {
    en: {
      dashboard: 'Dashboard',
      scanner: 'Scanner',
      mailInbox: 'Mail Inbox',
      analytics: 'Analytics',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout',
      welcome: 'Welcome back',
      role: {
        admin: 'Administrator',
        operator: 'Sorter/Operator',
        supervisor: 'Supervisor'
      }
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      scanner: 'स्कैनर',
      mailInbox: 'मेल इनबॉक्स',
      analytics: 'विश्लेषण',
      settings: 'सेटिंग्स',
      help: 'सहायता',
      logout: 'लॉग आउट',
      welcome: 'वापसी पर स्वागत है',
      role: {
        admin: 'व्यवस्थापक',
        operator: 'छँटाईकर्ता/संचालक',
        supervisor: 'पर्यवेक्षक'
      }
    }
  };

  const t = translations[language];

  const handleMailCreated = (newMail: MailItem) => {
    setMailItems(prev => [newMail, ...prev]);
    setCurrentPage('inbox'); // Navigate to inbox after creating mail
  };

  const menuItems = [
    { id: 'dashboard' as Page, label: t.dashboard, icon: LayoutDashboard },
    { id: 'scanner' as Page, label: t.scanner, icon: Camera },
    { id: 'inbox' as Page, label: t.mailInbox, icon: Inbox },
    { id: 'analytics' as Page, label: t.analytics, icon: BarChart3 },
    { id: 'settings' as Page, label: t.settings, icon: Settings },
    { id: 'help' as Page, label: t.help, icon: HelpCircle }
  ];

  // Filter menu based on role
  const filteredMenu = user.role === 'operator' 
    ? menuItems.filter(item => ['dashboard', 'scanner', 'inbox', 'help'].includes(item.id))
    : menuItems;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage user={user} language={language} mailItems={mailItems} />;
      case 'scanner':
        return <ScannerPage user={user} language={language} onMailCreated={handleMailCreated} />;
      case 'inbox':
        return <MailInboxPage user={user} language={language} mailItems={mailItems} setMailItems={setMailItems} />;
      case 'analytics':
        return <AnalyticsPage user={user} language={language} mailItems={mailItems} />;
      case 'settings':
        return <SettingsPage user={user} language={language} />;
      default:
        return <DashboardPage user={user} language={language} mailItems={mailItems} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-orange-600">DeliveryPilot</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <UserIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{user.name}</p>
                  <p className="text-gray-600 text-sm">{t.role[user.role]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{user.center}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-gray-900">{t.welcome}, {user.name}</h3>
                <p className="text-gray-600 text-sm">{user.center}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}