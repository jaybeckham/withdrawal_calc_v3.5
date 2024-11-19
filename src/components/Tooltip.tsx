import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  content: string;
}

function Tooltip({ content }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Help"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-3 text-sm text-gray-600 bg-white border rounded-lg shadow-lg -right-2 top-8">
          <div className="absolute -top-2 right-3 w-4 h-4 rotate-45 bg-white border-t border-l" />
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default Tooltip;