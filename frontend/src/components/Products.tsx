import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Define types locally since imports might be missing
interface Category {
  categoryId: number;
  name: string;
}

interface Supplier {
  supplierId: number;
  name: string;
  phone?: string;
  address?: string;
}

interface Product {
  productId: number;
  name: string;
  sku: string;
  categoryId: number;
  supplierId: number;
  costPriceExclVAT: number;
  sellingPriceExclVAT: number;
  quantityInStock: number;
  minStockLevel: number;
}

interface StockMovement {
  movementId: number;
  productId: number;
  movementDate: string;
  movementType: 'IN' | 'OUT';
  quantity: number;
  reference: string;
  product?: Product;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: 0,
    supplierId: 0,
    costPriceExclVAT: 0,
    sellingPriceExclVAT: 0,
    quantityInStock: 0,
    minStockLevel: 10
  });

  const [stockFormData, setStockFormData] = useState({
    quantity: 0,
    movementType: 'IN' as 'IN' | 'OUT',
    reference: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Mock API functions since the actual API might not exist
  const mockProductsAPI = {
    getAll: () => Promise.resolve({
      data: [
        { productId: 1, name: 'Tire - R16 All Season', sku: 'TYR-R16-AS', categoryId: 1, supplierId: 1, costPriceExclVAT: 500, sellingPriceExclVAT: 800, quantityInStock: 15, minStockLevel: 10 },
        { productId: 2, name: 'Oil Filter - Type B', sku: 'OFLT-B', categoryId: 2, supplierId: 2, costPriceExclVAT: 50, sellingPriceExclVAT: 90, quantityInStock: 2, minStockLevel: 5 },
        { productId: 3, name: 'Brake Pad Set - F150', sku: 'BPS-F150', categoryId: 3, supplierId: 3, costPriceExclVAT: 300, sellingPriceExclVAT: 550, quantityInStock: 8, minStockLevel: 15 },
      ]
    })
  };

  const mockCategoriesAPI = {
    getAll: () => Promise.resolve({
      data: [
        { categoryId: 1, name: 'Tires' },
        { categoryId: 2, name: 'Filters' },
        { categoryId: 3, name: 'Brakes' },
        { categoryId: 4, name: 'Batteries' },
      ]
    })
  };

  const mockSuppliersAPI = {
    getAll: () => Promise.resolve({
      data: [
        { supplierId: 1, name: 'AutoParts Inc', phone: '011-123-4567', address: '123 Main St' },
        { supplierId: 2, name: 'Filter Masters', phone: '011-234-5678', address: '456 Oak Ave' },
        { supplierId: 3, name: 'Brake Systems Co', phone: '011-345-6789', address: '789 Pine Rd' },
      ]
    })
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // Use mock APIs instead of imported ones
      const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
        mockProductsAPI.getAll(),
        mockCategoriesAPI.getAll(),
        mockSuppliersAPI.getAll()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Set fallback data
      setProducts([
        { productId: 1, name: 'Tire - R16 All Season', sku: 'TYR-R16-AS', categoryId: 1, supplierId: 1, costPriceExclVAT: 500, sellingPriceExclVAT: 800, quantityInStock: 15, minStockLevel: 10 },
        { productId: 2, name: 'Oil Filter - Type B', sku: 'OFLT-B', categoryId: 2, supplierId: 2, costPriceExclVAT: 50, sellingPriceExclVAT: 90, quantityInStock: 2, minStockLevel: 5 },
      ]);
      setCategories([
        { categoryId: 1, name: 'Tires' },
        { categoryId: 2, name: 'Filters' },
      ]);
      setSuppliers([
        { supplierId: 1, name: 'AutoParts Inc' },
        { supplierId: 2, name: 'Filter Masters' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      categoryId: 0,
      supplierId: 0,
      costPriceExclVAT: 0,
      sellingPriceExclVAT: 0,
      quantityInStock: 0,
      minStockLevel: 10
    });
  };

  const handleCreateNew = () => {
    setEditingProduct(null);
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      costPriceExclVAT: product.costPriceExclVAT,
      sellingPriceExclVAT: product.sellingPriceExclVAT,
      quantityInStock: product.quantityInStock,
      minStockLevel: product.minStockLevel || 10
    });
    setShowForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Simulate delete
        setProducts(products.filter(p => p.productId !== productId));
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p.productId === editingProduct.productId 
            ? { ...p, ...formData }
            : p
        ));
      } else {
        // Create new product
        const newProduct: Product = {
          productId: Math.max(0, ...products.map(p => p.productId)) + 1,
          ...formData
        };
        setProducts([...products, newProduct]);
      }
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleStockAdjustment = (product: Product) => {
    setStockProduct(product);
    setStockFormData({
      quantity: 0,
      movementType: 'IN',
      reference: ''
    });
    setShowStockForm(true);
  };

  const handleStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockProduct) return;
    try {
      // Update stock quantity
      setProducts(products.map(p => 
        p.productId === stockProduct.productId 
          ? { 
              ...p, 
              quantityInStock: stockFormData.movementType === 'IN' 
                ? p.quantityInStock + stockFormData.quantity
                : p.quantityInStock - stockFormData.quantity
            }
          : p
      ));
      
      setShowStockForm(false);
      setStockProduct(null);
    } catch (error) {
      console.error('Failed to adjust stock:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-8">Loading products...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products ({products.length})</h1>
        <button
          onClick={handleCreateNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="mb-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Product Form Modal */}
      {(showForm || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h2>
              <button onClick={() => { setShowForm(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={0}>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                  ))}
                </select>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={0}>Select Supplier</option>
                  {suppliers.map(sup => (
                    <option key={sup.supplierId} value={sup.supplierId}>{sup.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="costPriceExclVAT"
                  placeholder="Cost Price (ex VAT)"
                  value={formData.costPriceExclVAT}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="number"
                  name="sellingPriceExclVAT"
                  placeholder="Selling Price (ex VAT)"
                  value={formData.sellingPriceExclVAT}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="number"
                  name="minStockLevel"
                  placeholder="Min Stock Level"
                  value={formData.minStockLevel}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingProduct(null); }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockForm && stockProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Adjust Stock for: {stockProduct.name}
              </h2>
              <button onClick={() => setShowStockForm(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleStockSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <select
                  name="movementType"
                  value={stockFormData.movementType}
                  onChange={(e) => setStockFormData(prev => ({ ...prev, movementType: e.target.value as 'IN' | 'OUT' }))}
                  required
                  className="w-1/3 border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="IN">Stock In</option>
                  <option value="OUT">Stock Out</option>
                </select>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={stockFormData.quantity}
                  onChange={(e) => setStockFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  required
                  min="1"
                  className="w-2/3 border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <input
                type="text"
                name="reference"
                placeholder="Reference (e.g., GRN number, Sale ID)"
                value={stockFormData.reference}
                onChange={(e) => setStockFormData(prev => ({ ...prev, reference: e.target.value }))}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStockForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Submit Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredProducts.map((product) => {
            const isLowStock = product.quantityInStock <= product.minStockLevel;
            const statusClass = isLowStock 
              ? 'text-yellow-600'
              : 'text-green-600';

            return (
              <li key={product.productId} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    <div className="mt-1 flex space-x-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Category:</span> {categories.find(c => c.categoryId === product.categoryId)?.name || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Supplier:</span> {suppliers.find(s => s.supplierId === product.supplierId)?.name || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Stock and Price Information Block */}
                  <div className="text-right mx-4 min-w-[200px]">
                    <div className="flex justify-end space-x-4 text-sm">
                      <div className="text-gray-700">
                        <span className="font-medium">Cost:</span> R {product.costPriceExclVAT.toFixed(2)}
                      </div>
                      <div className="text-gray-700">
                        <span className="font-medium">Selling:</span> R {product.sellingPriceExclVAT.toFixed(2)}
                      </div>
                    </div>
                    <div className={`mt-1 font-semibold ${statusClass}`}>
                      Stock: {product.quantityInStock} (Min: {product.minStockLevel})
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStockAdjustment(product)}
                      className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition"
                      title="Adjust Stock"
                    >
                      <AdjustmentsHorizontalIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition"
                      title="Edit Product"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete Product"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {filteredProducts.length === 0 && (
          <p className="px-6 py-4 text-center text-gray-500">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Products;