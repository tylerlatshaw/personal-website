/* eslint-disable import/no-anonymous-default-export */
import { Config } from "@netlify/functions";

type Data = {
    totalBooks: number,
    bookList: string
};

async function getData() {
    const res = await fetch(process.env.BASE_URL + "/api/get-currently-reading");
    return res.json();
}

async function setData(logEntry: Data) {
    const res = await fetch(process.env.BASE_URL + "/api/add-log-entry", {
        method: "POST",
        body: JSON.stringify(logEntry)
    });
    return res.json();
}

export default async () => {
    const data = await getData();

    const sortedData = data.sort((a, b) =>
        (a.createdAt < b.createdAt) ? 1 : -1
    );

    var bookTitles = "";

    for (const book of sortedData) {
        bookTitles += book.name + "; ";
    }

    const postRequest = await setData({ totalBooks: data.length, bookList: bookTitles });

    console.log(postRequest);

    return new Response(data);
};

export const config: Config = {
    schedule: "@daily"
};