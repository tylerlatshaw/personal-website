import React from "react";

import MuiButton, {
    ButtonProps as MuiButtonProps
} from "@mui/material/Button";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends MuiButtonProps { }

export default function Button({ className, ...props }: ButtonProps) {
    return (
        <MuiButton
            {...props}
            className={twMerge(
                clsx(
                    "button !text-white !bg-green-700 hover:!bg-green-800 focus:!ring-2 focus:!outline-none focus:!ring-green-900 !font-medium !rounded-lg !text-sm !w-full sm:!w-auto !px-5 !py-2.5 !text-center !normal-case"
                ),
                className
            )}
            sx={{
                "&.Mui-disabled": { color: "white" },
                ...props.sx,
            }}
        />
    );
}