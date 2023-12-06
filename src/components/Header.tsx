import React from "react";
import { useRouter } from "next/navigation";
import { app } from "@/config/firebase";
import { getAuth } from "firebase/auth";

const Header: React.FC = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;

  return (
    <header className="fixed">
      <div className="w-screen p-4 flex justify-between items-center m-auto">
        <h1 className="font-bold text-white text-xl lg:text-4xl text-center relative z-10">
          TSI
        </h1>
        <nav className="flex items-center space-x-4">
          {user ? (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 relative"
            >
              {"Hello, " + user.displayName}
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 relative"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
