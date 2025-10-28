<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            // Add department_id and course_id as foreign keys
            $table->foreignId('department_id')->nullable()->after('user_id')->constrained('departments')->onDelete('set null');
            $table->foreignId('course_id')->nullable()->after('department_id')->constrained('courses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['course_id']);
            $table->dropColumn(['department_id', 'course_id']);
        });
    }
};
