import { useState } from 'react';
import { Save, Bell, Eye, Keyboard, Volume2, Sliders } from 'lucide-react';
import type { User } from '../App';

type SettingsPageProps = {
  user: User;
  language: 'en' | 'hi';
};

export function SettingsPage({ user, language }: SettingsPageProps) {
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(85);
  const [escalationThreshold, setEscalationThreshold] = useState(70);
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);

  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Configure system preferences',
      processing: 'Processing Thresholds',
      autoApprove: 'Auto-Approve Confidence',
      autoApproveDesc: 'Items above this confidence level will be automatically approved',
      escalation: 'Escalation Threshold',
      escalationDesc: 'Items below this confidence level will be escalated',
      accessibility: 'Accessibility Options',
      fontSize: 'Font Size',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large',
      highContrast: 'High Contrast Mode',
      highContrastDesc: 'Increase contrast for better visibility',
      screenReader: 'Screen Reader Support',
      screenReaderDesc: 'Enable enhanced screen reader compatibility',
      keyboardShortcuts: 'Keyboard Shortcuts',
      keyboardDesc: 'Enable keyboard navigation shortcuts',
      notifications: 'Notifications & Alerts',
      enableNotifications: 'Enable Notifications',
      notificationsDesc: 'Receive alerts for important events',
      soundAlerts: 'Sound Alerts',
      soundAlertsDesc: 'Play sound for notifications',
      language: 'Language Preferences',
      interfaceLanguage: 'Interface Language',
      save: 'Save Settings',
      saved: 'Settings saved successfully!',
      shortcuts: 'Available Keyboard Shortcuts',
      shortcutsList: [
        { keys: 'Ctrl + N', action: 'New scan' },
        { keys: 'Ctrl + A', action: 'Approve item' },
        { keys: 'Ctrl + E', action: 'Edit fields' },
        { keys: 'Ctrl + S', action: 'Save changes' },
        { keys: 'Esc', action: 'Cancel/Go back' },
        { keys: '←/→', action: 'Navigate items' }
      ]
    },
    hi: {
      title: 'सेटिंग्स',
      subtitle: 'सिस्टम प्राथमिकताओं को कॉन्फ़िगर करें',
      processing: 'प्रसंस्करण सीमा',
      autoApprove: 'ऑटो-स्वीकृत विश्वास',
      autoApproveDesc: 'इस विश्वास स्तर से ऊपर के आइटम स्वचालित रूप से स्वीकृत होंगे',
      escalation: 'वृद्धि सीमा',
      escalationDesc: 'इस विश्वास स्तर से नीचे के आइटम बढ़ाए जाएंगे',
      accessibility: 'पहुंच विकल्प',
      fontSize: 'फ़ॉन्ट आ���ार',
      small: 'छोटा',
      medium: 'मध्यम',
      large: 'बड़ा',
      extraLarge: 'अतिरिक्त बड़ा',
      highContrast: 'उच्च कंट्रास्ट मोड',
      highContrastDesc: 'बेहतर दृश्यता के लिए कंट्रास्ट बढ़ाएं',
      screenReader: 'स्क्रीन रीडर समर्थन',
      screenReaderDesc: 'उन्नत स्क्रीन रीडर संगतता सक्षम करें',
      keyboardShortcuts: 'कीबोर्ड शॉर्टकट',
      keyboardDesc: 'कीबोर्ड नेविगेशन शॉर्टकट सक्षम करें',
      notifications: 'सूचनाएं और अलर्ट',
      enableNotifications: 'सूचनाएं सक्षम करें',
      notificationsDesc: 'महत्वपूर्ण घटनाओं के लिए अलर्ट प्राप्त करें',
      soundAlerts: 'ध्वनि अलर्ट',
      soundAlertsDesc: 'सूचनाओं के लिए ध्वनि बजाएं',
      language: 'भाषा प्राथमिकताएं',
      interfaceLanguage: 'इंटरफ़ेस भाषा',
      save: 'सेटिंग्स सहेजें',
      saved: 'सेटिंग्स सफलतापूर्वक सहेजी गई!',
      shortcuts: 'उपलब्ध कीबोर्ड शॉर्टकट',
      shortcutsList: [
        { keys: 'Ctrl + N', action: 'नया स्कैन' },
        { keys: 'Ctrl + A', action: 'आइटम स्वीकृत करें' },
        { keys: 'Ctrl + E', action: 'फ़ील्ड संपादित करें' },
        { keys: 'Ctrl + S', action: 'परिवर्तन सहेजें' },
        { keys: 'Esc', action: 'रद्द करें/वापस जाएं' },
        { keys: '←/→', action: 'आइटम नेविगेट करें' }
      ]
    }
  };

  const t = translations[language];
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Save Success Message */}
      {showSaved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="bg-green-600 p-2 rounded-lg">
            <Save className="w-5 h-5 text-white" />
          </div>
          <p className="text-green-900">{t.saved}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Processing Thresholds */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Sliders className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-gray-900">{t.processing}</h3>
            </div>
          </div>

          {/* Auto-Approve Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700">{t.autoApprove}</label>
              <span className="text-orange-600">{autoApproveThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              value={autoApproveThreshold}
              onChange={(e) => setAutoApproveThreshold(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <p className="text-gray-600 text-sm mt-2">{t.autoApproveDesc}</p>
          </div>

          {/* Escalation Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700">{t.escalation}</label>
              <span className="text-red-600">{escalationThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="85"
              value={escalationThreshold}
              onChange={(e) => setEscalationThreshold(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <p className="text-gray-600 text-sm mt-2">{t.escalationDesc}</p>
          </div>

          {/* Visual Preview */}
          <div className="p-4 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-700">0%</span>
              <span className="text-yellow-700">{escalationThreshold}%</span>
              <span className="text-orange-700">{autoApproveThreshold}%</span>
              <span className="text-green-700">100%</span>
            </div>
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-gray-900">{t.accessibility}</h3>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-gray-700 mb-3">{t.fontSize}</label>
            <div className="grid grid-cols-2 gap-2">
              {['small', 'medium', 'large', 'extraLarge'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    fontSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {t[size as keyof typeof t]}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{t.highContrast}</p>
                <p className="text-gray-600 text-sm">{t.highContrastDesc}</p>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{t.screenReader}</p>
                <p className="text-gray-600 text-sm">{t.screenReaderDesc}</p>
              </div>
              <button
                onClick={() => setScreenReader(!screenReader)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  screenReader ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    screenReader ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{t.keyboardShortcuts}</p>
                <p className="text-gray-600 text-sm">{t.keyboardDesc}</p>
              </div>
              <button
                onClick={() => setKeyboardShortcuts(!keyboardShortcuts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  keyboardShortcuts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    keyboardShortcuts ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900">{t.notifications}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{t.enableNotifications}</p>
                <p className="text-gray-600 text-sm">{t.notificationsDesc}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{t.soundAlerts}</p>
                <p className="text-gray-600 text-sm">{t.soundAlertsDesc}</p>
              </div>
              <button
                onClick={() => setSoundAlerts(!soundAlerts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  soundAlerts ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    soundAlerts ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Keyboard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-900">{t.shortcuts}</h3>
          </div>

          <div className="space-y-2">
            {t.shortcutsList.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <span className="text-gray-900">{shortcut.action}</span>
                <kbd className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          {t.save}
        </button>
      </div>
    </div>
  );
}
