"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LibraryCards() {
	const cards = [
		{ id: "lc1", user: "John Doe", cardNumber: "LC-2024-001", issue: "2024-08-01", expiry: "2025-07-31", status: "Active", booksIssued: 2, maxAllowed: 5 },
		{ id: "lc2", user: "Dr. Jane Smith", cardNumber: "LC-2020-101", issue: "2020-08-01", expiry: "2025-07-31", status: "Active", booksIssued: 1, maxAllowed: 8 },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Library Cards</h1>
					<p className="text-gray-600">Manage library card assignments and status</p>
				</div>
				<div className="flex gap-2">
					<Select defaultValue="all">
						<SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="Active">Active</SelectItem>
							<SelectItem value="Suspended">Suspended</SelectItem>
							<SelectItem value="Expired">Expired</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline">New Card</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Cards</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Card Number</TableHead>
								<TableHead>Issue</TableHead>
								<TableHead>Expiry</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Books</TableHead>
								<TableHead>Max</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{cards.map((c) => (
								<TableRow key={c.id}>
									<TableCell className="font-medium">{c.user}</TableCell>
									<TableCell>{c.cardNumber}</TableCell>
									<TableCell>{c.issue}</TableCell>
									<TableCell>{c.expiry}</TableCell>
									<TableCell>{c.status}</TableCell>
									<TableCell>{c.booksIssued}</TableCell>
									<TableCell>{c.maxAllowed}</TableCell>
									<TableCell className="text-right"><Button variant="outline" size="sm">Manage</Button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
} 