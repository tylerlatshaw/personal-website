import CreatedForSection from "./created-for-section";
import { companyData } from "../../app/lib/resume-data";
import { SvgIcon, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import type { portfolioOptionType } from "../../app/lib/portfolio-data";
import Link from "next/link";
import Button from "../ui/button";

export default function DocumentViewer(portfolio: portfolioOptionType) {

    const { name, description, date, associatedWith, assetLink, webLink, createdWith } = portfolio;
    const associatedOrganization = companyData.find((company) => company.company === associatedWith);

    return (
        <>
            <div className="w-full">

                <div className="w-full relative">
                    <h1>{name}</h1>

                    <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-fit">
                        <Link href="/portfolio">
                            <Button type="button" className="!bg-blue-800 hover:!bg-blue-900 focus:ring-2 focus:outline-none focus:!ring-blue-700 !shadow-lg !shadow-black/40 !mb-6 lg:!mb-0">
                                <ArrowBackIcon />&nbsp;Back
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col w-full bg-white rounded mb-6 p-4">

                    <div className="flex flex-col w-full bg-[#323639] justify-center mb-4 px-5 py-4">
                        <div>
                            <div className="flex flex-col md:flex-row w-full gap-5">
                                <div className="grow">
                                    <span dangerouslySetInnerHTML={{ __html: description }} />
                                </div>

                                {
                                    createdWith ? <div className="flex-none self-center mx-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm pb-1">Technology Used:</span>
                                            <div className="flex flex-row flex-wrap">
                                                {
                                                    createdWith.map((icon) => {
                                                        return <div key={icon.name} className="p-1">
                                                            <Tooltip title={icon.name}>
                                                                <SvgIcon>{icon.icon}</SvgIcon>
                                                            </Tooltip>
                                                        </div>;
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div> : null
                                }
                                {
                                    associatedWith ? <>
                                        <div className="flex-none self-center">
                                            <CreatedForSection company={associatedOrganization?.company!} logo={associatedOrganization?.logo!} avatar={associatedOrganization?.avatar!} location={associatedOrganization?.location!} />
                                        </div>
                                    </> : null
                                }
                            </div>
                            <div className="flex flex-col md:flex-row mt-3">
                                {
                                    webLink !== null ? <div className="text-center md:text-left w-full md:w-fit mr-3 mb-2 md:mb-0">
                                        <Link href={webLink} target="_blank">
                                            <Button type="button">
                                                View {name}
                                            </Button>
                                        </Link>
                                    </div> : null
                                }
                                {
                                    date ? <div className="self-center">
                                        <span className="text-gray-400">
                                            Created: {date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>

                    <iframe src={assetLink!} className="w-full h-screen max-h-[850px]" />
                </div>
            </div >
        </>
    );
}