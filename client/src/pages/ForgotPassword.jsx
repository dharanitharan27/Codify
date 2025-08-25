import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../components/loadingContext";
import { useAuth } from "../store/auth";
import OtpModal from "../components/OtpModal";
import { FaEnvelope } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

//   const verifyOtp = async () => {
//     try {
//       setIsLoading(true);
//       const otpString = otp.join("");
//       const response = await fetch(`${API}/api/v1/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp: otpString }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         const stored = JSON.parse(localStorage.getItem("forgotEmail"));
//         if (stored && stored.exists) {
//           toast.success("OTP verified! You can now reset your password.");
//           setShowReset(true);
//         } else {
//           toast.error("Email does not exist in our records.");
//         }
//       } else {
//         toast.error("Invalid OTP");
//       }
//     } catch (error) {
//       toast.error("Error verifying OTP");
//     } finally {
//       setIsLoading(false);
//       setShowOtpModal(false);
//     }
//   };
 const verifyOtp = async () => {
  try {
    setIsLoading(true);
    const otpString = otp.join("");

    // Step 1: Verify OTP
    const response = await fetch(`${API}/api/v1/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: otpString }),
    });

    const result = await response.json();

    if (response.ok) {
      // Step 2: Check if email exists
      const emailCheckRes = await fetch(`${API}/api/v1/auth/forgot-password/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const emailCheckData = await emailCheckRes.json();

      if (emailCheckRes.ok) {
        toast.success("OTP verified! You can reset your password.");
        setShowReset(true); // Show password reset input
      } else {
        toast.error(emailCheckData.message || "Email is not registered in our system.");
        setShowReset(false);
        setEmail(""); // Clear email input
      }

      setShowOtpModal(false); // Close OTP modal
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
      <div
        className={`relative min-h-screen-minus-nav flex items-center justify-center p-4 md:p-8 overflow-hidden z-10 ${
          isDark ? "bg-dark-bg-primary text-dark-text-primary" : "bg-light-bg-primary text-light-text-primary"
        }`}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              <h1 className="text-4xl md:text-5xl font-righteous text-center md:text-left tracking-wider mb-6">
                <span className="text-primary">Forgot</span> Password?
              </h1>
              <p
                className={`text-center md:text-left mb-8 max-w-md ${
                  isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
                }`}
              >
                Enter your registered email to receive an OTP for password reset.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div
                className={`w-full max-w-md p-8 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                  isDark
                    ? "bg-dark-bg-secondary/90 border border-dark-border"
                    : "bg-light-bg-secondary/90 border border-light-border"
                }`}
              >
                <h2 className="text-3xl font-righteous text-center mb-8">Forgot Password</h2>
                {!showReset ? (
                  <form onSubmit={handleSendOtp}>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className={`block mb-2 text-sm font-medium ${
                          isDark ? "text-dark-text-primary" : "text-light-text-primary"
                        }`}
                      >
                        <div className="flex items-center">
                          <FaEnvelope className="mr-2 text-primary" />
                          Email
                        </div>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDark
                            ? "bg-dark-bg-tertiary text-dark-text-primary border-dark-border"
                            : "bg-light-bg-tertiary text-light-text-primary border-light-border"
                        } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Send OTP
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="relative mb-4">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter new password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className={`w-full px-4 py-3 rounded-lg ${
      isDark
        ? "bg-dark-bg-tertiary text-dark-text-primary border-dark-border"
        : "bg-light-bg-tertiary text-light-text-primary border-light-border"
    } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
  />
  <span
    className="absolute right-4 top-3 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

                    <button
                      onClick={handleResetPassword}
                      className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Reset Password
                    </button>
                  </div>
                )}
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
