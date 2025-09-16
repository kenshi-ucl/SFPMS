<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    protected $token;
    protected $tokenType;
    protected $expiresIn;

    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @param  string  $token
     * @param  string  $tokenType
     * @param  int  $expiresIn
     * @return void
     */
    public function __construct($resource, $token = null, $tokenType = 'bearer', $expiresIn = null)
    {
        parent::__construct($resource);
        $this->token = $token;
        $this->tokenType = $tokenType;
        $this->expiresIn = $expiresIn;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'role' => $this->role,
                'status' => $this->status,
                'employee_id' => $this->employee_id,
                'student_id' => $this->student_id,
                'phone' => $this->phone,
                'department_id' => $this->department_id,
                'joined_at' => $this->joined_at?->format('Y-m-d H:i:s'),
            ],
            'access_token' => $this->token,
            'token_type' => $this->tokenType,
            'expires_in' => $this->expiresIn,
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Authentication successful',
            'timestamp' => now()->format('Y-m-d H:i:s'),
        ];
    }
}
