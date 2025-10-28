/**
 * Security utilities for the application
 */

/**
 * Sanitize user input to prevent XSS
 * @param {string} input
 * @returns {string}
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {Object}
 */
export function validatePassword(password) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const isValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
  
  return {
    isValid,
    errors: [
      password.length < minLength && `Password must be at least ${minLength} characters`,
      !hasUpperCase && 'Password must contain at least one uppercase letter',
      !hasLowerCase && 'Password must contain at least one lowercase letter',
      !hasNumbers && 'Password must contain at least one number',
    ].filter(Boolean)
  }
}

/**
 * Generate CSRF token for forms
 * @returns {string|null}
 */
export function getCsrfToken() {
  const tokenMeta = document.querySelector('meta[name="csrf-token"]')
  return tokenMeta ? tokenMeta.getAttribute('content') : null
}

