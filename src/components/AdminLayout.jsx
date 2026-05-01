import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, CalendarDays, Users } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Cars', path: '/admin/cars', icon: Car },
  { label: 'Reservations', path: '/admin/reservations', icon: CalendarDays },
  { label: 'Users', path: '/admin/users', icon: Users },
];

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <aside className="glass-card p-4 !transform-none h-fit lg:sticky lg:top-24">
            <h2 className="text-white font-bold text-lg mb-4">Admin</h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

