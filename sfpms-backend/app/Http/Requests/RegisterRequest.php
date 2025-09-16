<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[a-zA-Z\s\.\-\']+$/',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:6',
                'max:255',
                'confirmed',
            ],
            'role' => [
                'required',
                Rule::in(['admin', 'faculty', 'student']),
            ],
            'status' => [
                'sometimes',
                Rule::in(['active', 'inactive', 'suspended']),
            ],
            'employee_id' => [
                'nullable',
                'string',
                'max:50',
                'unique:users,employee_id',
                'required_if:role,admin,faculty',
            ],
            'student_id' => [
                'nullable',
                'string',
                'max:50',
                'unique:users,student_id',
                'required_if:role,student',
            ],
            'phone' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^\+?[\d\s\-\(\)]+$/',
            ],
            'address' => [
                'nullable',
                'string',
                'max:500',
            ],
            'date_of_birth' => [
                'nullable',
                'date',
                'before:today',
                'after:1900-01-01',
            ],
            'department_id' => [
                'nullable',
                'integer',
                'min:1',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Full name is required.',
            'name.min' => 'Name must be at least 2 characters long.',
            'name.regex' => 'Name can only contain letters, spaces, dots, hyphens, and apostrophes.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 6 characters long.',
            'password.confirmed' => 'Password confirmation does not match.',
            'role.required' => 'User role is required.',
            'role.in' => 'Invalid user role selected.',
            'employee_id.unique' => 'This employee ID is already in use.',
            'employee_id.required_if' => 'Employee ID is required for admin and faculty roles.',
            'student_id.unique' => 'This student ID is already in use.',
            'student_id.required_if' => 'Student ID is required for student role.',
            'phone.regex' => 'Please provide a valid phone number format.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'date_of_birth.after' => 'Please provide a valid date of birth.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'full name',
            'email' => 'email address',
            'password' => 'password',
            'employee_id' => 'employee ID',
            'student_id' => 'student ID',
            'phone' => 'phone number',
            'date_of_birth' => 'date of birth',
            'department_id' => 'department',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
