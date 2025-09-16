import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const type = searchParams.get("type") || undefined
	const rows = db.list("generated_reports", type ? { report_type: type } : undefined)
	return NextResponse.json(rows)
}

export async function POST(req: Request) {
	const payload = await req.json()
	const created = db.create("generated_reports", {
		...payload,
		generated_at: new Date().toISOString(),
		download_count: 0,
	})
	return NextResponse.json(created, { status: 201 })
} 