# External Service Integrations

This document outlines all external service integrations implemented for the portfolio website.

## 🎯 Implemented Services

### 1. Instagram Feed Integration
**Location**: `src/services/instagram.ts` | `src/components/social/instagram-feed.tsx`

- **Features**:
  - Fetches recent posts via Instagram Graph API
  - Mock data support for development
  - Error handling with graceful fallbacks
  - Responsive grid layout with hover effects

- **API Endpoint**: `GET /api/social/instagram`
- **Component**: `<InstagramFeed maxPosts={6} />`

```typescript
// Usage in components
import { InstagramFeed } from '@/components/social/instagram-feed'

<InstagramFeed maxPosts={6} />
```

### 2. Contact System & Email Integration  
**Location**: `src/services/email.ts` | `src/components/contact/contact-form.tsx`

- **Features**:
  - SMTP email sending via Nodemailer
  - Form validation with Zod schemas
  - Mock mode for development
  - Success/error state handling

- **API Endpoint**: `POST /api/contact`
- **Component**: `<ContactForm />`

```typescript
// Contact form data structure
{
  name: string
  email: string  
  subject: string
  message: string
}
```

### 3. Service Monitoring (Uptime Kuma)
**Location**: `src/services/uptime-kuma.ts` | `src/components/admin/monitoring-dashboard.tsx`

- **Features**:
  - Service status monitoring
  - Uptime percentage tracking
  - Average response time metrics
  - Real-time status updates

- **API Endpoint**: `GET /api/monitoring` (Admin only)
- **Component**: `<MonitoringDashboard />`

### 4. System Health Monitoring
**Location**: `src/app/api/health/route.ts`

- **Features**:
  - Overall system health status
  - Individual service health checks
  - Uptime and version information
  - JSON response format

- **API Endpoint**: `GET /api/health`

## 🔧 Configuration

### Environment Variables (.env.local)

```bash
# Instagram API
INSTAGRAM_ACCESS_TOKEN=your-instagram-token

# Email SMTP Configuration  
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@dkathel.com

# Uptime Kuma API
UPTIME_KUMA_API_URL=http://your-uptime-kuma-url/api
UPTIME_KUMA_USERNAME=admin
UPTIME_KUMA_PASSWORD=password

# Social Media
TWITTER_API_KEY=your-twitter-key
LINKEDIN_CLIENT_ID=your-linkedin-id
```

### Service Configuration Status

All services are designed to work in **mock mode** when not properly configured:

- **Instagram**: Returns placeholder images from Picsum
- **Email**: Logs messages to console instead of sending
- **Uptime Kuma**: Shows mock service status data

## 📱 Components

### Instagram Feed Component
```typescript
interface InstagramFeedProps {
  maxPosts?: number // Default: 6
}

<InstagramFeed maxPosts={6} />
```

### Contact Form Component
```typescript
<ContactForm />
// Handles all form state and API calls internally
```

### Monitoring Dashboard Component
```typescript
<MonitoringDashboard />
// Admin-only component with auto-refresh
```

## 🚀 API Routes

### Instagram API
```http
GET /api/social/instagram
Response: {
  posts: InstagramPost[],
  cached: boolean,
  timestamp: string
}
```

### Contact API
```http
POST /api/contact
Body: { name, email, subject, message }
Response: { message: string, timestamp: string }
```

### Monitoring API
```http
GET /api/monitoring
Headers: Authorization required (admin)
Response: {
  monitors: Monitor[],
  overall_status: 'operational' | 'degraded' | 'outage',
  timestamp: string
}
```

### Health Check API
```http
GET /api/health
Response: {
  status: 'healthy' | 'degraded' | 'unhealthy',
  services: {
    email: { status, configured },
    instagram: { status, configured },
    monitoring: { status, configured }
  },
  timestamp: string,
  uptime: number,
  version: string
}
```

## 🧪 Testing

### Unit Tests
- **Location**: `src/__tests__/integrations.test.ts`
- **Coverage**: All service classes and core functionality
- **Run**: `npm test`

### Integration Tests
- **Location**: `src/__tests__/integrations.test.ts` 
- **Coverage**: API endpoints and service interactions
- **Run**: `npm test -- --testPathPatterns=integrations`

### Manual Testing
- **Demo Page**: Visit `/demo` to test all integrations
- **Health Check**: Visit `/api/health` for system status

## 🔒 Security Features

1. **Input Validation**: All user inputs validated with Zod schemas
2. **Rate Limiting**: Can be added via middleware 
3. **Authentication**: Admin routes protected with NextAuth
4. **Error Handling**: No sensitive data exposed in error responses
5. **CORS**: Configured for production domains only

## 🔄 Mock Mode vs Production

### Mock Mode (Development)
- Instagram: Placeholder images
- Email: Console logging only
- Monitoring: Static mock data
- Perfect for development and testing

### Production Mode
- Instagram: Real API calls to Instagram Graph API
- Email: Actual SMTP email sending
- Monitoring: Live Uptime Kuma integration
- Requires proper API keys and configuration

## 🎨 UI Components

All components are built with:
- **Tailwind CSS**: Responsive styling
- **Radix UI**: Accessible primitives  
- **Framer Motion**: Animations (where applicable)
- **TypeScript**: Full type safety

### Component Dependencies
```typescript
// UI Components created
- Card, CardHeader, CardTitle, CardContent
- Button (multiple variants)
- Input (with proper validation styling)
```

## 🚀 Deployment Checklist

1. **Environment Variables**: Set all production API keys
2. **Instagram**: Configure Instagram Developer App
3. **Email**: Set up SMTP credentials (Gmail App Password recommended)
4. **Uptime Kuma**: Deploy monitoring service
5. **DNS**: Configure proper domain for callbacks
6. **Testing**: Verify all integrations in production

## 📚 Future Enhancements

1. **Social Media**: Add Twitter/LinkedIn integration
2. **Analytics**: Track form submissions and Instagram engagement
3. **Caching**: Add Redis for API response caching
4. **Webhooks**: Real-time Instagram post notifications
5. **Admin Panel**: Full admin dashboard for content management

---

**Status**: ✅ All integrations implemented and tested  
**Last Updated**: $(date)  
**Developer**: Developer C - External Services & Infrastructure
