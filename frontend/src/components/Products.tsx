import { useState, useEffect, ReactNode } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPE DEFINITIONS ---
interface Category {
  categoryId: number;
  name: string;
}

interface Supplier {
  supplierId: number;
  name: string;
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

// --- MOCK API DATA ---
const mockProducts: Product[] = [
  {
    productId: 1,
    name: "Tire - R16 All Season",
    sku: "TYR-R16-AS",
    categoryId: 1,
    supplierId: 1,
    costPriceExclVAT: 500,
    sellingPriceExclVAT: 800,
    quantityInStock: 15,
    minStockLevel: 10,
  },
  {
    productId: 2,
    name: "Oil Filter - Type B",
    sku: "OFLT-B",
    categoryId: 2,
    supplierId: 2,
    costPriceExclVAT: 50,
    sellingPriceExclVAT: 90,
    quantityInStock: 2,
    minStockLevel: 5,
  },
  {
    productId: 3,
    name: "Brake Pad Set - F150",
    sku: "BPS-F150",
    categoryId: 3,
    supplierId: 3,
    costPriceExclVAT: 300,
    sellingPriceExclVAT: 550,
    quantityInStock: 8,
    minStockLevel: 15,
  },
];

const mockCategories: Category[] = [
  { categoryId: 1, name: "Tires" },
  { categoryId: 2, name: "Filters" },
  { categoryId: 3, name: "Brakes" },
];

const mockSuppliers: Supplier[] = [
  { supplierId: 1, name: "AutoParts Inc" },
  { supplierId: 2, name: "Filter Masters" },
  { supplierId: 3, name: "Brake Systems Co" },
];

// --- MAIN COMPONENT ---
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenProductModal = (product: Product | null) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleOpenStockModal = (product: Product) => {
    setStockProduct(product);
    setShowStockModal(true);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.productId !== productId));
    }
  };

  const handleSaveProduct = (productData: Omit<Product, "productId">) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.productId === editingProduct.productId
            ? { ...editingProduct, ...productData }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        productId: Math.max(0, ...products.map((p) => p.productId)) + 1,
        ...productData,
      };
      setProducts([...products, newProduct]);
    }
    setShowProductModal(false);
  };

  const handleStockAdjustment = (
    productId: number,
    quantity: number,
    movementType: "IN" | "OUT"
  ) => {
    setProducts(
      products.map((p) =>
        p.productId === productId
          ? {
              ...p,
              quantityInStock:
                movementType === "IN"
                  ? p.quantityInStock + quantity
                  : p.quantityInStock - quantity,
            }
          : p
      )
    );
    setShowStockModal(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header onAddProduct={() => handleOpenProductModal(null)} />
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <ProductGrid
        products={filteredProducts}
        categories={categories}
        suppliers={suppliers}
        onEdit={handleOpenProductModal}
        onDelete={handleDelete}
        onAdjustStock={handleOpenStockModal}
      />

      <AnimatePresence>
        {showProductModal && (
          <ProductModal
            product={editingProduct}
            categories={categories}
            suppliers={suppliers}
            onClose={() => setShowProductModal(false)}
            onSave={handleSaveProduct}
          />
        )}
        {showStockModal && stockProduct && (
          <StockModal
            product={stockProduct}
            onClose={() => setShowStockModal(false)}
            onAdjust={handleStockAdjustment}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Header = ({ onAddProduct }: { onAddProduct: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onAddProduct}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 flex items-center"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Product
    </motion.button>
  </div>
);

const SearchBar = ({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch: (term: string) => void;
}) => (
  <div className="mb-8 relative">
    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search by name or SKU..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
    />
  </div>
);

const ProductGrid = ({
  products,
  categories,
  suppliers,
  onEdit,
  onDelete,
  onAdjustStock,
}: {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAdjustStock: (product: Product) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product.productId}
        product={product}
        category={
          categories.find((c) => c.categoryId === product.categoryId)?.name
        }
        supplier={
          suppliers.find((s) => s.supplierId === product.supplierId)?.name
        }
        onEdit={onEdit}
        onDelete={onDelete}
        onAdjustStock={onAdjustStock}
      />
    ))}
    {products.length === 0 && (
      <p className="text-center text-gray-500 col-span-full">
        No products found.
      </p>
    )}
  </div>
);

const ProductCard = ({
  product,
  category,
  supplier,
  onEdit,
  onDelete,
  onAdjustStock,
}: {
  product: Product;
  category?: string;
  supplier?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAdjustStock: (product: Product) => void;
}) => {
  const isLowStock = product.quantityInStock <= product.minStockLevel;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Category:</span> {category || "N/A"}
          </p>
          <p>
            <span className="font-medium">Supplier:</span> {supplier || "N/A"}
          </p>
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Cost:</span> R
            {product.costPriceExclVAT.toFixed(2)}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Selling:</span> R
            {product.sellingPriceExclVAT.toFixed(2)}
          </p>
        </div>
        <div
          className={`text-right ${
            isLowStock ? "text-red-600" : "text-green-600"
          }`}
        >
          <p className="font-bold text-lg">{product.quantityInStock}</p>
          <p className="text-xs">in stock (min: {product.minStockLevel})</p>
        </div>
      </div>
      <div className="p-3 bg-gray-100 flex justify-end space-x-2">
        <ActionButton
          icon={AdjustmentsHorizontalIcon}
          onClick={() => onAdjustStock(product)}
          label="Adjust Stock"
          color="indigo"
        />
        <ActionButton
          icon={PencilIcon}
          onClick={() => onEdit(product)}
          label="Edit"
          color="blue"
        />
        <ActionButton
          icon={TrashIcon}
          onClick={() => onDelete(product.productId)}
          label="Delete"
          color="red"
        />
      </div>
      {isLowStock && (
        <div className="bg-red-100 text-red-700 px-4 py-1 text-xs font-semibold flex items-center">
          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
          Low Stock Warning
        </div>
      )}
    </motion.div>
  );
};

const ActionButton = ({
  icon: Icon,
  onClick,
  label,
  color,
}: {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
  color: "indigo" | "blue" | "red";
}) => (
  <button
    onClick={onClick}
    title={label}
    className={`p-2 rounded-full text-${color}-600 hover:bg-${color}-100 hover:text-${color}-800 transition-colors`}
  >
    <Icon className="h-5 w-5" />
  </button>
);

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
  >
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
    >
      <div className="flex justify-between items-center p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </motion.div>
);

const ProductModal = ({
  product,
  categories,
  suppliers,
  onClose,
  onSave,
}: {
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (data: Omit<Product, "productId">) => void;
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    categoryId: product?.categoryId || 0,
    supplierId: product?.supplierId || 0,
    costPriceExclVAT: product?.costPriceExclVAT || 0,
    sellingPriceExclVAT: product?.sellingPriceExclVAT || 0,
    quantityInStock: product?.quantityInStock || 0,
    minStockLevel: product?.minStockLevel || 10,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      onClose={onClose}
      title={product ? "Edit Product" : "Create New Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value={0}>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value={0}>Select Supplier</option>
            {suppliers.map((sup) => (
              <option key={sup.supplierId} value={sup.supplierId}>
                {sup.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="costPriceExclVAT"
            placeholder="Cost Price"
            value={formData.costPriceExclVAT}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="sellingPriceExclVAT"
            placeholder="Selling Price"
            value={formData.sellingPriceExclVAT}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="minStockLevel"
            placeholder="Min Stock"
            value={formData.minStockLevel}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <motion.button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            whileHover={{ scale: 1.05 }}
          >
            {product ? "Update Product" : "Create Product"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

const StockModal = ({
  product,
  onClose,
  onAdjust,
}: {
  product: Product;
  onClose: () => void;
  onAdjust: (
    productId: number,
    quantity: number,
    movementType: "IN" | "OUT"
  ) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdjust(product.productId, quantity, movementType);
  };

  return (
    <Modal onClose={onClose} title={`Adjust Stock for ${product.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={movementType}
            onChange={(e) => setMovementType(e.target.value as "IN" | "OUT")}
            className="p-2 border rounded-md"
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <motion.button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            whileHover={{ scale: 1.05 }}
          >
            Submit Adjustment
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

export default Products;