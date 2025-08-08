"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { Button, CircularProgress } from "@mui/material/";
import { inputStyles, inputLabelStyles, dropdownStyles, DropdownItem } from "./dropdown-configuration";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import noDataFound from "../global-components/no-data";

import type { CurrentlyReadingFormType, CurrentlyReadingResultType } from "../../app/lib/type-library";

type SubmitState = "Idle" | "Success" | "Error";

type CreatableData = { value: number, data: string };

const environment = process.env.NODE_ENV;

export default function ManageCurrentlyReading() {

  const {
    register,
    handleSubmit,
    control
  } = useForm<CurrentlyReadingFormType>({});

  const [submitState, setSubmitState] = useState<SubmitState>("Idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [currentlyReadingData, setCurrentlyReadingData] = useState<CreatableData[]>([]);
  // const bookOptions: DropdownItem[] = currentlyReadingData.map((value) => ({
  //       value: value.data,
  //       label: value,
  //   }));

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/api/get-currently-reading");
      data.map((item: CurrentlyReadingResultType) => {
        currentlyReadingData.push({ value: item.id, data: item.name });
      });
    }
    getData();
  }, [currentlyReadingData]);

  const onSubmit: SubmitHandler<CurrentlyReadingFormType> = async (formData) => {
    setSubmitState("Idle");
    setResponseMessage("");
    setLoadingState(true);

    try {
      let enteredKey;

      if (environment === "development") {
        enteredKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
      } else {
        enteredKey = formData.apiKey;
      }

      const { data } = await axios.post("/api/emails-form", {
        apiKey: enteredKey,
        id: 0,
        name: "",
        author: "",
        percentComplete: 0,
        dateCompleted: null,
        imageUrl: ""
      } as CurrentlyReadingFormType);

      if (data === "Authentication Error: Invalid API Key") {
        setSubmitState("Error");
      } else {
        setSubmitState("Success");
      }

      setResponseMessage(data);
    } catch (e) {
      setResponseMessage("Something went wrong. Please try again.");
      setSubmitState("Error");
    }

    setLoadingState(false);
  };

  function GetApiField() {
    if (environment === "development") {
      return (
        <input {...register("apiKey")} type="password" className="hidden" />
      );
    }

    return (
      <div className="relative w-full group">
        <input {...register("apiKey")} type="password" className={inputStyles} maxLength={36} required disabled={loadingState} />
        <label htmlFor="apiKey" className={inputLabelStyles}>
          API Key
        </label>
      </div>
    );
  }

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
    <div className="developer-module">
      <h2>Manage Currently Reading</h2>
      <form className="flex flex-wrap w-full md:w-2/3 mx-auto mt-1 developer-tools-form gap-8" method="POST" onSubmit={handleSubmit(onSubmit)}>

        {/* <Controller name="name" control={control} rules={{ required: true }} render={({ field }) =>
          <CreatableSelect {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={currentlyReadingData} noOptionsMessage={() => noDataFound("Books")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
        } /> */}

        <div className="relative w-full group">
          <input {...register("name")} type="email" className={inputStyles} maxLength={255} required disabled={loadingState} />
          <label htmlFor="name" className={inputLabelStyles}>
            Title
          </label>
        </div>

        {GetApiField()}

        <div className="flex items-center">
          <Button type="submit" className="button text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loadingState} sx={{ "&.Mui-disabled": { color: "white" } }}>
            <span className="flex items-center">
              {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
            </span>
          </Button>
        </div>
        <span className={`flex items-center pl-3 text-md font-semibold ${GetResponseCssClass()}`}>{responseMessage}</span>
      </form >
    </div>
  );
}