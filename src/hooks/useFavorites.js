import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const favoriteSet = useMemo(() => new Set(favorites.map((id) => String(id))), [favorites]);

  const fetchFavorites = useCallback(async () => {
    if (!user?.id) {
      setFavorites([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('car_id')
        .eq('user_id', user.id);
      if (error) throw error;
      const ids = (data || []).map((r) => r.car_id);
      setFavorites(ids);
      return ids;
    } catch (err) {
      console.error('fetchFavorites failed', err);
      setFavorites([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(async (carId) => {
    if (!user?.id) {
      const err = new Error('User must be authenticated to toggle favorites.');
      console.error(err);
      throw err;
    }

    const carIdStr = String(carId);
    const currentlyFavorite = favoriteSet.has(carIdStr);

    setFavorites((prev) =>
      currentlyFavorite ? prev.filter((id) => String(id) !== carIdStr) : [...prev, carId]
    );

    try {
      if (currentlyFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('car_id', carId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, car_id: carId });
        if (error) throw error;
      }
    } catch (err) {
      console.error('toggleFavorite failed', err);
      await fetchFavorites();
      throw err;
    }
  }, [favoriteSet, fetchFavorites, user?.id]);

  const isFavorite = useCallback((carId) => favoriteSet.has(String(carId)), [favoriteSet]);

  return { favorites, loading, fetchFavorites, toggleFavorite, isFavorite };
}
