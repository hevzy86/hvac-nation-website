"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type ReviewItem = { name: string; text: string; rating: number; source?: "google" | "site" };

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
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform">
          {visible.map((r, i) => (
            <div key={`${index}-${i}`} className="bg-white rounded-xl p-6 shadow border border-[#e0e4ea]">
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold text-[#003366] mr-2">{r.name}</span>
                <span className="text-[#005baa]">{"★".repeat(r.rating)}</span>
                {r.source === "google" && (
                  <span className="ml-auto text-xs text-[#666]">Google</span>
                )}
              </div>
              <div className="text-[#222] text-sm">{r.text}</div>
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
