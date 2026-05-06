export function generateRunStats(form) {
  const paceStr = form.pace || '5:30';
  const parts = paceStr.split(':');
  const paceMin = parseInt(parts[0], 10) || 5;
  const paceSec = parseInt(parts[1], 10) || 30;
  const totalPaceSec = paceMin * 60 + paceSec;

  const distance = parseFloat(form.distance) || 5;
  const totalTimeSec = Math.round(totalPaceSec * distance);

  const hours = Math.floor(totalTimeSec / 3600);
  const minutes = Math.floor((totalTimeSec % 3600) / 60);
  const seconds = totalTimeSec % 60;

  let totalTime;
  if (hours > 0) {
    totalTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    totalTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const calories = Math.round(distance * 65);
  const avgSpeed = (distance / (totalTimeSec / 3600)).toFixed(1);
  const cadence = Math.floor(Math.random() * 21) + 160;
  const numSplits = Math.ceil(distance);

  const splits = Array.from({ length: numSplits }, (_, i) => {
    const variation = (Math.random() - 0.5) * 30;
    const splitSec = Math.max(180, totalPaceSec + variation);
    const splitMin = Math.floor(splitSec / 60);
    const splitSecRem = Math.round(splitSec % 60);
    const heartRate = 140 + Math.round(Math.random() * 25) + Math.floor((i / numSplits) * 10);
    const speed = (3600 / splitSec).toFixed(1);
    return {
      km: i + 1,
      pace: `${splitMin}:${String(splitSecRem).padStart(2, '0')}`,
      paceSec: splitSec,
      heartRate,
      speed,
    };
  });

  return {
    ...form,
    distance,
    totalTime,
    totalTimeSec,
    avgPaceSec: totalPaceSec,
    calories,
    avgSpeed,
    cadence,
    splits,
  };
}
