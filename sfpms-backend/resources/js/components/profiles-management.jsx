import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Eye, Edit, Trash2, UserCircle, Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { ProfileForm } from "@/components/profile-form"

export function ProfilesManagement() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statistics, setStatistics] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [mode, setMode] = useState("create") // create, edit, view
  
  const { user: currentUser, isAdmin, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && currentUser && isAdmin()) {
      fetchProfiles()
      fetchStatistics()
    }
  }, [currentPage, selectedStatus, searchTerm, authLoading, currentUser])

  const fetchProfiles = async () => {
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

      const response = await apiClient.getProfiles(params)
      
      if (response.success) {
        setProfiles(response.data || [])
        setTotalPages(response.meta?.last_page || 1)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch profiles')
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const response = await apiClient.getProfileStatistics()
      if (response.success) {
        setStatistics(response.data)
      }
    } catch (error) {
      console.error('Error fetching statistics:', error)
    }
  }

  const handleApprove = async (id) => {
    try {
      await apiClient.approveProfile(id)
      toast.success('Profile approved successfully')
      fetchProfiles()
      fetchStatistics()
    } catch (error) {
      toast.error(error.message || 'Failed to approve profile')
    }
  }

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this profile?')) return
    
    try {
      await apiClient.rejectProfile(id)
      toast.success('Profile rejected')
      fetchProfiles()
      fetchStatistics()
    } catch (error) {
      toast.error(error.message || 'Failed to reject profile')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this profile? This action cannot be undone.')) return
    
    try {
      await apiClient.deleteProfile(id)
      toast.success('Profile deleted successfully')
      fetchProfiles()
      fetchStatistics()
    } catch (error) {
      toast.error(error.message || 'Failed to delete profile')
    }
  }

  const openCreateForm = () => {
    setSelectedProfile(null)
    setMode("create")
    setIsFormOpen(true)
  }

  const openEditForm = (profile) => {
    setSelectedProfile(profile)
    setMode("edit")
    setIsFormOpen(true)
  }

  const openViewDialog = (profile) => {
    setSelectedProfile(profile)
    setMode("view")
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedProfile(null)
    setMode("create")
  }

  const handleFormSuccess = () => {
    closeForm()
    fetchProfiles()
    fetchStatistics()
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access profile management.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold truncate">Profile Management</h1>
        <p className="text-gray-600">Manage student profiles and applications</p>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 min-w-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft</CardTitle>
              <Edit className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{statistics.draft}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statistics.submitted}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statistics.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{statistics.rejected}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profiles List */}
      <Card className="w-full min-w-0 overflow-hidden">
        <CardHeader className="flex-col space-y-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            <CardTitle className="flex-shrink-0">Student Profiles</CardTitle>
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-4 sm:px-6 pt-4 pb-2">
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading profiles...</span>
            </div>
          ) : (
            <div className="w-full overflow-x-auto border-t">
              <Table style={{ minWidth: '100%', tableLayout: 'auto' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap" style={{ color: 'black' }}>Name</TableHead>
                    <TableHead className="whitespace-nowrap" style={{ color: 'black' }}>Course</TableHead>
                    <TableHead className="whitespace-nowrap" style={{ color: 'black' }}>Status</TableHead>
                    <TableHead className="whitespace-nowrap" style={{ color: 'black' }}>Submitted</TableHead>
                    <TableHead className="whitespace-nowrap" style={{ color: 'black' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!profiles || profiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No profiles found
                      </TableCell>
                    </TableRow>
                  ) : (
                    profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="font-medium">{profile.full_name || `${profile.given_name} ${profile.family_name}`}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {typeof profile.course === 'object' && profile.course?.name 
                            ? profile.course.name 
                            : typeof profile.course === 'string' 
                              ? profile.course 
                              : 'N/A'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge className={getStatusColor(profile.status)}>
                            <span className="capitalize">{profile.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">
                          {profile.submitted_at ? new Date(profile.submitted_at).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => openViewDialog(profile)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => openEditForm(profile)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            {profile.status === 'submitted' && (
                              <>
                                <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApprove(profile.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleReject(profile.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(profile.id)}>
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

      {/* Profile Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create New Profile" : mode === "edit" ? "Edit Profile" : "View Profile"}
            </DialogTitle>
          </DialogHeader>
          <ProfileForm 
            profile={selectedProfile}
            mode={mode}
            onSuccess={handleFormSuccess}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

