import { NextResponse } from "next/server";
import { Resend } from "resend";

import ComingSoonOnList from "../../../components/emails/coming-soon-on-the-list";
import ComingSoonSiteLive from "../../../components/emails/coming-soon-site-is-live";
import MessageReceived from "../../../components/emails/new-message-received";
import ThankYouEmail from "../../../components/emails/thank-you-email";

import {
    getCurrentDate,
    getCurrentDateTime
} from "../../../utilities/date-utilities";

import type { EmailFormType } from "../../lib/type-library";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromAddress = process.env.RESEND_FROM;
const myEmailAddress = process.env.RESEND_MY_EMAIL;
const devPrefix = "[Dev] ";

export async function POST(request: Request) {

    const {
        selection,
        formName,
        email,
        apiKey,
        title,
        name,
        message,
        source,
        referringPage
    } = await request.json() as EmailFormType;

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);

    const messageData = {
        date,
        dateTime,
        selection,
        formName,
        email,
        apiKey,
        title,
        name,
        message,
        source,
        referringPage
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        if (selection === "AutoReply") {
            const data = {
                name: messageData.name,
                email: messageData.email,
                message: messageData.message,
                source: messageData.formName,
                referringPage: messageData.referringPage,
                date: messageData.date,
                dateTime: messageData.dateTime,
                title: "I'll be in touch soon! ✉️"
            };
            await Promise.all([
                resend.emails.send({
                    from: `${fromAddress}`,
                    to: email,
                    bcc: `${myEmailAddress}`,
                    subject: devPrefix + "Thanks for reaching out!",
                    text: "",
                    react: <ThankYouEmail messageData={data} />
                })
            ]);
        }

        if (selection === "CS-OnList") {
            await Promise.all([
                resend.emails.send({
                    from: `${fromAddress}`,
                    to: email,
                    bcc: `${myEmailAddress}`,
                    subject: devPrefix + "You're on the list! ✅",
                    text: "",
                    react: <ComingSoonOnList messageData={{ ...messageData, title: "You're on the list!" }} />
                })
            ]);
        }

        if (selection === "CS-SiteLive") {
            await Promise.all([
                resend.emails.send({
                    from: `${fromAddress}`,
                    to: email,
                    bcc: `${myEmailAddress}`,
                    subject: devPrefix + "My Website is Now LIVE!",
                    text: "",
                    react: <ComingSoonSiteLive messageData={{ ...messageData, title: "Exciting News: My Website is Now LIVE! 🎉" }} />,
                })
            ]);
        }

        if (selection === "NewMessage") {
            await Promise.all([
                resend.emails.send({
                    from: `${fromAddress}`,
                    to: `${myEmailAddress}`,
                    bcc: `${myEmailAddress}`,
                    subject: devPrefix + "New Contact Form Submission: " + email,
                    text: "",
                    react: <MessageReceived messageData={{ ...messageData, title: "New Contact Form Submission" }} />,
                })
            ]);
        }

        return NextResponse.json(messageData.formName + " sent successfully to " + messageData.email);
    }

    return NextResponse.json("Authentication Error: Invalid API Key");
}