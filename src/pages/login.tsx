import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      setLoading(false);
      await router.push("/test");
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3 mb-6"
              alt="Flowbite Logo"
            />
            <h2 className="text-2xl font-bold mb-3">Log in</h2>
            <p className="mb-4 text-gray-700">Welcome back to Test App!</p>
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 110-16v4a4 4 0 100 8V20zm5.657-6.343l3 3-1.414 1.414-3-3 1.414-1.414z"
                  ></path>
                </svg>
              ) : (
                "Log in with Google"
              )}
            </button>
          </div>
          {error && <div className="font-bold text-red-700 pt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
