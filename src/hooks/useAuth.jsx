import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Important: keep auth user and role in React state, no localStorage auth persistence.
  const [authUser, setAuthUser] = useState(null);
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);
  
  // Admin states
  const [allUsers, setAllUsers] = useState([]);

  // Important: role is read from `profiles` table using current auth user id.
  const fetchUserRole = useCallback(async (userId) => {
    if (!userId) return 'user';
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    if (error) return 'user';
    return data?.role === 'admin' ? 'admin' : 'user';
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncFromSession = async (session) => {
      if (!isMounted) return;
      const currentUser = session?.user ?? null;
      setAuthUser(currentUser);

      try {
        if (currentUser) {
          const fetchedRole = await fetchUserRole(currentUser.id);
          if (isMounted) setRole(fetchedRole);
        } else {
          if (isMounted) setRole('user');
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du rôle:", err);
        if (isMounted) setRole('user');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Initial session load
    supabase.auth.getSession().then(({ data }) => {
      syncFromSession(data.session);
    });

    // React to auth changes (login/logout/token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncFromSession(session); // Exécution asynchrone non bloquante
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [fetchUserRole]);

  // Public derived values
  const isAuthenticated = useMemo(() => Boolean(authUser), [authUser]);
  const isAdmin = useMemo(() => role === 'admin', [role]);

  // Keep user shape compatible with existing components (user.email + user.role).
  const user = useMemo(() => {
    if (!authUser) return null;
    return { ...authUser, role };
  }, [authUser, role]);

  // Required API names
  const getUserRole = useCallback(() => role, [role]);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: String(email).trim().toLowerCase(),
      password,
    });
    if (error) throw error;
    // If Supabase returns a session immediately, sync local state.
    if (data?.user) {
      setAuthUser(data.user);
      const fetchedRole = await fetchUserRole(data.user.id);
      setRole(fetchedRole);
      setLoading(false);
    }
    return data;
  }, [fetchUserRole]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email).trim().toLowerCase(),
      password,
    });
    if (error) throw error;
    
    let fetchedRole = 'user';
    // Sync local state immediately (don't wait for onAuthStateChange timing).
    if (data?.user) {
      setAuthUser(data.user);
      fetchedRole = await fetchUserRole(data.user.id);
      setRole(fetchedRole);
      setLoading(false);
    }
    return { ...data, role: fetchedRole };
  }, [fetchUserRole]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  // Backward-compatible aliases (so existing components don't break).
  const signup = signUp;
  const login = signIn;
  const logout = signOut;
  const getCurrentUserRole = getUserRole;

  // --- Admin Functions ---
  const fetchAllUsers = useCallback(async () => {
    if (role !== 'admin') return [];
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAllUsers(data || []);
      return data || [];
    } catch (err) {
      console.error('fetchAllUsers failed', err);
      return [];
    }
  }, [role]);

  const updateUserRole = useCallback(async (userId, newRole) => {
    if (role !== 'admin') return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
        .select('*')
        .single();
      if (error) throw error;
      setAllUsers((prev) => prev.map((u) => (u.id === userId ? data : u)));
      return data;
    } catch (err) {
      console.error('updateUserRole failed', err);
      throw err;
    }
  }, [role]);
  
  // Mock function previously used, kept for backward compatibility if needed temporarily
  const getAllUsers = useCallback(() => allUsers, [allUsers]);

  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    getUserRole,
    signUp,
    signIn,
    signOut,
    signup,
    login,
    logout,
    getCurrentUserRole,
    allUsers,
    fetchAllUsers,
    updateUserRole,
    getAllUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
}
