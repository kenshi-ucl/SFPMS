import axios from 'axios'

const API_BASE_URL = process.env.MIX_API_BASE_URL || 'http://localhost:8000/api'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
})

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        window.location.href = '/'
      }
      
      // Extract error message
      const message = error.response.data?.message || 
                     error.response.data?.error ||
                     'An error occurred'
      
      throw new Error(message)
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.')
    } else {
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
)

// API Client Class
export class ApiClient {
  // Authentication endpoints
  async login(credentials) {
    try {
      const response = await axiosInstance.post('/auth/login', credentials)
      const { access_token, user } = response.data
      
      // Store token and user data
      localStorage.setItem('auth_token', access_token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout() {
    try {
      await axiosInstance.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get('/auth/me')
      return response.data
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  }

  async refreshToken() {
    try {
      const response = await axiosInstance.post('/auth/refresh')
      const { access_token } = response.data
      localStorage.setItem('auth_token', access_token)
      return response.data
    } catch (error) {
      console.error('Refresh token error:', error)
      throw error
    }
  }

  // User management endpoints
  async getUsers(params = {}) {
    try {
      const response = await axiosInstance.get('/users', { params })
      return response.data
    } catch (error) {
      console.error('Get users error:', error)
      throw error
    }
  }

  async createUser(userData) {
    try {
      const response = await axiosInstance.post('/users', userData)
      return response.data
    } catch (error) {
      console.error('Create user error:', error)
      throw error
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Delete user error:', error)
      throw error
    }
  }

  async toggleUserStatus(userId) {
    try {
      const response = await axiosInstance.patch(`/users/${userId}/toggle-status`)
      return response.data
    } catch (error) {
      console.error('Toggle user status error:', error)
      throw error
    }
  }

  async getUsersByRole(role) {
    try {
      const response = await axiosInstance.get(`/users/role/${role}`)
      return response.data
    } catch (error) {
      console.error('Get users by role error:', error)
      throw error
    }
  }

  // Generic entity endpoints
  async getEntity(entity, params = {}) {
    try {
      const response = await axiosInstance.get(`/${entity}`, { params })
      return response.data
    } catch (error) {
      console.error(`Get ${entity} error:`, error)
      throw error
    }
  }

  async createEntity(entity, data) {
    try {
      const response = await axiosInstance.post(`/${entity}`, data)
      return response.data
    } catch (error) {
      console.error(`Create ${entity} error:`, error)
      throw error
    }
  }

  async updateEntity(entity, id, data) {
    try {
      const response = await axiosInstance.put(`/${entity}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Update ${entity} error:`, error)
      throw error
    }
  }

  async deleteEntity(entity, id) {
    try {
      const response = await axiosInstance.delete(`/${entity}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Delete ${entity} error:`, error)
      throw error
    }
  }

  // Notifications endpoints
  async getNotifications(params = {}) {
    try {
      const response = await axiosInstance.get('/notifications', { params })
      return response.data
    } catch (error) {
      console.error('Get notifications error:', error)
      throw error
    }
  }

  async markNotificationRead(notificationId) {
    try {
      const response = await axiosInstance.patch(`/notifications/${notificationId}/read`)
      return response.data
    } catch (error) {
      console.error('Mark notification read error:', error)
      throw error
    }
  }

  // Reports endpoints
  async generateReport(reportType, params = {}) {
    try {
      const response = await axiosInstance.post('/reports/generate', {
        type: reportType,
        ...params
      })
      return response.data
    } catch (error) {
      console.error('Generate report error:', error)
      throw error
    }
  }

  async getReports(params = {}) {
    try {
      const response = await axiosInstance.get('/reports', { params })
      return response.data
    } catch (error) {
      console.error('Get reports error:', error)
      throw error
    }
  }

  // Department management endpoints
  async getDepartments(params = {}) {
    try {
      const response = await axiosInstance.get('/departments', { params })
      return response.data
    } catch (error) {
      console.error('Get departments error:', error)
      throw error
    }
  }

  async createDepartment(departmentData) {
    try {
      const response = await axiosInstance.post('/departments', departmentData)
      return response.data
    } catch (error) {
      console.error('Create department error:', error)
      throw error
    }
  }

  async updateDepartment(departmentId, departmentData) {
    try {
      const response = await axiosInstance.put(`/departments/${departmentId}`, departmentData)
      return response.data
    } catch (error) {
      console.error('Update department error:', error)
      throw error
    }
  }

  async deleteDepartment(departmentId) {
    try {
      const response = await axiosInstance.delete(`/departments/${departmentId}`)
      return response.data
    } catch (error) {
      console.error('Delete department error:', error)
      throw error
    }
  }

  async getDepartment(departmentId) {
    try {
      const response = await axiosInstance.get(`/departments/${departmentId}`)
      return response.data
    } catch (error) {
      console.error('Get department error:', error)
      throw error
    }
  }

  // Course management endpoints
  async getCourses(params = {}) {
    try {
      const response = await axiosInstance.get('/courses', { params })
      return response.data
    } catch (error) {
      console.error('Get courses error:', error)
      throw error
    }
  }

  async createCourse(courseData) {
    try {
      const response = await axiosInstance.post('/courses', courseData)
      return response.data
    } catch (error) {
      console.error('Create course error:', error)
      throw error
    }
  }

  async updateCourse(courseId, courseData) {
    try {
      const response = await axiosInstance.put(`/courses/${courseId}`, courseData)
      return response.data
    } catch (error) {
      console.error('Update course error:', error)
      throw error
    }
  }

  async deleteCourse(courseId) {
    try {
      const response = await axiosInstance.delete(`/courses/${courseId}`)
      return response.data
    } catch (error) {
      console.error('Delete course error:', error)
      throw error
    }
  }

  async getCourse(courseId) {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`)
      return response.data
    } catch (error) {
      console.error('Get course error:', error)
      throw error
    }
  }

  async getCoursesByDepartment(departmentId) {
    try {
      const response = await axiosInstance.get(`/courses/department/${departmentId}`)
      return response.data
    } catch (error) {
      console.error('Get courses by department error:', error)
      throw error
    }
  }

  // Dashboard endpoints
  async getDashboardData() {
    try {
      const response = await axiosInstance.get('/dashboard')
      return response.data
    } catch (error) {
      console.error('Get dashboard data error:', error)
      throw error
    }
  }

  async getDashboardStatistics() {
    try {
      const response = await axiosInstance.get('/dashboard/statistics')
      return response.data
    } catch (error) {
      console.error('Get dashboard statistics error:', error)
      throw error
    }
  }

  async getEnrollmentTrends() {
    try {
      const response = await axiosInstance.get('/dashboard/enrollment-trends')
      return response.data
    } catch (error) {
      console.error('Get enrollment trends error:', error)
      throw error
    }
  }

  async getStudentDistribution() {
    try {
      const response = await axiosInstance.get('/dashboard/student-distribution')
      return response.data
    } catch (error) {
      console.error('Get student distribution error:', error)
      throw error
    }
  }

  async getDepartmentStatistics() {
    try {
      const response = await axiosInstance.get('/dashboard/department-statistics')
      return response.data
    } catch (error) {
      console.error('Get department statistics error:', error)
      throw error
    }
  }

  async getRecentActivities() {
    try {
      const response = await axiosInstance.get('/dashboard/recent-activities')
      return response.data
    } catch (error) {
      console.error('Get recent activities error:', error)
      throw error
    }
  }

  // Profile management endpoints
  async getProfiles(params = {}) {
    try {
      const response = await axiosInstance.get('/profiles', { params })
      return response.data
    } catch (error) {
      console.error('Get profiles error:', error)
      throw error
    }
  }

  async getProfile(id) {
    try {
      const response = await axiosInstance.get(`/profiles/${id}`)
      return response.data
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  async getProfileByUserId(userId) {
    try {
      const response = await axiosInstance.get(`/profiles/user/${userId}`)
      return response.data
    } catch (error) {
      console.error('Get profile by user ID error:', error)
      throw error
    }
  }

  async createProfile(profileData) {
    try {
      const response = await axiosInstance.post('/profiles', profileData)
      return response.data
    } catch (error) {
      console.error('Create profile error:', error)
      throw error
    }
  }

  async updateProfile(id, profileData) {
    try {
      const response = await axiosInstance.put(`/profiles/${id}`, profileData)
      return response.data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  async submitProfile(id) {
    try {
      const response = await axiosInstance.post(`/profiles/${id}/submit`)
      return response.data
    } catch (error) {
      console.error('Submit profile error:', error)
      throw error
    }
  }

  async approveProfile(id) {
    try {
      const response = await axiosInstance.post(`/profiles/${id}/approve`)
      return response.data
    } catch (error) {
      console.error('Approve profile error:', error)
      throw error
    }
  }

  async rejectProfile(id) {
    try {
      const response = await axiosInstance.post(`/profiles/${id}/reject`)
      return response.data
    } catch (error) {
      console.error('Reject profile error:', error)
      throw error
    }
  }

  async deleteProfile(id) {
    try {
      const response = await axiosInstance.delete(`/profiles/${id}`)
      return response.data
    } catch (error) {
      console.error('Delete profile error:', error)
      throw error
    }
  }

  async getProfileStatistics() {
    try {
      const response = await axiosInstance.get('/profiles/statistics')
      return response.data
    } catch (error) {
      console.error('Get profile statistics error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export axios instance for custom requests
export { axiosInstance }

