"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export type Template = {
	id: string
	templateName: string
	templateType: "Email" | "SMS" | "Push" | "InApp"
	subject?: string
	bodyTemplate: string
	variables: string[]
	isActive: boolean
}

const initialTemplates: Template[] = [
	{
		id: "t1",
		templateName: "Fee Reminder",
		templateType: "Email",
		subject: "Fee Payment Reminder",
		bodyTemplate: "Dear {{name}}, your fee is due by {{due_date}}.",
		variables: ["name", "due_date"],
		isActive: true,
	},
	{
		id: "t2",
		templateName: "Exam Schedule",
		templateType: "SMS",
		bodyTemplate: "Exam starts on {{date}}. Check portal for timetable.",
		variables: ["date"],
		isActive: true,
	},
]

export function NotificationTemplates() {
	const [templates, setTemplates] = useState<Template[]>(initialTemplates)
	const [open, setOpen] = useState(false)
	const [draft, setDraft] = useState<Partial<Template>>({ templateType: "Email", isActive: true, variables: [] })

	const addVariable = (name: string) => {
		if (!name) return
		setDraft((d) => ({ ...d, variables: [...(d.variables || []), name] }))
	}

	const removeVariable = (name: string) => {
		setDraft((d) => ({ ...d, variables: (d.variables || []).filter((v) => v !== name) }))
	}

	const saveTemplate = () => {
		if (!draft.templateName || !draft.bodyTemplate) return
		setTemplates((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				templateName: draft.templateName!,
				templateType: (draft.templateType as any) || "Email",
				subject: draft.subject,
				bodyTemplate: draft.bodyTemplate!,
				variables: draft.variables || [],
				isActive: draft.isActive ?? true,
			},
		])
		setOpen(false)
		setDraft({ templateType: "Email", isActive: true, variables: [] })
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Notification Templates</h1>
					<p className="text-gray-600">Manage reusable templates for Email, SMS, Push, and In-App</p>
				</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button className="bg-purple-600 hover:bg-purple-700">New Template</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Create Template</DialogTitle>
						</DialogHeader>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm">Name</label>
									<Input value={draft.templateName || ""} onChange={(e) => setDraft({ ...draft, templateName: e.target.value })} />
								</div>
								<div>
									<label className="text-sm">Type</label>
									<Select value={draft.templateType as any} onValueChange={(v) => setDraft({ ...draft, templateType: v as any })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Email">Email</SelectItem>
											<SelectItem value="SMS">SMS</SelectItem>
											<SelectItem value="Push">Push</SelectItem>
											<SelectItem value="InApp">In-App</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							{(draft.templateType === "Email" || draft.templateType === "Push") && (
								<div>
									<label className="text-sm">Subject</label>
									<Input value={draft.subject || ""} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} />
								</div>
							)}
							<div>
								<label className="text-sm">Body Template</label>
								<Textarea rows={6} value={draft.bodyTemplate || ""} onChange={(e) => setDraft({ ...draft, bodyTemplate: e.target.value })} />
							</div>
							<div>
								<label className="text-sm">Variables</label>
								<div className="flex gap-2">
									<Input placeholder="e.g., name" onKeyDown={(e) => {
										if (e.key === "Enter") { e.preventDefault(); addVariable((e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ""; }
									}} />
									<Button type="button" variant="outline" onClick={() => addVariable((document.activeElement as HTMLInputElement)?.value || "")}>Add</Button>
								</div>
								<div className="mt-2 flex flex-wrap gap-2">
									{(draft.variables || []).map((v) => (
										<Badge key={v} className="bg-purple-100 text-purple-800 cursor-pointer" onClick={() => removeVariable(v)}>{v} ×</Badge>
									))}
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
								<Button onClick={saveTemplate} className="bg-purple-600 hover:bg-purple-700">Save</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{templates.map((t) => (
					<Card key={t.id}>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<span>{t.templateName}</span>
								<Badge className={t.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{t.templateType}</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							{t.subject && <div className="text-sm"><span className="font-medium">Subject:</span> {t.subject}</div>}
							<div className="text-sm text-gray-700 whitespace-pre-wrap">{t.bodyTemplate}</div>
							<div className="flex gap-2 flex-wrap">
								{t.variables.map((v) => (
									<Badge key={v} className="bg-purple-100 text-purple-800">{`{{${v}}}`}</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
} 