import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      /*
        Django API connection will go here.

        Example:

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Invalid email or password.");
        }

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        navigate("/admin");
      */

      // Temporary login while Django is being completed
      setTimeout(() => {
        navigate("/admin");
      }, 700);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-10">

          <Link to="/" className="inline-block">
            <h1
              className="text-4xl font-bold text-[#785900]"
              style={{ fontFamily: "Montserrat" }}
            >
              DELI EGGS
            </h1>
          </Link>

          <p className="mt-3 text-gray-500">
            Admin Portal
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8DED0] p-8 md:p-10">

          <div className="mb-8">

            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Montserrat" }}
            >
              Welcome back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to manage your DELI EGGS business.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@delieggs.co.za"
                  autoComplete="email"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none transition focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#785900] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 bg-white outline-none transition focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#785900] transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember Me */}
            <div className="flex items-center">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#785900]"
                />

                <span className="text-sm text-gray-600">
                  Remember me
                </span>

              </label>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#785900] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#5d4400] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

        </div>

        {/* Back to website */}
        <div className="text-center mt-8">

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-[#785900] transition"
          >
            ← Back to DELI EGGS website
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;