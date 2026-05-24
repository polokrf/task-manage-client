import React from 'react';

const PageLoader = () => {
 return (
   <div className="flex items-center justify-center">
     <div className="relative w-8 h-8">
       {/* Outer subtle ring */}
       <div className="absolute inset-0   opacity-20"></div>

       {/* Inner running main blue spinner */}
       <div className="absolute inset-0 rounded-full border-2 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
     </div>
   </div>
 );
};

export default PageLoader;