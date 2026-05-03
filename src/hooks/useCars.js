import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { cars as seedCars } from '../data/cars';

function normalizeCar(row) {
  if (!row) return row;
  const price = row.price ?? row.price_per_day ?? row.pricePerDay;
  const image = row.image ?? row.image_url;
  let gallery = Array.isArray(row.gallery) ? row.gallery : (row.gallery ? [row.gallery] : []);
  if (gallery.length === 0 && image) {
    gallery = [image];
  }
  return {
    ...row,
    price,
    image,
    gallery,
    features: Array.isArray(row.features) ? row.features : [],
    available: row.available !== false, // Default to true if null/undefined
  };
}

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      let query = supabase.from('cars').select('*');

      if (filters.city && filters.city !== 'Toutes') {
        query = query.eq('city', filters.city);
      }
      
      if (filters.search) {
        query = query.ilike('brand', `%${filters.search}%`);
      }

      if (filters.available !== undefined && filters.available !== null) {
        query = query.eq('available', filters.available);
      }

      const { data, error } = await query.order('id', { ascending: false });
      
      if (error) throw error;
      
      const normalized = (data || []).map(normalizeCar);
      const hasFilters = (filters.city && filters.city !== 'Toutes') || filters.search || (filters.available !== undefined && filters.available !== null);
      
      setCars(normalized.length > 0 ? normalized : (hasFilters ? [] : seedCars));
    } catch (err) {
      console.error('fetchCars failed', err);
      setCars(seedCars);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const addCar = useCallback(async (carInput) => {
    try {
      const payload = {
        ...carInput,
        gallery: carInput.gallery?.length ? carInput.gallery : (carInput.image ? [carInput.image] : []),
        available: typeof carInput.available === 'boolean' ? carInput.available : true,
        rating: carInput.rating ?? 4.5,
        reviews: carInput.reviews ?? 0,
        features: Array.isArray(carInput.features) ? carInput.features : [],
        price_per_day: carInput.price,
        image_url: carInput.image,
      };
      delete payload.price;
      delete payload.image;

      const { data, error } = await supabase
        .from('cars')
        .insert(payload)
        .select('*')
        .single();
      if (error) throw error;
      const newCar = normalizeCar(data);
      setCars((prev) => [newCar, ...prev]);
      return newCar;
    } catch (err) {
      console.error('addCar failed', err);
      throw err;
    }
  }, []);

  const updateCar = useCallback(async (id, updates) => {
    try {
      const payload = { ...updates };
      if ('price' in payload) {
        payload.price_per_day = payload.price;
        delete payload.price;
      }
      if ('image' in payload) {
        payload.image_url = payload.image;
        delete payload.image;
      }
      const { data, error } = await supabase
        .from('cars')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();
      if (error) throw error;
      const updated = normalizeCar(data);
      setCars((prev) => prev.map((c) => (String(c.id) === String(id) ? updated : c)));
      return updated;
    } catch (err) {
      console.error('updateCar failed', err);
      throw err;
    }
  }, []);

  const deleteCar = useCallback(async (id) => {
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      setCars((prev) => prev.filter((c) => String(c.id) !== String(id)));
    } catch (err) {
      console.error('deleteCar failed', err);
      throw err;
    }
  }, []);

  return { cars, loading, fetchCars, addCar, updateCar, deleteCar };
}

