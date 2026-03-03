export type certificationRibbonType = {
    name: string,
    altText: string,
    logo: string,
    link: string | null
}

export const certificationRibbon: certificationRibbonType[] = [
    {
        name: "Certified ScrumMaster",
        altText: "CSM Logo",
        logo: "/static/resume/cert-csm.svg",
        link: "https://bcert.me/svhkdzsmg"
    },
    {
        name: "Advanced Certified ScrumMaster",
        altText: "A-CSM Logo",
        logo: "/static/resume/cert-acsm.svg",
        link: "https://bcert.me/ssdaeiqcc"
    },
    {
        name: "Certified Agile Leader (CAL-1)",
        altText: "CAL-1 Logo",
        logo: "/static/resume/cert-cal1.svg",
        link: "https://bcert.me/sgtwmqihm"
    },
    {
        name: "CompTIA A+",
        altText: "CompTIA A+ Logo",
        logo: "/static/resume/cert-comptia.svg",
        link: "https://www.credly.com/badges/68fcacd5-757a-433d-95e7-f5979a6b268b"
    },
    {
        name: "Certified Foodservice Professional",
        altText: "CFSP Logo",
        logo: "/static/resume/cert-cfsp.svg",
        link: "https://cfsp.nafem.org/cfsp-wall-of-fame/"
    }
];