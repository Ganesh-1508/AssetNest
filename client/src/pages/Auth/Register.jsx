import React, { useState } from 'react';
import {
  Home, Globe, Eye, EyeOff, ShieldCheck,
  Cpu, Bell, TrendingUp
} from 'lucide-react';

export default function Register({ onNavigateToLogin, onRegisterSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Registration failed');
      } else {
        onRegisterSuccess(data.user);
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
        
        {/* Left Side: Registration Form */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white border-r border-gray-100">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Create Your Account</h2>
            <p className="text-xs text-gray-500 mb-5">Get started with AssetNest today</p>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-9"
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

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary text-xs"
                />
                <label htmlFor="agree" className="text-[11px] text-gray-600">
                  I agree to the <a href="#terms" className="text-primary hover:underline font-medium">Terms of Service</a> and <a href="#privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>
            </form>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative px-3 bg-white text-[11px] text-gray-400">or sign up with</span>
            </div>

            <div className="space-y-2">
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-1.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2">
                <span className="font-bold text-blue-600">G</span> Sign up with Google
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-1.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2">
                <span>🍎</span> Sign up with Apple
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-primary font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Why Join AssetNest? */}
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

          {/* Benefits List */}
          <div className="my-6 z-10 space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Why Join AssetNest?</h3>
            
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Secure & Private</h4>
                <p className="text-[11px] text-gray-500">Bank-level security to keep your property documents safe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cpu size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">AI-Powered Insights</h4>
                <p className="text-[11px] text-gray-500">Get AI verification, valuation and smart recommendations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Smart Reminders</h4>
                <p className="text-[11px] text-gray-500">Never miss important due dates or renewals again.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Track & Grow Value</h4>
                <p className="text-[11px] text-gray-500">Monitor property value, rental income and expenses.</p>
              </div>
            </div>
          </div>

          <div className="text-center z-10 text-[10px] text-gray-400">
            © AssetNest. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
