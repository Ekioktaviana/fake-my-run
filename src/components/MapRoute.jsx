import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet default icon issue with CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const startIcon = L.divIcon({
  html: '<div style="background:#16a34a;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.5)"></div>',
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const finishIcon = L.divIcon({
  html: '<div style="background:#dc2626;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.5)"></div>',
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function FitBounds({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 1) {
      map.fitBounds(route, { padding: [30, 30] });
    }
  }, [map, route]);
  return null;
}

export default function MapRoute({ route }) {
  if (!route || route.length === 0) return null;
  const center = route[0];

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer center={center} zoom={14} style={{ height: '380px', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds route={route} />
        <Polyline positions={route} color="#ef4444" weight={4} opacity={0.85} />
        <Marker position={route[0]} icon={startIcon} />
        <Marker position={route[route.length - 1]} icon={finishIcon} />
      </MapContainer>
      <div className="bg-white px-4 py-2 flex gap-6 text-sm text-gray-600">
        <span><span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-1"></span>Start</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-1"></span>Finish</span>
      </div>
    </div>
  );
}
