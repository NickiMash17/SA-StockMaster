import axios, { AxiosError, AxiosResponse } from 'axios';
import { 
  Product, 
  Category, 
  Supplier, 
  Settings, 
  StockMovement,
  InventoryMetrics,
  FinancialMetrics,
  DashboardStats,
  SupplierMetrics,
  ComplianceMetrics,
  WarehouseMetrics,
  AIInsights
} from '../types';

// Use Vite's environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.error('Authentication required');
      } else if (error.response.status === 404) {
        console.error('The requested resource was not found');
      } else if (error.response.status >= 500) {
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const productsAPI = {
  getAll: (search?: string): Promise<AxiosResponse<Product[]>> => 
    api.get('/products', { params: { search } }),
  
  getById: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/products/${id}`),
    
  create: (product: Omit<Product, 'productId' | 'isLowStock'>): Promise<AxiosResponse<Product>> => 
    api.post('/products', product),
    
  update: (id: number, product: Partial<Product>): Promise<AxiosResponse<Product>> =>
    api.put(`/products/${id}`, product),
    
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/products/${id}`)
};

export const categoriesAPI = {
  getAll: (): Promise<AxiosResponse<Category[]>> => 
    api.get('/categories'),
    
  getById: (id: number): Promise<AxiosResponse<Category>> =>
    api.get(`/categories/${id}`),
    
  create: (category: Omit<Category, 'categoryId'>): Promise<AxiosResponse<Category>> =>
    api.post('/categories', category),
    
  update: (id: number, category: Partial<Category>): Promise<AxiosResponse<Category>> =>
    api.put(`/categories/${id}`, category),
    
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/categories/${id}`)
};

export const suppliersAPI = {
  getAll: (): Promise<AxiosResponse<Supplier[]>> => 
    api.get('/suppliers'),
    
  getById: (id: number): Promise<AxiosResponse<Supplier>> =>
    api.get(`/suppliers/${id}`),
    
  create: (supplier: Omit<Supplier, 'supplierId'>): Promise<AxiosResponse<Supplier>> =>
    api.post('/suppliers', supplier),
    
  update: (id: number, supplier: Partial<Supplier>): Promise<AxiosResponse<Supplier>> =>
    api.put(`/suppliers/${id}`, supplier),
    
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/suppliers/${id}`)
};

export const stockMovementsAPI = {
  getAll: (productId?: number, startDate?: string, endDate?: string): Promise<AxiosResponse<StockMovement[]>> =>
    api.get('/stockmovements', { 
      params: { 
        productId, 
        startDate, 
        endDate,
        _sort: 'movementDate',
        _order: 'desc'
      } 
    }),

  getById: (id: number): Promise<AxiosResponse<StockMovement>> =>
    api.get(`/stockmovements/${id}`),

  create: (movement: Omit<StockMovement, 'movementId'>): Promise<AxiosResponse<StockMovement>> =>
    api.post('/stockmovements', movement),

  getSummary: (productId?: number, period: string = '30d'): Promise<AxiosResponse<{in: number, out: number}>> =>
    api.get('/stockmovements/summary', {
      params: { productId, period }
    }),
};

export const dashboardAPI = {
  getDashboardStats: (): Promise<AxiosResponse<DashboardStats>> =>
    api.get('/dashboard/stats'),
    
  getInventoryMetrics: (): Promise<AxiosResponse<InventoryMetrics>> =>
    api.get('/dashboard/inventory-metrics'),
    
  getFinancialMetrics: (): Promise<AxiosResponse<FinancialMetrics>> =>
    api.get('/dashboard/financial-metrics'),
    
  getSupplierMetrics: (): Promise<AxiosResponse<SupplierMetrics>> =>
    api.get('/dashboard/supplier-metrics'),
    
  getComplianceMetrics: (): Promise<AxiosResponse<ComplianceMetrics>> =>
    api.get('/dashboard/compliance-metrics'),
    
  getWarehouseMetrics: (): Promise<AxiosResponse<WarehouseMetrics>> =>
    api.get('/dashboard/warehouse-metrics'),
    
  getAIInsights: (): Promise<AxiosResponse<AIInsights>> =>
    api.get('/dashboard/ai-insights'),
};

export const settingsAPI = {
  getSettings: (): Promise<AxiosResponse<Settings>> =>
    api.get('/settings'),
    
  update: (settings: Settings): Promise<AxiosResponse<Settings>> => 
    api.put('/settings', settings),
};

// Export the configured axios instance in case it's needed directly
export default api;