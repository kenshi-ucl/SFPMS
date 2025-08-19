"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, BookOpen, Calendar } from "lucide-react"

interface CurriculumRow {
  id: string
  courseCode: string
  courseName: string
  academicYear: string
  subjectCode: string
  subjectName: string
  semester: number
  credits: number
  subjectType: "Core" | "Elective" | "Lab" | "Project"
  theoryHours: number
  practicalHours: number
}

const initial: CurriculumRow[] = [
  {
    id: "cc1",
    courseCode: "CS101",
    courseName: "B.Tech CS",
    academicYear: "2024-2025",
    subjectCode: "CS201",
    subjectName: "Data Structures",
    semester: 3,
    credits: 4,
    subjectType: "Core",
    theoryHours: 3,
    practicalHours: 2,
  },
]

export function CourseCurriculum() {
  const [data, setData] = useState<CurriculumRow[]>(initial)
  const [year, setYear] = useState<string>("2024-2025")
  const [course, setCourse] = useState<string>("CS101")
  const [semester, setSemester] = useState<string>("all")

  const [newRow, setNewRow] = useState<Partial<CurriculumRow>>({
    academicYear: "2024-2025",
    courseCode: "CS101",
    courseName: "B.Tech CS",
    subjectType: "Core",
    semester: 1,
    credits: 3,
    theoryHours: 3,
    practicalHours: 0,
  })

  const filtered = useMemo(() =>
    data.filter((r) =>
      (year ? r.academicYear === year : true) &&
      (course ? r.courseCode === course : true) &&
      (semester === "all" ? true : r.semester === Number(semester))
    ),
  [data, year, course, semester])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Curriculum</h1>
          <p className="text-gray-600">Manage subjects mapped to courses and semesters</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
          const complete = {
            ...newRow,
            id: `cc${data.length + 1}`,
            academicYear: newRow.academicYear || year,
            courseCode: newRow.courseCode || course,
            courseName: newRow.courseName || "B.Tech CS",
            subjectCode: (newRow.subjectCode || "").toUpperCase(),
            subjectName: newRow.subjectName || "New Subject",
            semester: newRow.semester || 1,
            credits: newRow.credits || 3,
            subjectType: newRow.subjectType || "Core",
            theoryHours: newRow.theoryHours || 3,
            practicalHours: newRow.practicalHours || 0,
          } as CurriculumRow
          setData((prev) => [...prev, complete])
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add Subject
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Academic Year" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Course" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">B.Tech CS (CS101)</SelectItem>
                  <SelectItem value="ME101">B.Tech ME (ME101)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Semester" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>Semester {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Subject Code" value={newRow.subjectCode || ""} onChange={(e) => setNewRow({ ...newRow, subjectCode: e.target.value })} />
              <Input placeholder="Subject Name" value={newRow.subjectName || ""} onChange={(e) => setNewRow({ ...newRow, subjectName: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Curriculum Map ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Sem</TableHead>
                <TableHead>Subject Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Theory Hrs</TableHead>
                <TableHead>Practical Hrs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.academicYear}</TableCell>
                  <TableCell>{r.courseName}</TableCell>
                  <TableCell>{r.semester}</TableCell>
                  <TableCell className="font-mono font-medium">{r.subjectCode}</TableCell>
                  <TableCell className="font-medium">{r.subjectName}</TableCell>
                  <TableCell>{r.subjectType}</TableCell>
                  <TableCell>{r.credits}</TableCell>
                  <TableCell>{r.theoryHours}</TableCell>
                  <TableCell>{r.practicalHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 