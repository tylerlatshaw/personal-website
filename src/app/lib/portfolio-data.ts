import AWSIcon from "./icons/aws";
import ClerkIcon from "./icons/clerk";
import NextJsIcon from "./icons/next-js";
import ReactHookFormIcon from "./icons/react-hook-form";
import ReactPdfIcon from "./icons/react-pdf";
import ResendIcon from "./icons/resend";
import SupabaseIcon from "./icons/supabase";
import TailwindIcon from "./icons/tailwind";
import TypeScriptIcon from "./icons/typescript";

import { companyName } from "./resume-data";

export type portfolioCategories = "Reports" | "Presentations" | "Software Development"

export type createdWithType = {
    name: string,
    icon: JSX.Element
}

export type portfolioOptionType = {
    portfolioSlug: string,
    name: string,
    order: number,
    isFeatured: boolean,
    description: string,
    date: Date | null,
    associatedWith: companyName | null,
    previewLink: string,
    assetLink: string,
    webLink: string | null,
    category: portfolioCategories,
    createdWith?: createdWithType[]
}

const filepath = "/static/portfolio/";

export const portfolioOptions: portfolioOptionType[] = [
    {
        portfolioSlug: "honors-program-transition",
        name: "Transitioning Honors Programs Seamlessly and Efficiently",
        order: 1,
        isFeatured: false,
        description: "In my sophomore year, I helped lead a charge to revitalize the Honors Program at Elizabethtown College. I was able to present my experience at the 50th annual National Collegiate Honors Council conference alongside co-presenters Phillip Belder, DMD and Kyle Kopko, PhD, JD. <br/><br/>Abstract: The Elizabethtown College Honors Program has been an incubator for innovative education since its inception. Now in its 16th year of existence, the program is transitioning to its third Honors Director, who is also a graduate of the Elizabethtown College Honors Program. This panel discussion will explain how the program effectively transitioned from one director to the next, implemented a new strategic plan, all while incorporating student perspectives in the transition process. As a result of this process, the Program was restructured in a way to ensure that students had more pathways to completion and engagement, despite decreases in the Program's budget. Special emphasis will be placed on the vital job the student honors council played in the success of the transition.",
        date: new Date("2015-11-13T00:00:00"),
        associatedWith: "Elizabethtown College",
        previewLink: filepath + "honors_program_transition_preview.jpg",
        assetLink: filepath + "honors_program_transition.pdf",
        webLink: null,
        category: "Presentations"
    },
    {
        portfolioSlug: "automate-your-day",
        name: "Automate Your Day: One Flow at a Time",
        order: 2,
        isFeatured: true,
        description: "As a technical business analyst, one of my passions is process improvement and, if possible, automation. I have developed multiple automations using Microsoft Power Automate that have been used by dozens of teams across the company. I had the opportunity to present alongside my coworker, Annie Meyer, on how Power Automate can be used to offset workloads and enhance productivity at the interdepartmental developer conference. <span class='italic'>For security reasons, some sensitive information has been redacted from the PowerPoint</span>.",
        date: new Date("2023-09-20T00:00:00"),
        associatedWith: "WebstaurantStore",
        previewLink: filepath + "automate_your_day_preview.png",
        assetLink: filepath + "automate_your_day.pdf",
        webLink: null,
        category: "Presentations"
    },
    {
        portfolioSlug: "project-management-system-report",
        name: "Project Management System Report",
        order: 3,
        isFeatured: true,
        description: "In conjunction with WebstaurantStore, my final course for my Master's degree was a capstone project that encompassed everything that I learned throughout the program. For my project, I investigated the development process at WebstaurantStore and created a proposal for a new project management system. As a part of the project and my work at WebstaurantStore, I interviewed more than 75 individuals within the development department and researched potential systems that could be implemented. The project includes an overview of the implementation as well as proposed designs and the database structure.",
        date: new Date("2022-03-06T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "project_management_system_report_preview.png",
        assetLink: filepath + "project_management_system_report.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "database-management-system-proposal",
        name: "Database Management System Proposal",
        order: 4,
        isFeatured: false,
        description: "For my IT650: Principles of Database Design course, our term project was to create a proposal for an entirely new database management system (DBMS). The DBMS was to be created for a vinyl record shop that historically had been operating off of pen and paper. My proposal includes research behind a DBMS, various options, legal and ethics considerations, the entire database entity relationship diagram and SQL scripts, and a presentation for the stakeholder.",
        date: new Date("2021-12-12T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "database_management_system_preview.jpg",
        assetLink: filepath + "database_management_system.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "equifax-incident-report",
        name: "Equifax Incident Report",
        order: 5,
        isFeatured: false,
        description: "As a part of my IT659: Cyberlaw and Ethics course, my term project was to investigate a recent data leak or breach that occurred within the past decade and research the impact that it had. As I was personally involved in the data breach, I decided to investigate the 2017 Equifax data breach, one of the largest breaches ever that included more than 40% of the US population. The project analyzes the incident, the impact it had on legal regulation and society, and provides recommendations for new standards.",
        date: new Date("2021-09-26T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "equifax_incident_report_preview.png",
        assetLink: filepath + "equifax_incident_report.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "enterprise-resource-planning",
        name: "Enterprise Resource Planning Implementation",
        order: 6,
        isFeatured: true,
        description: "A big part of my Master's program in IT Management was an emphasis on enterprise resource planning (ERP) systems. This term project focussed on researching ERP systems and creating a proposal to implement one at a large school district of 40 schools. The project included proposing potential alternatives, exploring the expected benefits, and preparing a presentation that would be delivered to the school board for approval. As part of my proposal, I researched case studies in other locations such as The School District of Philadelphia.",
        date: new Date("2021-04-25T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "enterprise_resource_planning_implementation_preview.png",
        assetLink: filepath + "enterprise_resource_planning_implementation.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "network-assessment",
        name: "Network Assessment and Recommendation",
        order: 7,
        isFeatured: false,
        description: "At the core of any large enterprise is the network archtecture to support it. For this project, I was presented with an up-and-coming utilities company that was looking to expand operations into a different state. As the network consultant, I had to propose solutions on how to expand the architecture so that it would best serve the business without any degredation of service.",
        date: new Date("2021-07-11T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "network_assessment_and_recommendation_preview.png",
        assetLink: filepath + "network_assessment_and_recommendation.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "medical-informatics-project-plan",
        name: "Medical Informatics Project Plan",
        order: 8,
        isFeatured: false,
        description: "An important part of IT management is being able to lead a project team, handle conflict, and ensure that a project remains on track. This term project had an emphasis on project management for a leading healthcare company. As a part of the research conducted, I had to prepare an analysis of the company's current project, analyzing everything from the budget to a complete SWOT analysis of the team.",
        date: new Date("2021-02-05T00:00:00"),
        associatedWith: "Southern New Hampshire University",
        previewLink: filepath + "medical_informatics_project_plan_preview.jpg",
        assetLink: filepath + "medical_informatics_project_plan.pdf",
        webLink: null,
        category: "Reports"
    },
    {
        portfolioSlug: "canning-buying-guide",
        name: "Canning Supplies Buying Guide",
        order: 9,
        isFeatured: false,
        description: "While working in the Content Department at WebstaurantStore, I worked alongside the SEO and Purchasing departments to write a buying guide to aid customers looking at buying canning supplies. The buying guide was approved and published to the WebstaurantStore website, a noteworthy accomplishment as I was one of the first people in the department to publish a buying guide that was not in a writer position at the company.",
        date: new Date("2019-10-14T00:00:00"),
        associatedWith: "WebstaurantStore",
        previewLink: filepath + "canning_buying_guide_preview.png",
        assetLink: filepath + "canning_buying_guide.png",
        webLink: "https://www.webstaurantstore.com/guide/878/mason-jars-and-canning-supplies.html",
        category: "Reports"
    },
    {
        portfolioSlug: "personal-dashboard",
        name: "Personal Dashboard",
        order: 10,
        isFeatured: true,
        description: "On a whim, I bought a heavily discounted monitor to put near my desk and decided to build myself my own personal dashboard complete with the time, weather data, and my calendar. Given my plan to run this off of an older, spare computer, it was a lesson for me on balancing optimization and caching while still having it be interactive with a modern design. This was also my first time incorporating external APIs (Weather.gov and Google API), and having them update in the background. I also have the core setting stored in the user's cookies.",
        date: new Date("2025-08-07T00:00:00"),
        associatedWith: null,
        previewLink: filepath + "personal_dashboard_preview.png",
        assetLink: filepath + "personal_dashboard.pdf",
        webLink: null,
        category: "Software Development",
        createdWith: [
            {
                name: "Next.js",
                icon: NextJsIcon()
            },
            {
                name: "TypeScript",
                icon: TypeScriptIcon()
            },
            {
                name: "Tailwind CSS",
                icon: TailwindIcon()
            }
        ]
    },
    {
        portfolioSlug: "personal-website",
        name: "My Personal Website/Portfolio",
        order: 11,
        isFeatured: false,
        description: "Welcome to my personal website! This site is a showcase of my journey, built using Next.js, TypeScript, and Supabase as the database. As someone who started with no prior (modern) web development experience, I've embraced the challenge of learning these technologies from scratch. Each project, report, and presentation featured here reflects my growth and dedication in mastering mordern technology and IT. For this website, I used Next.js for the site structure and API routing, Tailwind CSS for the styling, and Supabase as the database - all of which were new to me coming into this project. The website is deployed through Netlify via a GitHub repository.",
        date: new Date("2024-09-15T00:00:00"),
        associatedWith: null,
        previewLink: filepath + "personal_website_preview.png",
        assetLink: filepath + "personal_website.pdf",
        webLink: "https://tylerlatshaw.com/",
        category: "Software Development",
        createdWith: [
            {
                name: "Next.js",
                icon: NextJsIcon()
            },
            {
                name: "TypeScript",
                icon: TypeScriptIcon()
            },
            {
                name: "Tailwind CSS",
                icon: TailwindIcon()
            },
            {
                name: "Supabase",
                icon: SupabaseIcon()
            },
            {
                name: "React Hook Form",
                icon: ReactHookFormIcon()
            },
            {
                name: "Resend",
                icon: ResendIcon()
            }
        ]
    },
    {
        portfolioSlug: "days-since-last",
        name: "Days Since Last - Task Manager",
        order: 12,
        isFeatured: false,
        description: "Days Since Last is an easy-to-use task tracking system geared towards ensuring that you complete your recurring tasks on time. The website features a simple task dashboard that allows you to quickly reset your task completion date without being intrusive to your workflow or taking you out of the zone. Users can set various thresholds based on tasks being due and past due so you know at a quick glance if you are behind. The entire site is powered by Clauth login using Google Single Sign On (SSO) - my first site using third-party authentication.",
        date: new Date("2025-05-01T00:00:00"),
        associatedWith: null,
        previewLink: filepath + "days_since_last_preview.png",
        assetLink: filepath + "days_since_last.pdf",
        webLink: "https://days-since-last.tylerlatshaw.com/",
        category: "Software Development",
        createdWith: [
            {
                name: "Next.js",
                icon: NextJsIcon()
            },
            {
                name: "TypeScript",
                icon: TypeScriptIcon()
            },
            {
                name: "Tailwind CSS",
                icon: TailwindIcon()
            },
            {
                name: "AWS S3",
                icon: AWSIcon()
            },
            {
                name: "Clerk",
                icon: ClerkIcon()
            }
        ]
    },
    {
        portfolioSlug: "wordle-analyzer",
        name: "Wordle Analyzer",
        order: 13,
        isFeatured: false,
        description: "Given my love of the word game Wordle, I decided to build a website that will essentially calculate and recommend words to guess based on previously guessed words. The entire system is designed based on an algorithm that parses all possible words, assigns a score to each letter in each character position, and then calculates an overall score for the word. Once a user enters a word and selects any correct, incorrect, or misplaced letters, it will recommend words to guess based on the likelihood of being used. The website is powered via a Supabase Postgres database.",
        date: new Date("2025-05-06T00:00:00"),
        associatedWith: null,
        previewLink: filepath + "wordle_analyzer_preview.png",
        assetLink: filepath + "wordle_analyzer.pdf",
        webLink: "https://wordle.tylerlatshaw.com/",
        category: "Software Development",
        createdWith: [
            {
                name: "Next.js",
                icon: NextJsIcon()
            },
            {
                name: "TypeScript",
                icon: TypeScriptIcon()
            },
            {
                name: "Tailwind CSS",
                icon: TailwindIcon()
            },
            {
                name: "Supabase",
                icon: SupabaseIcon()
            }
        ]
    },
    {
        portfolioSlug: "menu-creator",
        name: "Weekly Menu Creator",
        order: 14,
        isFeatured: false,
        description: "Like most working adults, the last thing I want to do after a full day of work is spend even more time cooking a full dinner. At the recommendation of a friend, I started meal-prepping but I didn't like any of the apps or other sites on the market so I created my own. It is a simple-to-use website where you just put in your meals for each night, mark if meal-prepping is needed for that day, and it generates a PDF that is ready to print. While the site itself isn't necessary compared to just writing the meals down, it was a great way to learn PDF generation.",
        date: new Date("2025-03-09T00:00:00"),
        associatedWith: null,
        previewLink: filepath + "menu_creator_preview.png",
        assetLink: filepath + "menu_creator.pdf",
        webLink: "https://menu.tylerlatshaw.com/",
        category: "Software Development",
        createdWith: [
            {
                name: "Next.js",
                icon: NextJsIcon()
            },
            {
                name: "TypeScript",
                icon: TypeScriptIcon()
            },
            {
                name: "Tailwind CSS",
                icon: TailwindIcon()
            },
            {
                name: "React-PDF",
                icon: ReactPdfIcon()
            }
        ]
    }
];