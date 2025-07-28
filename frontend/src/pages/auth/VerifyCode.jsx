import { useState, useRef, useEffect, useActionState, useContext } from "react";
import AuthContext from "../../store/auth.context.jsx";
import { toast } from "react-hot-toast";

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // 5 minutes
  const inputRefs = useRef([]);

  const { verifyEmail, checkAuthStatus, resendVerificationCode } = useContext(AuthContext);

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
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow digits

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

  const resendCode = async () => {
    setTimeLeft(300);
    setError("");
    const response = await resendVerificationCode();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  async function verifyAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);
    let code = Object.values(dataObj).join("");

    const response = await verifyEmail(code);

    if (!response.success) {
      return setError(response.message);
    } else {
      toast.success(response.message);
      await checkAuthStatus();
      return;
    }
  }

  const [_formState, formStateAction, pending] = useActionState(verifyAction);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
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
            <form action={formStateAction} className="space-y-6">
              {/* Code Input Fields */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-4">
                  Verification Code
                </label>
                <div className="flex justify-between space-x-2">
                  {code.map((digit, index) => (
                    <input
                      name={index}
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      autoFocus={index === 0}
                      autocomplete="off"
                      required
                      className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 transition-all duration-200 ${
                        error
                          ? "border-red-500"
                          : "border-stone-300 dark:border-stone-600 outline-none"
                      }`}
                      placeholder="-"
                    />
                  ))}
                </div>
                {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending || code.join("").length !== 6}
                className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {pending ? "Verifying..." : "Verify code"}
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
                    : "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                }`}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend code"}
              </button>
            </div>
          </div>

          {/* Demo Note
          <div className="text-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Demo: Use code <span className="font-mono font-medium">123456</span> to verify
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
