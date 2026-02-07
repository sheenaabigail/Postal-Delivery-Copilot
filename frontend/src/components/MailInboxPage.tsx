import { useState } from 'react';
import { Search, Filter, ChevronDown, AlertCircle, CheckCircle2, Clock, Package } from 'lucide-react';
import type { User, MailItem } from '../App';
import { MailDetailView } from './MailDetailView';

type MailInboxPageProps = {
  user: User;
  language: 'en' | 'hi';
  mailItems: MailItem[];
  setMailItems: (items: MailItem[]) => void;
};

export function MailInboxPage({ user, language, mailItems, setMailItems }: MailInboxPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MailItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [operatorFilter, setOperatorFilter] = useState<string>('all'); // For admin/supervisor

  const translations = {
    en: {
      title: 'Mail Inbox',
      subtitle: 'Process and review mail items',
      search: 'Search by ID, PIN, or locality...',
      filters: 'Filters',
      status: 'Status',
      confidence: 'Confidence',
      operator: 'Operator/Sorter',
      all: 'All',
      pending: 'Pending Review',
      approved: 'Approved',
      escalated: 'Escalated',
      routed: 'Routed',
      ambiguous: 'Ambiguous',
      high: 'High (>85%)',
      medium: 'Medium (70-85%)',
      low: 'Low (<70%)',
      id: 'ID',
      locality: 'Locality',
      city: 'City',
      pin: 'PIN',
      hub: 'Hub',
      scannedBy: 'Scanned By',
      noItems: 'No items found',
      tryDifferent: 'Try adjusting your filters',
      items: 'items'
    },
    hi: {
      title: 'मेल इनबॉक्स',
      subtitle: 'मेल आइटम प्रोसेस और समीक्षा करें',
      search: 'आईडी, पिन या इलाके से खोजें...',
      filters: 'फ़िल्टर',
      status: 'स्थिति',
      confidence: 'विश्वास',
      operator: 'ऑपरेटर/सॉर्टर',
      all: 'सभी',
      pending: 'समीक्षा लंबित',
      approved: 'स्वीकृत',
      escalated: 'बढ़ाया गया',
      routed: 'रूट किया गया',
      ambiguous: 'अस्पष्ट',
      high: 'उच्च (>85%)',
      medium: 'मध्यम (70-85%)',
      low: 'निम्न (<70%)',
      id: 'आईडी',
      locality: 'इलाका',
      city: 'शहर',
      pin: 'पिन',
      hub: 'हब',
      scannedBy: 'द्वारा स्कैन किया गया',
      noItems: 'कोई आइटम नहीं मिला',
      tryDifferent: 'अपने फ़िल्टर समायोजित करने का प्रयास करें',
      items: 'आइटम'
    }
  };

  const t = translations[language];

  // Get unique operators for filter dropdown
  const uniqueOperators = Array.from(new Set(mailItems.map(item => item.uploadedByName)));

  // Role-based filtering logic
  const getFilteredItemsByRole = () => {
    return mailItems.filter(item => {
      // For operators/sorters: Show only their own mail
      if (user.role === 'operator') {
        return item.uploadedBy === user.id;
      }
      
      // For supervisors: Show mail from their team (operators under their supervision)
      if (user.role === 'supervisor') {
        // In a real system, you'd check if item.uploadedBy is in the supervisor's team
        // For now, show all operator-scanned items from the same center
        return item.uploadedByRole === 'operator' && item.center === user.center;
      }
      
      // For admins: Show all mail
      return true;
    });
  };

  // Apply role-based filter first, then apply user filters
  const roleFilteredItems = getFilteredItemsByRole();

  // Filter items based on user selections
  const filteredItems = roleFilteredItems.filter(item => {
    // Search filter
    if (searchQuery && !item.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.parsedFields.pincode.includes(searchQuery) &&
        !item.parsedFields.locality.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }

    // Confidence filter
    if (confidenceFilter === 'high' && item.confidence <= 85) return false;
    if (confidenceFilter === 'medium' && (item.confidence < 70 || item.confidence > 85)) return false;
    if (confidenceFilter === 'low' && item.confidence >= 70) return false;

    // Operator filter (for admin and supervisor)
    if (operatorFilter !== 'all' && item.uploadedByName !== operatorFilter) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: MailItem['status']) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: t.pending },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: t.approved },
      escalated: { bg: 'bg-red-100', text: 'text-red-800', label: t.escalated },
      routed: { bg: 'bg-blue-100', text: 'text-blue-800', label: t.routed },
      ambiguous: { bg: 'bg-gray-100', text: 'text-gray-800', label: t.ambiguous }
    };
    const badge = badges[status];
    return <span className={`${badge.bg} ${badge.text} px-2 py-1 rounded text-xs`}>{badge.label}</span>;
  };

  if (selectedItem) {
    return (
      <MailDetailView
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
        user={user}
        language={language}
      />
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            {t.filters}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-gray-700 text-sm mb-2">{t.status}</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">{t.all}</option>
                <option value="pending">{t.pending}</option>
                <option value="approved">{t.approved}</option>
                <option value="escalated">{t.escalated}</option>
                <option value="routed">{t.routed}</option>
                <option value="ambiguous">{t.ambiguous}</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">{t.confidence}</label>
              <select
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">{t.all}</option>
                <option value="high">{t.high}</option>
                <option value="medium">{t.medium}</option>
                <option value="low">{t.low}</option>
              </select>
            </div>
            {user.role === 'admin' || user.role === 'supervisor' ? (
              <div>
                <label className="block text-gray-700 text-sm mb-2">{t.operator}</label>
                <select
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">{t.all}</option>
                  {uniqueOperators.map(operator => (
                    <option key={operator} value={operator}>{operator}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredItems.length} {t.items}
        </p>
      </div>

      {/* Mail Items - Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.id}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.locality}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.city}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.pin}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.confidence}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.status}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.hub}</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">{t.scannedBy}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">{t.noItems}</p>
                    <p className="text-gray-500 text-sm">{t.tryDifferent}</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{item.id}</p>
                      <p className="text-gray-500 text-sm">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.parsedFields.locality}</td>
                    <td className="px-6 py-4 text-gray-700">{item.parsedFields.city}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{item.parsedFields.pincode}</p>
                      {item.originalPincode !== item.aiSuggestion.correctedPincode && (
                        <p className="text-orange-600 text-sm">
                          Corrected from {item.originalPincode}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                          <div
                            className={`h-2 rounded-full ${
                              item.confidence >= 85 ? 'bg-green-500' :
                              item.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-gray-700 text-sm">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-gray-700">{item.aiSuggestion.deliveryHub}</td>
                    <td className="px-6 py-4 text-gray-700">{item.uploadedByName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mail Items - Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-1">{t.noItems}</p>
            <p className="text-gray-500 text-sm">{t.tryDifferent}</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-900">{item.id}</p>
                  <p className="text-gray-500 text-sm">{new Date(item.timestamp).toLocaleTimeString()}</p>
                </div>
                {getStatusBadge(item.status)}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.locality}:</span>
                  <span className="text-gray-900">{item.parsedFields.locality}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.city}:</span>
                  <span className="text-gray-900">{item.parsedFields.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.pin}:</span>
                  <span className="text-gray-900">{item.parsedFields.pincode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.confidence}:</span>
                  <span className={`${
                    item.confidence >= 85 ? 'text-green-600' :
                    item.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.scannedBy}:</span>
                  <span className="text-gray-900">{item.uploadedByName}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}