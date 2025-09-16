'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { apiClient, User, LoginRequest, RegisterRequest } from './api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  isAdmin: () => boolean
  isFaculty: () => boolean
  isStudent: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize authentication state
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        apiClient.setToken(token)
        const userData = await apiClient.getCurrentUser()
        setUser(userData)
      }
    } catch (error) {
      // Token is invalid or expired
      apiClient.setToken(null)
      localStorage.removeItem('auth_token')
      console.error('Failed to initialize auth:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      const authData = await apiClient.login(credentials)
      setUser(authData.user)
      toast.success('Login successful!')
      
      // Redirect based on role
      if (authData.user.role === 'admin') {
        router.push('/dashboard')
      } else if (authData.user.role === 'faculty') {
        router.push('/faculty-portal')
      } else {
        router.push('/student-portal')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true)
      const authData = await apiClient.register(userData)
      setUser(authData.user)
      toast.success('Registration successful!')
      
      // Redirect to appropriate dashboard
      if (authData.user.role === 'admin') {
        router.push('/dashboard')
      } else if (authData.user.role === 'faculty') {
        router.push('/faculty-portal')
      } else {
        router.push('/student-portal')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
      setUser(null)
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed'
      toast.error(message)
      
      // Force logout on frontend even if API call fails
      setUser(null)
      apiClient.setToken(null)
      router.push('/login')
    }
  }

  const refreshUser = async () => {
    try {
      const userData = await apiClient.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      // If refresh fails, logout the user
      await logout()
    }
  }

  const isAdmin = () => user?.role === 'admin'
  const isFaculty = () => user?.role === 'faculty'
  const isStudent = () => user?.role === 'student'

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    isAdmin,
    isFaculty,
    isStudent,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protecting routes
interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'faculty' | 'student'
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        toast.error('Access denied. Insufficient permissions.')
        
        // Redirect to appropriate dashboard based on user role
        if (user?.role === 'admin') {
          router.push('/dashboard')
        } else if (user?.role === 'faculty') {
          router.push('/faculty-portal')
        } else {
          router.push('/student-portal')
        }
        return
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, redirectTo, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}

// Custom hook for role-based permissions
export function usePermissions() {
  const { user } = useAuth()

  const can = (permission: string) => {
    if (!user) return false

    switch (permission) {
      case 'manage_users':
      case 'manage_faculty':
      case 'manage_students':
      case 'view_all_users':
      case 'manage_system':
        return user.role === 'admin'
      
      case 'manage_courses':
      case 'view_students':
      case 'grade_students':
        return user.role === 'admin' || user.role === 'faculty'
      
      case 'view_grades':
      case 'view_schedule':
      case 'view_profile':
        return true // All authenticated users
      
      case 'edit_own_profile':
        return true // All authenticated users can edit their own profile
      
      default:
        return false
    }
  }

  const canAccessRoute = (route: string) => {
    if (!user) return false

    const adminRoutes = ['/dashboard', '/users-management', '/system-settings']
    const facultyRoutes = ['/faculty-portal', '/my-students', '/faculty-courses']
    const studentRoutes = ['/student-portal', '/my-grades', '/student-schedule']

    if (adminRoutes.some(adminRoute => route.startsWith(adminRoute))) {
      return user.role === 'admin'
    }

    if (facultyRoutes.some(facultyRoute => route.startsWith(facultyRoute))) {
      return user.role === 'admin' || user.role === 'faculty'
    }

    if (studentRoutes.some(studentRoute => route.startsWith(studentRoute))) {
      return true // All authenticated users can access student routes
    }

    return true // Allow access to common routes
  }

  return { can, canAccessRoute }
}
