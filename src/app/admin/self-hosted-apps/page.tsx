'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Server, Monitor, Wrench, Database, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';

interface SelfHostedApp {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  category: 'media' | 'productivity' | 'development' | 'system' | 'other';
  url: string;
  icon?: string;
  status: 'active' | 'inactive' | 'maintenance';
  isPublic: boolean;
  displayOrder: number;
  tags: string[];
  lastChecked?: string;
  createdAt: string;
  updatedAt: string;
}

const categoryIcons = {
  media: Monitor,
  productivity: Wrench,
  development: Database,
  system: Server,
  other: Globe
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  maintenance: 'bg-yellow-100 text-yellow-800'
};

function AdminSelfHostedAppsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apps, setApps] = useState<SelfHostedApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user?.role !== 'admin') {
      router.push('/login');
      return;
    }
    fetchApps();
  }, [session, status, router, search, categoryFilter, statusFilter]);

  const fetchApps = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await fetch(`/api/admin/self-hosted-apps?${params}`);
      if (!response.ok) throw new Error('Failed to fetch apps');
      
      const data = await response.json();
      setApps(data.apps || []);
    } catch (error) {
      console.error('Error fetching apps:', error);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, statusFilter]);

  const toggleStatus = async (appId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`/api/admin/self-hosted-apps/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update app status');
      
      setApps(apps.map(app => 
        app._id === appId ? { ...app, status: newStatus as any } : app
      ));
    } catch (error) {
      console.error('Error updating app status:', error);
      alert('Failed to update app status');
    }
  };

  const togglePublic = async (appId: string, currentPublic: boolean) => {
    try {
      const response = await fetch(`/api/admin/self-hosted-apps/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: !currentPublic })
      });
      
      if (!response.ok) throw new Error('Failed to update app visibility');
      
      setApps(apps.map(app => 
        app._id === appId ? { ...app, isPublic: !currentPublic } : app
      ));
    } catch (error) {
      console.error('Error updating app visibility:', error);
      alert('Failed to update app visibility');
    }
  };

  const deleteApp = async (appId: string) => {
    if (!confirm('Are you sure you want to delete this app?')) return;
    
    try {
      const response = await fetch(`/api/admin/self-hosted-apps/${appId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete app');
      
      setApps(apps.filter(app => app._id !== appId));
    } catch (error) {
      console.error('Error deleting app:', error);
      alert('Failed to delete app');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-48"></div>
            <div className="grid gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categories = ['media', 'productivity', 'development', 'system', 'other'];
  const statuses = ['active', 'inactive', 'maintenance'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Self-Hosted Applications</h1>
          <Link href="/admin/self-hosted-apps/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Application
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Apps Grid */}
        {apps.length === 0 ? (
          <Card className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first self-hosted application.</p>
            <Link href="/admin/self-hosted-apps/new">
              <Button>Add Application</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
              const CategoryIcon = categoryIcons[app.category];
              return (
                <Card key={app._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <p className="text-sm text-gray-500">{app.subdomain}.dkathel.com</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={statusColors[app.status]}>
                          {app.status}
                        </Badge>
                        {app.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {app.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {app.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {app.category}
                      </Badge>
                      {app.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {app.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{app.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(app.url, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(app._id, app.status)}
                      >
                        {app.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublic(app._id, app.isPublic)}
                        className="flex-1"
                      >
                        {app.isPublic ? 'Make Private' : 'Make Public'}
                      </Button>
                      <Link href={`/admin/self-hosted-apps/${app._id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteApp(app._id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AdminSelfHostedAppsPage), {
  ssr: false
});

