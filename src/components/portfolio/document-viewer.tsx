import CreatedForSection from "./created-for-section";
import { companyData } from "../../app/lib/resume-data";
import { Button, SvgIcon, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import type { portfolioOptionType } from "../../app/lib/portfolio-data";

export default function DocumentViewer(portfolio: portfolioOptionType) {

    const { name, description, date, associatedWith, assetLink, webLink, createdWith } = portfolio;
    const associatedOrganization = companyData.find((company) => company.company === associatedWith);

    return (
        <>
            <div className="w-full">

                <div className="w-full relative">
                    <h1>{name}</h1>

                    <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-fit">
                        <Button className="button !flex !items-center !bg-blue-800 hover:!bg-blue-900 !drop-shadow-xl !rounded-2xl !text-white !text-center !text-md !font-semibold !px-3 !py-1.5 !mt-0 lg:!mt-1 !mb-6 lg:!mb-0" href="/portfolio">
                            <ArrowBackIcon />&nbsp;Back
                        </Button>
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
                                        <a href={webLink} target="_blank">
                                            <Button className="button !text-white !bg-blue-800 hover:!bg-blue-900 focus:!ring-2 focus:!outline-none focus:!ring-blue-900 !font-medium !text-base !text-white !rounded-2xl !w-full md:!w-fit !px-5 !py-2.5 !text-center !capitalize">
                                                View {name}
                                            </Button>
                                        </a>
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