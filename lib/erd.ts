export type EntityName =
	| "users"
	| "user_sessions"
	| "password_history"
	| "mfa_settings"
	| "faculty"
	| "faculty_emergency_contacts"
	| "faculty_qualifications"
	| "faculty_experience"
	| "faculty_specializations"
	| "faculty_research"
	| "faculty_awards"
	| "faculty_documents"
	| "students"
	| "student_parents"
	| "student_education"
	| "student_documents"
	| "student_achievements"
	| "student_disciplinary"
	| "departments"
	| "courses"
	| "course_curriculum"
	| "faculty_courses"
	| "student_courses"
	| "academic_years"
	| "academic_semesters"
	| "academic_calendar"
	| "designations"
	| "system_settings"
	| "institution_info"
	| "generated_reports"
	| "report_schedules"
	| "audit_logs"
	| "activity_logs"
	| "notifications"
	| "notification_templates"
	| "fee_structure"
	| "fee_payments"
	| "scholarships"
	| "library_cards"
	| "hostel_allocation"
	| "transport_registration"
	| "attendance_records"
	| "leave_requests"
	| "placement_records"
	| "alumni"

export type PrimaryKeyMap = Record<EntityName, string>

export const PRIMARY_KEYS: PrimaryKeyMap = {
	users: "user_id",
	user_sessions: "session_id",
	password_history: "history_id",
	mfa_settings: "mfa_id",
	faculty: "faculty_id",
	faculty_emergency_contacts: "contact_id",
	faculty_qualifications: "qualification_id",
	faculty_experience: "experience_id",
	faculty_specializations: "specialization_id",
	faculty_research: "research_id",
	faculty_awards: "award_id",
	faculty_documents: "document_id",
	students: "student_id",
	student_parents: "parent_id",
	student_education: "education_id",
	student_documents: "document_id",
	student_achievements: "achievement_id",
	student_disciplinary: "record_id",
	departments: "department_id",
	courses: "course_id",
	course_curriculum: "curriculum_id",
	faculty_courses: "assignment_id",
	student_courses: "enrollment_id",
	academic_years: "academic_year_id",
	academic_semesters: "semester_id",
	academic_calendar: "calendar_id",
	designations: "designation_id",
	system_settings: "setting_id",
	institution_info: "institution_id",
	generated_reports: "report_id",
	report_schedules: "schedule_id",
	audit_logs: "log_id",
	activity_logs: "activity_id",
	notifications: "notification_id",
	notification_templates: "template_id",
	fee_structure: "fee_id",
	fee_payments: "payment_id",
	scholarships: "scholarship_id",
	library_cards: "card_id",
	hostel_allocation: "allocation_id",
	transport_registration: "registration_id",
	attendance_records: "attendance_id",
	leave_requests: "leave_id",
	placement_records: "placement_id",
	alumni: "alumni_id",
}

export function isEntityName(v: string): v is EntityName {
	return (PRIMARY_KEYS as Record<string, string>)[v] !== undefined
} 