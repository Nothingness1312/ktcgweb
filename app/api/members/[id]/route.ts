import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { verifyAuth, validateBody, sanitizeInput, checkRateLimit, createErrorResponse, createSuccessResponse } from '@/lib/api-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return createErrorResponse('Member not found', 404);
    }

    return createSuccessResponse(data);
  } catch (error) {
    console.error('Error fetching member:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
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
      .update({ name: sanitizedName, role: sanitizedRole, image_url: sanitizedImageUrl, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return createErrorResponse(error.message, 400);
    }

    return createSuccessResponse(data);
  } catch (error) {
    console.error('Error updating member:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const supabase = getSupabaseServerClient();
    
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) {
      return createErrorResponse(error.message, 400);
    }

    return createSuccessResponse({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
