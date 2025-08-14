import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { axios, setToken, token } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 border border-gray-700 rounded-2xl shadow-lg bg-gray-800">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-extrabold text-white">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 w-full text-gray-200">
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-300">Email</label>
              <input
                type="email"
                placeholder="your email id"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-gray-300">Password</label>
              <input
                type="password"
                placeholder="your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
