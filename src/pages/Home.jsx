import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronRight, Shield, Clock, Headphones, Car, Star, ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import CarCard from '../components/CarCard';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useCars } from '../hooks/useCars';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchCity, setSearchCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const { cars } = useCars();
  const { toggleFavorite, isFavorite } = useFavorites();
  // Accueil toujours accessible, connecté ou non : pas de redirection vers /dashboard ou /admin.
  // La redirection des utilisateurs déjà connectés reste gérée sur /login (et les routes protégées).
  const { isAuthenticated } = useAuth();

  const featuredCars = cars.filter(c => c.available).slice(0, 6);
  const cities = ['Toutes', ...new Set(cars.map((c) => c.city))];

  const stats = [
    { value: '200+', label: 'Voitures', icon: <Car size={24} /> },
    { value: '6', label: 'Villes', icon: <MapPin size={24} /> },
    { value: '15K+', label: 'Clients', icon: <Users size={24} /> },
    { value: '4.8', label: 'Note Moyenne', icon: <Star size={24} /> },
  ];

  const steps = [
    {
      icon: <Search size={28} />,
      title: 'Recherchez',
      desc: 'Trouvez la voiture idéale parmi notre large sélection de véhicules.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Calendar size={28} />,
      title: 'Réservez',
      desc: 'Choisissez vos dates et réservez en quelques clics seulement.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Car size={28} />,
      title: 'Roulez',
      desc: 'Récupérez votre véhicule et profitez de votre trajet en toute liberté.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const handleToggleFavorite = (carId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    toggleFavorite(carId);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/60 to-dark-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/50 to-transparent" />
        </div>

        {/* Decoration elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
                <Sparkles size={16} className="text-primary-400" />
                <span className="text-primary-300 text-sm font-medium">
                  Location de voitures premium en Algerie
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Trouvez Votre{' '}
              <span className="gradient-text">Voiture</span>{' '}
              Idéale
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              Explorez notre collection de véhicules haut de gamme et réservez en quelques clics. Service rapide, prix imbattables.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" />
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="input-field !pl-10 appearance-none"
                  >
                    <option value="">Ville</option>
                    {cities.filter(c => c !== 'Toutes').map(city => (
                      <option key={city} value={city} className="bg-dark-800">{city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="input-field !pl-10"
                    placeholder="Date début"
                  />
                </div>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="input-field !pl-10"
                    placeholder="Date fin"
                  />
                </div>
                <Link
                  to={`/cars${searchCity ? `?city=${searchCity}` : ''}`}
                  className="btn-primary flex items-center justify-center gap-2 text-center"
                >
                  <Search size={18} />
                  Rechercher
                </Link>
              </div>
            </motion.div>

            {/* Quick Stats under hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-8 mt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary-400">{stat.icon}</div>
                  <div>
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-slate-500 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-primary-400"
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
              <TrendingUp size={16} />
              Comment ça marche
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Simple comme <span className="gradient-text">1, 2, 3</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Louez votre voiture en quelques minutes grâce à notre processus simplifié.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative glass-card p-8 text-center group"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
                <Sparkles size={16} />
                Sélection Premium
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Voitures <span className="gradient-text">Populaires</span>
              </h2>
            </div>
            <Link
              to="/cars"
              className="mt-4 sm:mt-0 flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group"
            >
              Voir tout
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
                isFavorite={isFavorite(car.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Pourquoi <span className="gradient-text">Auto-Loc</span> ?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nous nous engageons a vous offrir la meilleure expérience de location en Algerie.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={28} />, title: 'Assurance Incluse', desc: 'Tous nos véhicules sont entièrement assurés pour votre tranquillité.' },
              { icon: <Clock size={28} />, title: 'Réservation 24/7', desc: 'Réservez à tout moment, notre plateforme est disponible en permanence.' },
              { icon: <Star size={28} />, title: 'Véhicules Premium', desc: 'Une flotte de véhicules récents et parfaitement entretenus.' },
              { icon: <Headphones size={28} />, title: 'Support Dédié', desc: 'Notre équipe est à votre disposition pour toute assistance.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mx-auto mb-4 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&h=900&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/85 via-dark-900/60 to-dark-900/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30" />
            
            <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Prêt à Prendre la Route ?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Réservez maintenant et profitez de nos offres exclusives. Votre prochaine aventure commence ici.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/cars"
                  className="px-8 py-4 rounded-xl bg-white text-primary-600 font-bold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2"
                >
                  Explorer les voitures
                  <ChevronRight size={20} />
                </Link>
                <a
                  href="tel:+21321000000"
                  className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Nous Contacter
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
