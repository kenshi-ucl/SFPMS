"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Search, CheckCircle, XCircle, Clock, Users, TrendingUp, AlertTriangle } from "lucide-react"

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  courseName: string
  section: string
  date: string
  status: "Present" | "Absent" | "Late" | "Excused"
  markedBy: string
  markedAt: string
}

interface StudentAttendanceSummary {
  studentId: string
  studentName: string
  courseCode: string
  section: string
  totalClasses: number
  presentClasses: number
  absentClasses: number
  lateClasses: number
  attendancePercentage: number
  status: "Good" | "Average" | "Poor"
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "BSIT001",
    studentName: "John Doe",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    section: "A",
    date: "2024-12-18",
    status: "Present",
    markedBy: "Faculty",
    markedAt: "09:05 AM",
  },
  {
    id: "2",
    studentId: "BSIT002",
    studentName: "Jane Smith",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    section: "A",
    date: "2024-12-18",
    status: "Present",
    markedBy: "Faculty",
    markedAt: "09:05 AM",
  },
  {
    id: "3",
    studentId: "BSIT003",
    studentName: "Mike Johnson",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    section: "A",
    date: "2024-12-18",
    status: "Absent",
    markedBy: "Faculty",
    markedAt: "09:05 AM",
  },
]

const mockSummary: StudentAttendanceSummary[] = [
  {
    studentId: "BSIT001",
    studentName: "John Doe",
    courseCode: "CS101",
    section: "A",
    totalClasses: 20,
    presentClasses: 17,
    absentClasses: 2,
    lateClasses: 1,
    attendancePercentage: 85,
    status: "Good",
  },
  {
    studentId: "BSIT002",
    studentName: "Jane Smith",
    courseCode: "CS101",
    section: "A",
    totalClasses: 20,
    presentClasses: 18,
    absentClasses: 1,
    lateClasses: 1,
    attendancePercentage: 90,
    status: "Good",
  },
  {
    studentId: "BSIT003",
    studentName: "Mike Johnson",
    courseCode: "CS101",
    section: "A",
    totalClasses: 20,
    presentClasses: 14,
    absentClasses: 5,
    lateClasses: 1,
    attendancePercentage: 70,
    status: "Average",
  },
]

export function FacultyAttendance() {
  const [attendanceRecords] = useState<AttendanceRecord[]>(mockAttendance)
  const [attendanceSummary] = useState<StudentAttendanceSummary[]>(mockSummary)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101")
  const [selectedSection, setSelectedSection] = useState<string>("A")
  const [viewMode, setViewMode] = useState<string>("daily")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All" || record.courseCode === selectedCourse
    const matchesSection = selectedSection === "All" || record.section === selectedSection
    const matchesDate = viewMode === "daily" ? record.date === selectedDate : true
    return matchesSearch && matchesCourse && matchesSection && matchesDate
  })

  const filteredSummary = attendanceSummary.filter((summary) => {
    const matchesSearch = 
      summary.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All" || summary.courseCode === selectedCourse
    const matchesSection = selectedSection === "All" || summary.section === selectedSection
    return matchesSearch && matchesCourse && matchesSection
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Absent":
        return "bg-red-100 text-red-800"
      case "Late":
        return "bg-yellow-100 text-yellow-800"
      case "Excused":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-800"
      case "Average":
        return "bg-yellow-100 text-yellow-800"
      case "Poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalStudents = filteredSummary.length
  const averageAttendance = totalStudents > 0 
    ? Math.round(filteredSummary.reduce((sum, s) => sum + s.attendancePercentage, 0) / totalStudents)
    : 0
  const lowAttendanceCount = filteredSummary.filter(s => s.attendancePercentage < 75).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track and manage student attendance records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Export Report
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Mark Attendance
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
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-blue-600">{averageAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredRecords.filter(r => r.status === "Present").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Attendance</p>
                <p className="text-2xl font-bold text-red-600">{lowAttendanceCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger>
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily View</SelectItem>
                <SelectItem value="summary">Summary View</SelectItem>
              </SelectContent>
            </Select>
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
            {viewMode === "daily" && (
              <div>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Attendance View */}
      {viewMode === "daily" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daily Attendance - {new Date(selectedDate).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marked At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-gray-500">{record.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.courseCode}</p>
                        <p className="text-sm text-gray-500">{record.courseName}</p>
                      </div>
                    </TableCell>
                    <TableCell>{record.section}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.markedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-yellow-600">
                          <Clock className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Summary View */}
      {viewMode === "summary" && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Total Classes</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSummary.map((summary) => (
                  <TableRow key={summary.studentId}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{summary.studentName}</p>
                        <p className="text-sm text-gray-500">{summary.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{summary.courseCode}</p>
                        <p className="text-sm text-gray-500">Section {summary.section}</p>
                      </div>
                    </TableCell>
                    <TableCell>{summary.totalClasses}</TableCell>
                    <TableCell className="text-green-600">{summary.presentClasses}</TableCell>
                    <TableCell className="text-red-600">{summary.absentClasses}</TableCell>
                    <TableCell className="text-yellow-600">{summary.lateClasses}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{summary.attendancePercentage}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              summary.attendancePercentage >= 85 ? 'bg-green-500' :
                              summary.attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${summary.attendancePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAttendanceStatusColor(summary.status)}>
                        {summary.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 