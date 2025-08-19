"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Eye, FileText, Shield, Activity, Clock } from "lucide-react"

interface AuditLogEntry {
  id: string
  timestamp: string
  userId: string
  username: string
  action: "INSERT" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "VIEW"
  entityType: "STUDENT" | "FACULTY" | "COURSE" | "DEPARTMENT" | "USER" | "SYSTEM"
  entityId?: string
  entityName?: string
  ipAddress: string
  userAgent: string
  changes?: {
    field: string
    oldValue: string
    newValue: string
  }[]
  description: string
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:00Z",
    userId: "1",
    username: "admin",
    action: "INSERT",
    entityType: "STUDENT",
    entityId: "STU001",
    entityName: "John Doe",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    description: "Created new student profile for John Doe",
  },
  {
    id: "2",
    timestamp: "2024-01-15T09:45:00Z",
    userId: "2",
    username: "john.smith",
    action: "UPDATE",
    entityType: "FACULTY",
    entityId: "FAC001",
    entityName: "Dr. John Smith",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    changes: [
      {
        field: "phone",
        oldValue: "+1234567890",
        newValue: "+1234567891",
      },
      {
        field: "office_location",
        oldValue: "Room 301",
        newValue: "Room 302",
      },
    ],
    description: "Updated faculty profile information",
  },
  {
    id: "3",
    timestamp: "2024-01-15T08:20:00Z",
    userId: "3",
    username: "jane.doe",
    action: "LOGIN",
    entityType: "SYSTEM",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    description: "User logged into the system",
  },
  {
    id: "4",
    timestamp: "2024-01-14T16:30:00Z",
    userId: "1",
    username: "admin",
    action: "DELETE",
    entityType: "COURSE",
    entityId: "CS999",
    entityName: "Deprecated Course",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    description: "Deleted deprecated course from curriculum",
  },
  {
    id: "5",
    timestamp: "2024-01-14T14:15:00Z",
    userId: "2",
    username: "john.smith",
    action: "VIEW",
    entityType: "STUDENT",
    entityId: "STU002",
    entityName: "Jane Smith",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    description: "Viewed student academic records",
  },
]

export function AuditLog() {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAction, setSelectedAction] = useState<string>("all")
  const [selectedEntity, setSelectedEntity] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<string>("all")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)
    const matchesAction = selectedAction === "all" || log.action === selectedAction
    const matchesEntity = selectedEntity === "all" || log.entityType === selectedEntity
    const matchesUser = selectedUser === "all" || log.username === selectedUser
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
      case "VIEW":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEntityColor = (entityType: string) => {
    switch (entityType) {
      case "STUDENT":
        return "bg-blue-100 text-blue-800"
      case "FACULTY":
        return "bg-green-100 text-green-800"
      case "COURSE":
        return "bg-orange-100 text-orange-800"
      case "DEPARTMENT":
        return "bg-purple-100 text-purple-800"
      case "USER":
        return "bg-red-100 text-red-800"
      case "SYSTEM":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const uniqueUsers = Array.from(new Set(auditLogs.map((log) => log.username)))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600">Track all system activities and changes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Log
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Activities</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    auditLogs.filter((log) => {
                      const logDate = new Date(log.timestamp).toDateString()
                      const today = new Date().toDateString()
                      return logDate === today
                    }).length
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{uniqueUsers.length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Actions</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditLogs.filter((log) => log.action === "DELETE").length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-red-600" />
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
                  placeholder="Search by user, description, entity, or IP address..."
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
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="INSERT">INSERT</SelectItem>
                <SelectItem value="UPDATE">UPDATE</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="LOGIN">LOGIN</SelectItem>
                <SelectItem value="LOGOUT">LOGOUT</SelectItem>
                <SelectItem value="VIEW">VIEW</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Entities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="STUDENT">STUDENT</SelectItem>
                <SelectItem value="FACULTY">FACULTY</SelectItem>
                <SelectItem value="COURSE">COURSE</SelectItem>
                <SelectItem value="DEPARTMENT">DEPARTMENT</SelectItem>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="SYSTEM">SYSTEM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getActionColor(log.action)}>{log.action}</Badge>
                      <Badge className={getEntityColor(log.entityType)}>{log.entityType}</Badge>
                      <span className="text-sm font-medium text-gray-900">@{log.username}</span>
                      <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{log.description}</p>
                    {log.entityName && (
                      <p className="text-xs text-gray-600">
                        <strong>Entity:</strong> {log.entityName} ({log.entityId})
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>IP: {log.ipAddress}</span>
                      <span>User Agent: {log.userAgent.substring(0, 50)}...</span>
                    </div>
                    {log.changes && log.changes.length > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-medium text-blue-800 mb-2">Changes Made:</p>
                        <div className="space-y-1">
                          {log.changes.map((change, index) => (
                            <div key={index} className="text-xs text-blue-700">
                              <strong>{change.field}:</strong> "{change.oldValue}" → "{change.newValue}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
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
