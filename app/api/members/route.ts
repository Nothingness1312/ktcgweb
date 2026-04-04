import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, type Member } from '@/lib/supabase';
import { verifyAuth, validateBody, sanitizeInput, checkRateLimit, createErrorResponse, createSuccessResponse } from '@/lib/api-auth';

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
    const { name, role, image_url } = body;

    // Validate required fields
    const validation = validateBody({ name, role }, ['name', 'role']);
    if (!validation.valid) {
      return createErrorResponse(validation.error || 'Validation failed', 400);
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedRole = sanitizeInput(role);
    const sanitizedImageUrl = image_url ? sanitizeInput(image_url) : null;

    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('members')
      .insert([{ name: sanitizedName, role: sanitizedRole, image_url: sanitizedImageUrl }])
      .select()
      .single();

    if (error) {
      return createErrorResponse(error.message, 400);
    }

    return createSuccessResponse(data, 201);
  } catch (error) {
    console.error('Error creating member:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
