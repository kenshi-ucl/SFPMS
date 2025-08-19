import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
	const items = db.list("notifications")
	return NextResponse.json(items)
}

export async function POST(req: Request) {
	const body = await req.json()
	const created = db.create("notifications", {
		...body,
		created_at: new Date().toISOString(),
		is_read: false,
	})
	return NextResponse.json(created, { status: 201 })
}

export const PUT = async (req: Request) => {
	const body = await req.json()
	if (!body || !body.notification_id) return NextResponse.json({ error: "Missing notification_id" }, { status: 400 })
	const updated = db.update("notifications", body.notification_id, body)
	return NextResponse.json(updated ?? null)
} 