<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        return Categorie::with('enfants')->whereNull('parent_id')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        $categorie = Categorie::create($validated);

        return response()->json($categorie, 201);
    }

    public function update(Request $request, Categorie $categorie)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        $categorie->update($validated);

        return response()->json($categorie);
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json(null, 204);
    }
}
