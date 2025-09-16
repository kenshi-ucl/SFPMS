"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Clock, Calendar, FileText, Plus, Eye } from "lucide-react"

interface CourseAssignment {
  id: string
  courseCode: string
  courseName: string
  semester: number
  section: string
  credits: number
  totalStudents: number
  schedule: {
    day: string
    timeSlot: string
    room: string
  }[]
  syllabus: {
    unit: number
    topic: string
    hours: number
    completed: boolean
  }[]
  assessments: {
    type: string
    date: string
    maxMarks: number
    completed: boolean
  }[]
}

const mockCourses: CourseAssignment[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    semester: 3,
    section: "A",
    credits: 4,
    totalStudents: 45,
    schedule: [
      { day: "Monday", timeSlot: "09:00 AM - 10:30 AM", room: "Lab 101" },
      { day: "Wednesday", timeSlot: "09:00 AM - 10:30 AM", room: "Lab 101" },
      { day: "Friday", timeSlot: "02:00 PM - 03:30 PM", room: "Room 201" },
    ],
    syllabus: [
      { unit: 1, topic: "Introduction to Data Structures", hours: 8, completed: true },
      { unit: 2, topic: "Arrays and Linked Lists", hours: 12, completed: true },
      { unit: 3, topic: "Stacks and Queues", hours: 10, completed: false },
      { unit: 4, topic: "Trees and Graphs", hours: 15, completed: false },
      { unit: 5, topic: "Sorting and Searching", hours: 10, completed: false },
    ],
    assessments: [
      { type: "Quiz 1", date: "2024-01-15", maxMarks: 20, completed: true },
      { type: "Mid-term Exam", date: "2024-02-15", maxMarks: 50, completed: true },
      { type: "Assignment 1", date: "2024-03-01", maxMarks: 30, completed: false },
      { type: "Final Exam", date: "2024-04-15", maxMarks: 100, completed: false },
    ],
  },
  {
    id: "2",
    courseCode: "CS201",
    courseName: "Database Management Systems",
    semester: 4,
    section: "B",
    credits: 3,
    totalStudents: 38,
    schedule: [
      { day: "Tuesday", timeSlot: "11:00 AM - 12:30 PM", room: "Room 301" },
      { day: "Thursday", timeSlot: "11:00 AM - 12:30 PM", room: "Lab 203" },
    ],
    syllabus: [
      { unit: 1, topic: "Introduction to DBMS", hours: 6, completed: true },
      { unit: 2, topic: "Relational Model", hours: 8, completed: true },
      { unit: 3, topic: "SQL Queries", hours: 12, completed: true },
      { unit: 4, topic: "Normalization", hours: 8, completed: false },
      { unit: 5, topic: "Transaction Management", hours: 10, completed: false },
    ],
    assessments: [
      { type: "Quiz 1", date: "2024-01-20", maxMarks: 25, completed: true },
      { type: "Practical Exam", date: "2024-02-20", maxMarks: 40, completed: true },
      { type: "Project", date: "2024-03-20", maxMarks: 35, completed: false },
      { type: "Final Exam", date: "2024-04-20", maxMarks: 100, completed: false },
    ],
  },
]

export function FacultyCourses() {
  const [courses] = useState<CourseAssignment[]>(mockCourses)
  const [selectedSemester, setSelectedSemester] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "All" || course.semester.toString() === selectedSemester
    return matchesSearch && matchesSemester
  })

  const getSyllabusProgress = (syllabus: any[]) => {
    const completed = syllabus.filter(unit => unit.completed).length
    return Math.round((completed / syllabus.length) * 100)
  }

  const getAssessmentProgress = (assessments: any[]) => {
    const completed = assessments.filter(assessment => assessment.completed).length
    return Math.round((completed / assessments.length) * 100)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">Manage your assigned courses and track progress</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Request New Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">
                  {courses.reduce((sum, course) => sum + course.totalStudents, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teaching Hours</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-600">68%</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by course code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Semesters</SelectItem>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{course.courseCode} - {course.courseName}</CardTitle>
                  <div className="flex gap-4 mt-2">
                    <Badge variant="secondary">Semester {course.semester}</Badge>
                    <Badge variant="outline">Section {course.section}</Badge>
                    <Badge variant="outline">{course.credits} Credits</Badge>
                    <Badge variant="outline">{course.totalStudents} Students</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="schedule" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {course.schedule.map((session, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{session.day}</span>
                        </div>
                        <p className="text-sm text-gray-600">{session.timeSlot}</p>
                        <p className="text-sm text-gray-500">{session.room}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="syllabus" className="space-y-4">
                  <div className="space-y-3">
                    {course.syllabus.map((unit) => (
                      <div key={unit.unit} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            unit.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {unit.unit}
                          </div>
                          <div>
                            <p className="font-medium">{unit.topic}</p>
                            <p className="text-sm text-gray-500">{unit.hours} hours</p>
                          </div>
                        </div>
                        <Badge variant={unit.completed ? "default" : "secondary"}>
                          {unit.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="assessments" className="space-y-4">
                  <div className="space-y-3">
                    {course.assessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">{assessment.type}</p>
                            <p className="text-sm text-gray-500">
                              Due: {new Date(assessment.date).toLocaleDateString()} • Max: {assessment.maxMarks} marks
                            </p>
                          </div>
                        </div>
                        <Badge variant={assessment.completed ? "default" : "secondary"}>
                          {assessment.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="progress" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Syllabus Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed Topics</span>
                          <span>{getSyllabusProgress(course.syllabus)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${getSyllabusProgress(course.syllabus)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Assessment Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed Assessments</span>
                          <span>{getAssessmentProgress(course.assessments)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${getAssessmentProgress(course.assessments)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 