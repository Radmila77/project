<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use App\Support\ClientResolver;
use Illuminate\Support\Arr;

class ReviewController extends Controller
{

    public function index()
    {
        $reviews = Review::query()
            ->with(['tariff', 'client'])
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

    public function store(ReviewRequest $request, ClientResolver $clientResolver)
    {
        $validated = $request->validated();
        $client = $clientResolver->resolve($validated['name'], null, null, false);

        $review = Review::create([
            ...Arr::except($validated, ['name', 'consent']),
            'client_id' => $client->id,
            'is_published' => false,
            'publication_status' => 'pending',
        ])->load(['tariff', 'client']);

        return response()->json($review);
    }

}
