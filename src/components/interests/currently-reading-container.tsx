/* eslint-disable @next/next/no-img-element */
import { CurrentlyReadingResultType } from "../../app/lib/type-library";
import { LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

export default async function CurrentlyReadingContainer() {

    const response = await fetch(process.env.BASE_URL + "/api/get-currently-reading", { cache: "no-store" });
    const data: CurrentlyReadingResultType[] = await response.json();
    const currentData = data.filter((a) => {
        return a.percentComplete > 0 && a.percentComplete < 100;
    });
    const recentData = data.filter((a) => {
        return a.percentComplete === 100 && dayjs(a.dateCompleted!) >= dayjs().subtract(60, "days");
    });

    const BookCard = (record: CurrentlyReadingResultType) => <>
        <div key={record.id} className="flex flex-row gap-2">
            <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-1/2">
                <img src={record.imageUrl} alt={record.name} className="w-full h-full rounded" />
            </div>
            <div className="flex flex-col w-1/2 px-1 pt-4 mx-auto text-center gap-12">
                <div className="space-y-2">
                    <h3 className="leading-snug font-bold text-lg">{record.name}</h3>
                    <div className="mx-auto text-base italic text-gray-200 leading-tight">By {record.author}</div>
                </div>
                {
                    record.percentComplete < 100 ? <>
                        <div className="mt-8 space-y-2">
                            <span>Progress: {record.percentComplete}%</span>
                            <LinearProgress value={record.percentComplete} variant="determinate" sx={{ "height": "8px", "borderRadius": "8px" }} />
                        </div>
                    </> : <>
                        <div className="flex flex-col space-y-2">
                            <div className="flex w-full justify-center">
                                <CheckCircleTwoToneIcon className="text-green-400 drop-shadow-lg" sx={{"fontSize": "3.5rem"}} />
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
            if (a.createdAt > b.createdAt)
                return 1;
            else
                return -1;
        });

        return <>
            {
                currentSortedData && currentSortedData.map((record) => {
                    return <BookCard {...record} key={record.id} />;
                })
            }

            {
                recentSortedData && recentSortedData.map((record) => {
                    return <BookCard {...record} key={record.id} />;
                })
            }
        </>;
    }

    return <>
        {generateCards()}
    </>;
}