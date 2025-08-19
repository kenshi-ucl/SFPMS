"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, UserCheck, Building2, TrendingUp, Calendar, BookOpen, Award } from "lucide-react"

export function DashboardHome() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Faculty",
      value: "89",
      change: "+5%",
      icon: UserCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Departments",
      value: "12",
      change: "0%",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+8%",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New student admission",
      user: "John Doe",
      time: "2 hours ago",
      type: "admission",
    },
    {
      id: 2,
      action: "Faculty profile updated",
      user: "Dr. Sarah Wilson",
      time: "4 hours ago",
      type: "update",
    },
    {
      id: 3,
      action: "Course curriculum modified",
      user: "Prof. Michael Brown",
      time: "6 hours ago",
      type: "course",
    },
    {
      id: 4,
      action: "Department budget approved",
      user: "Admin",
      time: "1 day ago",
      type: "budget",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Faculty Meeting",
      date: "Tomorrow, 10:00 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Student Registration Deadline",
      date: "Dec 15, 2024",
      type: "deadline",
    },
    {
      id: 3,
      title: "Semester End Exams",
      date: "Dec 20-30, 2024",
      type: "exam",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Student & Faculty Profile Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <GraduationCap className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Add Student</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Add Faculty</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <BookOpen className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">Add Course</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <Award className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium">Generate Report</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
