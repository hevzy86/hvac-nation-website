import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

// POST /api/reviews -> create a pending review (approved=false)
export async function POST(request: Request) {
  try {
    const { name, rating, message } = await request.json();

    if (!name || !message || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from('reviews').insert({
      name,
      rating,
      message,
      approved: false,
    });

    if (error) {
      console.error('Supabase insert error', error);
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}

// GET /api/reviews?approved=1 -> list approved reviews (for future use)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyApproved = searchParams.get('approved') === '1';

    const supabase = getSupabaseServer();
    const query = supabase
      .from('reviews')
      .select('id, name, rating, message, created_at, approved')
      .order('created_at', { ascending: false })
      .limit(50);

    const { data, error } = onlyApproved
      ? await query.eq('approved', true)
      : await query;

    if (error) {
      console.error('Supabase select error', error);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    return NextResponse.json({ reviews: data ?? [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
