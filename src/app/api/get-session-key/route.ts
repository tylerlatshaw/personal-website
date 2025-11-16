import { cookies } from "next/headers";

export async function GET() {

    const existing = cookies().get("session_key");

    if (!existing) {
        const key = crypto.randomUUID();
        cookies().set("session_key", key, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
    }

    return Response.json({ ok: true });
}