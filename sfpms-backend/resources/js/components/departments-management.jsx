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
import { Plus, Search, Eye, Edit, Trash2, Building2, Users, UserCheck, AlertCircle, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export function DepartmentsManagement() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    head_of_department: '',
    email: '',
    phone: '',
    location: '',
    status: 'active',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDepartments, setTotalDepartments] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  
  const { user: currentUser, isAdmin, isLoading: authLoading } = useAuth()

  // Only fetch departments when auth is loaded AND user is admin
  useEffect(() => {
    if (!authLoading && currentUser && isAdmin()) {
      fetchDepartments()
    }
  }, [currentPage, selectedStatus, searchTerm, authLoading, currentUser])

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        per_page: 15,
      }
      
      if (selectedStatus !== 'all') {
        params.status = selectedStatus
      }
      
      if (searchTerm.trim()) {
        params.search = searchTerm
      }

      const response = await apiClient.getDepartments(params)
      
      setDepartments(response.data || [])
      setTotalPages(response.meta?.last_page || 1)
      setTotalDepartments(response.meta?.total || 0)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch departments')
      setDepartments([])
      setTotalDepartments(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDepartment = async (e) => {
    e.preventDefault()
    if (submitting) return

    try {
      setSubmitting(true)

      await apiClient.createDepartment(formData)
      
      toast.success('Department created successfully')
      setIsAddDialogOpen(false)
      resetForm()
      fetchDepartments()
    } catch (error) {
      console.error('Failed to create department:', error)
      toast.error(error.message || 'Failed to create department')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateDepartment = async (e) => {
    e.preventDefault()
    if (submitting || !selectedDepartment) return

    try {
      setSubmitting(true)

      await apiClient.updateDepartment(selectedDepartment.id, formData)
      
      toast.success('Department updated successfully')
      setIsEditDialogOpen(false)
      resetForm()
      fetchDepartments()
    } catch (error) {
      console.error('Failed to update department:', error)
      toast.error(error.message || 'Failed to update department')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteDepartment = async (departmentId) => {
    if (!confirm('Are you sure you want to delete this department?')) return

    try {
      await apiClient.deleteDepartment(departmentId)
      toast.success('Department deleted successfully')
      fetchDepartments()
    } catch (error) {
      console.error('Failed to delete department:', error)
      toast.error(error.message || 'Failed to delete department')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      head_of_department: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
    })
    setSelectedDepartment(null)
  }

  const openEditDialog = (department) => {
    setSelectedDepartment(department)
    setFormData({
      name: department.name,
      code: department.code,
      description: department.description || '',
      head_of_department: department.head_of_department || '',
      email: department.email || '',
      phone: department.phone || '',
      location: department.location || '',
      status: department.status,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (department) => {
    setSelectedDepartment(department)
    setIsViewDialogOpen(true)
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
            <p className="text-gray-600">You don't have permission to access department management.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold truncate">Departments Management</h1>
        <p className="text-gray-600">Manage academic and administrative departments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(totalDepartments || 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(departments) ? departments.filter(d => d.status === 'active').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Array.isArray(departments) ? departments.reduce((sum, d) => sum + (d.faculty_count || 0), 0) : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Array.isArray(departments) ? departments.reduce((sum, d) => sum + (d.students_count || 0), 0) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full min-w-0 overflow-hidden">
        <CardHeader className="flex-col space-y-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            <CardTitle className="flex-shrink-0">Departments</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsAddDialogOpen(true) }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>Create a new department in the system</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddDepartment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Department Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter department name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="code">Department Code</Label>
                    <Input
                      id="code"
                      placeholder="CS, MATH, ENG, etc."
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      required
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Department description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="head_of_department">Head of Department</Label>
                    <Input
                      id="head_of_department"
                      placeholder="Department head name"
                      value={formData.head_of_department}
                      onChange={(e) => setFormData(prev => ({ ...prev, head_of_department: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="department@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Department phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Building and room number"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
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
                      Add Department
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
                  placeholder="Search departments..."
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
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading departments...</span>
            </div>
          ) : (
            <div className="w-full overflow-x-auto border-t">
              <Table style={{ minWidth: '100%', tableLayout: 'auto' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap w-[250px]" style={{ color : 'black' }}>Department</TableHead>
                    <TableHead className="whitespace-nowrap w-[100px]" style={{ color : 'black' }}>Code</TableHead>
                    <TableHead className="whitespace-nowrap w-[120px]" style={{ color : 'black' }}>Status</TableHead>
                    <TableHead className="whitespace-nowrap w-[150px]" style={{ color : 'black' }}>Head</TableHead>
                    <TableHead className="whitespace-nowrap w-[100px]" style={{ color : 'black' }}>Users</TableHead>
                    <TableHead className="whitespace-nowrap w-[220px]" style={{ color : 'black' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!departments || departments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No departments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    departments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell className="whitespace-nowrap w-[250px]">
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate text-sm">{department.name}</div>
                            <div className="text-xs text-gray-500 truncate">{department.email || 'No email'}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono whitespace-nowrap w-[100px]">
                          {department.code}
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[120px]">
                          <Badge className={getStatusColor(department.status)}>
                            <span className="capitalize text-xs">{department.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap w-[150px]">
                          {department.head_of_department || 'Not assigned'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap w-[100px]">
                          {department.users_count || 0}
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[220px]">
                          <div className="flex items-center gap-2 pr-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openViewDialog(department)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(department)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteDepartment(department.id)}
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
            <DialogTitle>Department Details</DialogTitle>
            <DialogDescription>View detailed information about this department</DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p>{selectedDepartment.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Code</Label>
                  <p>{selectedDepartment.code}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedDepartment.status)}>
                    {selectedDepartment.status}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Users</Label>
                  <p>{selectedDepartment.users_count || 0}</p>
                </div>
              </div>
              
              {selectedDepartment.description && (
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p>{selectedDepartment.description}</p>
                </div>
              )}
              
              {selectedDepartment.head_of_department && (
                <div>
                  <Label className="font-semibold">Head of Department</Label>
                  <p>{selectedDepartment.head_of_department}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{selectedDepartment.email || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{selectedDepartment.phone || 'Not provided'}</p>
                </div>
              </div>
              
              {selectedDepartment.location && (
                <div>
                  <Label className="font-semibold">Location</Label>
                  <p>{selectedDepartment.location}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Modify department information and settings</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateDepartment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Department Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-code">Department Code</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                required
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
              <Label htmlFor="edit-head">Head of Department</Label>
              <Input
                id="edit-head"
                value={formData.head_of_department}
                onChange={(e) => setFormData(prev => ({ ...prev, head_of_department: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
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
                Update Department
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

