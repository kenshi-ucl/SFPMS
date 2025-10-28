/**
 * Entity Relationship Diagram data structures
 * Defines the database schema and relationships for the application
 */

export const ERD_ENTITIES = {
  USERS: 'users',
  FACULTY: 'faculty',
  STUDENTS: 'students',
  DEPARTMENTS: 'departments',
  COURSES: 'courses',
  ACADEMIC_YEARS: 'academic_years',
  ENROLLMENTS: 'enrollments',
  NOTIFICATIONS: 'notifications',
  AUDIT_LOGS: 'audit_logs',
  REPORTS: 'reports',
}

export const ENTITY_FIELDS = {
  users: [
    'id',
    'name',
    'email',
    'password',
    'role',
    'status',
    'employee_id',
    'student_id',
    'phone',
    'address',
    'date_of_birth',
    'department_id',
    'created_at',
    'updated_at',
  ],
  students: [
    'id',
    'user_id',
    'student_id_number',
    'registration_number',
    'first_name',
    'middle_name',
    'last_name',
    'date_of_birth',
    'gender',
    'course_id',
    'department_id',
    'current_semester',
    'cgpa',
    'attendance_percentage',
    'status',
    'admission_date',
  ],
  faculty: [
    'id',
    'user_id',
    'employee_id',
    'title',
    'first_name',
    'middle_name',
    'last_name',
    'department_id',
    'designation',
    'joining_date',
    'employment_status',
    'teaching_load',
    'feedback_rating',
  ],
  departments: [
    'id',
    'department_code',
    'department_name',
    'department_type',
    'establishment_date',
    'head_faculty_id',
    'contact_email',
    'contact_phone',
  ],
  courses: [
    'id',
    'course_code',
    'course_name',
    'course_type',
    'credits',
    'duration',
    'department_id',
    'is_active',
  ],
}

export const RELATIONSHIPS = {
  users: {
    faculty: 'hasOne',
    students: 'hasOne',
  },
  faculty: {
    user: 'belongsTo',
    department: 'belongsTo',
  },
  students: {
    user: 'belongsTo',
    course: 'belongsTo',
    department: 'belongsTo',
  },
  departments: {
    faculty: 'hasMany',
    students: 'hasMany',
    courses: 'hasMany',
  },
  courses: {
    department: 'belongsTo',
    students: 'hasMany',
  },
}

