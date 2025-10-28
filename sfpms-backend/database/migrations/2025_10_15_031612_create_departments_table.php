<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, set all existing department_id values to null to avoid constraint violations
        DB::table('users')->whereNotNull('department_id')->update(['department_id' => null]);
        
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->string('head_of_department')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('location')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();

            $table->index('status');
            $table->index('code');
        });

        // Create some default departments
        DB::table('departments')->insert([
            [
                'name' => 'Computer Science',
                'code' => 'CS',
                'description' => 'Department of Computer Science and Information Technology',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mathematics',
                'code' => 'MATH',
                'description' => 'Department of Mathematics and Statistics',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Engineering',
                'code' => 'ENG',
                'description' => 'Department of Engineering and Applied Sciences',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Add foreign key constraint to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign key constraint first
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
        });
        
        Schema::dropIfExists('departments');
    }
};
