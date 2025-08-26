import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../components/loadingContext";
import { useAuth } from "../store/auth";
import OtpModal from "../components/OtpModal";
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom"; // Commented out for demo

function ForgotPassword() {
  const { theme } = useTheme();
  const { API } = useAuth();
  const { setIsLoading } = useLoading();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLength] = useState(6);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resending, setResending] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const otpRefs = useRef([]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("forgotEmail", JSON.stringify({ email, exists: true }));
        toast.success("OTP sent to your email!");
        setShowOtpModal(true);
      } else {
        localStorage.setItem("forgotEmail", JSON.stringify({ email, exists: false }));
        toast.error(data.message || "Email not found");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const otpString = otp.join("");

      const response = await fetch(`${API}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const result = await response.json();

      if (response.ok) {
        const emailCheckRes = await fetch(`${API}/api/v1/auth/forgot-password/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const emailCheckData = await emailCheckRes.json();

        if (emailCheckRes.ok) {
          toast.success("OTP verified! You can reset your password.");
          setShowReset(true);
        } else {
          toast.error(emailCheckData.message || "Email is not registered in our system.");
          setShowReset(false);
          setEmail("");
        }

        setShowOtpModal(false);
      } else {
        toast.error(result.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful! Redirecting to login...");
        localStorage.removeItem("forgotEmail");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      const res = await fetch(`${API}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP resent!");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      {/* Main container with grid background */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        
        {/* Grid background pattern - exactly like roadmaps */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Left to right fade overlay - subtle like roadmaps */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.6) 25%,
              rgba(0, 0, 0, 0.3) 50%,
              rgba(0, 0, 0, 0.1) 75%,
              transparent 100%
            )`
          }}
        />

        <div className="relative z-10">
          {/* Header Section - Matching Roadmaps page */}
          <div className="text-center pt-16 pb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Reset Password
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
              {!showReset 
                ? "Enter your registered email address and we'll send you a verification code to reset your password"
                : "Create a new secure password to regain access to your account"
              }
            </p>
          </div>

          {/* Card Container - Styled like roadmap cards */}
          <div className="flex justify-center px-4 pb-16">
            <div className="w-full max-w-md">
              
              {/* Back to Login */}
              <div 
                onClick={() => console.log('Navigate to login')}
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-6 cursor-pointer group"
              >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Login
              </div>

              {/* Main Card - Styled exactly like roadmap cards with hover effect */}
              <div className="relative group cursor-pointer">
                {/* Hover glow effect behind the card */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                
                {/* Card with dark background like roadmap cards */}
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:scale-[1.02]">
                  
                  {/* Bookmark icon in top right like roadmap cards */}
                  <div className="absolute top-4 right-4">
                    <FaShieldAlt className="text-gray-600 text-lg" />
                  </div>

                  {/* Icon with colored background like roadmap cards */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                      {!showReset ? (
                        <FaEnvelope className="text-white text-xl" />
                      ) : (
                        <FaLock className="text-white text-xl" />
                      )}
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {!showReset ? "Forgot Password" : "New Password"}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {!showReset 
                        ? "Enter your email address to receive a verification code for password reset."
                        : "Create a strong password to secure your account."
                      }
                    </p>
                  </div>

                  {/* Form Content */}
                  {!showReset ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-3">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        />
                      </div>
                      
                      <button
                        onClick={handleSendOtp}
                        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group"
                      >
                        <FaShieldAlt className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Send Verification Code
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-3">
                          New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[42px] text-gray-400 hover:text-purple-400 transition-colors duration-200"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      <button
                        onClick={handleResetPassword}
                        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group"
                      >
                        <FaLock className="mr-2 group-hover:-rotate-12 transition-transform duration-300" />
                        Reset Password
                      </button>
                    </div>
                  )}

                  {/* Bottom section like roadmap cards */}
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <p className="text-gray-500 text-sm text-center">
                      Remember your password?{' '}
                      <span 
                        onClick={() => console.log('Navigate to login')}
                        className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors duration-200"
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

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default ForgotPassword;