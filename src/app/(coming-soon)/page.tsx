import React from "react";
import Image from "next/image";

import SvgIcon from "@mui/icons-material/Home";

import { footerSocialLinks } from "../lib/navigation-links";
import ComingSoonForm from "./components/coming-soon-form";

export default function Home() {

    const socialLinks = footerSocialLinks.map((link) =>
        <div key={link.display} className="grid justify-items-center">
            <div className="mt-3">
                <a href={link.link} className="group block" target="_blank">
                    <div className="flex items-center">
                        <SvgIcon component={link.icon} className="group-hover:text-green-500 text-3xl md:text-2xl" />&nbsp;
                        <span className="desktop-only group-hover:text-green-500">{link.display}</span>
                    </div>
                </a>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full fixed absolute top-0 left-0 z-50">
            <div className="absolute top-[5%] sm:top-[10%] text-center w-full">
                <div className="w-fit mx-auto">
                    <Image src="/static/gradient-logo-animated.svg" width={300} height={46} alt="Tyler Latshaw animated logo" className="w-[90%] sm:w-[600px] h-fit mx-auto" priority={true} />
                </div>
            </div>

            <div className="absolute top-[20%] sm:top-1/3 text-center w-full">
                <div className="grid md:grid-cols-2">

                    <div className="flex flex-col w-full md:border-r-2 border-gray-700 py-10">

                        <h1 className="mx-auto leading-tight text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center">
                            Big things<br />are<br />coming soon!
                        </h1>

                    </div>

                    <div className="mt-3 mb-0 mx-auto w-full py-10">

                        <div className="h-full flex flex-col">

                            <h1 className="text-xl leading-tight md:text-3xl text-white font-bold text-center">
                                Be the first to know when<br />the new site goes live
                            </h1>

                            <ComingSoonForm />

                        </div>

                    </div>
                </div>
            </div>

            <div className="absolute content-start w-full mx-auto py-6 bottom-0 mb-6 md:mb-0 md:top-3/4 text-gray-400">
                <div className="flex flex-row md:flex-col w-full justify-center gap-3 md:gap-0 mt-2 md:mt-0">
                    {socialLinks}
                </div>
            </div>
        </div>
    );
}