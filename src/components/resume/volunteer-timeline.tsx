import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import { volunteerData } from "../../app/lib/resume-data";
import { TimelineComponent } from "./timeline-component";

export default function VolunteerTimeline() {

    return (
        <>
            <div className="w-full px-3 md:px-4 py-6 text-base bg-gray-800/70 shadow-xl shadow-gray-900/70 rounded-lg">
                <Timeline sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }} className="!p-0 md:!p-4">
                    {
                        volunteerData.map((company) =>
                            <div key={company.company}>
                                <TimelineComponent
                                    company={company.company}
                                    jobData={company.jobData} />
                            </div>
                        )
                    }
                </Timeline>
            </div>
        </>
    );
}