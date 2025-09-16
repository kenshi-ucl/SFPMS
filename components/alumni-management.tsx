"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function AlumniManagement() {
	const alumni = [
		{ id: "a1", student: "John Doe", year: 2026, organization: "TechCorp", position: "SWE", location: "City", linkedin: "linkedin.com/in/jdoe", active: true },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Alumni</h1>
					<p className="text-gray-600">Manage alumni directory and engagement</p>
				</div>
				<Button className="bg-purple-600 hover:bg-purple-700">Convert to Alumni</Button>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Alumni Directory</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Year</TableHead>
								<TableHead>Organization</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>LinkedIn</TableHead>
								<TableHead>Active</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{alumni.map((a) => (
								<TableRow key={a.id}>
									<TableCell className="font-medium">{a.student}</TableCell>
									<TableCell>{a.year}</TableCell>
									<TableCell>{a.organization}</TableCell>
									<TableCell>{a.position}</TableCell>
									<TableCell>{a.location}</TableCell>
									<TableCell className="truncate max-w-[180px]">{a.linkedin}</TableCell>
									<TableCell>{a.active ? "Yes" : "No"}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 