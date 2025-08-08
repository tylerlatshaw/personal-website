"use client";

import Image from "next/image";
import { useState } from "react";
import { educationData, companyData } from "../../app/lib/resume-data";
import ReactCardFlip from "react-card-flip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Chip } from "@mui/material";

export default function Education() {

    const [flippedCards, setFlippedCards] = useState<string[]>([]);

    function updateFlippedCards(school: string) {
        if (flippedCards.includes(school)) {
            setFlippedCards(flippedCards.filter((e) => e !== school));
        } else {
            setFlippedCards([...flippedCards, school]);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationData.map((education) =>
                    <div key={education.school} className="basis-full md:basis-1/2 w-full py-4">

                        <ReactCardFlip isFlipped={flippedCards.includes(education.school)} flipDirection="horizontal" containerClassName="w-full min-h-[540px]">
                            <div className="front flex flex-col w-full h-full items-center">
                                <div className="h-32 w-32 rounded-full relative -mb-16 z-50">
                                    <Image src={companyData.find((value) => value.company === education.school)?.logo!} width={16} height={16} className="w-32 h-32 rounded-full drop-shadow-lg shadow-xl border-2 border-gray-800" alt={education.school + " Logo"} />
                                </div>
                                <div className="flex flex-col justify-between w-full h-full pb-6 px-3 md:px-8 pt-20 bg-gray-800 shadow-xl shadow-gray-900/70 rounded-lg">
                                    <div className="w-full h-full">

                                        <div className="flex flex-col w-full text-center space-y-1">
                                            <span className=" w-full text-2xl font-semibold">
                                                {education.school}
                                            </span>

                                            <span className="pb-3 text-gray-300">
                                                {
                                                    companyData.find((value) => value.company === education.school)?.location!
                                                }
                                                <span className="desktop-only">
                                                    &nbsp;&#8226;&nbsp;
                                                </span>
                                                <br className="mobile-only" />
                                                {
                                                    education.startDate.toLocaleString("en-US", { month: "long", year: "numeric" })} - {education.endDate === null ? "Present" : education.endDate.toLocaleString("en-US", { month: "long", year: "numeric" })
                                                }
                                                &nbsp;&#8226;&nbsp;
                                                {
                                                    education.gpa.toFixed(1) + " GPA"
                                                }
                                            </span>

                                            <div className="flex items-center justify-center pb-4">
                                                <span className="bg-gray-900 shadow-inner shadow-black rounded-2xl text-center px-3 py-1.5 tracking-wide">
                                                    <span className="font-semibold">
                                                        {education.degree}
                                                    </span>
                                                    <span className="desktop-only">
                                                        , &nbsp;
                                                    </span>
                                                    <br className="mobile-only" />
                                                    <span className="font-light">
                                                        {education.minor}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row w-full">
                                            {
                                                education.honorSocieties ? <div className="flex flex-col grow basis-1/2 mx-0 my-2 md:m-2">
                                                    <span className="text-lg font-semibold">Honor Societies</span>

                                                    <ul className="list-disc ml-6">
                                                        {
                                                            education.honorSocieties.map((society) =>
                                                                <li key={society} className="font-normal text-base">{society}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div> : null
                                            }

                                            {
                                                education.activities ? <div className="flex flex-col grow basis-1/2 mx-0 my-2 md:m-2">
                                                    <span className="text-lg font-semibold">Activities</span>

                                                    <ul className="list-disc ml-6">
                                                        {
                                                            education.activities.map((activity) =>
                                                                <li key={activity} className="font-normal text-base">{activity}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-center">
                                        <Button className="button !w-fit !flex !items-center !bg-blue-800 hover:!bg-blue-900 !drop-shadow-xl !rounded-2xl !text-white !text-center !text-md !font-semibold !px-3 !py-1.5 !mx-0 !my-2 md:!m-2" onClick={() => updateFlippedCards(education.school)}>
                                            View Courses
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="back flex flex-col w-full h-full items-center">
                                <div className="h-32 w-32 rounded-full relative -mb-16 z-50">
                                    <Image src={companyData.find((value) => value.company === education.school)?.logo!} width={16} height={16} className="w-32 h-32 rounded-full drop-shadow-lg shadow-xl border-2 border-gray-800" alt={education.school + " Logo"} />
                                </div>
                                <div className="flex flex-col justify-between w-full h-full pb-6 px-8 pt-20 bg-gray-800 shadow-xl shadow-gray-900/70 rounded-lg">
                                    <div className="w-full h-full">

                                        <div className="flex flex-col w-full text-center">
                                            <span className=" w-full text-2xl font-semibold pb-6">
                                                Relavent Courses
                                            </span>
                                        </div>

                                        <div className="flex flex-row flex-wrap gap-2">
                                            {
                                                education.courses.map((course) =>
                                                    <Chip key={course} label={course} className="!text-white !bg-gray-700 !font-normal !text-base" />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-center">
                                        <Button className="button !w-fit !flex !items-center !bg-blue-800 hover:!bg-blue-900 !drop-shadow-xl !rounded-2xl !text-white !text-center !text-md !font-semibold !px-3 !py-1.5 !mx-0 !my-2 md:!m-2" onClick={() => updateFlippedCards(education.school)}>
                                            <ArrowBackIcon />&nbsp;Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ReactCardFlip>

                    </div>
                )}
            </div>
        </>
    );
}