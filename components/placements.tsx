"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Placements() {
	const records = [
		{ id: "p1", student: "John Doe", company: "TechCorp", position: "SWE", package: 1200000, date: "2025-08-18", type: "On_Campus", status: "Placed" },
	]

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Placement Records</h1>
				<p className="text-gray-600">Track placements and internships</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Records</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student</TableHead>
								<TableHead>Company</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Package</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{records.map((r) => (
								<TableRow key={r.id}>
									<TableCell className="font-medium">{r.student}</TableCell>
									<TableCell>{r.company}</TableCell>
									<TableCell>{r.position}</TableCell>
									<TableCell>₹{r.package.toLocaleString()}</TableCell>
									<TableCell>{r.date}</TableCell>
									<TableCell>{r.type}</TableCell>
									<TableCell>{r.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 