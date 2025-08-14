import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function CommentTableItem({ comment, fetchComments }) {
  if (!comment) return null;

  const { blog = {}, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="bg-gray-900/60 border-b border-gray-700 hover:bg-gray-800 transition-all duration-200">
      
      <td className="px-6 py-4 text-gray-200">
        <p>
          <span className="font-semibold text-primary">Blog:</span> {blog.title || 'Unknown'}
        </p>
        <p>
          <span className="font-semibold text-primary">Name:</span> {comment.name || 'Unknown'}
        </p>
        <p>
          <span className="font-semibold text-primary">Comment:</span> {comment.content || 'No content'}
        </p>
      </td>

     
      <td className="px-6 py-4 text-gray-400 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

     
      <td className="px-6 py-4 flex items-center gap-4">
        {!comment.isApproved ? (
          <img
            onClick={approveComment}
            src={assets.tick_icon}
            alt="approve"
            className="w-5 hover:scale-110 transition-transform cursor-pointer"
          />
        ) : (
          <span className="text-xs font-medium border border-green-500 bg-green-800/30 text-green-400 rounded-full px-3 py-1">
            Approved
          </span>
        )}
        <img
          onClick={deleteComment}
          src={assets.bin_icon}
          alt="delete"
          className="w-5 hover:scale-110 transition-transform cursor-pointer"
        />
      </td>
    </tr>
  );
}

export default CommentTableItem;
