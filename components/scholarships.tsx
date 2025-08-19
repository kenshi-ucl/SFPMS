"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function Scholarships() {
	const apps = [
		{ id: "s1", student: "John Doe", name: "Merit Scholarship", amount: 20000, year: "2024-2025", status: "Approved", applied: "2025-08-10" },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Scholarships</h1>
					<p className="text-gray-600">Track applications and disbursements</p>
				</div>
				<Button className="bg-purple-600 hover:bg-purple-700">New Application</Button>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Applications</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student</TableHead>
								<TableHead>Scholarship</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Academic Year</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Applied</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{apps.map((a) => (
								<TableRow key={a.id}>
									<TableCell className="font-medium">{a.student}</TableCell>
									<TableCell>{a.name}</TableCell>
									<TableCell>₹{a.amount.toLocaleString()}</TableCell>
									<TableCell>{a.year}</TableCell>
									<TableCell>{a.status}</TableCell>
									<TableCell>{a.applied}</TableCell>
									<TableCell className="text-right"><Button variant="outline" size="sm">View</Button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 