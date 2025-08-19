"use client"

import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHome } from "@/components/dashboard-home"
import { StudentsManagement } from "@/components/students-management"
import { FacultyManagement } from "@/components/faculty-management"
import { DepartmentsManagement } from "@/components/departments-management"
import { AcademicYearsManagement } from "@/components/academic-years-management"
import { UsersManagement } from "@/components/users-management"
import { CoursesManagement } from "@/components/courses-management"
import { AuditLog } from "@/components/audit-log"
import { UserProfile } from "@/components/user-profile"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getActiveSession } from "@/lib/auth"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    const session = getActiveSession()
    setIsLoggedIn(!!session)
  }, [])

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />
      case "users":
        return <UsersManagement />
      case "courses":
        return <CoursesManagement />
      case "students":
        return <StudentsManagement />
      case "faculty":
        return <FacultyManagement />
      case "departments":
        return <DepartmentsManagement />
      case "academic-years":
        return <AcademicYearsManagement />
      case "audit-log":
        return <AuditLog />
      case "profile":
        return <UserProfile />
      default:
        return <DashboardHome />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset>
        <DashboardHeader onLogout={() => setIsLoggedIn(false)} />
        <main className="flex-1 overflow-auto">{renderActiveSection()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
