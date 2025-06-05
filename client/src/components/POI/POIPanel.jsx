import React, { useEffect, useState, useRef } from "react";
import { getPOIsAlongRoute } from "../../utils/getPOIsAlongRoute";
import { getDistanceFromRoute } from "../../utils/turfHelper";
import { VscRefresh } from "react-icons/vsc";
import { getPlaceDetails } from "../../utils/getPlaceDetails";

const POIPanel = ({ from, to, map, selectedPOIs, setSelectedPOIs }) => {
  const [pois, setPOIs] = useState([]);
  const [category, setCategory] = useState("restaurant");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || !from || !to) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      async (result, status) => {
        if (status !== "OK") {
          console.error("Directions request failed:", status);
          return;
        }

        const path = result.routes[0].overview_path;
        const routeCoords = path.map((latlng) => [latlng.lng(), latlng.lat()]);

        markersRef.current.forEach(({ marker }) => marker.setMap(null));
        markersRef.current = [];

        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        } else {
          infoWindowRef.current = new window.google.maps.InfoWindow();
        }

        setLoading(true);
        try {
          const foundPOIs = await getPOIsAlongRoute({ map, path, category });

          const enrichedPOIs = await Promise.all(
            foundPOIs.map(async (poi) => {
              try {
                const details = await getPlaceDetails(map, poi.place_id);
                const lng = poi.geometry.location.lng();
                const lat = poi.geometry.location.lat();
                const distance = getDistanceFromRoute([lng, lat], routeCoords);
                return { ...details, distance };
              } catch {
                return null;
              }
            })
          );

          const filteredPOIs = enrichedPOIs.filter(Boolean);
          setPOIs(filteredPOIs);

          filteredPOIs.forEach((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
              title: place.name,
            });

            marker.addListener("click", () => {
              infoWindowRef.current.close();

              const content = `
                <div style="max-width: 250px; font-family: Arial, sans-serif;">
                  <h3 style="margin: 0 0 5px 0;">${place.name}</h3>
                  <p style="margin: 0 0 5px 0;">${place.vicinity || ""}</p>
                  <p style="margin: 0 0 8px 0;">Rating: ${place.rating || "N/A"} ⭐</p>
                  ${place.url ? `<a href="${place.url}" target="_blank" style="color:#1a73e8;">View on Google Maps</a>` : ""}
                </div>
              `;

              infoWindowRef.current.setContent(content);
              infoWindowRef.current.open(map, marker);
            });

            markersRef.current.push({ placeId: place.place_id, marker });
          });
        } catch (err) {
          console.error("Error fetching POIs:", err);
          setPOIs([]);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      markersRef.current.forEach(({ marker }) => marker.setMap(null));
      markersRef.current = [];
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [from, to, category, map, refreshKey]);

  const refreshPOIs = () => setRefreshKey((prev) => prev + 1);

  const generateFakeId = (poi) => poi.url || poi.name + poi.formatted_address;

  const handleAddPOI = (poi, e) => {
    e.stopPropagation();
    const id = poi.place_id || generateFakeId(poi);
    if (!id) return;
    setSelectedPOIs((prev) => {
      if (prev.some((p) => (p.place_id || generateFakeId(p)) === id))
        return prev;
      return [...prev, { ...poi, place_id: id }];
    });
  };

  return (
    <div className="relative h-full w-full sm:w-[300px]">
      {/* Scrollable POI Panel */}
      <div className="h-full p-4 overflow-y-auto rounded hide-scrollbar">
        {/* POI */}
        <div className="px-1 py-3">
          <h1 className="text-xl font-semibold">Point of Interest</h1>
        </div>

        {/* Categories */}
        <div className="flex gap-2 py-1 mb-4 overflow-x-auto whitespace-nowrap">
          {["restaurant", "cafe", "tourist_attraction", "park", "bakery"].map(
            (cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full text-sm border ${
                  category === cat ? "bg-blue-600 text-white" : "bg-white"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
              </button>
            )
          )}
        </div>

        {/* Places */}
        {loading ? (
          <ul className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="p-3 bg-white rounded-lg shadow">
                <div className="w-2/3 h-4 mb-2 rounded shimmer" />
                <div className="w-1/2 h-3 mb-1 rounded shimmer" />
                <div className="w-1/3 h-4 mb-1 rounded shimmer" />
                <div className="w-1/2 h-4 mb-1 rounded shimmer" />
                <div className="h-3 mb-1 rounded w-1/7 shimmer" />
                <div className="w-full h-3 rounded shimmer" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {pois.map((place) => (
              <li
                key={place.place_id}
                className="p-3 bg-white rounded-lg shadow cursor-pointer"
                onClick={() => {
                  if (!place.geometry?.location) return;
                  infoWindowRef.current.close();
                  map.panTo(place.geometry.location);
                  map.setZoom(17);

                  const content = `
                    <div style="max-width: 250px; font-family: Arial, sans-serif;">
                      <h3>${place.name}</h3>
                      <p>${place.vicinity || ""}</p>
                      <p>Rating: ${place.rating || "N/A"} ⭐</p>
                      ${place.url ? `<a href="${place.url}" target="_blank" style="color:#1a73e8;">View on Google Maps</a>` : ""}
                    </div>
                  `;
                  infoWindowRef.current.setContent(content);
                  infoWindowRef.current.setPosition(place.geometry.location);
                  infoWindowRef.current.open(map);
                }}
              >
                <p className="font-semibold">{place.name}</p>
                <p className="text-sm text-gray-600">
                  Rating: ⭐ {place.rating || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Distance from route: {place.distance?.toFixed(0)} m
                </p>
                <p className="text-sm text-gray-500">{place.vicinity}</p>
                <button
                  className="mt-1 text-sm text-blue-600 underline"
                  onClick={(e) => handleAddPOI(place, e)}
                >
                  Add Place
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Refresh Button - Fixed to screen */}
      <button
        onClick={refreshPOIs}
        className="fixed z-50 p-2 bg-white rounded-lg shadow-md bottom-30 right-12 sm:right-22"
        title="Refresh POIs"
      >
        <VscRefresh />
      </button>
    </div>
  );
};

export default POIPanel;
