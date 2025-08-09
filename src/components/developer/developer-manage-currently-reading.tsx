"use client";

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { Button, CircularProgress } from "@mui/material/";
import { inputStyles, inputLabelStyles, dropdownStyles } from "./dropdown-configuration";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import noDataFound from "../global-components/no-data";

import type {
  CurrentlyReadingFormType,
  CurrentlyReadingResultType,
} from "../../app/lib/type-library";

type SubmitState = "Idle" | "Success" | "Error";
type SelectOption = { value: number; label: string };

const environment = process.env.NODE_ENV;

export default function ManageCurrentlyReading() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
  } = useForm<CurrentlyReadingFormType>({
    defaultValues: {
      apiKey: "",
      id: undefined,
      name: "",
      author: "",
      percentComplete: 0,
      dateCompleted: null,
      imageUrl: "",
    },
  });

  const [submitState, setSubmitState] = useState<SubmitState>("Idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [optionsLoading, setOptionsLoading] = useState<boolean>(true);
  const [bookOptions, setBookOptions] = useState<SelectOption[]>([]);
  const [allBooks, setAllBooks] = useState<CurrentlyReadingResultType[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-currently-reading", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch books");
        const json: CurrentlyReadingResultType[] = await res.json();
        setAllBooks(json);
        setBookOptions(json.map((b) => ({ value: b.id, label: b.name })));
      } catch (e) {
        console.error(e);
      } finally {
        setOptionsLoading(false);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<CurrentlyReadingFormType> = async (formData) => {
    setSubmitState("Idle");
    setResponseMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/update-currently-reading", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        setSubmitState("Success");
        setResponseMessage(result.message);
      }
      else {
        setSubmitState("Error");
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setResponseMessage("Something went wrong. Please try again.");
      setSubmitState("Error");
    } finally {
      setSubmitting(false);
    }
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
          disabled={submitting || !bookOptions}
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

  return (
    <div className="developer-module">
      <h2>Manage Currently Reading</h2>

      <form
        className="flex flex-col flex-wrap w-full md:w-2/3 mx-auto mt-1 developer-tools-form gap-8"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >

        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <CreatableSelect<SelectOption, false>
              value={bookOptions.find((opt) => opt.value === field.value) || null}
              options={bookOptions}
              isClearable={false}
              isMulti={false}
              isLoading={optionsLoading}
              noOptionsMessage={() => noDataFound("Books")}
              styles={dropdownStyles}
              components={{
                Input: (props) => <components.Input {...props} maxLength={120} />,
              }}
              onChange={(opt) => {
                const newId = opt?.value ?? undefined;
                const newName = opt?.label ?? "";
                field.onChange(newId);
                setValue("name", newName);
                setIsSelected(true);
                allBooks.find((book) => {
                  if (book.id === opt?.value) {
                    setValue("author", book.author);
                    setValue("percentComplete", book.percentComplete);
                    book.dateCompleted ?
                      setValue("dateCompleted", new Date(book.dateCompleted!).toISOString().substring(0, 10) as unknown as Date)
                      : setValue("dateCompleted", null);
                    setValue("imageUrl", book.imageUrl);
                  }
                });
              }}
              onCreateOption={(inputValue) => {
                const newOption = { value: -1, label: inputValue };
                setBookOptions((prev) => [newOption, ...prev]);
                field.onChange(-1);
                setValue("name", inputValue);
                setIsSelected(true);
              }}
            />
          )}
        />

        {
          isSelected ? <>
            {GetApiField()}

            <input type="hidden" {...register("name")} />

            <div className="relative w-full group">
              <input {...register("author")} type="text" className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="author" className={inputLabelStyles}>Author</label>
            </div>

            <div className="relative w-full group">
              <input {...register("percentComplete", { valueAsNumber: true })} type="number" min={0} max={100} className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="percentComplete" className={inputLabelStyles}>Percent Complete</label>
            </div>

            <div className="relative w-full group">
              <input {...register("dateCompleted")} type="date" className={inputStyles} disabled={submitting || !bookOptions} />
              <label htmlFor="dateCompleted" className={inputLabelStyles}>Date Completed</label>
            </div>

            <div className="relative w-full group">
              <input {...register("imageUrl")} type="url" className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="imageUrl" className={inputLabelStyles}>Image URL</label>
            </div>

            <div className="flex items-center">
              <Button
                type="submit"
                className="button !text-white !bg-green-700 hover:!bg-green-800 focus:!ring-2 focus:!outline-none focus:!ring-green-900 !font-medium !rounded-lg !text-sm !w-full sm:!w-auto !px-5 !py-2.5 !text-center"
                disabled={submitting || !bookOptions}
                sx={{ "&.Mui-disabled": { color: "white" } }}
              >
                <span className="flex items-center">
                  {submitting ? (
                    <>
                      Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} />
                    </>
                  ) : (
                    <>
                      Submit&nbsp;<SendIcon className="text-lg flex items-center" />
                    </>
                  )}
                </span>
              </Button>

              <span className={`flex items-center pl-3 text-md font-semibold ${GetResponseCssClass()}`}>
                {responseMessage}
              </span>
            </div>
          </> : null
        }
      </form>
    </div>
  );
}