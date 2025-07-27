import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Handle forgot password logic here
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
        {/* Top Navbar */}
        <nav className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="bg-blue-600 flex items-center justify-center rounded-lg w-10 h-10">
                <span className="text-white font-bold text-xl">PM</span>
              </div>
              <span className="text-xl font-bold text-stone-800 dark:text-stone-200">
                Project Manager
              </span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8">
                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Check your email
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-6">
                  We've sent a 6-digit verification code to{" "}
                  <span className="font-medium text-stone-900 dark:text-stone-100">{email}</span>
                </p>

                <div className="space-y-4">
                  <Link
                    to="/verify-code"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Enter verification code
                  </Link>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full flex justify-center py-3 px-4 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm text-sm font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Resend code
                  </button>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  ← Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="bg-blue-600 flex items-center justify-center rounded-lg w-10 h-10">
              <span className="text-white font-bold text-xl">PM</span>
            </div>
            <span className="text-xl font-bold text-stone-800 dark:text-stone-200">
              Project Manager
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Forgot password?
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              Enter your email address and we'll send you a verification code to reset your password
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 transition-colors ${
                      error ? "border-red-500" : "border-stone-300 dark:border-stone-600"
                    }`}
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending code...
                  </div>
                ) : (
                  "Send verification code"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
