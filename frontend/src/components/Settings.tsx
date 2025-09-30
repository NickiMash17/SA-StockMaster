import { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { settingsAPI } from '../services/api';
import { Settings } from '../types';

const SettingsPanel = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    vatRegistered: true,
    vatRate: 0.15
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      setSettings(response.data);
      setFormData({
        vatRegistered: response.data.vatRegistered,
        vatRate: response.data.vatRate
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // await settingsAPI.update({ id: 1, ...formData } as Settings); // Assuming an update endpoint
      setSettings({ id: 1, ...formData } as Settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) return <div className="flex justify-center p-8">Loading settings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <CogIcon className="h-7 w-7 mr-2 text-emerald-600" />
        System Settings
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form Card */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Tax & VAT Configuration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* VAT Registered Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <label className="text-lg font-medium text-gray-700">
                Are you VAT Registered?
              </label>
              <button
                type="button"
                onClick={() => handleInputChange('vatRegistered', !formData.vatRegistered)}
                // Use Emerald for the ON state
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  formData.vatRegistered ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    formData.vatRegistered ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* VAT Rate Input */}
            <div className="space-y-2">
              <label htmlFor="vatRate" className="block text-sm font-medium text-gray-700">
                VAT Rate (Decimal, e.g., 0.15 for 15%)
              </label>
              <input
                type="number"
                id="vatRate"
                step="0.01"
                min="0"
                max="1"
                value={formData.vatRate}
                onChange={(e) => handleInputChange('vatRate', parseFloat(e.target.value) || 0)}
                required
                disabled={!formData.vatRegistered}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={fetchSettings}
                className="btn-secondary"
              >
                Reset
              </button>
              {/* UPDATED: Use the new btn-primary class */}
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>

        {/* VAT Preview Card */}
        <div className="card p-6 h-fit bg-emerald-50 border-t-4 border-emerald-500">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              VAT Preview
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={formData.vatRegistered ? 'text-emerald-700 font-bold' : 'text-gray-600'}>
                  {formData.vatRegistered ? 'VAT Registered' : 'Not Registered'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">VAT Rate:</span>
                <span className="font-bold">{(formData.vatRate * 100).toFixed(2)}%</span>
              </div>
              <hr className="border-emerald-200"/>
              <div className="flex justify-between text-base font-semibold text-gray-900">
                <span>Example Price (R 100.00 ex VAT):</span>
                <span>
                  {formData.vatRegistered
                    ? `R ${(100 * (1 + formData.vatRate)).toFixed(2)} incl. VAT`
                    : 'R 100.00 (no VAT)'
                  }
                </span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;