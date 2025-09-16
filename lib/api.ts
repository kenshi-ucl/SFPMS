import { toast } from 'sonner'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

// Types for API responses
interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: 'admin' | 'faculty' | 'student'
  employee_id?: string
  student_id?: string
  phone?: string
  address?: string
  date_of_birth?: string
  department_id?: number
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  employee_id?: string
  student_id?: string
  phone?: string
  address?: string
  date_of_birth?: string
  department_id?: number
  joined_at?: string
  created_at: string
  updated_at: string
}

interface AuthResponse {
  user: User
  access_token: string
  token_type: string
  expires_in: number
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
    this.token = this.getStoredToken()
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private setStoredToken(token: string | null): void {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  public setToken(token: string | null): void {
    this.token = token
    this.setStoredToken(token)
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      // Handle token expiration
      if (response.status === 401 && data.message?.includes('expired')) {
        this.setToken(null)
        toast.error('Session expired. Please login again.')
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.success && response.data) {
      this.setToken(response.data.access_token)
      return response.data
    }
    
    throw new Error(response.message || 'Login failed')
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.success && response.data) {
      this.setToken(response.data.access_token)
      return response.data
    }
    
    throw new Error(response.message || 'Registration failed')
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error)
    } finally {
      this.setToken(null)
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.makeRequest<User>('/auth/me')
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to get user data')
  }

  async refreshToken(): Promise<string> {
    const response = await this.makeRequest<AuthResponse>('/auth/refresh', {
      method: 'POST',
    })
    
    if (response.success && response.data) {
      this.setToken(response.data.access_token)
      return response.data.access_token
    }
    
    throw new Error(response.message || 'Token refresh failed')
  }

  // User management endpoints (Admin only)
  async getUsers(params?: {
    page?: number
    per_page?: number
    role?: string
    status?: string
    search?: string
  }): Promise<{ data: User[], total: number, current_page: number, last_page: number }> {
    const queryString = params ? new URLSearchParams(params as any).toString() : ''
    const endpoint = `/users${queryString ? `?${queryString}` : ''}`
    
    const response = await this.makeRequest(endpoint)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to fetch users')
  }

  async createUser(userData: Omit<RegisterRequest, 'password_confirmation'>): Promise<User> {
    const response = await this.makeRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to create user')
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await this.makeRequest<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to update user')
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.makeRequest(`/users/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete user')
    }
  }

  async toggleUserStatus(id: number): Promise<User> {
    const response = await this.makeRequest<User>(`/users/${id}/toggle-status`, {
      method: 'PATCH',
    })
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to toggle user status')
  }

  async getUsersByRole(role: string, params?: { 
    page?: number
    per_page?: number
    search?: string 
  }): Promise<{ data: User[], total: number, current_page: number, last_page: number }> {
    const queryString = params ? new URLSearchParams(params as any).toString() : ''
    const endpoint = `/users/role/${role}${queryString ? `?${queryString}` : ''}`
    
    const response = await this.makeRequest(endpoint)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || `Failed to fetch ${role} users`)
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/health')
      return response.success
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export types
export type { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse }
