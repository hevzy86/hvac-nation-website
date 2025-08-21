"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "";
}

export type ReviewItem = {
  name: string;
  text: string;
  rating: number;
  source?: "google" | "site";
  avatarUrl?: string;
};

export default function ReviewsCarousel({
  items,
  autoPlayMs = 4000,
}: {
  items: ReviewItem[];
  autoPlayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);

  const count = items.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const goto = (i: number) => setIndex(i % count);

  useEffect(() => {
    if (count <= 1) return; // nothing to rotate
    const id = setInterval(() => {
      if (!hoverRef.current) setIndex((i) => (i + 1) % count);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [count, autoPlayMs]);

  const visible = useMemo(() => {
    // Return three items for desktop, one for mobile (we'll hide via CSS)
    const a = [items[index], items[(index + 1) % count], items[(index + 2) % count]];
    return a;
  }, [index, count, items]);

  return (
    <div
      className="relative"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* Track */}
      <div className="overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform">
          {visible.map((r, i) => (
            <div key={`${index}-${i}`} className="relative bg-white rounded-xl p-6 pt-10 mt-6 md:mt-8 shadow border border-[#e0e4ea]">
              {/* Avatar centered and overlapping top */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-white shadow overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#ff7aa8] to-[#ffce54] z-10">
                {r.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.avatarUrl} alt={`${r.name} avatar`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">{initialsFromName(r.name)}</span>
                )}
              </div>

              {/* Name and gold stars centered */}
              <div className="text-center mb-2">
                <div className="text-lg font-semibold text-[#005baa]">{r.name}</div>
                <div className="mt-1 text-[#f5c518]">{"★".repeat(Math.max(0, Math.round(r.rating)))}</div>
              </div>

              <div className="text-[#222] text-sm text-center">{r.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-[#e0e4ea] shadow hover:bg-[#f5f7fa]"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-[#e0e4ea] shadow hover:bg-[#f5f7fa]"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-[#005baa]" : "bg-[#c9d6e6]"}`}
              aria-label={`Go to slide ${i + 1}`}
            />)
          )}
        </div>
      )}
    </div>
  );
}
