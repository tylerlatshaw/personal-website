import Image from "next/image";
import Link from "next/link";

import SendIcon from "@mui/icons-material/Send";

import Button from "../ui/button";

export default function QuickPages() {

    var cardStyles = "flex w-full h-96 bg-white dark:bg-slate-800 border border-slate-300 dark:border-0 overflow-hidden group hover:shadow-xl flex-col rounded-xl";
    var infoSection = "flex flex-col justify-between px-4 py-3 md:px-6 md:py-5 w-full rounded-b-xl order-last";
    var imageSection = "relative overflow-hidden h-48 w-full rounded-t-xl";

    return (
        <>
            <div className="max-w-sm rounded-lg shadow text-left">
                <Link href={"/resume"}>
                    <div className={cardStyles}>
                        <div className={infoSection}>
                            <div className="w-full text-left">
                                <span className="uppercase font-bold tracking-wide text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-600 text-lg">Resume</span>
                                <p className="mb-3 font-normal min-h-20">Explore my professional journey, showcasing achievements and skills that define my expertise and growth in various experiences.</p>
                                <Link href="/resume">
                                    <Button type="button" className="!bg-green-700 hover:!bg-green-800 focus:ring-2 focus:outline-none focus:!ring-green-600">
                                        Read more&nbsp;<SendIcon className="text-base flex items-center" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={imageSection}>
                            <div className="z-50 bg-gradient-to-b from-zinc-800 to-transparent via-transparent absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
                            <Image src="/static/resume/resume_preview.png" width={384} height={192} alt={"Resume"} className="w-full h-full object-cover object-center group-hover:scale-[1.15] transition-all duration-300" priority={false} />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="max-w-sm rounded-lg shadow text-left">
                <Link href={"/portfolio"}>
                    <div className={cardStyles}>
                        <div className={infoSection}>
                            <div className="w-full text-left">
                                <span className="uppercase font-bold tracking-wide text-pink-700 dark:text-pink-600 hover:text-pink-800 dark:hover:text-pink-700 text-lg">Portfolio</span>
                                <p className="mb-3 font-normal min-h-20">See a selection of my professional and academic including papers, presentations, technical database diagrams, and code.</p>
                                <Link href="/portfolio">
                                    <Button type="button" className="!bg-pink-700 hover:!bg-pink-800 focus:ring-2 focus:outline-none focus:!ring-pink-600">
                                        Read more&nbsp;<SendIcon className="text-base flex items-center" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={imageSection}>
                            <div className="z-50 bg-gradient-to-b from-zinc-800 to-transparent via-transparent absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
                            <Image src="/static/portfolio/portfolio_preview.png" width={384} height={192} alt={"Portfolio"} className="w-full h-full object-cover object-center group-hover:scale-[1.15] transition-all duration-300" priority={false} />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="max-w-sm rounded-lg shadow text-left">
                <Link href={"/interests"}>
                    <div className={cardStyles}>
                        <div className={infoSection}>
                            <div className="w-full text-left">
                                <span className="uppercase font-bold tracking-wide text-purple-700 dark:text-purple-500 hover:text-purple-800 dark:hover:text-purple-600 text-lg">Interests</span>
                                <p className="mb-3 font-normal min-h-20">Get to know me on a personal level and find out what keeps me busy outside of work from what I am reading to what I am listening to.</p>
                                <Link href="/interests">
                                    <Button type="button" className="!bg-purple-700 hover:!bg-purple-800 focus:ring-2 focus:outline-none focus:!ring-purple-600">
                                        Read more&nbsp;<SendIcon className="text-base flex items-center" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={imageSection}>
                            <div className="z-50 bg-gradient-to-b from-zinc-800 to-transparent via-transparent absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
                            <Image src="/static/interests/interests_preview.png" width={384} height={192} alt={"Interests"} className="w-full h-full object-cover object-center group-hover:scale-[1.15] transition-all duration-300" priority={false} />
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}