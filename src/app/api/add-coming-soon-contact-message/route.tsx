import { NextResponse } from "next/server";
import { Resend } from "resend";
import MessageReceived from "../../../components/emails/new-message-received";
import ComingSoonOnList from "../../../components/emails/coming-soon-on-the-list";
import { getCurrentDate, getCurrentDateTime } from "../../../utilities/date-utilities";
import supabase from "./../../../utilities/supabase";

import type { ContactDataType, ContactResultType } from "../../lib/type-library";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromAddress = process.env.RESEND_FROM;
const myEmailAddress = process.env.RESEND_MY_EMAIL;

export async function POST(request: Request) {

    const {
        name,
        email,
        message,
        source,
        referringPage
    } = await request.json() as ContactDataType;

    try {
        const results: ContactResultType[] = [];
        const { data } = await supabase.from("contact_messages").select().eq("email", email);

        data?.forEach((item: any) => {
            results.push({
                id: item.id,
                createdAt: new Date(item.created_at),
                modifiedAt: new Date(item.modified_at),
                name: item.name,
                email: item.email,
                message: item.message,
                referringPage: item.referring_page,
                formSource: item.form_source
            });
        });

        const unfilteredData = results.filter((item) => {
            return item.formSource === "Coming Soon";
        });

        if (unfilteredData.length > 0) {
            return NextResponse.json("You're already on the list!");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);
    const title = "";

    const messageData = {
        date,
        dateTime,
        title,
        name,
        email,
        message,
        source,
        referringPage
    };

    try {
        await Promise.all([
            supabase.from("contact_messages").insert({
                "name": name,
                "email": email,
                "message": message,
                "form_source": source,
                "referring_page": referringPage
            }),
            resend.emails.send({
                from: `${fromAddress}`,
                to: `${myEmailAddress}`,
                bcc: `${myEmailAddress}`,
                subject: "New Contact Form Submission: " + email,
                text: "",
                react: <MessageReceived messageData={{ ...messageData, title: "New Contact Form Submission" }} />,
            }),
            resend.emails.send({
                from: `${fromAddress}`,
                to: email,
                bcc: `${myEmailAddress}`,
                subject: "You're on the list! ✅",
                text: "",
                react: <ComingSoonOnList messageData={{ ...messageData, title: "You're on the list!" }} />,
            })
        ]);

        return NextResponse.json("Got it! I'll notify you when the site goes live.");
    } catch (error) {
        return NextResponse.json("Something went wrong. Please try again.");
    }
}
