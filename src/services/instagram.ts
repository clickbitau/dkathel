interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  caption: string
  timestamp: string
  permalink: string
}

interface InstagramResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

export class InstagramService {
  private accessToken: string
  private baseUrl = 'https://graph.instagram.com'

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || ''
    
    if (!this.accessToken) {
      console.warn('Instagram access token not configured')
    }
  }

  async getRecentPosts(limit: number = 12): Promise<InstagramPost[]> {
    if (!this.accessToken || this.accessToken === 'placeholder-token') {
      console.log('Instagram service: Using mock data (no real token configured)')
      return this.getMockPosts(limit)
    }

    try {
      const fields = 'id,media_type,media_url,caption,timestamp,permalink'
      const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${this.accessToken}`
      
      const response = await fetch(url)
      const data: InstagramResponse = await response.json()
      
      if (!response.ok) {
        throw new Error(`Instagram API error: ${JSON.stringify(data)}`)
      }

      return data.data || []
    } catch (error) {
      console.error('Error fetching Instagram posts:', error)
      return this.getMockPosts(limit)
    }
  }

  private getMockPosts(limit: number): InstagramPost[] {
    return Array.from({ length: Math.min(limit, 6) }, (_, i) => ({
      id: `mock_${i}`,
      media_type: 'IMAGE' as const,
      media_url: `https://picsum.photos/400/400?random=${i}`,
      caption: `Mock Instagram post ${i + 1} for development`,
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      permalink: `https://instagram.com/p/mock${i}`
    }))
  }
}

export const instagramService = new InstagramService()
