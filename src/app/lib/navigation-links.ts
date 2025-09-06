import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

import type {
    FooterSocialType,
    IconLookupType,
    NavigationLinkType
} from "./type-library";

export const navigationLinks: NavigationLinkType[] = [
    {
        display: "Home",
        link: "/",
        filepath: "src/app/(main-site)/page.tsx",
        changeFrequency: "monthly",
        priority: 1.0
    },
    {
        display: "Resume",
        link: "/resume",
        filepath: "src/app/(main-site)/resume/page.tsx",
        changeFrequency: "monthly",
        priority: 0.9
    },
    {
        display: "Portfolio",
        link: "/portfolio",
        filepath: "src/app/(main-site)/portfolio/page.tsx",
        changeFrequency: "yearly",
        priority: 0.8
    },
    {
        display: "Interests",
        link: "/interests",
        filepath: "src/app/(main-site)/interests/page.tsx",
        changeFrequency: "weekly",
        priority: 0.6
    },
    {
        display: "Contact Me",
        link: "/contact-me",
        filepath: "src/app/(main-site)/contact-me/page.tsx",
        changeFrequency: "yearly",
        priority: 0.7
    }
];

export const supplementalLinks: NavigationLinkType[] = [
    {
        display: "Privacy Policy",
        link: "/privacy-policy",
        filepath: "src/app/(main-site)/privacy-policy/page.tsx",
        changeFrequency: "yearly",
        priority: 0.1
    },
    {
        display: "Sitemap",
        link: "/sitemap.xml",
        filepath: "src/app/sitemap.xml",
        changeFrequency: "yearly",
        priority: 0.1
    }
];

export const mobileLinkIcons: IconLookupType[] = [
    {
        display: "Home",
        icon: HomeIcon
    },
    {
        display: "Resume",
        icon: WorkIcon
    },
    {
        display: "Portfolio",
        icon: SchoolIcon
    },
    {
        display: "Interests",
        icon: LibraryMusicIcon
    },
    {
        display: "Contact Me",
        icon: EmailIcon
    }
];

export const footerSocialLinks: FooterSocialType[] = [
    {
        display: "tyler@tylerlatshaw.com",
        link: "mailto:tyler@tylerlatshaw.com",
        icon: MailOutlineIcon
    },
    {
        display: "Connect With Me On LinkedIn",
        link: "https://www.linkedin.com/in/tylerlatshaw/",
        icon: LinkedInIcon
    },
    {
        display: "Find My Code on GitHub",
        link: "https://github.com/tylerlatshaw",
        icon: GitHubIcon
    }
];