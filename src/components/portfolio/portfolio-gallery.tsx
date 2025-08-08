import { portfolioCategories, portfolioOptions, portfolioOptionType } from "../../app/lib/portfolio-data";
import { companyData } from "../../app/lib/resume-data";
import Image from "next/image";
import Link from "next/link";
import CreatedForSection from "./created-for-section";
import { Button, SvgIcon, Tooltip } from "@mui/material";

export default function PortfolioGallery() {

    const categories: portfolioCategories[] = ["Reports", "Software Development", "Presentations"];

    function createPortfolioCard(portfolioItem: portfolioOptionType) {

        const { portfolioSlug, name, isFeatured, associatedWith, previewLink, createdWith } = portfolioItem;
        const associatedOrganization = companyData.find((company) => company.company === associatedWith);

        var cardStyles = "flex w-full h-80 group hover:shadow-xl ";
        var infoSection = "flex flex-col justify-between px-4 py-3 md:px-6 md:py-5 bg-slate-900 ";
        var imageSection = "relative overflow-hidden ";

        if (isFeatured) {
            cardStyles += "flex-col md:flex-row";
            infoSection += "w-full h-32 rounded-b-xl order-last md:w-[35%] md:h-80 md:rounded-br-none md:rounded-l-xl md:order-first";
            imageSection += "h-48 w-full rounded-t-xl md:h-80 md:w-[65%] md:rounded-tl-none md:rounded-r-xl";
        } else {
            cardStyles += "flex-col";
            infoSection += "w-full h-32 rounded-b-xl order-last";
            imageSection += "h-48 w-full rounded-t-xl";
        }

        return <>
            <Link href={"/portfolio/" + portfolioSlug}>
                <div className={cardStyles}>
                    <div className={infoSection}>
                        <div className="w-full text-center md:text-left">
                            <span className={"leading-3 text-xl md:text-base xl:text-lg w-full font-semibold hover:text-green-500" + (!isFeatured ? " md:line-clamp-1 md:text-ellipsis" : "")}>{name}</span>
                        </div>
                        {
                            createdWith ? <div className="flex flex-col">
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
                            </div> : null
                        }
                        {
                            associatedOrganization ? <CreatedForSection company={associatedOrganization.company} logo={associatedOrganization.logo} avatar={associatedOrganization.avatar} location={associatedOrganization.location} /> : null
                        }
                    </div>
                    <div className={imageSection}>
                        <div className="z-50 bg-gradient-to-b from-zinc-800 to-transparent via-transparent absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
                        <Image src={previewLink} width={677} height={320} alt={name} className="w-full h-full object-cover object-center group-hover:scale-[1.15] transition-all duration-300" priority={isFeatured} />
                    </div>
                </div>
            </Link>
        </>;
    }

    return (
        <>
            <div className="w-full">
                <div className="flex flex-col md:flex-row w-full justify-center md:items-center mx-auto space-x-0 md:space-x-4 space-y-2 md:space-y-0 mt-4">
                    <span className="text-white normal-case text-base font-semibold">Jump To:</span>
                    <div className="flex flex-row space-x-2 md:space-x-4">
                        {
                            categories.map((category) => {
                                return (<div key={category}>
                                    <Button href={"#" + category} className="button !w-fit !flex !items-center !bg-blue-800 hover:!bg-blue-900 !drop-shadow-xl !shadow-gray-800 !rounded-2xl !text-white !text-center !text-md !font-semibold !px-3 !py-1.5">{category}</Button>
                                </div>);
                            })
                        }
                    </div>
                </div>
                {
                    categories.map((category) => {
                        const filteredOptions = portfolioOptions.filter((a) => {
                            return a.category.includes(category);
                        });

                        return (<div key={category} className="pb-0 md:pb-8 last:pb-0">
                            <h2 id={category} className="flex items-start w-full pt-16 md:pt-2">{category}</h2>
                            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-6">
                                {
                                    filteredOptions.sort((a, b) => a.order - b.order).map((item) =>
                                        <div key={item.portfolioSlug} className={item.isFeatured ? "md:col-span-2" : "col-span-1"}>
                                            {
                                                createPortfolioCard(item)
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>);
                    })
                }
            </div>
        </>
    );
}