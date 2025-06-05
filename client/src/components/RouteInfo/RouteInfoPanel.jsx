import React from "react";
import {
  PiMapPinLineThin,
  PiClockLight,
  PiRoadHorizonLight,
  PiSignpostLight,
  PiPulseLight,
  PiStairsLight,
  PiFootprintsLight,
  PiThermometerLight,
} from "react-icons/pi";

const RouteInfoPanel = ({ routeInfo, poiCount, selectedPOIs }) => {
  if (!routeInfo) return null;

  const { distance, duration, startAddress, endAddress, steps } = routeInfo;

  // Enhanced parsing helpers (support miles too)
  const parseDistanceKm = (distance) => {
    if (!distance) return 0;
    let match = distance.match(/([\d.]+)\s?km/);
    if (match) return parseFloat(match[1]);
    match = distance.match(/([\d.]+)\s?mi/);
    if (match) return parseFloat(match[1]) * 1.60934; // convert miles to km
    return 0;
  };

  const parseDurationMin = (duration) => {
    if (!duration) return 0;
    let match = duration.match(/([\d.]+)\s?min/);
    if (match) return parseFloat(match[1]);
    match = duration.match(/([\d.]+)\s?h/);
    if (match) return parseFloat(match[1]) * 60;
    return 0;
  };

  const distanceKm = parseDistanceKm(distance);
  const durationMin = parseDurationMin(duration);

  const averageSpeed =
    durationMin > 0 ? (distanceKm / (durationMin / 60)).toFixed(1) : "0.0"; // km/h

  const caloriesBurned = Math.round(durationMin * 4); // ~4 cal per min walking
  const elevationGain = "22 m"; // Optional: hardcoded or from Elevation API

  return (
    <div className="bg-white shadow-2xl p-5 w-full sm:w-[300px] border border-gray-100 text-gray-800 sm:rounded-2xl">
      <h2 className="p-1 mb-4 text-xl font-semibold tracking-tight text-black">
        {" "}
        Route Insights
      </h2>

      <div className="space-y-4 text-sm">
        <InfoItem
          icon={<PiMapPinLineThin />}
          label="Start"
          value={startAddress}
        />
        <InfoItem
          icon={<PiSignpostLight />}
          label="Destination"
          value={endAddress}
        />
        <InfoItem
          icon={<PiRoadHorizonLight />}
          label="Distance"
          value={distance || "N/A"}
        />
        <InfoItem
          icon={<PiClockLight />}
          label="Duration"
          value={duration || "N/A"}
        />
        <InfoItem
          icon={<PiFootprintsLight />}
          label="Steps"
          value={`${steps ?? "?"} turns`}
        />

        <div className="pt-4 space-y-4 border-t">
          <InfoItem
            icon={<PiPulseLight />}
            label="Est. Calories"
            value={`${caloriesBurned} kcal`}
          />
          <InfoItem
            icon={<PiStairsLight />}
            label="Elevation Gain"
            value={elevationGain}
          />
          <InfoItem
            icon={<PiThermometerLight />}
            label="Avg. Speed"
            value={`${averageSpeed} km/h`}
          />
          {poiCount !== undefined && (
            <InfoItem
              icon={<PiMapPinLineThin />}
              label="Nearby Spots"
              value={`${poiCount} POIs`}
            />
          )}
        </div>

        {selectedPOIs && selectedPOIs.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="mb-2 font-semibold">Selected Points of Interest</h3>
            <ul className="flex flex-col gap-6 overflow-y-auto text-sm text-gray-700 list-disc list-inside max-h-40">
              {selectedPOIs.map((poi) => (
                <li key={poi.place_id || poi.name}>
                  <strong>{poi.name}</strong>
                  {poi.vicinity && ` — ${poi.vicinity}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="text-xl text-indigo-500 mt-0.5">{icon}</span>
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default RouteInfoPanel;
