import { useState } from 'react';
import RunForm from './components/RunForm';
import MapRoute from './components/MapRoute';
import RunResult from './components/RunResult';
import PaceChart from './components/PaceChart';
import SplitsTable from './components/SplitsTable';
import ExportButtons from './components/ExportButtons';
import { generateRunStats } from './utils/generateStats';
import { generateRoute } from './utils/generateRoute';

export default function App() {
  const [result, setResult] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleGenerate = (form) => {
    setLoading(true);
    setFormData(form);
    setTimeout(() => {
      const stats = generateRunStats(form);
      const coords = generateRoute(
        parseFloat(form.lat),
        parseFloat(form.lng),
        parseFloat(form.distance)
      );
      setResult(stats);
      setRoute(coords);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-5 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight">🏃 Fake My Run</h1>
          <p className="text-green-100 text-sm mt-1">Generate hasil lari custom yang realistis</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl animate-bounce mb-4">🏃</div>
            <p className="text-gray-600 font-semibold text-lg">Generating hasil lari kamu...</p>
            <p className="text-gray-400 text-sm mt-1">Mohon tunggu sebentar</p>
          </div>
        )}

        {/* Before Generate */}
        {!loading && !result && (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <p className="text-gray-500 text-lg">Isi form di bawah untuk membuat hasil lari custom kamu 👇</p>
            </div>
            <RunForm onGenerate={handleGenerate} />
          </div>
        )}

        {/* After Generate */}
        {!loading && result && (
          <div>
            {/* Row 1: Form + Result */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <RunForm onGenerate={handleGenerate} initialData={formData} />
              <div className="space-y-4">
                <RunResult stats={result} />
                <ExportButtons stats={result} route={route} />
              </div>
            </div>

            {/* Row 2: Map */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-700 mb-3">🗺️ Rute Lari</h2>
              <MapRoute route={route} />
            </div>

            {/* Row 3: Chart + Splits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaceChart splits={result.splits} />
              <SplitsTable splits={result.splits} avgPaceSec={result.avgPaceSec} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs px-4">
        <p>⚠️ Dibuat untuk keperluan demo & hiburan pribadi. Jangan gunakan untuk kecurangan di kompetisi lari.</p>
        <p className="mt-1">Made with ❤️ using React + OpenStreetMap</p>
      </footer>
    </div>
  );
}
