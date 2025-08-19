"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface Designation {
  id: string
  name: string
  level: "Professor" | "Associate" | "Assistant" | "Lecturer" | "Other"
  hierarchy: number
  isActive: boolean
}

const initial: Designation[] = [
  { id: "d1", name: "Professor", level: "Professor", hierarchy: 1, isActive: true },
  { id: "d2", name: "Associate Professor", level: "Associate", hierarchy: 2, isActive: true },
]

export function Designations() {
  const [rows, setRows] = useState<Designation[]>(initial)
  const [newRow, setNewRow] = useState<Partial<Designation>>({ level: "Assistant", hierarchy: 3, isActive: true })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Designations</h1>
          <p className="text-gray-600">Manage faculty designation catalog</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
          const complete = {
            id: `d${rows.length + 1}`,
            name: newRow.name || "New Designation",
            level: (newRow.level || "Assistant") as Designation["level"],
            hierarchy: newRow.hierarchy || rows.length + 1,
            isActive: newRow.isActive ?? true,
          } as Designation
          setRows((prev) => [...prev, complete])
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New Designation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Name" value={newRow.name || ""} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
            <Select value={newRow.level || "Assistant"} onValueChange={(v) => setNewRow({ ...newRow, level: v as any })}>
              <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Professor">Professor</SelectItem>
                <SelectItem value="Associate">Associate</SelectItem>
                <SelectItem value="Assistant">Assistant</SelectItem>
                <SelectItem value="Lecturer">Lecturer</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Hierarchy" type="number" value={newRow.hierarchy || 1} onChange={(e) => setNewRow({ ...newRow, hierarchy: Number(e.target.value) })} />
            <Select value={(newRow.isActive ?? true) ? "active" : "inactive"} onValueChange={(v) => setNewRow({ ...newRow, isActive: v === "active" })}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Designation List ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Hierarchy</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.level}</TableCell>
                  <TableCell>{r.hierarchy}</TableCell>
                  <TableCell>{r.isActive ? "Active" : "Inactive"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 