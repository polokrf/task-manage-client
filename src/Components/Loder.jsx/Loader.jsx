import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary/80 backdrop-blur-md transition-all duration-300">
      <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl border border-accent bg-primary shadow-xl max-w-xs w-full mx-4">
        {/* Animated Main Spinner Area */}
        <div className="relative w-16 h-16 mb-4">
          {/* Outer elegant rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-accent opacity-20 animate-pulse"></div>

          {/* Inner signature secondary blue spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

          {/* Center decorative accent core dot */}
          <div className="absolute inset-4 rounded-full bg-secondary/10 border border-accent/40 animate-ping"></div>
        </div>

        {/* Loading Micro-copy Texts */}
        <div className="text-center">
          <span className="text-sm font-bold text-neutral tracking-wider block">
            Loading...
          </span>
          <span className="text-[11px] opacity-50 font-medium block mt-1">
            Please wait a moment
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
