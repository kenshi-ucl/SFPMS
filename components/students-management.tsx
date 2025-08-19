"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Download, Upload, Eye, Edit, Trash2, GraduationCap, Mail, Phone } from "lucide-react"

interface Student {
  id: string
  studentId: string
  registrationNumber: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone: string
  course: string
  department: string
  semester: number
  cgpa: number
  status: "Active" | "Inactive" | "Graduated" | "Dropped"
  admissionDate: string
  profilePhoto?: string
  address: string
  parentName: string
  parentPhone: string
  category: string
  bloodGroup: string
  attendance: number
}

const mockStudents: Student[] = [
  {
    id: "1",
    studentId: "STU001",
    registrationNumber: "REG2024001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1234567890",
    course: "Computer Science",
    department: "Computer Science",
    semester: 6,
    cgpa: 8.5,
    status: "Active",
    admissionDate: "2022-08-15",
    address: "123 Main St, City",
    parentName: "Robert Doe",
    parentPhone: "+1234567891",
    category: "General",
    bloodGroup: "O+",
    attendance: 92,
  },
  {
    id: "2",
    studentId: "STU002",
    registrationNumber: "REG2024002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@university.edu",
    phone: "+1234567892",
    course: "Engineering",
    department: "Mechanical Engineering",
    semester: 4,
    cgpa: 9.2,
    status: "Active",
    admissionDate: "2023-08-15",
    address: "456 Oak Ave, City",
    parentName: "Michael Smith",
    parentPhone: "+1234567893",
    category: "OBC",
    bloodGroup: "A+",
    attendance: 95,
  },
]

export function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newStudent, setNewStudent] = useState<Partial<Student>>({})

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    return matchesSearch && matchesCourse && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-yellow-100 text-yellow-800"
      case "Graduated":
        return "bg-blue-100 text-blue-800"
      case "Dropped":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AddStudentForm = () => {
    const steps = [
      { id: 1, title: "Personal Information" },
      { id: 2, title: "Contact Details" },
      { id: 3, title: "Academic Information" },
      { id: 4, title: "Parent/Guardian Details" },
      { id: 5, title: "Documents & Review" },
    ]

    const renderStepContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={newStudent.firstName || ""}
                    onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={newStudent.lastName || ""}
                    onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={newStudent.middleName || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, middleName: e.target.value })}
                  placeholder="Enter middle name (optional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newStudent.category || "General"}
                    onValueChange={(value) => setNewStudent({ ...newStudent, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={newStudent.bloodGroup || "O+"}
                    onValueChange={(value) => setNewStudent({ ...newStudent, bloodGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        case 2:
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newStudent.phone || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Current Address *</Label>
                <Input
                  id="address"
                  value={newStudent.address || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  placeholder="Enter current address"
                />
              </div>
            </div>
          )
        case 3:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course *</Label>
                  <Select
                    value={newStudent.course || "Computer Science"}
                    onValueChange={(value) => setNewStudent({ ...newStudent, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Arts & Sciences">Arts & Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={newStudent.department || "Computer Science"}
                    onValueChange={(value) => setNewStudent({ ...newStudent, department: value })}
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="semester">Current Semester *</Label>
                  <Select
                    value={newStudent.semester?.toString() || "1"}
                    onValueChange={(value) => setNewStudent({ ...newStudent, semester: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="admissionDate">Admission Date *</Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    value={newStudent.admissionDate || ""}
                    onChange={(e) => setNewStudent({ ...newStudent, admissionDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )
        case 4:
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  value={newStudent.parentName || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  placeholder="Enter parent/guardian name"
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Parent/Guardian Phone *</Label>
                <Input
                  id="parentPhone"
                  value={newStudent.parentPhone || ""}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                  placeholder="Enter parent/guardian phone"
                />
              </div>
            </div>
          )
        case 5:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Student Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {newStudent.firstName} {newStudent.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {newStudent.email}
                </div>
                <div>
                  <strong>Phone:</strong> {newStudent.phone}
                </div>
                <div>
                  <strong>Course:</strong> {newStudent.course}
                </div>
                <div>
                  <strong>Department:</strong> {newStudent.department}
                </div>
                <div>
                  <strong>Semester:</strong> {newStudent.semester}
                </div>
                <div>
                  <strong>Parent:</strong> {newStudent.parentName}
                </div>
                <div>
                  <strong>Category:</strong> {newStudent.category}
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step.id ? "text-purple-600" : "text-gray-500"}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-purple-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 5 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Add student logic here
                const studentId = `STU${String(students.length + 1).padStart(3, "0")}`
                const registrationNumber = `REG2024${String(students.length + 1).padStart(3, "0")}`
                const completeStudent: Student = {
                  ...newStudent,
                  id: String(students.length + 1),
                  studentId,
                  registrationNumber,
                  status: "Active",
                  cgpa: 0,
                  attendance: 0,
                } as Student
                setStudents([...students, completeStudent])
                setIsAddDialogOpen(false)
                setCurrentStep(1)
                setNewStudent({})
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Student
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage student profiles and academic information</p>
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
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <AddStudentForm />
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
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">1,400</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-green-600">1,320</p>
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
                <p className="text-sm font-medium text-gray-600">New Admissions</p>
                <p className="text-2xl font-bold text-blue-600">45</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Graduates</p>
                <p className="text-2xl font-bold text-purple-600">35</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-purple-600" />
              </div>
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
                  placeholder="Search students by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Arts & Sciences">Arts & Sciences</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Graduated">Graduated</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {student.studentId}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {student.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {student.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.course}</p>
                      <p className="text-xs text-gray-500">Semester {student.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">CGPA: {student.cgpa}</p>
                      <p className="text-xs text-gray-500">Attendance: {student.attendance}%</p>
                    </div>
                    <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                    <div className="flex gap-1">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
