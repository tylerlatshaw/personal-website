import CurrentlyReadingContainer from "./../../components/interests/currently-reading-container";
import VinylRecordContainer from "./vinyl-collection-container";
import { Chip } from "@mui/material";

export default function InterestsContainer() {

    const otherInterests = [
        "3D Printing",
        "Laser Engraving",
        "Genealogy",
        "Coding (Mostly) Useless Websites",
        "Hockey",
        "DIY-ing",
        "Playing With My Nephew",
        "Board Games",
        "Cataloging Family Photos",
        "Video Games"
    ];

    return <div className="space-y-8">
        <div className="flex flex-col w-full">
            <h2>Currently Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 p-2 w-full">
                <CurrentlyReadingContainer />
            </div>
        </div>

        <div className="flex flex-col w-full">
            <h2>Vinyl Collection</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 p-2 w-full">
                <VinylRecordContainer />
            </div>
        </div>

        <div className="flex flex-col w-full">
            <h2>Other Interests</h2>

            <div className="flex flex-row flex-wrap gap-3 w-full md:w-3/5 mx-auto basis-auto justify-center">
                {
                    otherInterests.map((item) => {
                        return <Chip key={item} label={item} className="!text-white !bg-gray-800 !text-lg !tracking-wide !font-medium !mb-3 !px-2 !py-1 !shadow-md !shadow-gray-900" />;
                    })
                }
            </div>
        </div>

    </div>;
}