import { NextResponse } from "next/server";
import supabase from "./../../../utilities/supabase";
import { RecordResultType } from "../../lib/type-library";

export async function GET() {
    try {
        const results: RecordResultType[] = [];
        const { data } = await supabase.from("Records").select(`
            id,
            created_at,
            modified_at,
            name,
            artist_id,
            year,
            image_url,
            discogs_url,
            Artists(id, name),
            RecordsToGenres(Genres(id, name))
        `);

        data?.forEach((item) => {
            results.push({
                id: item.id,
                createdAt: new Date(item.created_at),
                modifiedAt: new Date(item.modified_at),
                name: item.name,
                artist: item.Artists,
                genres: item.RecordsToGenres.map((genre) => {
                    return genre.Genres;
                }),
                year: item.year,
                imageUrl: item.image_url,
                discogsUrl: item.discogs_url
            });
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}