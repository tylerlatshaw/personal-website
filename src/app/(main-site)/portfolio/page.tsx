import { Metadata } from "next";

import PortfolioGallery from "../../../components/portfolio/portfolio-gallery";

export const metadata: Metadata = {
    title: "Portfolio",
};

export default function Page() {
    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>Portfolio</h1>

                <PortfolioGallery />
            </div>
        </div>
    </>;
}