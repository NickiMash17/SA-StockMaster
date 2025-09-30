// App.tsx
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
import Products from './components/Products';
import Categories from './components/Categories';
import Suppliers from './components/Suppliers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { Logo } from './components/Logo';

// Navigation Data
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  component: React.FC;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: 'dashboard', icon: HomeIcon, component: Dashboard },
  { name: 'Products', href: 'products', icon: CubeIcon, component: Products },
  { name: 'Categories', href: 'categories', icon: TagIcon, component: Categories },
  { name: 'Suppliers', href: 'suppliers', icon: TruckIcon, component: Suppliers },
  { name: 'Reports', href: 'reports', icon: ChartBarIcon, component: Reports },
  { name: 'Settings', href: 'settings', icon: Cog6ToothIcon, component: Settings },
];

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar = ({ isOpen, onClose, currentPage, setCurrentPage }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
        onClick={onClose}
      />

      {/* Actual Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Logo />
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setCurrentPage(item.href);
                onClose();
              }}
              className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition duration-150 ease-in-out ${
                currentPage === item.href
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-6 w-6 ${
                  currentPage === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const CurrentComponent = navigation.find(item => item.href === currentPage)?.component || Dashboard;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Mobile Nav */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 lg:hidden px-4 shadow-sm">
          <button
            type="button"
            className="-ml-0.5 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {navigation.find(item => item.href === currentPage)?.name || 'StockMaster'}
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto focus:outline-none p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <CurrentComponent />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;