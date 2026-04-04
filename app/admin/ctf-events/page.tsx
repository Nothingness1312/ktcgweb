'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import type { CTFEvent } from '@/lib/supabase';

export default function ManageCTFEventsPage() {
  const [events, setEvents] = useState<CTFEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    status: 'Upcoming' as const,
    link: '',
    link_text: 'View Event',
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const getAuthHeader = () => {
    if (!session?.access_token) {
      throw new Error('No authentication token available');
    }
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/ctf-events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching CTF events:', error);
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await fetch('/api/ctf-events', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          date: '',
          description: '',
          status: 'Upcoming',
          link: '',
          link_text: 'View Event',
          display_order: 0,
        });
        setShowAddForm(false);
        await fetchEvents();
      } else {
        const data = await response.json();
        setError(data.error || 'Error adding event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Error adding event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      setError(null);
      const response = await fetch(`/api/ctf-events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (response.ok) {
        await fetchEvents();
      } else {
        const data = await response.json();
        setError(data.error || 'Error deleting event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Error deleting event');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-600 border border-green-500/20';
      case 'Ongoing':
        return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
      case 'Upcoming':
        return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border border-gray-500/20';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/admin" className="text-primary hover:text-accent transition">
                  Admin
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground">CTF Events</span>
              </div>
              <h1 className="text-3xl font-bold">Manage CTF Events</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
            >
              {showAddForm ? 'Cancel' : '+ Add Event'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Add Event Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-card border border-border rounded-xl">
            <h2 className="text-xl font-bold mb-4">Add New CTF Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Event name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="e.g., Maret 2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Link Text</label>
                  <input
                    type="text"
                    value={formData.link_text}
                    onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="View Event"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Event'}
              </button>
            </form>
          </div>
        )}

        {/* Events List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-card/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{event.name}</h3>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-500/10 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No CTF events yet. Add your first event!</p>
          </div>
        )}
      </div>
    </div>
  );
}
