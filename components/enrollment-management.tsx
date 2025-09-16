"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, CheckCircle, XCircle, Clock, FileText, Download } from "lucide-react"

interface EnrollmentApplication {
  id: string
  applicationNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
  course: string
  department: string
  academicYear: string
  admissionType: string
  status: "Pending" | "Under Review" | "Approved" | "Rejected" | "Documents Required"
  submissionDate: string
  reviewedBy?: string
  reviewDate?: string
  documents: {
    submitted: number
    total: number
  }
  feeStatus: "Pending" | "Paid" | "Partial"
}

const mockApplications: EnrollmentApplication[] = [
  {
    id: "1",
    applicationNumber: "APP2024001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    course: "B.Tech Computer Science",
    department: "Computer Science",
    academicYear: "2024-2025",
    admissionType: "Regular",
    status: "Pending",
    submissionDate: "2024-12-18",
    documents: { submitted: 7, total: 8 },
    feeStatus: "Pending",
  },
  {
    id: "2",
    applicationNumber: "APP2024002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@email.com",
    phone: "+1234567891",
    course: "Bachelor of Business Administration",
    department: "Business Administration",
    academicYear: "2024-2025",
    admissionType: "Regular",
    status: "Approved",
    submissionDate: "2024-12-17",
    reviewedBy: "Admin User",
    reviewDate: "2024-12-18",
    documents: { submitted: 8, total: 8 },
    feeStatus: "Paid",
  },
  {
    id: "3",
    applicationNumber: "APP2024003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@email.com",
    phone: "+1234567892",
    course: "B.Tech Mechanical Engineering",
    department: "Mechanical Engineering",
    academicYear: "2024-2025",
    admissionType: "Lateral",
    status: "Documents Required",
    submissionDate: "2024-12-16",
    documents: { submitted: 6, total: 8 },
    feeStatus: "Pending",
  },
]

export function EnrollmentManagement() {
  const [applications, setApplications] = useState<EnrollmentApplication[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("Approved")
  const [selectedCourse, setSelectedCourse] = useState<string>("All")
  const [selectedApplication, setSelectedApplication] = useState<EnrollmentApplication | null>(null)

  // Focus on approved applications for admin management
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || app.status === selectedStatus
    const matchesCourse = selectedCourse === "All" || app.course.includes(selectedCourse)
    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Documents Required":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Partial":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateApplicationStatus = (id: string, newStatus: EnrollmentApplication["status"]) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              reviewedBy: "Current Admin",
              reviewDate: new Date().toISOString().split('T')[0]
            }
          : app
      )
    )
  }

  const ApplicationDetailsDialog = ({ application }: { application: EnrollmentApplication }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Details - {application.applicationNumber}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Application Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Application Number:</strong> {application.applicationNumber}</p>
                  <p><strong>Status:</strong> <Badge className={getStatusColor(application.status)}>{application.status}</Badge></p>
                  <p><strong>Submission Date:</strong> {application.submissionDate}</p>
                  <p><strong>Fee Status:</strong> <Badge className={getFeeStatusColor(application.feeStatus)}>{application.feeStatus}</Badge></p>
                  {application.reviewedBy && (
                    <>
                      <p><strong>Reviewed By:</strong> {application.reviewedBy}</p>
                      <p><strong>Review Date:</strong> {application.reviewDate}</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Course:</strong> {application.course}</p>
                  <p><strong>Department:</strong> {application.department}</p>
                  <p><strong>Academic Year:</strong> {application.academicYear}</p>
                  <p><strong>Admission Type:</strong> {application.admissionType}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => updateApplicationStatus(application.id, "Under Review")}
                variant="outline"
                size="sm"
                disabled
              >
                <Clock className="w-4 h-4 mr-2" />
                Student Enrolled
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone:</strong> {application.phone}</p>
                <p><strong>Date of Birth:</strong> 15/06/2000</p>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Category:</strong> General</p>
                <p><strong>Blood Group:</strong> O+</p>
                <p><strong>Nationality:</strong> Indian</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Academic Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Previous Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>School:</strong> ABC High School</p>
                    <p><strong>Board:</strong> CBSE</p>
                    <p><strong>Year of Passing:</strong> 2022</p>
                    <p><strong>Percentage:</strong> 85.5%</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Entrance Exam</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Exam:</strong> JEE Main</p>
                    <p><strong>Score:</strong> 250</p>
                    <p><strong>Rank:</strong> 15000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documents Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Progress:</span>
                    <span className="text-sm font-medium">
                      {application.documents.submitted}/{application.documents.total} documents submitted
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(application.documents.submitted / application.documents.total) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    {[
                      "Birth Certificate",
                      "Academic Marksheets",
                      "Transfer Certificate",
                      "Character Certificate",
                      "Caste Certificate",
                      "Income Certificate",
                      "ID Proof",
                      "Passport Photos"
                    ].map((doc, index) => (
                      <div key={doc} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{doc}</span>
                        <Badge variant={index < application.documents.submitted ? "default" : "secondary"}>
                          {index < application.documents.submitted ? "✓" : "✗"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Approved Enrollments</h1>
          <p className="text-gray-600">Manage approved student enrollments and track their progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Enrollments
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === "Approved").length}
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
                <p className="text-sm font-medium text-gray-600">Fees Pending</p>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === "Approved" && app.feeStatus === "Pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fees Collected</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.feeStatus === "Paid").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Complete</p>
                <p className="text-2xl font-bold text-blue-600">
                  {applications.filter(app => app.documents.submitted === app.documents.total).length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
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
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Documents Required">Documents Required</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Courses</SelectItem>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="BBA">BBA</SelectItem>
                <SelectItem value="B.Sc">B.Sc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{application.firstName} {application.lastName}</p>
                      <p className="text-sm text-gray-500">{application.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{application.course}</p>
                      <p className="text-sm text-gray-500">{application.admissionType}</p>
                    </div>
                  </TableCell>
                  <TableCell>{application.submissionDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{application.documents.submitted}/{application.documents.total}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(application.documents.submitted / application.documents.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getFeeStatusColor(application.feeStatus)}>
                      {application.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <ApplicationDetailsDialog application={application} />
                    </div>
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