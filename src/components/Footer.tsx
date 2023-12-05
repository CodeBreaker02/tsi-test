// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4">
          <img src="/logo.svg" alt="Logo" className="h-8 mr-2" />
          <p className="text-xl font-semibold">Tailoring Sport Investment</p>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About Us
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Tailoring Sport Investment. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
