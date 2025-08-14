import React from 'react';

function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 my-32 relative mx-4 sm:mx-16 xl:mx-24">
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-600 to-teal-500 opacity-10 -z-10 rounded-3xl blur-2xl"></div>

      
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
        Stay in the <span className="text-primary">Loop</span> 
      </h1>

     
      <p className="text-gray-300 max-w-2xl text-sm sm:text-lg">
        Get fresh blogs, tech trends, and insider updates delivered straight to your inbox.  
        No spam — just pure knowledge and inspiration.
      </p>

      
      <form className="flex items-center justify-between max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-full overflow-hidden shadow-inner">
        <input
          className="w-full pl-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-400 outline-none rounded-l-full focus:ring-2 focus:ring-primary/50 transition-all"
          type="email"
          placeholder="Enter your email address..."
          required
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 sm:px-12 py-3 transition-all hover:scale-105 rounded-r-full shadow-md"
        >
          Join Now
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
