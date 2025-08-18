"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";

import type { ContactDataType } from "../../app/lib/type-library";
import Button from "../ui/button";

type SubmitState = "Idle" | "Success" | "Error";
type FormInputs = {
    name: string
    email: string
    message: string
};

export default function FormContact() {

    const inputStyles = "block pt-2 pb-1.5 px-0 w-full text-white bg-transparent border-0 border-b border-gray-600 appearance-none focus:outline-none focus:ring-0 peer";
    const inputLabelStyles = "text-gray-400 group-focus-within:text-green-500";
    const spanStyles = "font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100";

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormInputs>();

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            const { data } = await axios.post("/api/add-contact-message", {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                source: "Contact Me",
                referringPage: window.location.href,
            } as ContactDataType);

            setResponseMessage(data);
            setSubmitState("Success");
            reset({
                name: "",
                email: "",
                message: "",
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
        <form className="contact-form w-full mt-1" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mt-2 mb-4 group">
                <label htmlFor="name" className={inputLabelStyles}>Name</label>
                <input {...register("name")} id="name" type="text" className={inputStyles} placeholder=" " required disabled={loadingState} />
                <span className={spanStyles}></span>
            </div>
            <div className="relative z-0 w-full mt-2 mb-4 group">
                <label htmlFor="email" className={inputLabelStyles}>Email</label>
                <input {...register("email")} id="email" type="email" className={inputStyles} placeholder=" " required disabled={loadingState} />
                <span className={spanStyles}></span>
            </div>
            <div className="relative z-0 w-full mt-2 mb-4 group">
                <label htmlFor="message" className={inputLabelStyles}>Message</label>
                <textarea {...register("message")} id="message" rows={3} className={inputStyles} placeholder=" " required disabled={loadingState} />
                <span className={spanStyles}></span>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
                <Button type="submit" disabled={loadingState}>
                    <span className="flex items-center">
                        {loadingState ? (
                            <>
                                Submit&nbsp;<CircularProgress size={14} sx={{ color: "white" }} />
                            </>
                        ) : (
                            <>
                                Submit&nbsp;<SendIcon className="text-lg flex items-center" />
                            </>
                        )}
                    </span>
                </Button>
                <span className={`pl-3 text-md  ${GetResponseCssClass()}`}>{responseMessage}</span>
            </div>
        </form>
    );
}