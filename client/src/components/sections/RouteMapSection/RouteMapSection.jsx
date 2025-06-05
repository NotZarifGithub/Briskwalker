import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import LocationInput from "../../../utils/LocationInput";
import { IoExitOutline } from "react-icons/io5";
import POIPanel from "../../POI/POIPanel";
import RouteInfoPanel from "../../RouteInfo/RouteInfoPanel";
import { MdEdit } from "react-icons/md";

const RouteMapSection = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { from: initialFrom, to: initialTo } = location.state || {};

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  const [showPOIPanel, setShowPOIPanel] = useState(false);
  const [showRouteInsightsPanel, setShowRouteInsightsPanel] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [selectedPOIs, setSelectedPOIs] = useState([]);
  const [showMobileEdit, setShowMobileEdit] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    console.log("Selected POIs:", selectedPOIs);
  }, [selectedPOIs]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initializeMap = (origin, destination) => {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: origin,
      disableDefaultUI: true,
      gestureHandling: "greedy",
    });

    setMapInstance(map);

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          const leg = result.routes[0].legs[0];
          setRouteInfo({
            distance: leg.distance.text,
            duration: leg.duration.text,
            startAddress: leg.start_address,
            endAddress: leg.end_address,
            steps: leg.steps.length,
          });
        } else {
          console.error("Directions request failed due to", status);
        }
      }
    );
  };

  useEffect(() => {
    if (!window.google || !from || !to) return;
    initializeMap(from, to);
  }, [from, to]);

  const handleFromSelected = (place) => {
    if (place.geometry) {
      setFrom({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name || place.formatted_address,
      });
    }
  };

  const handleToSelected = (place) => {
    if (place.geometry) {
      setTo({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name || place.formatted_address,
      });
    }
  };

  if (!initialFrom || !initialTo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-lg text-gray-700">Missing route data.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-white bg-black rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-[calc(100vh-184px)]">
      {/* POI Toggle Button */}
      {!showPOIPanel && !(showRouteInsightsPanel && isMobile) && (
        <button
          onClick={() => {
            setShowPOIPanel(true);
            if (isMobile) {
              setShowRouteInsightsPanel(false);
            }
          }}
          className="absolute p-2 text-sm bg-white rounded-lg shadow-md z-60 outline-1 top-6 right-6"
        >
          Point of Interest
        </button>
      )}

      {/* Route Insights Toggle Button */}
      {!showRouteInsightsPanel && !(showPOIPanel && isMobile) && (
        <button
          onClick={() => {
            setShowRouteInsightsPanel(true);
            if (isMobile) {
              setShowPOIPanel(false);
            }
          }}
          className="absolute p-2 text-sm bg-white rounded-lg shadow-md z-60 outline-1 top-6 left-6"
        >
          Route Insights
        </button>
      )}

      {/* Desktop Location Inputs */}
      <div className="absolute z-10 hidden gap-2 p-3 -translate-x-1/2 bg-white shadow-lg top-4 left-1/2 rounded-xl sm:flex outline-1">
        <motion.div className="flex items-center gap-2">
          <HiOutlineLocationMarker />
          <LocationInput
            placeholder="Edit Starting Point"
            onPlaceSelected={handleFromSelected}
            defaultValue={from?.name}
          />
        </motion.div>
        <span>-</span>
        <motion.div className="flex items-center gap-2">
          <HiOutlineLocationMarker />
          <LocationInput
            placeholder="Edit Destination"
            onPlaceSelected={handleToSelected}
            defaultValue={to?.name}
          />
        </motion.div>
      </div>

      {/* Mobile Edit Button */}
      <div
        className="absolute p-2 text-sm bg-white rounded-lg shadow-md z-60 outline-1 bottom-6 right-6 sm:hidden"
        onClick={() => setShowMobileEdit(!showMobileEdit)}
      >
        <MdEdit size={20} />
      </div>

      {/* Google Map */}
      <div ref={mapRef} className="w-full h-[calc(100vh-184px)] rounded" />

      {/* Mobile Editor */}
      <AnimatePresence>
        {showMobileEdit && (
          <motion.div
            key="mobile-editor"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute inset-0 flex flex-col overflow-hidden bg-white shadow-lg z-70 sm:hidden rounded-t-2xl"
          >
            <div className="flex justify-center w-full py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-4 pb-2">
              <h2 className="text-base font-medium text-gray-800">
                Edit Route
              </h2>
              <button
                onClick={() => setShowMobileEdit(false)}
                className="text-gray-600 hover:text-black"
              >
                <IoExitOutline size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 px-4 mt-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <HiOutlineLocationMarker className="text-gray-500" />
                <LocationInput
                  placeholder="Starting Point"
                  onPlaceSelected={handleFromSelected}
                  defaultValue={from?.name}
                />
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <HiOutlineLocationMarker className="text-gray-500" />
                <LocationInput
                  placeholder="Destination"
                  onPlaceSelected={handleToSelected}
                  defaultValue={to?.name}
                />
              </div>
            </div>

            <div className="px-4 pt-4 pb-6 mt-auto">
              <button
                onClick={() => setShowMobileEdit(false)}
                className="w-full py-3 text-sm font-medium text-white bg-black rounded-xl"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POI Panel */}
      {mapInstance && showPOIPanel && (
        <div className="absolute inset-0 sm:inset-auto sm:top-6 sm:right-6 sm:h-[calc(100vh-220px)] sm:w-[300px] w-full h-full z-60 bg-white shadow-lg overflow-hidden sm:rounded-lg rounded-t-xl">
          {/* Exit Button inside the panel */}
          <button
            onClick={() => setShowPOIPanel(false)}
            className="absolute p-2 text-sm bg-gray-100 rounded-lg shadow-md top-4 right-4 z-80"
          >
            <IoExitOutline />
          </button>
          <POIPanel
            from={from}
            to={to}
            map={mapInstance}
            selectedPOIs={selectedPOIs}
            setSelectedPOIs={setSelectedPOIs}
            showPOIPanel={showPOIPanel}
          />
        </div>
      )}

      {/* Route Info Panel */}
      {showRouteInsightsPanel && (
        <div className="absolute top-0 left-0 sm:top-6 sm:left-6 z-70 sm:h-[calc(100%-48px)] h-full sm:w-[300px] w-full bg-white shadow-lg rounded-t-xl sm:rounded-lg overflow-auto">
          {/* Exit Button inside the panel */}
          <button
            onClick={() => setShowRouteInsightsPanel(false)}
            className="absolute p-2 text-sm bg-gray-100 rounded-lg shadow-md top-4 right-4 z-80"
          >
            <IoExitOutline />
          </button>
          {/* Actual route info content */}
          <RouteInfoPanel
            routeInfo={routeInfo}
            poiCount={selectedPOIs.length}
            selectedPOIs={selectedPOIs}
          />
        </div>
      )}
    </div>
  );
};

export default RouteMapSection;
