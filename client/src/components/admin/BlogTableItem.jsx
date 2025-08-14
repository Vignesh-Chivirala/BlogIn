import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function BlogTableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition-all duration-200">
      <th className="px-3 py-4 text-gray-300">{index}</th>
      <td className="px-3 py-4 text-white">{title}</td>
      <td className="px-3 py-4 text-gray-400 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-3 py-4 max-sm:hidden">
        <p className={`${blog.isPublished ? 'text-green-400' : 'text-orange-400'} font-medium`}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className="px-3 py-4 flex gap-3">
        <button
          onClick={togglePublish}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
            blog.isPublished ? 'bg-orange-700 text-white hover:bg-orange-600' : 'bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="delete"
          className="w-6 h-6 cursor-pointer hover:scale-110 transition-all"
        />
      </td>
    </tr>
  );
}

export default BlogTableItem;
