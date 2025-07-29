import { useActionState, useContext, useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
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
                  We've sent a password reset link to
                  <p className="font-medium text-stone-900 dark:text-stone-100">{email}</p>
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
                    Edit email address
                  </button>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center mt-6">
                <Link
                  to="/auth/login"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  ← Back to log in
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
            <form action={formStateAction} className="space-y-6">
              {/* Email Field */}
              <InputAuth
                name="email"
                type="email"
                label="Email address"
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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {pending ? "Sending code..." : "Send verification code"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
