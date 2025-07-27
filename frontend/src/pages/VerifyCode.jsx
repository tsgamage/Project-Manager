import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 6) {
      const newCode = pastedData.split("");
      setCode(newCode);
      setError("");
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle verification logic here
      // For demo purposes, show error if code is not 123456
      if (fullCode !== "123456") {
        setError("Invalid verification code. Please try again.");
      } else {
        // Success - redirect to reset password page
        navigate("/reset-password");
      }
    }, 1000);
  };

  const resendCode = () => {
    setTimeLeft(300);
    setError("");
    // Handle resend logic here
  };

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
              Enter verification code
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              We've sent a 6-digit code to your email address
            </p>
          </div>

          {/* Verification Code Form */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Code Input Fields */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-4">
                  Verification Code
                </label>
                <div className="flex justify-between space-x-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 transition-all duration-200 ${
                        error ? "border-red-500" : "border-stone-300 dark:border-stone-600"
                      }`}
                      placeholder="0"
                    />
                  ))}
                </div>
                {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Code expires in{" "}
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || code.join("").length !== 6}
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
                    Verifying...
                  </div>
                ) : (
                  "Verify code"
                )}
              </button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={resendCode}
                disabled={timeLeft > 0}
                className={`text-sm font-medium transition-colors ${
                  timeLeft > 0
                    ? "text-stone-400 dark:text-stone-500 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                }`}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend code"}
              </button>
            </div>

            {/* Back to Forgot Password */}
            <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to forgot password
              </Link>
            </div>
          </div>

          {/* Demo Note */}
          <div className="text-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Demo: Use code <span className="font-mono font-medium">123456</span> to verify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
