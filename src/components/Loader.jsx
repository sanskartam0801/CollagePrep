import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white transition-all">
      <div className="flex items-center space-x-3 mb-4">
        <Loader2 className="animate-spin text-black dark:text-white w-10 h-10" />
        <span className="text-2xl font-bold tracking-wide animate-pulse">
          CollagePrep
        </span>
      </div>
      <p className="text-md text-gray-600 dark:text-gray-300 animate-pulse tracking-wide">
        Ace your college exams with the right prep...
      </p>
    </div>
  );
};

export default Loader;
