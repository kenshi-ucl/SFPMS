"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Bell, Mail, Phone, AlertTriangle } from "lucide-react"

export type NotificationRecord = {
	id: string
	type: "System" | "Academic" | "Administrative"
	title: string
	message: string
	priority: "Low" | "Medium" | "High" | "Urgent"
	isRead: boolean
	createdAt: number
}

const initialNotifications: NotificationRecord[] = [
	{
		id: "n1",
		type: "Academic",
		title: "Course registration opens",
		message: "Registration period starts tomorrow at 9 AM.",
		priority: "Medium",
		isRead: false,
		createdAt: Date.now() - 2 * 60 * 60 * 1000,
	},
	{
		id: "n2",
		type: "Administrative",
		title: "Fee reminder",
		message: "Tuition fee due by Sep 30.",
		priority: "High",
		isRead: false,
		createdAt: Date.now() - 26 * 60 * 60 * 1000,
	},
	{
		id: "n3",
		type: "System",
		title: "Password changed",
		message: "Your password was updated successfully.",
		priority: "Low",
		isRead: true,
		createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
	},
]

export function NotificationsCenter() {
	const [notifications, setNotifications] = useState<NotificationRecord[]>(initialNotifications)
	const [search, setSearch] = useState("")
	const [filterType, setFilterType] = useState<string>("all")
	const [filterPriority, setFilterPriority] = useState<string>("all")

	const filtered = useMemo(() => {
		return notifications.filter((n) => {
			const matchesSearch =
				n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase())
			const matchesType = filterType === "all" || n.type === filterType
			const matchesPriority = filterPriority === "all" || n.priority === filterPriority
			return matchesSearch && matchesType && matchesPriority
		})
	}, [notifications, search, filterType, filterPriority])

	const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
	const toggleRead = (id: string) =>
		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)))

	const priorityClass = (p: NotificationRecord["priority"]) => {
		switch (p) {
			case "Urgent":
				return "bg-red-100 text-red-800"
			case "High":
				return "bg-orange-100 text-orange-800"
			case "Medium":
				return "bg-yellow-100 text-yellow-800"
			default:
				return "bg-gray-100 text-gray-800"
		}
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
					<p className="text-gray-600">System, academic, and administrative alerts</p>
				</div>
				<Button onClick={markAllRead} className="bg-purple-600 hover:bg-purple-700">Mark all as read</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Filter & Search</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
						<Select value={filterType} onValueChange={setFilterType}>
							<SelectTrigger>
								<SelectValue placeholder="Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="System">System</SelectItem>
								<SelectItem value="Academic">Academic</SelectItem>
								<SelectItem value="Administrative">Administrative</SelectItem>
							</SelectContent>
						</Select>
						<Select value={filterPriority} onValueChange={setFilterPriority}>
							<SelectTrigger>
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Priorities</SelectItem>
								<SelectItem value="Low">Low</SelectItem>
								<SelectItem value="Medium">Medium</SelectItem>
								<SelectItem value="High">High</SelectItem>
								<SelectItem value="Urgent">Urgent</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-3">
				{filtered.map((n) => (
					<div key={n.id} className={`flex items-start gap-3 p-4 rounded-lg border ${n.isRead ? "bg-white" : "bg-purple-50"}`}>
						<Bell className="h-4 w-4 text-purple-600 mt-1" />
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<div className="font-medium">{n.title}</div>
								<Badge className="bg-purple-100 text-purple-800">{n.type}</Badge>
								<Badge className={priorityClass(n.priority)}>{n.priority}</Badge>
								<span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
							</div>
							<div className="text-sm text-gray-700">{n.message}</div>
						</div>
						<Button variant="outline" size="sm" onClick={() => toggleRead(n.id)}>{n.isRead ? "Mark unread" : "Mark read"}</Button>
					</div>
				))}
			</div>
		</div>
	)
} 