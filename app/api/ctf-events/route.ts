import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('ctf_events')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching CTF events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date, description, status, link, link_text, display_order } = body;

    if (!name || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: name, date' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('ctf_events')
      .insert([{
        name,
        date,
        description,
        status: status || 'Upcoming',
        link,
        link_text: link_text || 'View Event',
        display_order: display_order || 0
      }])
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
    console.error('Error creating CTF event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
