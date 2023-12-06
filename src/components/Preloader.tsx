import React from "react";

const Preloader: React.FC = () => {
  return (
    <div className="flex border-4 rounded-3xl justify-between items-center h-full w-full absolute z-20 bg-black slide-out-top overflow-hidden">
      <div className="left-side w-embed start">
        <svg
          viewBox="0 0 495 777"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180 h-full w-full"
        >
          <path
            d="M495 775L389 775C286.361 775 187.926 734.28 115.35 661.797C42.7731 589.314 2.00003 491.006 2.00002 388.5C2 285.994 42.7731 187.686 115.35 115.203C187.926 42.7204 286.361 2 389 1.99998L495 1.99998"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_0"
          ></path>
          <path
            d="M495 522L156.233 522C120.632 522 86.4896 507.935 61.316 482.899C36.1424 457.863 22 423.906 22 388.5C22 353.094 36.1424 319.137 61.316 294.101C86.4896 269.065 120.632 255 156.233 255L495 255"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_1"
          ></path>
          <path
            transform="matrix(-1 0 0 1 452 364)"
            stroke="white"
            strokeWidth="3"
            d="M1.5,25A23.5,23.5 0,1,1 48.5,25A23.5,23.5 0,1,1 1.5,25"
            className="NXXoBpNl_2"
          ></path>
          <path
            d="M469 331V447"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_3"
          ></path>
          <path
            d="M152 255.5V522"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_4"
          ></path>
        </svg>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-24 lg:h-20 lg:w-44 rounded-full border-4 border-orange-600 absolute rotate-in-center"></div>
        <h1 className="font-bold text-white text-xl lg:text-4xl text-center relative z-10">
          Tailoring Sport Investment
        </h1>
      </div>
      <div className="right-side flex justify-end w-embed start">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 495 777"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" h-full w-full"
        >
          <path
            d="M495 775L389 775C286.361 775 187.926 734.28 115.35 661.797C42.7731 589.314 2.00003 491.006 2.00002 388.5C2 285.994 42.7731 187.686 115.35 115.203C187.926 42.7204 286.361 2 389 1.99998L495 1.99998"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_0"
          ></path>
          <path
            d="M495 522L156.233 522C120.632 522 86.4896 507.935 61.316 482.899C36.1424 457.863 22 423.906 22 388.5C22 353.094 36.1424 319.137 61.316 294.101C86.4896 269.065 120.632 255 156.233 255L495 255"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_1"
          ></path>
          <path
            transform="matrix(-1 0 0 1 452 364)"
            stroke="white"
            strokeWidth="3"
            d="M1.5,25A23.5,23.5 0,1,1 48.5,25A23.5,23.5 0,1,1 1.5,25"
            className="NXXoBpNl_2"
          ></path>
          <path
            d="M469 331V447"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_3"
          ></path>
          <path
            d="M152 255.5V522"
            stroke="white"
            strokeWidth="3"
            className="NXXoBpNl_4"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Preloader;
