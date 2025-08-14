import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog }) {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
    >
      
      <div className="relative">
        <img src={image} alt="Blog" className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p
          className="text-sm text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: description?.slice(0, 100) + '...' }}
        ></p>
        <button className="group flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full shadow-md hover:bg-primary/90 transition-all duration-300">
        <span>Read More</span>
        </button>

      </div>
    </div>
  );
}

export default BlogCard;
