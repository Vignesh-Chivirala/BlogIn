import React from 'react';

function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-900 text-gray-300 relative">
     
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-t border-gray-700">
        
       
        <div className="max-w-md">
          <h2 className="text-3xl font-extrabold text-white mb-4">BlogIn</h2>
          <p className="text-gray-400 leading-relaxed">
            Read the latest articles on technology, lifestyle, and productivity. 
            Stay updated and inspired every week.
          </p>
        </div>

        
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8 mt-6 md:mt-0">
          
          <div>
            <h3 className="font-semibold text-white mb-3">Blog</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Popular Posts</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-semibold text-white mb-3">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

    
      <p className="py-6 text-center text-sm text-gray-500/70 border-t border-gray-700">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">BlogIn</span> — All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
