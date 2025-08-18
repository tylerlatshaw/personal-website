import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

export default function PortfolioGallery() {

    return (
        <>
            <div className="w-full">
                <div className="grid grid-flow-row grid-cols-1 gap-6">
                    <Link href={"/portfolio"}>
                        <div className="flex w-full h-96 group hover:shadow-xl flex-col md:flex-row">
                            <div className="flex flex-col justify-between px-4 py-3 md:px-6 md:py-5 bg-gray-800 w-full h-32 rounded-b-xl order-last md:w-[25%] md:h-96 md:rounded-br-none md:rounded-l-xl md:order-first">
                                <div className="w-full">
                                    <span className="text-lg leading-3 md:text-xl lg:text-2xl w-full font-semibold hover:text-green-500">Professional Projects & Presentations</span>
                                </div>
                                <div className="flex flex-col">
                                    <Button className="button !w-fit !flex !items-center !bg-blue-800 hover:!bg-blue-900 !drop-shadow-xl !rounded-2xl !text-white !text-center !text-md !font-semibold !px-3 !py-1.5 !mx-0 !my-2 md:!m-2">
                                        View My Portfolio
                                    </Button>
                                </div>
                            </div>
                            <div className="relative overflow-hidden h-48 w-full rounded-t-xl md:h-96 md:w-[75%] md:rounded-tl-none md:rounded-r-xl">
                                <div className="z-50 bg-gradient-to-b from-zinc-800 to-transparent via-transparent absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
                                <Image src="/static/portfolio/portfolio_preview.png" width={677} height={320} alt="Portfolio" className="w-full h-full object-cover object-center group-hover:scale-[1.15] transition-all duration-300" priority={false} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}