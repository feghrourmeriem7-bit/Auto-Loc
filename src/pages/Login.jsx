import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }
    const from = location.state?.from;
    const target =
      from && from !== '/' ? from : '/dashboard';
    navigate(target, { replace: true });
  }, [user, navigate, location]);

  useEffect(() => {
    const msg = location.state?.oauthError;
    if (msg) setError(msg);
  }, [location.state?.oauthError]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Chemin dédié : à ajouter tel quel dans Supabase → Authentication → Redirect URLs
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Erreur avec Google');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Utilise le client supabase qui va stocker la session persistante
      const result = await login(email, password);

      // Redirection fluide sans recharger la page
      if (result?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Identifiants invalides ou erreur de connexion');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px] lg:min-h-[700px]">
        
        {/* Left Pane - Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-black flex-col justify-end">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200&h=1600" 
            alt="Luxury Blue Porsche" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Text Content */}
          <div className="relative z-10 p-10 lg:p-14 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Auto-Loc</h2>
            <h3 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4">
              Experience the peak of<br/>automotive luxury.
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Join our exclusive community and unlock access to the world's most prestigious vehicles.
            </p>
          </div>
        </div>

        {/* Right Pane - Form */}
        <div className="w-full md:w-1/2 bg-dark-900 flex flex-col justify-center px-8 py-12 lg:px-16 border-l border-white/5">
          <div className="max-w-sm w-full mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-400 text-sm">Enter your credentials to access your premium account.</p>
            </div>

            {/* Social Login Buttons (UI Only) */}
            <div className="space-y-3 mb-8">
              <button 
                type="button" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Continue with Google
              </button>
              <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 1.58-.04 2.94.48 3.85 1.44-3.23 2-2.58 6.43.6 7.72-.73 1.58-1.55 2.94-3.11 3.8zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs font-semibold text-slate-500 tracking-wider">OR WITH EMAIL</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-dark-800/50 text-white placeholder:text-slate-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" 
                  placeholder="name@luxury.com" 
                  required 
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-300">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary-400 hover:text-primary-300">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-dark-800/50 text-white placeholder:text-slate-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" 
                  placeholder="••••••••" 
                  required 
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-white/20 bg-dark-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-900"
                />
                <label htmlFor="remember" className="text-sm text-slate-400">Remember me for 30 days</label>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-medium bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-3.5 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center mt-2"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : 'Sign In to Auto-Loc'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-6">
              <p className="text-sm text-slate-400">
                Don't have an account? <Link to="/signup" className="text-white font-bold hover:underline">Create an account</Link>
              </p>
              
              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-medium pt-4">
                <a href="#" className="hover:text-slate-300">Support</a>
                <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300">Terms</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}