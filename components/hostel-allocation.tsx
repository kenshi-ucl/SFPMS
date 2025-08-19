"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function HostelAllocation() {
	const allocations = [
		{ id: "h1", student: "John Doe", hostel: "A Block", room: "101", bed: 1, from: "2024-08-01", to: "2025-07-31", status: "Occupied", fee: 30000 },
	]

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Hostel Allocation</h1>
				<p className="text-gray-600">Track hostel occupancy and fees</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Allocations</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student</TableHead>
								<TableHead>Hostel</TableHead>
								<TableHead>Room</TableHead>
								<TableHead>Bed</TableHead>
								<TableHead>From</TableHead>
								<TableHead>To</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Fee</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{allocations.map((a) => (
								<TableRow key={a.id}>
									<TableCell className="font-medium">{a.student}</TableCell>
									<TableCell>{a.hostel}</TableCell>
									<TableCell>{a.room}</TableCell>
									<TableCell>{a.bed}</TableCell>
									<TableCell>{a.from}</TableCell>
									<TableCell>{a.to}</TableCell>
									<TableCell>{a.status}</TableCell>
									<TableCell>₹{a.fee.toLocaleString()}</TableCell>
									<TableCell className="text-right"><Button variant="outline" size="sm">Update</Button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 