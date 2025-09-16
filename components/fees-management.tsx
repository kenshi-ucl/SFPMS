"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Plus } from "lucide-react"

export function FeesManagement() {
  const [year, setYear] = useState<string>("2024-2025")
  const [courseFilter, setCourseFilter] = useState<string>("all")

  const feeStructure = [
    { id: "f1", course: "B.Tech CS", tuition: 120000, lab: 5000, library: 2000, sports: 1500, other: 1000, total: 129500, due: "2025-09-30" },
  ]

  const payments = [
    { id: "p1", student: "John Doe", course: "B.Tech CS", amount: 60000, date: "2025-08-10", method: "Online", status: "Partial" },
    { id: "p2", student: "Jane Smith", course: "B.Tech CS", amount: 129500, date: "2025-08-12", method: "Online", status: "Complete" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
          <p className="text-gray-600">Configure fee structure and track payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2025-2026">2025-2026</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-purple-600 hover:bg-purple-700"><Plus className="w-4 h-4 mr-2" /> New Structure</Button>
          <Button variant="outline"><FileDown className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Tuition</TableHead>
                <TableHead>Lab</TableHead>
                <TableHead>Library</TableHead>
                <TableHead>Sports</TableHead>
                <TableHead>Other</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.course}</TableCell>
                  <TableCell>₹{f.tuition.toLocaleString()}</TableCell>
                  <TableCell>₹{f.lab.toLocaleString()}</TableCell>
                  <TableCell>₹{f.library.toLocaleString()}</TableCell>
                  <TableCell>₹{f.sports.toLocaleString()}</TableCell>
                  <TableCell>₹{f.other.toLocaleString()}</TableCell>
                  <TableCell>₹{f.total.toLocaleString()}</TableCell>
                  <TableCell>{f.due}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Search student..." />
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Course" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="B.Tech CS">B.Tech CS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.student}</TableCell>
                  <TableCell>{p.course}</TableCell>
                  <TableCell>₹{p.amount.toLocaleString()}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Receipt</Button>
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