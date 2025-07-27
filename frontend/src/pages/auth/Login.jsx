import { Link, redirect } from "react-router-dom";
import { AtSign } from "lucide-react";
import { useActionState, useContext } from "react";
import TextLink from "./common/TextLink";
import InputAuth from "./common/InputAuth";
import { toast } from "react-hot-toast";
import AuthContext from "../../store/auth.context";

export default function LoginPage() {
  const { login, error } = useContext(AuthContext);

  async function signupAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);

    await login(dataObj);

    if (error) {
      toast.error(error);
      return dataObj;
    } else {
      toast.success("Login Success!");
      redirect("/");
    }
  }

  const [formState, formStateAction, pending] = useActionState(signupAction, {
    email: "",
    password: "",
  });
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Welcome back</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8">
            <form className="space-y-6" action={formStateAction}>
              <InputAuth
                name="email"
                label="Email Address"
                icon={<AtSign />}
                placeholder="Enter your email"
                defaultValue={formState.email}
              />
              <InputAuth
                name="password"
                label="Password"
                password
                placeholder="Enter your password"
                defaultValue={formState.password}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <InputAuth name="remember" checkbox label="Remember me" />
                <TextLink link="/auth/forgot-password" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {pending ? (
                  <div className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-300 dark:border-stone-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                    Don't have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Click here to{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
