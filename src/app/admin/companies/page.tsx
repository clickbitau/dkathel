'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

interface Company {
  _id: string
  name: string
  logo: string
  website?: string
  description?: string
  category: string
  relationship: 'client' | 'partner' | 'employer' | 'collaboration'
  startDate?: string
  endDate?: string
  isActive: boolean
  displayOrder: number
  featured: boolean
  technologies?: string[]
  achievements?: string[]
  createdAt: string
}

function AdminCompaniesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [relationshipFilter, setRelationshipFilter] = useState<string>('all')
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/login')
      return
    }
    fetchCompanies()
  }, [session, status, router, search, categoryFilter, relationshipFilter, activeFilter])

  const fetchCompanies = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      if (relationshipFilter !== 'all') params.append('relationship', relationshipFilter)
      if (activeFilter !== 'all') params.append('isActive', activeFilter)
      
      const response = await fetch(`/api/admin/companies?${params}`)
      if (!response.ok) throw new Error('Failed to fetch companies')
      
      const data = await response.json()
      setCompanies(data.companies || [])
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoading(false)
    }
  }, [search, categoryFilter, relationshipFilter, activeFilter])

  const toggleActive = async (companyId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/companies/${companyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update company')
      
      setCompanies(companies.map(company => 
        company._id === companyId ? { ...company, isActive: !currentStatus } : company
      ))
    } catch (error) {
      console.error('Error updating company:', error)
      alert('Failed to update company')
    }
  }

  const toggleFeatured = async (companyId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/companies/${companyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update company')
      
      setCompanies(companies.map(company => 
        company._id === companyId ? { ...company, featured: !currentStatus } : company
      ))
    } catch (error) {
      console.error('Error updating company:', error)
      alert('Failed to update company')
    }
  }

  const deleteCompany = async (companyId: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return
    
    try {
      const response = await fetch(`/api/admin/companies/${companyId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete company')
      
      setCompanies(companies.filter(company => company._id !== companyId))
    } catch (error) {
      console.error('Error deleting company:', error)
      alert('Failed to delete company')
    }
  }

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
    )
  }

  const categories = ['Technology', 'Education', 'Healthcare', 'Finance', 'E-commerce', 'Marketing', 'Consulting', 'Other']
  const relationships = ['client', 'partner', 'employer', 'collaboration']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Companies & Partners Management</h1>
          <Link href="/admin/companies/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Company
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search companies..."
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
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={relationshipFilter}
                onChange={(e) => setRelationshipFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Relationships</option>
                {relationships.map((rel) => (
                  <option key={rel} value={rel}>{rel.charAt(0).toUpperCase() + rel.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Companies Grid */}
        {companies.length === 0 ? (
          <Card className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first company or partner.</p>
            <Link href="/admin/companies/new">
              <Button>Add Company</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant={company.isActive ? "default" : "secondary"}>
                        {company.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{company.category}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {company.relationship}
                      </Badge>
                      {company.featured && (
                        <Badge variant="default" className="bg-yellow-500">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {company.name}
                    </h3>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:text-gray-800 mb-2 block"
                      >
                        {company.website}
                      </a>
                    )}
                    {company.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {company.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative h-20 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {company.technologies && company.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {company.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {company.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{company.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(company._id, company.isActive)}
                  >
                    {company.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(company._id, company.featured)}
                  >
                    {company.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/companies/${company._id}/edit`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCompany(company._id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(AdminCompaniesPage), {
  ssr: false
});
