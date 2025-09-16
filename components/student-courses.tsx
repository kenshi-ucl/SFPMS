"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, User, Clock, MapPin, Calendar, Award, Search, Eye, Download, Users, Target, BarChart3 } from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  description: string
  credits: number
  type: "Core" | "Elective" | "General Education" | "Major"
  semester: string
  facultyName: string
  facultyId: string
  schedule: {
    day: string
    timeStart: string
    timeEnd: string
    room: string
    building: string
  }[]
  prerequisites: string[]
  syllabus: string[]
  assessments: {
    type: string
    weight: number
    description: string
  }[]
  currentGrade?: string
  attendance?: number
  status: "Enrolled" | "Completed" | "In Progress" | "Failed"
  enrollmentDate: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "BRIDG 001",
    name: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    description: "This course covers fundamental mathematical concepts including algebra, trigonometry, and basic calculus to prepare students for advanced mathematical studies.",
    credits: 3,
    type: "Core",
    semester: "First Semester 2024-2025",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    facultyId: "f_001",
    schedule: [
      {
        day: "Monday",
        timeStart: "08:00",
        timeEnd: "09:30",
        room: "Room 101",
        building: "Engineering Building"
      },
      {
        day: "Wednesday",
        timeStart: "08:00",
        timeEnd: "09:30",
        room: "Room 101",
        building: "Engineering Building"
      }
    ],
    prerequisites: [],
    syllabus: [
      "Basic Algebra and Linear Equations",
      "Quadratic Functions and Polynomials",
      "Trigonometric Functions",
      "Limits and Continuity",
      "Introduction to Derivatives",
      "Basic Integration"
    ],
    assessments: [
      { type: "Midterm Exam", weight: 30, description: "Comprehensive exam covering first half of semester" },
      { type: "Final Exam", weight: 40, description: "Comprehensive final examination" },
      { type: "Quizzes", weight: 20, description: "Regular quizzes throughout the semester" },
      { type: "Assignments", weight: 10, description: "Homework and problem sets" }
    ],
    currentGrade: "A",
    attendance: 95,
    status: "In Progress",
    enrollmentDate: "2024-08-15"
  },
  {
    id: "2",
    code: "GE 104",
    name: "Mathematics in the Modern World",
    description: "An exploration of mathematical concepts and their applications in various fields including statistics, probability, logic, and mathematical modeling.",
    credits: 3,
    type: "General Education",
    semester: "First Semester 2024-2025",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    facultyId: "f_002",
    schedule: [
      {
        day: "Monday",
        timeStart: "10:00",
        timeEnd: "11:30",
        room: "Room 205",
        building: "Main Building"
      },
      {
        day: "Friday",
        timeStart: "10:00",
        timeEnd: "11:30",
        room: "Room 205",
        building: "Main Building"
      }
    ],
    prerequisites: [],
    syllabus: [
      "Number Systems and Mathematical Logic",
      "Statistics and Data Analysis",
      "Probability Theory",
      "Mathematical Modeling",
      "Linear Programming",
      "Game Theory Applications"
    ],
    assessments: [
      { type: "Midterm Exam", weight: 35, description: "Midterm examination" },
      { type: "Final Exam", weight: 35, description: "Final comprehensive exam" },
      { type: "Projects", weight: 20, description: "Mathematical modeling projects" },
      { type: "Participation", weight: 10, description: "Class participation and discussion" }
    ],
    currentGrade: "A-",
    attendance: 92,
    status: "In Progress",
    enrollmentDate: "2024-08-15"
  },
  {
    id: "3",
    code: "IT 170",
    name: "Computer Fundamentals and Operations",
    description: "Introduction to computer systems, hardware components, operating systems, and basic computer operations for IT students.",
    credits: 3,
    type: "Major",
    semester: "First Semester 2024-2025",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    facultyId: "f_003",
    schedule: [
      {
        day: "Monday",
        timeStart: "13:00",
        timeEnd: "14:30",
        room: "Computer Lab 1",
        building: "IT Building"
      },
      {
        day: "Thursday",
        timeStart: "13:00",
        timeEnd: "14:30",
        room: "Computer Lab 1",
        building: "IT Building"
      }
    ],
    prerequisites: [],
    syllabus: [
      "Computer Hardware Components",
      "Operating Systems Fundamentals",
      "File Management and Organization",
      "Network Basics",
      "Computer Security Fundamentals",
      "Troubleshooting Common Issues"
    ],
    assessments: [
      { type: "Practical Exam", weight: 40, description: "Hands-on computer operations exam" },
      { type: "Written Exam", weight: 30, description: "Theory and concepts examination" },
      { type: "Laboratory Work", weight: 20, description: "Weekly lab exercises" },
      { type: "Assignments", weight: 10, description: "Research and documentation tasks" }
    ],
    currentGrade: "B+",
    attendance: 88,
    status: "In Progress",
    enrollmentDate: "2024-08-15"
  },
  {
    id: "4",
    code: "IT 171",
    name: "Fundamentals of Programming and Problem Solving 1",
    description: "Introduction to programming concepts, problem-solving techniques, and programming languages for beginners.",
    credits: 3,
    type: "Major",
    semester: "First Semester 2024-2025",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    facultyId: "f_004",
    schedule: [
      {
        day: "Tuesday",
        timeStart: "08:00",
        timeEnd: "09:30",
        room: "Computer Lab 2",
        building: "IT Building"
      },
      {
        day: "Friday",
        timeStart: "08:00",
        timeEnd: "09:30",
        room: "Computer Lab 2",
        building: "IT Building"
      }
    ],
    prerequisites: [],
    syllabus: [
      "Problem Solving Techniques",
      "Algorithm Development",
      "Introduction to Programming Languages",
      "Variables and Data Types",
      "Control Structures",
      "Functions and Modular Programming",
      "Arrays and Basic Data Structures",
      "Debugging and Testing"
    ],
    assessments: [
      { type: "Programming Exams", weight: 50, description: "Coding examinations" },
      { type: "Projects", weight: 30, description: "Programming projects and applications" },
      { type: "Laboratory Exercises", weight: 15, description: "Weekly coding exercises" },
      { type: "Quizzes", weight: 5, description: "Concept check quizzes" }
    ],
    currentGrade: "B",
    attendance: 90,
    status: "In Progress",
    enrollmentDate: "2024-08-15"
  },
  {
    id: "5",
    code: "GE 105",
    name: "Purposive Communication",
    description: "Development of communication skills for academic and professional purposes, focusing on written and oral communication.",
    credits: 3,
    type: "General Education",
    semester: "First Semester 2024-2025",
    facultyName: "TITULAR, BRISBANE QUIROG",
    facultyId: "f_005",
    schedule: [
      {
        day: "Tuesday",
        timeStart: "10:00",
        timeEnd: "11:30",
        room: "Room 303",
        building: "Liberal Arts Building"
      },
      {
        day: "Thursday",
        timeStart: "10:00",
        timeEnd: "11:30",
        room: "Room 303",
        building: "Liberal Arts Building"
      }
    ],
    prerequisites: [],
    syllabus: [
      "Communication Process and Models",
      "Written Communication Skills",
      "Oral Presentation Techniques",
      "Research and Documentation",
      "Business Communication",
      "Digital Communication"
    ],
    assessments: [
      { type: "Final Project", weight: 25, description: "Major communication project" },
      { type: "Oral Presentations", weight: 25, description: "Speaking assignments" },
      { type: "Written Assignments", weight: 25, description: "Essays and reports" },
      { type: "Participation", weight: 15, description: "Class participation and discussions" },
      { type: "Quizzes", weight: 10, description: "Reading comprehension quizzes" }
    ],
    currentGrade: "A",
    attendance: 96,
    status: "In Progress",
    enrollmentDate: "2024-08-15"
  }
]

export function StudentCourses() {
  const [courses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || course.type === selectedType
    const matchesStatus = selectedStatus === "All" || course.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Core":
        return "bg-purple-100 text-purple-800"
      case "Major":
        return "bg-blue-100 text-blue-800"
      case "Elective":
        return "bg-green-100 text-green-800"
      case "General Education":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "bg-green-100 text-green-800"
    if (grade.startsWith('B')) return "bg-blue-100 text-blue-800"
    if (grade.startsWith('C')) return "bg-yellow-100 text-yellow-800"
    if (grade.startsWith('D')) return "bg-orange-100 text-orange-800"
    if (grade === 'F') return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
  const averageAttendance = courses.reduce((sum, course) => sum + (course.attendance || 0), 0) / courses.length
  const completedCourses = courses.filter(c => c.status === "Completed").length
  const inProgressCourses = courses.filter(c => c.status === "In Progress").length

  const CourseDetailsDialog = ({ course }: { course: Course }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course.code} - {course.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-sm">{course.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Credits</p>
                      <p className="font-medium">{course.credits}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <Badge className={getTypeColor(course.type)}>{course.type}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prerequisites</p>
                    <p className="text-sm">{course.prerequisites.length > 0 ? course.prerequisites.join(", ") : "None"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Grade</p>
                      <Badge className={getGradeColor(course.currentGrade || "")}>
                        {course.currentGrade || "Not Available"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Attendance</p>
                      <p className="font-medium">{course.attendance || 0}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Date</p>
                    <p className="text-sm">{new Date(course.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Faculty Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{course.facultyName}</p>
                    <p className="text-sm text-gray-600">Course Instructor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Class Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.schedule.map((sched, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sched.day}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{sched.timeStart} - {sched.timeEnd}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{sched.room}</p>
                              <p className="text-sm text-gray-500">{sched.building}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="syllabus">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.syllabus.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{topic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assessment Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Type</TableHead>
                      <TableHead className="text-center">Weight (%)</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.assessments.map((assessment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assessment.type}</TableCell>
                        <TableCell className="text-center">{assessment.weight}%</TableCell>
                        <TableCell>{assessment.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">View and manage your enrolled courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Course List
          </Button>
        </div>
      </div>

      {/* Student Info Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">JOHN DOE</p>
                <p className="text-sm text-gray-600">BSIT-2024-001</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-green-600">{totalCredits}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses Enrolled</p>
              <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(averageAttendance)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{inProgressCourses}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCourses}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Hours</p>
                <p className="text-2xl font-bold text-purple-600">{totalCredits}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Course type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="General Education">General Education</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Enrolled">Enrolled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course List ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.code}</p>
                      <p className="text-sm text-gray-500">{course.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{course.facultyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(course.type)}>
                      {course.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                  <TableCell className="text-center">
                    {course.currentGrade ? (
                      <Badge className={getGradeColor(course.currentGrade)}>
                        {course.currentGrade}
                      </Badge>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{course.attendance || 0}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (course.attendance || 0) >= 85 ? 'bg-green-500' :
                            (course.attendance || 0) >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${course.attendance || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CourseDetailsDialog course={course} />
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