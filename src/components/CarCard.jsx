import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Fuel, Users, Settings2 } from 'lucide-react';

export default function CarCard({ car, isFavorite, onToggleFavorite, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(car.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
            isFavorite
              ? 'bg-rose-500/20 text-rose-400 border border-rose-400/30'
              : 'bg-black/30 text-white/70 border border-white/10 hover:text-rose-400 hover:bg-rose-500/20'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Availability Badge */}
        {!car.available && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-md text-red-400 text-xs font-semibold border border-red-400/20">
            Indisponible
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-primary-500/20 backdrop-blur-md text-primary-300 text-sm font-bold border border-primary-400/20">
          {car.price} DZD<span className="text-primary-400/60 font-normal">/jour</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{car.brand}</h3>
            <p className="text-slate-400 text-sm">{car.model} • {car.year}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold text-white">{car.rating}</span>
            <span className="text-xs text-slate-500">({car.reviews})</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-xs">
            <Settings2 size={13} />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Fuel size={13} />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Users size={13} />
            <span>{car.seats} places</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
          <MapPin size={13} />
          <span>{car.city}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/cars/${car.id}`}
            className="flex-1 text-center py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Détails
          </Link>
          <Link
            to={`/reserve/${car.id}`}
            className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              car.available !== false
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30'
                : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'
            }`}
          >
            Réserver
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
