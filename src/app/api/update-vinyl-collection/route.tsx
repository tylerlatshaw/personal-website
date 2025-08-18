import { NextResponse } from "next/server";

import supabase from "../../../utilities/supabase";

import type { VinylFormType } from "@/app/lib/type-library";

export async function POST(request: Request) {
    try {
        const formData: VinylFormType = await request.json();

        if (process.env.NODE_ENV != "development") {
            const apiKey = process.env.API_KEY;

            if (apiKey != formData.apiKey)
                return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
        }

        const id = formData.id && formData.id > 0 ? formData.id : undefined;
        const modifier = formData.id && formData.id > 0 ? "updated" : "added";

        const { data, error } = await supabase
            .from("vinyl_collection")
            .upsert({
                "id": id,
                "name": formData.name,
                "artist": formData.artist,
                "image_url": formData.imageUrl
            })
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: ("Successfully " + modifier + " " + data[0].name) }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}