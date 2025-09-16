"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface ActivityRow {
  id: string
  user: string
  type: string
  description: string
  module: string
  time: string
  ip: string
}

const initial: ActivityRow[] = [
  { id: "ac1", user: "admin", type: "VIEW", description: "Viewed student profile", module: "Students", time: "2025-08-20 10:20", ip: "127.0.0.1" },
  { id: "ac2", user: "jsmith", type: "LOGIN", description: "Logged in", module: "Auth", time: "2025-08-20 09:00", ip: "127.0.0.2" },
]

export function ActivityLogs() {
  const [rows] = useState<ActivityRow[]>(initial)
  const [q, setQ] = useState("")
  const [type, setType] = useState("all")

  const filtered = rows.filter((r) =>
    (type === "all" || r.type === type) &&
    (q === "" || r.user.toLowerCase().includes(q.toLowerCase()) || r.description.toLowerCase().includes(q.toLowerCase()) || r.module.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-600">User activities across modules</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input className="pl-10" placeholder="Search user, module, description" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="VIEW">VIEW</SelectItem>
                <SelectItem value="LOGIN">LOGIN</SelectItem>
                <SelectItem value="LOGOUT">LOGOUT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.time}</TableCell>
                  <TableCell className="font-medium">{r.user}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.module}</TableCell>
                  <TableCell>{r.description}</TableCell>
                  <TableCell>{r.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 