<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'status' => $this->status,
            'employee_id' => $this->employee_id,
            'student_id' => $this->student_id,
            'phone' => $this->phone,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth?->format('Y-m-d'),
            'department_id' => $this->department_id,
            'department' => $this->whenLoaded('department', function () {
                return [
                    'id' => $this->department->id,
                    'name' => $this->department->name,
                    'code' => $this->department->code,
                ];
            }),
            'joined_at' => $this->joined_at?->format('Y-m-d H:i:s'),
            'email_verified_at' => $this->email_verified_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
