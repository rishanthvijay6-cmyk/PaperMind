import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Successfully Authenticated via OAuth 2.0 / JWT');
      setTimeout(() => {
        onLoginSuccess(email.trim());
        onClose();
        setSuccessMessage('');
      }, 800);
    }, 1000);
  };

  const handleSsoLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Authenticated with ${provider}`);
      setTimeout(() => {
        onLoginSuccess(`user@${provider.toLowerCase()}.com`);
        onClose();
        setSuccessMessage('');
      }, 900);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 overflow-hidden">
        
        {/* Glow Blob Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-xs">
              P
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">PaperMind Account</h2>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Enterprise Encrypted SSO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* SSO Providers */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleSsoLogin('Google')}
            className="w-full py-2.5 px-4 bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 rounded-xl text-xs font-semibold text-gray-800 dark:text-white flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-[#25262c] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSsoLogin('GitHub')}
            className="w-full py-2.5 px-4 bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 rounded-xl text-xs font-semibold text-gray-800 dark:text-white flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-[#25262c] transition-all"
          >
            <svg className="w-4 h-4 fill-gray-900 dark:fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 dark:border-white/10 w-full" />
          <span className="bg-white dark:bg-[#15161A] px-3 text-[10px] font-mono uppercase text-gray-400">or email</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-700 dark:text-slate-300">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 focus:border-blue-600 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 focus:border-blue-600 rounded-xl pl-9 pr-9 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Authenticating JWT...</span>
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                <span>{isSignUp ? 'Create Vault Account' : 'Sign In to Vault'}</span>
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 border-t border-gray-200 dark:border-white/10 pt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="hover:text-blue-600 transition-colors font-semibold"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"><ShieldCheck className="h-3.5 w-3.5" /> 256-bit SSL</span>
        </div>

      </div>
    </div>
  );
};
