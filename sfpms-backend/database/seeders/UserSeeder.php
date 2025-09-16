<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@sfpms.edu',
            'password' => Hash::make('admin123'),
            'role' => User::ROLE_ADMIN,
            'status' => User::STATUS_ACTIVE,
            'employee_id' => 'ADMIN001',
            'phone' => '+1-555-0001',
            'address' => 'SFPMS Administrative Office',
            'joined_at' => now(),
        ]);

        // Create sample faculty users
        User::create([
            'name' => 'Dr. John Smith',
            'email' => 'john.smith@sfpms.edu',
            'password' => Hash::make('faculty123'),
            'role' => User::ROLE_FACULTY,
            'status' => User::STATUS_ACTIVE,
            'employee_id' => 'FAC001',
            'phone' => '+1-555-0002',
            'address' => '123 Faculty Street, Academic City',
            'date_of_birth' => '1980-05-15',
            'department_id' => 1,
            'joined_at' => now()->subMonths(6),
        ]);

        User::create([
            'name' => 'Dr. Sarah Johnson',
            'email' => 'sarah.johnson@sfpms.edu',
            'password' => Hash::make('faculty123'),
            'role' => User::ROLE_FACULTY,
            'status' => User::STATUS_ACTIVE,
            'employee_id' => 'FAC002',
            'phone' => '+1-555-0003',
            'address' => '456 Professor Avenue, Academic City',
            'date_of_birth' => '1985-08-22',
            'department_id' => 2,
            'joined_at' => now()->subMonths(8),
        ]);

        // Create sample student users
        User::create([
            'name' => 'Alice Williams',
            'email' => 'alice.williams@student.sfpms.edu',
            'password' => Hash::make('student123'),
            'role' => User::ROLE_STUDENT,
            'status' => User::STATUS_ACTIVE,
            'student_id' => 'STU2024001',
            'phone' => '+1-555-0004',
            'address' => '789 Student Lane, Academic City',
            'date_of_birth' => '2002-03-10',
            'department_id' => 1,
            'joined_at' => now()->subMonths(4),
        ]);

        User::create([
            'name' => 'Bob Davis',
            'email' => 'bob.davis@student.sfpms.edu',
            'password' => Hash::make('student123'),
            'role' => User::ROLE_STUDENT,
            'status' => User::STATUS_ACTIVE,
            'student_id' => 'STU2024002',
            'phone' => '+1-555-0005',
            'address' => '321 Campus Drive, Academic City',
            'date_of_birth' => '2001-07-18',
            'department_id' => 2,
            'joined_at' => now()->subMonths(4),
        ]);

        User::create([
            'name' => 'Carol Brown',
            'email' => 'carol.brown@student.sfpms.edu',
            'password' => Hash::make('student123'),
            'role' => User::ROLE_STUDENT,
            'status' => User::STATUS_ACTIVE,
            'student_id' => 'STU2024003',
            'phone' => '+1-555-0006',
            'address' => '654 Dormitory Road, Academic City',
            'date_of_birth' => '2003-11-25',
            'department_id' => 1,
            'joined_at' => now()->subMonths(3),
        ]);

        // Create an inactive user for testing
        User::create([
            'name' => 'Test Inactive User',
            'email' => 'inactive@sfpms.edu',
            'password' => Hash::make('test123'),
            'role' => User::ROLE_STUDENT,
            'status' => User::STATUS_INACTIVE,
            'student_id' => 'STU2024099',
            'phone' => '+1-555-0099',
            'address' => 'Test Address',
            'date_of_birth' => '2000-01-01',
            'joined_at' => now()->subMonths(1),
        ]);
    }
}
