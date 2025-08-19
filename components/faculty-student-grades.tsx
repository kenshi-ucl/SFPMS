"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Edit, Save, Download, Award, TrendingUp, Users, BookOpen } from "lucide-react"

interface StudentGrade {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  courseName: string
  section: string
  assessments: {
    quiz1: number | null
    quiz2: number | null
    midterm: number | null
    assignment: number | null
    final: number | null
  }
  attendance: number
  totalMarks: number
  percentage: number
  grade: string
  status: "Pass" | "Fail" | "Pending"
}

const mockGrades: StudentGrade[] = [
  {
    id: "1",
    studentId: "BSIT001",
    studentName: "John Doe",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    section: "A",
    assessments: {
      quiz1: 18,
      quiz2: 16,
      midterm: 42,
      assignment: 28,
      final: null,
    },
    attendance: 85,
    totalMarks: 104,
    percentage: 69.33,
    grade: "B",
    status: "Pending",
  },
  {
    id: "2",
    studentId: "BSIT002",
    studentName: "Jane Smith",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    section: "A",
    assessments: {
      quiz1: 20,
      quiz2: 19,
      midterm: 48,
      assignment: 30,
      final: null,
    },
    attendance: 92,
    totalMarks: 117,
    percentage: 78,
    grade: "A",
    status: "Pending",
  },
  {
    id: "3",
    studentId: "BSIT003",
    studentName: "Mike Johnson",
    courseCode: "CS201",
    courseName: "Database Management Systems",
    section: "B",
    assessments: {
      quiz1: 15,
      quiz2: 17,
      midterm: 35,
      assignment: 25,
      final: 82,
    },
    attendance: 78,
    totalMarks: 174,
    percentage: 69.6,
    grade: "B",
    status: "Pass",
  },
]

export function FacultyStudentGrades() {
  const [grades, setGrades] = useState<StudentGrade[]>(mockGrades)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("All")
  const [selectedSection, setSelectedSection] = useState<string>("All")
  const [editingGrade, setEditingGrade] = useState<StudentGrade | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All" || grade.courseCode === selectedCourse
    const matchesSection = selectedSection === "All" || grade.section === selectedSection
    return matchesSearch && matchesCourse && matchesSection
  })

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-orange-100 text-orange-800"
      case "F":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pass":
        return "bg-green-100 text-green-800"
      case "Fail":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateGrade = (percentage: number) => {
    if (percentage >= 90) return "A"
    if (percentage >= 80) return "B"
    if (percentage >= 70) return "C"
    if (percentage >= 60) return "D"
    return "F"
  }

  const updateGrade = (gradeId: string, field: string, value: any) => {
    if (!editingGrade) return
    
    const updatedGrade = { ...editingGrade }
    if (field.startsWith('assessments.')) {
      const assessmentField = field.split('.')[1]
      updatedGrade.assessments = {
        ...updatedGrade.assessments,
        [assessmentField]: value === "" ? null : Number(value)
      }
    } else {
      (updatedGrade as any)[field] = value
    }

    // Recalculate totals
    const total = Object.values(updatedGrade.assessments).reduce((sum, mark) => 
      sum + (mark || 0), 0
    )
    updatedGrade.totalMarks = total
    updatedGrade.percentage = (total / 250) * 100 // Assuming total is out of 250
    updatedGrade.grade = calculateGrade(updatedGrade.percentage)
    updatedGrade.status = updatedGrade.percentage >= 60 ? "Pass" : "Fail"

    setEditingGrade(updatedGrade)
  }

  const saveGrade = () => {
    if (!editingGrade) return
    
    setGrades(prev => prev.map(grade => 
      grade.id === editingGrade.id ? editingGrade : grade
    ))
    setIsEditDialogOpen(false)
    setEditingGrade(null)
  }

  const averagePercentage = filteredGrades.length > 0 
    ? filteredGrades.reduce((sum, grade) => sum + grade.percentage, 0) / filteredGrades.length 
    : 0

  const passCount = filteredGrades.filter(grade => grade.status === "Pass").length
  const failCount = filteredGrades.filter(grade => grade.status === "Fail").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Grades</h1>
          <p className="text-gray-600">Manage and track student grades and assessments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Grades
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Bulk Update
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredGrades.length > 0 ? Math.round((passCount / filteredGrades.length) * 100) : 0}%
                </p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(averagePercentage)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-orange-600">
                  {new Set(filteredGrades.map(g => g.courseCode)).size}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Courses</SelectItem>
                <SelectItem value="CS101">CS101 - Data Structures</SelectItem>
                <SelectItem value="CS201">CS201 - Database Systems</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Grades ({filteredGrades.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Quiz 1</TableHead>
                <TableHead>Quiz 2</TableHead>
                <TableHead>Mid-term</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{grade.studentName}</p>
                      <p className="text-sm text-gray-500">{grade.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{grade.courseCode}</p>
                      <p className="text-sm text-gray-500">Section {grade.section}</p>
                    </div>
                  </TableCell>
                  <TableCell>{grade.assessments.quiz1 || "-"}/20</TableCell>
                  <TableCell>{grade.assessments.quiz2 || "-"}/20</TableCell>
                  <TableCell>{grade.assessments.midterm || "-"}/50</TableCell>
                  <TableCell>{grade.assessments.assignment || "-"}/30</TableCell>
                  <TableCell>{grade.assessments.final || "-"}/100</TableCell>
                  <TableCell>{grade.attendance}%</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{grade.totalMarks}/250</p>
                      <p className="text-sm text-gray-500">{Math.round(grade.percentage)}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(grade.grade)}>
                      {grade.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(grade.status)}>
                      {grade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isEditDialogOpen && editingGrade?.id === grade.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setEditingGrade(null)
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingGrade(grade)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Grades - {grade.studentName}</DialogTitle>
                        </DialogHeader>
                        {editingGrade && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Student ID</Label>
                                <Input value={editingGrade.studentId} disabled />
                              </div>
                              <div>
                                <Label>Course</Label>
                                <Input value={`${editingGrade.courseCode} - Section ${editingGrade.section}`} disabled />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Quiz 1 (out of 20)</Label>
                                <Input
                                  type="number"
                                  value={editingGrade.assessments.quiz1 || ""}
                                  onChange={(e) => updateGrade(editingGrade.id, "assessments.quiz1", e.target.value)}
                                  placeholder="Enter marks"
                                />
                              </div>
                              <div>
                                <Label>Quiz 2 (out of 20)</Label>
                                <Input
                                  type="number"
                                  value={editingGrade.assessments.quiz2 || ""}
                                  onChange={(e) => updateGrade(editingGrade.id, "assessments.quiz2", e.target.value)}
                                  placeholder="Enter marks"
                                />
                              </div>
                              <div>
                                <Label>Mid-term (out of 50)</Label>
                                <Input
                                  type="number"
                                  value={editingGrade.assessments.midterm || ""}
                                  onChange={(e) => updateGrade(editingGrade.id, "assessments.midterm", e.target.value)}
                                  placeholder="Enter marks"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Assignment (out of 30)</Label>
                                <Input
                                  type="number"
                                  value={editingGrade.assessments.assignment || ""}
                                  onChange={(e) => updateGrade(editingGrade.id, "assessments.assignment", e.target.value)}
                                  placeholder="Enter marks"
                                />
                              </div>
                              <div>
                                <Label>Final Exam (out of 100)</Label>
                                <Input
                                  type="number"
                                  value={editingGrade.assessments.final || ""}
                                  onChange={(e) => updateGrade(editingGrade.id, "assessments.final", e.target.value)}
                                  placeholder="Enter marks"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Attendance (%)</Label>
                              <Input
                                type="number"
                                value={editingGrade.attendance}
                                onChange={(e) => updateGrade(editingGrade.id, "attendance", Number(e.target.value))}
                                placeholder="Enter attendance percentage"
                              />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <strong>Total Marks:</strong> {editingGrade.totalMarks}/250
                                </div>
                                <div>
                                  <strong>Percentage:</strong> {Math.round(editingGrade.percentage)}%
                                </div>
                                <div>
                                  <strong>Grade:</strong> <Badge className={getGradeColor(editingGrade.grade)}>{editingGrade.grade}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={saveGrade} className="bg-purple-600 hover:bg-purple-700">
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 