"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CoursesManagement } from "@/components/courses-management"
import { DepartmentsManagement } from "@/components/departments-management"
import { AcademicYearsManagement } from "@/components/academic-years-management"

export function SystemSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Manage courses, departments, and academic years</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="academic-years">Academic Years</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CoursesManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
            </CardHeader>
            <CardContent>
              <DepartmentsManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic-years">
          <Card>
            <CardHeader>
              <CardTitle>Academic Year Management</CardTitle>
            </CardHeader>
            <CardContent>
              <AcademicYearsManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 