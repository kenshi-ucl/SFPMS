"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, Download } from "lucide-react"

interface ClassSession {
  id: string
  courseCode: string
  courseName: string
  day: string
  timeSlot: string
  startTime: string
  endTime: string
  room: string
  section: string
  totalStudents: number
  sessionType: "Lecture" | "Lab" | "Tutorial" | "Seminar"
}

const mockSchedule: ClassSession[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    day: "Monday",
    timeSlot: "09:00 AM - 10:30 AM",
    startTime: "09:00",
    endTime: "10:30",
    room: "Lab 101",
    section: "A",
    totalStudents: 45,
    sessionType: "Lab",
  },
  {
    id: "2",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    day: "Wednesday",
    timeSlot: "09:00 AM - 10:30 AM",
    startTime: "09:00",
    endTime: "10:30",
    room: "Lab 101",
    section: "A",
    totalStudents: 45,
    sessionType: "Lab",
  },
  {
    id: "3",
    courseCode: "CS101",
    courseName: "Data Structures and Algorithms",
    day: "Friday",
    timeSlot: "02:00 PM - 03:30 PM",
    startTime: "14:00",
    endTime: "15:30",
    room: "Room 201",
    section: "A",
    totalStudents: 45,
    sessionType: "Lecture",
  },
  {
    id: "4",
    courseCode: "CS201",
    courseName: "Database Management Systems",
    day: "Tuesday",
    timeSlot: "11:00 AM - 12:30 PM",
    startTime: "11:00",
    endTime: "12:30",
    room: "Room 301",
    section: "B",
    totalStudents: 38,
    sessionType: "Lecture",
  },
  {
    id: "5",
    courseCode: "CS201",
    courseName: "Database Management Systems",
    day: "Thursday",
    timeSlot: "11:00 AM - 12:30 PM",
    startTime: "11:00",
    endTime: "12:30",
    room: "Lab 203",
    section: "B",
    totalStudents: 38,
    sessionType: "Lab",
  },
]

const timeSlots = [
  "08:00 AM - 09:30 AM",
  "09:00 AM - 10:30 AM", 
  "10:00 AM - 11:30 AM",
  "11:00 AM - 12:30 PM",
  "12:00 PM - 01:30 PM",
  "02:00 PM - 03:30 PM",
  "03:00 PM - 04:30 PM",
  "04:00 PM - 05:30 PM",
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function FacultySchedule() {
  const [schedule] = useState<ClassSession[]>(mockSchedule)
  const [selectedWeek, setSelectedWeek] = useState<string>("current")
  const [viewMode, setViewMode] = useState<string>("week")

  const getSessionsForDay = (day: string) => {
    return schedule.filter(session => session.day === day)
  }

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "Lecture":
        return "bg-blue-100 text-blue-800"
      case "Lab":
        return "bg-green-100 text-green-800"
      case "Tutorial":
        return "bg-yellow-100 text-yellow-800"
      case "Seminar":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalHours = () => {
    return schedule.reduce((total, session) => {
      const start = parseInt(session.startTime.split(':')[0])
      const end = parseInt(session.endTime.split(':')[0])
      return total + (end - start + 0.5) // Adding 0.5 for 30 min sessions
    }, 0)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
          <p className="text-gray-600">Your weekly teaching schedule and class timings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{schedule.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teaching Hours</p>
                <p className="text-2xl font-bold text-blue-600">{getTotalHours()}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {schedule.reduce((sum, session) => sum + session.totalStudents, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-orange-600">
                  {new Set(schedule.map(s => s.courseCode)).size}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger>
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
                <SelectItem value="previous">Previous Week</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger>
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      {viewMode === "week" && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b font-medium w-32">Time</th>
                    {days.map(day => (
                      <th key={day} className="text-left p-3 border-b font-medium min-w-48">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot} className="border-b">
                      <td className="p-3 text-sm text-gray-600 font-medium">
                        {timeSlot}
                      </td>
                      {days.map(day => {
                        const session = schedule.find(s => 
                          s.day === day && s.timeSlot === timeSlot
                        )
                        return (
                          <td key={`${day}-${timeSlot}`} className="p-2">
                            {session ? (
                              <div className="p-3 rounded-lg border-l-4 border-purple-500 bg-purple-50 hover:bg-purple-100 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">{session.courseCode}</span>
                                  <Badge className={getSessionTypeColor(session.sessionType)} variant="secondary">
                                    {session.sessionType}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{session.courseName}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3" />
                                  {session.room}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Users className="w-3 h-3" />
                                  {session.totalStudents} students
                                </div>
                              </div>
                            ) : (
                              <div className="h-20 rounded-lg border-2 border-dashed border-gray-200"></div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-6">
          {days.map(day => {
            const daySessions = getSessionsForDay(day)
            return (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {day}
                    <Badge variant="outline">{daySessions.length} classes</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {daySessions.length > 0 ? (
                    <div className="space-y-4">
                      {daySessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="font-medium text-sm">{session.timeSlot}</div>
                              <Badge className={getSessionTypeColor(session.sessionType)} variant="secondary">
                                {session.sessionType}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-medium">{session.courseCode} - {session.courseName}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {session.room}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  Section {session.section} ({session.totalStudents} students)
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No classes scheduled for {day}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
} 