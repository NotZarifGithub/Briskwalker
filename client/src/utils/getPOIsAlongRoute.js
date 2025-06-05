export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomSamplePoints(path, count) {
  if (path.length === 0 || count === 0) return [];

  const points = new Set();
  while (points.size < count) {
    const index = Math.floor(Math.random() * path.length);
    points.add(path[index]);
  }

  return Array.from(points);
}


export async function getPOIsAlongRoute({
  map,
  path,
  category = "all",
  maxResults = 20,
  radius = 500,
  delayMs = 250,
}) {
  const uniquePOIs = new Map();
  const service = new window.google.maps.places.PlacesService(map);

  const sampledPoints = randomSamplePoints(path, maxResults);

  for (const point of sampledPoints) {
    if (uniquePOIs.size >= maxResults) break;

    const request = {
      location: point,
      radius,
      type: category !== "all" ? category : undefined,
    };

    const results = await new Promise((resolve) => {
      service.nearbySearch(request, (res, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(res);
        } else {
          console.warn("Places API error:", status);
          resolve([]);
        }
      });
    });

    // Take the best-rated result that hasn’t already been added
    const shuffled = results.sort(() => Math.random() - 0.5);
    for (const place of shuffled) {
      if (!uniquePOIs.has(place.place_id)) {
        uniquePOIs.set(place.place_id, place);
      break;
    }
}

    await delay(delayMs);
  }

  return Array.from(uniquePOIs.values());
}
