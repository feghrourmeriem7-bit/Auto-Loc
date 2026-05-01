import { useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useCars } from '../hooks/useCars';

const EMPTY_FORM = {
  brand: '',
  model: '',
  city: '',
  year: 2024,
  price: 300,
  transmission: 'Automatique',
  fuel: 'Essence',
  seats: 5,
  image: '',
  description: '',
  available: true,
};

export default function AdminCars() {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const sortedCars = useMemo(
    () => [...cars].sort((a, b) => Number(a.id) - Number(b.id)),
    [cars]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      seats: Number(form.seats),
      image: form.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
      gallery: [form.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop'],
      rating: 4.5,
      reviews: 0,
      features: ['GPS', 'Bluetooth'],
    };

    if (editingId) {
      updateCar(editingId, payload);
    } else {
      addCar(payload);
    }

    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const onEdit = (car) => {
    setEditingId(car.id);
    setForm({
      brand: car.brand,
      model: car.model,
      city: car.city,
      year: car.year,
      price: car.price,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      image: car.image,
      description: car.description,
      available: Boolean(car.available),
    });
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cars Management</h1>
      <p className="text-slate-400 mb-6">Ajout, édition et suppression des véhicules.</p>

      <div className="glass-card p-5 !transform-none mb-6">
        <h2 className="text-white font-semibold mb-4">{editingId ? 'Edit Car' : 'Add New Car'}</h2>
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input className="input-field" placeholder="Brand" value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} required />
          <input className="input-field" placeholder="Model" value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))} required />
          <input className="input-field" placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} required />
          <input className="input-field" type="number" placeholder="Year" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} required />
          <input className="input-field" type="number" placeholder="Price (DZD)" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
          <input className="input-field" placeholder="Transmission" value={form.transmission} onChange={(e) => setForm((f) => ({ ...f, transmission: e.target.value }))} required />
          <input className="input-field" placeholder="Fuel" value={form.fuel} onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))} required />
          <input className="input-field" type="number" placeholder="Seats" value={form.seats} onChange={(e) => setForm((f) => ({ ...f, seats: e.target.value }))} required />
          <input className="input-field sm:col-span-2 lg:col-span-3" placeholder="Image URL" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
          <input className="input-field sm:col-span-2 lg:col-span-4" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
          <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2 lg:col-span-2">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} />
            Available
          </label>
          <div className="sm:col-span-2 lg:col-span-2 flex gap-2 justify-end">
            {editingId && (
              <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm(EMPTY_FORM); }}>
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Plus size={16} />
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="glass-card p-4 !transform-none overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-white/10">
              <th className="py-3">ID</th>
              <th>Car</th>
              <th>City</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCars.map((car) => (
              <tr key={car.id} className="border-b border-white/5 text-slate-200">
                <td className="py-3">{car.id}</td>
                <td>{car.brand} {car.model}</td>
                <td>{car.city}</td>
                <td>{car.price} DZD</td>
                <td>{car.available ? 'available' : 'unavailable'}</td>
                <td className="text-right">
                  <div className="inline-flex gap-2">
                    <button className="px-2 py-1 rounded bg-white/5 hover:bg-white/10" onClick={() => onEdit(car)}>
                      <Pencil size={14} />
                    </button>
                    <button className="px-2 py-1 rounded bg-red-500/10 text-red-300 hover:bg-red-500/20" onClick={() => deleteCar(car.id)}>
                      <Trash2 size={14} />
                    </button>
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

