import { NextResponse } from "next/server"
import { isEntityName, PRIMARY_KEYS } from "@/lib/erd"
import { db } from "@/lib/db"

export async function GET(req: Request, { params }: { params: { entity: string } }) {
	const { searchParams } = new URL(req.url)
	const entity = params.entity.toLowerCase()
	if (!isEntityName(entity)) return NextResponse.json({ error: "Unknown entity" }, { status: 404 })
	const idParam = searchParams.get("id")
	if (idParam) {
		const row = db.get(entity, idParam)
		return NextResponse.json(row ?? null)
	}
	const where: Record<string, any> = {}
	searchParams.forEach((v, k) => {
		if (k !== "id") where[k] = v
	})
	return NextResponse.json(db.list(entity as any, Object.keys(where).length ? where : undefined))
}

export async function POST(req: Request, { params }: { params: { entity: string } }) {
	const entity = params.entity.toLowerCase()
	if (!isEntityName(entity)) return NextResponse.json({ error: "Unknown entity" }, { status: 404 })
	const body = await req.json()
	const row = db.create(entity as any, body)
	return NextResponse.json(row, { status: 201 })
}

export async function PUT(req: Request, { params }: { params: { entity: string } }) {
	const entity = params.entity.toLowerCase()
	if (!isEntityName(entity)) return NextResponse.json({ error: "Unknown entity" }, { status: 404 })
	const body = await req.json()
	const pk = PRIMARY_KEYS[entity]
	if (!body || body[pk] == null) return NextResponse.json({ error: `Missing ${pk}` }, { status: 400 })
	const row = db.update(entity as any, body[pk], body)
	return NextResponse.json(row ?? null)
}

export async function DELETE(req: Request, { params }: { params: { entity: string } }) {
	const { searchParams } = new URL(req.url)
	const entity = params.entity.toLowerCase()
	if (!isEntityName(entity)) return NextResponse.json({ error: "Unknown entity" }, { status: 404 })
	const id = searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
	const ok = db.remove(entity as any, id)
	return NextResponse.json({ ok })
} 