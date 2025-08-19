"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Upload, Eye, Edit, Trash2, Calendar, Star, Clock } from "lucide-react"

interface AcademicYear {
  id: string
  academicYear: string
  startDate: string
  endDate: string
  totalWorkingDays: number
  isCurrent: boolean
  status: "Current" | "Past" | "Future" | "Planned"
  createdAt: string
  semesterCount: number
  enrolledStudents: number
}

const mockAcademicYears: AcademicYear[] = [
  {
    id: "1",
    academicYear: "2024-2025",
    startDate: "2024-08-01",
    endDate: "2025-07-31",
    totalWorkingDays: 240,
    isCurrent: true,
    status: "Current",
    createdAt: "2024-01-15",
    semesterCount: 2,
    enrolledStudents: 1400,
  },
  {
    id: "2",
    academicYear: "2023-2024",
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    totalWorkingDays: 245,
    isCurrent: false,
    status: "Past",
    createdAt: "2023-01-15",
    semesterCount: 2,
    enrolledStudents: 1320,
  },
  {
    id: "3",
    academicYear: "2025-2026",
    startDate: "2025-08-01",
    endDate: "2026-07-31",
    totalWorkingDays: 242,
    isCurrent: false,
    status: "Future",
    createdAt: "2024-01-20",
    semesterCount: 2,
    enrolledStudents: 0,
  },
]

export function AcademicYearsManagement() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(mockAcademicYears)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAcademicYear, setNewAcademicYear] = useState<Partial<AcademicYear>>({
    totalWorkingDays: 240,
    semesterCount: 2,
    enrolledStudents: 0,
  })

  const filteredAcademicYears = academicYears.filter((year) => {
    const matchesSearch = year.academicYear.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || year.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-800"
      case "Past":
        return "bg-gray-100 text-gray-800"
      case "Future":
        return "bg-blue-100 text-blue-800"
      case "Planned":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateAcademicYear = (startYear: number) => {
    return `${startYear}-${startYear + 1}`
  }

  const calculateStatus = (startDate: string, endDate: string): "Current" | "Past" | "Future" | "Planned" => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now >= start && now <= end) return "Current"
    if (now > end) return "Past"
    if (now < start) return "Future"
    return "Planned"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Years Management</h1>
          <p className="text-gray-600">Manage academic years and their configurations</p>
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
                Add Academic Year
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Academic Year</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startYear">Start Year *</Label>
                    <Input
                      id="startYear"
                      type="number"
                      min="2020"
                      max="2030"
                      placeholder="e.g., 2025"
                      onChange={(e) => {
                        const startYear = Number.parseInt(e.target.value)
                        if (startYear) {
                          const academicYear = generateAcademicYear(startYear)
                          const startDate = `${startYear}-08-01`
                          const endDate = `${startYear + 1}-07-31`
                          setNewAcademicYear({
                            ...newAcademicYear,
                            academicYear,
                            startDate,
                            endDate,
                            status: calculateStatus(startDate, endDate),
                          })
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endYear">End Year *</Label>
                    <Input
                      id="endYear"
                      type="number"
                      min="2021"
                      max="2031"
                      value={
                        newAcademicYear.academicYear ? Number.parseInt(newAcademicYear.academicYear.split("-")[1]) : ""
                      }
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={newAcademicYear.academicYear || ""}
                    disabled
                    placeholder="Auto-generated"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newAcademicYear.startDate || ""}
                      onChange={(e) => setNewAcademicYear({ ...newAcademicYear, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newAcademicYear.endDate || ""}
                      onChange={(e) => setNewAcademicYear({ ...newAcademicYear, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalWorkingDays">Total Working Days</Label>
                    <Input
                      id="totalWorkingDays"
                      type="number"
                      value={newAcademicYear.totalWorkingDays || ""}
                      onChange={(e) =>
                        setNewAcademicYear({ ...newAcademicYear, totalWorkingDays: Number.parseInt(e.target.value) })
                      }
                      placeholder="e.g., 240"
                    />
                  </div>
                  <div>
                    <Label htmlFor="semesterCount">Number of Semesters</Label>
                    <Select
                      value={newAcademicYear.semesterCount?.toString() || "2"}
                      onValueChange={(value) =>
                        setNewAcademicYear({ ...newAcademicYear, semesterCount: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select semesters" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Semester</SelectItem>
                        <SelectItem value="2">2 Semesters</SelectItem>
                        <SelectItem value="3">3 Trimesters</SelectItem>
                        <SelectItem value="4">4 Quarters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    checked={newAcademicYear.isCurrent || false}
                    onChange={(e) => setNewAcademicYear({ ...newAcademicYear, isCurrent: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isCurrent">Set as current academic year</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const completeAcademicYear: AcademicYear = {
                        ...newAcademicYear,
                        id: String(academicYears.length + 1),
                        createdAt: new Date().toISOString().split("T")[0],
                        status: newAcademicYear.status || "Planned",
                      } as AcademicYear

                      // If setting as current, update other years
                      if (completeAcademicYear.isCurrent) {
                        setAcademicYears((prev) => prev.map((year) => ({ ...year, isCurrent: false })))
                      }

                      setAcademicYears([...academicYears, completeAcademicYear])
                      setIsAddDialogOpen(false)
                      setNewAcademicYear({
                        totalWorkingDays: 240,
                        semesterCount: 2,
                        enrolledStudents: 0,
                      })
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Academic Year
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
                <p className="text-sm font-medium text-gray-600">Total Academic Years</p>
                <p className="text-2xl font-bold text-gray-900">{academicYears.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Year</p>
                <p className="text-2xl font-bold text-green-600">
                  {academicYears.find((y) => y.isCurrent)?.academicYear || "None"}
                </p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Future Years</p>
                <p className="text-2xl font-bold text-blue-600">
                  {academicYears.filter((y) => y.status === "Future").length}
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
                <p className="text-sm font-medium text-gray-600">Past Years</p>
                <p className="text-2xl font-bold text-gray-600">
                  {academicYears.filter((y) => y.status === "Past").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
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
                  placeholder="Search academic years..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Current">Current</SelectItem>
                <SelectItem value="Past">Past</SelectItem>
                <SelectItem value="Future">Future</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Academic Years Table */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Years List ({filteredAcademicYears.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAcademicYears.map((year) => (
              <div key={year.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {year.isCurrent && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{year.academicYear}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(year.startDate).toLocaleDateString()} -{" "}
                          {new Date(year.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{year.totalWorkingDays}</p>
                      <p className="text-xs text-gray-500">Working Days</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{year.semesterCount}</p>
                      <p className="text-xs text-gray-500">Semesters</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{year.enrolledStudents}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(year.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(year.status)}>{year.status}</Badge>
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
