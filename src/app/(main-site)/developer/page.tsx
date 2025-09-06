import { Metadata } from "next";

import DeveloperContainer from "../../../components/developer/developer-container";

export const metadata: Metadata = {
    title: "Developer Tools",
};

export default function Page() {
    return <>
        <meta name="robots" content="noindex,nofollow" />

        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">
                
                <h1>Developer Tools</h1>

                <div className="flex flex-col md:flex-row items-stretch w-full md:mt-6">
                    <DeveloperContainer />
                </div>
            </div>
        </div>
    </>;
}