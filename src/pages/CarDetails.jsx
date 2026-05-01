import { useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Fuel, Users, Settings2, Calendar, Shield, Check, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useCars } from '../hooks/useCars';

export default function CarDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { cars } = useCars();
  const car = cars.find(c => String(c.id) === String(id));

  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  if (!car) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Voiture non trouvée</h2>
          <Link to="/cars" className="btn-primary">Retour aux voitures</Link>
        </div>
      </div>
    );
  }


  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    toggleFavorite(car.id);
  };

  const similarCars = cars.filter(c => c.id !== car.id && c.city === car.city).slice(0, 3);

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-slate-400 mb-6"
        >
          <Link to="/cars" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
            <ArrowLeft size={16} />
            Retour
          </Link>
          <span>/</span>
          <span className="text-white">{car.brand} {car.model}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={car.image || car.gallery?.[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Car Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 !transform-none"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-slate-400">{car.year} • {car.description}</p>
                </div>
                <button
                  onClick={handleToggleFavorite}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isFavorite(car.id)
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-400/30'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:text-rose-400'
                  }`}
                >
                  <Heart size={20} fill={isFavorite(car.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <span className="font-semibold text-white">{car.rating}</span>
                  <span className="text-slate-500 text-sm">({car.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin size={14} />
                  {car.city}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: <Settings2 size={20} />, label: 'Transmission', value: car.transmission },
                  { icon: <Fuel size={20} />, label: 'Carburant', value: car.fuel },
                  { icon: <Users size={20} />, label: 'Places', value: `${car.seats} places` },
                  { icon: <Calendar size={20} />, label: 'Année', value: car.year },
                ].map((spec, i) => (
                  <div key={i} className="bg-white/3 rounded-xl p-4 border border-white/5">
                    <div className="text-primary-400 mb-2">{spec.icon}</div>
                    <div className="text-xs text-slate-500 mb-0.5">{spec.label}</div>
                    <div className="text-white font-semibold text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-white font-semibold mb-3">Équipements</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/8 border border-primary-500/15 text-primary-300 text-sm"
                    >
                      <Check size={14} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Price Card (Sticky) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 !transform-none lg:sticky lg:top-24"
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold gradient-text">{car.price} DZD</span>
                  <span className="text-slate-500">/jour</span>
                </div>
                <p className="text-slate-400 text-sm">Assurance incluse</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">3 jours</span>
                  <span className="text-white font-semibold">{car.price * 3} DZD</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">7 jours</span>
                  <span className="text-white font-semibold">{Math.round(car.price * 7 * 0.9)} DZD</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">30 jours</span>
                  <span className="text-white font-semibold">{Math.round(car.price * 30 * 0.8)} DZD</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Assurance tous risques',
                  'Kilométrage illimité',
                  'Assistance 24/7',
                  'Annulation gratuite'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <Shield size={14} className="text-green-400" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                to={`/reserve/${car.id}`}
                className={`w-full text-center py-3.5 rounded-xl font-semibold transition-all duration-300 block ${
                  car.available !== false
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5'
                    : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'
                }`}
              >
                {car.available ? 'Réserver Maintenant' : 'Indisponible'}
              </Link>

              <p className="text-center text-slate-500 text-xs mt-3">
                Réservation instantanée • Paiement sécurisé
              </p>
            </motion.div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Véhicules similaires à <span className="gradient-text">{car.city}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((c) => (
                <div key={c.id} className="glass-card group overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.image} alt={`${c.brand} ${c.model}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-primary-500/20 backdrop-blur-md text-primary-300 text-sm font-bold border border-primary-400/20">
                      {c.price} DZD/jour
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold">{c.brand} {c.model}</h3>
                    <p className="text-slate-400 text-sm mb-3">{c.year} • {c.transmission}</p>
                    <Link to={`/cars/${c.id}`} className="btn-primary w-full text-center block text-sm !py-2.5">
                      Voir les détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
