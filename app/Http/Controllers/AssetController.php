<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetClass;
use App\Models\AssetDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the assets.
     */
    public function index()
    {
        // Eager load the related AssetClass and AssetDetail
        $assets = Asset::with(['assetClass', 'assetDetail'])->get();

        return Inertia::render('Assets/Index', [
            'assets' => $assets,
        ]);
    }

    /**
     * Show the form for creating a new asset.
     */
    public function create()
    {
        $assetClasses = AssetClass::orderBy('class_number')->get();

        return Inertia::render('Assets/Create', [
            'assetClasses' => $assetClasses,
        ]);
    }

    /**
     * Store a newly created asset in storage.
     */
    /**
     * Store a newly created asset in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:users,id',
            'asset_class_id' => 'required|exists:asset_classes,id',
            'details' => 'required|array',
        ]);

        // Create the Asset
        $asset = Asset::create([
            'client_id' => $request->client_id,
            'asset_class_id' => $request->asset_class_id,
        ]);

        // Create the AssetDetail, passing the raw array for `details`
        AssetDetail::create([
            'asset_id' => $asset->id,
            'client_id' => $request->client_id,
            'details' => $request->details, // <--- Store the array directly
        ]);

        return redirect()->route('assets.index')
                         ->with('success', 'Asset created successfully.');
    }

    /**
     * Update the specified asset in storage.
     */
    public function update(Request $request, Asset $asset)
    {
        $request->validate([
            'asset_class_id' => 'required|exists:asset_classes,id',
            'details' => 'required|array',
        ]);

        // Update the Asset
        $asset->update([
            'asset_class_id' => $request->asset_class_id,
        ]);

        // Update or create the AssetDetail
        $asset->assetDetail()->updateOrCreate(
            ['asset_id' => $asset->id],
            [
                'client_id' => $asset->client_id,
                'details' => $request->details, // <--- Store the array directly
            ]
        );

        return redirect()->route('assets.index')
                         ->with('success', 'Asset updated successfully.');
    }

    /**
     * Show the form for editing the specified asset.
     */
    public function edit(Asset $asset)
    {
        // Eager load the relationships
        $asset->load('assetClass', 'assetDetail');
        $assetClasses = AssetClass::orderBy('class_number')->get();

        return Inertia::render('Assets/Edit', [
            'asset' => $asset,
            'assetClasses' => $assetClasses,
        ]);
    }


    /**
     * Remove the specified asset from storage.
     */
    public function destroy(Asset $asset)
    {
        // Delete details first
        $asset->assetDetail()->delete();
        // Delete the asset
        $asset->delete();

        return redirect()->route('assets.index')
                         ->with('success', 'Asset deleted successfully.');
    }
}
