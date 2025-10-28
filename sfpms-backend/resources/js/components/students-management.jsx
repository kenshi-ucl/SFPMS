import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export function StudentsManagement() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
        <p className="text-gray-600">Manage student profiles and academic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">1,400</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Student management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

