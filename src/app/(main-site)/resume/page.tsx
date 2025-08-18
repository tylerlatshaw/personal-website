import { Metadata } from "next";
import Image from "next/image";

import CertificationList from "../../../components/resume/certifications";
import Education from "../../../components/resume/education";
import InternTimeline from "../../../components/resume/intern-timeline";
import JobTimeline from "../../../components/resume/job-timeline";
import PortfolioLink from "../../../components/resume/portfolio";
import ProfessionalProfile from "../../../components/resume/professional-profile";
import SkillList from "../../../components/resume/skills";
import VolunteerTimeline from "../../../components/resume/volunteer-timeline";

export const metadata: Metadata = {
    title: "Resume",
};

export default function Page() {
    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>Resume</h1>

                <div className="flex flex-col lg:flex-row justify-evenly items-center">
                    <div className="basis-2/5 flex flex-row justify-evenly items-center">
                        <Image src="/static/resume/tyler_latshaw_headshot.png" width={750} height={938} alt="Tyler Latshaw" className={"w-3/5 mx-auto border-solid border-8 border-black shadow-xl shadow-black/40"} id="tyler_latshaw_headshot" priority={true} />
                    </div>

                    <div className="basis-2/3 flex flex-row justify-evenly items-center">
                        <div className="w-full">
                            <h2>Professional Profile</h2>
                            <ProfessionalProfile />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <h2>Education</h2>
                    <Education />
                </div>

                <div className="w-full">
                    <h2>Professional Projects & Presentations</h2>
                    <PortfolioLink />
                </div>

                <div className="w-full">
                    <h2>Skills & Certifications</h2>
                    <SkillList />
                    <CertificationList />
                </div>

                <div className="mx-auto w-full max-w-5xl">
                    <h2>Professional Experience</h2>
                    <JobTimeline />
                </div>

                <div className="mx-auto w-full max-w-5xl">
                    <h2>Internship Experience</h2>
                    <InternTimeline />
                </div>

                <div className="mx-auto w-full max-w-5xl">
                    <h2>Volunteerism</h2>
                    <VolunteerTimeline />
                </div>

            </div>
        </div>
    </>;
}