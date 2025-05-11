// /src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип або заголовок */}
        <div className="text-white text-xl font-bold">
          <Link to="/">My App</Link>
        </div>

        {/* Навігаційні посилання */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/traders" className="text-white hover:text-yellow-300 transition-colors duration-200">
              Traders
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-yellow-300 transition-colors duration-200">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
