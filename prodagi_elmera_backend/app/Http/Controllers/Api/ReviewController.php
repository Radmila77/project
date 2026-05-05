<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;

class ReviewController extends Controller
{

    public function index()
    {
        $reviews = Review::query()
            ->with('tariff')
            ->where('is_published', true)
            ->when(
                request('tariff_id'),
                fn ($query, $tariffId) => $query->where('tariff_id', $tariffId)
            )
            ->when(
                request('tariff'),
                fn ($query, $tariffKey) => $query->whereHas(
                    'tariff',
                    fn ($tariffQuery) => $tariffQuery->where('key', $tariffKey)
                )
            )
            ->orderBy('rating', 'desc')
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    public function store(ReviewRequest $request)
    {
        $review = Review::create([
            ...$request->validated(),
            'is_published' => false,
            'publication_status' => 'pending',
        ])->load('tariff');

        return response()->json($review);
    }

}
