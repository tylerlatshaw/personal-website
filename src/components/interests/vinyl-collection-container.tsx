"use client";

/* eslint-disable @next/next/no-img-element */
import {
    useEffect,
    useState
} from "react";

import VinylCollectionLoading from "./vinyl-collection-loading";

import type { VinylResultType } from "../../app/lib/type-library";

export default function VinylCollectionContainer() {

    const imageFilepath = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/personal-website-storage/";

    const [allRecords, setAllRecords] = useState<VinylResultType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("/api/get-vinyl-collection", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                setAllRecords(json);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    function generateCards() {
        const sortedData = allRecords.sort((a, b) => {
            if (a.name > b.name)
                return 1;
            else
                return -1;
        });

        return sortedData && sortedData.map((record) => {
            return <div key={record.id}>
                <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-100">
                    <img src={imageFilepath + record.imageUrl} alt={record.name} className="aspect-square w-full rounded" />
                </div>
                <div className="px-1 pt-2 pb-4 mx-auto text-center">
                    <div className="space-y-1">
                        <h3 className="leading-snug font-bold text-base">{record.name}</h3>
                        <div className="mx-auto text-sm italic text-gray-200 leading-tight">{record.artist}</div>
                    </div>
                </div>
            </div>;
        });
    }

    if (loading)
        return <VinylCollectionLoading />;

    return <>
        {generateCards()}
    </>;
}