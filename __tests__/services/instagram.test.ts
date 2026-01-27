import { InstagramService } from '@/services/instagram'

describe('InstagramService', () => {
  let instagramService: InstagramService

  beforeEach(() => {
    instagramService = new InstagramService()
  })

  it('should create InstagramService instance', () => {
    expect(instagramService).toBeInstanceOf(InstagramService)
  })

  it('should return mock posts when no token configured', async () => {
    const posts = await instagramService.getRecentPosts(6)
    
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeLessThanOrEqual(6)
    
    if (posts.length > 0) {
      expect(posts[0]).toHaveProperty('id')
      expect(posts[0]).toHaveProperty('media_type')
      expect(posts[0]).toHaveProperty('media_url')
      expect(posts[0]).toHaveProperty('caption')
    }
  })

  it('should limit number of posts returned', async () => {
    const posts = await instagramService.getRecentPosts(3)
    expect(posts.length).toBeLessThanOrEqual(3)
  })

  it('should handle different limit values', async () => {
    const postsSmall = await instagramService.getRecentPosts(1)
    const postsLarge = await instagramService.getRecentPosts(10)
    
    expect(postsSmall.length).toBeLessThanOrEqual(1)
    expect(postsLarge.length).toBeLessThanOrEqual(10)
  })
})
