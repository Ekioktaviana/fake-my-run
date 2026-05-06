export default function SplitsTable({ splits, avgPaceSec }) {
  const paceToSec = (paceStr) => {
    const parts = paceStr.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800">📋 Splits per KM</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left font-semibold">KM</th>
              <th className="px-4 py-3 text-left font-semibold">PACE</th>
              <th className="px-4 py-3 text-left font-semibold">HEART RATE</th>
              <th className="px-4 py-3 text-left font-semibold">KECEPATAN</th>
            </tr>
          </thead>
          <tbody>
            {splits.map((split, i) => {
              const isFaster = paceToSec(split.pace) < avgPaceSec;
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-700">{split.km}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isFaster ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {split.pace}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{split.heartRate} bpm</td>
                  <td className="px-4 py-3 text-gray-600">{split.speed} km/h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
