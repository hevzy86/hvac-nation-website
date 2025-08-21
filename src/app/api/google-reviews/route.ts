import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

/*
GET /api/google-reviews
Query params:
- approved=1 -> return only reviews whose review_id is approved in Supabase

Env required:
- GOOGLE_MAPS_API_KEY
- GOOGLE_PLACE_ID (your Business Profile place_id)

Supabase table required:
create table if not exists google_review_approvals (
  review_id text primary key,
  approved boolean not null default false,
  created_at timestamp with time zone default now()
);
*/

export async function GET(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (!apiKey || !placeId) {
      return NextResponse.json({ error: 'Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const onlyApproved = searchParams.get('approved') === '1';

    // Fetch latest reviews from Google Places Details
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', [
      'name',
      'rating',
      'user_ratings_total',
      'reviews', // includes author_name, rating, relative_time_description, text, time, author_url, profile_photo_url
    ].join(','));
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 60 * 15 } }); // cache 15 min
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch Google data' }, { status: 502 });
    }
    const data = await res.json();
    const details = data?.result as {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      reviews?: GoogleReview[];
    } | undefined;

    type GoogleReview = {
      author_name?: string;
      rating?: number;
      text?: string;
      time?: number; // epoch seconds
      relative_time_description?: string;
      author_url?: string;
      profile_photo_url?: string;
    };

    const rawReviews: GoogleReview[] = Array.isArray(details?.reviews) ? details!.reviews! : [];

    // Normalize reviews
    type Review = {
      review_id: string; // derived from time + author_name as a stable-ish key
      author_name: string;
      rating: number;
      text: string;
      time: number; // epoch seconds
      relative_time_description?: string;
      author_url?: string;
      profile_photo_url?: string;
    };

    const normalized: Review[] = rawReviews.map((r) => ({
      review_id: String(r?.time ?? '') + '_' + String(r?.author_name ?? ''),
      author_name: r?.author_name ?? 'Anonymous',
      rating: Number(r?.rating ?? 0),
      text: String(r?.text ?? ''),
      time: Number(r?.time ?? 0),
      relative_time_description: r?.relative_time_description,
      author_url: r?.author_url,
      profile_photo_url: r?.profile_photo_url,
    }));

    // Join with approvals in Supabase
    const supabase = getSupabaseServer();
    const ids = normalized.map((n) => n.review_id);
    let approvedSet = new Set<string>();

    if (ids.length) {
      type ApprovalRow = { review_id: string; approved: boolean };
      const { data: approvals, error } = await supabase
        .from('google_review_approvals')
        .select('review_id, approved')
        .in('review_id', ids);
      if (error) {
        console.error('Supabase approvals error', error);
      } else {
        const rows = (approvals ?? []) as ApprovalRow[];
        approvedSet = new Set(rows.filter((a) => a.approved).map((a) => a.review_id));
      }
    }

    const withApproval = normalized.map((r) => ({ ...r, approved: approvedSet.has(r.review_id) }));
    const out = onlyApproved ? withApproval.filter((r) => r.approved) : withApproval;

    // NOTE (Google TOS): If you render Google reviews, show proper Google attribution and link to Place.
    return NextResponse.json({
      place: {
        name: details?.name,
        rating: details?.rating,
        user_ratings_total: details?.user_ratings_total,
        place_id: placeId,
      },
      reviews: out,
    }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
