"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function TransportRegistration() {
	const regs = [
		{ id: "t1", user: "John Doe", route: "R-05", pickup: "Main Gate", drop: "Hostel", fee: 12000, from: "2024-08-01", to: "2025-07-31", status: "Active" },
	]

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Transport Registration</h1>
				<p className="text-gray-600">Manage campus transport subscriptions</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Registrations</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Route</TableHead>
								<TableHead>Pickup</TableHead>
								<TableHead>Drop</TableHead>
								<TableHead>Fee</TableHead>
								<TableHead>Valid From</TableHead>
								<TableHead>Valid To</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{regs.map((r) => (
								<TableRow key={r.id}>
									<TableCell className="font-medium">{r.user}</TableCell>
									<TableCell>{r.route}</TableCell>
									<TableCell>{r.pickup}</TableCell>
									<TableCell>{r.drop}</TableCell>
									<TableCell>₹{r.fee.toLocaleString()}</TableCell>
									<TableCell>{r.from}</TableCell>
									<TableCell>{r.to}</TableCell>
									<TableCell>{r.status}</TableCell>
									<TableCell className="text-right"><Button variant="outline" size="sm">Edit</Button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 