import { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  QrCode,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Edit3,
  Clock,
  User as UserIcon
} from 'lucide-react';
import type { MailItem, User } from '../App';

type MailDetailViewProps = {
  item: MailItem;
  onBack: () => void;
  user: User;
  language: 'en' | 'hi';
};

export function MailDetailView({ item, onBack, user, language }: MailDetailViewProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState(item.parsedFields);
  const [imageZoom, setImageZoom] = useState(1);
  const [activeTab, setActiveTab] = useState<'address' | 'ai' | 'routing' | 'history'>('address');
  const [reasonCode, setReasonCode] = useState('');
  const [notes, setNotes] = useState('');

  const translations = {
    en: {
      back: 'Back to Inbox',
      scannedImage: 'Scanned Image',
      ocrOutput: 'OCR Output',
      addressFields: 'Address Fields',
      aiSuggestion: 'AI Suggestion',
      routingInfo: 'Routing Info',
      history: 'History & Comments',
      name: 'Name',
      houseNo: 'House No.',
      street: 'Street',
      locality: 'Locality',
      city: 'City',
      state: 'State',
      pincode: 'PIN Code',
      originalPIN: 'Original PIN',
      correctedPIN: 'Corrected PIN',
      confidence: 'Confidence',
      flags: 'Flags',
      reasoning: 'AI Reasoning',
      deliveryHub: 'Delivery Hub',
      nodalCenter: 'Nodal Center',
      edit: 'Edit Fields',
      cancel: 'Cancel',
      save: 'Save Changes',
      acceptAI: 'Accept AI Suggestion',
      revert: 'Revert to Original',
      markAmbiguous: 'Mark as Ambiguous',
      escalate: 'Send for Escalation',
      approve: 'Approve & Route',
      qrLabel: 'QR Label Preview',
      regenerate: 'Regenerate Label',
      reasonCode: 'Reason Code',
      addNotes: 'Add Notes',
      notesPlaceholder: 'Add comments or notes about this item...',
      processingTime: 'Processing Time',
      noHistory: 'No history yet',
      action: 'Action',
      by: 'By',
      when: 'When',
      changes: 'Changes'
    },
    hi: {
      back: 'इनबॉक्स पर वापस जाएं',
      scannedImage: 'स्कैन की गई छवि',
      ocrOutput: 'OCR आउटपुट',
      addressFields: 'पता फ़ील्ड',
      aiSuggestion: 'AI सुझाव',
      routingInfo: 'रूटिंग जानकारी',
      history: 'इतिहास और टिप्पणियाँ',
      name: 'नाम',
      houseNo: 'घर नंबर',
      street: 'गली',
      locality: 'इलाका',
      city: 'शहर',
      state: 'राज्य',
      pincode: 'पिन कोड',
      originalPIN: 'मूल पिन',
      correctedPIN: 'सही किया गया पिन',
      confidence: 'विश्वास',
      flags: 'फ्लैग',
      reasoning: 'AI तर्क',
      deliveryHub: 'डिलीवरी हब',
      nodalCenter: 'नोडल सेंटर',
      edit: 'फ़ील्ड संपादित करें',
      cancel: 'रद्द करें',
      save: 'परिवर्तन सहेजें',
      acceptAI: 'AI सुझाव स्वीकार करें',
      revert: 'मूल पर वापस जाएं',
      markAmbiguous: 'अस्पष्ट के रूप में चिह्नित करें',
      escalate: 'वृद्धि के लिए भेजें',
      approve: 'स्वीकृत करें और रूट करें',
      qrLabel: 'QR लेबल पूर्वावलोकन',
      regenerate: 'लेबल पुनर्जनित करें',
      reasonCode: 'कारण कोड',
      addNotes: 'नोट्स जोड़ें',
      notesPlaceholder: 'इस आइटम के बारे में टिप्पणियाँ या नोट्स जोड़ें...',
      processingTime: 'प्रसंस्करण समय',
      noHistory: 'अभी तक कोई इतिहास नहीं',
      action: 'क्रिया',
      by: 'द्वारा',
      when: 'कब',
      changes: 'परिवर्तन'
    }
  };

  const t = translations[language];

  const handleAcceptAI = () => {
    // Accept AI suggestion
    console.log('Accepting AI suggestion');
  };

  const handleRevert = () => {
    setEditedFields(item.parsedFields);
    setEditMode(false);
  };

  const handleMarkAmbiguous = () => {
    console.log('Marking as ambiguous');
  };

  const handleEscalate = () => {
    console.log('Escalating item');
  };

  const handleApprove = () => {
    console.log('Approving and routing');
  };

  const handleSave = () => {
    console.log('Saving changes', editedFields);
    setEditMode(false);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>
          <h2 className="text-gray-900">{item.id}</h2>
          <p className="text-gray-600">
            {new Date(item.timestamp).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-lg ${
            item.confidence >= 85 ? 'bg-green-100 text-green-800' :
            item.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {t.confidence}: {item.confidence}%
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Image Viewer */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">{t.scannedImage}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setImageZoom(Math.max(0.5, imageZoom - 0.25))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setImageZoom(Math.min(3, imageZoom + 0.25))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ maxHeight: '400px' }}>
              <div className="overflow-auto p-4 flex items-center justify-center">
                <img
                  src={item.scannedImage}
                  alt="Scanned envelope"
                  style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center' }}
                  className="max-w-full h-auto transition-transform"
                />
              </div>
            </div>
          </div>

          {/* OCR Output */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-3">{t.ocrOutput}</h3>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap font-mono text-sm">
                {item.ocrText}
              </p>
            </div>
          </div>

          {/* Processing Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{t.processingTime}: {item.processingTime}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              {(['address', 'ai', 'routing', 'history'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t[tab]}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: '600px' }}>
            {/* Address Fields Tab */}
            {activeTab === 'address' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900">{t.addressFields}</h3>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      {t.edit}
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleRevert}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {t.cancel}
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {t.save}
                      </button>
                    </div>
                  )}
                </div>

                {Object.entries(editedFields).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-gray-700 text-sm mb-2">
                      {t[key as keyof typeof t] || key}
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setEditedFields({ ...editedFields, [key]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* AI Suggestion Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <h3 className="text-gray-900">{t.aiSuggestion}</h3>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-900">{t.confidence}</span>
                    <span className="text-blue-700">{item.aiSuggestion.confidence}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-900">{t.originalPIN}</span>
                    <span className="text-blue-700">{item.originalPincode}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-900">{t.correctedPIN}</span>
                    <span className="text-blue-700">{item.aiSuggestion.correctedPincode}</span>
                  </div>

                  {item.aiSuggestion.flags.length > 0 && (
                    <div>
                      <label className="block text-blue-900 mb-2">{t.flags}</label>
                      <div className="space-y-1">
                        {item.aiSuggestion.flags.map((flag, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-blue-700 text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            <span>{flag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-blue-900 mb-2">{t.reasoning}</label>
                    <p className="text-blue-700 text-sm">{item.aiSuggestion.reasoning}</p>
                  </div>
                </div>

                <button
                  onClick={handleAcceptAI}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {t.acceptAI}
                </button>
              </div>
            )}

            {/* Routing Info Tab */}
            {activeTab === 'routing' && (
              <div className="space-y-4">
                <h3 className="text-gray-900">{t.routingInfo}</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <label className="block text-orange-900 text-sm mb-1">{t.deliveryHub}</label>
                    <p className="text-orange-700">{item.aiSuggestion.deliveryHub}</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <label className="block text-orange-900 text-sm mb-1">{t.nodalCenter}</label>
                    <p className="text-orange-700">{item.aiSuggestion.nodalCenter}</p>
                  </div>
                </div>

                {/* QR Code Preview */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <h4 className="text-gray-900 mb-4 text-center">{t.qrLabel}</h4>
                  <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center space-y-1 text-sm text-gray-700 mb-4">
                    <p>{item.id}</p>
                    <p>{item.aiSuggestion.deliveryHub} → {item.aiSuggestion.nodalCenter}</p>
                    <p>PIN: {item.aiSuggestion.correctedPincode}</p>
                  </div>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    {t.regenerate}
                  </button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="text-gray-900">{t.history}</h3>

                {/* Comprehensive Activity Log */}
                {item.activityLog && item.activityLog.length > 0 ? (
                  <div className="space-y-3">
                    {/* Upload Information */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                            <UserIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-gray-900">Uploaded by</p>
                            <p className="text-sm text-gray-600">
                              {item.uploadedByName} ({item.uploadedByRole})
                            </p>
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Scanned at {item.center}
                      </p>
                    </div>

                    {/* Activity Timeline */}
                    {item.activityLog.map((entry, index) => {
                      const actionIcons = {
                        upload: '📤',
                        submit: '📨',
                        approve: '✅',
                        reject: '❌',
                        mark_ambiguous: '❓',
                        edit: '✏️',
                        escalate: '⬆️',
                        qr_regenerate: '🔄'
                      };
                      
                      const actionColors = {
                        upload: 'bg-blue-50 border-blue-200',
                        submit: 'bg-purple-50 border-purple-200',
                        approve: 'bg-green-50 border-green-200',
                        reject: 'bg-red-50 border-red-200',
                        mark_ambiguous: 'bg-yellow-50 border-yellow-200',
                        edit: 'bg-orange-50 border-orange-200',
                        escalate: 'bg-red-50 border-red-200',
                        qr_regenerate: 'bg-gray-50 border-gray-200'
                      };

                      return (
                        <div 
                          key={entry.id} 
                          className={`p-3 border rounded-lg ${actionColors[entry.action] || 'border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-2">
                              <span className="text-xl">{actionIcons[entry.action]}</span>
                              <div>
                                <p className="text-gray-900 capitalize">
                                  {entry.action.replace('_', ' ')}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {t.by}: {entry.userName} ({entry.userRole})
                                </p>
                              </div>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm ml-8">{entry.details}</p>
                          {entry.reasonCode && (
                            <p className="text-gray-600 text-sm mt-1 ml-8">
                              {t.reasonCode}: {entry.reasonCode}
                            </p>
                          )}
                          {entry.fieldChanges && Object.keys(entry.fieldChanges).length > 0 && (
                            <div className="mt-2 ml-8 p-2 bg-white rounded border border-gray-200">
                              <p className="text-xs text-gray-600 mb-1">Field Changes:</p>
                              {Object.entries(entry.fieldChanges).map(([field, change]) => (
                                <p key={field} className="text-xs text-gray-700">
                                  <span className="font-medium">{field}:</span>{' '}
                                  <span className="text-red-600 line-through">{change.old}</span>
                                  {' → '}
                                  <span className="text-green-600">{change.new}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Review Status */}
                    {item.reviewedBy && item.reviewedByName && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                              ✓
                            </div>
                            <div>
                              <p className="text-gray-900">Reviewed & Processed</p>
                              <p className="text-sm text-gray-600">
                                By {item.reviewedByName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.history.length > 0 ? (
                  <div className="space-y-3">
                    {item.history.map((entry) => (
                      <div key={entry.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-gray-900">{entry.action}</p>
                          <span className="text-gray-500 text-sm">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{t.by}: {entry.user}</p>
                        <p className="text-gray-700 text-sm">{entry.changes}</p>
                        {entry.reasonCode && (
                          <p className="text-gray-600 text-sm mt-1">
                            {t.reasonCode}: {entry.reasonCode}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>{t.noHistory}</p>
                  </div>
                )}

                {/* Add Notes */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-gray-700 mb-2">{t.addNotes}</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={handleApprove}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t.approve}
          </button>
          <button
            onClick={handleRevert}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCw className="w-5 h-5" />
            {t.revert}
          </button>
          <button
            onClick={handleMarkAmbiguous}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <AlertTriangle className="w-5 h-5" />
            {t.markAmbiguous}
          </button>
          <button
            onClick={handleEscalate}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <XCircle className="w-5 h-5" />
            {t.escalate}
          </button>
        </div>
      </div>
    </div>
  );
}