import { skills } from "../../app/lib/resume-data";
import { Chip } from "@mui/material";

export default function SkillList() {

    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/6 lg:basis-1/5 desktop-only"></div>
                <div className="flex flex-row flex-wrap gap-3 w-full mx-1 md:mx-3 basis-auto justify-center">
                    {
                        skills.map((skill) =>
                            <Chip key={skill} label={skill} className="!text-white !bg-gray-800 !font-normal !text-base !tracking-wide !px-1 !shadow-md !shadow-gray-900" />
                        )
                    }
                </div>
                <div className="basis-1/6 lg:basis-1/5 desktop-only"></div>
            </div>
        </>
    );
}