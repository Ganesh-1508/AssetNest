import re

with open('client/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports
import_str = """
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PropertyForm from './pages/Properties/PropertyForm';
import PropertyDetails from './pages/Properties/PropertyDetails';
"""
content = content.replace("import Login from './pages/Auth/Login';\nimport Register from './pages/Auth/Register';", import_str)

# 2. Modify PropertyRow to accept onClick
prop_row_target = """function PropertyRow({ prop }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group cursor-pointer">"""
prop_row_replacement = """function PropertyRow({ prop, onClick }) {
  return (
    <div onClick={() => onClick && onClick(prop)} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">"""
content = content.replace(prop_row_target, prop_row_replacement)

# Update prop values in PropertyRow to match real data structure
prop_row_inner_target = """
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
"""

prop_row_inner_replacement = """
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
"""
content = content.replace(prop_row_inner_target, prop_row_inner_replacement)

# Update DashboardPage
dashboard_target = """function DashboardPage({ user }) {
  return (
    <div className="page-content space-y-4">"""

dashboard_replacement = """function DashboardPage({ user, onAddProperty, onViewProperty, onViewAllProperties }) {
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
    <div className="page-content space-y-4">"""
content = content.replace(dashboard_target, dashboard_replacement)

# Replace PROPERTIES mock array usage
prop_section_target = """          <div className="section-header">
            <span className="section-title">My Properties</span>
            <span className="section-link">View All</span>
          </div>
          {PROPERTIES.map((p) => <PropertyRow key={p.name} prop={p} />)}
          <button id="view-all-properties-btn" className="btn-secondary w-full justify-center mt-3 text-xs">
            View All Properties →
          </button>"""

prop_section_replacement = """          <div className="section-header">
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
          )}"""
content = content.replace(prop_section_target, prop_section_replacement)

# Also fix the weird arrow character from cat output just in case
content = content.replace("View All Properties +'", "View All Properties →")
content = content.replace("See All Insights +'", "See All Insights →")
content = content.replace("View All Reminders +'", "View All Reminders →")


# Update App
app_root_target = """  const navObj = NAV_ITEMS.find((n) => n.id === activeNav);

  return (
    <div className="app-layout">
      <Sidebar active={activeNav} setActive={setActiveNav} onLogout={handleLogout} />
      <div className="main-content">
        <Topbar user={user} onLogout={handleLogout} />
        {activeNav === 'dashboard'
          ? <DashboardPage user={user} />
          : <PlaceholderPage label={navObj?.label ?? activeNav} />
        }
      </div>
    </div>
  );
}"""

app_root_replacement = """  const navObj = NAV_ITEMS.find((n) => n.id === activeNav) || {};
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
}"""
content = content.replace(app_root_target, app_root_replacement)

with open('client/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
