"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, MapPin, User, BookOpen, Download, Filter } from "lucide-react"
import React from "react"

interface ClassScheduleItem {
  id: string
  subjectCode: string
  subjectName: string
  facultyName: string
  day: string
  timeStart: string
  timeEnd: string
  room: string
  building: string
  classType: "Lecture" | "Laboratory" | "Seminar" | "Tutorial"
  credits: number
  color: string
}

const mockSchedule: ClassScheduleItem[] = [
  {
    id: "1",
    subjectCode: "BRIDG 001",
    subjectName: "Bridging Subject 1 (Algebra, Trigo, Calculus 1)",
    facultyName: "PIA, GRACEFYL JOY LUMINGKIT",
    day: "Monday",
    timeStart: "08:00",
    timeEnd: "09:30",
    room: "Room 101",
    building: "Engineering Building",
    classType: "Lecture",
    credits: 3,
    color: "bg-blue-100 border-blue-300"
  },
  {
    id: "2",
    subjectCode: "GE 104",
    subjectName: "Mathematics in the Modern World",
    facultyName: "PANIZA, MARIA LEILA SOLIS",
    day: "Monday",
    timeStart: "10:00",
    timeEnd: "11:30",
    room: "Room 205",
    building: "Main Building",
    classType: "Lecture",
    credits: 3,
    color: "bg-green-100 border-green-300"
  },
  {
    id: "3",
    subjectCode: "IT 170",
    subjectName: "Computer Fundamentals and Operations",
    facultyName: "LUCINO, SHIELA MAY FETALCURIN",
    day: "Monday",
    timeStart: "13:00",
    timeEnd: "14:30",
    room: "Computer Lab 1",
    building: "IT Building",
    classType: "Laboratory",
    credits: 3,
    color: "bg-purple-100 border-purple-300"
  },
  {
    id: "4",
    subjectCode: "IT 171",
    subjectName: "Fundamentals of Programming and Problem Solving 1",
    facultyName: "PENAMANTE, JOSHUA ANUB",
    day: "Tuesday",
    timeStart: "08:00",
    timeEnd: "09:30",
    room: "Computer Lab 2",
    building: "IT Building",
    classType: "Laboratory",
    credits: 3,
    color: "bg-orange-100 border-orange-300"
  },
  {
    id: "5",
    subjectCode: "GE 105",
    subjectName: "Purposive Communication",
    facultyName: "TITULAR, BRISBANE QUIROG",
    day: "Tuesday",
    timeStart: "10:00",
    timeEnd: "11:30",
    room: "Room 303",
    building: "Liberal Arts Building",
    classType: "Lecture",
    credits: 3,
    color: "bg-pink-100 border-pink-300"
  },
  {
    id: "6",
    subjectCode: "NSTP 1",
    subjectName: "National Service Training Program 1",
    facultyName: "COORDINATOR, NSTP",
    day: "Wednesday",
    timeStart: "07:00",
    timeEnd: "10:00",
    room: "Field Area",
    building: "Campus Grounds",
    classType: "Seminar",
    credits: 3,
    color: "bg-yellow-100 border-yellow-300"
  },
  {
    id: "7",
    subjectCode: "PE 1",
    subjectName: "Physical Education 1",
    facultyName: "INSTRUCTOR, PE",
    day: "Thursday",
    timeStart: "14:00",
    timeEnd: "16:00",
    room: "Gymnasium",
    building: "Sports Complex",
    classType: "Tutorial",
    credits: 2,
    color: "bg-red-100 border-red-300"
  },
  {
    id: "8",
    subjectCode: "MATH 171",
    subjectName: "Discrete Math",
    facultyName: "SARIN, JAYSON RASOURIO",
    day: "Friday",
    timeStart: "08:00",
    timeEnd: "09:30",
    room: "Room 202",
    building: "Engineering Building",
    classType: "Lecture",
    credits: 3,
    color: "bg-indigo-100 border-indigo-300"
  },
]

const timeSlots = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function StudentClassSchedule() {
  const [schedule] = useState<ClassScheduleItem[]>(mockSchedule)
  const [viewMode, setViewMode] = useState<string>("weekly")
  const [selectedDay, setSelectedDay] = useState<string>("All")

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case "Lecture":
        return "bg-blue-100 text-blue-800"
      case "Laboratory":
        return "bg-purple-100 text-purple-800"
      case "Seminar":
        return "bg-yellow-100 text-yellow-800"
      case "Tutorial":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredSchedule = selectedDay === "All" 
    ? schedule 
    : schedule.filter(item => item.day === selectedDay)

  const getClassesForDay = (day: string) => {
    return schedule.filter(item => item.day === day)
  }

  const totalCredits = schedule.reduce((sum, item) => sum + item.credits, 0)
  const totalClasses = schedule.length
  const uniqueFaculty = [...new Set(schedule.map(item => item.facultyName))].length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
          <p className="text-gray-600">View your weekly class schedule and important details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      {/* Student Info Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">JOHN DOE</p>
                <p className="text-sm text-gray-600">BSIT-2024-001</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-blue-600">{totalCredits}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-purple-600">{totalClasses}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="font-semibold">2024-2025 (First Semester)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Hours</p>
                <p className="text-2xl font-bold text-purple-600">{totalCredits}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faculty Count</p>
                <p className="text-2xl font-bold text-green-600">{uniqueFaculty}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Days</p>
                <p className="text-2xl font-bold text-orange-600">{[...new Set(schedule.map(s => s.day))].length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger>
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly View</SelectItem>
                <SelectItem value="daily">Daily List</SelectItem>
              </SelectContent>
            </Select>
            {viewMode === "daily" && (
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Days</SelectItem>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Grid View */}
      {viewMode === "weekly" && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-2 min-w-full">
                {/* Header */}
                <div className="text-sm font-medium text-gray-600 p-2">Time</div>
                {days.map(day => (
                  <div key={day} className="text-sm font-medium text-gray-600 p-2 text-center">
                    {day}
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map(time => (
                  <React.Fragment key={time}>
                    <div className="text-xs text-gray-500 p-2 border-r">{time}</div>
                    {days.map(day => {
                      const dayClasses = getClassesForDay(day)
                      const classAtTime = dayClasses.find(cls => 
                        time >= cls.timeStart && time < cls.timeEnd
                      )
                      
                      return (
                        <div key={`${day}-${time}`} className="p-1 border border-gray-100 min-h-[60px]">
                          {classAtTime && time === classAtTime.timeStart && (
                            <div className={`${classAtTime.color} rounded p-2 text-xs border-l-4`}>
                              <div className="font-medium">{classAtTime.subjectCode}</div>
                              <div className="text-gray-600">{classAtTime.room}</div>
                              <div className="text-gray-500">{classAtTime.timeStart}-{classAtTime.timeEnd}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily List View */}
      {viewMode === "daily" && (
        <Card>
          <CardHeader>
            <CardTitle>Class Schedule List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.day}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{item.timeStart} - {item.timeEnd}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.subjectCode}</p>
                        <p className="text-sm text-gray-500">{item.subjectName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{item.facultyName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{item.room}</p>
                          <p className="text-xs text-gray-500">{item.building}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getClassTypeColor(item.classType)}>
                        {item.classType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{item.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Today's Classes Quick View */}
      {viewMode === "weekly" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getClassesForDay("Monday").map((classItem) => (
                <div key={classItem.id} className={`${classItem.color} rounded-lg p-4 border-l-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{classItem.subjectCode} - {classItem.subjectName}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {classItem.timeStart} - {classItem.timeEnd}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {classItem.room}, {classItem.building}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {classItem.facultyName}
                        </span>
                      </div>
                    </div>
                    <Badge className={getClassTypeColor(classItem.classType)}>
                      {classItem.classType}
                    </Badge>
                  </div>
                </div>
              ))}
              {getClassesForDay("Monday").length === 0 && (
                <p className="text-gray-500 text-center py-4">No classes scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 