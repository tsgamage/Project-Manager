import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, Loader, ArrowLeft, Sparkles, Check } from "lucide-react";
import InputAuth from "./common/InputAuth";
import { toast } from "react-hot-toast";
import { resetPasswordRequest } from "../../services/auth.api";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  function validateForm() {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    const response = await resetPasswordRequest(token, formData.password);

    if (response.success) {
      toast.success(response.message);
      navigate("/auth/login");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
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
        <div className="w-full sm:max-w-sm space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                  <Lock className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Reset your password
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Enter your new password below</p>
          </div>

          {/* Reset Password Form */}
          <div className="backdrop-blur-xl bg-black/40 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 p-4 sm:p-6 relative overflow-hidden">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl"></div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 relative z-10">
              <InputAuth
                name="password"
                label="Password"
                password
                placeholder="New Password"
                value={formData.password}
                errorText={errors.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />

              <InputAuth
                name="confirmPassword"
                label="Confirm New Password"
                password
                placeholder="Confirm your password"
                errorText={errors.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />

              {/* Password Requirements */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <h4 className="text-xs sm:text-sm font-medium text-white mb-2">
                  Password requirements:
                </h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li
                    className={`flex items-center ${
                      formData.password.length >= 8 ? "text-green-400" : ""
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 mr-2 ${
                        formData.password.length >= 8 ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    At least 8 characters long
                  </li>
                  <li
                    className={`flex items-center ${
                      /(?=.*[a-z])/.test(formData.password) ? "text-green-400" : ""
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 mr-2 ${
                        /(?=.*[a-z])/.test(formData.password) ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    Contains lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /(?=.*[A-Z])/.test(formData.password) ? "text-green-400" : ""
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 mr-2 ${
                        /(?=.*[A-Z])/.test(formData.password) ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    Contains uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /(?=.*\d)/.test(formData.password) ? "text-green-400" : ""
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 mr-2 ${
                        /(?=.*\d)/.test(formData.password) ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    Contains number
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift relative overflow-hidden group"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {isLoading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                    <span>Resetting password...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Lock className="h-4 w-4" />
                    <span>Reset password</span>
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
                Back to Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
