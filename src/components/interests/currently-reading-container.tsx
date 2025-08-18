"use client";

/* eslint-disable @next/next/no-img-element */
import {
    useEffect,
    useState
} from "react";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { LinearProgress } from "@mui/material";
import dayjs from "dayjs";

import CurrentlyReadingLoading from "./currently-reading-loading";

import type { CurrentlyReadingResultType } from "../../app/lib/type-library";

export default function CurrentlyReadingContainer() {

    const imageFilepath = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/personal-website-storage/";

    const [currentlyReading, setCurrentlyReading] = useState<CurrentlyReadingResultType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("/api/get-currently-reading", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                setCurrentlyReading(json);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const currentData = currentlyReading.filter((a) => {
        return a.percentComplete > 0 && a.percentComplete < 100;
    });
    const recentData = currentlyReading.filter((a) => {
        return a.percentComplete === 100 && dayjs(a.dateCompleted!) >= dayjs().subtract(60, "days");
    });

    const BookCard = (record: CurrentlyReadingResultType) => <>
        <div key={record.id} className="flex flex-row gap-2">
            <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-1/2">
                <img src={imageFilepath + record.imageUrl} alt={record.name} className="w-full h-full rounded" />
            </div>
            <div className="flex flex-col justify-between h-2/3 sm:h-3/4 lg:h-full xl:h-2/3 w-1/2 px-1 pt-4 mx-auto text-center">
                <div className="space-y-2">
                    <h3 className="leading-snug font-bold text-lg">{record.name}</h3>
                    <div className="mx-auto text-base italic text-gray-200 leading-tight">By {record.author}</div>
                </div>

                {
                    record.percentComplete < 100 ? <>
                        <div className="mt-8 pb-6 md:pb-0 lg:pb-8 xl:pb-4 space-y-2">
                            <span>Progress: {record.percentComplete}%</span>
                            <LinearProgress value={record.percentComplete} variant="determinate" sx={{ "height": "8px", "borderRadius": "8px" }} />
                        </div>
                    </> : <>
                        <div className="flex flex-col space-y-2">
                            <div className="flex w-full justify-center">
                                <CheckCircleTwoToneIcon className="!text-green-400 !drop-shadow-lg" sx={{ "fontSize": "3rem" }} />
                            </div>
                            <span>Finished On: {dayjs(record.dateCompleted!).format("M/D/YYYY")}</span>
                        </div>
                    </>
                }
            </div>
        </div>
    </>;

    function generateCards() {
        const currentSortedData = currentData.sort((a, b) => {
            if (a.createdAt > b.createdAt)
                return 1;
            else
                return -1;
        });

        const recentSortedData = recentData.sort((a, b) => {
            if (a.createdAt < b.createdAt)
                return 1;
            else
                return -1;
        });

        return <>
            {
                [...currentSortedData, ...recentSortedData].map((record) => (
                    <BookCard {...record} key={record.id} />
                ))
            }
        </>;
    }

    if (loading)
        return <CurrentlyReadingLoading />;

    return <>
        {generateCards()}
    </>;
}