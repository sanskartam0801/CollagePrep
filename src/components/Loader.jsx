import React from "react";
import { Loader2 } from "lucide-react"; // Icon from Lucide

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
      <p className="text-lg font-semibold text-muted-foreground animate-pulse">
        Please wait, loading...
      </p>
    </div>
  );
};

export default Loader;
