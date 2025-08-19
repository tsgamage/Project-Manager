import { Link, useNavigate } from "react-router-dom";
import { Loader, Lock, Mail, Sparkles } from "lucide-react";
import { useActionState } from "react";
import TextLink from "./common/TextLink";
import InputAuth from "./common/InputAuth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/auth.actions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signupAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);

    const response = await dispatch(loginThunk(dataObj));

    if (response.success) {
      toast.success(response.message);
      navigate("/home");
      return { email: "", password: "" };
    } else {
      toast.error(response.message);
      return dataObj;
    }
  }

  const [formState, formStateAction, pending] = useActionState(signupAction);
  return (
    <div className="h-dvh bg-black overflow-hidden relative">
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
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-xl bg-black/40 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 p-4 sm:p-6 relative overflow-hidden">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl"></div>

            <form className="space-y-3 sm:space-y-4 relative z-10" action={formStateAction}>
              <InputAuth
                name="email"
                label="Email Address"
                icon={<Mail className="h-4 w-4" />}
                placeholder="Enter your email"
                defaultValue={formState?.email}
              />
              <InputAuth
                name="password"
                label="Password"
                password
                placeholder="Enter your password"
                defaultValue={formState?.password}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-row items-center justify-end">
                <TextLink link="/auth/forgot-password" />
              </div>

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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Lock className="h-4 w-4" />
                    <span>Sign in</span>
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-4 sm:mt-6 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 bg-black/40 backdrop-blur-sm text-gray-400 rounded-full">
                    Don't have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 sm:mt-6 text-center relative z-10">
              <p className="text-xs sm:text-sm text-gray-400">
                Click here to{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
