import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function ReportsCenter() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and export system reports</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Reports generation interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

