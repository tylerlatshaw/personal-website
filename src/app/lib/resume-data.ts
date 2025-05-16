export const professionalProfile: string = "I am an Advanced Certified ScrumMaster and Senior Technical Business Analyst with more than 8 years of industry experience leading projects, managing development teams, and mentoring others at a multi-billion-dollar company looking to further my career into academic instruction as an adjunct faculty member while maintaining my current position.";

export type companyName = "Best Buy" | "Elizabethtown College" | "Southern New Hampshire University" | "The Home Depot" | "WebstaurantStore"

export type companyDataType = {
    company: companyName,
    logo: string,
    avatar: string | null,
    location: string
}

export const companyData: companyDataType[] = [
    {
        company: "Best Buy",
        logo: "/static/resume/best_buy_logo.svg",
        avatar: null,
        location: "Reading, PA"
    },
    {
        company: "Elizabethtown College",
        logo: "/static/resume/elizabethtown_logo.svg",
        avatar: "/static/resume/elizabethtown_mini_logo.svg",
        location: "Elizabethtown, PA"
    },
    {
        company: "Southern New Hampshire University",
        logo: "/static/resume/snhu_logo.svg",
        avatar: "/static/resume/snhu_mini_logo.svg",
        location: "Manchester, NH"
    },
    {
        company: "The Home Depot",
        logo: "/static/resume/home_depot_logo.svg",
        avatar: null,
        location: "Reading, PA"
    },
    {
        company: "WebstaurantStore",
        logo: "/static/resume/webstaurantstore_logo.svg",
        avatar: "/static/resume/webstaurantstore_mini_logo.svg",
        location: "Lititz, PA | Remote"
    }
];

export type jobDataType = {
    company: companyName,
    jobData: {
        jobTitle: string,
        startDate: Date,
        endDate: Date | null,
        jobDetails: string[],
        previousTitle: {
            jobTitle: string,
            startDate: Date,
            endDate: Date,
        }[] | null
    }[]
}

export const jobData: jobDataType[] = [
    {
        company: "WebstaurantStore",
        jobData: [{
            jobTitle: "Senior Technical Business Analyst",
            startDate: new Date("2024-01-01T00:00:00"),
            endDate: null,
            jobDetails: ["Led over a dozen development teams with up to 25 individuals to build C# applications and systems",
                "Analyzed complex business workflows and crafted user stories to aid developers while coding",
                "Facilitated multiple trainings on process automation to teach division of more than 500 employees",
                "Performed advanced SQL reporting for company executives for data-driven business decisions",
                "Engaged teams in a collaborative manner to maintain positive workplace culture while working remote",
                "Miro Hall of Fame Nominee - 2023, Top 10 Most Copied Users Worldwide, Most Copied Creator - June 2023"],
            previousTitle: [{
                jobTitle: "Technical Business Analyst",
                startDate: new Date("2022-01-01T00:00:00"),
                endDate: new Date("2023-12-31T00:00:00"),
            },
            {
                jobTitle: "Junior Technical Business Analyst",
                startDate: new Date("2020-07-20T00:00:00"),
                endDate: new Date("2022-01-01T00:00:00"),
            }
            ]
        },
        {
            jobTitle: "Project Coordinator / Product Owner",
            startDate: new Date("2018-08-01T00:00:00"),
            endDate: new Date("2020-07-20T00:00:00"),
            jobDetails: ["Led multiple development projects as product owner and managed projects for 30+ person team",
                "Updated internal search index for SEO keyword volume, increasing revenue by over $500,000",
                "Instructed employees and management on newly built systems and proper use of Microsoft Excel",
                "Analyzed monthly cost-savings reports to deliver performance data to company executives",
                "Conducted 200+ interviews; Hand-picked for projects for the CEO and CIO on industry compliance"],
            previousTitle: [{
                jobTitle: "Website Maintenance Specialist",
                startDate: new Date("2017-05-22T00:00:00"),
                endDate: new Date("2018-08-01T00:00:00"),
            },
            {
                jobTitle: "Website Maintenance Intern",
                startDate: new Date("2017-01-17T00:00:00"),
                endDate: new Date("2017-05-22T00:00:00"),
            }]
        }]
    },
    {
        company: "The Home Depot",
        jobData: [{
            jobTitle: "Head Cashier",
            startDate: new Date("2016-10T00:00:00"),
            endDate: new Date("2018-01T00:00:00"),
            jobDetails: ["Supervised and educated front-end employees to promote a standard of excellence in the store",
                "Provided manager approvals, carried store keys, and managed register tills of thousands of dollars",
                "Selected as Cashier of the Month - June ‘16 and rated highest cashier friendliness - June ‘15"],
            previousTitle: [{
                jobTitle: "Cashier",
                startDate: new Date("2015-05T00:00:00"),
                endDate: new Date("2016-10T00:00:00"),
            }]
        }]
    },
    {
        company: "Elizabethtown College",
        jobData: [{
            jobTitle: "Academic Tutor",
            startDate: new Date("2016-11T00:00:00"),
            endDate: new Date("2017-05T00:00:00"),
            jobDetails: ["CS113: The Power and Beauty of Computing",
                "CS121: Computer Science",
                "CS230: Microcomputer Architecture",
                "CS310: Web Technology",
                "CS409: Advanced Database Systems",
                "ART207: Intro to Graphic Design",
                "ART280: World Architecture"],
            previousTitle: null
        },
        {
            jobTitle: "Lead Circulation Student Assistant",
            startDate: new Date("2014-01T00:00:00"),
            endDate: new Date("2017-05T00:00:00"),
            jobDetails: ["Compiled statistics on program data usage for college administrators to make data-driven decisions",
                "Instructed and taught students on research techniques and the use of information technologies",
                "Trained and led student staff on best practices to ensure legal compliance for the library"],
            previousTitle: null
        }]
    },
    {
        company: "Best Buy",
        jobData: [{
            jobTitle: "Computer Sales Consultant",
            startDate: new Date("2014-07T00:00:00"),
            endDate: new Date("2014-09T00:00:00"),
            jobDetails: ["Gold-Certified consultant and Apple Product Professional",
                "Assisted customers in finding the right computer/tablet solution through a series of questions",
                "Advertiesed & processed branded credit card applications",
                "Filled roles in other departments as needed including cashier"],
            previousTitle: null
        }]
    }
];

export const internData: jobDataType[] = [
    {
        company: "WebstaurantStore",
        jobData: [{
            jobTitle: "Website Maintenance Intern",
            startDate: new Date("2017-01-17T00:00:00"),
            endDate: new Date("2017-05-22T00:00:00"),
            jobDetails: ["Updated content, site structure, and user experience for muti-billion-dollar website to ensure accuracy",
                "Categorized products and parsed technical data while maintaining SEO value to drive revenue",
                "Responded to thousands of email requests to triage updates from business stakeholders"],
            previousTitle: null
        }]
    },
    {
        company: "Elizabethtown College",
        jobData: [{
            jobTitle: "Web Design Intern",
            startDate: new Date("2016-08T00:00:00"),
            endDate: new Date("2017-05T00:00:00"),
            jobDetails: ["Worked with three other developers to design and rebrand the college website to drive applications",
                "Developed a pattern library of templates that could be replicated for ease of use",
                "Assisted and trained users in offices and departments to empower them to make their own edits"],
            previousTitle: null
        }]
    }
];

export const volunteerData: jobDataType[] = [
    {
        company: "WebstaurantStore",
        jobData: [{
            jobTitle: "College Ambassador Program Team Lead",
            startDate: new Date("2018-09-25T00:00:00"),
            endDate: null,
            jobDetails: [],
            previousTitle: null
        }]
    },
    {
        company: "Elizabethtown College",
        jobData: [{
            jobTitle: "Alumni Council Vice-President",
            startDate: new Date("2025-07-01T00:00:00"),
            endDate: null,
            jobDetails: [],
            previousTitle: null
        },
        {
            jobTitle: "Alumni Council Chapters Committee Chair",
            startDate: new Date("2021-11-04T00:00:00"),
            endDate: new Date("2025-06-30T00:00:00"),
            jobDetails: [],
            previousTitle: null
        },
        {
            jobTitle: "Alumni Council Representative",
            startDate: new Date("2017-10-21T00:00:00"),
            endDate: new Date("2025-06-30T00:00:00"),
            jobDetails: [],
            previousTitle: null
        }]
    },
];

export type educationDataType = {
    school: companyName,
    degree: string,
    minor: string,
    gpa: number,
    startDate: Date,
    endDate: Date | null,
    honorSocieties: string[] | null,
    activities: string[] | null,
    courses: string[]
}

export const educationData: educationDataType[] = [
    {
        school: "Southern New Hampshire University",
        degree: "Master's in Information Technology",
        minor: "Concentration in IT Management",
        gpa: 4.0,
        startDate: new Date("2019-08T00:00:00"),
        endDate: new Date("2022-03T00:00:00"),
        honorSocieties: ["Delta Mu Delta International Business Honor Society",
            "National Society for Leadership and Success"],
        activities: null,
        courses: ["Advanced Information Systems",
            "Cyberlaw & Ethics",
            "Enterprise Resource Planning",
            "IT Project & Team Management",
            "Innovation in Technology",
            "Management of Information Technology",
            "Object Oriented App Development",
            "Operating Systems",
            "Principles of Database Design",
            "Technical Communication",
            "Telecommunications & Networking"]
    },
    {
        school: "Elizabethtown College",
        degree: "Bachelor's in Information Systems",
        minor: "Minor in Business Administration",
        gpa: 3.2,
        startDate: new Date("2013-08T00:00:00"),
        endDate: new Date("2017-05T00:00:00"),
        honorSocieties: ["Alpha Lambda Delta Honor Society",
            "National Society for Leadership and Success"],
        activities: ["Student Senate / Class Treasurer",
            "Called to Lead Leadership Program",
            "Computer Science Club Webmaster",
            "Overnight Visit Program Host",
            "Admissions Peer Mentor"],
        courses: ["Advanced Database Systems",
            "Algorithms & Data Structures",
            "Computer Networking",
            "Computer Security",
            "Cost Management Accounting",
            "Graphic Design",
            "Information Systems",
            "Legal Environment of Business",
            "Management & Organizational Behavior",
            "Microcomputer Architecture",
            "Principles of Marketing",
            "Systems Analysis & Design",
            "Web Development & Technology"]
    }
];

export const skills = [
    "Written & Verbal Communication",
    "Training & Mentoring",
    "Meeting Facilitation",
    "Interpersonal Ability",
    "Servant Leadership",
    "Scrum",
    "Kanban",
    "User Testing",
    "SQL",
    "Java",
    "Tailwind",
    "User Testing",
    "UI & UX Design",
    "Microsoft Office"
];