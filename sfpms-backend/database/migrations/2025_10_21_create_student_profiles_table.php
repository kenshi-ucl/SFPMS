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
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            
            // Course Information
            $table->string('course', 200)->nullable();
            $table->string('classified_as', 50)->nullable(); // CONTINUING, NEW, etc.
            
            // Personal Information
            $table->string('family_name', 100);
            $table->string('given_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->enum('gender', ['Male', 'Female'])->nullable();
            $table->string('blood_type', 10)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('height', 20)->nullable();
            $table->string('place_of_birth', 100)->nullable();
            $table->string('civil_status', 20)->nullable(); // Single, Married, etc.
            
            // Current Address
            $table->string('current_house_street', 150)->nullable();
            $table->string('current_barangay', 100)->nullable();
            $table->string('current_region', 100)->nullable();
            $table->string('current_province', 100)->nullable();
            $table->string('current_municipality', 100)->nullable();
            $table->string('current_zip_code', 10)->nullable();
            
            // Permanent Address
            $table->string('permanent_house_street', 150)->nullable();
            $table->string('permanent_barangay', 100)->nullable();
            $table->string('permanent_region', 100)->nullable();
            $table->string('permanent_province', 100)->nullable();
            $table->string('permanent_municipality', 100)->nullable();
            $table->string('permanent_zip_code', 10)->nullable();
            
            // Additional Personal Info
            $table->string('religion', 50)->nullable();
            $table->string('citizenship', 50)->nullable();
            $table->string('contact_phone', 20)->nullable();
            $table->string('contact_mobile', 20)->nullable();
            $table->string('email', 100)->nullable();
            
            // Languages Spoken
            $table->boolean('language_english')->default(false);
            $table->boolean('language_filipino')->default(false);
            $table->boolean('language_cebuano')->default(false);
            $table->string('language_others', 100)->nullable();
            
            // Elementary School
            $table->string('elementary_school_name', 150)->nullable();
            $table->text('elementary_school_address')->nullable();
            $table->string('elementary_year_graduated', 50)->nullable();
            $table->enum('elementary_school_type', ['Private', 'Public'])->nullable();
            
            // Junior High School
            $table->string('jhs_school_name', 150)->nullable();
            $table->text('jhs_school_address')->nullable();
            $table->string('jhs_year_graduated', 50)->nullable();
            $table->enum('jhs_school_type', ['Private', 'Public'])->nullable();
            
            // Senior High School
            $table->string('shs_school_name', 150)->nullable();
            $table->text('shs_school_address')->nullable();
            $table->string('shs_year_graduated', 50)->nullable();
            $table->enum('shs_school_type', ['Private', 'Public'])->nullable();
            
            // College/Master's Degree
            $table->string('college_school_name', 150)->nullable();
            $table->text('college_school_address')->nullable();
            $table->string('college_year_graduated', 50)->nullable();
            $table->enum('college_school_type', ['Private', 'Public'])->nullable();
            
            // Parent Profile - Mother
            $table->string('mother_maiden_name', 100)->nullable();
            $table->string('mother_first_name', 100)->nullable();
            $table->string('mother_middle_name', 100)->nullable();
            $table->string('mother_occupation', 100)->nullable();
            
            // Parent Profile - Father
            $table->string('father_family_name', 100)->nullable();
            $table->string('father_given_name', 100)->nullable();
            $table->string('father_middle_name', 100)->nullable();
            $table->string('father_occupation', 100)->nullable();
            
            // Siblings
            $table->integer('number_of_brothers')->default(0);
            $table->integer('number_of_sisters')->default(0);
            
            // Home Address (Parents)
            $table->text('home_address')->nullable();
            $table->string('home_zip_code', 10)->nullable();
            $table->string('home_municipality', 100)->nullable();
            $table->string('home_province', 100)->nullable();
            $table->string('home_phone', 20)->nullable();
            $table->string('home_mobile', 20)->nullable();
            
            // Guardian Information
            $table->string('guardian_family_name', 100)->nullable();
            $table->string('guardian_given_name', 100)->nullable();
            $table->string('guardian_middle_name', 100)->nullable();
            $table->string('guardian_relationship', 50)->nullable();
            $table->string('guardian_relationship_others', 100)->nullable();
            $table->text('guardian_address')->nullable();
            $table->string('guardian_phone', 20)->nullable();
            $table->string('guardian_mobile', 20)->nullable();
            
            // Spouse Information
            $table->string('spouse_family_name', 100)->nullable();
            $table->string('spouse_given_name', 100)->nullable();
            $table->string('spouse_middle_name', 100)->nullable();
            $table->integer('number_of_children')->default(0);
            $table->string('spouse_occupation', 100)->nullable();
            
            // Insurance Beneficiary/Breadwinner
            $table->string('insurance_beneficiary_family_name', 100)->nullable();
            $table->string('insurance_beneficiary_given_name', 100)->nullable();
            $table->string('insurance_beneficiary_middle_name', 100)->nullable();
            $table->date('insurance_beneficiary_dob')->nullable();
            
            // Financial Support
            $table->string('financial_support', 50)->nullable(); // Father, Mother, GrandFather, etc.
            $table->string('monthly_income', 50)->nullable(); // 10,000 and below, etc.
            
            // Academic Profile - Second Courser
            $table->boolean('is_second_courser')->default(false);
            $table->string('second_courser_degree_program', 150)->nullable();
            $table->string('second_courser_level', 50)->nullable(); // Graduate, Baccalaureate, Law, Voc-Tech
            
            // Working Student
            $table->boolean('is_working_student')->default(false);
            $table->string('employer_name', 150)->nullable();
            $table->text('employer_address')->nullable();
            
            // Transferee Information
            $table->boolean('is_transferee')->default(false);
            $table->json('previous_schools')->nullable(); // Array of {school, year_attended}
            $table->boolean('previously_applied')->default(false);
            $table->string('previous_application_year', 20)->nullable();
            $table->boolean('was_accepted')->nullable();
            $table->boolean('did_attend')->nullable();
            $table->string('attendance_year', 20)->nullable();
            
            // Additional Information
            $table->boolean('is_indigenous_people')->default(false);
            $table->string('indigenous_tribe', 100)->nullable();
            $table->boolean('has_disability')->default(false);
            $table->string('disability_type', 100)->nullable();
            $table->boolean('is_solo_parent_dependent')->default(false);
            $table->boolean('is_special_needs')->default(false);
            $table->text('special_needs_details')->nullable();
            
            // Profile Picture
            $table->string('profile_picture', 255)->nullable();
            $table->boolean('reuse_old_id_picture')->default(false);
            
            // Status and Timestamps
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};

