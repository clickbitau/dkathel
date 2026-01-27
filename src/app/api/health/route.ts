import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { emailService } from '@/services/email'
import { instagramService } from '@/services/instagram'
import { uptimeKumaService } from '@/services/uptime-kuma'

interface HealthCheck {
  service: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime?: number
  message?: string
  details?: Record<string, unknown>
}

async function checkDatabase(): Promise<HealthCheck> {
  const startTime = Date.now()

  try {
    const client = getSupabaseClient(true)
    const { error } = await client.from('certifications').select('id').limit(1)
    const responseTime = Date.now() - startTime

    if (error) {
      return {
        service: 'database',
        status: 'unhealthy',
        responseTime,
        message: 'Database query failed',
        details: { error: error.message },
      }
    }

    return {
      service: 'database',
      status: 'healthy',
      responseTime,
      message: 'Supabase connection successful',
    }
  } catch (error) {
    return {
      service: 'database',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      message: 'Database connection failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
    }
  }
}

async function checkEmailService(): Promise<HealthCheck> {
  const startTime = Date.now()

  try {
    const canConnect = await emailService.testConnection()
    const responseTime = Date.now() - startTime

    return {
      service: 'email',
      status: canConnect ? 'healthy' : 'degraded',
      responseTime,
      message: canConnect ? 'Email service operational' : 'Email service in mock mode',
      details: {
        configured: canConnect,
        mode: canConnect ? 'production' : 'mock',
      },
    }
  } catch (error) {
    return {
      service: 'email',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      message: 'Email service check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
    }
  }
}

async function checkInstagramService(): Promise<HealthCheck> {
  const startTime = Date.now()

  try {
    const posts = await instagramService.getRecentPosts(1)
    const responseTime = Date.now() - startTime

    const isConfigured =
      process.env.INSTAGRAM_ACCESS_TOKEN &&
      process.env.INSTAGRAM_ACCESS_TOKEN !== 'placeholder-token'

    return {
      service: 'instagram',
      status: posts.length > 0 ? 'healthy' : 'degraded',
      responseTime,
      message: isConfigured ? 'Instagram API operational' : 'Instagram service in mock mode',
      details: {
        configured: isConfigured,
        mode: isConfigured ? 'production' : 'mock',
        postsCount: posts.length,
      },
    }
  } catch (error) {
    return {
      service: 'instagram',
      status: 'degraded',
      responseTime: Date.now() - startTime,
      message: 'Instagram service using fallback',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
    }
  }
}

async function checkMonitoringService(): Promise<HealthCheck> {
  const startTime = Date.now()

  try {
    const canConnect = await uptimeKumaService.testConnection()
    const responseTime = Date.now() - startTime

    const isConfigured =
      process.env.UPTIME_KUMA_API_URL &&
      process.env.UPTIME_KUMA_API_URL !== 'http://localhost:3001/api'

    return {
      service: 'monitoring',
      status: canConnect && isConfigured ? 'healthy' : 'degraded',
      responseTime,
      message: isConfigured ? 'Monitoring service operational' : 'Monitoring service in mock mode',
      details: {
        configured: isConfigured,
        mode: isConfigured ? 'production' : 'mock',
        connected: canConnect,
      },
    }
  } catch (error) {
    return {
      service: 'monitoring',
      status: 'degraded',
      responseTime: Date.now() - startTime,
      message: 'Monitoring service using fallback',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
    }
  }
}

function calculateOverallStatus(checks: HealthCheck[]): 'healthy' | 'degraded' | 'unhealthy' {
  const unhealthyCount = checks.filter((check) => check.status === 'unhealthy').length
  const degradedCount = checks.filter((check) => check.status === 'degraded').length

  if (unhealthyCount > 0) {
    return 'unhealthy'
  } else if (degradedCount > 0) {
    return 'degraded'
  }

  return 'healthy'
}

export async function GET() {
  const startTime = Date.now()

  try {
    // Run all health checks in parallel
    const [database, email, instagram, monitoring] = await Promise.all([
      checkDatabase(),
      checkEmailService(),
      checkInstagramService(),
      checkMonitoringService(),
    ])

    const checks = [database, email, instagram, monitoring]
    const overallStatus = calculateOverallStatus(checks)
    const totalResponseTime = Date.now() - startTime

    const response = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: totalResponseTime,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: checks.reduce(
        (acc, check) => {
          acc[check.service] = {
            status: check.status,
            responseTime: check.responseTime,
            message: check.message,
            details: check.details,
          }
          return acc
        },
        {} as Record<string, unknown>
      ),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        },
      },
    }

    // Set appropriate status code
    const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503

    return NextResponse.json(response, { status: statusCode })
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        error: 'Health check system failure',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}
