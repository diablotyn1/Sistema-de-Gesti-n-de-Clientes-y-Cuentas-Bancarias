import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, CreditCard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <CreditCard size={32} />
            <h1 className="text-xl font-bold">Sistema Bancario</h1>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/clientes"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/clientes')
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-500'
              }`}
            >
              <Users size={20} />
              <span>Clientes</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};