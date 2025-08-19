"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileDown, Filter, Search } from "lucide-react"

export function ReportsCenter() {
	const [reportType, setReportType] = useState<string>("Student")
	const [query, setQuery] = useState("")
	const [format, setFormat] = useState<string>("PDF")
  const [course, setCourse] = useState<string>("All")
  const [department, setDepartment] = useState<string>("All")

	const reports = [
		{ id: "r1", name: "Course-wise student list", type: "Student", created: "2025-08-18", format: "PDF" },
		{ id: "r2", name: "Department-wise faculty list", type: "Faculty", created: "2025-08-19", format: "CSV" },
	]

  const handleGenerate = () => {
    // simulate generation
    alert(`Generating ${reportType} report in ${format} with ${reportType === "Student" ? `course=${course}` : `department=${department}`}`)
  }

	const filtered = reports.filter((r) =>
		(r.type === reportType) &&
		(query === "" || r.name.toLowerCase().includes(query.toLowerCase()))
	)

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Reports</h1>
					<p className="text-gray-600">Generate and export system reports</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline"><FileDown className="w-4 h-4 mr-2" /> Export Selected</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Filters</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
						<div className="relative md:col-span-2">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input className="pl-10" placeholder="Search reports..." value={query} onChange={(e) => setQuery(e.target.value)} />
						</div>
						<Select value={reportType} onValueChange={(v) => setReportType(v)}>
							<SelectTrigger><SelectValue placeholder="Report Type" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="Student">Student</SelectItem>
								<SelectItem value="Faculty">Faculty</SelectItem>
								<SelectItem value="Course">Course</SelectItem>
								<SelectItem value="Department">Department</SelectItem>
							</SelectContent>
						</Select>
              {reportType === "Student" && (
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Courses</SelectItem>
                    <SelectItem value="B.Tech CS">B.Tech CS</SelectItem>
                    <SelectItem value="BBA">BBA</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {reportType === "Faculty" && (
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                  </SelectContent>
                </Select>
              )}
						<Select value={format} onValueChange={(v) => setFormat(v)}>
							<SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="PDF">PDF</SelectItem>
								<SelectItem value="Excel">Excel</SelectItem>
								<SelectItem value="CSV">CSV</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" onClick={handleGenerate}><Filter className="w-4 h-4 mr-2" /> Generate</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Available Reports ({filtered.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Created</TableHead>
								<TableHead>Format</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((r) => (
								<TableRow key={r.id}>
									<TableCell className="font-medium">{r.name}</TableCell>
									<TableCell>{r.type}</TableCell>
									<TableCell>{r.created}</TableCell>
									<TableCell>{r.format}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 