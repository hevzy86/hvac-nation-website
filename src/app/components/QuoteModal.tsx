"use client";
import React, { useEffect, useMemo, useState } from "react";

export type QuoteService = {
  key: string;
  label: string;
  basePrice: number; // demo-only
};

export default function QuoteModal({
  open,
  onClose,
  presetService,
  services,
}: {
  open: boolean;
  onClose: () => void;
  presetService?: string | null;
  services: QuoteService[];
}) {
  const [selected, setSelected] = useState<Record<string, number>>({}); // key -> quantity

  useEffect(() => {
    if (open) {
      // Initialize selection on open; preselect presetService with qty 1
      const initial: Record<string, number> = {};
      if (presetService) initial[presetService] = 1;
      setSelected(initial);
      // Prevent background scroll
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open, presetService]);

  const total = useMemo(() => {
    return services.reduce((sum, s) => sum + (selected[s.key] || 0) * s.basePrice, 0);
  }, [selected, services]);

  const toggleService = (key: string) => {
    setSelected((prev) => {
      const qty = prev[key] || 0;
      const nextQty = qty === 0 ? 1 : 0;
      const next = { ...prev };
      if (nextQty === 0) delete next[key]; else next[key] = nextQty;
      return next;
    });
  };

  const changeQty = (key: string, delta: number) => {
    setSelected((prev) => {
      const curr = prev[key] || 0;
      const next = Math.max(0, Math.min(9, curr + delta));
      const copy = { ...prev };
      if (next === 0) delete copy[key]; else copy[key] = next;
      return copy;
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full md:max-w-2xl bg-white md:rounded-xl shadow-2xl border border-[#e0e4ea] md:overflow-hidden max-h-[90dvh] md:max-h-[85vh] flex flex-col overscroll-contain">
        {/* Sticky Header */}
        <div className="px-6 py-4 bg-[#005baa] text-white flex items-center justify-between border-b-4 border-[#d7263d] sticky top-0 z-10">
          <div className="font-bold text-lg">Get My Quote</div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-none bg-[#d7263d] text-white text-sm font-semibold transition hover:bg-[#c01f32]"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 6px 14px rgba(215, 38, 61, 0.22)" }}
          >
            Close
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 grid md:grid-cols-2 gap-6 overflow-y-auto flex-1">
          <div>
            <div className="font-semibold text-[#003366] mb-3">Select Services</div>
            <div className="space-y-2">
              {services.map((s) => {
                const active = (selected[s.key] || 0) > 0;
                return (
                  <div key={s.key} className={`flex items-center justify-between border rounded-lg px-3 py-2 ${active ? 'border-[#005baa] bg-[#f5f9ff]' : 'border-[#e0e4ea] bg-white'}`}>
                    <button onClick={() => toggleService(s.key)} className={`text-left flex-1 font-medium ${active ? 'text-[#003366]' : 'text-[#222]'}`}>
                      {s.label}
                      <span className="ml-2 text-xs text-[#666]">${s.basePrice}</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(s.key, -1)} className="w-7 h-7 bg-white border border-[#e0e4ea] text-[#003366] rounded hover:bg-[#f5f7fa]">-</button>
                      <div className="w-6 text-center text-sm">{selected[s.key] || 0}</div>
                      <button onClick={() => changeQty(s.key, +1)} className="w-7 h-7 bg-white border border-[#e0e4ea] text-[#003366] rounded hover:bg-[#f5f7fa]">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="font-semibold text-[#003366] mb-3">Your Info</div>
            <div className="space-y-2">
              <input placeholder="Name" className="w-full p-2 rounded bg-white border border-[#e0e4ea]" />
              <input placeholder="Email" className="w-full p-2 rounded bg-white border border-[#e0e4ea]" />
              <input placeholder="Phone" className="w-full p-2 rounded bg-white border border-[#e0e4ea]" />
              <textarea placeholder="Details (optional)" rows={3} className="w-full p-2 rounded bg-white border border-[#e0e4ea]" />
            </div>
            <div className="mt-4 p-3 rounded bg-[#f5f7fa] border border-[#e0e4ea]">
              <div className="text-sm text-[#003366] font-semibold">Estimated Total</div>
              <div className="text-3xl font-bold text-[#005baa]">${total.toFixed(0)}</div>
              <div className="text-xs text-[#666] mt-1">Demo estimate. Final pricing may vary after on-site diagnosis.</div>
            </div>
          </div>
        </div>
        {/* Sticky Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#e0e4ea] sticky bottom-0 z-10 flex gap-3 justify-end md:justify-start pb-[env(safe-area-inset-bottom)]">
          <button
            className="px-5 py-2 rounded-none bg-[#d7263d] text-white font-semibold transition hover:-translate-y-0.5 hover:bg-[#c01f32] hover:shadow-lg"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 10px 22px rgba(215, 38, 61, 0.25)" }}
            onClick={onClose}
          >
            Request Quote
          </button>
          <button
            className="px-5 py-2 rounded-none bg-white text-[#005baa] font-semibold border border-[#005baa] transition hover:-translate-y-0.5 hover:shadow-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
