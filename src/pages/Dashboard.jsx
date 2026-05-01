import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Heart, Bell, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Trash2, Eye, LogOut } from 'lucide-react';
import { notifications } from '../data/reservations';
import { useFavorites } from '../hooks/useFavorites';
import { useReservations } from '../hooks/useReservations';
import CarCard from '../components/CarCard';
import { useAuth } from '../hooks/useAuth';
import { useCars } from '../hooks/useCars';

const statusConfig = {
  pending: { label: 'En attente', color: 'text-amber-400 bg-amber-500/15 border-amber-500/20', icon: <Clock size={14} /> },
  confirmed: { label: 'Confirmée', color: 'text-green-400 bg-green-500/15 border-green-500/20', icon: <CheckCircle2 size={14} /> },
  completed: { label: 'Terminée', color: 'text-blue-400 bg-blue-500/15 border-blue-500/20', icon: <CheckCircle2 size={14} /> },
  cancelled: { label: 'Annulée', color: 'text-red-400 bg-red-500/15 border-red-500/20', icon: <XCircle size={14} /> },
};

const notifTypeConfig = {
  success: { icon: <CheckCircle2 size={18} />, color: 'text-green-400 bg-green-500/10' },
  warning: { icon: <AlertCircle size={18} />, color: 'text-amber-400 bg-amber-500/10' },
  info: { icon: <Bell size={18} />, color: 'text-blue-400 bg-blue-500/10' },
  error: { icon: <XCircle size={18} />, color: 'text-red-400 bg-red-500/10' },
};

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'reservations';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [filterStatus, setFilterStatus] = useState('all');
  const { cars } = useCars();
  const { favorites, toggleFavorite } = useFavorites();
  const { reservations, updateReservationStatus } = useReservations();
  const { user, logout, getCurrentUserRole } = useAuth();
  const navigate = useNavigate();

  const favoriteCars = cars.filter(c => favorites.includes(c.id));

  // The server already filters by user_id in fetchReservations
  const ownReservations = reservations;

  const filteredReservations = filterStatus === 'all'
    ? ownReservations
    : ownReservations.filter((r) => r.status === filterStatus);

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'reservations', label: 'Réservations', icon: <CalendarDays size={18} />, count: ownReservations.length },
    { id: 'favorites', label: 'Favoris', icon: <Heart size={18} />, count: favorites.length },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, count: unreadCount },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleLogout = async () => {
    navigate('/login');
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Mon <span className="gradient-text">Espace</span>
              </h1>
              <p className="text-slate-400">
                Gerez vos reservations, favoris et notifications.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Connecté en tant que <span className="text-slate-300">{user?.email || 'utilisateur'}</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Rôle: <span className="text-slate-300">{getCurrentUserRole()}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all duration-300"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/25'
                  : 'bg-white/5 text-slate-400 border border-white/8 hover:bg-white/8 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count > 0 && (
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  activeTab === tab.id ? 'bg-primary-500 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { value: 'all', label: 'Toutes' },
                { value: 'pending', label: 'En attente' },
                { value: 'confirmed', label: 'Confirmées' },
                { value: 'completed', label: 'Terminées' },
                { value: 'cancelled', label: 'Annulées' },
              ].map(s => (
                <button
                  key={s.value}
                  onClick={() => setFilterStatus(s.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    filterStatus === s.value
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-white/5 text-slate-400 border border-white/8 hover:bg-white/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Reservation Cards */}
            <div className="space-y-4">
              {filteredReservations.length > 0 ? filteredReservations.map((res, i) => {
                const status = statusConfig[res.status];
                return (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-4 sm:p-5 !transform-none"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={res.carImage}
                        alt={`${res.carBrand} ${res.carModel}`}
                        className="w-full sm:w-36 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-white font-bold">{res.carBrand} {res.carModel}</h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mt-0.5">
                              <MapPin size={13} />
                              <span>{res.city}</span>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 mt-3">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {new Date(res.startDate).toLocaleDateString('fr-FR')} → {new Date(res.endDate).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="font-semibold text-white">{res.totalPrice} DZD</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/5">
                      <Link
                        to={`/cars/${res.carId}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-xs font-medium text-slate-300 hover:bg-white/10 transition-all duration-200"
                      >
                        <Eye size={14} />
                        Voir
                      </Link>
                      {res.status === 'pending' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'cancelled')}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all duration-200"
                        >
                          <Trash2 size={14} />
                          Annuler
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              }) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays size={28} className="text-slate-500" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Aucune réservation</h3>
                  <p className="text-slate-400 text-sm mb-6">Vous n'avez pas encore de réservations dans cette catégorie.</p>
                  <Link to="/cars" className="btn-primary">Explorer les voitures</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {favoriteCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car, i) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    index={i}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-slate-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">Aucun favori</h3>
                <p className="text-slate-400 text-sm mb-6">Ajoutez des voitures à vos favoris en cliquant sur le cœur.</p>
                <Link to="/cars" className="btn-primary">Découvrir les voitures</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {notifications.map((notif, i) => {
              const config = notifTypeConfig[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card p-5 !transform-none flex items-start gap-4 ${!notif.read ? 'border-l-2 border-l-primary-500' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`font-semibold text-sm ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{notif.message}</p>
                    <span className="text-slate-500 text-xs mt-2 block">{notif.time}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
