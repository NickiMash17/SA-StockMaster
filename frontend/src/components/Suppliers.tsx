import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { suppliersAPI } from '../services/api';
import { Supplier } from '../types';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await suppliersAPI.getAll();
      setSuppliers(response.data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', address: '' });
  };

  const handleCreateNew = () => {
    setEditingSupplier(null);
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      phone: supplier.phone || '',
      address: supplier.address || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (supplierId: number) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        // await suppliersAPI.delete(supplierId); // Assuming a delete endpoint exists
        fetchSuppliers();
      } catch (error) {
        console.error('Failed to delete supplier:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSupplier) {
        // Update existing supplier - you'd need to add update endpoint
        // await suppliersAPI.update(editingSupplier.supplierId, formData);
      } else {
        // Create new supplier
        // await suppliersAPI.create(formData);
      }
      setShowForm(false);
      setEditingSupplier(null);
      resetForm();
      fetchSuppliers();
    } catch (error) {
      console.error('Failed to save supplier:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div className="flex justify-center p-8">Loading suppliers...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
        {/* UPDATED: Use the new btn-primary class */}
        <button
          onClick={handleCreateNew}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {/* Supplier Form Modal */}
      {(showForm || editingSupplier) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white card p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingSupplier ? 'Edit Supplier' : 'Create New Supplier'}
              </h2>
              <button onClick={() => { setShowForm(false); setEditingSupplier(null); }} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingSupplier(null); }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                {/* UPDATED: Use the new btn-primary class */}
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingSupplier ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supplier List - Use 'card' styling on container */}
      <div className="card overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {suppliers.map((supplier) => (
            <li key={supplier.supplierId} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {supplier.phone || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {supplier.address || 'N/A'}
                  </p>
                </div>
                {/* Action buttons (Keep existing action icon colors) */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition"
                    title="Edit Supplier"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.supplierId)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                    title="Delete Supplier"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {suppliers.length === 0 && (
          <p className="px-6 py-4 text-center text-gray-500">No suppliers have been added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Suppliers;