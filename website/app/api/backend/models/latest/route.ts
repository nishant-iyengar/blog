import { NextResponse } from 'next/server';

/**
 * GET /api/backend/models/latest
 * 
 * Fetches the latest model weights from Supabase.
 * This endpoint proxies to Supabase to get the most recent model.
 */
export async function GET() {
  try {
    // Use NEXT_PUBLIC_ prefixed variables (standard Next.js convention)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabaseTable = process.env.NEXT_PUBLIC_SUPABASE_TABLE || 'ai_tank_models';

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase config missing:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        hasTable: !!supabaseTable,
        envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE')),
      });
      return NextResponse.json(
        { error: 'Supabase configuration missing. Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY in website/.env.local' },
        { status: 500 }
      );
    }

    // Fetch latest model from Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${supabaseTable}?order=created_at.desc&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No models found' },
        { status: 404 }
      );
    }

    const model = data[0];

    // Parse weights and metadata
    const weights = typeof model.weights === 'string' 
      ? JSON.parse(model.weights) 
      : model.weights;
    const metadata = typeof model.metadata === 'string'
      ? JSON.parse(model.metadata)
      : model.metadata;

    return NextResponse.json({
      layers: weights,
      metadata: metadata,
    });
  } catch (error) {
    console.error('Error fetching model:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

