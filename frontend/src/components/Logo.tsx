export const Logo = () => (
  <div className="flex items-center space-x-3 group">
    {/* Enhanced Logo Icon with gradient and animation */}
    <div className="relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      
      {/* Main icon container */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl p-2 transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7 text-white"
        >
          {/* Custom stock chart icon design */}
          <path d="M3 3h2v18H3V3zm4 6h2v12H7V9zm4-4h2v16h-2V5zm4 8h2v8h-2v-8zm4-6h2v14h-2V7z" opacity="0.7" />
          <path d="M4 8l3-3 4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Enhanced Text Logo */}
    <div className="flex flex-col">
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
          Stock
        </span>
        <span className="text-2xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
          Master
        </span>
      </div>
      <span className="text-[10px] font-medium text-indigo-300/60 tracking-wider uppercase -mt-1">
        Inventory Control
      </span>
    </div>
  </div>
);