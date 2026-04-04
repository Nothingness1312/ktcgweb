import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verify user is authenticated
export async function verifyAuth(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        user: null,
        error: 'Missing or invalid authorization header',
        status: 401,
      };
    }

    const token = authHeader.substring(7);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Verify the token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return {
        user: null,
        error: 'Invalid or expired token',
        status: 401,
      };
    }

    return {
      user,
      error: null,
      status: 200,
    };
  } catch (err) {
    return {
      user: null,
      error: err instanceof Error ? err.message : 'Authentication failed',
      status: 500,
    };
  }
}

// Helper to create error response
export function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// Helper to create success response
export function createSuccessResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}

// Middleware to check auth for protected routes
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  const { user, error, status } = await verifyAuth(request);

  if (error || !user) {
    return createErrorResponse(error || 'Unauthorized', status);
  }

  return handler(request, user);
}

// Validate request body
export function validateBody(body: any, requiredFields: string[]): { valid: boolean; error?: string } {
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        valid: false,
        error: `Missing required field: ${field}`,
      };
    }
  }
  return { valid: true };
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000); // Limit length
}

// Rate limiting helper (basic)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
