"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AcademicCalendar() {
  const [type, setType] = useState<string>("all")
  const events = [
    { id: "e1", date: "2025-09-01", name: "Semester Start", type: "Event", isHoliday: false },
    { id: "e2", date: "2025-09-10", name: "Mid-term Exams Begin", type: "Exam", isHoliday: false },
    { id: "e3", date: "2025-09-25", name: "Holiday - Founders Day", type: "Holiday", isHoliday: true },
  ]

  const filtered = events.filter((e) => type === "all" || e.type === type)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
          <p className="text-gray-600">Holidays, exams, events and deadlines</p>
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Holiday">Holiday</SelectItem>
            <SelectItem value="Exam">Exam</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
            <SelectItem value="Deadline">Deadline</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Calendar Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Holiday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{e.isHoliday ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 