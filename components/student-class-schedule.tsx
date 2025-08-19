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
  units: number
  lec: number
  lab: number
  schedule: string
  section: string
}

const mockSchedule: ClassScheduleItem[] = [
  {
    id: "1",
    subjectCode: "IT 370",
    subjectName: "Advanced Networking",
    facultyName: "Prof. Smith",
    day: "Monday",
    timeStart: "09:30",
    timeEnd: "11:00",
    room: "101",
    building: "CB",
    classType: "Lecture",
    credits: 3,
    units: 3,
    lec: 2,
    lab: 1,
    schedule: "M-W: 9:30AM-11:00AM",
    section: "A"
  },
  {
    id: "2",
    subjectCode: "IT 372",
    subjectName: "Information Assurance and Security 1 (with CISSP-Part 1)",
    facultyName: "Prof. Johnson",
    day: "Tuesday",
    timeStart: "10:30",
    timeEnd: "12:00",
    room: "102",
    building: "CB",
    classType: "Lecture",
    credits: 3,
    units: 3,
    lec: 2,
    lab: 1,
    schedule: "T-Th: 10:30AM-12:00PM",
    section: "B"
  },
  {
    id: "3",
    subjectCode: "IT 371.1",
    subjectName: "Systems Integration and Technologies 2",
    facultyName: "Prof. Brown",
    day: "Wednesday",
    timeStart: "08:30",
    timeEnd: "11:30",
    room: "201",
    building: "CB",
    classType: "Laboratory",
    credits: 3,
    units: 3,
    lec: 2,
    lab: 1,
    schedule: "W: 8:30AM-11:30AM",
    section: "A"
  },
  {
    id: "4",
    subjectCode: "IT 373-R1.2",
    subjectName: "Platform Technologies",
    facultyName: "Prof. Davis",
    day: "Thursday",
    timeStart: "09:30",
    timeEnd: "12:30",
    room: "103",
    building: "CB",
    classType: "Laboratory",
    credits: 3,
    units: 3,
    lec: 2,
    lab: 1,
    schedule: "Th: 9:30AM-12:30PM",
    section: "B"
  },
  {
    id: "5",
    subjectCode: "IT 371",
    subjectName: "Social Issues and Professional Practice",
    facultyName: "Prof. Wilson",
    day: "Friday",
    timeStart: "10:30",
    timeEnd: "12:00",
    room: "104",
    building: "CB",
    classType: "Lecture",
    credits: 3,
    units: 3,
    lec: 3,
    lab: 0,
    schedule: "F: 10:30AM-12:00PM",
    section: "A"
  },
  {
    id: "6",
    subjectCode: "IT 372-R1.2",
    subjectName: "Platform Technologies Lab",
    facultyName: "Prof. Davis",
    day: "Tuesday",
    timeStart: "15:30",
    timeEnd: "18:30",
    room: "301",
    building: "CB",
    classType: "Laboratory",
    credits: 0,
    units: 3,
    lec: 0,
    lab: 3,
    schedule: "T: 3:30PM-6:30PM",
    section: "A"
  },
  {
    id: "7",
    subjectCode: "IT 374-R1.3",
    subjectName: "Advanced Database Lab",
    facultyName: "Prof. Taylor",
    day: "Friday",
    timeStart: "15:30",
    timeEnd: "18:30",
    room: "302",
    building: "CB",
    classType: "Laboratory",
    credits: 0,
    units: 3,
    lec: 0,
    lab: 3,
    schedule: "F: 3:30PM-6:30PM",
    section: "B"
  }
]

const timeSlots = [
  "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM",
  "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
  "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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

  const getSubjectColor = (subjectCode: string) => {
    const colors = [
      "bg-green-400",
      "bg-blue-400", 
      "bg-purple-400",
      "bg-orange-400",
      "bg-pink-400",
      "bg-yellow-400",
      "bg-red-400"
    ]
    const index = Math.abs(subjectCode.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length
    return colors[index]
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

  const convertTimeTo24Hour = (time: string) => {
    const [timePart, modifier] = time.split(' ')
    let [hours, minutes] = timePart.split(':').map(Number)
    
    if (modifier === 'PM' && hours !== 12) {
      hours += 12
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const isTimeInRange = (currentTime: string, startTime: string, endTime: string) => {
    const current24 = convertTimeTo24Hour(currentTime)
    const start24 = convertTimeTo24Hour(startTime)
    const end24 = convertTimeTo24Hour(endTime)
    
    return current24 >= start24 && current24 < end24
  }

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

      {/* Subject Details Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border border-gray-300 text-center font-bold">#</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Subject Code</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Description</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Lec</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Lab</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Units</TableHead>
                <TableHead className="border border-gray-300 text-center font-bold">Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                  <TableCell className="border border-gray-300 text-center font-medium">{item.subjectCode}</TableCell>
                  <TableCell className="border border-gray-300 px-3">{item.subjectName}</TableCell>
                  <TableCell className="border border-gray-300 text-center">{item.lec}</TableCell>
                  <TableCell className="border border-gray-300 text-center">{item.lab}</TableCell>
                  <TableCell className="border border-gray-300 text-center">{item.units}</TableCell>
                  <TableCell className="border border-gray-300 text-center text-sm">{item.schedule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">Time</th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-300 p-2 text-center font-bold min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot}>
                    <td className="border border-gray-300 p-2 text-center text-sm font-medium bg-gray-50">
                      {timeSlot}
                    </td>
                    {days.map(day => {
                      const dayClasses = getClassesForDay(day)
                      const classAtTime = dayClasses.find(cls => {
                        const classStart = cls.timeStart.includes(':') ? 
                          (parseInt(cls.timeStart.split(':')[0]) >= 12 ? cls.timeStart + ' PM' : cls.timeStart + ' AM') :
                          cls.timeStart
                        const classEnd = cls.timeEnd.includes(':') ? 
                          (parseInt(cls.timeEnd.split(':')[0]) >= 12 ? cls.timeEnd + ' PM' : cls.timeEnd + ' AM') :
                          cls.timeEnd
                        
                        return isTimeInRange(timeSlot, classStart, classEnd)
                      })
                      
                      return (
                        <td key={`${day}-${timeSlot}`} className="border border-gray-300 p-1 h-12 relative">
                          {classAtTime && (
                            <div className={`${getSubjectColor(classAtTime.subjectCode)} rounded text-white text-xs p-1 h-full flex flex-col justify-center items-center`}>
                              <div className="font-bold text-center">{classAtTime.subjectCode}</div>
                              <div className="text-center leading-tight">
                                BSIT 3-{classAtTime.section}
                              </div>
                              <div className="text-center text-xs">{classAtTime.building} {classAtTime.room}</div>
                            </div>
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

      {/* Filters - Keep existing functionality */}
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

      {/* Daily List View - Keep existing */}
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
    </div>
  )
} 