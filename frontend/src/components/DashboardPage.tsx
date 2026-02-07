import { Package, Clock, TrendingUp, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import type { User, MailItem } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type DashboardPageProps = {
  user: User;
  language: 'en' | 'hi';
  mailItems: MailItem[];
  onViewMail?: (mailId: string) => void;
};

export function DashboardPage({ user, language, mailItems, onViewMail }: DashboardPageProps) {
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
      operatorPerformance: 'Operator Performance',
      sorterPerformance: 'My Team Performance',
      myScannedItems: 'My Scanned Items',
      viewAll: 'View All',
      minutes: 'minutes',
      seconds: 'seconds',
      operator: 'Operator',
      sorter: 'Sorter',
      scanned: 'Scanned',
      autoRouted: 'Auto-Routed',
      reviewed: 'Reviewed',
      avgTime: 'Avg Time (s)',
      autoRoutePercent: 'Auto-Route %',
      totalScanned: 'Total Scanned'
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
      operatorPerformance: 'ऑपरेटर प्रदर्शन',
      sorterPerformance: 'मेरी टीम का प्रदर्शन',
      myScannedItems: 'मेरे स्कैन किए गए आइटम',
      viewAll: 'सभी देखें',
      minutes: 'मिनट',
      seconds: 'सेकंड',
      operator: 'ऑपरेटर',
      sorter: 'सॉर्टर',
      scanned: 'स्कैन किए गए',
      autoRouted: 'ऑटो-रूटेड',
      reviewed: 'समीक्षा की गई',
      avgTime: 'औसत समय (s)',
      autoRoutePercent: 'ऑटो-रूट %',
      totalScanned: 'कुल स्कैन'
    }
  };

  const t = translations[language];

  // Calculate operator statistics based on role
  const getOperatorStats = () => {
    let itemsToAnalyze: MailItem[] = [];

    if (user.role === 'operator') {
      // Sorters see only their own items
      itemsToAnalyze = mailItems.filter(item => item.uploadedBy === user.id);
    } else if (user.role === 'supervisor') {
      // Supervisors see items from their team (operators in same center)
      itemsToAnalyze = mailItems.filter(
        item => item.uploadedByRole === 'operator' && item.center === user.center
      );
    } else {
      // Admins see all items
      itemsToAnalyze = mailItems;
    }

    const operatorMap: Record<string, {
      name: string;
      scanned: number;
      autoRouted: number;
      reviewed: number;
      avgTime: number;
      totalTime: number;
    }> = {};

    itemsToAnalyze.forEach(item => {
      const operator = item.uploadedByName;
      if (!operatorMap[operator]) {
        operatorMap[operator] = {
          name: operator,
          scanned: 0,
          autoRouted: 0,
          reviewed: 0,
          avgTime: 0,
          totalTime: 0
        };
      }
      operatorMap[operator].scanned++;
      if (item.status === 'routed' && item.confidence > 85) {
        operatorMap[operator].autoRouted++;
      } else {
        operatorMap[operator].reviewed++;
      }
      if (item.processingTime) {
        operatorMap[operator].totalTime += item.processingTime;
      }
    });

    return Object.values(operatorMap).map(stat => ({
      ...stat,
      avgTime: stat.scanned > 0 ? Math.round(stat.totalTime / stat.scanned) : 0
    })).sort((a, b) => b.scanned - a.scanned);
  };

  const operatorStats = getOperatorStats();

  // Calculate stats based on visible items
  const getVisibleItems = () => {
    if (user.role === 'operator') {
      return mailItems.filter(item => item.uploadedBy === user.id);
    } else if (user.role === 'supervisor') {
      return mailItems.filter(
        item => item.uploadedByRole === 'operator' && item.center === user.center
      );
    }
    return mailItems;
  };

  const visibleItems = getVisibleItems();
  const stats = {
    inQueue: visibleItems.filter(item => item.status === 'pending').length,
    autoRouted: visibleItems.filter(item => item.status === 'routed').length,
    avgTime: visibleItems.length > 0 
      ? Math.round(visibleItems.reduce((sum, item) => sum + (item.processingTime || 45), 0) / visibleItems.length)
      : 45,
    needsReview: visibleItems.filter(item => item.needsReview).length
  };

  // Mock data - keep existing charts
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

  const recentActivity = visibleItems.slice(0, 5).map(item => ({
    id: item.id,
    action: item.status === 'routed' ? 'Auto-routed' : 
            item.status === 'approved' ? 'Corrected & approved' :
            item.status === 'escalated' ? 'Escalated' : 'Flagged for review',
    time: new Date(item.timestamp).toLocaleTimeString(),
    status: item.status === 'routed' ? 'success' :
            item.status === 'approved' ? 'corrected' :
            item.status === 'escalated' ? 'escalated' : 'pending',
    uploadedBy: item.uploadedByName
  }));

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
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity to display
            </div>
          ) : (
            recentActivity.map((activity) => (
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
            ))
          )}
        </div>
      </div>

      {/* Operator Performance */}
      {operatorStats.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">
              {user.role === 'admin' ? t.operatorPerformance : 
               user.role === 'supervisor' ? t.sorterPerformance :
               t.myScannedItems}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">
                    {user.role === 'operator' ? 'Item' : (user.role === 'admin' ? t.operator : t.sorter)}
                  </th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.scanned}</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.autoRouted}</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.reviewed}</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.avgTime}</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.autoRoutePercent}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {operatorStats.map((operator, index) => {
                  const autoRoutePercentage = operator.scanned > 0 
                    ? Math.round((operator.autoRouted / operator.scanned) * 100) 
                    : 0;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{operator.name}</td>
                      <td className="px-6 py-4 text-gray-700">{operator.scanned}</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600">{operator.autoRouted}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-600">{operator.reviewed}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{operator.avgTime}s</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                autoRoutePercentage >= 85 ? 'bg-green-500' :
                                autoRoutePercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${autoRoutePercentage}%` }}
                            />
                          </div>
                          <span className="text-gray-700 text-sm">{autoRoutePercentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}