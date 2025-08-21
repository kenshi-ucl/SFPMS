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
  { main: "07:30 AM", top: "07:00 AM", bottom: "07:59 AM" },
  { main: "08:30 AM", top: "08:00 AM", bottom: "08:59 AM" },
  { main: "09:30 AM", top: "09:00 AM", bottom: "09:59 AM" },
  { main: "10:30 AM", top: "10:00 AM", bottom: "10:59 AM" },
  { main: "11:30 AM", top: "11:00 AM", bottom: "11:59 AM" },
  { main: "12:30 AM", top: "12:00 AM", bottom: "12:59 AM" },
  { main: "01:30 PM", top: "01:00 PM", bottom: "01:59 PM" },
  { main: "02:30 PM", top: "02:00 PM", bottom: "02:59 PM" },
  { main: "03:30 PM", top: "03:00 PM", bottom: "03:59 PM" },
  { main: "04:30 PM", top: "04:00 PM", bottom: "04:59 PM" },
  { main: "05:30 PM", top: "05:00 PM", bottom: "05:59 PM" },
  { main: "06:30 PM", top: "06:00 PM", bottom: "06:59 PM" },
  { main: "07:30 PM", top: "07:00 PM", bottom: "07:59 PM" },
  { main: "08:30 PM", top: "08:00 PM", bottom: "08:59 PM" },
  { main: "09:30 PM", top: "09:00 PM", bottom: "09:59 PM" },
]

// Helpers to work with minutes
const parseSlotToMinutes = (label: string) => {
  const [time, mer] = label.split(" ")
  const [hh, mm] = time.split(":").map(Number)
  let h = hh % 12
  if (mer === 'PM') h += 12
  if (mer === 'AM' && hh === 12) h = 0
  return h * 60 + mm
}
const timeSlotsMinutes = timeSlots.map(s => parseSlotToMinutes(s.main))
const sortedSlotMinutes = [...timeSlotsMinutes].sort((a, b) => a - b)

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
      "bg-blue-600 text-white border border-blue-700 shadow-sm",
      "bg-purple-600 text-white border border-purple-700 shadow-sm", 
      "bg-green-600 text-white border border-green-700 shadow-sm",
      "bg-orange-500 text-white border border-orange-600 shadow-sm",
      "bg-pink-600 text-white border border-pink-700 shadow-sm",
      "bg-yellow-500 text-white border border-yellow-600 shadow-sm",
      "bg-indigo-600 text-white border border-indigo-700 shadow-sm"
    ]
    const index = Math.abs(subjectCode.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length
    return colors[index]
  }

  const filteredSchedule = selectedDay === "All" 
    ? schedule 
    : schedule.filter(item => item.day === selectedDay)

  // Parse the top-table schedule strings (e.g., "M-W: 9:30AM-11:00AM") into concrete day/time entries
  const expandScheduleFromTopTable = React.useMemo(() => {
    const abbrevToDay: Record<string, string> = {
      M: "Monday",
      T: "Tuesday",
      W: "Wednesday",
      Th: "Thursday",
      F: "Friday",
      Sat: "Saturday",
      Sun: "Sunday"
    }

    const to24HourNoSuffix = (time: string) => {
      const match = time.trim().match(/^(\d{1,2}):(\d{2})(AM|PM)$/i)
      if (!match) return time
      let hours = parseInt(match[1], 10)
      const minutes = match[2]
      const period = match[3].toUpperCase()
      if (period === 'PM' && hours !== 12) hours += 12
      if (period === 'AM' && hours === 12) hours = 0
      return `${hours.toString().padStart(2, '0')}:${minutes}`
    }

    const toMinutes = (hhmm: string) => {
      const [h, m] = hhmm.split(":").map(Number)
      return h * 60 + m
    }

    const fromMinutes = (min: number) => {
      const h = Math.floor(min / 60) % 24
      const m = min % 60
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }

    const slotMinutes = [...sortedSlotMinutes]

    const nextSlotAtOrAfter = (min: number) => {
      for (let i = 0; i < slotMinutes.length; i++) {
        if (slotMinutes[i] >= min) return slotMinutes[i]
      }
      return slotMinutes[slotMinutes.length - 1]
    }

    const dayAllocations: Record<string, Array<{ start: number; end: number }>> = {}

    const expanded: ClassScheduleItem[] = []

    schedule.forEach(item => {
      const colonIndex = item.schedule.indexOf(':')
      if (colonIndex === -1) {
        expanded.push(item)
        return
      }

      const daysPart = item.schedule.slice(0, colonIndex).trim()
      const timePart = item.schedule.slice(colonIndex + 1).trim()
      const [startRaw, endRaw] = timePart.split('-').map(s => s.trim())

      const originalStart = to24HourNoSuffix(startRaw)
      const originalEnd = to24HourNoSuffix(endRaw)
      const duration = toMinutes(originalEnd) - toMinutes(originalStart)

      const tokens = daysPart.match(/Sun|Sat|Th|M|T|W|F/g) || []
      const mappedDays = tokens.map(t => abbrevToDay[t]).filter(Boolean)

      if (mappedDays.length === 0) {
        expanded.push(item)
        return
      }

      mappedDays.forEach(dayName => {
        if (!dayAllocations[dayName]) dayAllocations[dayName] = []

        let desiredStart = toMinutes(originalStart)
        let desiredEnd = desiredStart + duration

        // Resolve conflicts by shifting to the next available slot on the same day
        const conflicts = () => dayAllocations[dayName].some(b => !(desiredEnd <= b.start || desiredStart >= b.end))
        while (conflicts()) {
          const latestEnd = Math.max(...dayAllocations[dayName].filter(b => !(desiredEnd <= b.start || desiredStart >= b.end)).map(b => b.end))
          // Snap to next grid slot at or after latestEnd
          desiredStart = nextSlotAtOrAfter(latestEnd)
          desiredEnd = desiredStart + duration
          // If still overlaps, loop continues; if beyond last slot, will clamp to last slot start
        }

        dayAllocations[dayName].push({ start: desiredStart, end: desiredEnd })

        expanded.push({
          ...item,
          day: dayName,
          timeStart: fromMinutes(desiredStart),
          timeEnd: fromMinutes(desiredEnd)
        })
      })
    })

    return expanded
  }, [schedule])

  const getClassesForDay = (day: string) => {
    return expandScheduleFromTopTable.filter(item => item.day === day)
  }

  // Overlap-aware layout calculation per day
  const layoutByDay = React.useMemo(() => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number)
      return h * 60 + m
    }

    const map: Record<string, Record<string, { colIndex: number; colCount: number }>> = {}

    days.slice(0, 6).forEach(day => {
      const classes = getClassesForDay(day)
      if (classes.length === 0) {
        map[day] = {}
        return
      }

      const events: Array<{ time: number; type: 'start' | 'end'; id: string }> = []
      classes.forEach(cls => {
        events.push({ time: toMinutes(cls.timeStart), type: 'start', id: cls.id })
        events.push({ time: toMinutes(cls.timeEnd), type: 'end', id: cls.id })
      })

      // End before start at the same time to avoid false overlap at boundaries
      events.sort((a, b) => a.time - b.time || (a.type === 'end' ? -1 : 1))

      const active: string[] = []
      const colIndexById: Record<string, number> = {}
      const maxConcById: Record<string, number> = {}

      events.forEach(evt => {
        if (evt.type === 'end') {
          const idx = active.indexOf(evt.id)
          if (idx !== -1) active.splice(idx, 1)
          return
        }

        // Assign smallest available column index
        const used = new Set(active.map(id => colIndexById[id]))
        let col = 0
        while (used.has(col)) col++
        colIndexById[evt.id] = col
        active.push(evt.id)

        const currentConcurrent = active.length
        active.forEach(id => {
          maxConcById[id] = Math.max(maxConcById[id] || 1, currentConcurrent)
        })
      })

      const layout: Record<string, { colIndex: number; colCount: number }> = {}
      classes.forEach(cls => {
        layout[cls.id] = {
          colIndex: colIndexById[cls.id] ?? 0,
          colCount: maxConcById[cls.id] ?? 1
        }
      })

      map[day] = layout
    })

    return map
  }, [expandScheduleFromTopTable])

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

  const toMinutesSimple = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number)
    return h * 60 + m
  }

  const isTimeInRange = (currentTime: string, startTime: string, endTime: string) => {
    const current24 = convertTimeTo24Hour(currentTime)
    const start24 = convertTimeTo24Hour(startTime)
    const end24 = convertTimeTo24Hour(endTime)
    
    return current24 >= start24 && current24 < end24
  }

  const getTimeSlotIndex = (time: string) => {
    return timeSlots.findIndex(slot => slot.main === time)
  }

  const calculateRowSpan = (startTime: string, endTime: string) => {
    const startMin = toMinutesSimple(startTime)
    const endMin = toMinutesSimple(endTime)
    let startIndex = sortedSlotMinutes.findIndex(m => m >= startMin)
    let endIndex = sortedSlotMinutes.findIndex(m => m >= endMin)
    if (startIndex === -1) startIndex = 0
    if (endIndex === -1) endIndex = sortedSlotMinutes.length
    return Math.max(1, endIndex - startIndex)
  }

  const isClassStartTime = (timeSlot: string, classItem: any) => {
    const slotMin = toMinutesSimple(convertTimeTo24Hour(timeSlot))
    const classMin = toMinutesSimple(classItem.timeStart)
    return slotMin === classMin
  }

  const getClassesPlacedAtTime = (day: string) => {
    const placedTimes = new Set()
    return timeSlots.map(timeSlot => {
      if (placedTimes.has(timeSlot.main)) return null
      
      const dayClasses = getClassesForDay(day)
      const classAtTime = dayClasses.find(cls => isClassStartTime(timeSlot.main, cls))
      
      if (classAtTime) {
        const rowSpan = calculateRowSpan(classAtTime.timeStart, classAtTime.timeEnd)
        const startIndex = getTimeSlotIndex(timeSlot.main)
        
        for (let i = 0; i < rowSpan; i++) {
          if (startIndex + i < timeSlots.length) {
            placedTimes.add(timeSlots[startIndex + i].main)
          }
        }
        
        return { class: classAtTime, rowSpan }
      }
      
      return null
    })
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
                <TableHead className="border border-black text-center font-bold text-black">#</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Subject Code</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Description</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Lec</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Lab</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Units</TableHead>
                <TableHead className="border border-black text-center font-bold text-black">Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="border border-black text-center">{index + 1}</TableCell>
                  <TableCell className="border border-black text-center font-medium">{item.subjectCode}</TableCell>
                  <TableCell className="border border-black px-3">{item.subjectName}</TableCell>
                  <TableCell className="border border-black text-center">{item.lec}</TableCell>
                  <TableCell className="border border-black text-center">{item.lab}</TableCell>
                  <TableCell className="border border-black text-center">{item.units}</TableCell>
                  <TableCell className="border border-black text-center text-sm">{item.schedule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="w-full">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2 text-center font-bold w-20">
                    <Clock className="w-5 h-5 mx-auto" />
                  </th>
                  <th className="border border-black p-2 text-center font-bold">Monday</th>
                  <th className="border border-black p-2 text-center font-bold">Tuesday</th>
                  <th className="border border-black p-2 text-center font-bold">Wednesday</th>
                  <th className="border border-black p-2 text-center font-bold">Thursday</th>
                  <th className="border border-black p-2 text-center font-bold">Friday</th>
                  <th className="border border-black p-2 text-center font-bold">Saturday</th>
                </tr>
              </thead>
              <tbody className="relative">
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeSlot.main}>
                    <td className="border border-black p-1 text-center bg-gray-50 align-top w-20">
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500">{timeSlot.top}</div>
                        <div className="text-sm font-bold text-gray-900">{timeSlot.main}</div>
                        <div className="text-xs text-gray-500">{timeSlot.bottom}</div>
                      </div>
                    </td>
                    {days.slice(0, 6).map((day, dayIndex) => {
                      const dayClasses = getClassesForDay(day)

                      // All classes that start at this time
                      const startingClasses = dayClasses.filter(cls => isClassStartTime(timeSlot.main, cls))
                      
                      return (
                        <td key={`${day}-${timeSlot.main}`} className="border border-black align-top relative" style={{ minHeight: '50px', width: '150px' }}>
                          <div className="absolute inset-0">
                            <div className="h-full relative">
                              <div className="absolute top-1/2 left-0 right-0 border-t border-black"></div>
                            </div>
                          </div>
                          {startingClasses.map((classItem) => {
                            const layout = layoutByDay[day]?.[classItem.id] || { colIndex: 0, colCount: 1 }
                            const gap = 4
                            const widthCalc = `calc((100% - ${(layout.colCount - 1) * gap}px) / ${layout.colCount})`
                            const leftCalc = `calc(${layout.colIndex} * ((100% - ${(layout.colCount - 1) * gap}px) / ${layout.colCount}) + ${layout.colIndex * gap}px)`
                            return (
                              <div 
                                key={classItem.id}
                                className={`${getSubjectColor(classItem.subjectCode)} absolute flex items-center justify-center text-xs z-10 rounded-sm`}
                                style={{ 
                                  height: `${calculateRowSpan(classItem.timeStart, classItem.timeEnd) * 50}px`,
                                  top: 0,
                                  left: leftCalc,
                                  width: widthCalc
                                }}
                              >
                                <div className="text-center p-2">
                                  <div className="font-bold text-xs mb-1">{classItem.subjectCode}</div>
                                  <div className="text-xs mb-1 leading-tight">{classItem.subjectName}</div>
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="text-xs">{classItem.building} {classItem.room}</span>
                                  </div>
                                  <div className="flex items-center justify-center gap-1">
                                    <User className="w-3 h-3 flex-shrink-0" />
                                    <span className="text-xs">BSIT 3-{classItem.section}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
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