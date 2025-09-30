import { useState } from "react";
import {
  Cog8ToothIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// --- TYPE DEFINITIONS ---
interface CompanyProfile {
  name: string;
  address: string;
  contactEmail: string;
}

interface UserProfile {
  name: string;
  email: string;
}

interface NotificationSettings {
  lowStockAlerts: boolean;
  reportSummaries: boolean;
}

// --- MOCK DATA ---
const mockCompanyProfile: CompanyProfile = {
  name: "Auto Parts Pro",
  address: "123 Main Street, Johannesburg, 2000",
  contactEmail: "contact@autopartspro.co.za",
};

const mockUserProfile: UserProfile = {
  name: "Nicolette Mashaba",
  email: "nicolette@example.com",
};

const mockNotificationSettings: NotificationSettings = {
  lowStockAlerts: true,
  reportSummaries: false,
};

// --- MAIN COMPONENT ---
const Settings = () => {
  const [companyProfile, setCompanyProfile] = useState(mockCompanyProfile);
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [notifications, setNotifications] = useState(mockNotificationSettings);
  const [saving, setSaving] = useState(false);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API save
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Cog8ToothIcon className="h-8 w-8 mr-3 text-indigo-600" />
        Settings
      </h1>

      <div className="space-y-8">
        <SettingsCard
          icon={BuildingStorefrontIcon}
          title="Company Profile"
        >
          <div className="space-y-4">
            <InputField
              label="Company Name"
              name="name"
              value={companyProfile.name}
              onChange={handleCompanyChange}
            />
            <InputField
              label="Address"
              name="address"
              value={companyProfile.address}
              onChange={handleCompanyChange}
            />
            <InputField
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={companyProfile.contactEmail}
              onChange={handleCompanyChange}
            />
          </div>
        </SettingsCard>

        <SettingsCard icon={UserCircleIcon} title="User Profile">
          <div className="space-y-4">
            <InputField
              label="Full Name"
              name="name"
              value={userProfile.name}
              onChange={handleUserChange}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={userProfile.email}
              onChange={handleUserChange}
            />
          </div>
        </SettingsCard>

        <SettingsCard icon={BellIcon} title="Notifications">
          <div className="space-y-4">
            <Toggle
              label="Low Stock Alerts"
              name="lowStockAlerts"
              enabled={notifications.lowStockAlerts}
              onChange={handleNotificationChange}
              description="Receive an email when an item's stock is at or below its minimum level."
            />
            <Toggle
              label="Weekly Report Summaries"
              name="reportSummaries"
              enabled={notifications.reportSummaries}
              onChange={handleNotificationChange}
              description="Get a summary of sales and stock movements delivered to your inbox every Monday."
            />
          </div>
        </SettingsCard>

        <div className="flex justify-end pt-4">
          <motion.button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {saving ? "Saving..." : "Save All Settings"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SettingsCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div className="p-5 border-b border-gray-200 flex items-center">
      <Icon className="h-6 w-6 mr-3 text-indigo-500" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
    />
  </div>
);

const Toggle = ({
  label,
  name,
  enabled,
  onChange,
  description,
}: {
  label: string;
  name: string;
  enabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
}) => (
  <div className="flex items-start justify-between">
    <div>
      <h4 className="font-medium text-gray-800">{label}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={enabled}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

export default Settings;