import { NextResponse } from "next/server";

import supabase from "../../../utilities/supabase";

import { CurrentlyReadingResultType } from "@/app/lib/type-library";

type Data = {
    totalBooks: number,
    bookList: string
};

export async function POST(request: Request) {

    const key = request.headers.get("x-api-key");

    if (key != process.env.API_KEY) {
        return new Response("Error: invalid API key. Access denied.", { status: 403 });
    }

    try {
        const currentlyReadingData: CurrentlyReadingResultType[] = [];
        const { data: currentlyReadingRes } = await supabase.from("currently_reading").select();

        currentlyReadingRes?.forEach((item) => {
            currentlyReadingData.push({
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

        currentlyReadingData?.sort((a, b) =>
            (a.createdAt < b.createdAt) ? 1 : -1
        );

        var bookTitles = "";

        for (const book of currentlyReadingData || []) {
            bookTitles += book.name + "; ";
        }

        const logEntry: Data = {
            totalBooks: currentlyReadingData?.length || 0,
            bookList: bookTitles
        };

        const entryText = "Current Number of Books Stored: " + logEntry.totalBooks + " Book List: " + logEntry.bookList;

        const { data, error } = await supabase
            .from("table_log")
            .insert({
                "log_entry": entryText
            })
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}