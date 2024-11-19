import React from 'react';
import { Calculator, Github, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-600">
              Retirement Withdrawal Calculator
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for a secure retirement</span>
          </div>

          <div className="text-sm text-gray-500">
            © {currentYear} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;