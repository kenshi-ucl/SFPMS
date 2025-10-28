import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function AcademicYearsManagement() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Years Management</h1>
        <p className="text-gray-600">Manage academic years and their configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Academic Years</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Academic Years List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Academic years management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

