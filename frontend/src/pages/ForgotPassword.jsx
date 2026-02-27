import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      toast.dismiss();
      toast.error(msg, { toastId: "forgot-error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F7F7F8] relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <p className="text-lg font-medium tracking-[0.25em] text-black">LABAS</p>
        </div>

        {!submitted ? (
          <>
            <h1 className="text-[24px] font-bold text-center mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>Reset your password</h1>
            <p className="text-center text-[15px] mb-8 text-gray-500">Enter your email and we'll send you a reset link</p>
            <div className="auth-card">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Email</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary mt-2 cursor-pointer disabled:opacity-60">
                  {submitting ? "Sending..." : "Send Reset Link"}
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
            <h1 className="text-[28px] font-bold text-center mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>Check your inbox</h1>
            <p className="text-center text-[15px] mb-8 text-gray-500">We've sent a password reset link to <strong className="text-black">{email}</strong></p>
            <div className="auth-card text-center">
              <p className="text-[14px] mb-6 text-gray-500">Didn't receive the email? Check your spam folder or try again.</p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost w-full cursor-pointer" style={{ height: "48px" }}>Resend Email</button>
            </div>
          </>
        )}

        <div className="text-center mt-8">
          <Link to="/signin" className="text-[14px] font-medium text-gray-500 hover:text-black hover:underline transition inline-flex items-center gap-2">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
