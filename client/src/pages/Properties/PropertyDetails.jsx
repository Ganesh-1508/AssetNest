import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Trash2, MapPin, Calendar, DollarSign, Building2, Expand } from 'lucide-react';

export default function PropertyDetails({ propertyId, onBack, onEdit, onDeleteSuccess }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
          credentials: 'include'
        });
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch property details');
        }
        
        setProperty(data.property);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete property');
      }
      
      onDeleteSuccess();
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading property details...</div>;
  }

  if (error || !property) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error || 'Property not found'}</p>
        <button onClick={onBack} className="btn-secondary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={14} /> {property.city ? `${property.city}, ${property.state}` : 'Location not specified'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onEdit(property)} className="btn-secondary flex items-center gap-2">
            <Edit2 size={16} /> Edit
          </button>
          <button onClick={() => setShowConfirmDelete(true)} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-colors">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Property?</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete "{property.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirmDelete(false)} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2">
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">Property Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Property Type</p>
                <p className="text-sm font-semibold text-gray-900 capitalize flex items-center gap-2">
                  <Building2 size={14} className="text-primary" /> {property.propertyType}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                  property.status === 'owned' ? 'bg-green-100 text-green-800' :
                  property.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                  property.status === 'sold' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                }`}>
                  {property.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Area</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Expand size={14} className="text-primary" /> {property.area ? `${property.area} ${property.areaUnit}` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar size={14} className="text-primary" /> {property.purchaseDate ? new Date(property.purchaseDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {property.description || 'No description provided.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">Financials</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Purchase Price</p>
                <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  <DollarSign size={18} className="text-gray-400" />
                  {property.purchasePrice ? property.purchasePrice.toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Current Estimated Value</p>
                <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                  <DollarSign size={18} className="text-green-600" />
                  {property.currentValue ? property.currentValue.toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="section-title mb-3">Location</h3>
            <div className="text-sm text-gray-700 space-y-1">
              {property.address && <p>{property.address}</p>}
              {(property.city || property.state) && <p>{property.city}{property.city && property.state ? ', ' : ''}{property.state}</p>}
              {(property.postalCode || property.country) && <p>{property.postalCode} {property.country}</p>}
              {!property.address && !property.city && !property.state && !property.country && <p className="text-gray-400 text-xs">No address provided</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
