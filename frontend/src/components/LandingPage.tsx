import { Package, Brain, Zap, Globe, ArrowRight, CheckCircle2, Shield, BarChart3 } from 'lucide-react';

type LandingPageProps = {
  onGetStarted: () => void;
};

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-2 rounded-xl shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-orange-600">DeliveryPilot</h1>
                <p className="text-gray-600 text-sm">India Post AI Platform</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">
              Powered by AI • Built for India Post
            </div>
            <h2 className="text-gray-900">
              Smart Address Intelligence for Faster Deliveries
            </h2>
            <p className="text-gray-600 text-lg">
              DeliveryPilot is an AI-powered postal address interpretation and routing system that transforms 
              handwritten or printed addresses into accurate delivery routes in real-time, reducing errors and 
              accelerating mail processing across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-900">95% Accuracy</p>
                  <p className="text-green-700 text-sm">AI-powered address recognition</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-blue-900">3x Faster Processing</p>
                  <p className="text-blue-700 text-sm">Real-time routing decisions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <Globe className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-purple-900">Multilingual Support</p>
                  <p className="text-purple-700 text-sm">English, Hindi & regional languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Intelligent Features for Modern Postal Operations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Advanced AI technology meets postal expertise to deliver accurate, efficient mail routing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">AI Address Recognition</h3>
              <p className="text-gray-600">
                Advanced OCR and NLP models read handwritten and printed addresses with high accuracy, 
                even from poor quality scans.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Smart PIN Correction</h3>
              <p className="text-gray-600">
                Automatically detects and corrects PIN code errors by cross-referencing locality and 
                city information.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Automated Routing</h3>
              <p className="text-gray-600">
                High-confidence items flow automatically to correct delivery hubs with generated QR labels 
                for sorting.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Human-in-the-Loop</h3>
              <p className="text-gray-600">
                Low-confidence items flagged for postal staff review with AI recommendations for quick 
                verification.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">
                Monitor processing metrics, error rates, and turnaround times across centers with 
                interactive dashboards.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Multilingual Interface</h3>
              <p className="text-gray-600">
                Full support for English and Hindi with accessibility features for all postal staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-white text-4xl md:text-5xl mb-2">95%</p>
              <p className="text-orange-100">Recognition Accuracy</p>
            </div>
            <div>
              <p className="text-white text-4xl md:text-5xl mb-2">3x</p>
              <p className="text-orange-100">Faster Processing</p>
            </div>
            <div>
              <p className="text-white text-4xl md:text-5xl mb-2">10k+</p>
              <p className="text-orange-100">Items per Hour</p>
            </div>
            <div>
              <p className="text-white text-4xl md:text-5xl mb-2">99.9%</p>
              <p className="text-orange-100">System Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 mb-4">Ready to Transform Your Postal Operations?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join postal centers across India using DeliveryPilot to process mail faster and more accurately.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-orange-600 text-white px-10 py-4 rounded-lg hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">DeliveryPilot</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 India Post. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
