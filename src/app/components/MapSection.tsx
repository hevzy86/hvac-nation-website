"use client";
import ServiceAreaMap from "./ServiceAreaMap";

export default function MapSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 bg-[#f5f7fa] border border-[#e0e4ea] rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-[#003366]">Our Service Area</h2>
      <div className="rounded-xl overflow-hidden shadow border border-[#005baa]">
        <ServiceAreaMap />
      </div>
    </section>
  );
}
