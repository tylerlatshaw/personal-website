"use client";

import {
    useEffect,
    useState
} from "react";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@mui/material";
import { useTheme } from "next-themes";

export default function DarkModeButton() {

    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const current = theme === "system" ? systemTheme : theme;
    if (!mounted) return null;

    const isDark = current === "dark";

    return (
        <>
            <Button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="!rounded-full !text-blue-800 dark:!text-blue-100 !bg-blue-200 dark:!bg-blue-600 hover:!bg-green-600 dark:hover:!bg-green-500 hover:!text-green-200 dark:hover:!text-green-800"
            >
                {
                    isDark
                        ? <DarkModeIcon className="!drop-shadow-lg" />
                        : <WbSunnyIcon className="!drop-shadow-lg" />
                }
            </Button>
        </>
    );
}