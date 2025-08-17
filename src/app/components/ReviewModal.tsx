"use client";
import React, { useEffect, useState } from "react";

export default function ReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // lock scroll similar to QuoteModal for good UX
    const y = window.scrollY || 0;
    const body = document.body;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, y);
    };
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and message.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, message: message.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to submit review");
      }
      setSubmitted(true);
      setName("");
      setRating(5);
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overscroll-contain">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full md:max-w-md bg-white md:rounded-xl shadow-2xl border border-[#e0e4ea] md:overflow-hidden h-[100svh] md:max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 bg-[#005baa] text-white flex items-center justify-between border-b-4 border-[#d7263d] sticky top-0 z-10">
          <div className="font-bold text-lg">Leave a Review</div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-none bg-[#d7263d] text-white text-sm font-semibold transition hover:bg-[#c01f32]"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 6px 14px rgba(215, 38, 61, 0.22)" }}
          >
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-3 overflow-y-auto flex-1">
          {submitted ? (
            <div className="p-4 bg-[#f5f9ff] border border-[#e0e4ea] rounded text-[#003366]">
              Thank you! Your review was received and awaits approval.
            </div>
          ) : (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-2 rounded bg-white border border-[#e0e4ea]"
                required
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#003366] font-medium">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="p-2 border border-[#e0e4ea] rounded bg-white"
                >
                  {[5,4,3,2,1].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span className="text-[#005baa]">{"★".repeat(rating)}</span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your review"
                rows={4}
                className="w-full p-2 rounded bg-white border border-[#e0e4ea]"
                required
              />
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
            </>
          )}
        </form>
        <div className="px-6 py-4 bg-white border-t border-[#e0e4ea] sticky bottom-0 z-10 flex gap-3 justify-end md:justify-start">
          {!submitted ? (
            <button
              disabled={submitting}
              className="px-5 py-2 rounded-none bg-[#005baa] text-white font-semibold transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 10px 22px rgba(0, 91, 170, 0.22)" }}
              onClick={(e) => { e.preventDefault(); onSubmit(e as any); }}
            >
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          ) : (
            <button
              className="px-5 py-2 rounded-none bg-white text-[#005baa] font-semibold border border-[#005baa] transition hover:-translate-y-0.5 hover:shadow-lg"
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
