"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, Download, User } from "lucide-react"

interface StudentClassSession {
  id: string
  subjectCode: string
  subjectName: string
  day: string
  timeSlot: string
  startTime: string
  endTime: string
  room: string
  facultyName: string
  units: number
  sessionType: "Lecture" | "Lab" | "Tutorial" | "Seminar"
}

const mockStudentSchedule: StudentClassSession[] = [
  {
    id: "1",
    subjectCode: "BRIDG 001",
    subjectName: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    day: "Monday",
    timeSlot: "08:00 AM - 09:30 AM",
    startTime: "08:00",
    endTime: "09:30",
    room: "Room 101",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    units: 3,
    sessionType: "Lecture",
  },
  {
    id: "2",
    subjectCode: "GE 104",
    subjectName: "Mathematics in the Modern World",
    day: "Monday",
    timeSlot: "10:00 AM - 11:30 AM",
    startTime: "10:00",
    endTime: "11:30",
    room: "Room 203",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    units: 3,
    sessionType: "Lecture",
  },
  {
    id: "3",
    subjectCode: "IT 170",
    subjectName: "Computer Fundamentals and Operations",
    day: "Tuesday",
    timeSlot: "09:00 AM - 10:30 AM",
    startTime: "09:00",
    endTime: "10:30",
    room: "Lab 101",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    units: 3,
    sessionType: "Lab",
  },
  {
    id: "4",
    subjectCode: "IT 171",
    subjectName: "Fundamentals of Programming and Problem Solving 1",
    day: "Wednesday",
    timeSlot: "11:00 AM - 12:30 PM",
    startTime: "11:00",
    endTime: "12:30",
    room: "Lab 102",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    units: 3,
    sessionType: "Lab",
  },
  {
    id: "5",
    subjectCode: "GE 105",
    subjectName: "Purposive Communication",
    day: "Thursday",
    timeSlot: "02:00 PM - 03:30 PM",
    startTime: "14:00",
    endTime: "15:30",
    room: "Room 302",
    facultyName: "TITULAR, BRISBANE QUIROG",
    units: 3,
    sessionType: "Lecture",
  },
  {
    id: "6",
    subjectCode: "MATH 171",
    subjectName: "Discrete Math",
    day: "Friday",
    timeSlot: "08:00 AM - 09:30 AM",
    startTime: "08:00",
    endTime: "09:30",
    room: "Room 201",
    facultyName: "SARIN, JAYSON RASOURIO",
    units: 3,
    sessionType: "Lecture",
  },
  {
    id: "7",
    subjectCode: "PATHFIT 1",
    subjectName: "Movement Competency Training",
    day: "Friday",
    timeSlot: "03:00 PM - 04:30 PM",
    startTime: "15:00",
    endTime: "16:30",
    room: "Gymnasium",
    facultyName: "BUTALID, RONALD ALLAN HAVANA",
    units: 2,
    sessionType: "Tutorial",
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

export function StudentSchedule() {
  const [schedule] = useState<StudentClassSession[]>(mockStudentSchedule)
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

  const getTotalUnits = () => {
    return schedule.reduce((total, session) => total + session.units, 0)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
          <p className="text-gray-600">Your weekly class schedule and subject timings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      {/* Student Info Header */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">JOHN DOE</p>
                <p className="text-sm text-gray-600">Student ID: BSIT-2024-001</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Year & Section</p>
              <p className="font-semibold">BSIT 1-IT13</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="font-semibold">2024-2025 (First Semester)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(schedule.map(s => s.subjectCode)).size}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-blue-600">{getTotalUnits()}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
                <p className="text-2xl font-bold text-green-600">{getTotalHours()}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Today</p>
                <p className="text-2xl font-bold text-orange-600">
                  {getSessionsForDay(new Date().toLocaleDateString('en-US', { weekday: 'long' })).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
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
                                  <span className="font-medium text-sm">{session.subjectCode}</span>
                                  <Badge className={getSessionTypeColor(session.sessionType)} variant="secondary">
                                    {session.sessionType}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{session.subjectName}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3" />
                                  {session.room}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <User className="w-3 h-3" />
                                  {session.facultyName}
                                </div>
                                <div className="text-xs text-purple-600 font-medium mt-1">
                                  {session.units} Units
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
                              <h4 className="font-medium">{session.subjectCode} - {session.subjectName}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {session.room}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {session.facultyName}
                                </span>
                                <span className="text-purple-600 font-medium">
                                  {session.units} Units
                                </span>
                              </div>
                            </div>
                          </div>
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