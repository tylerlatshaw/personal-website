/* eslint-disable @next/next/no-img-element */
import { RecordResultType } from "./../../app/lib/type-library";

export default async function VinylRecordContainer() {

    const imageFilepath = process.env.SUPABASE_URL + "/storage/v1/object/public/personal-website-storage/records/";
    const response = await fetch(process.env.BASE_URL + "/api/get-records", { cache: "no-store" });
    const data: RecordResultType[] = await response.json();

    function generateCards() {
        const sortedData = data.sort((a, b) => {
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
                        <div className="mx-auto text-sm italic text-gray-200 leading-tight">{record.artist.name}</div>
                    </div>
                </div>
            </div>;
        });
    }

    return <>
        {generateCards()}
    </>;
}