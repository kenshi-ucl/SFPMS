"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, BookOpen, Calendar, User } from "lucide-react"

interface SubjectGrade {
  id: string
  subjectCode: string
  description: string
  facultyName: string
  units: number
  section: string
  midterm: number
  final: number
  finalGrade: number
  gradeStatus: "PASSED" | "FAILED" | "INC" | "DROPPED"
}

// Mock data based on the uploaded image structure
const mockSubjectGrades: SubjectGrade[] = [
  {
    id: "1",
    subjectCode: "BRIDG 001",
    description: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    units: 3,
    section: "BSIT 1-IT13",
    midterm: 1.7,
    final: 1.5,
    finalGrade: 1.5,
    gradeStatus: "PASSED",
  },
  {
    id: "2",
    subjectCode: "GE 104",
    description: "Mathematics in the Modern World",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    units: 3,
    section: "BSIT 1-IT13",
    midterm: 2.8,
    final: 2.3,
    finalGrade: 2.3,
    gradeStatus: "PASSED",
  },
  {
    id: "3",
    subjectCode: "GE 105",
    description: "Purposive Communication",
    facultyName: "TITULAR, BRISBANE QUIROG",
    units: 3,
    section: "BS PSYCH 1-AS12",
    midterm: 1.9,
    final: 2.2,
    finalGrade: 2.2,
    gradeStatus: "PASSED",
  },
  {
    id: "4",
    subjectCode: "IT 170",
    description: "Computer Fundamentals and Operations",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    units: 3,
    section: "BSIT 1-IT14",
    midterm: 2.0,
    final: 1.9,
    finalGrade: 1.9,
    gradeStatus: "PASSED",
  },
  {
    id: "5",
    subjectCode: "IT 171",
    description: "Fundamentals of Programming and Problem Solving 1",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    units: 3,
    section: "BSIT 1-IT14",
    midterm: 2.2,
    final: 1.9,
    finalGrade: 1.9,
    gradeStatus: "PASSED",
  },
  {
    id: "6",
    subjectCode: "MATH 171",
    description: "Discrete Math",
    facultyName: "SARIN, JAYSON RASOURIO",
    units: 3,
    section: "BSIT 1-IT13",
    midterm: 2.9,
    final: 2.5,
    finalGrade: 2.5,
    gradeStatus: "PASSED",
  },
  {
    id: "7",
    subjectCode: "NSTP 1",
    description: "Civic Welfare Training Service 1",
    facultyName: "MIANO, EMMANUELLE JAN CHUA",
    units: 3,
    section: "BSHM 1-HM12",
    midterm: 1.0,
    final: 1.0,
    finalGrade: 1.0,
    gradeStatus: "PASSED",
  },
  {
    id: "8",
    subjectCode: "PATHFIT 1",
    description: "Movement Competency Training",
    facultyName: "BUTALID, RONALD ALLAN HAVANA",
    units: 2,
    section: "BSA 1-A13",
    midterm: 2.0,
    final: 1.7,
    finalGrade: 1.7,
    gradeStatus: "PASSED",
  },
  {
    id: "9",
    subjectCode: "THEO 110",
    description: "Religions, Religious Experiences and Spirituality",
    facultyName: "BAGAYAS, ANTHONY MANLIONES",
    units: 3,
    section: "BSBA-HRMGT 2-HRMGT21",
    midterm: 2.9,
    final: 2.5,
    finalGrade: 2.5,
    gradeStatus: "PASSED",
  },
  {
    id: "10",
    subjectCode: "GE 103",
    description: "The Contemporary World",
    facultyName: "MORDENO, ANDREW JOSE DIGAL",
    units: 3,
    section: "BSCRIM 1-CRIM1A",
    midterm: 3.0,
    final: 2.9,
    finalGrade: 2.9,
    gradeStatus: "PASSED",
  },
]

export function MyGrades() {
  const [grades] = useState<SubjectGrade[]>(mockSubjectGrades)
  const [selectedSemester, setSelectedSemester] = useState<string>("First")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")

  const filteredGrades = grades.filter((grade) => {
    const matchesStatus = selectedStatus === "All" || grade.gradeStatus === selectedStatus
    return matchesStatus
  })

  const getGradeStatusColor = (status: string) => {
    switch (status) {
      case "PASSED":
        return "bg-green-100 text-green-800"
      case "FAILED":
        return "bg-red-100 text-red-800"
      case "INC":
        return "bg-yellow-100 text-yellow-800"
      case "DROPPED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate GPA
  const passedGrades = filteredGrades.filter(g => g.gradeStatus === "PASSED")
  const totalGradePoints = passedGrades.reduce((sum, grade) => sum + (grade.finalGrade * grade.units), 0)
  const totalUnits = passedGrades.reduce((sum, grade) => sum + grade.units, 0)
  const gpa = totalUnits > 0 ? (totalGradePoints / totalUnits).toFixed(2) : "0.00"

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
          <p className="text-gray-600">View your academic performance and grades</p>
        </div>
      </div>

      {/* Student Info Header */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">JOHN DOE</p>
                <p className="text-sm text-gray-600">Student ID: BSIT-2024-001</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course</p>
              <p className="font-semibold">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-purple-600">{gpa}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Year Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">School Year</p>
              <p className="font-semibold">2324</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course Code</p>
              <p className="font-semibold">BSIT</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course Description</p>
              <p className="font-semibold">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Semester</p>
              <p className="font-semibold">{selectedSemester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passed</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredGrades.filter(g => g.gradeStatus === "PASSED").length}
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
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-blue-600">{totalUnits}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-purple-600">{gpa}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First">First Semester</SelectItem>
                <SelectItem value="Second">Second Semester</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Grade status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="PASSED">Passed</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="INC">Incomplete</SelectItem>
                <SelectItem value="DROPPED">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table - Matching the uploaded image structure */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border-collapse border border-gray-300">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold border border-gray-300 text-center">#</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Subject Code</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Description</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Faculty Name</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Units</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Section</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Midterm</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Final</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Final Grade</TableHead>
                  <TableHead className="font-bold border border-gray-300 text-center">Grade Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade, index) => (
                  <TableRow key={grade.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <TableCell className="font-medium border border-gray-300 text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium text-blue-600 border border-gray-300 text-center">{grade.subjectCode}</TableCell>
                    <TableCell className="max-w-xs border border-gray-300 px-2">
                      <div className="text-sm">
                        {grade.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm border border-gray-300 px-2">{grade.facultyName}</TableCell>
                    <TableCell className="text-center font-medium border border-gray-300">{grade.units}</TableCell>
                    <TableCell className="text-sm border border-gray-300 text-center">{grade.section}</TableCell>
                    <TableCell className="text-center font-medium border border-gray-300">{grade.midterm.toFixed(1)}</TableCell>
                    <TableCell className="text-center font-medium border border-gray-300">{grade.final.toFixed(1)}</TableCell>
                    <TableCell className="text-center font-bold text-lg border border-gray-300">{grade.finalGrade.toFixed(1)}</TableCell>
                    <TableCell className="border border-gray-300 text-center">
                      <Badge className={getGradeStatusColor(grade.gradeStatus)} variant="outline">
                        {grade.gradeStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* GPA Summary */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              GPA (excludes NSTP and subjects with non-numeric ratings): {gpa}
            </h3>
            <p className="text-sm text-gray-600">Scholastic Status: Regular</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 