import { v4 as uuid } from "uuid"
import { PRIMARY_KEYS, type EntityName } from "@/lib/erd"
import type { AuditRecord } from "@/lib/types"

const store: Record<EntityName, Array<Record<string, any>>> = (() => {
	const s = {} as Record<EntityName, Array<Record<string, any>>>
	;(Object.keys(PRIMARY_KEYS) as EntityName[]).forEach((e) => {
		s[e] = []
	})
	return s
})()

const audits: AuditRecord[] = []

type Where = Partial<Record<string, any>>

type CreateOpts = { actor?: { userId: string; username: string; role: "admin" | "dept_admin" | "faculty" | "student" } }

type UpdateOpts = CreateOpts

type DeleteOpts = CreateOpts

function clone<T>(v: T): T {
	return JSON.parse(JSON.stringify(v))
}

export const db = {
	list<T = any>(entity: EntityName, where?: Where): T[] {
		const rows = store[entity]
		if (!where) return clone(rows) as T[]
		return clone(rows.filter((r) => Object.entries(where).every(([k, v]) => r[k] === v))) as T[]
	},
	get<T = any>(entity: EntityName, id: string | number): T | undefined {
		const pk = PRIMARY_KEYS[entity]
		return clone(store[entity].find((r) => String(r[pk]) === String(id))) as T | undefined
	},
	create<T = any>(entity: EntityName, data: Record<string, any>, opts?: CreateOpts): T {
		const pk = PRIMARY_KEYS[entity]
		const id = data[pk] ?? uuid()
		const row = { ...data, [pk]: id }
		store[entity].push(row)
		audits.push({
			id: uuid(),
			action: "INSERT",
			entityType: entity,
			entityId: String(id),
			newValues: row,
			user: opts?.actor || { userId: "system", username: "system", role: "admin" as const },
			timestamp: Date.now(),
		})
		return clone(row) as T
	},
	update<T = any>(entity: EntityName, id: string | number, patch: Record<string, any>, opts?: UpdateOpts): T | undefined {
		const pk = PRIMARY_KEYS[entity]
		const rows = store[entity]
		const idx = rows.findIndex((r) => String(r[pk]) === String(id))
		if (idx === -1) return undefined
		const before = rows[idx]
		const after = { ...before, ...patch }
		rows[idx] = after
		audits.push({
			id: uuid(),
			action: "UPDATE",
			entityType: entity,
			entityId: String(id),
			oldValues: before,
			newValues: patch,
			user: opts?.actor || { userId: "system", username: "system", role: "admin" as const },
			timestamp: Date.now(),
		})
		return clone(after) as T
	},
	remove(entity: EntityName, id: string | number, opts?: DeleteOpts): boolean {
		const pk = PRIMARY_KEYS[entity]
		const rows = store[entity]
		const idx = rows.findIndex((r) => String(r[pk]) === String(id))
		if (idx === -1) return false
		const before = rows[idx]
		rows.splice(idx, 1)
		audits.push({
			id: uuid(),
			action: "DELETE",
			entityType: entity,
			entityId: String(id),
			oldValues: before,
			user: opts?.actor || { userId: "system", username: "system", role: "admin" as const },
			timestamp: Date.now(),
		})
		return true
	},
	getAudits(): AuditRecord[] {
		return clone(audits)
	},
} 