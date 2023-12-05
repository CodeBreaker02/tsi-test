import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="bg-red-800 py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <div>
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </div>
        <nav className="flex items-center space-x-4">
          <button className="text-white hover:text-red-300 font-semibold">
            NBA
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
