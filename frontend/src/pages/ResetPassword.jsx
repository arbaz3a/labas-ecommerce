import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { toastId: "reset-mismatch" });
      return;
    }

    setSubmitting(true);

    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      toast.success("Password reset successfully!", {
        toastId: "reset-success",
      });
    } catch (err) {
      const msg =
        err.response?.data?.error || "Reset failed. The link may have expired.";
      toast.dismiss();
      toast.error(msg, { toastId: "reset-error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F7F7F8] relative">
      <button
        onClick={() => navigate("/signin")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <p className="text-lg font-medium tracking-[0.25em] text-black">
            LABAS
          </p>
        </div>

        {!success ? (
          <>
            <h1
              className="text-[24px] font-bold text-center mb-2 text-black"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Set New Password
            </h1>
            <p className="text-center text-[15px] mb-8 text-gray-500">
              Enter your new password below
            </p>
            <div className="auth-card">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="auth-input"
                      style={{ paddingRight: "48px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="auth-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-50 border border-green-200">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h1
              className="text-[28px] font-bold text-center mb-2 text-black"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Password Reset!
            </h1>
            <p className="text-center text-[15px] mb-8 text-gray-500">
              Your password has been reset successfully.
            </p>
            <div className="auth-card text-center flex flex-col items-center">
              <Link
                to="/signin"
                className="btn-primary flex items-center justify-center w-full"
              >
                Sign In
              </Link>
            </div>
          </>
        )}

        <div className="text-center mt-8">
          <Link
            to="/signin"
            className="text-[14px] font-medium text-gray-500 hover:text-black hover:underline transition inline-flex items-center gap-2"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
