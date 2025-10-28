import { useState, useEffect, forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, Users, Shield, UserCheck, AlertCircle, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    status: 'active',
    department_id: undefined,
  })
  const [departments, setDepartments] = useState([])
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  
  const { user: currentUser, isAdmin, isSuperAdmin, isDepartmentAdmin, isLoading: authLoading } = useAuth()


  // Only fetch users when auth is loaded AND user is admin
  useEffect(() => {
    if (!authLoading && currentUser && isAdmin()) {
      fetchUsers()
      fetchDepartments()
      
      // Auto-assign department for department admins
      if (isDepartmentAdmin() && currentUser.department_id) {
        setFormData(prev => ({ ...prev, department_id: currentUser.department_id }))
      }
    }
  }, [currentPage, selectedRole, selectedStatus, searchTerm, authLoading, currentUser])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        per_page: 15,
      }
      
      if (selectedRole !== 'all') {
        params.role = selectedRole
      }
      
      if (selectedStatus !== 'all') {
        params.status = selectedStatus
      }
      
      if (searchTerm.trim()) {
        params.search = searchTerm
      }

      const response = await apiClient.getUsers(params)
      
      setUsers(response.data || [])
      setTotalPages(response.meta?.last_page || response.last_page || 1)
      {
        const rawTotal = (response && response.meta && response.meta.total) ?? response.total
        const parsed = Number(rawTotal)
        const safeTotal = !Number.isNaN(parsed) && parsed >= 0
          ? parsed
          : (Array.isArray(response?.data) ? response.data.length : 0)
        setTotalUsers(safeTotal)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch users')
      setUsers([])
      setTotalUsers(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true)
      const response = await apiClient.getDepartments({ status: 'active' })
      setDepartments(response.data || [])
    } catch (error) {
      console.error('Failed to fetch departments:', error)
      setDepartments([])
    } finally {
      setLoadingDepartments(false)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (submitting) return

    try {
      setSubmitting(true)
      
      if (formData.role !== 'student' && !formData.employee_id) {
        toast.error('Employee ID is required for admin and faculty roles')
        return
      }
      
      if (formData.role === 'student' && !formData.student_id) {
        toast.error('Student ID is required for student role')
        return
      }

      if (formData.role === 'faculty' && !formData.department_id) {
        toast.error('Department selection is required for faculty members')
        return
      }

      if (formData.role === 'admin' && !formData.department_id) {
        toast.error('Department selection is required for department administrators')
        return
      }

      await apiClient.createUser({
        ...formData,
        password_confirmation: formData.password
      })
      
      toast.success('User created successfully')
      setIsAddDialogOpen(false)
      resetForm()
      fetchUsers()
    } catch (error) {
      console.error('Failed to create user:', error)
      if (error.message && (error.message.includes('email') || error.message.includes('Email'))) {
        toast.error('This email address is already registered. Please use a different email.')
      } else if (error.message && (error.message.includes('employee_id') || error.message.includes('Employee ID'))) {
        toast.error('This Employee ID is already in use. Please use a different Employee ID.')
      } else if (error.message && (error.message.includes('student_id') || error.message.includes('Student ID'))) {
        toast.error('This Student ID is already in use. Please use a different Student ID.')
      } else {
        toast.error(error.message || 'Failed to create user')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    if (submitting || !selectedUser) return

    try {
      setSubmitting(true)
      
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        date_of_birth: formData.date_of_birth,
        department_id: formData.department_id,
      }

      if (currentUser?.role === 'admin') {
        updateData.role = formData.role
        updateData.status = formData.status
        updateData.employee_id = formData.employee_id
        updateData.student_id = formData.student_id
      }

      if (formData.password) {
        updateData.password = formData.password
      }

      await apiClient.updateUser(selectedUser.id, updateData)
      
      toast.success('User updated successfully')
      setIsEditDialogOpen(false)
      resetForm()
      fetchUsers()
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error(error.message || 'Failed to update user')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await apiClient.deleteUser(userId)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error(error.message || 'Failed to delete user')
    }
  }

  const handleToggleUserStatus = async (userId) => {
    try {
      await apiClient.toggleUserStatus(userId)
      toast.success('User status updated successfully')
      fetchUsers()
    } catch (error) {
      console.error('Failed to toggle user status:', error)
      toast.error(error.message || 'Failed to update user status')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student',
      status: 'active',
      employee_id: '',
      student_id: '',
      phone: '',
      address: '',
      date_of_birth: '',
      department_id: undefined,
    })
    setSelectedUser(null)
  }

  const openEditDialog = (user) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
      employee_id: user.employee_id || '',
      student_id: user.student_id || '',
      phone: user.phone || '',
      address: user.address || '',
      date_of_birth: user.date_of_birth || '',
      department_id: user.department_id || undefined,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (user) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'faculty':
        return 'bg-blue-100 text-blue-800'
      case 'student':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return <Shield className="h-4 w-4" />
      case 'faculty':
        return <UserCheck className="h-4 w-4" />
      case 'student':
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
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
            <p className="text-gray-600">You don't have permission to access user management.</p>
            <p className="text-xs text-gray-500 mt-2">
              Current role: {currentUser?.role || 'Not set'} (Admin role required)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              User: {currentUser?.name || 'Unknown'} ({currentUser?.email || 'No email'})
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-6">
        <div className="min-w-0">
        <h1 className="text-3xl font-bold truncate">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and permissions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(totalUsers || 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600" key={`active-users-${users?.length}`}>
              {Array.isArray(users) ? users.filter(u => u.status === 'active').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600" key={`faculty-${users?.length}`}>
              {Array.isArray(users) ? users.filter(u => u.role === 'faculty').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600" key={`students-${users?.length}`}>
              {Array.isArray(users) ? users.filter(u => u.role === 'student').length : 0}
            </div>
          </CardContent>
        </Card>
        </div>

      <Card className="w-full min-w-0 overflow-hidden">
        <CardHeader className="flex-col space-y-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            <CardTitle className="flex-shrink-0">Users</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsAddDialogOpen(true) }}>
                  <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account in the system</DialogDescription>
              </DialogHeader>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>⚠️ Already taken:</strong>
                </p>
                <div className="text-xs text-blue-600 mt-1 space-y-1">
                  <div><strong>Emails:</strong> admin@sfpms.edu, faculty@sfpms.edu, student@sfpms.edu, sarah.johnson@sfpms.edu, etc.</div>
                  <div><strong>Employee IDs:</strong> ADMIN001, FAC001, FAC002</div>
                  <div><strong>Student IDs:</strong> STU001, STU2024001, STU2024002</div>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  <strong>Try instead:</strong> john.doe@example.com, EMP003, STU2025001, etc.
                </p>
              </div>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      disabled={submitting}
                  />
                </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        {isSuperAdmin() && (
                          <SelectItem value="admin">Admin (Department Administrator)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.role !== 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="employee_id">Employee ID</Label>
                      <Input
                        id="employee_id"
                        placeholder="EMP003, FAC003, etc."
                        value={formData.employee_id || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                        disabled={submitting}
                      />
                    </div>
                  )}
                  
                  {(formData.role === 'faculty' || formData.role === 'admin') && (
                    <div className="space-y-2">
                      <Label htmlFor="department_id">Department</Label>
                      <Select
                        value={formData.department_id ? formData.department_id.toString() : ''} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value ? parseInt(value) : undefined }))}
                        disabled={submitting || loadingDepartments || isDepartmentAdmin()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={
                            isDepartmentAdmin() 
                              ? "Your department" 
                              : loadingDepartments 
                                ? "Loading departments..." 
                                : "Select department"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {isDepartmentAdmin() ? (
                            // Department admins can only see their own department
                            departments.filter(dept => dept.id === currentUser?.department_id).map((department) => (
                              <SelectItem key={department.id} value={department.id.toString()}>
                                {department.name} ({department.code})
                              </SelectItem>
                            ))
                          ) : (
                            // Super admins can see all departments
                            departments.map((department) => (
                              <SelectItem key={department.id} value={department.id.toString()}>
                                {department.name} ({department.code})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {formData.role === 'admin' && (
                        <p className="text-xs text-gray-500">
                          This user will become a department administrator for the selected department
                        </p>
                      )}
                    </div>
                  )}
                  
                  {formData.role === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="student_id">Student ID</Label>
                      <Input
                        id="student_id"
                        placeholder="STU2025001, STU2025002, etc."
                        value={formData.student_id || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, student_id: e.target.value }))}
                        disabled={submitting}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
                    Cancel
                  </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Add User
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : (
            <div className="w-full overflow-x-auto border-t">
              <Table style={{ minWidth: '100%', tableLayout: 'auto' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap w-[250px]" style={{ color : 'black' }}>User</TableHead>
                    <TableHead className="whitespace-nowrap w-[120px]" style={{ color : 'black' }}>Role</TableHead>
                    <TableHead className="whitespace-nowrap w-[100px]" style={{ color : 'black' }}>Status</TableHead>
                    <TableHead className="whitespace-nowrap w-[150px]" style={{ color : 'black' }}>ID</TableHead>
                    <TableHead className="whitespace-nowrap w-[120px]" style={{ color : 'black' }}>Created</TableHead>
                    <TableHead className="whitespace-nowrap w-[220px]" style={{ color : 'black' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!users || users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="whitespace-nowrap w-[250px]">
                          <div className="flex items-center space-x-2 max-w-[250px]">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium truncate text-sm">{user.name}</div>
                              <div className="text-xs text-gray-500 truncate">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[120px]">
                          <Badge className={getRoleColor(user.role)}>
                            <div className="flex items-center space-x-1">
                              {getRoleIcon(user.role)}
                              <span className="capitalize text-xs">{user.role}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[100px]">
                          <Badge className={getStatusColor(user.status)}>
                            <span className="capitalize text-xs">{user.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap w-[150px]">
                          {user.employee_id || user.student_id || 'N/A'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap w-[120px]">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[220px]">
                          <div className="flex items-center gap-2 pr-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openViewDialog(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleUserStatus(user.id)}
                              disabled={user.id === currentUser?.id}
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.id === currentUser?.id}
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
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View detailed information about this user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
          <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                      </div>
                    </div>
                  </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">ID</Label>
                  <p>{selectedUser.employee_id || selectedUser.student_id || 'N/A'}</p>
                    </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{selectedUser.phone || 'N/A'}</p>
                    </div>
                <div>
                  <Label className="font-semibold">Date of Birth</Label>
                  <p>{selectedUser.date_of_birth || 'N/A'}</p>
                    </div>
                <div>
                  <Label className="font-semibold">Joined</Label>
                  <p>{selectedUser.joined_at ? new Date(selectedUser.joined_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
              
              {selectedUser.address && (
                <div>
                  <Label className="font-semibold">Address</Label>
                  <p>{selectedUser.address}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Modify user information and settings</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
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
                required
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password (optional)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            {isAdmin() && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                    disabled={submitting || isDepartmentAdmin()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      {isSuperAdmin() && (
                        <SelectItem value="admin">Admin (Department Administrator)</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                {(formData.role === 'faculty' || formData.role === 'admin') && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-department_id">Department</Label>
                    <Select
                      value={formData.department_id ? formData.department_id.toString() : ''} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value ? parseInt(value) : undefined }))}
                      disabled={submitting || loadingDepartments || (isDepartmentAdmin() && formData.role !== 'admin')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          isDepartmentAdmin() 
                            ? "Your department" 
                            : loadingDepartments 
                              ? "Loading departments..." 
                              : "Select department"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {isDepartmentAdmin() ? (
                          // Department admins can only see their own department
                          departments.filter(dept => dept.id === currentUser?.department_id).map((department) => (
                            <SelectItem key={department.id} value={department.id.toString()}>
                              {department.name} ({department.code})
                            </SelectItem>
                          ))
                        ) : (
                          // Super admins can see all departments
                          departments.map((department) => (
                            <SelectItem key={department.id} value={department.id.toString()}>
                              {department.name} ({department.code})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {formData.role === 'admin' && (
                      <p className="text-xs text-gray-500">
                        This user will become a department administrator for the selected department
                      </p>
                    )}
                  </div>
                )}
                
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
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={submitting}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update User
              </Button>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UsersManagement

