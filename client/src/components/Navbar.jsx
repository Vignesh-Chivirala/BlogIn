import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function Navbar() {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 px-6 sm:px-20 xl:px-32 bg-gray-900 shadow-lg relative z-50">
      
      <h1
        onClick={() => navigate('/')}
        className="text-white text-2xl sm:text-3xl font-bold cursor-pointer hover:text-primary transition-colors duration-200"
      >
        BlogIn
      </h1>

      
      <div className="flex items-center gap-4 sm:gap-6">
        
        <Link
          to="/contribute"
          className="bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-500 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          Contribute
        </Link>

        
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-primary text-white px-6 py-2.5 hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-200"
        >
          {token ? "Dashboard" : "Login"}
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
