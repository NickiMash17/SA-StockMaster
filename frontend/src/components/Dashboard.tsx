// src/components/Dashboard.tsx
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  MapPinIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

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
  vat: (amount: number, rate: number = 0.15) => {
    const vatAmount = amount * rate;
    return {
      vat: formatters.currency(vatAmount),
      total: formatters.currency(amount + vatAmount),
      rate: `${(rate * 100).toFixed(0)}%`,
    };
  },
  percentage: (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  },
  number: (value: number) => {
    return new Intl.NumberFormat('en-ZA').format(value);
  },
  date: (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  },
  stockLevel: (current: number, minimum: number) => {
    const ratio = current / minimum;
    if (ratio <= 0.5) return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
    if (ratio <= 1.0) return { status: 'low', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (ratio <= 2.0) return { status: 'optimal', color: 'text-green-600', bg: 'bg-green-100' };
    return { status: 'excess', color: 'text-blue-600', bg: 'bg-blue-100' };
  },
  beeLevel: (score: number) => {
    if (score >= 80) return { level: 'Level 1', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { level: 'Level 2', color: 'text-green-500', bg: 'bg-green-50' };
    if (score >= 60) return { level: 'Level 3', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 50) return { level: 'Level 4', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    return { level: 'Non-Compliant', color: 'text-red-600', bg: 'bg-red-100' };
  },
};

// AI-Powered Analytics Engine
class InventoryAnalytics {
  static predictDemand(historicalData: number[], seasonality: number = 1.0): number {
    if (historicalData.length < 3) return historicalData[historicalData.length - 1] || 0;
    const trend = this.calculateTrend(historicalData);
    const movingAverage = this.calculateMovingAverage(historicalData, 3);
    const predicted = (movingAverage * trend * seasonality);
    return Math.max(0, Math.round(predicted));
  }
  static calculateTrend(data: number[]): number {
    if (data.length < 2) return 1;
    const recent = data.slice(-3);
    const older = data.slice(-6, -3);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg;
    return olderAvg > 0 ? recentAvg / olderAvg : 1;
  }
  static calculateMovingAverage(data: number[], period: number): number {
    if (data.length < period) return data.reduce((a, b) => a + b, 0) / data.length;
    const recent = data.slice(-period);
    return recent.reduce((a, b) => a + b, 0) / recent.length;
  }
  static optimizeReorderPoint(averageDemand: number, leadTime: number, safetyStock: number): number {
    return Math.round((averageDemand * leadTime) + safetyStock);
  }
  static calculateSafetyStock(maxLeadTime: number, avgLeadTime: number, maxDemand: number, avgDemand: number): number {
    return Math.round((maxLeadTime - avgLeadTime) * maxDemand + (maxDemand - avgDemand) * avgLeadTime);
  }
}

// Enterprise Dashboard Data Interfaces
interface InventoryMetrics {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  criticalStockItems: number;
  pendingOrders: number;
  recentMovements: number;
}
interface FinancialMetrics {
  totalRevenue: number;
  totalProfit: number;
  vatOwed: number;
  monthlyGrowth: number;
  profitMargin: number;
  averageOrderValue: number;
}
interface SupplierMetrics {
  totalSuppliers: number;
  activeSuppliers: number;
  averageLeadTime: number;
  supplierPerformance: number;
  pendingDeliveries: number;
  recentQuotes: number;
}
interface ComplianceMetrics {
  beeScore: number;
  beeLevel: string;
  vatCompliance: number;
  sarsSubmissions: number;
  poipiaCompliance: number;
  taxCertificateValid: boolean;
}
interface WarehouseMetrics {
  totalWarehouses: number;
  totalCapacity: number;
  utilizedCapacity: number;
  efficiency: number;
  transferRequests: number;
  pendingTransfers: number;
}
interface AIInsights {
  demandForecast: number[];
  reorderRecommendations: Array<{
    productId: string;
    productName: string;
    currentStock: number;
    recommendedOrder: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    estimatedCost: number;
  }>;
  priceOptimization: Array<{
    productId: string;
    currentPrice: number;
    recommendedPrice: number;
    expectedRevenue: number;
    confidence: number;
  }>;
  trendAnalysis: {
    topPerformers: string[];
    underperformers: string[];
    seasonalTrends: string[];
  };
}

// Enhanced StatCard Component with Professional Design and Better Fit
const StatCard: React.FC<{
  title: string;
  value: number | string;
  change?: { value: number; trend: 'up' | 'down' };
  icon: React.ElementType;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'emerald';
  isCurrency?: boolean;
  isPercentage?: boolean;
  subtitle?: string;
  description?: string;
}> = ({ title, value, change, icon: Icon, color, isCurrency, isPercentage, subtitle, description }) => {
  const colorConfig = {
    green: { 
      border: 'border-l-green-500', 
      bg: 'bg-green-50', 
      text: 'text-green-600',
      gradient: 'from-green-50 to-green-25',
      iconBg: 'bg-green-100'
    },
    blue: { 
      border: 'border-l-blue-500', 
      bg: 'bg-blue-50', 
      text: 'text-blue-600',
      gradient: 'from-blue-50 to-blue-25',
      iconBg: 'bg-blue-100'
    },
    emerald: { 
      border: 'border-l-emerald-500', 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-600',
      gradient: 'from-emerald-50 to-emerald-25',
      iconBg: 'bg-emerald-100'
    },
    purple: { 
      border: 'border-l-purple-500', 
      bg: 'bg-purple-50', 
      text: 'text-purple-600',
      gradient: 'from-purple-50 to-purple-25',
      iconBg: 'bg-purple-100'
    },
    indigo: { 
      border: 'border-l-indigo-500', 
      bg: 'bg-indigo-50', 
      text: 'text-indigo-600',
      gradient: 'from-indigo-50 to-indigo-25',
      iconBg: 'bg-indigo-100'
    },
    yellow: { 
      border: 'border-l-yellow-500', 
      bg: 'bg-yellow-50', 
      text: 'text-yellow-600',
      gradient: 'from-yellow-50 to-yellow-25',
      iconBg: 'bg-yellow-100'
    },
  };

  const safeColor = colorConfig[color] || colorConfig.blue;
  const trendColor = change?.trend === 'up' ? 'text-green-600' : 'text-red-600';
  const trendBg = change?.trend === 'up' ? 'bg-green-100' : 'bg-red-100';
  const trendIcon = change?.trend === 'up' ? 
    <ArrowTrendingUpIcon className="h-3 w-3" /> : 
    <ArrowTrendingDownIcon className="h-3 w-3" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl shadow-lg border-l-4 ${safeColor.border} bg-white hover:shadow-xl transition-all duration-300 group min-h-[140px] flex flex-col`}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${safeColor.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">
              {title}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${safeColor.iconBg} transition-colors duration-300 flex-shrink-0 ml-2`}>
            <Icon className={`h-4 w-4 ${safeColor.text}`} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-2">
            <div className="flex items-baseline space-x-1">
              <p className="text-2xl font-bold text-gray-900 truncate">
                {isCurrency ? formatters.currency(Number(value)) : 
                 isPercentage ? formatters.percentage(Number(value)) : 
                 formatters.number(Number(value))}
              </p>
              {subtitle && (
                <span className="text-xs font-medium text-gray-500 flex-shrink-0">{subtitle}</span>
              )}
            </div>

            {description && (
              <p className="text-xs text-gray-500 mt-1 truncate">{description}</p>
            )}
          </div>

          {change && (
            <div className="flex items-center mt-auto">
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${trendBg} ${trendColor}`}>
                {trendIcon}
                <span className="ml-1 font-semibold">{Math.abs(change.value)}%</span>
              </div>
              <p className="text-xs text-gray-500 ml-2 truncate">vs. last month</p>
            </div>
          )}
        </div>

        {/* Progress bar for percentage-based metrics */}
        {isPercentage && (
          <div className="mt-2 flex-shrink-0">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${safeColor.bg.replace('bg-', 'bg-').replace('-50', '-500')}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Subtle hover effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </motion.div>
  );
};

const QuickActionButton: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150 min-h-[80px]">
    <Icon className="h-5 w-5 text-gray-600 mb-2" />
    <span className="text-xs font-medium text-gray-700 text-center leading-tight">{label}</span>
  </button>
);

type TabName = 'overview' | 'analytics' | 'compliance' | 'suppliers' | 'warehouses';

const TabButton: React.FC<{
  name: TabName;
  activeTab: TabName;
  setActiveTab: (name: TabName) => void;
}> = ({ name, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(name)}
    className={`capitalize py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
      activeTab === name
        ? 'border-indigo-600 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {name}
  </button>
);

const OverviewTab: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
        <p className="text-gray-600">This is the overview tab. Key metrics and summaries will be displayed here.</p>
    </div>
);

const AnalyticsTab: React.FC<{ insights: AIInsights }> = ({ insights }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">Demand Forecast</h4>
                <p className="text-gray-600">Next 5 months: {insights.demandForecast.join(', ')}</p>
            </div>
            <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">Reorder Recommendations</h4>
                <ul>
                    {insights.reorderRecommendations.map(rec => (
                        <li key={rec.productId} className="text-gray-600">{rec.productName}: order {rec.recommendedOrder} (urgency: {rec.urgency})</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const ComplianceTab: React.FC<{ metrics: ComplianceMetrics }> = ({ metrics }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p className="text-gray-600">B-BBEE Score: {metrics.beeScore} ({metrics.beeLevel})</p>
                <p className="text-gray-600">VAT Compliance: {metrics.vatCompliance}%</p>
            </div>
            <div>
                <p className="text-gray-600">POPIA Compliance: {metrics.poipiaCompliance}%</p>
                <p className="text-gray-600">Tax Certificate: {metrics.taxCertificateValid ? 'Valid' : 'Expired'}</p>
            </div>
        </div>
    </div>
);

const SuppliersTab: React.FC<{ metrics: SupplierMetrics }> = ({ metrics }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Performance</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time Delivery</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Lead Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Office Supplies SA</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <span>92%</span>
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">5 days</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Excellent
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Tech Distributors Ltd</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <span>78%</span>
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">8 days</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Good
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const WarehousesTab: React.FC<{ metrics: WarehouseMetrics }> = ({ metrics: warehouseMetrics }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        icon={ArrowTrendingUpIcon}
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
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPinIcon className="h-5 w-5 text-green-600 mr-2" />
          Geographic Distribution
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Gauteng Region</span>
            <span className="font-medium text-gray-900">45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Western Cape</span>
            <span className="font-medium text-gray-900">30%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">KwaZulu-Natal</span>
            <span className="font-medium text-gray-900">25%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Professional Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Enterprise Data State
  const [inventoryMetrics, setInventoryMetrics] = useState<InventoryMetrics>({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    criticalStockItems: 5,
    pendingOrders: 12,
    recentMovements: 156,
  });

  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics>({
    totalRevenue: 1250000,
    totalProfit: 375000,
    vatOwed: 187500,
    monthlyGrowth: 12.5,
    profitMargin: 30.0,
    averageOrderValue: 1250,
  });

  const [supplierMetrics, setSupplierMetrics] = useState<SupplierMetrics>({
    totalSuppliers: 45,
    activeSuppliers: 38,
    averageLeadTime: 7.2,
    supplierPerformance: 87.5,
    pendingDeliveries: 8,
    recentQuotes: 15,
  });

  const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetrics>({
    beeScore: 72,
    beeLevel: 'Level 2',
    vatCompliance: 100,
    sarsSubmissions: 12,
    poipiaCompliance: 98.5,
    taxCertificateValid: true,
  });

  const [warehouseMetrics, setWarehouseMetrics] = useState<WarehouseMetrics>({
    totalWarehouses: 3,
    totalCapacity: 50000,
    utilizedCapacity: 38500,
    efficiency: 77.0,
    transferRequests: 6,
    pendingTransfers: 2,
  });

  const [aiInsights, setAiInsights] = useState<AIInsights>({
    demandForecast: [1250, 1380, 1420, 1350, 1480],
    reorderRecommendations: [
      {
        productId: 'SKU-001',
        productName: 'Premium Office Chairs',
        currentStock: 15,
        recommendedOrder: 50,
        urgency: 'high',
        estimatedCost: 25000,
      },
      {
        productId: 'SKU-002',
        productName: 'Ergonomic Keyboards',
        currentStock: 8,
        recommendedOrder: 30,
        urgency: 'critical',
        estimatedCost: 12000,
      },
    ],
    priceOptimization: [
      {
        productId: 'SKU-003',
        currentPrice: 450,
        recommendedPrice: 475,
        expectedRevenue: 23750,
        confidence: 85,
      },
    ],
    trendAnalysis: {
      topPerformers: ['Laptops', 'Monitors', 'Office Supplies'],
      underperformers: ['Printers', 'Fax Machines'],
      seasonalTrends: ['Q4 Peak Expected', 'Back-to-School Surge'],
    },
  });

  useEffect(() => {
    // Simulate loading with mock data instead of API call
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock inventory metrics
        setInventoryMetrics(prev => ({
          ...prev,
          totalProducts: 1250,
          totalValue: 2850000,
          lowStockItems: 23,
        }));
        
        setLastUpdated(new Date());
      } catch (error: any) {
        console.error('Error loading mock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();

    // Optional: Set up interval for periodic updates (with mock data)
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update timestamp every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading && !inventoryMetrics.totalValue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enterprise dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Enterprise Inventory Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm lg:text-base">Professional Inventory Management System • South African Compliant</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-xs font-medium">{formatters.date(lastUpdated)}</p>
            </div>
            <button className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
              <BellIcon className="h-4 w-4 text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
              <CogIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Enhanced Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Inventory Value"
            value={inventoryMetrics.totalValue}
            change={{ value: 8.2, trend: 'up' }}
            icon={CurrencyDollarIcon}
            color="emerald"
            isCurrency
            subtitle="ZAR"
            description="Current stock valuation"
          />
          <StatCard
            title="Active Products"
            value={inventoryMetrics.totalProducts}
            change={{ value: 5.1, trend: 'up' }}
            icon={ShoppingCartIcon}
            color="blue"
            description="SKUs in inventory"
          />
          <StatCard
            title="Monthly Revenue"
            value={financialMetrics.totalRevenue}
            change={{ value: 12.5, trend: 'up' }}
            icon={ChartBarIcon}
            color="purple"
            isCurrency
            description="Current month performance"
          />
          <StatCard
            title="Profit Margin"
            value={financialMetrics.profitMargin}
            change={{ value: 2.3, trend: 'up' }}
            icon={ArrowTrendingUpIcon}
            color="indigo"
            isPercentage
            description="Gross profit percentage"
          />
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
            Alerts & Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-red-800 text-sm">Critical Stock: {inventoryMetrics.criticalStockItems} items are below critical level.</p>
                <p className="text-xs text-red-600">Immediate action required to avoid stockouts.</p>
              </div>
              <XCircleIcon className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-yellow-800 text-sm">Low Stock: {inventoryMetrics.lowStockItems} items are running low.</p>
                <p className="text-xs text-yellow-600">Consider reordering soon.</p>
              </div>
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0" />
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-blue-800 text-sm">Pending Orders: {inventoryMetrics.pendingOrders} orders awaiting fulfillment.</p>
                <p className="text-xs text-blue-600">Ensure timely processing.</p>
              </div>
              <CheckCircleIcon className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickActionButton icon={DocumentTextIcon} label="New Sales Order" />
                <QuickActionButton icon={TruckIcon} label="New Purchase Order" />
                <QuickActionButton icon={UserGroupIcon} label="Add New Customer" />
                <QuickActionButton icon={BuildingOfficeIcon} label="Add New Supplier" />
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
            <TabButton name="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="analytics" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="compliance" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="suppliers" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="warehouses" activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'analytics' && <AnalyticsTab insights={aiInsights} />}
          {activeTab === 'compliance' && <ComplianceTab metrics={complianceMetrics} />}
          {activeTab === 'suppliers' && <SuppliersTab metrics={supplierMetrics} />}
          {activeTab === 'warehouses' && <WarehousesTab metrics={warehouseMetrics} />}
        </div>
      </div>
    </div>
  );
}