import { useActionState, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
import AuthContext from "../../store/auth.context";
import InputAuth from "./common/InputAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { forgotPassword } = useContext(AuthContext);

  async function forgotPasswordAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);
    setError("");

    if (!dataObj.email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(dataObj.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const response = await forgotPassword(dataObj.email);
    if (response.error) {
      return setError(response.error);
    } else {
      setIsSubmitted(true);
      setEmail(dataObj.email);
      setError("");
    }

    return dataObj;
  }

  const [formState, formStateAction, pending] = useActionState(forgotPasswordAction);

  if (isSubmitted) {
    return (
      <div className="h-screen bg-black overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full translate-y-32 -translate-x-32 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-xs sm:max-w-sm space-y-4 sm:space-y-6">
            {/* Success Card */}
            <div className="backdrop-blur-xl bg-black/40 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 p-4 sm:p-6 relative overflow-hidden">
              {/* Form Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/25">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-2 w-2 text-white" />
                    </div>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Check your email
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  We've sent a password reset link to
                </p>
                <p className="text-sm sm:text-base font-medium  mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {email}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <Link
                    to="/verify-code"
                    className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover-lift relative overflow-hidden group"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Enter verification code</span>
                  </Link>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-gray-600 rounded-lg sm:rounded-xl shadow-lg text-sm font-medium text-gray-300 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    Edit email address
                  </button>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full translate-y-32 -translate-x-32 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-xs sm:max-w-sm space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                  <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Forgot password?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Enter your email address and we'll send you a verification code to reset your password
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="backdrop-blur-xl bg-black/40 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 p-4 sm:p-6 relative overflow-hidden">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl"></div>
            
            <form action={formStateAction} className="space-y-3 sm:space-y-4 relative z-10">
              {/* Email Field */}
              <InputAuth
                name="email"
                type="email"
                label="Email address"
                icon={<Mail className="h-4 w-4" />}
                placeholder="Enter your email"
                value={email}
                defaultValue={formState?.email || ""}
                onChange={(e) => setEmail(e.target.value)}
                errorText={error}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift relative overflow-hidden group"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {pending ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                    <span>Sending code...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Mail className="h-4 w-4" />
                    <span>Send verification code</span>
                  </div>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-4 sm:mt-6 text-center relative z-10">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
