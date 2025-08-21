"use client";
import { useEffect, useState } from "react";

interface Review {
  review_id: string;
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description?: string;
  author_url?: string;
  profile_photo_url?: string;
  approved?: boolean;
}

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/google-reviews", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setItems(data?.reviews ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to fetch reviews";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleApprove = async (review_id: string, next: boolean) => {
    try {
      await fetch("/api/google-reviews/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_id, approved: next }),
      });
      setItems((prev) => prev.map((r) => r.review_id === review_id ? { ...r, approved: next } : r));
    } catch {
      // noop
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#005baa] mb-4">Google Reviews Moderation</h1>
      <div className="mb-4 flex items-center gap-3">
        <button onClick={load} className="px-4 py-2 bg-[#005baa] text-white rounded-none font-medium">Reload</button>
        <a
          href={`https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""}`}
          target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 border border-[#005baa] text-[#005baa] rounded-none font-medium"
        >Write a test review</a>
      </div>

      {loading && <div className="text-sm text-[#2c3545]">Loading…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !items.length && (
        <div className="text-sm text-[#2c3545]">No reviews returned by Google yet.</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {items.map((r) => (
          <div key={r.review_id} className="border border-[#e0e4ea] rounded-2xl p-5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {r.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.profile_photo_url} alt={r.author_name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#f5f7fa]" />
                )}
                <div>
                  <div className="font-medium text-[#005baa]">{r.author_name}</div>
                  <div className="text-xs text-[#2c3545]/70">{r.relative_time_description}</div>
                </div>
              </div>
              <div className="text-[#f59e0b]">{"★".repeat(Math.round(r.rating))}</div>
            </div>
            <p className="text-sm text-[#2c3545] whitespace-pre-line">{r.text}</p>
            <div className="mt-3 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!r.approved}
                  onChange={(e) => toggleApprove(r.review_id, e.target.checked)}
                />
                <span>Approved</span>
              </label>
              {r.author_url && (
                <a href={r.author_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#005baa] hover:underline">View on Google</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
