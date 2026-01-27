import { useSession as useNextAuthSession } from 'next-auth/react'

/**
 * Safe wrapper for useSession that handles undefined during SSG/SSR prerendering.
 * This prevents "Cannot destructure property 'data' of undefined" errors.
 */
export function useSession() {
    const sessionResult = useNextAuthSession()

    // During SSG prerendering, useSession may return undefined
    // This provides a safe fallback
    if (!sessionResult) {
        return {
            data: null,
            status: 'loading' as const,
            update: async () => null,
        }
    }

    return sessionResult
}
