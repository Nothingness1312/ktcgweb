import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | KTCG',
  description: 'Admin dashboard for managing KTCG members and CTF events',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
