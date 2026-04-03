'use client';

import { useState, useEffect } from 'react';
import type { Member } from '@/lib/supabase';

interface MembersSectionProps {
  members: Member[];
  isLoading?: boolean;
}

export function MembersSection({ members: initialMembers, isLoading: initialLoading = false }: MembersSectionProps) {
  const [selectedRole, setSelectedRole] = useState('All');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (!initialMembers.length && !initialLoading) {
      fetchMembers();
    }
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique roles from members
  const roles = ['All', ...Array.from(new Set(members.map(m => m.role)))];

  // Filter members based on selected role
  const filteredMembers = selectedRole === 'All' 
    ? members 
    : members.filter(member => member.role === selectedRole);

  return (
    <section id="team" className="py-20 md:py-28 px-4 border-b border-border bg-gradient-to-b from-background via-card/10 to-background fade-in-up">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Anggota KTCG</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Tim KTCG yang berdedikasi untuk kesempurnaan dalam dunia cybersecurity</p>
        </div>

        {/* Role Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 fade-in-up">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedRole === role
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-card/80'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scale-in">
            {filteredMembers.map((member, i) => (
              <div
                key={`${member.id}-${i}`}
                className="card-hover card-reveal group relative h-64 rounded-xl p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-300 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members found for this role.</p>
          </div>
        )}
      </div>
    </section>
  );
}
