import { useEffect } from 'react';
import { Car, CalendarDays, Users } from 'lucide-react';
import { useCars } from '../hooks/useCars';
import { useReservations } from '../hooks/useReservations';
import { useAuth } from '../hooks/useAuth';

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="glass-card p-5 !transform-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">{label}</span>
        <Icon size={18} className="text-primary-400" />
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { cars } = useCars(); // cars are already fetched globally
  const { allReservations, fetchAllReservations } = useReservations();
  const { allUsers, fetchAllUsers } = useAuth();

  useEffect(() => {
    fetchAllReservations();
    fetchAllUsers();
  }, [fetchAllReservations, fetchAllUsers]);

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        Admin <span className="gradient-text">Dashboard</span>
      </h1>
      <p className="text-slate-400 mb-8">Vue globale de la plateforme Auto-Loc.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Car} label="Total cars" value={cars.length} />
        <StatCard icon={CalendarDays} label="Total reservations" value={allReservations.length} />
        <StatCard icon={Users} label="Total users" value={allUsers.length} />
      </div>
    </div>
  );
}

