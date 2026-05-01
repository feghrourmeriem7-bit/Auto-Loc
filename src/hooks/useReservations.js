import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

function normalizeReservation(row) {
  if (!row) return row;
  return {
    ...row,
    carId: row.carId ?? row.car_id,
    carBrand: row.carBrand ?? row.car_brand,
    carModel: row.carModel ?? row.car_model,
    carImage: row.carImage ?? row.car_image,
    startDate: row.startDate ?? row.start_date,
    endDate: row.endDate ?? row.end_date,
    totalPrice: row.totalPrice ?? row.total_price,
    userEmail: row.userEmail ?? row.user_email,
    createdAt: row.createdAt ?? row.created_at,
    documentName: row.documentName ?? row.document_name,
  };
}

function toReservationInsert(reservation, user) {
  return {
    user_id: user?.id ?? null,
    user_email: reservation.userEmail ?? user?.email ?? null,
    car_id: reservation.carId ?? null,
    car_brand: reservation.carBrand ?? null,
    car_model: reservation.carModel ?? null,
    car_image: reservation.carImage ?? null,
    start_date: reservation.startDate ?? null,
    end_date: reservation.endDate ?? null,
    total_price: reservation.totalPrice ?? null,
    status: reservation.status ?? 'pending',
    city: reservation.city ?? null,
    created_at: reservation.createdAt ?? new Date().toISOString(),
    document_name: reservation.documentName ?? null,
  };
}

export function useReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    if (!user?.id) {
      setReservations([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      const normalized = (data || []).map(normalizeReservation);
      setReservations(normalized);
      return normalized;
    } catch (err) {
      console.error('fetchReservations failed', err);
      setReservations([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const addReservation = useCallback(async (reservation) => {
    if (!user?.id) {
      const err = new Error('User must be authenticated to create a reservation.');
      console.error(err);
      throw err;
    }

    try {
      const payload = toReservationInsert(reservation, user);
      console.log('Sending insert payload:', payload);
      
      const { data, error } = await supabase
        .from('reservations')
        .insert(payload)
        .select('*');
        
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Insert success, returned data:', data);
      
      // Forcer le rafraîchissement de la liste locale
      await fetchReservations();
      
      const created = data && data.length > 0 ? normalizeReservation(data[0]) : payload;
      return created;
    } catch (err) {
      console.error('addReservation failed', err);
      throw err;
    }
  }, [user, fetchReservations]);

  const updateReservationStatus = useCallback(async (id, status) => {
    if (!user?.id) {
      const err = new Error('User must be authenticated to update a reservation.');
      console.error(err);
      throw err;
    }

    try {
      const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();
      if (error) throw error;
      const updated = normalizeReservation(data);
      setReservations((prev) =>
        prev.map((r) => (String(r.id) === String(id) ? updated : r))
      );
      return updated;
    } catch (err) {
      console.error('updateReservationStatus failed', err);
      throw err;
    }
  }, [user?.id]);

  const resetReservations = useCallback(() => {
    // Kept for backward compatibility. We avoid destructive actions here.
    fetchReservations();
  }, [fetchReservations]);

  // --- Admin Functions ---
  const fetchAllReservations = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      const normalized = (data || []).map(normalizeReservation);
      setAllReservations(normalized);
      return normalized;
    } catch (err) {
      console.error('fetchAllReservations failed', err);
      setAllReservations([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReservationStatusAdmin = useCallback(async (id, status) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id)
        .select('*')
        .single();
      if (error) throw error;
      const updated = normalizeReservation(data);
      setAllReservations((prev) =>
        prev.map((r) => (String(r.id) === String(id) ? updated : r))
      );
      // Also update personal list just in case
      setReservations((prev) =>
        prev.map((r) => (String(r.id) === String(id) ? updated : r))
      );
      return updated;
    } catch (err) {
      console.error('updateReservationStatusAdmin failed', err);
      throw err;
    }
  }, []);

  const reservationCountByStatus = useMemo(() => {
    return reservations.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});
  }, [reservations]);

  return {
    reservations,
    loading,
    fetchReservations,
    addReservation,
    updateReservationStatus,
    resetReservations,
    reservationCountByStatus,
    allReservations,
    fetchAllReservations,
    updateReservationStatusAdmin,
  };
}

