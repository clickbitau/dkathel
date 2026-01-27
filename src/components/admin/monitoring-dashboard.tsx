'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface HealthCheckData {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  responseTime: number
  uptime: number
  version: string
  environment: string
  services: Record<string, {
    status: 'healthy' | 'degraded' | 'unhealthy'
    responseTime: number
    message: string
    details?: Record<string, unknown>
  }>
  system: {
    nodeVersion: string
    platform: string
    arch: string
    memory: {
      used: number
      total: number
    }
  }
}

interface MonitorData {
  monitors: Array<{
    id: number
    name: string
    url: string
    status: 'up' | 'down' | 'pending'
    uptime_24h: number
    avg_ping: number
    last_check: string
  }>
  overall_status: 'operational' | 'degraded' | 'outage'
  timestamp: string
}

export function MonitoringDashboard() {
  const [healthData, setHealthData] = useState<HealthCheckData | null>(null)
  const [monitorData, setMonitorData] = useState<MonitorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchHealthData = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setHealthData(data)
    } catch (error) {
      console.error('Error fetching health data:', error)
    }
  }

  const fetchMonitorData = async () => {
    try {
      const response = await fetch('/api/monitoring')
      if (response.ok) {
        const data = await response.json()
        setMonitorData(data)
      }
    } catch (error) {
      console.error('Error fetching monitor data:', error)
    }
  }

  const refreshData = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchHealthData(), fetchMonitorData()])
    setLastUpdated(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    refreshData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, []) // refreshData is recreated on each render, which is intended

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'up':
        return 'text-green-600 bg-green-100'
      case 'degraded':
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'unhealthy':
      case 'outage':
      case 'down':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  const formatBytes = (bytes: number) => {
    return `${bytes} MB`
  }

  if (loading && !healthData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={refreshData}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      {healthData && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overall System Status</h3>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.status)}`}>
                  {healthData.status.charAt(0).toUpperCase() + healthData.status.slice(1)}
                </span>
                <span className="text-gray-600">
                  Response time: {healthData.responseTime}ms
                </span>
                <span className="text-gray-600">
                  Uptime: {formatUptime(healthData.uptime)}
                </span>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>Version: {healthData.version}</div>
              <div>Environment: {healthData.environment}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Service Status */}
      {healthData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(healthData.services).map(([service, data]) => (
            <Card key={service} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold capitalize">{service}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                  {data.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Response: {data.responseTime}ms</div>
                <div className="text-xs">{data.message}</div>
                {data.details && typeof data.details === 'object' && 'mode' in data.details && data.details.mode ? (
                  <div className="text-xs">
                    Mode: <span className="capitalize">{String(data.details.mode)}</span>
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* System Information */}
      {healthData && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Runtime</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Node.js: {healthData.system.nodeVersion}</div>
                <div>Platform: {healthData.system.platform}</div>
                <div>Architecture: {healthData.system.arch}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Memory Usage</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Used: {formatBytes(healthData.system.memory.used)}</div>
                <div>Total: {formatBytes(healthData.system.memory.total)}</div>
                <div>
                  Usage: {Math.round((healthData.system.memory.used / healthData.system.memory.total) * 100)}%
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Performance</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Uptime: {formatUptime(healthData.uptime)}</div>
                <div>Last check: {new Date(healthData.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* External Monitors */}
      {monitorData && monitorData.monitors.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">External Service Monitors</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-600">Overall Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(monitorData.overall_status)}`}>
                {monitorData.overall_status.charAt(0).toUpperCase() + monitorData.overall_status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monitorData.monitors.map((monitor) => (
                <div key={monitor.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{monitor.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(monitor.status)}`}>
                      {monitor.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>URL: {monitor.url}</div>
                    <div>Uptime: {monitor.uptime_24h.toFixed(1)}%</div>
                    <div>Avg Response: {monitor.avg_ping}ms</div>
                    <div>Last Check: {new Date(monitor.last_check).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
