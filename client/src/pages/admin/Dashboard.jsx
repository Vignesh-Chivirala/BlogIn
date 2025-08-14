import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function Dashboard() {
  const [DashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-gray-900 text-gray-200 min-h-screen">
      
      <div className="flex flex-wrap gap-6">
        {[
          { icon: assets.dashboard_icon_1, label: 'Blogs', value: DashboardData.blogs },
          { icon: assets.dashboard_icon_2, label: 'Comments', value: DashboardData.comments },
          { icon: assets.dashboard_icon_3, label: 'Drafts', value: DashboardData.drafts },
        ].map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-gray-800 p-4 min-w-[150px] rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-primary/50 transition-all duration-200"
          >
            <img src={card.icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold text-white">{card.value}</p>
              <p className="text-gray-400 font-light">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-4 text-white">
          <img src={assets.dashboard_icon_4} alt="" className="w-6 h-6" />
          <p className="font-semibold text-lg">Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto rounded-xl shadow-lg scrollbar-hide bg-gray-800">
          <table className="w-full text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Blog Title</th>
                <th className="px-3 py-3 hidden sm:table-cell">Date</th>
                <th className="px-3 py-3 hidden sm:table-cell">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
