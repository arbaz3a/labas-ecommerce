import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, name: email.split("@")[0] });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex bg-white relative">
<button
        onClick={() => navigate("/")}
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
            Welcome Back
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            Sign in to explore your curated collection and exclusive offers.
          </p>
        </div>
      </div>
<div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-[#F7F7F8]">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[28px] font-bold text-center mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>
            Sign In
          </h1>
          <p className="text-center text-[15px] mb-8 text-gray-500">
            Welcome back to LABAS
          </p>

          <div className="auth-card">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
              </div>

              <div>
                <label className="block text-[12px] font-medium tracking-[0.15em] uppercase mb-2 text-gray-400">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input" style={{ paddingRight: "48px" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-[13px] font-medium text-gray-500 hover:text-black hover:underline transition">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn-primary mt-2 cursor-pointer">Sign In</button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[13px] text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <p className="text-center text-[14px] text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-black">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
