import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PaceChart({ splits }) {
  const labels = splits.map((s) => `KM ${s.km}`);

  // Konversi pace "MM:SS" ke menit desimal
  const paceValues = splits.map((s) => {
    const parts = s.pace.split(':');
    return parseFloat(parts[0]) + parseFloat(parts[1]) / 60;
  });

  const hrValues = splits.map((s) => s.heartRate);

  const data = {
    labels,
    datasets: [
      {
        label: 'Pace (min/km)',
        data: paceValues,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        yAxisID: 'y',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 4,
      },
      {
        label: 'Heart Rate (bpm)',
        data: hrValues,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        yAxisID: 'y1',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#ef4444',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Grafik Pace & Heart Rate per KM', font: { size: 14 } },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Pace (min/km)' },
        reverse: true,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'HR (bpm)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <Line data={data} options={options} />
    </div>
  );
}
