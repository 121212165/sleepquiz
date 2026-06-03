import { NextRequest, NextResponse } from 'next/server';

// In-memory store for MVP (replace with Supabase later)
const results = new Map<string, { result: unknown; answers: unknown; createdAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, result } = body;

    const id = crypto.randomUUID();
    results.set(id, {
      result,
      answers,
      createdAt: Date.now(),
    });

    return NextResponse.json({ id, ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const data = results.get(id);
    if (!data) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
