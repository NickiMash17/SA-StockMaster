// Core data types for the application

export interface Product {
  productId: number;
  name: string;
  sku: string;
  description?: string;
  barcode?: string;
  categoryId: number;
  supplierId: number;
  costPriceExclVAT: number;
  sellingPriceExclVAT: number;
  markupPercentage: number;
  quantityInStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  unitOfMeasure: string;
  brand: string;
  manufacturer: string;
  countryOfOrigin: string;
  harmonizedCode: string;
  isActive: boolean;
  isTaxable: boolean;
  isTrackable: boolean;
  createdAt: string;
  updatedAt: string;
  lastStockUpdate?: string;
  category?: Category;
  supplier?: Supplier;
  stockMovements?: StockMovement[];
  // Computed properties
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  needsReorder?: boolean;
  stockStatus?: string;
  profitMargin?: number;
  profitMarginPercentage?: number;
  stockValue?: number;
}

export interface Category {
  categoryId: number;
  name: string;
  description?: string;
  code?: string;
  parentCategoryId?: number;
  parentCategory?: Category;
  subCategories?: Category[];
  color?: string;
  icon?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
  // Computed properties
  productCount?: number;
  totalStockValue?: number;
  totalStockQuantity?: number;
}

export interface Supplier {
  supplierId: number;
  name: string;
  contactPerson?: string;
  phone: string;
  mobile?: string;
  email: string;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country: string;
  vatNumber?: string;
  registrationNumber?: string;
  beeStatus?: string;
  beeLevel?: number;
  paymentTerms?: string;
  creditLimit?: number;
  bankDetails?: string;
  bankName?: string;
  branchCode?: string;
  accountNumber?: string;
  accountType?: string;
  isActive: boolean;
  isPreferred: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
  purchaseOrders?: PurchaseOrder[];
  // Computed properties
  productCount?: number;
  totalPurchases?: number;
  fullAddress?: string;
  hasValidBEE?: boolean;
  isVATRegistered?: boolean;
}

export interface StockMovement {
  movementId: number;
  productId: number;
  movementType: 'IN' | 'OUT' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'ADJUSTMENT' | 'DAMAGED' | 'RETURNED';
  quantityChange: number;
  quantityBefore: number;
  quantityAfter: number;
  movementDate: string;
  reference: string;
  notes?: string;
  sourceDocument?: string;
  sourceDocumentId?: number;
  userId?: string;
  userName?: string;
  warehouseId?: number;
  fromWarehouseId?: number;
  toWarehouseId?: number;
  batchNumber?: string;
  unitCost?: number;
  totalCost?: number;
  isSystemGenerated?: boolean;
  product?: Product;
}

export interface Settings {
  settingsId: number;
  companyName: string;
  companyAddress?: string;
  companyCity?: string;
  companyProvince?: string;
  companyPostalCode?: string;
  companyCountry: string;
  companyPhone?: string;
  companyEmail?: string;
  companyVATNumber?: string;
  companyRegistration?: string;
  companyBEEStatus?: string;
  companyBEELevel?: number;
  defaultVATRate: number;
  currency: string;
  currencySymbol: string;
  defaultPaymentTerms?: string;
  defaultDeliveryMethod?: string;
  lowStockThreshold: number;
  reorderPointThreshold: number;
  autoGenerateSKU: boolean;
  trackExpiryDates: boolean;
  enableMultiWarehouse: boolean;
  enableBEETracking: boolean;
  enableVATCalculation: boolean;
  taxInvoiceFooter?: string;
  quoteFooter?: string;
  createdAt: string;
  updatedAt: string;
  // Computed properties
  fullCompanyAddress?: string;
  isVATRegistered?: boolean;
  isBEECompliant?: boolean;
}

// Dashboard and Metrics Interfaces
export interface DashboardStats {
  totalProducts: number;
  totalStockValue: number;
  lowStockCount: number;
  lowStockProducts: Array<{
    productId: number;
    name: string;
    sku: string;
    quantityInStock: number;
    minStockLevel: number;
  }>;
}

export interface InventoryMetrics {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  criticalStockItems: number;
  pendingOrders: number;
  recentMovements: number;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalProfit: number;
  vatOwed: number;
  monthlyGrowth: number;
  profitMargin: number;
  averageOrderValue: number;
}

export interface SupplierMetrics {
  totalSuppliers: number;
  activeSuppliers: number;
  averageLeadTime: number;
  supplierPerformance: number;
  pendingDeliveries: number;
  recentQuotes: number;
}

export interface ComplianceMetrics {
  beeScore: number;
  beeLevel: string;
  vatCompliance: number;
  sarsSubmissions: number;
  poipiaCompliance: number;
  taxCertificateValid: boolean;
}

export interface WarehouseMetrics {
  totalWarehouses: number;
  totalCapacity: number;
  utilizedCapacity: number;
  efficiency: number;
  transferRequests: number;
  pendingTransfers: number;
}

export interface AIInsights {
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

// Additional Enterprise Models
export interface PurchaseOrder {
  purchaseOrderId: number;
  supplierId: number;
  orderNumber: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'ORDERED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CANCELLED';
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  notes?: string;
  terms?: string;
  supplier?: Supplier;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  purchaseOrderItemId: number;
  purchaseOrderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity: number;
  product?: Product;
  purchaseOrder?: PurchaseOrder;
}

export interface SalesOrder {
  salesOrderId: number;
  customerId: number;
  orderNumber: string;
  orderDate: string;
  deliveryDate?: string;
  status: 'DRAFT' | 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  notes?: string;
  customer?: Customer;
  items?: SalesOrderItem[];
}

export interface SalesOrderItem {
  salesOrderItemId: number;
  salesOrderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
  salesOrder?: SalesOrder;
}

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country: string;
  vatNumber?: string;
  companyRegistration?: string;
  customerType?: string;
  paymentTerms?: string;
  creditStatus?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  salesOrders?: SalesOrder[];
}

export interface Warehouse {
  warehouseId: number;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  capacity: number;
  utilizedCapacity: number;
  managerName?: string;
  phone: string;
  email: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  // Computed properties
  utilizationPercentage?: number;
  availableCapacity?: number;
}
