import { useState, useRef, useEffect, useActionState } from "react";
import { toast } from "react-hot-toast";
import { Shield, Loader, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { resendVerificationCodeRequest, verifyEmailRequest } from "../../services/auth.api";
import { checkAuthStatusThunk } from "../../store/auth.actions";
import { useDispatch } from "react-redux";

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // 5 minutes

  const dispatch = useDispatch();
  const inputRefs = useRef([]);

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
    const response = await resendVerificationCodeRequest();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  async function verifyAction(preState, formData) {
    const dataObj = Object.fromEntries(formData);
    let code = Object.values(dataObj).join("");

    const response = await verifyEmailRequest(code);

    if (!response.success) {
      return setError(response.message);
    } else {
      toast.success(response.message);
      await dispatch(checkAuthStatusThunk());
      return;
    }
  }

  const [_formState, formStateAction, pending] = useActionState(verifyAction);

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
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Enter verification code
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              We've sent a 6-digit code to your email address
            </p>
          </div>

          {/* Verification Code Form */}
          <div className="backdrop-blur-xl bg-black/40 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 p-4 sm:p-6 relative overflow-hidden">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl"></div>

            <form action={formStateAction} className="space-y-4 sm:space-y-6 relative z-10">
              {/* Code Input Fields */}
              <div>
                <label className="block text-sm font-medium text-white mb-3 sm:mb-4">
                  Verification Code
                </label>
                <div className="flex justify-between gap-2 sm:gap-3">
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
                      autoComplete="off"
                      required
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300 ${
                        error ? "border-red-500" : "border-gray-600 outline-none"
                      }`}
                      placeholder="-"
                    />
                  ))}
                </div>
                {error && <p className="mt-2 text-xs sm:text-sm text-red-400">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending || code.join("").length !== 6}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift relative overflow-hidden group"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {pending ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Shield className="h-4 w-4" />
                    <span>Verify code</span>
                  </div>
                )}
              </button>
            </form>

            {/* Resend Code */}
            <div className="mt-4 sm:mt-6 text-center relative z-10">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Didn't receive the code?</p>
              <button
                onClick={resendCode}
                disabled={timeLeft > 0}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  timeLeft > 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-400 hover:text-blue-300 cursor-pointer"
                }`}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend code"}
              </button>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center relative z-10">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Log in
            </Link>
          </div>
          {/* Demo Note */}
          {/* <div className="text-center relative z-10">
            <p className="text-xs text-gray-500">
              Demo: Use code <span className="font-mono font-medium text-gray-300">123456</span> to verify
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
