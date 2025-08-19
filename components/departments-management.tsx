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
import { Plus, Search, Download, Upload, Eye, Edit, Trash2, Building2, Users, UserCheck, Calendar } from "lucide-react"

interface Department {
  id: string
  departmentCode: string
  departmentName: string
  departmentType: "Academic" | "Administrative"
  establishmentDate: string
  headFacultyId?: string
  headFacultyName?: string
  contactEmail: string
  contactPhone: string
  visionStatement: string
  missionStatement: string
  facultyCapacity: number
  studentCapacity: number
  currentFaculty: number
  currentStudents: number
  budgetAllocated: number
  isActive: boolean
}

const mockDepartments: Department[] = [
  {
    id: "1",
    departmentCode: "CS",
    departmentName: "Computer Science",
    departmentType: "Academic",
    establishmentDate: "1995-08-15",
    headFacultyId: "1",
    headFacultyName: "Dr. John Smith",
    contactEmail: "cs@university.edu",
    contactPhone: "+1234567890",
    visionStatement: "To be a leading department in computer science education and research.",
    missionStatement: "To provide quality education and conduct cutting-edge research in computer science.",
    facultyCapacity: 30,
    studentCapacity: 500,
    currentFaculty: 25,
    currentStudents: 450,
    budgetAllocated: 2500000,
    isActive: true,
  },
  {
    id: "2",
    departmentCode: "ME",
    departmentName: "Mechanical Engineering",
    departmentType: "Academic",
    establishmentDate: "1990-08-15",
    headFacultyId: "2",
    headFacultyName: "Dr. Sarah Johnson",
    contactEmail: "me@university.edu",
    contactPhone: "+1234567891",
    visionStatement: "To excel in mechanical engineering education and innovation.",
    missionStatement: "To prepare students for successful careers in mechanical engineering.",
    facultyCapacity: 25,
    studentCapacity: 400,
    currentFaculty: 22,
    currentStudents: 380,
    budgetAllocated: 2200000,
    isActive: true,
  },
]

export function DepartmentsManagement() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Academic") // Updated default value
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    departmentType: "Academic",
    isActive: true,
  })

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || dept.departmentType === selectedType
    return matchesSearch && matchesType
  })

  const getUtilizationColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments Management</h1>
          <p className="text-gray-600">Manage academic and administrative departments</p>
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
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departmentCode">Department Code *</Label>
                    <Input
                      id="departmentCode"
                      value={newDepartment.departmentCode || ""}
                      onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value })}
                      placeholder="Enter department code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="departmentName">Department Name *</Label>
                    <Input
                      id="departmentName"
                      value={newDepartment.departmentName || ""}
                      onChange={(e) => setNewDepartment({ ...newDepartment, departmentName: e.target.value })}
                      placeholder="Enter department name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departmentType">Department Type *</Label>
                    <Select
                      onValueChange={(value: "Academic" | "Administrative") =>
                        setNewDepartment({ ...newDepartment, departmentType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="establishmentDate">Establishment Date *</Label>
                    <Input
                      id="establishmentDate"
                      type="date"
                      value={newDepartment.establishmentDate || ""}
                      onChange={(e) => setNewDepartment({ ...newDepartment, establishmentDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={newDepartment.contactEmail || ""}
                      onChange={(e) => setNewDepartment({ ...newDepartment, contactEmail: e.target.value })}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      value={newDepartment.contactPhone || ""}
                      onChange={(e) => setNewDepartment({ ...newDepartment, contactPhone: e.target.value })}
                      placeholder="Enter contact phone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facultyCapacity">Faculty Capacity</Label>
                    <Input
                      id="facultyCapacity"
                      type="number"
                      value={newDepartment.facultyCapacity || ""}
                      onChange={(e) =>
                        setNewDepartment({ ...newDepartment, facultyCapacity: Number.parseInt(e.target.value) })
                      }
                      placeholder="Enter faculty capacity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentCapacity">Student Capacity</Label>
                    <Input
                      id="studentCapacity"
                      type="number"
                      value={newDepartment.studentCapacity || ""}
                      onChange={(e) =>
                        setNewDepartment({ ...newDepartment, studentCapacity: Number.parseInt(e.target.value) })
                      }
                      placeholder="Enter student capacity"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="visionStatement">Vision Statement</Label>
                  <Textarea
                    id="visionStatement"
                    value={newDepartment.visionStatement || ""}
                    onChange={(e) => setNewDepartment({ ...newDepartment, visionStatement: e.target.value })}
                    placeholder="Enter vision statement"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    value={newDepartment.missionStatement || ""}
                    onChange={(e) => setNewDepartment({ ...newDepartment, missionStatement: e.target.value })}
                    placeholder="Enter mission statement"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const departmentCode = newDepartment.departmentCode?.toUpperCase() || ""
                      const completeDepartment: Department = {
                        ...newDepartment,
                        id: String(departments.length + 1),
                        departmentCode,
                        currentFaculty: 0,
                        currentStudents: 0,
                        budgetAllocated: 0,
                      } as Department
                      setDepartments([...departments, completeDepartment])
                      setIsAddDialogOpen(false)
                      setNewDepartment({
                        departmentType: "Academic",
                        isActive: true,
                      })
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Department
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
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Academic Departments</p>
                <p className="text-2xl font-bold text-blue-600">
                  {departments.filter((d) => d.departmentType === "Academic").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-green-600">
                  {departments.reduce((sum, d) => sum + d.currentFaculty, 0)}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">
                  {departments.reduce((sum, d) => sum + d.currentStudents, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search departments by name, code, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Administrative">Administrative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{department.departmentName}</CardTitle>
                  <p className="text-sm text-gray-600">Code: {department.departmentCode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={department.departmentType === "Academic" ? "default" : "secondary"}>
                    {department.departmentType}
                  </Badge>
                  <Badge variant={department.isActive ? "default" : "destructive"}>
                    {department.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Department Head */}
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  <strong>Head:</strong> {department.headFacultyName || "Not Assigned"}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span>📧</span>
                  <span>{department.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>📞</span>
                  <span>{department.contactPhone}</span>
                </div>
              </div>

              {/* Capacity Utilization */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Faculty Utilization</span>
                  <span
                    className={`text-sm font-medium ${getUtilizationColor(department.currentFaculty, department.facultyCapacity)}`}
                  >
                    {department.currentFaculty}/{department.facultyCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((department.currentFaculty / department.facultyCapacity) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Student Utilization</span>
                  <span
                    className={`text-sm font-medium ${getUtilizationColor(department.currentStudents, department.studentCapacity)}`}
                  >
                    {department.currentStudents}/{department.studentCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((department.currentStudents / department.studentCapacity) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Budget */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Allocated</span>
                <span className="text-sm font-medium text-green-600">
                  ${department.budgetAllocated.toLocaleString()}
                </span>
              </div>

              {/* Establishment Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Established: {new Date(department.establishmentDate).toLocaleDateString()}</span>
              </div>

              {/* Vision Statement */}
              {department.visionStatement && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-600 mb-1">Vision</p>
                  <p className="text-sm text-gray-800">{department.visionStatement}</p>
                </div>
              )}

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
