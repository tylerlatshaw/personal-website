import { NextResponse } from "next/server";
import supabase from "./../../../utilities/supabase";
import { CurrentlyReadingResultType } from "../../lib/type-library";

export async function GET() {
    try {
        const results: CurrentlyReadingResultType[] = [];
        const { data } = await supabase.from("currently_reading").select();

        data?.forEach((item) => {
            results.push({
                id: item.id,
                createdAt: new Date(item.created_at),
                modifiedAt: new Date(item.modified_at),
                name: item.name,
                author: item.author,
                percentComplete: item.percent_complete,
                imageUrl: item.image_url
            });
        });

        // Disable caching
        return new NextResponse(JSON.stringify(results), {
            status: 200,
            headers: {
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}