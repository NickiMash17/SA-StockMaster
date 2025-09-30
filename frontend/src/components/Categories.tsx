import { useState, useEffect, ReactNode } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPE DEFINITIONS ---
interface Category {
  categoryId: number;
  name: string;
}

// --- MOCK API DATA ---
const mockCategories: Category[] = [
  { categoryId: 1, name: "Tires" },
  { categoryId: 2, name: "Filters" },
  { categoryId: 3, name: "Brakes" },
  { categoryId: 4, name: "Batteries" },
  { categoryId: 5, name: "Engine Parts" },
];

// --- MAIN COMPONENT ---
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);

  const handleOpenModal = (category: Category | null) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = (categoryId: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.categoryId !== categoryId));
    }
  };

  const handleSave = (categoryData: { name: string }) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.categoryId === editingCategory.categoryId
            ? { ...editingCategory, ...categoryData }
            : c
        )
      );
    } else {
      const newCategory: Category = {
        categoryId: Math.max(0, ...categories.map((c) => c.categoryId)) + 1,
        ...categoryData,
      };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header onAddCategory={() => handleOpenModal(null)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.categoryId}
            category={category}
            onEdit={() => handleOpenModal(category)}
            onDelete={() => handleDelete(category.categoryId)}
          />
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <CategoryModal
            category={editingCategory}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Header = ({ onAddCategory }: { onAddCategory: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onAddCategory}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 flex items-center"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Category
    </motion.button>
  </div>
);

const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow"
  >
    <div className="flex items-start">
      <div className="bg-indigo-100 p-3 rounded-full mr-4">
        <TagIcon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mt-2">{category.name}</h3>
    </div>
    <div className="flex justify-end space-x-2 mt-4">
      <ActionButton icon={PencilIcon} onClick={onEdit} label="Edit" color="blue" />
      <ActionButton icon={TrashIcon} onClick={onDelete} label="Delete" color="red" />
    </div>
  </motion.div>
);

const ActionButton = ({
  icon: Icon,
  onClick,
  label,
  color,
}: {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
  color: "blue" | "red";
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
      className="bg-white rounded-xl shadow-2xl w-full max-w-md"
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

const CategoryModal = ({
  category,
  onClose,
  onSave,
}: {
  category: Category | null;
  onClose: () => void;
  onSave: (data: { name: string }) => void;
}) => {
  const [name, setName] = useState(category?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name });
    }
  };

  return (
    <Modal
      onClose={onClose}
      title={category ? "Edit Category" : "Create New Category"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
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
            {category ? "Update Category" : "Create Category"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

export default Categories;