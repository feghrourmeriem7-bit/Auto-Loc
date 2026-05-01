import { useEffect } from 'react';
import { useReservations } from '../hooks/useReservations';

const nextStatus = {
  pending: 'confirmed',
  confirmed: 'completed',
};

export default function AdminReservations() {
  const { allReservations, fetchAllReservations, updateReservationStatusAdmin } = useReservations();

  useEffect(() => {
    fetchAllReservations();
  }, [fetchAllReservations]);

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Reservations Management</h1>
      <p className="text-slate-400 mb-6">Gestion des statuts de toutes les réservations.</p>

      <div className="glass-card p-4 !transform-none overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-white/10">
              <th className="py-3">ID</th>
              <th>Car</th>
              <th>User / City</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReservations.map((r) => (
              <tr key={r.id} className="border-b border-white/5 text-slate-200">
                <td className="py-3" title={r.id}>{r.id.split('-')[0]}...</td>
                <td>{r.carBrand} {r.carModel}</td>
                <td>
                  <div className="text-xs text-slate-400 mb-0.5">{r.userEmail || r.user_id?.split('-')[0]}</div>
                  <div>{r.city}</div>
                </td>
                <td>{r.startDate} → {r.endDate}</td>
                <td>{r.totalPrice} DZD</td>
                <td>{r.status}</td>
                <td className="text-right">
                  <div className="inline-flex gap-2">
                    {nextStatus[r.status] && (
                      <button
                        className="px-3 py-1 rounded bg-primary-500/20 text-primary-300 hover:bg-primary-500/30"
                        onClick={() => updateReservationStatusAdmin(r.id, nextStatus[r.status])}
                      >
                        Mark {nextStatus[r.status]}
                      </button>
                    )}
                    {r.status !== 'cancelled' && r.status !== 'completed' && (
                      <button
                        className="px-3 py-1 rounded bg-red-500/10 text-red-300 hover:bg-red-500/20"
                        onClick={() => updateReservationStatusAdmin(r.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

