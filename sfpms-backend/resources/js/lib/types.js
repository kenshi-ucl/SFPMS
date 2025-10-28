// Type definitions converted to JSDoc comments for better IDE support

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} role - 'admin' | 'faculty' | 'student'
 * @property {string} [employee_id]
 * @property {string} [student_id]
 * @property {string} [phone]
 * @property {string} [address]
 * @property {string} [date_of_birth]
 * @property {number} [department_id]
 * @property {string} status - 'active' | 'inactive' | 'suspended'
 * @property {string} [created_at]
 * @property {string} [updated_at]
 * @property {string} [joined_at]
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} access_token
 * @property {string} token_type
 * @property {number} expires_in
 * @property {User} user
 */

/**
 * @typedef {Object} ApiResponse
 * @property {any} data
 * @property {string} [message]
 * @property {boolean} [success]
 */

export {}

