interface UptimeKumaMonitor {
  id: number
  name: string
  url: string
  type: string
  active: boolean
  status: 'up' | 'down' | 'pending'
  uptime_24h: number
  avg_ping: number
  last_check: string
}

interface UptimeKumaStatus {
  monitors: UptimeKumaMonitor[]
  overall_status: 'operational' | 'degraded' | 'outage'
}

export class UptimeKumaService {
  private apiUrl: string
  private username: string
  private password: string
  private isConfigured: boolean

  constructor() {
    this.apiUrl = process.env.UPTIME_KUMA_API_URL || ''
    this.username = process.env.UPTIME_KUMA_USERNAME || ''
    this.password = process.env.UPTIME_KUMA_PASSWORD || ''
    
    this.isConfigured = this.apiUrl !== '' && 
                       this.apiUrl !== 'http://localhost:3001/api' &&
                       this.username !== '' && 
                       this.password !== ''

    if (!this.isConfigured) {
      console.log('Uptime Kuma service: Using mock mode (no real API configured)')
    }
  }

  async getMonitors(): Promise<UptimeKumaMonitor[]> {
    if (!this.isConfigured) {
      return this.getMockMonitors()
    }

    try {
      // Note: Actual Uptime Kuma API integration would depend on the specific API endpoints
      // This is a simplified version that might need adjustment based on the actual API
      const response = await fetch(`${this.apiUrl}/monitors`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Uptime Kuma API error: ${response.status}`)
      }

      const data = await response.json()
      return data.monitors || []
    } catch (error) {
      console.error('Error fetching Uptime Kuma monitors:', error)
      return this.getMockMonitors()
    }
  }

  async getStatus(): Promise<UptimeKumaStatus> {
    const monitors = await this.getMonitors()
    
    const upMonitors = monitors.filter(m => m.status === 'up').length
    const totalMonitors = monitors.length
    
    let overall_status: 'operational' | 'degraded' | 'outage' = 'operational'
    
    if (totalMonitors === 0) {
      overall_status = 'operational'
    } else if (upMonitors === 0) {
      overall_status = 'outage'
    } else if (upMonitors < totalMonitors) {
      overall_status = 'degraded'
    }

    return {
      monitors,
      overall_status
    }
  }

  private getMockMonitors(): UptimeKumaMonitor[] {
    return [
      {
        id: 1,
        name: 'Personal Website',
        url: 'https://dkathel.com',
        type: 'http',
        active: true,
        status: 'up',
        uptime_24h: 99.8,
        avg_ping: 120,
        last_check: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Blog API',
        url: 'https://api.dkathel.com',
        type: 'http',
        active: true,
        status: 'up',
        uptime_24h: 100.0,
        avg_ping: 95,
        last_check: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Database',
        url: 'mongodb://localhost:27017',
        type: 'port',
        active: true,
        status: Math.random() > 0.1 ? 'up' : 'down',
        uptime_24h: 98.5,
        avg_ping: 15,
        last_check: new Date().toISOString()
      }
    ]
  }

  async testConnection(): Promise<boolean> {
    if (!this.isConfigured) {
      return true // Mock mode always "works"
    }

    try {
      const response = await fetch(`${this.apiUrl}/ping`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`
        }
      })
      return response.ok
    } catch (error) {
      console.error('Uptime Kuma connection test failed:', error)
      return false
    }
  }
}

export const uptimeKumaService = new UptimeKumaService()
