"use client";
import { useEffect, useState } from "react";

interface GReview {
  review_id: string;
  author_name: string;
  rating: number;
  text: string;
  time: number; // epoch seconds
  relative_time_description?: string;
  author_url?: string;
  profile_photo_url?: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/google-reviews?approved=1", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        setReviews(data?.reviews ?? []);
      } catch (e: any) {
        setError(e?.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (error) return null;
  if (!reviews.length) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h3 className="text-xl font-bold mb-4 text-[#003366] flex items-center gap-2">
        <span>What customers say on Google</span>
        <img src="/globe.svg" alt="google" width={18} height={18} />
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <article key={r.review_id} className="rounded-2xl border border-[#e0e4ea] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {r.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.profile_photo_url} alt={r.author_name} className="h-9 w-9 rounded-full object-cover" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-[#f5f7fa]" />
              )}
              <div>
                <div className="font-medium text-[#003366]">{r.author_name}</div>
                <div className="text-xs text-[#2c3545]/70">{r.relative_time_description}</div>
              </div>
            </div>
            <div className="text-[#f59e0b] mb-1">{"★".repeat(Math.round(r.rating))}</div>
            <p className="text-sm text-[#2c3545]">{r.text}</p>
            {r.author_url && (
              <a href={r.author_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-[#005baa] hover:underline">
                View on Google
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="text-[11px] text-[#2c3545]/60 mt-4">Reviews shown here are sourced from Google. © Google</p>
    </section>
  );
}
