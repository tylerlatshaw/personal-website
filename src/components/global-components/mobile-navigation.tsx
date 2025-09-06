"use client";

import { useState } from "react";
import Link from "next/link";
import router from "next/router";

import HomeIcon from "@mui/icons-material/Home";
import SvgIcon from "@mui/icons-material/Home";
import { Twirl as Hamburger } from "hamburger-react";
import { useTheme } from "next-themes";

import {
    mobileLinkIcons,
    navigationLinks
} from "../../app/lib/navigation-links";

function lookupMobileIcon(pageName: string) {
    return mobileLinkIcons.find(mobileLinkIcons => mobileLinkIcons.display === pageName)?.icon ?? HomeIcon;
}

export default function MobileNavigation() {

    const { theme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    let mobileMenuButtonColor = isOpen ? "#16a34a" : theme === "dark" ? "#FFFFFF" : "#000000";

    if (typeof document !== "undefined") {
        isOpen ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "scroll";
    }

    const mobileMenuList = navigationLinks.map((menuItem) =>
        <div key={menuItem.display} className="mobile-menu group flex items-center w-full">
            <li className="flex items-center w-full group-hover:text-green-500">
                <Link key={menuItem.display} href={menuItem.link} onClick={() => { router.push(menuItem.link); setIsOpen(false); }} className="flex items-center w-full">
                    <SvgIcon component={lookupMobileIcon(menuItem.display)} className="inline-block align-middle text-4xl" />
                    <span className="inline-block align-top rounded-md px-3 py-3 group-hover:font-semibold">{menuItem.display}</span>
                </Link>
            </li>
        </div>
    );

    return (
        <>
            {/* Mobile menu button */}
            <div className="mobile-only flex items-center z-50">
                <button className="outline-none">
                    <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} rounded label="Show menu" color={mobileMenuButtonColor} hideOutline={false} />
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen ? <>
                <div className="w-full h-full fixed flex items-center top-0 left-0 bg-gray-200 dark:bg-gray-900 md:hidden shadow p-3 z-40">
                    <div className="mobile-menu fixed block w-full p-8 text-2xl leading-none">
                        <ul className="space-y-10 w-full">
                            {mobileMenuList}
                        </ul>
                    </div>
                </div>
            </> : null}
        </>
    );
}