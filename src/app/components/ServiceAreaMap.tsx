"use client";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";

export default function ServiceAreaMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_JAVASCRIPT_API || "", // <-- Uses env variable
  });

  // Demo cities around SF Bay Area and Sacramento
  const demoCities = [
    { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
    { name: "Oakland", lat: 37.8044, lng: -122.2711 },
    { name: "Berkeley", lat: 37.8715, lng: -122.2730 },
    { name: "San Jose", lat: 37.3382, lng: -121.8863 },
    { name: "Fremont", lat: 37.5483, lng: -121.9886 },
    { name: "San Mateo", lat: 37.5629, lng: -122.3255 },
    { name: "Walnut Creek", lat: 37.9063, lng: -122.0640 },
    { name: "Concord", lat: 37.9779, lng: -122.0311 },
    { name: "Vallejo", lat: 38.1041, lng: -122.2566 },
    { name: "Napa", lat: 38.2975, lng: -122.2869 },
    { name: "Santa Rosa", lat: 38.4405, lng: -122.7144 },
    { name: "Fairfield", lat: 38.2494, lng: -122.0390 },
    { name: "Vacaville", lat: 38.3566, lng: -121.9877 },
    { name: "Davis", lat: 38.5449, lng: -121.7405 },
    { name: "Sacramento", lat: 38.5816, lng: -121.4944 },
    { name: "Roseville", lat: 38.7521, lng: -121.2880 },
    { name: "Folsom", lat: 38.6779, lng: -121.1761 },
    { name: "Elk Grove", lat: 38.4088, lng: -121.3716 },
    { name: "Stockton", lat: 37.9577, lng: -121.2908 },
    { name: "Modesto", lat: 37.6391, lng: -120.9969 },
    { name: "San Rafael", lat: 37.9735, lng: -122.5311 },
  ];

  // Generate a stable pseudo-random radius per city (meters)
  const radiusFor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
    const rnd = Math.abs(hash % 1000) / 1000; // 0..1
    return 10000 + rnd * 20000; // 10km - 30km
  };

  if (!isLoaded)
    return (
      <div style={{ height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading map...
      </div>
    );

  return (
    <div style={{ position: "relative", width: "100%", height: 420 }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "420px" }}
        center={{ lat: 38.5816, lng: -121.4944 }}
        zoom={8}
        options={{
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Demo filled circles over random cities (reverted) */}
        {demoCities.map((c) => (
          <Circle
            key={c.name}
            center={{ lat: c.lat, lng: c.lng }}
            radius={radiusFor(c.name)}
            options={{
              fillColor: "#005baa",
              fillOpacity: 0.25,
              strokeColor: "#004a8d",
              strokeOpacity: 0.5,
              strokeWeight: 1,
            }}
          />
        ))}
      </GoogleMap>
      {/* UI-панель поиска */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          background: "rgba(255,255,255,0.65)",
          borderRadius: 10,
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          padding: "12px 16px",
          zIndex: 10,
          maxWidth: 240,
          minWidth: 180,
          fontSize: '0.95rem',
          transition: 'background 0.2s',
        }}
      >
        <div className="font-bold text-lg mb-2 text-[#005baa]">Our Service Area</div>
        <div className="mb-3 text-sm text-[#222]">Type in your zip code to see if service is offered in your area</div>
        <input type="text" placeholder="ZIP code" className="w-full border border-[#e0e4ea] rounded px-3 py-2 outline-none mb-2" />
        <button
          className="bg-[#d7263d] text-white w-full py-2 rounded-none font-semibold mb-2 text-base transition transform hover:-translate-y-0.5 hover:bg-[#c01f32] hover:shadow-lg"
          style={{ minHeight: 36, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(215, 38, 61, 0.22)" }}
        >
          Search
        </button>
        <button className="text-[#005baa] text-sm mt-2 hover:underline flex items-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="mr-1">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20h-2v-.07A8.001 8.001 0 014.07 13H4v-2h.07A8.001 8.001 0 0111 4.07V4h2v.07A8.001 8.001 0 0119.93 11H20v2h-.07A8.001 8.001 0 0113 19.93z" fill="#005baa" />
          </svg>
          Use my Current Location
        </button>
      </div>
    </div>
  );
}
