import { NextResponse } from "next/server";

import supabase from "../../../utilities/supabase";

export async function POST(request: Request) {
    try {
        const formdata = await request.formData();
        const body = Object.fromEntries(formdata);
        const file = (body.file as Blob) || null;
        const filename = formdata.get("filename");
        const directory = formdata.get("directory");

        if (process.env.NODE_ENV != "development") {
            const apiKey = process.env.API_KEY;

            if (apiKey != formdata.get("apiKey"))
                return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
        }

        const { data, error } = await supabase.storage
            .from("personal-website-storage")
            .upload(`${directory}/${filename}`, file, {
                cacheControl: "3600",
                upsert: false
            });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}