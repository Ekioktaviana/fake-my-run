import { useState } from 'react';
import html2canvas from 'html2canvas';
import { generateAndDownloadGPX } from '../utils/generateGPX';

export default function ExportButtons({ stats, route }) {
  const [loadingGpx, setLoadingGpx] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  const handleDownloadGPX = () => {
    setLoadingGpx(true);
    try {
      generateAndDownloadGPX(stats, route);
    } catch (e) {
      console.error('GPX error:', e);
    } finally {
      setTimeout(() => setLoadingGpx(false), 1000);
    }
  };

  const handleSavePNG = async () => {
    setLoadingPng(true);
    try {
      const card = document.getElementById('result-card');
      const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: '#111827' });
      const link = document.createElement('a');
      link.download = `${stats.name.replace(/\s+/g, '_')}_${stats.date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('PNG error:', e);
    } finally {
      setLoadingPng(false);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleDownloadGPX}
        disabled={loadingGpx}
        className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loadingGpx ? (
          <><span className="animate-spin">⏳</span> Membuat GPX...</>
        ) : (
          <><span>📥</span> Download GPX</>
        )}
      </button>
      <button
        onClick={handleSavePNG}
        disabled={loadingPng}
        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loadingPng ? (
          <><span className="animate-spin">⏳</span> Menyimpan...</>
        ) : (
          <><span>🖼️</span> Simpan PNG</>
        )}
      </button>
    </div>
  );
}
