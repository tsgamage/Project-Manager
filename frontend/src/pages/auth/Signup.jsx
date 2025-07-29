import { useActionState, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AtSign } from "lucide-react";
import InputAuth from "./common/InputAuth";
import AuthContext from "../../store/auth.context";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { signup } = useContext(AuthContext);

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function signupAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);

    if (!dataObj.terms) return dataObj;

    if (validateForm(dataObj)) {
      const signupData = {
        ...dataObj,
        name: `${dataObj.firstName.trim()} ${dataObj.lastName.trim()}`,
      };
      delete signupData.firstName;
      delete signupData.lastName;
      delete signupData.confirmPassword;
      delete signupData.terms;

      const response = await signup(signupData);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(() => {
          toast("Please verify your email to continue", {
            duration: 5000,
            position: "top-center",
            icon: "📧",
          });
        }, 1000);
        navigate("/");
        return { email: "", password: "" };
      }
    }

    return dataObj;
  }

  const [formState, formStateAction, pending] = useActionState(signupAction, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Create your account
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              Join us and start managing your projects efficiently
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8">
            <form action={formStateAction} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <InputAuth
                  name="firstName"
                  label="First name"
                  placeholder="Thevindu"
                  errorText={errors.firstName}
                  auto-fill="first-name"
                  defaultValue={formState.firstName}
                  onChange={() => setErrors({})}
                />
                <InputAuth
                  name="lastName"
                  label="Last name"
                  placeholder="Sathsara"
                  errorText={errors.lastName}
                  auto-fill="last-name"
                  defaultValue={formState.lastName}
                  onChange={() => setErrors({})}
                />
              </div>

              {/* Email Field */}
              <InputAuth
                name="email"
                label="Email Address"
                icon={<AtSign />}
                placeholder="Enter your email"
                defaultValue={formState.email}
                errorText={errors.email}
                onChange={() => setErrors({})}
              />
              <InputAuth
                name="password"
                label="Password"
                password
                placeholder="Create a strong password"
                defaultValue={formState.password}
                errorText={errors.password}
                onChange={() => setErrors({})}
              />
              <InputAuth
                name="confirmPassword"
                label="Confirm Password"
                password
                placeholder="Confirm your password"
                errorText={errors.confirmPassword}
                onChange={() => setErrors({})}
              />

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 pointer-events-none"
                    required
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms((preValue) => !preValue)}
                  />
                </div>
                <div className="ml-3 text-sm select-none">
                  <label htmlFor="terms" className="text-stone-700 dark:text-stone-300 ">
                    I agree to the{" "}
                    <Link
                      to="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 "
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreeToTerms || pending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {pending ? "Creating account..." : "Create account"}
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
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Click here to{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
