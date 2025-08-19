"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, BookOpen, Calendar, FileText, Award, Bell, TrendingUp } from "lucide-react"

export function StudentPortal() {
	const profile = {
		name: "John Doe",
		username: "jdoe",
		email: "student@university.edu",
		program: "B.Tech Computer Science",
		department: "Computer Science",
		year: 3,
		semester: 6,
		cgpa: 8.52,
		attendance: 92,
		backlogs: 0,
		photo: undefined as string | undefined,
	}

	const currentCourses = [
		{ code: "CS601", name: "Distributed Systems", credits: 4, attendance: 95 },
		{ code: "CS603", name: "Advanced Algorithms", credits: 3, attendance: 90 },
		{ code: "CS605", name: "Machine Learning", credits: 4, attendance: 92 },
	]

	const upcomingEvents = [
		{ date: "2025-09-05", title: "Mid-term Exams Begin", type: "Exam" },
		{ date: "2025-09-12", title: "Project Proposal Submission", type: "Deadline" },
		{ date: "2025-09-20", title: "AI Club Hackathon", type: "Event" },
	]

	const documents = [
		{ type: "Admission Letter", status: "Verified" },
		{ type: "Marksheet (Sem 5)", status: "Verified" },
		{ type: "ID Proof", status: "Pending" },
	]

	const notifications = [
		{ title: "Course registration window open", category: "Academic", time: "2h ago" },
		{ title: "Fee reminder: Tuition due Sep 30", category: "Administrative", time: "1d ago" },
		{ title: "Semester timetable published", category: "System", time: "3d ago" },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Student Home</h1>
					<p className="text-gray-600">Welcome back, {profile.name}</p>
				</div>
				<div className="flex items-center gap-3">
					<Button className="bg-purple-600 hover:bg-purple-700">Download ID Card</Button>
					<Button variant="outline">View Profile</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">CGPA</CardTitle>
						<GraduationCap className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{profile.cgpa.toFixed(2)}</div>
						<div className="text-sm text-green-600 flex items-center"><TrendingUp className="h-4 w-4 mr-1" /> +0.12</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Attendance</CardTitle>
						<Calendar className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{profile.attendance}%</div>
						<p className="text-sm text-gray-500">This semester</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Backlogs</CardTitle>
						<FileText className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{profile.backlogs}</div>
						<p className="text-sm text-gray-500">Open backlogs</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Achievements</CardTitle>
						<Award className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">3</div>
						<p className="text-sm text-gray-500">Recent accolades</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Current Courses</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Code</TableHead>
									<TableHead>Course</TableHead>
									<TableHead>Credits</TableHead>
									<TableHead>Attendance</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{currentCourses.map((c) => (
									<TableRow key={c.code}>
										<TableCell className="font-medium">{c.code}</TableCell>
										<TableCell>{c.name}</TableCell>
										<TableCell>{c.credits}</TableCell>
										<TableCell>
											<Badge className="bg-purple-100 text-purple-800">{c.attendance}%</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Upcoming Events</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{upcomingEvents.map((e) => (
							<div key={e.title} className="flex items-center justify-between p-3 rounded-lg border">
								<div>
									<div className="font-medium">{e.title}</div>
									<div className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString()} • {e.type}</div>
								</div>
								<Calendar className="h-4 w-4 text-purple-600" />
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Documents</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{documents.map((d) => (
							<div key={d.type} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-gray-500" />
									<span className="text-sm">{d.type}</span>
								</div>
								<Badge className={d.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
									{d.status}
								</Badge>
							</div>
						))}
						<Button variant="outline" size="sm" className="mt-2 w-full">Upload New</Button>
					</CardContent>
				</Card>
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{notifications.map((n) => (
							<div key={n.title} className="flex items-center gap-3 p-3 rounded-lg border">
								<Bell className="h-4 w-4 text-purple-600" />
								<div className="flex-1">
									<div className="text-sm font-medium">{n.title}</div>
									<div className="text-xs text-gray-500">{n.category} • {n.time}</div>
								</div>
								<Button variant="ghost" size="sm">View</Button>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	)
} 