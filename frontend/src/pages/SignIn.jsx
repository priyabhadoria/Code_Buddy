import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Custom Frontend Error & Loading States
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(''); // 'register' | 'password' | 'generic'
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorType('');
    setIsLoading(true);

    try {
      const API_URL = 'http://localhost:3000/api/auth/user/login'; 
      
      const response = await axios.post(API_URL, {
        email: email.trim(),
        password: password
      }, { withCredentials: true });

      // Success Case
      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/dashboard"); 
      }

    } catch (error) {
      console.error("Authentication Error:", error);

      if (error.response) {
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message?.toLowerCase() || '';

        if (statusCode === 404 || serverMessage.includes('email') || serverMessage.includes('user') || serverMessage.includes('not found')) {
          setErrorType('register');
          setErrorMessage('This email is not registered. Please create an account.');
        } 
        else if (statusCode === 401 || serverMessage.includes('password') || serverMessage.includes('invalid credential')) {
          setErrorType('password');
          setErrorMessage('Incorrect password. Please try again.');
        } 
        else {
          setErrorType('generic');
          setErrorMessage(error.response.data?.message || 'Something went wrong. Please try again.');
        }
      } else {
        setErrorType('generic');
        setErrorMessage('Cannot connect to the server. Please check your network.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0c1324] text-[#dce1fb] min-h-screen flex items-center justify-center relative overflow-hidden font-['Plus_Jakarta_Sans'] selection:bg-[#8083ff] selection:text-[#0d0096]">
      
      <div className="absolute w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(192,193,255,0.05)_0%,rgba(12,19,36,0)_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>

      <main className="w-full max-w-md px-4 md:px-0 z-10 relative">
        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-[#c0c1ff]/10 border-t-[#c0c1ff]/20 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="text-center flex flex-col gap-1">
            <div onClick={() => navigate('/')} className="flex items-center justify-center gap-2 mb-1 hover:opacity-90 transition-opacity cursor-pointer">
              <Terminal className="text-[#c0c1ff] w-8 h-8" />
              <h1 className="text-3xl font-extrabold text-[#c0c1ff] tracking-tight">CodeWise</h1>
            </div>
            <p className="text-sm text-[#c7c4d7]">Sign in to your developer workspace.</p>
          </div>

          {/* Custom Alerts Box */}
          {errorMessage && (
            <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 animate-fadeIn transition-all duration-300 ${
              errorType === 'register' 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{errorMessage}</p>
                {errorType === 'register' && (
                  <button 
                    type="button" 
                    onClick={() => navigate('/signup')} 
                    className="mt-1.5 text-xs font-bold text-white underline block hover:text-[#c0c1ff]"
                  >
                    Create an account now →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Form with AutoComplete Disabled */}
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5 w-full"
            autoComplete="off"
          >
            {/* Fake inputs to fool modern browser password managers */}
            <input type="text" name="prevent_autofill" id="prevent_autofill" style={{display: 'none'}} />
            <input type="password" name="password_prevent_autofill" id="password_prevent_autofill" style={{display: 'none'}} />
            
            {/* Email Field */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-semibold tracking-wide text-[#dce1fb]" htmlFor="email">
                Email Address
              </label>
              <div className={`relative flex items-center bg-[#191f31] rounded-lg border transition-all duration-200 group ${
                errorType === 'register' ? 'border-amber-500/60 ring-2 ring-amber-500/20' : 'border-[#464554]/30 focus-within:ring-2 focus-within:ring-[#c0c1ff]/20 focus-within:border-[#c0c1ff]'
              }`}>
                <Mail className="absolute left-3 text-[#c7c4d7] group-focus-within:text-[#c0c1ff] transition-colors w-5 h-5" />
                <input
                  className="w-full bg-transparent border-none text-[#dce1fb] pl-10 pr-4 py-3 focus:ring-0 placeholder:text-[#c7c4d7]/40 text-sm focus:outline-none disabled:opacity-50"
                  id="email"
                  type="email"
                  name="email_secure"
                  placeholder="developer@codewise.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1 relative">
              <div className="flex justify-between items-center w-full">
                <label className="text-xs font-semibold tracking-wide text-[#dce1fb]" htmlFor="password">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold text-[#c0c1ff] hover:text-[#8083ff] transition-colors focus:outline-none disabled:opacity-50"
                  disabled={isLoading}
                >
                  Forgot?
                </button>
              </div>
              <div className={`relative flex items-center bg-[#191f31] rounded-lg border transition-all duration-200 group ${
                errorType === 'password' ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-[#464554]/30 focus-within:ring-2 focus-within:ring-[#c0c1ff]/20 focus-within:border-[#c0c1ff]'
              }`}>
                <Lock className="absolute left-3 text-[#c7c4d7] group-focus-within:text-[#c0c1ff] transition-colors w-5 h-5" />
                <input
                  className="w-full bg-transparent border-none text-[#dce1fb] pl-10 pr-10 py-3 focus:ring-0 placeholder:text-[#c7c4d7]/40 text-sm focus:outline-none disabled:opacity-50"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password_secure"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                  required
                />
                <button
                  className="absolute right-3 text-[#c7c4d7] hover:text-[#dce1fb] transition-colors focus:outline-none flex items-center justify-center disabled:opacity-50"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              className="w-full mt-2 bg-[#494bd6] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#8083ff] transition-all duration-200 shadow-[0_0_15px_rgba(192,193,255,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center border-t border-[#464554]/20 pt-4">
            <p className="text-xs text-[#c7c4d7]">
              Don't have an account? 
              <button 
                onClick={() => navigate('/signup')} 
                className="text-[#c0c1ff] hover:text-[#8083ff] font-semibold transition-colors focus:outline-none hover:underline ml-1 disabled:opacity-50"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SignIn;