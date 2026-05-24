import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = ({ message }) => {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-primary p-4 text-neutral">
      <div className="w-full max-w-md bg-primary border border-accent rounded-2xl shadow-sm p-6 md:p-8 flex flex-col items-center text-center gap-4 transition-all">
        {/* Error Icon Wrapper */}
        <div className="p-4 rounded-full bg-secondary/10 text-secondary border border-accent animate-bounce">
          <AlertCircle className="w-10 h-10" />
        </div>

        {/* Error Typography */}
        <div className="flex flex-col gap-1.5 w-full">
          <h3 className="text-xl font-bold text-neutral tracking-wide">
            Something Went Wrong
          </h3>
          <p className="text-sm opacity-60 font-medium max-w-xs mx-auto leading-relaxed">
            {message ||
              'An unexpected system error occurred. Please check your connection or try refreshing the page later.'}
          </p>
        </div>

        {/* Subtle Decorative Bottom Divider Line */}
        <div className="w-12 h-1 bg-secondary opacity-30 rounded-full mt-2" />
      </div>
    </div>
  );
};

export default Error;
