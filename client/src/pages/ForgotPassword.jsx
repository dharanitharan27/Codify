import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../components/loadingContext";
import { useAuth } from "../store/auth";
import OtpModal from "../components/OtpModal";
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {
  const { theme, themeColor, isDark } = useTheme();
  const { API } = useAuth();
  const { setIsLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLength] = useState(6);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resending, setResending] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const otpRefs = useRef([]);

  // --- API calls (same as your code) ---
  const handleSendOtp = async (e) => { /* unchanged */ };
  const verifyOtp = async () => { /* unchanged */ };
  const handleResetPassword = async () => { /* unchanged */ };
  const handleResendOtp = async () => { /* unchanged */ };

  return (
    <>
      <div className={`relative min-h-screen ${isDark ? "bg-black" : "bg-white"} overflow-hidden`}>
        
        {/* Background Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px"
          }}
        />

        {/* Fade Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              ${isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)"} 0%,
              ${isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)"} 25%,
              ${isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)"} 50%,
              ${isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)"} 75%,
              transparent 100%
            )`
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center pt-16 pb-12">
            <h1 className={`text-5xl md:text-6xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Reset Password
            </h1>
            <div 
              className="w-24 h-1 mx-auto rounded-full mb-6"
              style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-primary-dark))` }}
            />
            <p className={`text-lg max-w-2xl mx-auto px-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {!showReset 
                ? "Enter your registered email address and we'll send you a verification code to reset your password"
                : "Create a new secure password to regain access to your account"}
            </p>
          </div>

          {/* Card */}
          <div className="flex justify-center px-4 pb-16">
            <div className="w-full max-w-md">

              {/* Back to Login */}
              <div 
                onClick={() => console.log("Navigate to login")}
                className={`inline-flex items-center mb-6 cursor-pointer group 
                  ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"} 
                  transition-colors duration-300`}
              >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Login
              </div>

              <div className="relative group cursor-pointer">
                {/* Hover Glow */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"
                  style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-primary-dark))` }}
                />

                {/* Card */}
                <div className={`relative rounded-2xl p-8 transition-all duration-500 
                  ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"} 
                  group-hover:border-[var(--color-primary)] group-hover:shadow-2xl group-hover:scale-[1.02]`}
                >
                  <div className="absolute top-4 right-4">
                    <FaShieldAlt className={`${isDark ? "text-gray-600" : "text-gray-400"} text-lg`} />
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: `linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))` }}
                    >
                      {!showReset ? (
                        <FaEnvelope className="text-white text-xl" />
                      ) : (
                        <FaLock className="text-white text-xl" />
                      )}
                    </div>
                    <h3 className={`${isDark ? "text-white" : "text-gray-900"} text-2xl font-bold mb-2`}>
                      {!showReset ? "Forgot Password" : "New Password"}
                    </h3>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm leading-relaxed`}>
                      {!showReset 
                        ? "Enter your email address to receive a verification code for password reset."
                        : "Create a strong password to secure your account."}
                    </p>
                  </div>

                  {/* Forms */}
                  {!showReset ? (
                    <div className="space-y-6">
                      <div>
                        <label className={`${isDark ? "text-gray-300" : "text-gray-700"} block text-sm font-medium mb-3`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg transition-all duration-300 
                            ${isDark 
                              ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[var(--color-primary)]" 
                              : "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)]"} 
                            focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                        />
                      </div>
                      
                      <button
                        onClick={handleSendOtp}
                        className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group"
                        style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-primary-dark))` }}
                      >
                        <FaShieldAlt className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Send Verification Code
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative">
                        <label className={`${isDark ? "text-gray-300" : "text-gray-700"} block text-sm font-medium mb-3`}>
                          New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full px-4 py-3 pr-12 rounded-lg transition-all duration-300 
                            ${isDark 
                              ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[var(--color-primary)]" 
                              : "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)]"} 
                            focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[42px] text-gray-400 hover:text-[var(--color-primary)] transition-colors duration-200"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      <button
                        onClick={handleResetPassword}
                        className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group"
                        style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-primary-dark))` }}
                      >
                        <FaLock className="mr-2 group-hover:-rotate-12 transition-transform duration-300" />
                        Reset Password
                      </button>
                    </div>
                  )}

                  {/* Bottom */}
                  <div className={`mt-8 pt-6 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                    <p className={`${isDark ? "text-gray-500" : "text-gray-600"} text-sm text-center`}>
                      Remember your password?{" "}
                      <span 
                        onClick={() => console.log("Navigate to login")}
                        className="cursor-pointer font-medium transition-colors duration-200"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Sign in here
                      </span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <OtpModal
        isDark={isDark}
        show={showOtpModal}
        otp={otp}
        setOtp={setOtp}
        otpLength={otpLength}
        verifyOtp={verifyOtp}
        resending={resending}
        handleResendOtp={handleResendOtp}
      />
    </>
  );
}

export default ForgotPassword;
