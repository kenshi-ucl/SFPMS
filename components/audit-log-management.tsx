"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye, FileText, Database, User, Calendar } from "lucide-react"

interface AuditLog {
  id: string
  userId: string
  userName: string
  action: "INSERT" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT"
  entityType: string
  entityId: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: string
  description: string
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "admin",
    action: "INSERT",
    entityType: "USERS",
    entityId: "123",
    newValues: { name: "John Doe", email: "john@example.com" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-20T10:30:00Z",
    description: "Created new user account",
  },
  {
    id: "2",
    userId: "2",
    userName: "jsmith",
    action: "UPDATE",
    entityType: "STUDENTS",
    entityId: "456",
    oldValues: { cgpa: 8.5 },
    newValues: { cgpa: 8.7 },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-01-20T09:15:00Z",
    description: "Updated student CGPA",
  },
  {
    id: "3",
    userId: "1",
    userName: "admin",
    action: "DELETE",
    entityType: "COURSES",
    entityId: "789",
    oldValues: { courseName: "Old Course", courseCode: "OLD101" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-19T16:45:00Z",
    description: "Deleted obsolete course",
  },
  {
    id: "4",
    userId: "3",
    userName: "faculty1",
    action: "LOGIN",
    entityType: "USER_SESSIONS",
    entityId: "101",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    timestamp: "2024-01-19T14:20:00Z",
    description: "User logged in successfully",
  },
  {
    id: "5",
    userId: "1",
    userName: "admin",
    action: "INSERT",
    entityType: "DEPARTMENTS",
    entityId: "654",
    newValues: { departmentName: "Data Science", departmentCode: "DS" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-18T11:00:00Z",
    description: "Created new department",
  },
]

export function AuditLogManagement() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAction, setSelectedAction] = useState("ALL_ACTIONS")
  const [selectedEntity, setSelectedEntity] = useState("ALL_ENTITIES")
  const [selectedUser, setSelectedUser] = useState("ALL_USERS")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = selectedAction === "ALL_ACTIONS" || log.action === selectedAction
    const matchesEntity = selectedEntity === "ALL_ENTITIES" || log.entityType === selectedEntity
    const matchesUser = selectedUser === "ALL_USERS" || log.userName === selectedUser
    return matchesSearch && matchesAction && matchesEntity && matchesUser
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case "INSERT":
        return "bg-green-100 text-green-800"
      case "UPDATE":
        return "bg-blue-100 text-blue-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      case "LOGIN":
        return "bg-purple-100 text-purple-800"
      case "LOGOUT":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getUniqueValues = (key: keyof AuditLog) => {
    return [...new Set(auditLogs.map((log) => log[key]))]
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log Management</h1>
          <p className="text-gray-600">Track all system changes and user activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inserts</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditLogs.filter((log) => log.action === "INSERT").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Updates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {auditLogs.filter((log) => log.action === "UPDATE").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deletes</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditLogs.filter((log) => log.action === "DELETE").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Logins</p>
                <p className="text-2xl font-bold text-purple-600">
                  {auditLogs.filter((log) => log.action === "LOGIN").length}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search audit logs by description, user, entity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_ACTIONS">All Actions</SelectItem>
                <SelectItem value="INSERT">Insert</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Entities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_ENTITIES">All Entities</SelectItem>
                <SelectItem value="USERS">Users</SelectItem>
                <SelectItem value="STUDENTS">Students</SelectItem>
                <SelectItem value="FACULTY">Faculty</SelectItem>
                <SelectItem value="COURSES">Courses</SelectItem>
                <SelectItem value="DEPARTMENTS">Departments</SelectItem>
                <SelectItem value="USER_SESSIONS">Sessions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_USERS">All Users</SelectItem>
                {getUniqueValues("userName").map((user) => (
                  <SelectItem key={user} value={user as string}>
                    {user as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail ({filteredLogs.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-mono">{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getActionColor(log.action)}>{log.action}</Badge>
                        <span className="text-sm font-medium text-gray-900">{log.entityType}</span>
                        <span className="text-sm text-gray-600">ID: {log.entityId}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2">{log.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.userName}
                        </span>
                        <span>IP: {log.ipAddress}</span>
                        <span className="truncate max-w-xs">{log.userAgent.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="View Details">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Show changes for UPDATE actions */}
                {log.action === "UPDATE" && log.oldValues && log.newValues && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Changes Made:</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-red-600">Before:</span>
                        <pre className="mt-1 text-red-700 bg-red-50 p-2 rounded">
                          {JSON.stringify(log.oldValues, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <span className="font-medium text-green-600">After:</span>
                        <pre className="mt-1 text-green-700 bg-green-50 p-2 rounded">
                          {JSON.stringify(log.newValues, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show data for INSERT actions */}
                {log.action === "INSERT" && log.newValues && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Data Created:</h4>
                    <pre className="text-xs text-green-700">{JSON.stringify(log.newValues, null, 2)}</pre>
                  </div>
                )}

                {/* Show data for DELETE actions */}
                {log.action === "DELETE" && log.oldValues && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Data Deleted:</h4>
                    <pre className="text-xs text-red-700">{JSON.stringify(log.oldValues, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
