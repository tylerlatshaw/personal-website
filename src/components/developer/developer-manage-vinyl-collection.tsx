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
  VinylFormType,
  VinylResultType,
} from "../../app/lib/type-library";

type SubmitState = "Idle" | "Success" | "Error";
type SelectOption = { value: number; label: string };

const environment = process.env.NODE_ENV;

export default function ManageVinylCollection() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
  } = useForm<VinylFormType>({
    defaultValues: {
      apiKey: "",
      id: undefined,
      name: "",
      artist: "",
      imageUrl: "",
    },
  });

  const [submitState, setSubmitState] = useState<SubmitState>("Idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [optionsLoading, setOptionsLoading] = useState<boolean>(true);
  const [recordOptions, setRecordOptions] = useState<SelectOption[]>([]);
  const [allRecords, setAllRecords] = useState<VinylResultType[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-vinyl-collection", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch books");
        const json: VinylResultType[] = await res.json();
        json.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setAllRecords(json);
        setRecordOptions(json.map((b) => ({ value: b.id, label: b.name })));
      } catch (e) {
        console.error(e);
      } finally {
        setOptionsLoading(false);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<VinylFormType> = async (formData) => {
    setSubmitState("Idle");
    setResponseMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/update-vinyl-collection", {
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
          disabled={submitting || !recordOptions}
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
      <h2>Manage Vinyl Collection</h2>

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
              value={recordOptions.find((opt) => opt.value === field.value) || null}
              options={recordOptions}
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
                allRecords.find((record) => {
                  if (record.id === opt?.value) {
                    setValue("artist", record.artist);
                    setValue("imageUrl", record.imageUrl);
                  }
                });
              }}
              onCreateOption={(inputValue) => {
                const newOption = { value: -1, label: inputValue };
                setRecordOptions((prev) => [newOption, ...prev]);
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

            <div className="relative w-full group">
              <input {...register("name")} type="text" className={inputStyles} disabled={submitting || !recordOptions} required />
              <label htmlFor="name" className={inputLabelStyles}>Title</label>
            </div>

            <div className="relative w-full group">
              <input {...register("artist")} type="text" className={inputStyles} disabled={submitting || !recordOptions} required />
              <label htmlFor="artist" className={inputLabelStyles}>Artist</label>
            </div>

            <div className="relative w-full group">
              <input {...register("imageUrl")} type="text" className={inputStyles} disabled={submitting || !recordOptions} required />
              <label htmlFor="imageUrl" className={inputLabelStyles}>Image</label>
            </div>

            <div className="flex items-center">
              <Button
                type="submit"
                className="button !text-white !bg-green-700 hover:!bg-green-800 focus:!ring-2 focus:!outline-none focus:!ring-green-900 !font-medium !rounded-lg !text-sm !w-full sm:!w-auto !px-5 !py-2.5 !text-center"
                disabled={submitting || !recordOptions}
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