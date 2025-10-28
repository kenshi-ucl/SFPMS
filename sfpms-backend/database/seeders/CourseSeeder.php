<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Department;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all departments for reference
        $departments = Department::all()->keyBy('code');

        $courses = [
            // Accountancy Program (AP)
            [
                'name' => 'Bachelor of Science in Accountancy',
                'code' => 'AP-001',
                'department_id' => $departments['AP']->id,
                'description' => 'Prepares students in financial, managerial, and auditing accountancy.',
                'status' => 'active',
            ],

            // Arts and Sciences Program (ASP)
            [
                'name' => 'Bachelor of Arts in Mass Communication',
                'code' => 'ASP-001',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Arts in Mass Communication program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Arts in Political Science',
                'code' => 'ASP-002',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Arts in Political Science program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Arts in English',
                'code' => 'ASP-003',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Arts in English program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Arts in Filipino',
                'code' => 'ASP-004',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Arts in Filipino program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Biology',
                'code' => 'ASP-005',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Science in Biology program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Applied Mathematics',
                'code' => 'ASP-006',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Science in Applied Mathematics program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Arts in Educational and Student Counselling',
                'code' => 'ASP-007',
                'department_id' => $departments['ASP']->id,
                'description' => 'Bachelor of Arts in Educational and Student Counselling program.',
                'status' => 'active',
            ],

            // Business Administration Program (BAP)
            [
                'name' => 'Bachelor of Science in Hospitality Management',
                'code' => 'BAP-001',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Hospitality Management program.',
                'status' => 'active',
            ],
            [
                'name' => 'Diploma in Hotel and Restaurant Services Technology',
                'code' => 'BAP-002',
                'department_id' => $departments['BAP']->id,
                'description' => 'Diploma in Hotel and Restaurant Services Technology program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Tourism Management',
                'code' => 'BAP-003',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Tourism Management program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Business Administration - Operations Management',
                'code' => 'BAP-004',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Business Administration with specialization in Operations Management.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Business Administration - Financials Management',
                'code' => 'BAP-005',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Business Administration with specialization in Financials Management.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Business Administration - Marketing Management',
                'code' => 'BAP-006',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Business Administration with specialization in Marketing Management.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Business Administration - Human Resource Management',
                'code' => 'BAP-007',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Business Administration with specialization in Human Resource Management.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Social Entrepreneurship - Agri-Aqua Business',
                'code' => 'BAP-008',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Social Entrepreneurship with specialization in Agri-Aqua Business.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Social Entrepreneurship - Arts and Crafts Business',
                'code' => 'BAP-009',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Social Entrepreneurship with specialization in Arts and Crafts Business.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Office Administration - Legal Office Management',
                'code' => 'BAP-010',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Office Administration with specialization in Legal Office Management.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Office Administration - Industry Office Management',
                'code' => 'BAP-011',
                'department_id' => $departments['BAP']->id,
                'description' => 'Bachelor of Science in Office Administration with specialization in Industry Office Management.',
                'status' => 'active',
            ],

            // Computer Studies Program (CSP)
            [
                'name' => 'Bachelor of Science in Computer Science',
                'code' => 'CSP-001',
                'department_id' => $departments['CSP']->id,
                'description' => 'Bachelor of Science in Computer Science program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Information Technology',
                'code' => 'CSP-002',
                'department_id' => $departments['CSP']->id,
                'description' => 'Bachelor of Science in Information Technology program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Information Technology - Computer Animation',
                'code' => 'CSP-003',
                'department_id' => $departments['CSP']->id,
                'description' => 'Bachelor of Science in Information Technology with special training in Computer Animation.',
                'status' => 'active',
            ],
            [
                'name' => 'Diploma in Information Technology',
                'code' => 'CSP-004',
                'department_id' => $departments['CSP']->id,
                'description' => 'Diploma in Information Technology program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Library and Information Science',
                'code' => 'CSP-005',
                'department_id' => $departments['CSP']->id,
                'description' => 'Bachelor of Library and Information Science program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Entertainment and Multimedia Computing',
                'code' => 'CSP-006',
                'department_id' => $departments['CSP']->id,
                'description' => 'Bachelor of Science in Entertainment and Multimedia Computing program.',
                'status' => 'active',
            ],

            // Criminal Justice Education Program (CJEP)
            [
                'name' => 'Bachelor of Science in Criminology',
                'code' => 'CJEP-001',
                'department_id' => $departments['CJEP']->id,
                'description' => 'Bachelor of Science in Criminology program.',
                'status' => 'active',
            ],

            // Engineering and Technology Program (ETP)
            [
                'name' => 'Bachelor of Science in Civil Engineering',
                'code' => 'ETP-001',
                'department_id' => $departments['ETP']->id,
                'description' => 'Bachelor of Science in Civil Engineering program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Industrial Engineering',
                'code' => 'ETP-002',
                'department_id' => $departments['ETP']->id,
                'description' => 'Bachelor of Science in Industrial Engineering program.',
                'status' => 'active',
            ],

            // Nursing Program (NP)
            [
                'name' => 'Bachelor of Science in Nursing',
                'code' => 'NP-001',
                'department_id' => $departments['NP']->id,
                'description' => 'Bachelor of Science in Nursing program.',
                'status' => 'active',
            ],

            // Teachers Education Program (TEP)
            [
                'name' => 'Bachelor of Elementary Education',
                'code' => 'TEP-001',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Elementary Education program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - English',
                'code' => 'TEP-002',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in English.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - Filipino',
                'code' => 'TEP-003',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in Filipino.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - Mathematics',
                'code' => 'TEP-004',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in Mathematics.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - Science',
                'code' => 'TEP-005',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in Science.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - Social Studies',
                'code' => 'TEP-006',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in Social Studies.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - MAPEH',
                'code' => 'TEP-007',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in MAPEH (Music, Arts, Physical Education, Health).',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Secondary Education - Values Education',
                'code' => 'TEP-008',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Secondary Education with specialization in Values Education.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Physical Education',
                'code' => 'TEP-009',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Physical Education program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Early Childhood Education',
                'code' => 'TEP-010',
                'department_id' => $departments['TEP']->id,
                'description' => 'Bachelor of Early Childhood Education program.',
                'status' => 'active',
            ],

            // Law Program (LAW)
            [
                'name' => 'Bachelor of Laws (LLB)',
                'code' => 'LAW-001',
                'department_id' => $departments['LAW']->id,
                'description' => 'Bachelor of Laws (LLB) program.',
                'status' => 'active',
            ],
            [
                'name' => 'Juris Doctor (JD)',
                'code' => 'LAW-002',
                'department_id' => $departments['LAW']->id,
                'description' => 'Juris Doctor (JD) program.',
                'status' => 'active',
            ],

            // Tourism and Hospitality Management Program (THMP)
            [
                'name' => 'Bachelor of Science in Hospitality Management',
                'code' => 'THMP-001',
                'department_id' => $departments['THMP']->id,
                'description' => 'Bachelor of Science in Hospitality Management program.',
                'status' => 'active',
            ],
            [
                'name' => 'Bachelor of Science in Tourism Management',
                'code' => 'THMP-002',
                'department_id' => $departments['THMP']->id,
                'description' => 'Bachelor of Science in Tourism Management program.',
                'status' => 'active',
            ],
        ];

        foreach ($courses as $course) {
            Course::updateOrCreate(
                ['code' => $course['code']],
                $course
            );
        }
    }
}
