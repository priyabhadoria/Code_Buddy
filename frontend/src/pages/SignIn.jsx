import { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import AuthLayout, { AuthCard, AuthHeader } from '../components/AuthLayout';

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.005-.54-1.005-1.005 0-1.005.585 0 1.005.675 1.145.945.66 1.23 1.71 1.77 2.625 1.77.975 0 1.515-.225 1.875-.45.06-.705.405-1.41.735-1.725-2.565-.285-5.25-1.275-5.25-5.655 0-1.245.45-2.265 1.185-3.06-.12-.285-.54-1.365.12-2.835 0 0 .975-.3 3.195 1.17.93-.255 1.92-.39 2.91-.39.99 0 1.98.135 2.91.39 2.22-1.485 3.195-1.17 3.195-1.17.66 1.47.24 2.55.12 2.835.735.795 1.185 1.815 1.185 3.06 0 4.395-2.685 5.37-5.25 5.655.405.345.765.975.765 2.01 0 1.455-.015 2.625-.015 2.985 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorType('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        { email: email.trim(), password },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message?.toLowerCase() || '';

        if (
          statusCode === 404 ||
          serverMessage.includes('email') ||
          serverMessage.includes('user') ||
          serverMessage.includes('not found')
        ) {
          setErrorType('register');
          setErrorMessage('This email is not registered. Please create an account.');
          emailRef.current?.focus();
        } else if (
          statusCode === 401 ||
          serverMessage.includes('password') ||
          serverMessage.includes('invalid credential')
        ) {
          setErrorType('password');
          setErrorMessage('Incorrect password. Please try again.');
          passwordRef.current?.focus();
        } else {
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
    <AuthLayout>
      <AuthCard>
        <AuthHeader />
        <p className="text-sm text-muted text-center -mt-4">Sign in to your developer workspace.</p>

        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className={`p-3.5 rounded-lg border flex items-start gap-2.5 animate-fade-in ${
              errorType === 'register'
                ? 'bg-warning/10 border-warning/30 text-warning'
                : 'bg-danger/10 border-danger/30 text-danger'
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1 text-sm">
              <p className="font-medium">{errorMessage}</p>
              {errorType === 'register' && (
                <Link
                  to="/signup"
                  className="mt-1.5 text-xs font-bold text-accent underline block hover:text-accent-muted"
                >
                  Create an account now →
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" autoComplete="off">
          <input type="text" name="prevent_autofill" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
          <input type="password" name="password_prevent_autofill" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide text-text" htmlFor="email">
              Email Address
            </label>
            <div
              className={`input-field relative flex items-center group ${
                errorType === 'register' ? 'border-warning/60 ring-2 ring-warning/15' : ''
              }`}
            >
              <Mail className="absolute left-3 text-subtle group-focus-within:text-accent-muted transition-colors w-5 h-5" aria-hidden="true" />
              <input
                ref={emailRef}
                className="w-full bg-transparent border-none text-text pl-10 pr-4 py-3 focus:ring-0 placeholder:text-subtle text-sm focus:outline-none disabled:opacity-50"
                id="email"
                type="email"
                name="email_secure"
                placeholder="developer@codebuddy.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="one-time-code"
                aria-invalid={errorType === 'register'}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center w-full">
              <label className="text-sm font-semibold tracking-wide text-text" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs font-semibold text-accent hover:text-accent-indigo-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                Forgot?
              </button>
            </div>
            <div
              className={`input-field relative flex items-center group ${
                errorType === 'password' ? 'border-danger/60 ring-2 ring-danger/15' : ''
              }`}
            >
              <Lock className="absolute left-3 text-subtle group-focus-within:text-accent-muted transition-colors w-5 h-5" aria-hidden="true" />
              <input
                ref={passwordRef}
                className="w-full bg-transparent border-none text-text pl-10 pr-10 py-3 focus:ring-0 placeholder:text-subtle text-sm focus:outline-none disabled:opacity-50"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password_secure"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                aria-invalid={errorType === 'password'}
                required
              />
              <button
                className="absolute right-3 text-subtle hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted/50 rounded disabled:opacity-50"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
              className="btn-primary w-full mt-1 text-sm py-3 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Verifying…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30" />
          </div>
          <div className="relative px-4">
            <span className="text-xs text-muted px-2">Or continue with</span>
          </div>
        </div>

        <button type="button" className="btn-ghost w-full py-3 flex items-center justify-center gap-2 text-sm">
          <GitHubIcon className="w-5 h-5" />
          GitHub
        </button>

        <div className="text-center border-t border-border/20 pt-4">
          <p className="text-xs text-muted">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
                className="text-accent hover:text-[#8083ff] font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignIn;
