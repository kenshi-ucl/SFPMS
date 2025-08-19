"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCheck, BookOpen, Calendar, Award, FileText, TrendingUp, GraduationCap } from "lucide-react"

export function FacultyPortal() {
	const profile = {
		name: "Dr. Jane Smith",
		email: "faculty@university.edu",
		department: "Computer Science",
		designation: "Professor",
		teachingLoad: 12,
		feedbackRating: 4.8,
	}

	const teachingAssignments = [
		{ code: "CS502", course: "Operating Systems", semester: 5, role: "Primary", students: 85 },
		{ code: "CS605", course: "Machine Learning", semester: 6, role: "Primary", students: 72 },
		{ code: "CS610", course: "Data Mining Lab", semester: 6, role: "Lab", students: 72 },
	]

	const research = [
		{ type: "Paper", title: "Efficient Federated Learning", venue: "NeurIPS 2024", year: 2024 },
		{ type: "Grant", title: "AI for Education", venue: "Govt. Research Fund", year: 2025 },
	]

	const notifications = [
		{ title: "Submit internal assessment marks", time: "Due in 3 days" },
		{ title: "Conference CFP: AI in Education", time: "Deadline Sep 30" },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Faculty Home</h1>
					<p className="text-gray-600">Welcome back, {profile.name}</p>
				</div>
				<div className="flex items-center gap-3">
					<Button className="bg-purple-600 hover:bg-purple-700">View Profile</Button>
					<Button variant="outline">Download Timetable</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Teaching Load</CardTitle>
						<BookOpen className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{profile.teachingLoad} hrs/week</div>
						<div className="text-sm text-green-600 flex items-center"><TrendingUp className="h-4 w-4 mr-1" /> Balanced</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Feedback Rating</CardTitle>
						<UserCheck className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{profile.feedbackRating}</div>
						<p className="text-sm text-gray-500">Student feedback</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Active Courses</CardTitle>
						<GraduationCap className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{teachingAssignments.length}</div>
						<p className="text-sm text-gray-500">This semester</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">Publications</CardTitle>
						<FileText className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900">{research.filter(r => r.type === "Paper").length}</div>
						<p className="text-sm text-gray-500">Recent years</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Teaching Assignments</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Code</TableHead>
									<TableHead>Course</TableHead>
									<TableHead>Semester</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Students</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{teachingAssignments.map((t) => (
									<TableRow key={t.code}>
										<TableCell className="font-medium">{t.code}</TableCell>
										<TableCell>{t.course}</TableCell>
										<TableCell>{t.semester}</TableCell>
										<TableCell>
											<Badge className="bg-purple-100 text-purple-800">{t.role}</Badge>
										</TableCell>
										<TableCell>{t.students}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Research & Grants</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{research.map((r) => (
							<div key={r.title} className="flex items-center justify-between p-3 rounded-lg border">
								<div>
									<div className="font-medium">{r.title}</div>
									<div className="text-xs text-gray-500">{r.type} • {r.venue} • {r.year}</div>
								</div>
								<Award className="h-4 w-4 text-purple-600" />
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{notifications.map((n) => (
						<div key={n.title} className="flex items-center justify-between p-3 rounded-lg border">
							<div>
								<div className="text-sm font-medium">{n.title}</div>
								<div className="text-xs text-gray-500">{n.time}</div>
							</div>
							<Button variant="ghost" size="sm">View</Button>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	)
} 