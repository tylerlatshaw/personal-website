import supabase from "./../../../utilities/supabase";
import { NextResponse } from "next/server";

type Data = {
    totalBooks: number,
    bookList: string
};

export async function POST(request: Request) {
    try {
        const logEntry: Data = await request.json();

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