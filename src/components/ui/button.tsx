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
                    "button !font-medium !rounded-lg !text-sm !w-full sm:!w-auto !px-5 !py-2.5 !text-center !normal-case"
                ),
                props.variant === "contained" && clsx(
                    "!text-white !bg-green-700 hover:!bg-green-800 focus:!ring-2 focus:!outline-none focus:!ring-green-900"
                ),
                props.variant === "outlined" && clsx(
                    "!border-green-600 !text-green-600 hover:!bg-green-700 hover:!text-white focus:!ring-2 focus:!outline-none focus:!ring-green-900"
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