"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Download, Upload, Eye, Edit, Trash2, BookOpen, Clock, Users, Award } from "lucide-react"

interface Course {
  id: string
  courseCode: string
  courseName: string
  courseType: "Core" | "Elective" | "Lab" | "Project"
  credits: number
  duration: number
  departmentId: string
  departmentName: string
  description: string
  prerequisites: string[]
  learningOutcomes: string[]
  isActive: boolean
  enrolledStudents: number
  maxCapacity: number
  facultyAssigned?: string
  createdAt: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    courseType: "Core",
    credits: 4,
    duration: 16,
    departmentId: "1",
    departmentName: "Computer Science",
    description: "Fundamental concepts of computer science including programming, algorithms, and data structures.",
    prerequisites: [],
    learningOutcomes: [
      "Understand basic programming concepts",
      "Implement simple algorithms",
      "Work with basic data structures",
    ],
    isActive: true,
    enrolledStudents: 45,
    maxCapacity: 50,
    facultyAssigned: "Dr. John Smith",
    createdAt: "2023-08-01T00:00:00Z",
  },
  {
    id: "2",
    courseCode: "CS201",
    courseName: "Data Structures and Algorithms",
    courseType: "Core",
    credits: 4,
    duration: 16,
    departmentId: "1",
    departmentName: "Computer Science",
    description: "Advanced data structures and algorithm design and analysis.",
    prerequisites: ["CS101"],
    learningOutcomes: [
      "Implement complex data structures",
      "Analyze algorithm complexity",
      "Design efficient algorithms",
    ],
    isActive: true,
    enrolledStudents: 38,
    maxCapacity: 40,
    facultyAssigned: "Dr. Sarah Wilson",
    createdAt: "2023-08-01T00:00:00Z",
  },
]

export function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    courseType: "Core",
    credits: 3,
    duration: 16,
    isActive: true,
    prerequisites: [],
    learningOutcomes: [],
    enrolledStudents: 0,
    maxCapacity: 50,
  })

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || course.departmentName === selectedDepartment
    const matchesType = selectedType === "all" || course.courseType === selectedType
    return matchesSearch && matchesDepartment && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Core":
        return "bg-purple-100 text-purple-800"
      case "Elective":
        return "bg-blue-100 text-blue-800"
      case "Lab":
        return "bg-green-100 text-green-800"
      case "Project":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses Management</h1>
          <p className="text-gray-600">Manage academic courses and curriculum</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Plus className="w-4 h-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      value={newCourse.courseCode || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                      placeholder="e.g., CS101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      value={newCourse.courseName || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                      placeholder="Enter course name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="courseType">Course Type *</Label>
                    <Select
                      value={newCourse.courseType || "Core"}
                      onValueChange={(value: "Core" | "Elective" | "Lab" | "Project") =>
                        setNewCourse({ ...newCourse, courseType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Core">Core</SelectItem>
                        <SelectItem value="Elective">Elective</SelectItem>
                        <SelectItem value="Lab">Lab</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="credits">Credits *</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="1"
                      max="6"
                      value={newCourse.credits || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) })}
                      placeholder="Credits"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (weeks) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="52"
                      value={newCourse.duration || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: Number.parseInt(e.target.value) })}
                      placeholder="Duration"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="departmentName">Department *</Label>
                  <Select
                    value={newCourse.departmentName || "Computer Science"}
                    onValueChange={(value) => setNewCourse({ ...newCourse, departmentName: value, departmentId: "1" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Business Administration">Business Administration</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description || ""}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxCapacity">Max Capacity</Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      min="1"
                      value={newCourse.maxCapacity || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, maxCapacity: Number.parseInt(e.target.value) })}
                      placeholder="Maximum students"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyAssigned">Faculty Assigned</Label>
                    <Input
                      id="facultyAssigned"
                      value={newCourse.facultyAssigned || ""}
                      onChange={(e) => setNewCourse({ ...newCourse, facultyAssigned: e.target.value })}
                      placeholder="Assigned faculty name"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newCourse.isActive || false}
                    onChange={(e) => setNewCourse({ ...newCourse, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active Course</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const completeCourse: Course = {
                        ...newCourse,
                        id: String(courses.length + 1),
                        createdAt: new Date().toISOString(),
                        prerequisites: [],
                        learningOutcomes: [],
                      } as Course
                      setCourses([...courses, completeCourse])
                      setIsAddDialogOpen(false)
                      setNewCourse({
                        courseType: "Core",
                        credits: 3,
                        duration: 16,
                        isActive: true,
                        prerequisites: [],
                        learningOutcomes: [],
                        enrolledStudents: 0,
                        maxCapacity: 50,
                      })
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Course
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-green-600">{courses.filter((c) => c.isActive).length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-blue-600">
                  {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
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
                <p className="text-sm font-medium text-gray-600">Avg Credits</p>
                <p className="text-2xl font-bold text-orange-600">
                  {courses.length > 0
                    ? (courses.reduce((sum, c) => sum + c.credits, 0) / courses.length).toFixed(1)
                    : 0}
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses by name, code, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                <SelectItem value="Business Administration">Business Administration</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
                <SelectItem value="Project">Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.courseName}</CardTitle>
                  <p className="text-sm text-gray-600">Code: {course.courseCode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(course.courseType)}>{course.courseType}</Badge>
                  <Badge variant={course.isActive ? "default" : "destructive"}>
                    {course.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Course Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span>{course.credits} Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{course.duration} weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className={getCapacityColor(course.enrolledStudents, course.maxCapacity)}>
                    {course.enrolledStudents}/{course.maxCapacity}
                  </span>
                </div>
              </div>

              {/* Department and Faculty */}
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Department:</strong> {course.departmentName}
                </div>
                {course.facultyAssigned && (
                  <div>
                    <strong>Faculty:</strong> {course.facultyAssigned}
                  </div>
                )}
              </div>

              {/* Description */}
              {course.description && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-800">{course.description}</p>
                </div>
              )}

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Prerequisites</p>
                  <div className="flex flex-wrap gap-1">
                    {course.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Enrollment Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Enrollment</span>
                  <span className={getCapacityColor(course.enrolledStudents, course.maxCapacity)}>
                    {Math.round((course.enrolledStudents / course.maxCapacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((course.enrolledStudents / course.maxCapacity) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
