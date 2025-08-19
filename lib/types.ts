export type UserRole = "admin" | "dept_admin" | "faculty" | "student"

export type UserStatus = "active" | "inactive" | "suspended"

export type AuthUser = {
	userId: string
	username: string
	email: string
	role: UserRole
	departmentId?: string
	status: UserStatus
	lastLogin?: string
}

export type SessionStatus = "active" | "expired" | "terminated"

export type Session = {
	sessionId: string
	user: AuthUser
	token: string
	ipAddress?: string
	userAgent?: string
	loginTime: number
	lastActivity: number
	status: SessionStatus
	rememberUntil?: number
}

export type MfaType = "sms" | "email" | "authenticator" | "biometric"

export type MfaChallenge = {
	mfaId: string
	userId: string
	type: MfaType
	secret: string
	expiresAt: number
}

export type Permission =
	| "profiles:read"
	| "profiles:write"
	| "profiles:archive"
	| "users:manage"
	| "reports:read"
	| "reports:write"
	| "audit:read"
	| "settings:manage"
	| "courses:manage"
	| "departments:manage"
	| "academic-years:manage"

export type AuditAction =
	| "LOGIN"
	| "LOGOUT"
	| "INSERT"
	| "UPDATE"
	| "DELETE"
	| "VIEW"

export type AuditRecord = {
	id: string
	action: AuditAction
	entityType: string
	entityId?: string
	oldValues?: Record<string, unknown>
	newValues?: Record<string, unknown>
	ipAddress?: string
	userAgent?: string
	user: Pick<AuthUser, "userId" | "username" | "role">
	timestamp: number
}

export type NotificationType = "System" | "Academic" | "Administrative"

export type InAppNotification = {
	id: string
	type: NotificationType
	title: string
	message: string
	priority: "Low" | "Medium" | "High" | "Urgent"
	isRead: boolean
	createdAt: number
} 