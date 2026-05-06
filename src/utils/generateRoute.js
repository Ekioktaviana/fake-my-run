export function generateRoute(lat, lng, distanceKm) {
  const numPoints = Math.max(20, Math.round(distanceKm * 20));
  const radius = (distanceKm / (2 * Math.PI)) * 0.009;
  const points = [];

  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const noise = (Math.random() - 0.5) * radius * 0.4;
    const r = radius + noise;
    const newLat = lat + r * Math.sin(angle);
    const newLng = lng + r * Math.cos(angle);
    points.push([newLat, newLng]);
  }

  // Close the loop
  points.push(points[0]);
  return points;
}
