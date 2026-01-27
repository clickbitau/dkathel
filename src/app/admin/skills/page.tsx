'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

const categories = [
  'system-administration',
  'support-recovery', 
  'web-development',
  'cybersecurity',
  'networking',
  'other'
];

const proficiencies = ['beginner', 'intermediate', 'advanced', 'expert'];

export default function SkillsAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/login');
      return;
    }
  }, [session, status, router]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'system-administration',
    proficiency: 'intermediate',
    description: '',
    icon: '',
    order: 0
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingSkill ? '/api/admin/skills' : '/api/admin/skills';
      const method = editingSkill ? 'PUT' : 'POST';
      const body = editingSkill ? { ...formData, id: editingSkill._id } : formData;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        setFormData({
          name: '',
          category: 'system-administration',
          proficiency: 'intermediate',
          description: '',
          icon: '',
          order: 0
        });
        setEditingSkill(null);
        fetchSkills();
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      description: skill.description || '',
      icon: skill.icon || '',
      order: skill.order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const response = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'system-administration',
      proficiency: 'intermediate',
      description: '',
      icon: '',
      order: 0
    });
  };

  if (status === 'loading' || isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!session || session.user?.role !== 'admin') {
    return <div className="p-8">Redirecting to login...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="proficiency">Proficiency Level</Label>
                <Select
                  value={formData.proficiency}
                  onValueChange={(value) => setFormData({ ...formData, proficiency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencies.map(level => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="icon">Icon (Optional)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Icon class or URL"
                />
              </div>
              
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </Button>
                {editingSkill && (
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Skills List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <p className="text-sm text-gray-600">
                        {skill.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {skill.proficiency}
                      </p>
                      {skill.description && (
                        <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(skill._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
