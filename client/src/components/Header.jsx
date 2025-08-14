import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../contexts/AppContext';

function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="relative mx-4 sm:mx-16 xl:mx-24 text-center">
     
      <div className="bg-gray-900 rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-600 to-teal-500 opacity-20 -z-10 rounded-3xl"></div>

        
        <div className="inline-flex items-center justify-center gap-3 px-6 py-2 mb-6 border border-primary/50 bg-primary/20 rounded-full text-sm text-primary font-medium">
          <p>✨ Now with AI-powered writing tools</p>
          <img src={assets.star_icon} className="w-3" alt="star" />
        </div>

        
        <h1 className="text-4xl sm:text-6xl font-bold sm:leading-snug text-white mb-4">
          Create. Share. <span className="text-primary">Inspire.</span>
        </h1>

       
        <p className="text-gray-300 max-w-2xl m-auto text-sm sm:text-base mb-8">
          Turn your ideas into impactful stories. BlogIn is your personal stage to write, publish,
          and connect with readers who care. Whether you’re journaling, teaching, or storytelling —
          your voice matters here.
        </p>

        
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-full overflow-hidden shadow-inner"
        >
          <input
            ref={inputRef}
            className="w-full pl-4 py-2 bg-gray-800 text-gray-100 placeholder-gray-400 outline-none"
            type="text"
            placeholder="Search blogs, authors, or topics..."
            required
          />
          <button
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-2 transition-all hover:scale-105"
            type="submit"
          >
            Search
          </button>
        </form>

        
        {input && (
          <div className="mt-4">
            <button
              onClick={onClear}
              className="text-xs text-gray-300 hover:text-white font-light border border-gray-700 px-3 py-1 rounded-md shadow-sm transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-32 right-0 w-72 opacity-30 animate-pulse pointer-events-none"
        />
      </div>
    </div>
  );
}

export default Header;
