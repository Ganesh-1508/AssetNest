import React, { useState } from 'react';
import {
  Home, Globe, Eye, EyeOff, ShieldCheck, CheckCircle2,
  FileCheck, TrendingUp, Bell, BarChart3, Clock
} from 'lucide-react';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Login failed');
      } else {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Brand Value Proposition */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Top Logo */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                <Home size={18} />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">
                  Asset<span className="text-primary">Nest</span>
                </h1>
                <p className="text-[10px] text-gray-500">Your Property. Your Documents. Your AI Assistant.</p>
              </div>
            </div>
            
            <button className="flex items-center gap-1 text-xs border border-gray-300 rounded-lg px-2.5 py-1 bg-white/80 text-gray-700 hover:bg-white transition-all">
              <Globe size={13} />
              <span>English</span>
            </button>
          </div>

          {/* Center Pitch */}
          <div className="my-8 z-10">
            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
              Smartly Manage<br />
              Your Properties<br />
              in One <span className="text-primary">Secure<br />Platform</span>
            </h2>
            <p className="text-xs text-gray-600 mb-6 max-w-xs leading-relaxed">
              Store documents, track reminders, get AI insights, verify documents and unlock your property's true value.
            </p>

            {/* Feature List */}
            <div className="space-y-2.5 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <FileCheck size={12} />
                </div>
                <span>Secure Document Vault</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <ShieldCheck size={12} />
                </div>
                <span>AI Document Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <TrendingUp size={12} />
                </div>
                <span>AI Property Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <Bell size={12} />
                </div>
                <span>Smart Reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <BarChart3 size={12} />
                </div>
                <span>Reports & Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-200/60 text-primary flex items-center justify-center">
                  <Clock size={12} />
                </div>
                <span>24/7 Access Anywhere</span>
              </div>
            </div>
          </div>

          {/* Property Image Placeholder Card */}
          <div className="relative z-10 bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Home size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Bank-level security to protect your data</p>
              <p className="text-[10px] text-gray-500">We never share your information with anyone.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
            <p className="text-xs text-gray-500 mb-6">Login to continue to AssetNest</p>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email or Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-gray-600 text-[11px]">Remember me</span>
                </label>
                <a href="#forgot" className="text-primary hover:underline font-medium text-[11px]">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Logging in...' : 'Login to Account'}</span> {!loading && '→'}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative px-3 bg-white text-[11px] text-gray-400">or continue with</span>
            </div>

            <div className="space-y-2">
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2">
                <span className="font-bold text-blue-600">G</span> Continue with Google
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2">
                <span>🍎</span> Continue with Apple
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-primary font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
