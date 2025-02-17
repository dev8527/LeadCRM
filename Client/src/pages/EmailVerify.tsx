import { useState, useRef } from "react";
import { Check, RefreshCcw } from "lucide-react";
import axios from "axios";  // Import axios for API calls

import { verifyEmail } from "../hooks/authService"; // Import the email Verify function
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [activationCode, setActivationCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle change in activation code input
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value)) && value !== "") return; // Ensure only numbers are entered

    const newCode = [...activationCode];
    newCode[index] = value;
    setActivationCode(newCode);

    // Move to next input
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && activationCode[index] === "") {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle paste event to fill the activation code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const numbers = pastedData.replace(/[^0-9]/g, "").split("");

    const newCode = [...activationCode];
    numbers.forEach((num, index) => {
      if (index < 4) newCode[index] = num;
    });
    setActivationCode(newCode);
  };

  // Handle verification API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const code = activationCode.join("");
    if (code.length !== 4) {
      setError("Please enter the complete activation code");
      setIsLoading(false);
      return;
    }

    try {
      const userData = { activation_code: parseInt(code, 10) };

      const response = await verifyEmail(userData);
      if (response) {
        setIsVerified(true);
        localStorage.removeItem("activationToken");  // Clear the token after successful verification
        navigate("/login");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending the verification code
  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      // Call API to resend the code
      const response = await axios.post(`${API_URL}/resend-code`);

      if (response.data.success) {
        setError("");  // Clear any existing error
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        {isVerified ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
            <p className="text-gray-600">Your email has been successfully verified.</p>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
              <p className="text-sm text-gray-600">
                We've sent a 4-digit activation code to your email
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4">
                {activationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center mx-auto"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Resend verification code
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
