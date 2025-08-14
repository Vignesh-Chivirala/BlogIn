import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../contexts/AppContext';

function Layout() {
  const navigate = useNavigate();
  const { axios, setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  };

  return (
   <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
  
  <div className="flex justify-between items-center py-5 px-6 sm:px-20 xl:px-32 bg-gray-900 shadow-lg relative z-50">
 
  <h1
    onClick={() => navigate('/')}
    className="text-white text-2xl sm:text-3xl font-bold cursor-pointer hover:text-primary transition-colors duration-200"
  >
    BlogIn
  </h1>

 
  <button
    onClick={logout}
    className="text-sm px-6 py-2 bg-red-600 hover:bg-red-700 transition-all rounded-full shadow-sm"
  >
    Logout
  </button>
</div>


      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
