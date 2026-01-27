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
import { FileText, Download, Eye } from 'lucide-react'
import dynamic from 'next/dynamic'

interface Certification {
  _id: string
  name: string
  issuer: string
  description?: string
  issueDate: string
  expiryDate?: string
  image: string
  pdfUrl?: string
  skills: string[]
  category: string
  isActive: boolean
  displayOrder: number
  createdAt: string
}

function AdminCertificationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/login')
      return
    }
    fetchCertifications()
  }, [session, status, router, search, categoryFilter, activeFilter])

  const fetchCertifications = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      if (activeFilter !== 'all') params.append('isActive', activeFilter)
      
      const response = await fetch(`/api/admin/certifications?${params}`)
      if (!response.ok) throw new Error('Failed to fetch certifications')
      
      const data = await response.json()
      setCertifications(data.certifications || [])
    } catch (error) {
      console.error('Error fetching certifications:', error)
    } finally {
      setLoading(false)
    }
  }, [search, categoryFilter, activeFilter])

  const toggleActive = async (certId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/certifications/${certId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update certification')
      
      setCertifications(certifications.map(cert => 
        cert._id === certId ? { ...cert, isActive: !currentStatus } : cert
      ))
    } catch (error) {
      console.error('Error updating certification:', error)
      alert('Failed to update certification')
    }
  }

  const deleteCertification = async (certId: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return
    
    try {
      const response = await fetch(`/api/admin/certifications/${certId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete certification')
      
      setCertifications(certifications.filter(cert => cert._id !== certId))
    } catch (error) {
      console.error('Error deleting certification:', error)
      alert('Failed to delete certification')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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

  const categories = ['IT Security', 'Digital Marketing', 'Education', 'Business', 'Technology', 'Other']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Certifications Management</h1>
          <Link href="/admin/certifications/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Certification
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search certifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Certifications Grid */}
        {certifications.length === 0 ? (
          <Card className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first certification.</p>
            <Link href="/admin/certifications/new">
              <Button>Add Certification</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={cert.isActive ? "default" : "secondary"}>
                        {cert.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{cert.category}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                    {cert.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative h-32 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={encodeURI(cert.image)}
                    alt={cert.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <p>Issued: {formatDate(cert.issueDate)}</p>
                  {cert.expiryDate && (
                    <p>Expires: {formatDate(cert.expiryDate)}</p>
                  )}
                </div>

                {cert.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{cert.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {/* PDF Actions */}
                  {cert.pdfUrl && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(encodeURI(cert.pdfUrl!), '_blank')}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = encodeURI(cert.pdfUrl!);
                          link.download = `${cert.name}.pdf`;
                          link.click();
                        }}
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                  
                  {/* Management Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(cert._id, cert.isActive)}
                      className="flex-1"
                    >
                      {cert.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Link href={`/admin/certifications/${cert._id}/edit`}>
                      <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCertification(cert._id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(AdminCertificationsPage), {
  ssr: false
});
