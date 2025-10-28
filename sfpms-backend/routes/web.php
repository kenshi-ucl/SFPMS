<?php

use Illuminate\Support\Facades\Route;

// Main application route - serves React SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
