import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

/*
POST /api/google-reviews/approve
Body: { review_id: string, approved: boolean }
Effect: upsert into google_review_approvals table
*/

export async function POST(request: Request) {
  try {
    const { review_id, approved } = await request.json();
    if (!review_id || typeof approved !== 'boolean') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('google_review_approvals')
      .upsert({ review_id, approved }, { onConflict: 'review_id' });

    if (error) {
      console.error('Supabase upsert error', error);
      return NextResponse.json({ error: 'Failed to save approval' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
