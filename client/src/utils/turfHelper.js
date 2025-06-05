import { point, lineString } from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import distance from '@turf/distance'

export function getDistanceFromRoute(poiCoords, routeCoords) {
  const routeline = lineString(routeCoords);
  const poiPoint = point(poiCoords);
  const snapped = nearestPointOnLine(routeline, poiPoint);
  const distanceKm = distance(poiPoint, snapped, { units: 'kilometers' });

  return distanceKm * 1000; // in meter
}