import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdmin } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/login');
  }
  const adminSections = [
    {
      title: 'Skills Management',
      description: 'Manage technical skills and proficiencies',
      href: '/admin/skills',
      icon: '🔧'
    },
    {
      title: 'Experience Management',
      description: 'Manage work experience and achievements',
      href: '/admin/experiences',
      icon: '💼'
    },
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      href: '/admin/blog',
      icon: '📝'
    },
    {
      title: 'Certifications',
      description: 'Manage professional certifications',
      href: '/admin/certifications',
      icon: '🏆'
    },
    {
      title: 'Companies',
      description: 'Manage company partnerships and collaborations',
      href: '/admin/companies',
      icon: '🏢'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      href: '/admin/users',
      icon: '👥'
    },
    {
      title: 'Self-Hosted Apps',
      description: 'Manage your self-hosted applications and services',
      href: '/admin/self-hosted-apps',
      icon: '🖥️'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your portfolio content and data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">18</div>
                <div className="text-sm text-gray-600">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Experiences</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Blog Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
