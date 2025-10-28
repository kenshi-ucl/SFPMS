<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Accountancy Program',
                'code' => 'AP',
                'description' => 'Prepares students in financial, managerial, and auditing accountancy.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Arts and Sciences Program',
                'code' => 'ASP',
                'description' => 'Offers scientific, humanities, and social science majors.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Business Administration Program',
                'code' => 'BAP',
                'description' => 'Business, management, entrepreneurship specializations.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Computer Studies Program',
                'code' => 'CSP',
                'description' => 'IT, computer science, systems development careers.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Criminal Justice Education Program',
                'code' => 'CJEP',
                'description' => 'Law enforcement, criminology, forensic sciences.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Engineering and Technology Program',
                'code' => 'ETP',
                'description' => 'Civil and industrial engineering degrees.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Nursing Program',
                'code' => 'NP',
                'description' => 'Bachelor in professional nursing and healthcare.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Teachers Education Program',
                'code' => 'TEP',
                'description' => 'Training teachers for elementary and secondary education.',
                'head_of_department' => 'Dr. Marcris I. Abuan',
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Law Program',
                'code' => 'LAW',
                'description' => 'Undergraduate and graduate legal qualifications.',
                'head_of_department' => null,
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
            [
                'name' => 'Tourism and Hospitality Management Program',
                'code' => 'THMP',
                'description' => 'Industry-focused management for tourism/hospitality sector.',
                'head_of_department' => 'Dr. Mark Lennon S. Sitones',
                'email' => 'vpadmin@urios.edu.ph',
                'phone' => '+63 085 9759840',
                'location' => 'College Building, San Francisco Street, Butuan City',
                'status' => 'active',
            ],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['code' => $department['code']],
                $department
            );
        }
    }
}
