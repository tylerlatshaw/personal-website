"use client";

import {
  useEffect,
  useMemo,
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
import Select, {
  components
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

import Button from "../ui/button";
import noDataFound from "../global-components/no-data";
import {
  dropdownStyles,
  inputLabelStyles,
  inputStyles
} from "./dropdown-configuration";

import type {
  CurrentlyReadingFormType,
  CurrentlyReadingResultType
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
      durationHours: undefined,
      durationMinutes: undefined,
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
  const [file, setFile] = useState<File | null>(null);
  const [existingFilepath, setExistingFilepath] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");

  const imageFilepath = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/personal-website-storage/";

  const hoursOptions = useMemo<SelectOption[]>(
    () => Array.from({ length: 24 }, (_, i) => ({ value: i, label: String(i) })),
    []
  );

  const minOptions = useMemo<SelectOption[]>(
    () => Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i) })),
    []
  );

  const optByValue = (opts: SelectOption[], v: number | null) =>
    v === null ? null : opts.find(o => o.value === v) ?? null;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-currently-reading", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch books");
        const json: CurrentlyReadingResultType[] = await res.json();
        json.sort((a, b) => {
          // Incomplete before complete
          if (a.dateCompleted === null && b.dateCompleted !== null) return -1;
          if (a.dateCompleted !== null && b.dateCompleted === null) return 1;

          // If both same completion status, sort alphabetically by name
          return a.name.localeCompare(b.name);
        });
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

    // if (hoursTotal! >= 0 && minutesTotal! >= 0) {
    //   formData.durationHours = hoursTotal;
    //   formData.durationMinutes = minutesTotal;
    // }
    // else {
    //   formData.durationHours = null;
    //   formData.durationMinutes = null;
    // }

    console.table(formData);

    try {
      if (file) {
        const fileUpload = new FormData();
        const filename = uuidv4() + "." + file.type.replace(/(.*)\//g, "");
        fileUpload.append("apiKey", formData.apiKey!);
        fileUpload.append("file", file);
        fileUpload.append("filename", filename);
        fileUpload.append("directory", "currently-reading");

        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: fileUpload,
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Upload failed");

        formData.imageUrl = json.path;
      }

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
                Option: (props) => {
                  const book = allBooks.find((b) => b.id === props.data.value);
                  const isComplete =
                    book && (book.dateCompleted || book.percentComplete === 100);

                  return (
                    <components.Option {...props}>
                      <span
                        style={{
                          opacity: isComplete ? 0.5 : 1,
                          fontStyle: isComplete ? "italic" : "normal",
                        }}
                      >
                        {props.data.label}
                      </span>
                    </components.Option>
                  );
                },
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
                    setValue("durationHours", book.durationHours);
                    setValue("durationMinutes", book.durationMinutes);
                    setExistingFilepath(imageFilepath + book.imageUrl);
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

            <div className="relative w-full group">
              <span className={inputLabelStyles}>Cover Photo</span>
              <div className="flex flex-row items-center mt-6 gap-8">
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center h-32 w-1/2 rounded-lg border border-white bg-white/10 px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer hover:bg-white/20"
                >
                  <span className="text-center text-white">Click to Upload</span>
                </label>

                {
                  file
                    ? <Image src={filePreview} width={82} height={128} alt={"File Preview"} className="rounded-lg" priority={false} />
                    : existingFilepath != ""
                      ? <Image src={existingFilepath} width={82} height={128} alt={"File Preview"} className="rounded-lg" priority={false} />
                      : <div className="flex flex-col items-center justify-center border border-green-500 rounded-lg bg-green-500/10 w-[82px] h-32 aspect-square text-green-500">
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
              <input {...register("name")} type="text" className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="name" className={inputLabelStyles}>Title</label>
            </div>

            <div className="relative w-full group">
              <input {...register("author")} type="text" className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="author" className={inputLabelStyles}>Author</label>
            </div>

            <div className="relative w-full group">
              <input {...register("percentComplete", { valueAsNumber: true })} type="number" min={0} max={100} className={inputStyles} disabled={submitting || !bookOptions} required />
              <label htmlFor="percentComplete" className={inputLabelStyles}>Percent Complete</label>
            </div>

            <div className="flex flex-col w-full gap-2">
              <span className="font-semibold text-green-600 pointer-events-none select-none h-full w-full">Duration</span>
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <Controller
                  name="durationHours"
                  control={control}
                  render={({ field }) => (
                    <Select<SelectOption, false>
                      className="w-full"
                      styles={dropdownStyles}
                      isClearable
                      isSearchable={false}
                      options={hoursOptions}
                      placeholder="Hours"
                      value={optByValue(hoursOptions, field.value ?? null)}
                      onChange={(opt) => field.onChange(opt?.value ?? null)}
                      isDisabled={submitting || !bookOptions}
                    />
                  )}
                />
                <span className="text-lg font-bold">:</span>
                <Controller
                  name="durationMinutes"
                  control={control}
                  render={({ field }) => (
                    <Select<SelectOption, false>
                      className="w-full"
                      styles={dropdownStyles}
                      isClearable
                      isSearchable={false}
                      options={minOptions}
                      placeholder="Minutes"
                      value={optByValue(minOptions, field.value ?? null)}
                      onChange={(opt) => field.onChange(opt?.value ?? null)}
                      isDisabled={submitting || !bookOptions}
                    />
                  )}
                />
              </div>
            </div>

            <div className="relative w-full group">
              <input {...register("dateCompleted")} type="date" className={inputStyles} disabled={submitting || !bookOptions} />
              <label htmlFor="dateCompleted" className={inputLabelStyles}>Date Completed</label>
            </div>

            <input {...register("imageUrl")} type="hidden" />

            <div className="flex items-center">
              <Button type="submit" disabled={submitting || !bookOptions}>
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