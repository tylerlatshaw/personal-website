import { Suspense } from "react";
import { Metadata } from "next";
import VinylRecordContainer from "../../../components/interests/vinyl-record-container";
import VinylRecordLoading from "../../../components/interests/vinyl-record-loading";
import { Chip } from "@mui/material";
import CurrentlyReadingContainer from "./../../../components/interests/currently-reading-container";
import CurrentlyReadingLoading from "./../../../components/interests/currently-reading-loading";

export const metadata: Metadata = {
    title: "My Interests",
};

export default function Page() {

    const otherInterests = [
        "3D Printing",
        "Laser Engraving",
        "Genealogy",
        "Coding (Useless) Websites",
        "Hockey",
        "DIY-ing",
        "Playing With My Nephew",
        "Board Games",
        "Cataloging Family Photos",
        "Video Games"
    ];

    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>My Interests</h1>

                <div className="flex w-3/5 mx-auto mb-8">
                    <p className="text-center text-lg">Welcome to the part of my site where I pretend to be cultured. Below is a list of vinyl records I own (because Amazon Music just isn&apos;t pretentious enough) and books I&apos;m <i>definitely</i> going to finish someday.</p>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col w-full">
                        <h2>Currently Reading</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 p-2 w-full">

                            <Suspense fallback={<CurrentlyReadingLoading />}>
                                <CurrentlyReadingContainer />
                            </Suspense>

                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h2>Vinyl Collection</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 p-2 w-full">

                            <Suspense fallback={<VinylRecordLoading />}>
                                <VinylRecordContainer />
                            </Suspense>

                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h2>Other Interests</h2>

                        <div className="flex flex-row flex-wrap gap-3 w-full md:w-3/5 mx-auto basis-auto justify-center">
                            {
                                otherInterests.map((item) => {
                                    return <Chip key={item} label={item} className="text-white bg-gray-800 text-lg tracking-wide mb-3 px-2 py-1 shadow-md shadow-gray-900" />;
                                })
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>;
}