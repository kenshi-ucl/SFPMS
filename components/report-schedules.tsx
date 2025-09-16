"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface ScheduleRow {
  id: string
  reportName: string
  reportType: "Student" | "Faculty" | "Course" | "Department" | "Financial" | "Custom"
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly"
  recipients: string
  isActive: boolean
  lastRun?: string
  nextRun?: string
}

const initial: ScheduleRow[] = [
  { id: "rs1", reportName: "Monthly Fee Collection", reportType: "Financial", frequency: "Monthly", recipients: "finance@univ.edu", isActive: true, lastRun: "2025-08-01", nextRun: "2025-09-01" },
]

export function ReportSchedules() {
  const [rows, setRows] = useState<ScheduleRow[]>(initial)
  const [form, setForm] = useState<Partial<ScheduleRow>>({ reportType: "Student", frequency: "Monthly", isActive: true })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Schedules</h1>
          <p className="text-gray-600">Schedule recurring reports and recipients</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
          const complete = {
            id: `rs${rows.length + 1}`,
            reportName: form.reportName || "New Schedule",
            reportType: (form.reportType || "Student") as ScheduleRow["reportType"],
            frequency: (form.frequency || "Monthly") as ScheduleRow["frequency"],
            recipients: form.recipients || "",
            isActive: form.isActive ?? true,
          } as ScheduleRow
          setRows((prev) => [...prev, complete])
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add Schedule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Input placeholder="Report Name" value={form.reportName || ""} onChange={(e) => setForm({ ...form, reportName: e.target.value })} />
            <Select value={form.reportType || "Student"} onValueChange={(v) => setForm({ ...form, reportType: v as any })}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Faculty">Faculty</SelectItem>
                <SelectItem value="Course">Course</SelectItem>
                <SelectItem value="Department">Department</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={form.frequency || "Monthly"} onValueChange={(v) => setForm({ ...form, frequency: v as any })}>
              <SelectTrigger><SelectValue placeholder="Frequency" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Recipients (comma-separated emails)" value={form.recipients || ""} onChange={(e) => setForm({ ...form, recipients: e.target.value })} />
            <Select value={(form.isActive ?? true) ? "active" : "inactive"} onValueChange={(v) => setForm({ ...form, isActive: v === "active" })}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedules ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.reportName}</TableCell>
                  <TableCell>{r.reportType}</TableCell>
                  <TableCell>{r.frequency}</TableCell>
                  <TableCell className="truncate max-w-[220px]">{r.recipients}</TableCell>
                  <TableCell>{r.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell>{r.lastRun || "-"}</TableCell>
                  <TableCell>{r.nextRun || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 