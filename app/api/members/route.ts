import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, type Member } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, image_url } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: name, role' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('members')
      .insert([{ name, role, image_url }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
