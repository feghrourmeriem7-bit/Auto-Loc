import { useState, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Car } from 'lucide-react';
import CarCard from '../components/CarCard';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useCars } from '../hooks/useCars';

export default function Cars() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'Toutes';

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const { cars } = useCars();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const cities = useMemo(() => ['Toutes', ...new Set(cars.map((c) => c.city))], [cars]);
  const brands = useMemo(() => [...new Set(cars.map((c) => c.brand))], [cars]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // City filter
    if (selectedCity !== 'Toutes') {
      result = result.filter(c => c.city === selectedCity);
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(c => selectedBrands.includes(c.brand));
    }

    // Price filter
    result = result.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);

    // Available only
    if (showAvailableOnly) {
      result = result.filter(c => c.available);
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [selectedCity, selectedBrands, priceRange, sortBy, searchQuery, showAvailableOnly]);

  const clearFilters = () => {
    setSelectedCity('Toutes');
    setSelectedBrands([]);
    setPriceRange([0, 1500]);
    setSortBy('default');
    setSearchQuery('');
    setShowAvailableOnly(false);
  };

  const activeFilterCount = [
    selectedCity !== 'Toutes',
    selectedBrands.length > 0,
    priceRange[0] > 0 || priceRange[1] < 1500,
    showAvailableOnly
  ].filter(Boolean).length;

  const handleToggleFavorite = (carId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    toggleFavorite(carId);
  };

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Nos <span className="gradient-text">Voitures</span>
          </h1>
          <p className="text-slate-400">
            Découvrez notre sélection de véhicules disponibles à la location.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par marque, modèle ou ville..."
              className="input-field !pl-11"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field !pr-10 appearance-none min-w-[180px]"
              >
                <option value="default" className="bg-dark-800">Trier par</option>
                <option value="price-asc" className="bg-dark-800">Prix croissant</option>
                <option value="price-desc" className="bg-dark-800">Prix décroissant</option>
                <option value="rating" className="bg-dark-800">Mieux notés</option>
                <option value="newest" className="bg-dark-800">Plus récents</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                showFilters || activeFilterCount > 0
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-400'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/8'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filtres
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass-card p-6 !transform-none">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Filtres</h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Réinitialiser
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* City */}
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Ville</label>
                    <div className="flex flex-wrap gap-2">
                      {cities.map(city => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            selectedCity === city
                              ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                              : 'bg-white/5 text-slate-400 border border-white/8 hover:bg-white/10'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Marques</label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            selectedBrands.includes(brand)
                              ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                              : 'bg-white/5 text-slate-400 border border-white/8 hover:bg-white/10'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Availability */}
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      Prix max: <span className="text-primary-400 font-semibold">{priceRange[1]} DZD</span>/jour
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={1500}
                      step={50}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-primary-500 mb-4"
                    />
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${showAvailableOnly ? 'bg-primary-500' : 'bg-white/10'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${showAvailableOnly ? 'translate-x-5' : ''}`} />
                      </div>
                      <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Disponibles uniquement</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-semibold">{filteredCars.length}</span> voiture{filteredCars.length !== 1 ? 's' : ''} trouvée{filteredCars.length !== 1 ? 's' : ''}
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors"
            >
              <X size={14} />
              Effacer les filtres
            </button>
          )}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
                isFavorite={isFavorite(car.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-slate-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Aucune voiture trouvée</h3>
            <p className="text-slate-400 text-sm mb-6">Essayez de modifier vos critères de recherche.</p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
