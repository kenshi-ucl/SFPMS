"use client"

import {
  GraduationCap,
  LayoutDashboard,
  UserCheck,
  Building2,
  Calendar,
  FileText,
  User,
  Bell,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "faculty", label: "Faculty", icon: UserCheck },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "academic-years", label: "Academic Years", icon: Calendar },
    { id: "audit-log", label: "Audit Log", icon: FileText },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SFPMS</h1>
            <p className="text-sm text-gray-500">Student & Faculty Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  activeSection === item.id
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-purple-600 text-white">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Administrator</p>
            <p className="text-xs text-gray-500">admin@university.edu</p>
          </div>
        </div>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-gray-700"
            onClick={() => setActiveSection("profile")}
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-700">
            <Bell className="w-4 h-4" />
            Notifications
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-700">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
