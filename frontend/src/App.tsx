import { useState } from 'react';
import { 
  HomeIcon, 
  TagIcon, 
  CubeIcon, 
  TruckIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Dashboard from './components/Dashboard';

// --- Navigation Data (Mocked for now) ---
const navigation = [
  { name: 'Dashboard', href: '#dashboard', icon: HomeIcon, current: true },
  { name: 'Products', href: '#products', icon: CubeIcon, current: false },
  { name: 'Categories', href: '#categories', icon: TagIcon, current: false },
  { name: 'Suppliers', href: '#suppliers', icon: TruckIcon, current: false },
  { name: 'Reports', href: '#reports', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '#settings', icon: Cog6ToothIcon, current: false },
];

// --- Sidebar Component ---
// Note: This component uses CSS classes defined by Tailwind CSS.
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-75 transition-opacity lg:hidden ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
        onClick={onClose}
      />

      {/* Actual Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-auto`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">SA-StockMaster</h1>
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                ${item.current ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                group flex items-center px-2 py-2 text-sm font-medium rounded-md transition duration-150 ease-in-out
              `}
            >
              <item.icon
                className={`
                  ${item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                  mr-3 flex-shrink-0 h-6 w-6 transition duration-150 ease-in-out
                `}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // State to handle view changes

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Mobile Nav */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 lg:hidden px-4">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">SA-StockMaster</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          {/* We only render the Dashboard component for now */}
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
