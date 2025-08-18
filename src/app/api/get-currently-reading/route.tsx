import { NextResponse } from "next/server";

import supabase from "../../../utilities/supabase";

import type { CurrentlyReadingResultType } from "../../lib/type-library";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
                dateCompleted: item.date_completed ? new Date(item.date_completed!) : null,
                imageUrl: item.image_url
            });
        });

        return NextResponse.json(results, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data", { status: 500 });
    }
}