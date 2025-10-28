import { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from './api'
import { 
  isAuthenticated as checkAuth, 
  getCurrentUser as getUser,
  clearAuthData,
  setAuthData 
} from './auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (checkAuth()) {
          const storedUser = getUser()
          
          if (storedUser) {
            // Set user immediately from localStorage
            setUser(storedUser)
            setIsAuthenticated(true)
            
            // Then verify token is still valid in the background
            try {
              const response = await apiClient.getCurrentUser()
              
              // Extract user from various possible response structures
              let apiUser = null
              if (response.data?.data) {
                // Laravel resource response: {success: true, data: {user data}}
                apiUser = response.data.data
              } else if (response.data?.user) {
                // Response with user property: {success: true, user: {user data}}
                apiUser = response.data.user
              } else if (response.data) {
                // Direct data: {success: true, data: user OR just data}
                apiUser = response.data
              } else if (response.user) {
                // Direct user property
                apiUser = response.user
              } else {
                // Response is the user itself
                apiUser = response
              }
              
              setUser(apiUser)
              setIsAuthenticated(true)
            } catch (error) {
              console.error('Token verification failed:', error)
              // If token verification fails, clear everything
              clearAuthData()
              setUser(null)
              setIsAuthenticated(false)
            }
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        clearAuthData()
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setIsLoading(true)
      const response = await apiClient.login(credentials)
      
      // Handle different possible response structures
      let userData = null
      let access_token = null
      
      // Check if response has data property (axios wraps it)
      if (response.data) {
        userData = response.data.user
        access_token = response.data.access_token
      } else {
        // Direct response
        userData = response.user
        access_token = response.access_token
      }
      
      if (!userData) {
        throw new Error('No user data in response')
      }
      
      // Store auth data (apiClient already did this, but we do it again to be sure)
      setAuthData(userData, access_token)
      
      // Update state
      setUser(userData)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error('Logout error in context:', error)
    } finally {
      clearAuthData()
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
    const token = localStorage.getItem('auth_token')
    if (token) {
      setAuthData(userData, token)
    }
  }

  const isAdmin = () => {
    return user && user.role === 'admin'
  }

  const isSuperAdmin = () => {
    return user && user.role === 'admin' && !user.department_id
  }

  const isDepartmentAdmin = () => {
    return user && user.role === 'admin' && user.department_id
  }

  const isFaculty = () => {
    return user && user.role === 'faculty'
  }

  const isStudent = () => {
    return user && user.role === 'student'
  }

  const hasRole = (role) => {
    return user && user.role === role
  }

  const canAccess = (allowedRoles) => {
    return user && allowedRoles.includes(user.role)
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    isAdmin,
    isSuperAdmin,
    isDepartmentAdmin,
    isFaculty,
    isStudent,
    hasRole,
    canAccess,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

