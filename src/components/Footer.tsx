// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-6">
      <div className=" mx-auto px-4 flex flex-col">
        <div className="flex mb-4  items-center">
          <h1 className="font-bold text-white text-xl lg:text-4xl text-center relative z-10">
            Tailoring Sport Investment
          </h1>
        </div>
        <div className="border my-2"></div>

        <div className="mt-4 flex justify-between">
          <p className="text-2xs">
            &copy; {new Date().getFullYear()} Tailoring Sport Investment. All
            rights reserved.
          </p>
          <p className="text-2xs">Design by CodeBreaker02</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
