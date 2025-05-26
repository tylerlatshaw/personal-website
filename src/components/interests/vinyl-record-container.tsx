/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { RecordResultType } from "./../../app/lib/type-library";
import axios from "axios";
import VinylRecordLoading from "./vinyl-record-loading";

export default function VinylRecordContainer() {

    const [records, setRecords] = useState<RecordResultType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            axios.get("/api/get-records").then((response) => {
                setRecords(response.data);
                setLoading(false);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    function generateCards() {
        const sortedData = records.sort((a, b) => {
            if (a.name > b.name)
                return 1;
            else
                return -1;
        });

        return sortedData && sortedData.map((record) => {
            return <>
                <div key={record.id}>
                    <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-100">
                        <img src={"/static/interests/" + record.imageUrl} alt={record.name} className="aspect-square w-full rounded" />
                    </div>
                    <div className="px-1 pt-2 pb-4 mx-auto text-center">
                        <div className="space-y-1">
                            <h3 className="leading-snug font-bold text-base">{record.name}</h3>
                            <div className="mx-auto text-sm italic text-gray-200 leading-tight">{record.artist.name}</div>
                        </div>
                    </div>
                </div>
            </>;
        });
    }

    return <>
        {loading ? <VinylRecordLoading /> : generateCards()}
    </>;
}