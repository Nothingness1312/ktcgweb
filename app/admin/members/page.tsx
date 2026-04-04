'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import type { Member } from '@/lib/supabase';

export default function ManageMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', image_url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    fetchMembers();
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

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', role: '', image_url: '' });
        setShowAddForm(false);
        await fetchMembers();
      } else {
        const data = await response.json();
        setError(data.error || 'Error adding member');
      }
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Error adding member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      setError(null);
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (response.ok) {
        await fetchMembers();
      } else {
        const data = await response.json();
        setError(data.error || 'Error deleting member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Error deleting member');
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
                <span className="text-foreground">Members</span>
              </div>
              <h1 className="text-3xl font-bold">Manage Members</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
            >
              {showAddForm ? 'Cancel' : '+ Add Member'}
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

        {/* Add Member Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-card border border-border rounded-xl">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Member name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="e.g., Digital Forensics, Web Exploitation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Member'}
              </button>
            </form>
          </div>
        )}

        {/* Members List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-card/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : members.length > 0 ? (
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-4 bg-card border border-border rounded-lg flex items-center justify-between hover:border-primary/50 transition"
              >
                <div className="flex items-center gap-4">
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-500/10 rounded transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members yet. Add your first member!</p>
          </div>
        )}
      </div>
    </div>
  );
}
