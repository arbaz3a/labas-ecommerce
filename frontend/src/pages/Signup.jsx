import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      login(data.user, data.token);
      toast.success("Account created successfully!", { toastId: "register-success" });
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed. Please try again.";
      toast.dismiss();
      toast.error(msg, { toastId: "register-error" });
    } finally {
      setSubmitting(false);
    }
  };

  const getStrength = () => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
    if (/[0-9!@#$%^&*]/.test(password)) s++;
    return s;
  };

  const strength = getStrength();
  const strengthColors = ["#DC2626", "#F59E0B", "#FBBF24", "#16A34A"];

  return (
    <div className="min-h-screen flex bg-white relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </button>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden bg-[#F5F4F0]">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(#C0BFB8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center px-12 max-w-lg">
          <h2 className="text-5xl font-bold mb-6 text-black" style={{ fontFamily: "'Georgia', serif" }}>
            Join LABAS
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            Create your account and discover a world of refined style.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-[#F7F7F8]">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[28px] font-bold text-center mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>
            Create Account
          </h1>
          <p className="text-center text-[15px] mb-8 text-gray-500">Join LABAS today</p>

          <div className="auth-card">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Full Name</label>
                <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className="auth-input" />
              </div>
              <div>
                <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
              </div>
              <div>
                <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="auth-input" style={{ paddingRight: "48px" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {password && (
                  <div className="strength-bar mt-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="segment" style={{ background: i < strength ? strengthColors[strength - 1] : "#E5E5E5" }} />
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" disabled={submitting} className="btn-primary cursor-pointer disabled:opacity-60">
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-[14px] mt-6 text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-black">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
