/**
 * Role-Based Access Control (RBAC) utilities
 */

// Define role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  student: 1,
  faculty: 2,
  dept_admin: 3,
  admin: 4,
}

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  admin: [
    'users.view',
    'users.create',
    'users.update',
    'users.delete',
    'students.view',
    'students.create',
    'students.update',
    'students.delete',
    'faculty.view',
    'faculty.create',
    'faculty.update',
    'faculty.delete',
    'courses.view',
    'courses.create',
    'courses.update',
    'courses.delete',
    'departments.view',
    'departments.create',
    'departments.update',
    'departments.delete',
    'reports.view',
    'reports.generate',
    'audit.view',
    'settings.view',
    'settings.update',
  ],
  dept_admin: [
    'students.view',
    'students.create',
    'students.update',
    'faculty.view',
    'courses.view',
    'departments.view',
    'reports.view',
    'reports.generate',
  ],
  faculty: [
    'students.view',
    'courses.view',
    'reports.view',
    'grades.update',
    'attendance.update',
  ],
  student: [
    'profile.view',
    'profile.update',
    'courses.view',
    'grades.view',
    'attendance.view',
  ],
}

/**
 * Check if role has specific permission
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  const permissions = ROLE_PERMISSIONS[role] || []
  return permissions.includes(permission)
}

/**
 * Check if role has higher or equal hierarchy level
 * @param {string} role
 * @param {string} requiredRole
 * @returns {boolean}
 */
export function hasMinimumRole(role, requiredRole) {
  const roleLevel = ROLE_HIERARCHY[role] || 0
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0
  return roleLevel >= requiredLevel
}

/**
 * Get all permissions for a role
 * @param {string} role
 * @returns {Array<string>}
 */
export function getRolePermissions(role) {
  return ROLE_PERMISSIONS[role] || []
}

