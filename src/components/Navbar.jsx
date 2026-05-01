import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, Heart, CalendarDays, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close the mobile menu after route changes
    const t = window.setTimeout(() => setIsOpen(false), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <Car size={18} /> },
    { path: '/cars', label: 'Voitures', icon: <Car size={18} /> },
    isAdmin 
      ? { path: '/admin', label: 'Admin Panel', icon: <Shield size={18} /> }
      : { path: '/dashboard', label: 'Mes Réservations', icon: <CalendarDays size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const favoritesPath = isAuthenticated ? '/dashboard?tab=favorites' : '/login';
  const accountPath = isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login';

  const handleLogout = async () => {
    // Redirection immédiate pour garantir l'UX, sans attendre Supabase
    navigate('/login');
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300">
                <Car size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Auto</span>
                <span className="gradient-text">-Loc</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/8 rounded-xl border border-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={favoritesPath}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-white/8 hover:border-rose-400/20 transition-all duration-300"
              >
                <Heart size={18} />
              </Link>
              {!isAuthenticated ? (
                <Link
                  to={accountPath}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold hover:from-primary-400 hover:to-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <User size={16} />
                  Connexion
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all duration-300"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="mx-4 mt-2 p-4 rounded-2xl bg-dark-800/95 backdrop-blur-xl border border-white/8 shadow-2xl">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <hr className="border-white/8 my-2" />
                <Link
                  to={favoritesPath}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-all duration-200"
                >
                  <Heart size={18} />
                  Mes Favoris
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to={accountPath}
                      className="flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                    >
                      <User size={18} />
                      Mon Compte
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all duration-200"
                    >
                      <LogOut size={18} />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={accountPath}
                      className="flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                    >
                      <User size={18} />
                      Connexion
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all duration-200"
                    >
                      <User size={18} />
                      Créer un compte
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
