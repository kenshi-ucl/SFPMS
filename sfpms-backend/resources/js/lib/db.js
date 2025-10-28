/**
 * Database utilities and mock data structures
 * This file simulates database operations for development
 */

// Mock database for development
const mockDB = {
  users: [],
  students: [],
  faculty: [],
  courses: [],
  departments: [],
}

/**
 * Initialize mock database with sample data
 */
export function initMockDB() {
  // This would be replaced with actual API calls in production
  return mockDB
}

/**
 * Query builder helper for filtering data
 * @param {Array} data
 * @param {Object} filters
 * @returns {Array}
 */
export function queryFilter(data, filters) {
  return data.filter(item => {
    for (const [key, value] of Object.entries(filters)) {
      if (value === 'all' || value === '' || value === null) continue
      if (item[key] !== value) return false
    }
    return true
  })
}

/**
 * Search in data by multiple fields
 * @param {Array} data
 * @param {string} searchTerm
 * @param {Array<string>} fields
 * @returns {Array}
 */
export function searchData(data, searchTerm, fields) {
  if (!searchTerm || searchTerm.trim() === '') return data
  
  const term = searchTerm.toLowerCase()
  return data.filter(item =>
    fields.some(field => {
      const value = item[field]
      return value && value.toString().toLowerCase().includes(term)
    })
  )
}

/**
 * Sort data by field
 * @param {Array} data
 * @param {string} field
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array}
 */
export function sortData(data, field, direction = 'asc') {
  return [...data].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]
    
    if (aVal === bVal) return 0
    
    const comparison = aVal > bVal ? 1 : -1
    return direction === 'asc' ? comparison : -comparison
  })
}

/**
 * Paginate data
 * @param {Array} data
 * @param {number} page
 * @param {number} perPage
 * @returns {Object}
 */
export function paginateData(data, page = 1, perPage = 10) {
  const start = (page - 1) * perPage
  const end = start + perPage
  
  return {
    data: data.slice(start, end),
    current_page: page,
    per_page: perPage,
    total: data.length,
    last_page: Math.ceil(data.length / perPage),
    from: start + 1,
    to: Math.min(end, data.length),
  }
}

