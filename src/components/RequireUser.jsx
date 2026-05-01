import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RequireUser({ children }) {
  const { isAuthenticated, getCurrentUserRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin should use the admin control panel, not the client reservation flow.
  if (getCurrentUserRole() !== 'user') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
