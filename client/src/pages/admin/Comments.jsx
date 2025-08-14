import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-6 px-6 sm:pt-10 sm:px-12 bg-gray-900 text-gray-100 min-h-screen">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-5xl mx-auto gap-4">
        <h1 className="text-2xl font-bold text-white">Comments</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('Approved')}
            className={`px-5 py-1.5 rounded-full border transition-all text-sm font-medium ${
              filter === 'Approved'
                ? 'bg-primary text-white border-primary'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`px-5 py-1.5 rounded-full border transition-all text-sm font-medium ${
              filter === 'Not Approved'
                ? 'bg-primary text-white border-primary'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative mt-6 max-w-5xl mx-auto overflow-x-auto bg-gray-950 border border-gray-800 rounded-xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-gray-800 text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 text-left max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === 'Approved') return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
