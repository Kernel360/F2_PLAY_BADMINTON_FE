import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-gray-300"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default Spinner;
