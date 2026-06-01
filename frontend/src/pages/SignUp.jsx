

import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Terminal, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import axios from 'axios'
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          name,
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        alert("Registration Successful!");

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="bg-[#0c1324] text-[#dce1fb] min-h-screen flex items-center justify-center relative overflow-hidden font-['Plus_Jakarta_Sans'] selection:bg-[#8083ff] selection:text-[#0d0096]">

      {/* Ambient Background Glow Effect */}
      <div className="absolute w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(192,193,255,0.05)_0%,rgba(12,19,36,0)_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Main Form Container */}
      <main className="w-full max-w-md px-4 md:px-0 z-10 relative">
        {/* Glassmorphism Card */}
        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-[#c0c1ff]/10 border-t-[#c0c1ff]/20 rounded-2xl p-8 flex flex-col gap-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),_inset_0_0_20px_rgba(192,193,255,0.03)]">

          {/* Header Section */}
          <div className="text-center flex flex-col gap-2">
            <a className="flex items-center justify-center gap-2 mb-2 hover:opacity-90 transition-opacity" href="index.html">
              <Terminal className="text-[#c0c1ff] w-8 h-8" />
              <h1 className="text-3xl font-extrabold text-[#c0c1ff] tracking-tight">Code Buddy</h1>
            </a>
            <p className="text-base text-[#c7c4d7]">Create your developer account.</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

            {/* Full Name Field */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-semibold tracking-wide text-[#dce1fb]" htmlFor="name">
                Full Name
              </label>
              <div className="relative flex items-center bg-[#191f31] rounded-lg border border-[#464554]/30 focus-within:ring-2 focus-within:ring-[#c0c1ff]/20 focus-within:border-[#c0c1ff] transition-all duration-200 group">
                <User className="absolute left-3 text-[#c7c4d7] group-focus-within:text-[#c0c1ff] transition-colors w-5 h-5" />
                <input
                  className="w-full bg-transparent border-none text-[#dce1fb] pl-10 pr-4 py-3 focus:ring-0 placeholder:text-[#c7c4d7]/50 text-base"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Linus Torvalds"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-semibold tracking-wide text-[#dce1fb]" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center bg-[#191f31] rounded-lg border border-[#464554]/30 focus-within:ring-2 focus-within:ring-[#c0c1ff]/20 focus-within:border-[#c0c1ff] transition-all duration-200 group">
                <Mail className="absolute left-3 text-[#c7c4d7] group-focus-within:text-[#c0c1ff] transition-colors w-5 h-5" />
                <input
                  className="w-full bg-transparent border-none text-[#dce1fb] pl-10 pr-4 py-3 focus:ring-0 placeholder:text-[#c7c4d7]/50 text-base"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="developer@codebuddy.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-semibold tracking-wide text-[#dce1fb]" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center bg-[#191f31] rounded-lg border border-[#464554]/30 focus-within:ring-2 focus-within:ring-[#c0c1ff]/20 focus-within:border-[#c0c1ff] transition-all duration-200 group">
                <Lock className="absolute left-3 text-[#c7c4d7] group-focus-within:text-[#c0c1ff] transition-colors w-5 h-5" />
                <input
                  className="w-full bg-transparent border-none text-[#dce1fb] pl-10 pr-10 py-3 focus:ring-0 placeholder:text-[#c7c4d7]/50 text-base"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute right-3 text-[#c7c4d7] hover:text-[#dce1fb] transition-colors focus:outline-none flex items-center justify-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mt-3 bg-[#494bd6] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#8083ff] transition-all duration-200 shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
              type="submit"

            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center w-full my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#464554]/30"></div>
            </div>
            <div className="relative px-4">
              <span className="text-xs text-[#c7c4d7] px-2 rounded backdrop-blur-md bg-[#0f172a]/60">
                Or sign up with
              </span>
            </div>
          </div>





          {/* Footer Section */}
          <div className="text-center">
            <p className="text-xs text-[#c7c4d7]">
              Already have an account?
              <Link to='/signin' className="text-[#c0c1ff] hover:text-[#8083ff] font-semibold transition-colors focus:outline-none focus:underline ml-1" href="#">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SignUp;