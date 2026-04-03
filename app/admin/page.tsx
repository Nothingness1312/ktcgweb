'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Member, CTFEvent } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const [membersRes, eventsRes] = await Promise.all([
        fetch('/api/members'),
        fetch('/api/ctf-events'),
      ]);

      const members = await membersRes.json();
      const events = await eventsRes.json();

      setStats({
        totalMembers: members.length,
        totalEvents: events.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage KTCG members and CTF events</p>
            </div>
            <Link href="/" className="text-sm font-medium text-primary hover:text-accent transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card-hover p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Members</p>
                {isLoading ? (
                  <div className="h-10 w-16 bg-card/50 rounded animate-pulse mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-primary mt-2">{stats.totalMembers}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5h4m-4 0v4m0-11v-4m0 11H9m0 0H5m4 0v4m0-4H5m4 0v-4m8-1v5a3 3 0 11-6 0v-5m6 0h-3m-3 0h-3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card-hover p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">CTF Events</p>
                {isLoading ? (
                  <div className="h-10 w-16 bg-card/50 rounded animate-pulse mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-secondary mt-2">{stats.totalEvents}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/members"
            className="card-hover p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl hover:border-primary/50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a9 9 0 0118 0" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Manage Members</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove team members</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/ctf-events"
            className="card-hover p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl hover:border-secondary/50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Manage CTF Events</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove CTF events</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
