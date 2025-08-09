"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { Button, CircularProgress } from "@mui/material/";
import {
  inputStyles,
  inputLabelStyles,
  dropdownStyles
} from "./dropdown-configuration";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import noDataFound from "../global-components/no-data";

import type {
  CurrentlyReadingFormType,
  CurrentlyReadingResultType
} from "../../app/lib/type-library";

type SubmitState = "Idle" | "Success" | "Error";
type SelectOption = { value: string; label: string };

const environment = process.env.NODE_ENV;

export default function ManageCurrentlyReadingCopy() {
  const { register, handleSubmit, control } =
    useForm<CurrentlyReadingFormType>();

  const [submitState, setSubmitState] = useState<SubmitState>("Idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(true);
  // const [bookOptions, setBookOptions] = useState<SelectOption[]>([]);
  const [bookOptions, setBookOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load options from API
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/get-currently-reading", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setBookOptions(json.map((item: any) => ({
          value: item.name,
          label: item.name
        })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const onSubmit: SubmitHandler<CurrentlyReadingFormType> = async (formData) => {
    setSubmitState("Idle");
    setResponseMessage("");
    setLoadingState(true);

    try {
      const enteredKey =
        environment === "development"
          ? `${process.env.NEXT_PUBLIC_API_KEY}`
          : formData.apiKey;

      const { data } = await axios.post("/api/emails-form", {
        apiKey: enteredKey,
        id: 0,
        name: formData.name, // string from the select
        author: "",
        percentComplete: 0,
        dateCompleted: null,
        imageUrl: ""
      } as CurrentlyReadingFormType);

      setSubmitState(
        data === "Authentication Error: Invalid API Key" ? "Error" : "Success"
      );
      setResponseMessage(data);
    } catch (e) {
      setResponseMessage("Something went wrong. Please try again.");
      setSubmitState("Error");
    }

    setLoadingState(false);
  };

  function GetApiField() {
    if (environment === "development") {
      return <input {...register("apiKey")} type="password" className="hidden" />;
    }
    return (
      <div className="relative w-full group">
        <input
          {...register("apiKey")}
          type="password"
          className={inputStyles}
          maxLength={36}
          required
          disabled={loadingState}
        />
        <label htmlFor="apiKey" className={inputLabelStyles}>
          API Key
        </label>
      </div>
    );
  }

  function GetResponseCssClass() {
    if (submitState === "Success") return "positive-response";
    if (submitState === "Error") return "negative-response";
    return "";
  }

  if (loading)
    return null;

  return (
    <div className="developer-module">
      <h2>Manage Currently Reading</h2>
      <form
        className="flex flex-wrap w-full md:w-2/3 mx-auto mt-1 developer-tools-form gap-8"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CreatableSelect<SelectOption, false>
              value={bookOptions.find((opt) => opt.value === field.value) || null}
              onChange={(newValue) => field.onChange(newValue?.value || "")}
              onCreateOption={(inputValue) => {
                const newOption = { value: inputValue, label: inputValue };
                setBookOptions((prev) => [...prev, newOption]);
                field.onChange(inputValue);
              }}
              options={bookOptions}
              isClearable={false}
              isMulti={false}
              isLoading={loadingState}
              noOptionsMessage={() => noDataFound("Books")}
              styles={dropdownStyles}
              components={{
                Input: (props) => (
                  <components.Input {...props} maxLength={50} />
                )
              }}
            />
          )}
        />

        {GetApiField()}

        <div className="flex items-center">
          <Button
            type="submit"
            className="button text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={loadingState}
            sx={{ "&.Mui-disabled": { color: "white" } }}
          >
            <span className="flex items-center">
              {loadingState ? (
                <>
                  Submit&nbsp;
                  <CircularProgress size={16} sx={{ color: "white" }} />
                </>
              ) : (
                <>
                  Submit&nbsp;
                  <SendIcon className="text-lg flex items-center" />
                </>
              )}
            </span>
          </Button>
        </div>
        <span
          className={`flex items-center pl-3 text-md font-semibold ${GetResponseCssClass()}`}
        >
          {responseMessage}
        </span>
      </form>
    </div>
  );
}