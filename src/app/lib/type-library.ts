import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

import type { TemplateOptions } from "../../components/developer/developer-emails";

export type ContactDataType = {
    name: string,
    email: string,
    message: string,
    source: string,
    referringPage: string,
    date?: string,
    dateTime?: string,
    title?: string
}

export type ContactResultType = {
    id: number,
    createdAt: Date,
    modifiedAt: Date,
    name: string,
    email: string,
    message: string,
    referringPage: string,
    formSource: string
}

export type CurrentlyReadingFormType = {
    apiKey?: string,
    id: number | null,
    name: string,
    author: string,
    percentComplete: number,
    dateCompleted: Date | null,
    imageUrl: string
}

export type CurrentlyReadingResultType = {
    id: number,
    createdAt: Date,
    modifiedAt: Date,
    name: string,
    author: string,
    percentComplete: number,
    dateCompleted: Date | null,
    imageUrl: string
}

export type DeveloperItemType = {
    title: string,
    content: JSX.Element,
    index: number
}

export type EmailFormType = {
    selection: TemplateOptions
    formName: string
    email: string
    apiKey: string
    title: string
    name: string
    message: string
    source: string
    referringPage: string
}

export type FooterSocialType = {
    display: string,
    link: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export type IconLookupType = {
    display: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export type NavigationLinkType = {
    display: string,
    link: string,
    filepath: string,
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority: number,
}

export type VinylFormType = {
    apiKey?: string,
    id: number,
    name: string,
    artist: string,
    imageUrl: string
}

export type VinylResultType = {
    id: number,
    createdAt: Date,
    modifiedAt: Date,
    name: string,
    artist: string,
    imageUrl: string
}