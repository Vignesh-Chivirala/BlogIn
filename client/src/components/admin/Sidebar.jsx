import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Sidebar() {
  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: assets.home_icon },
    { to: '/admin/addBlog', label: 'Add Blogs', icon: assets.add_icon },
    { to: '/admin/listBlog', label: 'Blog Lists', icon: assets.list_icon },
    { to: '/admin/comments', label: 'Comments', icon: assets.comment_icon },
  ];

  return (
    <div className="flex flex-col bg-gray-900 text-gray-300 min-h-screen w-60 border-r border-gray-700 py-6">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          end={item.to === '/admin'}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-4 md:px-6 rounded-r-lg cursor-pointer transition-all duration-200
            ${isActive ? 'bg-primary/20 border-r-4 border-primary text-white' : 'hover:bg-gray-800 hover:text-white'}`
          }
        >
          <img src={item.icon} alt={item.label} className="w-5 h-5" />
          <span className="hidden md:inline-block font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
