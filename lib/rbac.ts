import type { Permission, UserRole, AuthUser } from "@/lib/types"

const rolePermissions: Record<UserRole, ReadonlyArray<Permission>> = {
	admin: [
		"profiles:read",
		"profiles:write",
		"profiles:archive",
		"users:manage",
		"reports:read",
		"reports:write",
		"audit:read",
		"settings:manage",
		"courses:manage",
		"departments:manage",
		"academic-years:manage",
	],
	dept_admin: [
		"profiles:read",
		"profiles:write",
		"reports:read",
		"courses:manage",
		"departments:manage",
		"academic-years:manage",
	],
	faculty: ["profiles:read", "reports:read"],
	student: ["profiles:read"],
}

export function hasPermission(user: Pick<AuthUser, "role">, permission: Permission): boolean {
	return rolePermissions[user.role].includes(permission)
}

export function getPermissions(role: UserRole): ReadonlyArray<Permission> {
	return rolePermissions[role]
}
