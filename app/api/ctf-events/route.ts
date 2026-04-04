import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { verifyAuth, validateBody, sanitizeInput, checkRateLimit, createErrorResponse, createSuccessResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('ctf_events')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return createErrorResponse(error.message, 400);
    }

    return createSuccessResponse(data);
  } catch (error) {
    console.error('Error fetching CTF events:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return createErrorResponse('Too many requests', 429);
    }

    // Verify authentication
    const { user, error: authError, status: authStatus } = await verifyAuth(request);
    if (authError || !user) {
      return createErrorResponse(authError || 'Unauthorized', authStatus);
    }

    const body = await request.json();
    const { name, date, description, status, link, link_text, display_order } = body;

    // Validate required fields
    const validation = validateBody({ name, date }, ['name', 'date']);
    if (!validation.valid) {
      return createErrorResponse(validation.error || 'Validation failed', 400);
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedDate = sanitizeInput(date);
    const sanitizedDescription = description ? sanitizeInput(description) : null;
    const sanitizedLink = link ? sanitizeInput(link) : null;
    const sanitizedLinkText = link_text ? sanitizeInput(link_text) : 'View Event';

    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('ctf_events')
      .insert([{
        name: sanitizedName,
        date: sanitizedDate,
        description: sanitizedDescription,
        status: status || 'Upcoming',
        link: sanitizedLink,
        link_text: sanitizedLinkText,
        display_order: display_order || 0
      }])
      .select()
      .single();

    if (error) {
      return createErrorResponse(error.message, 400);
    }

    return createSuccessResponse(data, 201);
  } catch (error) {
    console.error('Error creating CTF event:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
