"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapViewProps {
  center?: Location;
  markers?: Array<{
    id: string;
    position: Location;
    title: string;
    type: "issue" | "service";
    status?: string;
  }>;
  onLocationSelect?: (location: Location) => void;
  height?: string;
  className?: string;
}

export default function MapView({
  center = { lat: 40.7128, lng: -74.006 }, // Default to NYC
  markers = [],
  onLocationSelect,
  height = "400px",
  className = "",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would be where you'd initialize your map library
    // For now, we'll show a placeholder
    console.log("Map initialized with center:", center);
    console.log("Markers:", markers);
  }, [center, markers]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationSelect?.(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your current location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Map Placeholder */}
      <div
        ref={mapRef}
        className="w-full h-full bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="gray"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-8 w-8 text-red-600" />
        </div>

        {/* Sample Markers */}
        {markers.map((marker, index) => (
          <div
            key={marker.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              marker.type === "issue" ? "text-red-600" : "text-blue-600"
            }`}
            style={{
              top: `${30 + ((index * 15) % 40)}%`,
              left: `${30 + ((index * 20) % 40)}%`,
            }}
            title={marker.title}
          >
            <MapPin className="h-6 w-6" />
          </div>
        ))}

        {/* Map Placeholder Text */}
        <div className="text-center text-gray-500 bg-white bg-opacity-90 p-4 rounded-lg">
          <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Interactive Map View</p>
          <p className="text-xs text-gray-400 mt-1">
            Integrate with Google Maps, Mapbox, or OpenStreetMap
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={handleGetCurrentLocation}
          className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
          title="Get current location"
        >
          <Navigation className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Legend */}
      {markers.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Legend</div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <span className="text-xs text-gray-600">Issues</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-gray-600">Services</span>
            </div>
          </div>
        </div>
      )}

      {/* Location Info */}
      {center.address && (
        <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-2 max-w-xs">
          <p className="text-xs text-gray-600 truncate">{center.address}</p>
        </div>
      )}
    </div>
  );
}
