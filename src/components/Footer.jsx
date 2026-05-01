import { Link } from 'react-router-dom';
import { Car, MapPin, Phone, Mail, ArrowRight, GitBranch, Send, Link2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-dark-800 border-t border-white/5">
      {/* Gradient line on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center">
                <Car size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Auto</span>
                <span className="gradient-text">-Loc</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour la location de voitures en Algerie. 
              Service premium, prix compétitifs.
            </p>
            <div className="flex items-center gap-3">
              {[Send, GitBranch, Link2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Liens Rapides</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Nos Voitures', path: '/cars' },
                { label: 'Mes Réservations', path: '/dashboard' },
                { label: 'À Propos', path: '#' },
                { label: 'Contact', path: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Nos Villes</h3>
            <ul className="space-y-3">
              {['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Setif'].map((city) => (
                <li key={city}>
                  <Link
                    to={`/cars?city=${city}`}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <MapPin size={14} />
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={14} className="text-primary-400" />
                +213 21 00 00 00
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={14} className="text-primary-400" />
                contact@auto-loc.dz
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={14} className="text-primary-400 mt-0.5" />
                Alger, Algerie
              </li>
            </ul>

            <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="input-field text-sm !py-2.5 !px-3 flex-1"
              />
              <button className="btn-primary !py-2.5 !px-4 text-sm">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Auto-Loc. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {['Conditions Générales', 'Politique de Confidentialité', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
