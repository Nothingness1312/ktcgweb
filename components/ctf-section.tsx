'use client';

import { useState, useEffect } from 'react';
import type { CTFEvent } from '@/lib/supabase';

interface CTFSectionProps {
  events: CTFEvent[];
  isLoading?: boolean;
}

export function CTFSection({ events: initialEvents, isLoading: initialLoading = false }: CTFSectionProps) {
  const [events, setEvents] = useState<CTFEvent[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (!initialEvents.length && !initialLoading) {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/ctf-events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching CTF events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show only first 6 events or all if configured
  const displayedEvents = events.slice(0, 6);

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
    <section id="achievements" className="py-20 md:py-28 px-4 border-b border-border bg-gradient-to-b from-background via-primary/5 to-background fade-in-up">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">CTF Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Event CTF yang telah diikuti dan sedang berjalan oleh anggota KTCG Community (Berdasarkan data terbaru)</p>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map((event, i) => (
              <div
                key={event.id}
                className="card-hover group relative p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl overflow-hidden fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </div>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                    {event.name}
                  </h3>

                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {event.link ? (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-accent transition-colors duration-300 underline decoration-primary/30 hover:decoration-accent/50"
                      >
                        {event.link_text}
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">{event.link_text}</span>
                    )}
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No CTF events found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
