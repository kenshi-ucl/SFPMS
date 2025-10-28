import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, BookOpen, AlertCircle, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export function CoursesManagement() {
  const [courses, setCourses] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department_id: '',
    description: '',
    status: 'active',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  
  const { user: currentUser, isAdmin, isLoading: authLoading } = useAuth()

  // Fetch departments on mount
  useEffect(() => {
    if (!authLoading && currentUser) {
      fetchDepartments()
    }
  }, [authLoading, currentUser])

  // Fetch courses when auth is loaded AND user is admin
  useEffect(() => {
    if (!authLoading && currentUser && isAdmin()) {
      fetchCourses()
    }
  }, [currentPage, selectedStatus, selectedDepartment, searchTerm, authLoading, currentUser])

  const fetchDepartments = async () => {
    try {
      const response = await apiClient.getDepartments({ per_page: 100 })
      setDepartments(response.data || [])
    } catch (error) {
      toast.error(error.message || 'Failed to fetch departments')
      setDepartments([])
    }
  }

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        per_page: 15,
      }
      
      if (selectedStatus !== 'all') {
        params.status = selectedStatus
      }
      
      if (selectedDepartment !== 'all') {
        params.department_id = selectedDepartment
      }
      
      if (searchTerm.trim()) {
        params.search = searchTerm
      }

      const response = await apiClient.getCourses(params)
      
      setCourses(response.data || [])
      setTotalPages(response.meta?.last_page || 1)
      setTotalCourses(response.count || 0)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch courses')
      setCourses([])
      setTotalCourses(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCourse = async (e) => {
    e.preventDefault()
    if (submitting) return

    // Validate form
    if (!formData.name.trim() || !formData.department_id) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)

      await apiClient.createCourse(formData)
      
      toast.success('Course created successfully')
      setIsAddDialogOpen(false)
      resetForm()
      fetchCourses()
    } catch (error) {
      console.error('Failed to create course:', error)
      toast.error(error.message || 'Failed to create course')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault()
    if (submitting || !selectedCourse) return

    // Validate form
    if (!formData.name.trim() || !formData.department_id) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)

      await apiClient.updateCourse(selectedCourse.id, formData)
      
      toast.success('Course updated successfully')
      setIsEditDialogOpen(false)
      resetForm()
      fetchCourses()
    } catch (error) {
      console.error('Failed to update course:', error)
      toast.error(error.message || 'Failed to update course')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      await apiClient.deleteCourse(courseId)
      toast.success('Course deleted successfully')
      fetchCourses()
    } catch (error) {
      console.error('Failed to delete course:', error)
      toast.error(error.message || 'Failed to delete course')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      department_id: '',
      description: '',
      status: 'active',
    })
    setSelectedCourse(null)
  }

  const openEditDialog = (course) => {
    setSelectedCourse(course)
    setFormData({
      name: course.name,
      code: course.code || '',
      department_id: course.department_id.toString(),
      description: course.description || '',
      status: course.status,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (course) => {
    setSelectedCourse(course)
    setIsViewDialogOpen(true)
  }

  const getDepartmentName = (departmentId) => {
    const dept = departments.find(d => d.id === departmentId)
    return dept ? dept.name : 'Unknown Department'
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  // Check if user is not admin AFTER auth is loaded
  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access course management.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold truncate">Courses Management</h1>
        <p className="text-gray-600">Manage academic courses and curriculum</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(totalCourses || 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(courses) ? courses.filter(c => c.status === 'active').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {departments.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Array.isArray(courses) ? courses.filter(c => c.status === 'inactive').length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full min-w-0 overflow-hidden">
        <CardHeader className="flex-col space-y-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            <CardTitle className="flex-shrink-0">Courses List</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsAddDialogOpen(true) }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Create a new course in the system</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department_id">Department *</Label>
                    <Select
                      value={formData.department_id}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value }))}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name} ({dept.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., CSP-001"
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Course description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Add Course
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-4 sm:px-6 pt-4 pb-2">
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading courses...</span>
            </div>
          ) : (
            <div className="w-full overflow-x-auto border-t">
              <Table style={{ minWidth: '100%', tableLayout: 'auto' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap w-[250px]" style={{ color : 'black' }}>Course Name</TableHead>
                    <TableHead className="whitespace-nowrap w-[100px]" style={{ color : 'black' }}>Code</TableHead>
                    <TableHead className="whitespace-nowrap w-[200px]" style={{ color : 'black' }}>Department</TableHead>
                    <TableHead className="whitespace-nowrap w-[120px]" style={{ color : 'black' }}>Status</TableHead>
                    <TableHead className="whitespace-nowrap w-[200px]" style={{ color : 'black' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!courses || courses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No courses found
                      </TableCell>
                    </TableRow>
                  ) : (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="whitespace-nowrap w-[250px]">
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate text-sm">{course.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono whitespace-nowrap w-[100px]">
                          {course.code || '-'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 whitespace-nowrap w-[200px]">
                          {getDepartmentName(course.department_id)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[120px]">
                          <Badge className={getStatusColor(course.status)}>
                            <span className="capitalize text-xs">{course.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[200px]">
                          <div className="flex items-center gap-2 pr-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openViewDialog(course)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(course)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>View detailed information about this course</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Course Name</Label>
                  <p>{selectedCourse.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Code</Label>
                  <p>{selectedCourse.code || '-'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Department</Label>
                  <p>{getDepartmentName(selectedCourse.department_id)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedCourse.status)}>
                    {selectedCourse.status}
                  </Badge>
                </div>
              </div>
              
              {selectedCourse.description && (
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="text-sm text-gray-600">{selectedCourse.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Modify course information and settings</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Course Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department *</Label>
              <Select
                value={formData.department_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value }))}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.name} ({dept.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-code">Course Code</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update Course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

