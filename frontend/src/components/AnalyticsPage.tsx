import { TrendingUp, Package, Clock, AlertTriangle, Users, MapPin } from 'lucide-react';
import type { User } from '../App';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

type AnalyticsPageProps = {
  user: User;
  language: 'en' | 'hi';
};

export function AnalyticsPage({ user, language }: AnalyticsPageProps) {
  const translations = {
    en: {
      title: 'Analytics & Monitoring',
      subtitle: 'Performance metrics and insights',
      itemsProcessed: 'Items Processed Today',
      autoRouted: '% Auto-Routed',
      humanReviewed: '% Human-Reviewed',
      avgTurnaround: 'Avg. Turnaround Time',
      processingVolume: 'Processing Volume - Last 30 Days',
      errorDistribution: 'Error Distribution',
      centerPerformance: 'Center Performance Comparison',
      turnaroundTrends: 'Turnaround Time Trends',
      confidenceDistribution: 'Confidence Distribution',
      topErrors: 'Top Error Types',
      wrongPIN: 'Wrong PIN',
      missingLocality: 'Missing Locality',
      illegibleText: 'Illegible Text',
      pinMismatch: 'PIN-City Mismatch',
      incompleteAddress: 'Incomplete Address',
      highConfidence: 'High (>85%)',
      mediumConfidence: 'Medium (70-85%)',
      lowConfidence: 'Low (<70%)',
      minutes: 'minutes',
      items: 'items'
    },
    hi: {
      title: 'विश्लेषण और निगरानी',
      subtitle: 'प्रदर्शन मेट्रिक्स और अंतर्दृष्टि',
      itemsProcessed: 'आज संसाधित आइटम',
      autoRouted: '% ऑटो-रूटेड',
      humanReviewed: '% मानव-समीक्षित',
      avgTurnaround: 'औसत टर्नअराउंड समय',
      processingVolume: 'प्रसंस्करण मात्रा - पिछले 30 दिन',
      errorDistribution: 'त्रुटि वितरण',
      centerPerformance: 'केंद्र प्रदर्शन तुलना',
      turnaroundTrends: 'टर्नअराउंड समय रुझान',
      confidenceDistribution: 'विश्वास वितरण',
      topErrors: 'शीर्ष त्रुटि प्रकार',
      wrongPIN: 'गलत पिन',
      missingLocality: 'लापता इलाका',
      illegibleText: 'अपठनीय पाठ',
      pinMismatch: 'पिन-शहर बेमेल',
      incompleteAddress: 'अधूरा पता',
      highConfidence: 'उच्च (>85%)',
      mediumConfidence: 'मध्यम (70-85%)',
      lowConfidence: 'निम्न (<70%)',
      minutes: 'मिनट',
      items: 'आइटम'
    }
  };

  const t = translations[language];

  // Mock data
  const stats = {
    processed: 2847,
    autoRouted: 87,
    humanReviewed: 13,
    avgTurnaround: 42
  };

  const volumeData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    processed: Math.floor(Math.random() * 1000) + 1500,
    autoRouted: Math.floor(Math.random() * 800) + 1200
  }));

  const errorData = [
    { name: t.wrongPIN, value: 45, color: '#f59e0b' },
    { name: t.missingLocality, value: 38, color: '#ef4444' },
    { name: t.illegibleText, value: 28, color: '#8b5cf6' },
    { name: t.pinMismatch, value: 22, color: '#06b6d4' },
    { name: t.incompleteAddress, value: 18, color: '#ec4899' }
  ];

  const centerData = [
    { center: 'Delhi', processed: 3200, avgTime: 38 },
    { center: 'Mumbai', processed: 3850, avgTime: 42 },
    { center: 'Bangalore', processed: 2950, avgTime: 35 },
    { center: 'Kolkata', processed: 2640, avgTime: 45 },
    { center: 'Chennai', processed: 2820, avgTime: 40 },
    { center: 'Hyderabad', processed: 2580, avgTime: 37 }
  ];

  const turnaroundData = Array.from({ length: 12 }, (_, i) => ({
    week: `W${i + 1}`,
    time: Math.floor(Math.random() * 20) + 35
  }));

  const confidenceData = [
    { name: t.highConfidence, value: 72, color: '#16a34a' },
    { name: t.mediumConfidence, value: 19, color: '#f59e0b' },
    { name: t.lowConfidence, value: 9, color: '#ef4444' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">{t.itemsProcessed}</span>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.processed.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">{t.autoRouted}</span>
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.autoRouted}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${stats.autoRouted}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">{t.humanReviewed}</span>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.humanReviewed}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${stats.humanReviewed}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">{t.avgTurnaround}</span>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-900 text-3xl mb-2">{stats.avgTurnaround}s</p>
          <div className="text-purple-600 text-sm">
            -8% from last week
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Processing Volume */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.processingVolume}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              <Legend />
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

        {/* Error Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.errorDistribution}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={errorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {errorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Center Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.centerPerformance}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={centerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="center" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar dataKey="processed" fill="#ea580c" name="Items Processed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Turnaround Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.turnaroundTrends}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={turnaroundData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#9ca3af" />
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
                dataKey="time" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Avg Time (seconds)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.confidenceDistribution}</h3>
          <div className="space-y-4">
            {confidenceData.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Errors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t.topErrors}</h3>
          <div className="space-y-3">
            {errorData.map((error, index) => (
              <div
                key={error.name}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: error.color }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-gray-900">{error.name}</span>
                </div>
                <span className="text-gray-600">{error.value} {t.items}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
