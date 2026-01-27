'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/image-upload';

const categories = ['Technology', 'Education', 'Healthcare', 'Finance', 'E-commerce', 'Marketing', 'Consulting', 'Other'];
const relationships = ['client', 'partner', 'employer', 'collaboration'];

export default function EditCompanyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const companyId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
    category: 'Other',
    relationship: 'client',
    startDate: '',
    endDate: '',
    isActive: true,
    featured: false,
    technologies: [] as string[],
    achievements: [] as string[]
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/login');
      return;
    }
    
    fetchCompany();
  }, [session, status, router, companyId]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/admin/companies/${companyId}`);
      if (!response.ok) throw new Error('Failed to fetch company');
      
      const data = await response.json();
      const company = data.company;
      
      setFormData({
        name: company.name || '',
        logo: company.logo || '',
        website: company.website || '',
        description: company.description || '',
        category: company.category || 'Other',
        relationship: company.relationship || 'client',
        startDate: company.startDate ? new Date(company.startDate).toISOString().split('T')[0] : '',
        endDate: company.endDate ? new Date(company.endDate).toISOString().split('T')[0] : '',
        isActive: company.isActive ?? true,
        featured: company.featured ?? false,
        technologies: company.technologies || [],
        achievements: company.achievements || []
      });
    } catch (error) {
      console.error('Error fetching company:', error);
      alert('Failed to load company data');
    } finally {
      setInitialLoading(false);
    }
  };

  if (status === 'loading' || initialLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!session || session.user?.role !== 'admin') {
    return <div className="p-8">Redirecting to login...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update company');
      }

      router.push('/admin/companies');
    } catch (error) {
      console.error('Error updating company:', error);
      alert(error instanceof Error ? error.message : 'Failed to update company');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInput = (field: 'technologies' | 'achievements', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Company</h1>
        <p className="text-gray-600 mt-2">Update company information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="relationship">Relationship *</Label>
                <Select value={formData.relationship} onValueChange={(value) => handleInputChange('relationship', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel.charAt(0).toUpperCase() + rel.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe the company and your relationship with them..."
              />
            </div>

            <div>
              <ImageUpload
                value={formData.logo}
                onChange={(url) => handleInputChange('logo', url)}
                category="companies"
                label="Company Logo"
                description="Upload the company logo (JPEG, PNG, GIF, WebP up to 5MB)"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Textarea
                  id="technologies"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => handleArrayInput('technologies', e.target.value)}
                  rows={3}
                  placeholder="React, Node.js, MongoDB, AWS..."
                />
              </div>

              <div>
                <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements.join(', ')}
                  onChange={(e) => handleArrayInput('achievements', e.target.value)}
                  rows={3}
                  placeholder="Increased efficiency by 50%, Reduced costs by 30%..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Company'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
