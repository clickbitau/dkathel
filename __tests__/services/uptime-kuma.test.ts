import { UptimeKumaService } from '@/services/uptime-kuma'

describe('UptimeKumaService', () => {
  let uptimeKumaService: UptimeKumaService

  beforeEach(() => {
    uptimeKumaService = new UptimeKumaService()
  })

  it('should create UptimeKumaService instance', () => {
    expect(uptimeKumaService).toBeInstanceOf(UptimeKumaService)
  })

  it('should return mock monitors when not configured', async () => {
    const monitors = await uptimeKumaService.getMonitors()
    
    expect(Array.isArray(monitors)).toBe(true)
    expect(monitors.length).toBeGreaterThan(0)
    expect(monitors[0]).toHaveProperty('id')
    expect(monitors[0]).toHaveProperty('name')
    expect(monitors[0]).toHaveProperty('status')
  })

  it('should calculate overall status correctly', async () => {
    const status = await uptimeKumaService.getStatus()
    
    expect(status).toHaveProperty('monitors')
    expect(status).toHaveProperty('overall_status')
    expect(['operational', 'degraded', 'outage']).toContain(status.overall_status)
  })

  it('should test connection successfully in mock mode', async () => {
    const result = await uptimeKumaService.testConnection()
    expect(result).toBe(true)
  })
})
