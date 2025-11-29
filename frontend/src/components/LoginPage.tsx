import { useState } from 'react';
import { Package, ArrowLeft, Lock, User as UserIcon, MapPin } from 'lucide-react';
import type { User, UserRole } from '../App';

type LoginPageProps = {
  onLogin: (user: User) => void;
  onBack: () => void;
};

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('operator');
  const [selectedCenter, setSelectedCenter] = useState('Delhi Central');

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'admin', label: 'Administrator', description: 'Full system access and configuration' },
    { value: 'supervisor', label: 'Supervisor', description: 'Monitor operations and review escalations' },
    { value: 'operator', label: 'Sorter/Operator', description: 'Process and review mail items' }
  ];

  const centers = [
    'Delhi Central',
    'Mumbai Central',
    'Bangalore Central',
    'Kolkata Central',
    'Chennai Central',
    'Hyderabad Central'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in production, this would validate credentials
    const user: User = {
      id: `user-${Date.now()}`,
      name: username || 'Demo User',
      role: selectedRole,
      center: selectedCenter
    };

    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white mb-2">DeliveryPilot</h2>
            <p className="text-orange-100">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 mb-3">Select Role</label>
              <div className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === role.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={selectedRole === role.value ? 'text-orange-900' : 'text-gray-900'}>
                      {role.label}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Center Selection */}
            <div>
              <label className="block text-gray-700 mb-2">Postal Center</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  {centers.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Sign In
            </button>

            {/* Demo Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-sm">
                <strong>Demo Mode:</strong> Enter any username to login. Role and center selection will determine your access level.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
