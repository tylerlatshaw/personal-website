/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { CurrentlyReadingResultType } from "./../../app/lib/type-library";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import CurrentlyReadingLoading from "./currently-reading-loading";

export default function CurrentlyReadingContainer() {

    const [data, setData] = useState<CurrentlyReadingResultType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            axios.get("/api/get-currently-reading").then((response) => {
                setData(response.data);
                setLoading(false);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    function generateCards() {
        const sortedData = data.sort((a, b) => {
            if (a.createdAt > b.createdAt)
                return 1;
            else
                return -1;
        });

        return sortedData && sortedData.map((record) => {
            return <>
                <div key={record.id} className="flex flex-row gap-2">
                    <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-1/2">
                        <img src={record.imageUrl} alt={record.name} className="w-full h-full rounded" />
                    </div>
                    <div className="flex flex-col w-1/2 px-1 pt-4 mx-auto text-center gap-12">
                        <div className="space-y-2">
                            <h3 className="leading-snug font-bold text-lg">{record.name}</h3>
                            <div className="mx-auto text-base italic text-gray-200 leading-tight">By {record.author}</div>
                        </div>
                        <div className="space-y-2">
                            <span>Progress: {record.percentComplete}%</span>
                            <LinearProgress value={record.percentComplete} variant="determinate" sx={{ "height": "8px", "borderRadius": "8px" }} />
                        </div>
                    </div>
                </div>
            </>;
        });
    }

    return <>
        {loading ? <CurrentlyReadingLoading /> : generateCards()}
    </>;
}