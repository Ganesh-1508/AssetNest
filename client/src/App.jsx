import React, { useState, useEffect } from 'react';
import {
  Home, Building2, FileText, Cpu, Bell, DollarSign, Wrench,
  Shield, BarChart3, Clock, Settings, HelpCircle, Menu, Search,
  Plus, ArrowUpRight, ChevronDown, ChevronRight, MapPin, Maximize2,
  Upload, Star, TrendingUp, AlertCircle, CheckCircle2, LogOut, UserCheck
} from 'lucide-react';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PropertyForm from './pages/Properties/PropertyForm';
import PropertyDetails from './pages/Properties/PropertyDetails';


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

function Topbar({ user, onLogout }) {
  return (
    <header className="topbar">
      {/* Hamburger (mobile) */}
      <button id="topbar-menu-btn" className="text-gray-500 hover:text-gray-800 p-1">
        <Menu size={20} />
      </button>

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
        <div id="user-avatar" className="flex items-center gap-2 cursor-pointer group relative">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold select-none">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">{user?.name || 'User'}</p>
            <p className="text-[10px] text-gray-400">Owner</p>
          </div>
          <button onClick={onLogout} className="ml-2 text-gray-500 hover:text-red-500 transition-colors" title="Logout">
            <LogOut size={16} />
          </button>
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

function PropertyRow({ prop, onClick }) {
  return (
    <div onClick={() => onClick && onClick(prop)} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
      <div className={`w-12 h-10 rounded-lg ${prop.color} flex items-center justify-center flex-shrink-0`}>
        <Building2 size={18} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 truncate">{prop.title}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-gray-400" />
          <p className="text-[10px] text-gray-400 truncate">{prop.city ? `${prop.city}, ${prop.state}` : prop.address || 'No location'}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`badge ${prop.propertyType === 'residential' ? 'badge-blue' : 'badge-orange'} text-[9px] capitalize`}>{prop.propertyType}</span>
          <span className="text-[9px] text-gray-400 capitalize">{prop.area ? `${prop.area} ${prop.areaUnit}` : 'N/A Area'} · {prop.status}</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold text-gray-800">Est. Value</p>
        <p className="text-sm font-bold text-primary">{prop.currentValue ? `₹${prop.currentValue.toLocaleString()}` : 'N/A'}</p>
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
function DashboardPage({ user, onAddProperty, onViewProperty, onViewAllProperties }) {
  const [properties, setProperties] = React.useState([]);
  const [loadingProps, setLoadingProps] = React.useState(true);

  React.useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties', { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProps(false);
      }
    };
    fetchProps();
  }, []);

  return (
    <div className="page-content space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h2>
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
            <button onClick={onViewAllProperties} className="section-link hover:underline">View All</button>
          </div>
          
          {loadingProps ? (
            <div className="py-8 text-center text-xs text-gray-400">Loading properties...</div>
          ) : properties.length > 0 ? (
            <>
              {properties.slice(0, 3).map((p) => <PropertyRow key={p._id} prop={p} onClick={onViewProperty} />)}
              <button onClick={onViewAllProperties} className="btn-secondary w-full justify-center mt-3 text-xs">
                View All Properties →
              </button>
            </>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <Building2 size={32} className="text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-600">No properties added yet.</p>
              <p className="text-xs text-gray-400 mb-4">Add your first property to track its value.</p>
              <button onClick={onAddProperty} className="btn-primary text-xs px-4 py-2">
                Add Your First Property
              </button>
            </div>
          )}
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
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'register'
  const [activeNav, setActiveNav] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoadingAuth(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      setCurrentView('login');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;
  }

  if (!user) {
    if (currentView === 'login') {
      return (
        <Login
          onNavigateToRegister={() => setCurrentView('register')}
          onLoginSuccess={(userData) => setUser(userData)}
        />
      );
    }

    if (currentView === 'register') {
      return (
        <Register
          onNavigateToLogin={() => setCurrentView('login')}
          onRegisterSuccess={(userData) => setUser(userData)}
        />
      );
    }
  }

  const navObj = NAV_ITEMS.find((n) => n.id === activeNav) || {};
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setActiveNav('add-property');
  };

  const handleEditProperty = (prop) => {
    setSelectedProperty(prop);
    setActiveNav('edit-property');
  };

  const handleViewProperty = (prop) => {
    setSelectedProperty(prop);
    setActiveNav('property-details');
  };

  const handlePropertySaved = (prop) => {
    handleViewProperty(prop);
  };

  const handlePropertyDeleted = () => {
    setActiveNav('dashboard');
  };

  return (
    <div className="app-layout">
      <Sidebar active={activeNav === 'add-property' || activeNav === 'edit-property' || activeNav === 'property-details' ? 'properties' : activeNav} setActive={setActiveNav} onLogout={handleLogout} />
      <div className="main-content">
        <Topbar user={user} onLogout={handleLogout} />
        {activeNav === 'dashboard' ? (
          <DashboardPage 
            user={user} 
            onAddProperty={handleAddProperty}
            onViewProperty={handleViewProperty}
            onViewAllProperties={() => setActiveNav('properties')}
          />
        ) : activeNav === 'add-property' || activeNav === 'edit-property' ? (
          <PropertyForm 
            property={selectedProperty} 
            onSave={handlePropertySaved} 
            onCancel={() => setActiveNav(selectedProperty ? 'property-details' : 'dashboard')} 
          />
        ) : activeNav === 'property-details' && selectedProperty ? (
          <PropertyDetails 
            propertyId={selectedProperty._id}
            onBack={() => setActiveNav('dashboard')}
            onEdit={handleEditProperty}
            onDeleteSuccess={handlePropertyDeleted}
          />
        ) : activeNav === 'properties' ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
              <button onClick={handleAddProperty} className="btn-primary flex items-center gap-2">
                <Plus size={16} /> Add Property
              </button>
            </div>
            {/* Using DashboardPage property view logic for simplicity, normally this would be a grid */}
            <DashboardPage user={user} onAddProperty={handleAddProperty} onViewProperty={handleViewProperty} onViewAllProperties={() => {}} />
          </div>
        ) : (
          <PlaceholderPage label={navObj.label || activeNav} />
        )}
      </div>
    </div>
  );
}
