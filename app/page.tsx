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
import { StudentPortal } from "@/components/student-portal"
import { FacultyPortal } from "@/components/faculty-portal"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getActiveSession> extends infer T ? T extends { user: infer U } ? U : any : any>()

  useEffect(() => {
    const session = getActiveSession()
    setIsLoggedIn(!!session)
    if (session?.user) {
      setCurrentUser(session.user)
      const role = session.user.role
      if (role === "faculty") setActiveSection("faculty-portal")
      else if (role === "student") setActiveSection("student-portal")
      else setActiveSection("dashboard")
    }
  }, [])

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => {
      const s = getActiveSession();
      setIsLoggedIn(true); 
      if (s?.user) {
        setCurrentUser(s.user)
        const role = s.user.role
        if (role === "faculty") setActiveSection("faculty-portal")
        else if (role === "student") setActiveSection("student-portal")
        else if (role === "dept_admin") setActiveSection("dashboard")
        else setActiveSection("dashboard")
      }
    }} />
  }

  const renderActiveSection = () => {
    const role = currentUser?.role || "admin"
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />
      case "users":
        return role === "admin" ? <UsersManagement /> : <DashboardHome />
      case "courses":
        return role === "admin" || role === "dept_admin" ? <CoursesManagement /> : <DashboardHome />
      case "students":
        return role === "admin" || role === "dept_admin" ? <StudentsManagement /> : <DashboardHome />
      case "faculty":
        return role === "admin" || role === "dept_admin" ? <FacultyManagement /> : <DashboardHome />
      case "departments":
        return role === "admin" || role === "dept_admin" ? <DepartmentsManagement /> : <DashboardHome />
      case "academic-years":
        return role === "admin" || role === "dept_admin" ? <AcademicYearsManagement /> : <DashboardHome />
      case "audit-log":
        return role === "admin" ? <AuditLog /> : <DashboardHome />
      case "profile":
        return <UserProfile />
      case "settings":
        return <UserProfile />
      case "student-portal":
        return <StudentPortal />
      case "faculty-portal":
        return <FacultyPortal />
      default:
        return <DashboardHome />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} currentUser={currentUser as any} />
      <SidebarInset>
        <DashboardHeader onLogout={() => { setIsLoggedIn(false); setCurrentUser(undefined as any); }} currentUser={currentUser as any} />
        <main className="flex-1 overflow-auto">{renderActiveSection()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
