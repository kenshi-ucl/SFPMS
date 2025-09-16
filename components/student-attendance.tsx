"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Search, CheckCircle, XCircle, Clock, Users, TrendingUp, AlertTriangle, User, Download } from "lucide-react"

interface StudentAttendanceRecord {
  id: string
  subjectCode: string
  subjectName: string
  facultyName: string
  date: string
  day: string
  timeSlot: string
  status: "Present" | "Absent" | "Late" | "Excused"
  markedAt?: string
  remarks?: string
}

interface SubjectAttendanceSummary {
  subjectCode: string
  subjectName: string
  facultyName: string
  totalClasses: number
  presentClasses: number
  absentClasses: number
  lateClasses: number
  excusedClasses: number
  attendancePercentage: number
  status: "Good" | "Average" | "Poor" | "Critical"
}

const mockAttendanceRecords: StudentAttendanceRecord[] = [
  {
    id: "1",
    subjectCode: "BRIDG 001",
    subjectName: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    date: "2024-12-18",
    day: "Monday",
    timeSlot: "08:00 AM - 09:30 AM",
    status: "Present",
    markedAt: "08:05 AM",
  },
  {
    id: "2",
    subjectCode: "GE 104",
    subjectName: "Mathematics in the Modern World",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    date: "2024-12-18",
    day: "Monday",
    timeSlot: "10:00 AM - 11:30 AM",
    status: "Present",
    markedAt: "10:03 AM",
  },
  {
    id: "3",
    subjectCode: "IT 170",
    subjectName: "Computer Fundamentals and Operations",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    date: "2024-12-17",
    day: "Tuesday",
    timeSlot: "09:00 AM - 10:30 AM",
    status: "Late",
    markedAt: "09:15 AM",
    remarks: "Traffic delay"
  },
  {
    id: "4",
    subjectCode: "IT 171",
    subjectName: "Fundamentals of Programming and Problem Solving 1",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    date: "2024-12-16",
    day: "Wednesday",
    timeSlot: "11:00 AM - 12:30 PM",
    status: "Absent",
    remarks: "Sick leave"
  },
  {
    id: "5",
    subjectCode: "GE 105",
    subjectName: "Purposive Communication",
    facultyName: "TITULAR, BRISBANE QUIROG",
    date: "2024-12-15",
    day: "Thursday",
    timeSlot: "02:00 PM - 03:30 PM",
    status: "Present",
    markedAt: "02:02 PM",
  },
]

const mockSubjectSummary: SubjectAttendanceSummary[] = [
  {
    subjectCode: "BRIDG 001",
    subjectName: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    totalClasses: 24,
    presentClasses: 22,
    absentClasses: 1,
    lateClasses: 1,
    excusedClasses: 0,
    attendancePercentage: 92,
    status: "Good",
  },
  {
    subjectCode: "GE 104",
    subjectName: "Mathematics in the Modern World",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    totalClasses: 22,
    presentClasses: 20,
    absentClasses: 2,
    lateClasses: 0,
    excusedClasses: 0,
    attendancePercentage: 91,
    status: "Good",
  },
  {
    subjectCode: "IT 170",
    subjectName: "Computer Fundamentals and Operations",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    totalClasses: 20,
    presentClasses: 17,
    absentClasses: 2,
    lateClasses: 1,
    excusedClasses: 0,
    attendancePercentage: 85,
    status: "Good",
  },
  {
    subjectCode: "IT 171",
    subjectName: "Fundamentals of Programming and Problem Solving 1",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    totalClasses: 18,
    presentClasses: 13,
    absentClasses: 4,
    lateClasses: 1,
    excusedClasses: 0,
    attendancePercentage: 72,
    status: "Average",
  },
  {
    subjectCode: "MATH 171",
    subjectName: "Discrete Math",
    facultyName: "SARIN, JAYSON RASOURIO",
    totalClasses: 16,
    presentClasses: 10,
    absentClasses: 5,
    lateClasses: 1,
    excusedClasses: 0,
    attendancePercentage: 63,
    status: "Poor",
  },
]

export function StudentAttendance() {
  const [attendanceRecords] = useState<StudentAttendanceRecord[]>(mockAttendanceRecords)
  const [subjectSummary] = useState<SubjectAttendanceSummary[]>(mockSubjectSummary)
  const [selectedSubject, setSelectedSubject] = useState<string>("All")
  const [selectedMonth, setSelectedMonth] = useState<string>("All")
  const [viewMode, setViewMode] = useState<string>("summary")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = 
      record.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "All" || record.subjectCode === selectedSubject
    const matchesMonth = selectedMonth === "All" || 
      new Date(record.date).getMonth() === parseInt(selectedMonth)
    return matchesSearch && matchesSubject && matchesMonth
  })

  const filteredSummary = subjectSummary.filter((summary) => {
    const matchesSearch = 
      summary.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "All" || summary.subjectCode === selectedSubject
    return matchesSearch && matchesSubject
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
        return "bg-orange-100 text-orange-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallAttendance = subjectSummary.length > 0 
    ? Math.round(subjectSummary.reduce((sum, s) => sum + s.attendancePercentage, 0) / subjectSummary.length)
    : 0

  const totalClasses = subjectSummary.reduce((sum, s) => sum + s.totalClasses, 0)
  const totalPresent = subjectSummary.reduce((sum, s) => sum + s.presentClasses, 0)
  const subjectsAtRisk = subjectSummary.filter(s => s.attendancePercentage < 75).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600">Track your attendance records and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
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
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-purple-600">{overallAttendance}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="font-semibold">2024-2025 (First Semester)</p>
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
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall %</p>
                <p className="text-2xl font-bold text-blue-600">{overallAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk Subjects</p>
                <p className="text-2xl font-bold text-red-600">{subjectsAtRisk}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Alert */}
      {subjectsAtRisk > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-900">Attendance Warning</h3>
                <p className="text-orange-800">
                  You have {subjectsAtRisk} subject{subjectsAtRisk > 1 ? 's' : ''} with attendance below 75%. 
                  Please improve your attendance to meet the minimum requirement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger>
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary View</SelectItem>
                <SelectItem value="detailed">Detailed Records</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Subjects</SelectItem>
                <SelectItem value="BRIDG 001">BRIDG 001 - Bridging Subject 1</SelectItem>
                <SelectItem value="GE 104">GE 104 - Mathematics</SelectItem>
                <SelectItem value="IT 170">IT 170 - Computer Fundamentals</SelectItem>
                <SelectItem value="IT 171">IT 171 - Programming</SelectItem>
                <SelectItem value="MATH 171">MATH 171 - Discrete Math</SelectItem>
              </SelectContent>
            </Select>
            {viewMode === "detailed" && (
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Months</SelectItem>
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary View */}
      {viewMode === "summary" && (
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
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
                  <TableRow key={summary.subjectCode}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{summary.subjectCode}</p>
                        <p className="text-sm text-gray-500">{summary.subjectName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{summary.facultyName}</TableCell>
                    <TableCell className="text-center">{summary.totalClasses}</TableCell>
                    <TableCell className="text-center text-green-600">{summary.presentClasses}</TableCell>
                    <TableCell className="text-center text-red-600">{summary.absentClasses}</TableCell>
                    <TableCell className="text-center text-yellow-600">{summary.lateClasses}</TableCell>
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

      {/* Detailed Records View */}
      {viewMode === "detailed" && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marked At</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{record.day}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.subjectCode}</p>
                        <p className="text-sm text-gray-500">{record.subjectName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{record.facultyName}</TableCell>
                    <TableCell className="text-sm">{record.timeSlot}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{record.markedAt || "-"}</TableCell>
                    <TableCell className="text-sm">{record.remarks || "-"}</TableCell>
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