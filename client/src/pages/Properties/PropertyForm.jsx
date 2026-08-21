import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

export default function PropertyForm({ property, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'residential',
    address: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    area: '',
    areaUnit: 'sq.ft',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    status: 'owned',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        propertyType: property.propertyType || 'residential',
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        country: property.country || 'India',
        postalCode: property.postalCode || '',
        area: property.area || '',
        areaUnit: property.areaUnit || 'sq.ft',
        purchaseDate: property.purchaseDate ? property.purchaseDate.split('T')[0] : '',
        purchasePrice: property.purchasePrice || '',
        currentValue: property.currentValue || '',
        status: property.status || 'owned',
        description: property.description || ''
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = property 
        ? `http://localhost:5000/api/properties/${property._id}` 
        : `http://localhost:5000/api/properties`;
      const method = property ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save property');
      }

      onSave(data.property);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">{property ? 'Edit Property' : 'Add New Property'}</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Basic Info */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Property Title *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="e.g. Green Valley Apartment" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Property Type</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="industrial">Industrial</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white">
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Street Address" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Area</label>
              <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="w-24">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Unit</label>
              <select name="areaUnit" value={formData.areaUnit} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white">
                <option value="sq.ft">sq.ft</option>
                <option value="sq.m">sq.m</option>
                <option value="acres">acres</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Purchase Date</label>
            <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Purchase Price</label>
            <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Current Value</label>
            <input type="number" name="currentValue" value={formData.currentValue} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Property'}
          </button>
        </div>
      </form>
    </div>
  );
}
