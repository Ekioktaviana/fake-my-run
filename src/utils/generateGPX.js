export function generateAndDownloadGPX(stats, route) {
  const startTime = new Date(`${stats.date}T${stats.startTime}:00`);
  const intervalSec = stats.totalTimeSec / Math.max(route.length, 1);

  const trackpoints = route.map((point, i) => {
    const t = new Date(startTime.getTime() + i * intervalSec * 1000);
    const ele = (10 + Math.random() * 20).toFixed(1);
    const hr = 140 + Math.round(Math.random() * 35);
    return `      <trkpt lat="${point[0].toFixed(7)}" lon="${point[1].toFixed(7)}">
        <ele>${ele}</ele>
        <time>${t.toISOString()}</time>
        <extensions>
          <gpxtpx:TrackPointExtension>
            <gpxtpx:hr>${hr}</gpxtpx:hr>
          </gpxtpx:TrackPointExtension>
        </extensions>
      </trkpt>`;
  }).join('\n');

  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="FakeMyRun"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${stats.name}</name>
    <time>${startTime.toISOString()}</time>
  </metadata>
  <trk>
    <name>${stats.name}</name>
    <type>running</type>
    <trkseg>
${trackpoints}
    </trkseg>
  </trk>
</gpx>`;

  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${stats.name.replace(/\s+/g, '_')}_${stats.date}.gpx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
