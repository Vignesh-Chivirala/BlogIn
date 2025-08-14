import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';
import Moment from 'moment';

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      if (data.success) setComments(data.comments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content: comment });
      if (data.success) {
        toast.success(data.message);
        setName('');
        setComment('');
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="relative bg-gray-900 min-h-screen text-gray-200">
      <img src={assets.gradientBackground} className="absolute -top-50 -z-10 opacity-30 w-full" alt="" />

      <Navbar />

      
      <div className="text-center mt-16 sm:mt-20 px-4">
        <p className="text-primary py-2 font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-snug">
          {data.title}
        </h1>
        <h2 className="mt-3 mb-6 max-w-2xl mx-auto text-gray-400">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/40 bg-primary/20 font-medium text-primary">
          Vignesh
        </p>
      </div>

      
      <div className="flex flex-col items-center mx-4 md:mx-16 my-10">
        
        <img
          src={data.image}
          className="rounded-3xl shadow-2xl border border-gray-700 mb-8 max-w-full"
          alt=""
        />

        
        <div
          className="rich-text max-w-3xl text-center leading-relaxed text-gray-300 prose prose-invert"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>

      
      <div className="max-w-3xl mx-auto my-16">
        <p className="font-semibold text-lg mb-6 text-white">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-800 border border-primary/20 p-4 rounded-xl shadow hover:shadow-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={assets.user_icon} className="w-6 h-6 rounded-full" alt="" />
                <p className="font-medium text-white">{item.name}</p>
              </div>
              <p className="text-gray-300 ml-9">{item.content}</p>
              <div className="absolute right-4 bottom-3 text-xs text-gray-500">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="max-w-3xl mx-auto mb-16">
        <p className="font-semibold text-lg mb-4 text-white">Add Your Comment</p>
        <form onSubmit={addComment} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <textarea
            placeholder="Comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg outline-none h-32 resize-none focus:border-primary focus:ring-1 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded-lg p-3 px-8 hover:bg-primary/90 transition-all shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>

      
      <div className="max-w-3xl mx-auto mb-24 text-center">
        <p className="font-semibold mb-4 text-lg text-white">Share this article</p>
        <div className="flex justify-center gap-4">
          <img src={assets.facebook_icon} width={40} alt="Facebook" className="hover:scale-110 transition-transform" />
          <img src={assets.twitter_icon} width={40} alt="Twitter" className="hover:scale-110 transition-transform" />
          <img src={assets.googleplus_icon} width={40} alt="Google Plus" className="hover:scale-110 transition-transform" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
