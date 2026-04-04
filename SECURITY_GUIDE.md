# Security Implementation Guide

## Overview
This application implements comprehensive security measures using Supabase Authentication and Row Level Security (RLS) policies. All sensitive operations are protected with authentication and input validation.

## Authentication System

### Supabase Auth
- Users authenticate via Supabase Auth (email/password)
- JWT tokens are automatically managed by Supabase
- Session tokens are stored securely in HTTP-only cookies
- No custom authentication tables - purely Supabase Auth

### Login Flow
1. User navigates to `/admin/login`
2. Enters email and password
3. Supabase validates credentials
4. JWT token is received and stored
5. User is redirected to `/admin` dashboard

### Session Management
- `useAuth()` hook manages client-side session state
- Auto-login checks on app load
- Real-time auth state updates
- Automatic redirect to login if session expires

## Route Protection

### Middleware (`middleware.ts`)
- All `/admin/*` routes are protected
- Validates JWT token on each request
- Redirects unauthenticated users to `/admin/login`
- Clears invalid tokens automatically

### Protected Wrapper
- `AdminProtectedWrapper` component verifies auth on client
- Shows loading state while checking session
- Prevents flashing unprotected content
- Used in admin layout

## API Security

### Authentication Verification
All write operations (POST, PUT, DELETE) require:
1. **JWT Bearer Token** in Authorization header
2. **Valid session** verified against Supabase
3. **Token validation** using Supabase Auth API

Example:
```typescript
const authHeader = request.headers.get('authorization');
// Must be: "Bearer <jwt_token>"
const { user, error } = await supabase.auth.getUser(token);
```

### Input Validation & Sanitization
- `validateBody()` - Checks required fields
- `sanitizeInput()` - Removes special characters, limits length
- `checkRateLimit()` - Basic rate limiting (100 requests/minute)

### HTTP Status Codes
- `200` - Success
- `201` - Resource created
- `400` - Bad request (validation error)
- `401` - Unauthorized (no auth or invalid token)
- `404` - Not found
- `429` - Too many requests (rate limited)
- `500` - Server error

## Row Level Security (RLS)

### Public Read Access
Members and CTF events are **publicly readable**:
```sql
CREATE POLICY "Members are viewable by everyone"
  ON members FOR SELECT
  USING (true);
```

### Authenticated Write Access
Only authenticated users can create/update/delete:
```sql
CREATE POLICY "Only authenticated users can insert members"
  ON members FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

## API Routes

### Members
- `GET /api/members` - Public, returns all members
- `POST /api/members` - Requires auth, creates member
- `GET /api/members/[id]` - Public, returns single member
- `PUT /api/members/[id]` - Requires auth, updates member
- `DELETE /api/members/[id]` - Requires auth, deletes member

### CTF Events
- `GET /api/ctf-events` - Public, returns all events
- `POST /api/ctf-events` - Requires auth, creates event
- `GET /api/ctf-events/[id]` - Public, returns single event
- `PUT /api/ctf-events/[id]` - Requires auth, updates event
- `DELETE /api/ctf-events/[id]` - Requires auth, deletes event

## Admin Dashboard

### Pages
- `/admin` - Dashboard overview (protected)
- `/admin/login` - Login page (public)
- `/admin/members` - Member management (protected)
- `/admin/ctf-events` - CTF event management (protected)

### Token Handling
Admin pages automatically:
1. Get current session via `useAuth()` hook
2. Extract access token from session
3. Include token in API request headers
4. Handle 401 responses (redirect to login)

## Best Practices

### Development
1. Never commit `.env.local` with real credentials
2. Use `.env.example` as template for env vars
3. Test auth flows locally before deployment
4. Always verify RLS policies in Supabase

### Deployment
1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
2. Enable HTTPS (Vercel does this automatically)
3. Verify JWT secret is strong in Supabase
4. Monitor auth logs in Supabase dashboard

### Admin Users
To add an admin user:
1. Create account in Supabase Auth dashboard
2. User can immediately login at `/admin/login`
3. Access is controlled by Supabase Auth (no additional role checking)

## Security Checklist

- [x] JWT authentication on all write operations
- [x] Input validation and sanitization
- [x] Rate limiting on API endpoints
- [x] RLS policies for data access control
- [x] Protected admin routes with middleware
- [x] Automatic session management
- [x] HTTP-only cookie storage (Supabase handles)
- [x] No hardcoded credentials in code
- [x] Error messages don't leak sensitive info
- [x] CORS disabled for API (same-origin only)

## Troubleshooting

### User stuck on login page
- Check network tab for 401 errors
- Verify Supabase URL and key in env vars
- Clear browser cookies and try again

### "Unauthorized" errors on admin operations
- Verify user is logged in at `/admin/login`
- Check token is being sent in Authorization header
- Verify token hasn't expired

### RLS policy errors in Supabase
- Check that `auth.role()` is set correctly
- Verify policies are enabled on tables
- Test policies in Supabase SQL editor

## Resources
- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- JWT.io: https://jwt.io/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
