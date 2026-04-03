# KTCG Website - Dynamic Setup Guide

This guide will help you set up the dynamic member and CTF event management system with Supabase.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Git

## 1. Supabase Configuration

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Wait for the project to be created

### Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy your project URL and anon key
3. Store these credentials safely

### Environment Variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with your actual credentials.

## 2. Database Setup

The database schema has already been created when you approved the migration. The following tables are available:

### Tables

- **members**: Stores team member information
  - `id`: UUID (primary key)
  - `name`: Member name
  - `role`: Member's specialty/role
  - `image_url`: Profile image URL
  - `created_at`, `updated_at`: Timestamps

- **ctf_events**: Stores CTF event information
  - `id`: UUID (primary key)
  - `name`: Event name
  - `date`: Event date
  - `description`: Event description
  - `status`: Event status (Upcoming, Ongoing, Completed)
  - `link`: Event URL
  - `link_text`: Text for the event link
  - `display_order`: Order to display events
  - `created_at`, `updated_at`: Timestamps

- **admin_users**: Stores admin user information
  - `id`: UUID (references auth.users)
  - `email`: Admin email
  - `created_at`: Timestamp

### Row Level Security (RLS)

- **Public Read**: All users can view members and CTF events
- **Admin Only Write**: Only authenticated admin users can create, update, or delete data

## 3. Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see the homepage.

## 4. Using the Admin Dashboard

### Access the Admin Dashboard

Navigate to `http://localhost:3000/admin` to access the admin dashboard.

### Add a Member

1. Go to **Admin Dashboard** → **Manage Members**
2. Click **+ Add Member**
3. Fill in the form:
   - **Name**: Member's name
   - **Role**: Their specialty (e.g., "Digital Forensics", "Web Exploitation")
   - **Image URL**: Link to their profile image
4. Click **Add Member**

### Add a CTF Event

1. Go to **Admin Dashboard** → **Manage CTF Events**
2. Click **+ Add Event**
3. Fill in the form:
   - **Event Name**: Name of the CTF event
   - **Date**: When the event takes place
   - **Description**: Brief description
   - **Status**: Upcoming, Ongoing, or Completed
   - **Event Link**: URL to the event
   - **Link Text**: Text to display for the link (default: "View Event")
   - **Display Order**: Order to show events (lower numbers first)
4. Click **Add Event**

## 5. API Endpoints

The following API routes are available:

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create a new member
- `GET /api/members/[id]` - Get a specific member
- `PUT /api/members/[id]` - Update a member
- `DELETE /api/members/[id]` - Delete a member

### CTF Events
- `GET /api/ctf-events` - Get all CTF events
- `POST /api/ctf-events` - Create a new event
- `GET /api/ctf-events/[id]` - Get a specific event
- `PUT /api/ctf-events/[id]` - Update an event
- `DELETE /api/ctf-events/[id]` - Delete an event

## 6. Deployment to Vercel

### Deploy the Project

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

### Manage Admin Users

To grant admin access to users:

1. In your Supabase project, go to **SQL Editor**
2. Run this query to add an admin user:

```sql
INSERT INTO admin_users (id, email)
SELECT id, email FROM auth.users WHERE email = 'user@example.com'
```

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not set"

Make sure your `.env.local` file contains:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Database operations not working

1. Check that RLS policies are enabled
2. Verify your Supabase credentials are correct
3. Check browser console for error messages

### Can't add members/events

1. You need to be authenticated as an admin user
2. Your user must be in the `admin_users` table
3. Check that RLS policies are properly configured

## Support

For issues with Supabase, visit [supabase.com/docs](https://supabase.com/docs)
For Next.js questions, visit [nextjs.org/docs](https://nextjs.org/docs)
