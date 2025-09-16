"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar } from "lucide-react"

interface SemesterRow {
  id: string
  academicYear: string
  name: string
  number: number
  startDate: string
  endDate: string
  registrationStart?: string
  registrationEnd?: string
  examStart?: string
  examEnd?: string
  resultDate?: string
}

const initial: SemesterRow[] = [
  { id: "s1", academicYear: "2024-2025", name: "Semester 1", number: 1, startDate: "2024-08-01", endDate: "2025-01-15" },
  { id: "s2", academicYear: "2024-2025", name: "Semester 2", number: 2, startDate: "2025-01-16", endDate: "2025-07-31" },
]

export function AcademicSemesters() {
  const [rows, setRows] = useState<SemesterRow[]>(initial)
  const [year, setYear] = useState("2024-2025")
  const [newRow, setNewRow] = useState<Partial<SemesterRow>>({ academicYear: "2024-2025", number: 1, name: "Semester 1" })

  const filtered = useMemo(() => rows.filter((r) => r.academicYear === year), [rows, year])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Semesters</h1>
          <p className="text-gray-600">Define term boundaries and key dates</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
          const complete = {
            id: `s${rows.length + 1}`,
            academicYear: newRow.academicYear || year,
            name: newRow.name || `Semester ${newRow.number || 1}`,
            number: newRow.number || 1,
            startDate: newRow.startDate || "",
            endDate: newRow.endDate || "",
            registrationStart: newRow.registrationStart,
            registrationEnd: newRow.registrationEnd,
          } as SemesterRow
          setRows((prev) => [...prev, complete])
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add Semester
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="flex items-center gap-2 col-span-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><SelectValue placeholder="Academic Year" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Name (e.g., Semester 1)" value={newRow.name || ""} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
            <Input placeholder="Number" type="number" value={newRow.number || 1} onChange={(e) => setNewRow({ ...newRow, number: Number(e.target.value) })} />
            <Input placeholder="Start Date" type="date" value={newRow.startDate || ""} onChange={(e) => setNewRow({ ...newRow, startDate: e.target.value })} />
            <Input placeholder="End Date" type="date" value={newRow.endDate || ""} onChange={(e) => setNewRow({ ...newRow, endDate: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semesters ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>#</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Reg. Start</TableHead>
                <TableHead>Reg. End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.academicYear}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.number}</TableCell>
                  <TableCell>{s.startDate}</TableCell>
                  <TableCell>{s.endDate}</TableCell>
                  <TableCell>{s.registrationStart || "-"}</TableCell>
                  <TableCell>{s.registrationEnd || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 