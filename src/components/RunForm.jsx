import { useState } from 'react';

const today = new Date().toISOString().split('T')[0];

export default function RunForm({ onGenerate, initialData }) {
  const [form, setForm] = useState(initialData || {
    name: 'Morning Run',
    distance: '5',
    pace: '5:30',
    date: today,
    startTime: '06:00',
    elevation: '50',
    lat: '-6.2088',
    lng: '106.8456',
    city: 'Jakarta, Indonesia',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">⚙️ Konfigurasi Lari</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Nama Aktivitas</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Morning Run" required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Jarak (KM)</label>
            <input type="number" name="distance" value={form.distance} onChange={handleChange} className={inputClass} placeholder="5.0" step="0.1" min="0.1" required />
          </div>
          <div>
            <label className={labelClass}>Pace (MM:SS / km)</label>
            <input type="text" name="pace" value={form.pace} onChange={handleChange} className={inputClass} placeholder="5:30" pattern="\d+:\d{2}" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Tanggal</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Jam Mulai</label>
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Elevasi Gain (meter)</label>
          <input type="number" name="elevation" value={form.elevation} onChange={handleChange} className={inputClass} placeholder="50" min="0" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Latitude</label>
            <input type="number" name="lat" value={form.lat} onChange={handleChange} className={inputClass} step="0.0001" placeholder="-6.2088" required />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input type="number" name="lng" value={form.lng} onChange={handleChange} className={inputClass} step="0.0001" placeholder="106.8456" required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Kota / Lokasi</label>
          <input type="text" name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Jakarta, Indonesia" />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-base mt-2"
        >
          🏃 Generate Hasil Lari
        </button>
      </form>
    </div>
  );
}
