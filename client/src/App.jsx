import React, { useState } from 'react';
import {
  Home, Building2, FileText, Cpu, Bell, DollarSign, Wrench,
  Shield, BarChart3, Clock, Settings, HelpCircle, Menu, Search,
  Plus, ArrowUpRight, ChevronDown, ChevronRight, MapPin, Maximize2,
  Upload, Star, TrendingUp, AlertCircle, CheckCircle2, LogOut, UserCheck
} from 'lucide-react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// ─── Data ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: Home,        label: 'Dashboard',         id: 'dashboard', active: true },
  { icon: Building2,   label: 'Properties',         id: 'properties' },
  { icon: FileText,    label: 'Documents',          id: 'documents' },
  { icon: Cpu,         label: 'AI Tools',           id: 'ai-tools',  children: true },
  { icon: Bell,        label: 'Reminders',          id: 'reminders' },
  { icon: DollarSign,  label: 'Rent Management',    id: 'rent' },
  { icon: Wrench,      label: 'Maintenance',        id: 'maintenance' },
  { icon: Shield,      label: 'Insurance',          id: 'insurance' },
  { icon: BarChart3,   label: 'Reports & Insights', id: 'reports' },
  { icon: Clock,       label: 'Ownership History',  id: 'history' },
  { icon: Settings,    label: 'Settings',           id: 'settings' },
  { icon: HelpCircle,  label: 'Help & Support',     id: 'help' },
];

const STATS = [
  { label: 'Total Properties', value: '5',      sub: '+1 added this month',    icon: Building2,  color: 'text-primary', bg: 'bg-primary-light' },
  { label: 'Total Documents',  value: '128',    sub: '+12 this month',         icon: FileText,   color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Upcoming Reminders', value: '7',   sub: 'Due in next 7 days',     icon: Bell,       color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Property Value (Est.)', value: '₹8.75 Cr', sub: '↑ 6.4% this year', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Property Health Score', value: '85/100', sub: 'Very Good',        icon: Star,       color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { label: 'Rent Income (Monthly)', value: '₹1.25 L', sub: '↑ 8.2% this month', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const AI_FEATURES = [
  { icon: CheckCircle2, label: 'AI Document Verification', desc: 'Verify authenticity, detect missing info & get risk score.', color: 'text-primary', bg: 'bg-primary-light', badge: null },
  { icon: TrendingUp,   label: 'AI Property Valuation',   desc: 'Get AI estimated market value of your property.',          color: 'text-blue-600',   bg: 'bg-blue-50',   badge: null },
  { icon: Cpu,          label: 'AI Assistant',            desc: 'Ask anything about your property in natural language.',    color: 'text-purple-600', bg: 'bg-purple-50', badge: 'New' },
  { icon: BarChart3,    label: 'Property Comparison',     desc: 'Compare properties & make smarter investment decisions.',  color: 'text-orange-500', bg: 'bg-orange-50', badge: null },
  { icon: Star,         label: 'Investment Insights',     desc: 'Track appreciation, rental yield & ROI of your properties.', color: 'text-yellow-500', bg: 'bg-yellow-50', badge: null },
];

const PROPERTIES = [
  { name: 'Green Valley Apartment', type: 'Residential', loc: 'Pune, Maharashtra',     area: '1200 sq.ft', status: 'Owned',  date: '10 Aug 2025', value: '₹85.6 Lakh', change: '+4.2% this year', color: 'bg-green-200' },
  { name: 'Sunrise Villa',          type: 'Residential', loc: 'Bangalore, Karnataka',  area: '2400 sq.ft', status: 'Owned',  date: '22 Jun 2024', value: '₹2.45 Cr',   change: '+7.8% this year', color: 'bg-orange-200' },
  { name: 'City Center Office Space', type: 'Commercial', loc: 'Mumbai, Maharashtra',  area: '1600 sq.ft', status: 'Leased', date: '05 Mar 2024', value: '₹1.85 Cr',   change: '+3.6% this year', color: 'bg-blue-200' },
];

const REMINDERS = [
  { title: 'Property Tax Payment', prop: 'Green Valley Apartment', date: '15 Aug 2025', due: 'Due in 4 days',  urgency: 'red' },
  { title: 'Insurance Renewal',    prop: 'Sunrise Villa',          date: '21 Aug 2025', due: 'Due in 10 days', urgency: 'red' },
  { title: 'Rent Agreement Expiry',prop: 'City Center Office Space',date: '05 Sep 2025', due: 'Due in 25 days', urgency: 'orange' },
  { title: 'Electricity Bill Due', prop: 'Green Valley Apartment', date: '12 Sep 2025', due: 'Due in 32 days', urgency: 'orange' },
  { title: 'Maintenance Check',    prop: 'Sunrise Villa',          date: '20 Sep 2025', due: 'Due in 40 days', urgency: 'green' },
];

const DOC_CATEGORIES = [
  { label: 'Sale Deed',      count: 19, icon: FileText,   color: 'text-primary',  bg: 'bg-primary-light' },
  { label: 'Property Card',  count: 8,  icon: Building2,  color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Tax Receipts',   count: 15, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Rent Agreements',count: 10, icon: FileText,   color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Insurance',      count: 6,  icon: Shield,     color: 'text-red-500',  bg: 'bg-red-50' },
  { label: 'Maintenance',    count: 9,  icon: Wrench,     color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const AI_INSIGHTS = [
  { icon: TrendingUp,  color: 'text-green-600',  bg: 'bg-green-50',  text: 'Your property Green Valley Apartment appreciated by 4.2% this year.' },
  { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50', text: '2 documents are expiring soon. Check reminders.' },
  { icon: Building2,   color: 'text-blue-600',   bg: 'bg-blue-50',   text: 'Sunrise Villa can generate higher rental income. View insights.' },
  { icon: Star,        color: 'text-purple-600', bg: 'bg-purple-50', text: 'Your Property Health Score improved by 5 points this month.' },
];

// ─── Sub-Components ─────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
        <Home size={16} className="text-white" />
      </div>
      <span className="text-base font-bold tracking-tight text-gray-900 logo-text">
        Asset<span>Nest</span>
      </span>
    </div>
  );
}

function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside className="sidebar flex flex-col py-4 gap-1">
      {/* Logo */}
      <div className="px-4 mb-3">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => setActive(item.id)}
            className={`nav-item w-full text-left ${active === item.id ? 'active' : ''}`}
          >
            <item.icon size={16} className="flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.children && <ChevronDown size={13} className="ml-auto opacity-50" />}
          </button>
        ))}
      </nav>

      {/* Upgrade card */}
      <div className="px-3 mt-2">
        <div className="upgrade-card">
          <p className="text-xs font-bold text-gray-800 mb-0.5">Upgrade to Premium</p>
          <p className="text-[11px] text-gray-500 mb-2">Unlock advanced AI insights, more storage & premium features.</p>
          {/* Storage */}
          <div className="mb-2">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>Storage Used</span>
              <span>2.4 GB / 10 GB</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '24%' }} />
            </div>
          </div>
          <button id="upgrade-btn" className="btn-primary w-full justify-center text-xs py-1.5">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ currentView, setView }) {
  return (
    <header className="topbar">
      {/* Hamburger (mobile) */}
      <button id="topbar-menu-btn" className="text-gray-500 hover:text-gray-800 p-1">
        <Menu size={20} />
      </button>

      {/* View Switcher Badge Pills (For demonstration of design screens) */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
        <button
          onClick={() => setView('dashboard')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${currentView === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Dashboard View
        </button>
        <button
          onClick={() => setView('login')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${currentView === 'login' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Login Screen
        </button>
        <button
          onClick={() => setView('register')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${currentView === 'register' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Register Screen
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 max-w-xs ml-2 hidden md:flex">
        <Search size={14} className="text-gray-400" />
        <input
          id="topbar-search"
          type="text"
          placeholder="Search properties..."
          className="flex-1 bg-transparent text-xs outline-none text-gray-600 placeholder-gray-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notification */}
        <button id="notification-btn" className="relative text-gray-500 hover:text-gray-800 p-1">
          <Bell size={19} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
        </button>
        
        {/* Avatar / Profile */}
        <div id="user-avatar" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold select-none">
            RG
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">Rushi Gujarathi</p>
            <p className="text-[10px] text-gray-400">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="stat-card animate-fade-in-up">
      <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
        <Icon size={16} className={stat.color} />
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900 leading-tight">{stat.value}</p>
        <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
      </div>
      <p className="text-[10px] text-green-600 font-medium mt-auto">{stat.sub}</p>
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="hero-banner p-6 col-span-full lg:col-span-2 animate-fade-in-up">
      <div className="relative z-10 max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 leading-snug mb-2">
          All your properties.<br />
          Secure. Organized. <span className="text-primary">Smart.</span>
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Manage documents, track reminders, get AI insights and grow the value of your assets.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button id="add-property-btn" className="btn-primary">
            <Plus size={14} /> Add Property
          </button>
          <button id="ai-tools-btn" className="btn-secondary">
            <Maximize2 size={13} /> Explore AI Tools
          </button>
        </div>
      </div>
      <div className="absolute right-4 bottom-0 w-36 h-36 opacity-20 pointer-events-none select-none" aria-hidden>
        <Building2 size={144} className="text-primary" strokeWidth={0.5} />
      </div>
    </div>
  );
}

function AiFeatureCard({ feat }) {
  const Icon = feat.icon;
  return (
    <div className="card flex flex-col gap-2 cursor-pointer group hover:border-primary/30 relative">
      {feat.badge && (
        <span className="absolute top-3 right-3 badge badge-green text-[9px]">{feat.badge}</span>
      )}
      <div className={`w-8 h-8 rounded-lg ${feat.bg} flex items-center justify-center`}>
        <Icon size={15} className={feat.color} />
      </div>
      <p className="text-xs font-semibold text-gray-800">{feat.label}</p>
      <p className="text-[11px] text-gray-400 leading-relaxed">{feat.desc}</p>
      <span className="flex items-center gap-1 text-[11px] text-primary font-medium mt-auto group-hover:gap-2 transition-all">
        Explore <ArrowUpRight size={11} />
      </span>
    </div>
  );
}

function PropertyRow({ prop }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group cursor-pointer">
      <div className={`w-12 h-10 rounded-lg ${prop.color} flex items-center justify-center flex-shrink-0`}>
        <Building2 size={18} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 truncate">{prop.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-gray-400" />
          <p className="text-[10px] text-gray-400 truncate">{prop.loc}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`badge ${prop.type === 'Residential' ? 'badge-blue' : 'badge-orange'} text-[9px]`}>{prop.type}</span>
          <span className="text-[9px] text-gray-400">{prop.area} · {prop.status} · Added {prop.date}</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold text-gray-800">Est. Value</p>
        <p className="text-sm font-bold text-primary">{prop.value}</p>
        <p className="text-[10px] text-green-600">{prop.change}</p>
      </div>
    </div>
  );
}

function ReminderRow({ rem }) {
  const colors = { red: 'text-red-500', orange: 'text-orange-500', green: 'text-green-600' };
  const bgs    = { red: 'bg-red-50',    orange: 'bg-orange-50',    green: 'bg-green-50' };
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className={`w-7 h-7 rounded-full ${bgs[rem.urgency]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Bell size={12} className={colors[rem.urgency]} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800">{rem.title}</p>
        <p className="text-[10px] text-gray-400 truncate">{rem.prop}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[10px] text-gray-500">{rem.date}</p>
        <p className={`text-[10px] font-semibold ${colors[rem.urgency]}`}>{rem.due}</p>
      </div>
    </div>
  );
}

function DocVault() {
  return (
    <div className="card">
      <div className="section-header">
        <span className="section-title">Document Vault</span>
        <span className="section-link">View All</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {DOC_CATEGORIES.map((d) => {
          const Icon = d.icon;
          return (
            <div key={d.label} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className={`w-8 h-8 rounded-lg ${d.bg} flex items-center justify-center`}>
                <Icon size={14} className={d.color} />
              </div>
              <p className="text-[10px] font-semibold text-gray-700 text-center">{d.label}</p>
              <p className="text-[10px] text-gray-400">{d.count} Documents</p>
            </div>
          );
        })}
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>Storage Used</span>
          <span>2.4 GB of 10 GB — 24%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '24%' }} />
        </div>
      </div>
      <button id="upload-doc-btn" className="btn-primary w-full justify-center">
        <Upload size={13} /> Upload Document
      </button>
    </div>
  );
}

function AIInsightsRow() {
  return (
    <div className="card col-span-full">
      <div className="section-header">
        <span className="section-title flex items-center gap-1.5">
          <span className="dot-pulse w-2 h-2 bg-primary rounded-full inline-block" />
          AI Insights for You
        </span>
        <span className="section-link">See All Insights →</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AI_INSIGHTS.map((ins, i) => {
          const Icon = ins.icon;
          return (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg ${ins.bg} cursor-pointer hover:opacity-90 transition-opacity`}>
              <Icon size={14} className={`${ins.color} flex-shrink-0 mt-0.5`} />
              <p className="text-[11px] text-gray-700 leading-relaxed">{ins.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div className="page-content space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Welcome back, Rushi! 👋</h2>
        <p className="text-xs text-gray-400">Here's what's happening with your properties today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <HeroBanner />
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div>
        <p className="section-title mb-2">AI Powered Features</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AI_FEATURES.map((f) => (
            <AiFeatureCard key={f.label} feat={f} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="card">
          <div className="section-header">
            <span className="section-title">My Properties</span>
            <span className="section-link">View All</span>
          </div>
          {PROPERTIES.map((p) => <PropertyRow key={p.name} prop={p} />)}
          <button id="view-all-properties-btn" className="btn-secondary w-full justify-center mt-3 text-xs">
            View All Properties →
          </button>
        </div>

        <div className="card">
          <div className="section-header">
            <span className="section-title">Upcoming Reminders</span>
            <span className="section-link">View All</span>
          </div>
          {REMINDERS.map((r) => <ReminderRow key={r.title} rem={r} />)}
          <button id="view-all-reminders-btn" className="btn-secondary w-full justify-center mt-3 text-xs">
            View All Reminders →
          </button>
        </div>

        <DocVault />
      </div>

      <AIInsightsRow />
    </div>
  );
}

function PlaceholderPage({ label }) {
  return (
    <div className="page-content flex flex-col items-center justify-center gap-4 opacity-60">
      <Building2 size={48} className="text-primary" strokeWidth={1} />
      <div className="text-center">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-gray-400 mt-1">This module is coming in a future release.</p>
      </div>
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'login' | 'register'
  const [activeNav, setActiveNav] = useState('dashboard');

  if (currentView === 'login') {
    return (
      <div>
        <div className="bg-gray-800 text-white px-4 py-2 text-xs flex items-center justify-between">
          <span className="font-semibold">AssetNest Design Preview: Login Screen</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentView('register')} className="bg-gray-700 hover:bg-gray-600 px-2.5 py-1 rounded">
              Switch to Register
            </button>
            <button onClick={() => setCurrentView('dashboard')} className="bg-primary hover:bg-primary-dark px-2.5 py-1 rounded">
              Go to Dashboard
            </button>
          </div>
        </div>
        <Login
          onNavigateToRegister={() => setCurrentView('register')}
          onLoginSuccess={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div>
        <div className="bg-gray-800 text-white px-4 py-2 text-xs flex items-center justify-between">
          <span className="font-semibold">AssetNest Design Preview: Register Screen</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentView('login')} className="bg-gray-700 hover:bg-gray-600 px-2.5 py-1 rounded">
              Switch to Login
            </button>
            <button onClick={() => setCurrentView('dashboard')} className="bg-primary hover:bg-primary-dark px-2.5 py-1 rounded">
              Go to Dashboard
            </button>
          </div>
        </div>
        <Register
          onNavigateToLogin={() => setCurrentView('login')}
          onRegisterSuccess={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  const navObj = NAV_ITEMS.find((n) => n.id === activeNav);

  return (
    <div className="app-layout">
      <Sidebar active={activeNav} setActive={setActiveNav} />
      <div className="main-content">
        <Topbar currentView={currentView} setView={setCurrentView} />
        {activeNav === 'dashboard'
          ? <DashboardPage />
          : <PlaceholderPage label={navObj?.label ?? activeNav} />
        }
      </div>
    </div>
  );
}
