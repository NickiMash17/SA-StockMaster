// src/components/Dashboard.tsx
import { motion } from "framer-motion";
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

// Stat Card Data
const stats = [
  {
    name: "Total Users",
    stat: "1,245",
    change: "12%",
    changeType: "increase",
    icon: UsersIcon,
  },
  {
    name: "Total Revenue",
    stat: "$54,200",
    change: "8%",
    changeType: "increase",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Total Orders",
    stat: "320",
    change: "2%",
    changeType: "decrease",
    icon: ShoppingCartIcon,
  },
  {
    name: "Feedback",
    stat: "89%",
    change: "5%",
    changeType: "increase",
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

// Main Dashboard Component
export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.name}
            name={item.name}
            stat={item.stat}
            change={item.change}
            changeType={item.changeType}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Charts & Table */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Trend
          </h2>
          <div className="h-80 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
            <span className="text-lg">📈 Chart Placeholder</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-xl p-6"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <ul className="space-y-4">
            <TransactionItem name="John Doe" amount="$120" status="Completed" />
            <TransactionItem
              name="Jane Smith"
              amount="$85"
              status="Pending"
            />
            <TransactionItem
              name="Chris Johnson"
              amount="$40"
              status="Failed"
            />
            <TransactionItem
              name="Sarah Wilson"
              amount="$250"
              status="Completed"
            />
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  name: string;
  stat: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ElementType;
}

function StatCard({
  name,
  stat,
  change,
  changeType,
  icon: Icon,
}: StatCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-white p-5 shadow-lg"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-indigo-500" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-gray-500">
              {name}
            </dt>
            <dd className="text-2xl font-bold text-gray-900">{stat}</dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 flex items-baseline">
        <div
          className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium ${
            changeType === "increase"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {changeType === "increase" ? (
            <ArrowUpIcon
              className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ArrowDownIcon
              className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {" "}
            {changeType === "increase" ? "Increased" : "Decreased"} by{" "}
          </span>
          {change}
        </div>
      </div>
    </motion.div>
  );
}

// Transaction Item Component
interface TransactionItemProps {
  name: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
}

function TransactionItem({ name, amount, status }: TransactionItemProps) {
  const statusClasses = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{amount}</p>
      </div>
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    </li>
  );
}