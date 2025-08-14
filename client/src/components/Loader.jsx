import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-primary"></div>
    </div>
  );
}

export default Loader;
