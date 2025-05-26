import InterestsContainer from "@/components/interests/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Interests",
};

export default function Page() {

    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>My Interests</h1>

                <div className="flex w-3/5 mx-auto mb-8">
                    <p className="text-center text-lg">Welcome to the part of my site where I pretend to be cultured. Below is a list of vinyl records I own (because Amazon Music just isn&apos;t pretentious enough) and books I&apos;m <i>definitely</i> going to finish someday.</p>
                </div>

                <InterestsContainer />

            </div>
        </div>
    </>;
}