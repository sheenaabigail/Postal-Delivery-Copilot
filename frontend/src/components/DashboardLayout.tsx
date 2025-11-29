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
  ChevronDown
} from 'lucide-react';
import type { User } from '../App';
import { DashboardPage } from './DashboardPage';
import { MailInboxPage } from './MailInboxPage';
import { AnalyticsPage } from './AnalyticsPage';
import { SettingsPage } from './SettingsPage';

type DashboardLayoutProps = {
  user: User;
  onLogout: () => void;
};

type Page = 'dashboard' | 'inbox' | 'analytics' | 'settings' | 'help';

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const translations = {
    en: {
      dashboard: 'Dashboard',
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

  const menuItems = [
    { id: 'dashboard' as Page, label: t.dashboard, icon: LayoutDashboard },
    { id: 'inbox' as Page, label: t.mailInbox, icon: Inbox },
    { id: 'analytics' as Page, label: t.analytics, icon: BarChart3 },
    { id: 'settings' as Page, label: t.settings, icon: Settings },
    { id: 'help' as Page, label: t.help, icon: HelpCircle }
  ];

  // Filter menu based on role
  const filteredMenu = user.role === 'operator' 
    ? menuItems.filter(item => ['dashboard', 'inbox', 'help'].includes(item.id))
    : menuItems;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage user={user} language={language} />;
      case 'inbox':
        return <MailInboxPage user={user} language={language} />;
      case 'analytics':
        return <AnalyticsPage user={user} language={language} />;
      case 'settings':
        return <SettingsPage user={user} language={language} />;
      default:
        return <DashboardPage user={user} language={language} />;
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
