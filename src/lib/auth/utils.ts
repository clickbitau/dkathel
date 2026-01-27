import { getServerSession } from 'next-auth'
import { authOptions } from './config'
import type { AuthUser } from '@/types/auth'

/**
 * Get the current session on the server side
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions)
  return session?.user as AuthUser || null
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

/**
 * Require admin authentication - throws error if not admin
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return user
}

// TODO: These functions will be implemented when the backend is ready
export async function hashPassword(password: string): Promise<string> {
  // Placeholder - will use bcrypt when backend is ready
  return password
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Placeholder - will use bcrypt when backend is ready
  return password === hash
}

export async function createUser(_userData: {
  email: string
  password: string
  name: string
  role?: 'admin' | 'user'
}): Promise<AuthUser> {
  // Placeholder - will create real user when backend is ready
  throw new Error('User creation not implemented yet - backend integration pending')
}