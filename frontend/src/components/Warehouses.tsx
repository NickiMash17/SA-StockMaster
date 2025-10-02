import { useState, useEffect } from 'react';
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  TruckIcon,
  TrendingUpIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Professional South African Business Formatters
const formatters = {
    currency: (amount: number) => {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    },
    number: (value: number) => {
        return new Intl.NumberFormat('en-ZA').format(value);
    },
    date: (date: Date) => {
        return new Intl.DateTimeFormat('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(date);
      },
};

interface WarehouseMetrics {
  totalWarehouses: number;
  totalCapacity: number;
  utilizedCapacity: number;
  efficiency: number;
  transferRequests: number;
  pendingTransfers: number;
}

const StatCard = ({ title, value, icon: Icon, color, isCurrency, isPercentage, change }: { title: string, value: any, icon: any, color: string, isCurrency?: boolean, isPercentage?: boolean, change?: { value: number, trend: 'up' | 'down' } }) => {
    const colors = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600',
      yellow: 'text-yellow-600',
    };
  
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-5 border border-gray-100"
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center">
          <div className={`rounded-full p-3 bg-${color}-100`}>
            <Icon className={`h-6 w-6 ${colors[color]}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {isCurrency ? formatters.currency(value) : value}
              {isPercentage && '%'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

export default function Warehouses() {
  const [isLoading, setIsLoading] = useState(true);
  const [warehouseMetrics, setWarehouseMetrics] = useState<WarehouseMetrics>({
    totalWarehouses: 3,
    totalCapacity: 50000,
    utilizedCapacity: 38500,
    efficiency: 77.0,
    transferRequests: 6,
    pendingTransfers: 2,
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Warehouse Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Warehouses"
              value={warehouseMetrics.totalWarehouses}
              icon={BuildingOfficeIcon}
              color="blue"
            />
            <StatCard
              title="Total Capacity"
              value={warehouseMetrics.totalCapacity}
              icon={ChartBarIcon}
              color="green"
            />
            <StatCard
              title="Utilized Capacity"
              value={warehouseMetrics.utilizedCapacity}
              icon={TrendingUpIcon}
              color="yellow"
            />
            <StatCard
              title="Efficiency Rate"
              value={warehouseMetrics.efficiency}
              icon={CheckCircleIcon}
              color="purple"
              isPercentage
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Warehouse Utilization</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Johannesburg Main Warehouse</span>
                  <span className="text-sm font-medium text-gray-900">85% Full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Cape Town Distribution Center</span>
                  <span className="text-sm font-medium text-gray-900">72% Full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Durban Regional Hub</span>
                  <span className="text-sm font-medium text-gray-900">68% Full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="h-5 w-5 text-indigo-600 mr-2" />
                Active Transfers
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">JHB → CPT</p>
                    <p className="text-sm text-gray-600">Office Chairs (50 units)</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">In Transit</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">DBN → JHB</p>
                    <p className="text-sm text-gray-600">Keyboards (25 units)</p>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">Pending</span>
                </div>
              </div>
            </div>
            <div className="bg-w
hite rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
              {/* Placeholder for a map component */}
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}