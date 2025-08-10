import { NextResponse } from "next/server";
import supabase from "./../../../utilities/supabase";
import { VinylResultType } from "../../lib/type-library";

export async function GET() {
    try {
        const results: VinylResultType[] = [];
        const { data } = await supabase
            .from("vinyl_collection")
            .select();

        data?.forEach((item) => {
            results.push({
                id: item.id,
                createdAt: new Date(item.created_at),
                modifiedAt: new Date(item.modified_at),
                name: item.name,
                artist: item.artist,
                imageUrl: item.image_url
            });
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}