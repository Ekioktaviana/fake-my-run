export default function RunResult({ stats }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div
      id="result-card"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 text-white"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏃</span>
            <h2 className="text-2xl font-bold text-white">{stats.name}</h2>
          </div>
          <p className="text-gray-400 text-sm">{formatDate(stats.date)} · {stats.startTime}</p>
          <p className="text-gray-500 text-sm">📍 {stats.city}</p>
        </div>
        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">RUNNING</span>
      </div>

      <hr className="border-gray-700 mb-5" />

      {/* Stats Utama */}
      <div className="grid grid-cols-3 gap-4 mb-5 text-center">
        <div className="border-r border-gray-700">
          <p className="text-3xl font-bold text-green-400">{parseFloat(stats.distance).toFixed(2)}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Kilometer</p>
        </div>
        <div className="border-r border-gray-700">
          <p className="text-3xl font-bold text-white">{stats.totalTime}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Waktu</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-400">{stats.pace}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Pace /km</p>
        </div>
      </div>

      <hr className="border-gray-700 mb-5" />

      {/* Stats Sekunder */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div>
          <p className="text-xl font-semibold text-yellow-400">{stats.calories}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Kalori</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-blue-400">{stats.cadence}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Kadence</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-purple-400">{stats.avgSpeed}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">km/h</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-pink-400">{stats.elevation}m</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Elevasi</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 text-right">
        <span className="text-gray-700 text-xs font-bold tracking-widest">FAKE MY RUN</span>
      </div>
    </div>
  );
}
