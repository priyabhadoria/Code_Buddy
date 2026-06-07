import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import AuthLayout, { AuthCard, AuthHeader } from '../components/AuthLayout';

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-danger' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'bg-warning' };
  if (score === 3) return { score: 3, label: 'Good', color: 'bg-success' };
  return { score: 4, label: 'Strong', color: 'bg-success' };
}

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorType('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/register',
        { name: name.trim(), email: email.trim(), password },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setIsSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1200);
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message?.toLowerCase() || '';

        if (
          statusCode === 409 ||
          serverMessage.includes('exist') ||
          serverMessage.includes('already') ||
          serverMessage.includes('registered')
        ) {
          setErrorType('signin');
          setErrorMessage('An account with this email already exists.');
        } else if (serverMessage.includes('password') || statusCode === 400) {
          setErrorType('password');
          setErrorMessage(error.response.data?.message || 'Please choose a stronger password.');
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
        <p className="text-sm text-muted text-center -mt-4">Create your developer account.</p>

        {isSuccess && (
          <div
            role="status"
            className="p-3.5 rounded-lg border bg-success/10 border-success/30 text-success flex items-start gap-2.5 animate-fade-in"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm font-medium">Account created! Redirecting to your dashboard…</p>
          </div>
        )}

        {errorMessage && !isSuccess && (
          <div
            role="alert"
            aria-live="polite"
            className={`p-3.5 rounded-lg border flex items-start gap-2.5 animate-fade-in ${
              errorType === 'signin'
                ? 'bg-warning/10 border-warning/30 text-warning'
                : 'bg-danger/10 border-danger/30 text-danger'
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1 text-sm">
              <p className="font-medium">{errorMessage}</p>
              {errorType === 'signin' && (
                <Link
                  to="/signin"
                  className="mt-1.5 text-xs font-bold text-accent underline block hover:text-accent-muted"
                >
                  Sign in instead →
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide text-text" htmlFor="name">
              Full Name
            </label>
            <div className="input-field relative flex items-center group">
              <User className="absolute left-3 text-subtle group-focus-within:text-accent-muted transition-colors w-5 h-5" aria-hidden="true" />
              <input
                className="w-full bg-transparent border-none text-text pl-10 pr-4 py-3 focus:ring-0 placeholder:text-subtle text-sm focus:outline-none disabled:opacity-50"
                id="name"
                name="name"
                type="text"
                placeholder="Linus Torvalds"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading || isSuccess}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide text-text" htmlFor="email">
              Email Address
            </label>
            <div
              className={`input-field relative flex items-center group ${
                errorType === 'signin' ? 'border-warning/60 ring-2 ring-warning/15' : ''
              }`}
            >
              <Mail className="absolute left-3 text-subtle group-focus-within:text-accent-muted transition-colors w-5 h-5" aria-hidden="true" />
              <input
                className="w-full bg-transparent border-none text-text pl-10 pr-4 py-3 focus:ring-0 placeholder:text-subtle text-sm focus:outline-none disabled:opacity-50"
                id="email"
                name="email"
                type="email"
                placeholder="developer@codebuddy.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                aria-invalid={errorType === 'signin'}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide text-text" htmlFor="password">
              Password
            </label>
            <div
              className={`input-field relative flex items-center group ${
                errorType === 'password' ? 'border-danger/60 ring-2 ring-danger/15' : ''
              }`}
            >
              <Lock className="absolute left-3 text-subtle group-focus-within:text-accent-muted transition-colors w-5 h-5" aria-hidden="true" />
              <input
                className="w-full bg-transparent border-none text-text pl-10 pr-10 py-3 focus:ring-0 placeholder:text-subtle text-sm focus:outline-none disabled:opacity-50"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isSuccess}
                aria-invalid={errorType === 'password'}
                minLength={8}
                required
              />
              <button
                className="absolute right-3 text-subtle hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted/50 rounded"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || isSuccess}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1" aria-hidden="true">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.score ? passwordStrength.color : 'bg-border/50'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted">
                  Strength: <span className="font-semibold text-text">{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>

          <button
              className="btn-primary w-full mt-1 text-sm py-3 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            type="submit"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="text-center border-t border-border/20 pt-4">
          <p className="text-xs text-muted">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-accent hover:text-accent-muted font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignUp;
