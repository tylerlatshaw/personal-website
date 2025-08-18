"use client";

import { useState } from "react";

import axios from "axios";
import { CircularProgress } from "@mui/material/";
import { Button } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import type { ContactDataType } from "../../../app/lib/type-library";

type SubmitState = "Idle" | "Success" | "Error";
type FormInputs = {
    email: string
};

export default function ComingSoonForm() {

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            const { data } = await axios.post("/api/add-coming-soon-contact-message", {
                name: "Notification Request",
                email: formData.email,
                message: "Notify me when the site goes live",
                source: "Coming Soon",
                referringPage: window.location.href,
            } as ContactDataType);

            setResponseMessage(data);
            setSubmitState("Success");
            reset({
                email: "",
            });
        } catch (e) {
            setResponseMessage("Something went wrong. Please try again.");
            setSubmitState("Error");
        }

        setLoadingState(false);
    };

    function GetResponseCssClass() {
        if (submitState === "Success") {
            return "positive-response";
        }

        if (submitState === "Error") {
            return "negative-response";
        }

        return "";
    }

    return (
        <form className="w-full h-full" id="notify-me" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-fit mx-auto">
                <div className="w-full text-left">
                    <div className="email-form mt-8">
                        <input {...register("email")} type="email" placeholder="Email Address" className="px-3 py-2.5 mx-0 text-lg text-white bg-gray-700 rounded-l-lg border-0 h-full focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:w-48 md:w-60 lg:w-96 h-12" required disabled={loadingState} />
                        <Button type="submit" className="button flex items-center !text-white !bg-green-700 hover:!bg-green-800 !rounded-r-lg w-auto px-5 py-2.5 mx-0 text-center h-full border-0 focus:ring-0 origin-center -translate-x-1 -translate-y-px text-base" disabled={loadingState} sx={{"&.Mui-disabled": {color: "white"}}}>
                            {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                        </Button>
                    </div>
                    <span className={`flex px-3 py-1 text-left text-md ${GetResponseCssClass()}`}>{responseMessage}</span>
                </div>
            </div>
        </form>
    );
}