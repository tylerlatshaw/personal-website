"use client";

import {
  useEffect,
  useState
} from "react";
import Image from "next/image";

import { CircularProgress } from "@mui/material/";
import PhotoIcon from "@mui/icons-material/Photo";
import SendIcon from "@mui/icons-material/Send";
import {
  Controller,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

import Button from "../ui/button";
import noDataFound from "../global-components/no-data";
import {
  inputLabelStyles,
  inputStyles,
  selectClassNames
} from "./dropdown-configuration";

import type {
  VinylFormType,
  VinylResultType
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
  const [file, setFile] = useState<File | null>(null);
  const [existingFilepath, setExistingFilepath] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");

  const imageFilepath = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/personal-website-storage/";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-vinyl-collection", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch records");
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
      if (file) {
        const fileUpload = new FormData();
        const filename = uuidv4() + "." + file.type.replace(/(.*)\//g, "");
        fileUpload.append("apiKey", formData.apiKey!);
        fileUpload.append("file", file);
        fileUpload.append("filename", filename);
        fileUpload.append("directory", "vinyl-collection");

        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: fileUpload,
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Upload failed");

        console.log(json);

        formData.imageUrl = json.path;
      }

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
              noOptionsMessage={() => noDataFound("Records")}
              classNames={selectClassNames}
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
                    setExistingFilepath(imageFilepath + record.imageUrl);
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
              <span className={inputLabelStyles}>Cover Photo</span>
              <div className="flex flex-row items-center mt-6 gap-8">
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center h-32 w-1/2 rounded-lg border border-gray-500 dark:border-white bg-black/10 dark:bg-white/10 px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer hover:bg-black/20 dark:hover:bg-white/20"
                >
                  <span className="text-center">Click to Upload</span>
                </label>

                {
                  file
                    ? <Image src={filePreview} width={128} height={128} alt={"File Preview"} className="rounded-lg" priority={false} />
                    : existingFilepath != ""
                      ? <Image src={existingFilepath} width={128} height={128} alt={"File Preview"} className="rounded-lg" priority={false} />
                      : <div className="flex flex-col items-center justify-center border border-green-500 rounded-lg bg-green-500/10 w-32 h-32 aspect-square text-green-500">
                        <PhotoIcon />
                      </div>
                }
              </div>

              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  existingFilepath ? URL.revokeObjectURL(existingFilepath) : null;
                  const objectUrl = URL.createObjectURL(e.target.files?.[0] as Blob);
                  setFilePreview(objectUrl);
                }}
                className="hidden"
              />
              <input {...register("imageUrl")} type="hidden" />
            </div>

            <div className="relative w-full group">
              <input {...register("name")} type="text" className={inputStyles} disabled={submitting || !recordOptions} required />
              <label htmlFor="name" className={inputLabelStyles}>Title</label>
            </div>

            <div className="relative w-full group">
              <input {...register("artist")} type="text" className={inputStyles} disabled={submitting || !recordOptions} required />
              <label htmlFor="artist" className={inputLabelStyles}>Artist</label>
            </div>

            <div className="flex items-center">
              <Button type="submit" disabled={submitting || !recordOptions}>
                <span className="flex items-center">
                  {submitting ? (
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