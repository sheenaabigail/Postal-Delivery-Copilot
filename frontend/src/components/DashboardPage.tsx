import { Package, Clock, TrendingUp, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import type { User } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type DashboardPageProps = {
  user: User;
  language: 'en' | 'hi';
};

export function DashboardPage({ user, language }: DashboardPageProps) {
  const translations = {
    en: {
      overview: 'Dashboard Overview',
      itemsInQueue: 'Items in Queue',
      autoRoutedToday: 'Auto-Routed Today',
      avgProcessingTime: 'Avg. Processing Time',
      needsReview: 'Needs Review',
      processingTrend: 'Processing Trend - Last 7 Days',
      errorTypes: 'Common Error Types',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      minutes: 'minutes',
      seconds: 'seconds'
    },
    hi: {
      overview: 'डैशबोर्ड अवलोकन',
      itemsInQueue: 'कतार में आइटम',
      autoRoutedToday: 'आज ऑटो-रूटेड',
      avgProcessingTime: 'औसत प्रसंस्करण समय',
      needsReview: 'समीक्षा की आवश्यकता',
      processingTrend: 'प्रसंस्करण प्रवृत्ति - पिछले 7 दिन',
      errorTypes: 'सामान्य त्रुटि प्रकार',
      recentActivity: 'हाल की गतिविधि',
      viewAll: 'सभी देखें',
      minutes: 'मिनट',
      seconds: 'सेकंड'
    }
  };

  const t = translations[language];

  // Mock data
  const stats = {
    inQueue: 247,
    autoRouted: 1854,
    avgTime: 45,
    needsReview: 32
  };

  const trendData = [
    { day: 'Mon', processed: 1200, autoRouted: 980 },
    { day: 'Tue', processed: 1450, autoRouted: 1190 },
    { day: 'Wed', processed: 1680, autoRouted: 1380 },
    { day: 'Thu', processed: 1920, autoRouted: 1580 },
    { day: 'Fri', processed: 2100, autoRouted: 1750 },
    { day: 'Sat', processed: 1890, autoRouted: 1620 },
    { day: 'Sun', processed: 1654, autoRouted: 1420 }
  ];

  const errorData = [
    { type: 'Wrong PIN', count: 45 },
    { type: 'Missing Locality', count: 38 },
    { type: 'Illegible Text', count: 28 },
    { type: 'PIN-City Mismatch', count: 22 },
    { type: 'Incomplete Address', count: 18 }
  ];

  const recentActivity = [
    { id: 'MAIL-1001', action: 'Auto-routed', time: '2 mins ago', status: 'success' },
    { id: 'MAIL-1002', action: 'Corrected & approved', time: '5 mins ago', status: 'corrected' },
    { id: 'MAIL-1003', action: 'Flagged for review', time: '8 mins ago', status: 'pending' },
    { id: 'MAIL-1004', action: 'Auto-routed', time: '12 mins ago', status: 'success' },
    { id: 'MAIL-1005', action: 'Escalated', time: '15 mins ago', status: 'escalated' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.overview}</h2>
        <p className="text-gray-600">Real-time insights and performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">{t.itemsInQueue}</span>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.inQueue}</p>
          <div className="flex items-center gap-1 text-blue-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Active processing</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">{t.autoRoutedToday}</span>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.autoRouted}</p>
          <div className="text-green-600 text-sm">
            {Math.round((stats.autoRouted / (stats.autoRouted + stats.needsReview)) * 100)}% auto-approval rate
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">{t.avgProcessingTime}</span>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.avgTime}s</p>
          <div className="text-purple-600 text-sm">
            23% faster than yesterday
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">{t.needsReview}</span>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.needsReview}</p>
          <div className="text-yellow-600 text-sm">
            Pending staff review
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Processing Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.processingTrend}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="processed" 
                stroke="#ea580c" 
                strokeWidth={2}
                name="Total Processed"
              />
              <Line 
                type="monotone" 
                dataKey="autoRouted" 
                stroke="#16a34a" 
                strokeWidth={2}
                name="Auto-Routed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Error Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.errorTypes}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={errorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" stroke="#9ca3af" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">{t.recentActivity}</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm">
            {t.viewAll}
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'corrected' ? 'bg-blue-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div>
                  <p className="text-gray-900">{activity.id}</p>
                  <p className="text-gray-600 text-sm">{activity.action}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
