<?php

declare(strict_types=1);

namespace App\Http\Controllers;

class LangController extends Controller
{
    public function set(string $locale)
    {
        if (!in_array($locale, ["en", "pl"], true)) {
            return response()->json([], 400);
        }

        app()->setLocale($locale);
        session()->put("locale", $locale);

        return response()->json([], 200);
    }
}
