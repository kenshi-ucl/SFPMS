import { apiClient } from './api'

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const token = localStorage.getItem('auth_token')
  return !!token
}

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export function getCurrentUser() {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

/**
 * Get auth token
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem('auth_token')
}

/**
 * Store user data and token
 * @param {Object} userData
 * @param {string} token
 */
export function setAuthData(userData, token) {
  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('auth_token', token)
}

/**
 * Clear auth data
 */
export function clearAuthData() {
  localStorage.removeItem('user')
  localStorage.removeItem('auth_token')
}

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>}
 */
export async function login(credentials) {
  try {
    const response = await apiClient.login(credentials)
    return response
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

/**
 * Logout user
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await apiClient.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    clearAuthData()
    window.location.href = '/'
  }
}

/**
 * Refresh auth token
 * @returns {Promise<Object>}
 */
export async function refreshToken() {
  try {
    const response = await apiClient.refreshToken()
    return response
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw error
  }
}

/**
 * Check if user has specific role
 * @param {string} role
 * @returns {boolean}
 */
export function hasRole(role) {
  const user = getCurrentUser()
  return user && user.role === role
}

/**
 * Check if user is admin
 * @returns {boolean}
 */
export function isAdmin() {
  return hasRole('admin')
}

/**
 * Check if user is faculty
 * @returns {boolean}
 */
export function isFaculty() {
  return hasRole('faculty')
}

/**
 * Check if user is student
 * @returns {boolean}
 */
export function isStudent() {
  return hasRole('student')
}

/**
 * Check if user can access resource
 * @param {Array<string>} allowedRoles
 * @returns {boolean}
 */
export function canAccess(allowedRoles) {
  const user = getCurrentUser()
  if (!user) return false
  return allowedRoles.includes(user.role)
}

