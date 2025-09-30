import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  ArrowDownTrayIcon, 
  ExclamationCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline';
import { dashboardAPI, productsAPI, stockMovementsAPI } from '../services/api';
import { DashboardStats, Product, StockMovement } from '../types';

interface DateRange {
  startDate: string;
  endDate: string;
}

const Reports = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'transactions'>('summary');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsRes, productsRes, movementsRes] = await Promise.all([
        dashboardAPI.getStats(),
        productsAPI.getAll(),
        stockMovementsAPI.getAll(undefined, dateRange.startDate, dateRange.endDate)
      ]);
      
      setStats(statsRes.data);
      setProducts(productsRes.data);
      setStockMovements(movementsRes.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      console.error('Error fetching report data:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyDateRange = () => {
    fetchData();
  };

  const handleDownload = async () => {
    try {
      // In a real app, this would trigger an API call to generate and download a report
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/reports/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeTab}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download report';
      setError(errorMessage);
    }
  };

  const tabClass = (tabName: string) => 
    `py-2 px-4 text-sm font-medium border-b-2 transition duration-150 ${
      activeTab === tabName
        ? 'border-emerald-600 text-emerald-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  const filteredMovements = stockMovements
    .filter(m => m.movementDate >= dateRange.startDate && m.movementDate <= dateRange.endDate)
    .sort((a, b) => new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime());

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600 flex items-center"
            >
              <RefreshIcon className="h-4 w-4 mr-1" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Reports</h1>
      
      {/* Date Range and Actions */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Date Range:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
                />
                <span className="text-gray-500 self-center hidden sm:inline">to</span>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  min={dateRange.startDate}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
                />
                <button
                  onClick={handleApplyDateRange}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={tabClass('summary')}
          >
            <ChartBarIcon className="h-5 w-5 mr-2 inline" />
            Summary
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={tabClass('transactions')}
          >
            <DocumentTextIcon className="h-5 w-5 mr-2 inline" />
            Transactions
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'summary' ? (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory Summary</h2>
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalProducts}</dd>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalCategories}</dd>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <dt className="text-sm font-medium text-gray-500 truncate">Suppliers</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalSuppliers}</dd>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                  <dd className="mt-1 text-3xl font-semibold text-red-600">{stats.lowStockItems}</dd>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMovements.length > 0 ? (
                    filteredMovements.map((movement) => (
                      <tr key={movement.movementId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(movement.movementDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {movement.product?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            movement.movementType === 'IN' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {movement.movementType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {movement.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {movement.reference || 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No transactions found in the selected date range.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;