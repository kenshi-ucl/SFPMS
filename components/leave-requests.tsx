"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export function LeaveRequests() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string>("Casual")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [reason, setReason] = useState("")

  const requests = [
    { id: "l1", user: "John Doe", type: "Casual", from: "2025-09-02", to: "2025-09-03", days: 2, status: "Pending" },
    { id: "l2", user: "Dr. Jane Smith", type: "Medical", from: "2025-08-28", to: "2025-08-30", days: 3, status: "Approved" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-600">Create and manage leave applications</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">New Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Leave Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Vacation">Vacation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm">From</label>
                  <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">To</label>
                  <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm">Reason</label>
                  <Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)} className="bg-purple-600 hover:bg-purple-700">Submit</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.user}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.from}</TableCell>
                  <TableCell>{r.to}</TableCell>
                  <TableCell>{r.days}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">View</Button>
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