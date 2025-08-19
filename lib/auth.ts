"use client"

import { v4 as uuid } from "uuid"
import type { AuthUser, MfaChallenge, MfaType, Session } from "@/lib/types"

// In-memory demo stores. Replace with API calls in production.
const users: Record<string, AuthUser & { password: string }> = {
	"admin@university.edu": {
		userId: "u_admin",
		username: "admin",
		email: "admin@university.edu",
		role: "admin",
		status: "active",
		lastLogin: new Date().toISOString(),
		password: "Password!2345",
	},
}

const activeSessions = new Map<string, Session>()
const mfaChallenges = new Map<string, MfaChallenge>()

// Security policies
const PASSWORD_MIN_LENGTH = 12
const IDLE_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes
const REMEMBER_ME_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const MAX_FAILED_ATTEMPTS = 5

const failedAttempts = new Map<string, { count: number; lockedUntil?: number }>()

export function validatePasswordPolicy(password: string): { ok: true } | { ok: false; reason: string } {
	const hasUpper = /[A-Z]/.test(password)
	const hasLower = /[a-z]/.test(password)
	const hasNumber = /\d/.test(password)
	const hasSymbol = /[^A-Za-z0-9]/.test(password)
	if (password.length < PASSWORD_MIN_LENGTH) return { ok: false, reason: "Password too short" }
	if (!hasUpper || !hasLower || !hasNumber || !hasSymbol)
		return { ok: false, reason: "Password must include upper, lower, number, and symbol" }
	return { ok: true }
}

export async function login(
	email: string,
	password: string,
	options?: { remember?: boolean; mfaType?: MfaType }
): Promise<{ challenge?: MfaChallenge; session?: Session; error?: string }> {
	const user = users[email]
	const now = Date.now()
	const fa = failedAttempts.get(email) || { count: 0 }
	if (fa.lockedUntil && now < fa.lockedUntil) {
		return { error: "Account temporarily locked. Try again later." }
	}
	if (!user || user.password !== password) {
		const count = fa.count + 1
		const lockedUntil = count >= MAX_FAILED_ATTEMPTS ? now + 15 * 60 * 1000 : undefined
		failedAttempts.set(email, { count, lockedUntil })
		return { error: "Invalid credentials" }
	}
	failedAttempts.delete(email)
	// Always require MFA in demo
	const challenge: MfaChallenge = {
		mfaId: uuid(),
		userId: user.userId,
		type: options?.mfaType || "email",
		secret: String(Math.floor(100000 + Math.random() * 900000)),
		expiresAt: now + 5 * 60 * 1000,
	}
	mfaChallenges.set(challenge.mfaId, challenge)
	return { challenge }
}

export async function verifyMfa(
	mfaId: string,
	code: string,
	options?: { remember?: boolean; ipAddress?: string; userAgent?: string }
): Promise<{ session?: Session; error?: string }> {
	const challenge = mfaChallenges.get(mfaId)
	if (!challenge) return { error: "MFA challenge not found" }
	if (Date.now() > challenge.expiresAt) return { error: "MFA code expired" }
	if (challenge.secret !== code) return { error: "Invalid MFA code" }
	mfaChallenges.delete(mfaId)

	const user = Object.values(users).find((u) => u.userId === challenge.userId)!
	const session: Session = {
		sessionId: uuid(),
		user,
		token: uuid(),
		ipAddress: options?.ipAddress,
		userAgent: options?.userAgent,
		loginTime: Date.now(),
		lastActivity: Date.now(),
		status: "active",
		rememberUntil: options?.remember ? Date.now() + REMEMBER_ME_MS : undefined,
	}
	activeSessions.set(session.sessionId, session)
	return { session }
}

export function getActiveSession(): Session | undefined {
	for (const s of activeSessions.values()) {
		if (s.status === "active") {
			const timedOut = Date.now() - s.lastActivity > IDLE_TIMEOUT_MS
			const remembered = s.rememberUntil && Date.now() < s.rememberUntil
			if (timedOut && !remembered) {
				s.status = "expired"
				continue
			}
			return s
		}
	}
	return undefined
}

export function touchSession(sessionId: string): void {
	const s = activeSessions.get(sessionId)
	if (!s) return
	s.lastActivity = Date.now()
}

export function logout(sessionId?: string): void {
	if (sessionId && activeSessions.has(sessionId)) {
		const s = activeSessions.get(sessionId)!
		s.status = "terminated"
		activeSessions.delete(sessionId)
	}
}

export function mockCurrentUser(): AuthUser | undefined {
	return getActiveSession()?.user
} 