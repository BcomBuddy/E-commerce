import React from 'react';
import { Home, ShoppingCart, Globe, Shield, CreditCard, Smartphone, LogOut } from 'lucide-react';
import { signOut } from '../firebase/auth';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange, onLogout }) => {
  const modules = [
    { id: 'home', title: 'Home', icon: Home },
    { id: 'module1', title: 'Module I: Introduction to E-Commerce', icon: Globe },
    { id: 'module2', title: 'Module II: E-Retailing & B2B', icon: ShoppingCart },
    { id: 'module3', title: 'Module III: E-Commerce Security', icon: Shield },
    { id: 'module4', title: 'Module IV: Electronic Payment Systems', icon: CreditCard },
    { id: 'module5', title: 'Module V: Mobile Commerce', icon: Smartphone },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">E-Commerce Simulator</h1>
        <p className="text-sm text-gray-600 mt-1">3rd Year – 5th Semester</p>
      </div>
      
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Course Modules</h2>
      </div>
      
      <nav className="p-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-lg text-left transition-all duration-200 mb-2 ${
                currentModule === module.id
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                currentModule === module.id ? 'text-blue-600' : 'text-gray-500'
              }`} />
              <span className="text-sm font-medium leading-tight">{module.title}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={async () => {
            try {
              await signOut();
              onLogout();
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }}
          className="w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;