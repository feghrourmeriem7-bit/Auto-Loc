import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminUsers() {
  const { allUsers, fetchAllUsers, updateUserRole } = useAuth();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Users</h1>
      <p className="text-slate-400 mb-6">Liste des utilisateurs et gestion des rôles.</p>

      <div className="glass-card p-4 !transform-none overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-white/10">
              <th className="py-3">ID / Info</th>
              <th>Role</th>
              <th className="text-right">Update role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u.id} className="border-b border-white/5 text-slate-200">
                <td className="py-3">
                  <div className="font-mono text-xs text-slate-400">{u.id}</div>
                  {u.full_name && <div className="text-white mt-0.5">{u.full_name}</div>}
                </td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    u.role === 'admin' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-400'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="text-right">
                  <select
                    className="input-field inline-block w-auto !py-2 !px-3 text-sm"
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                  >
                    <option value="user" className="bg-dark-800">user</option>
                    <option value="admin" className="bg-dark-800">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

