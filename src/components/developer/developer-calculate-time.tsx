"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { dropdownStyles } from "./dropdown-configuration";
import noDataFound from "../global-components/no-data";
import type { CurrentlyReadingResultType } from "@/app/lib/type-library";

type SelectOption = { value: number; label: string };

export default function CalculateTimeComplete() {
  const hoursOptions = useMemo<SelectOption[]>(
    () => Array.from({ length: 24 }, (_, i) => ({ value: i, label: String(i) })),
    []
  );

  const minSecOptions = useMemo<SelectOption[]>(
    () => Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i) })),
    []
  );

  const [hoursRemain, setHoursRemain] = useState<number | null>(null);
  const [minutesRemain, setMinutesRemain] = useState<number | null>(null);
  const [secondsRemain, setSecondsRemain] = useState<number | null>(null);

  const [hoursTotal, setHoursTotal] = useState<number | null>(null);
  const [minutesTotal, setMinutesTotal] = useState<number | null>(null);
  const [secondsTotal, setSecondsTotal] = useState<number | null>(null);

  const [percentComplete, setPercentComplete] = useState<number | null>(null);

  const toSeconds = (h: number | null, m: number | null, s: number | null) =>
    (h ?? 0) * 3600 + (m ?? 0) * 60 + (s ?? 0);

  const hasAnyValue = (h: number | null, m: number | null, s: number | null) =>
    h !== null || m !== null || s !== null;

  const optByValue = (opts: SelectOption[], v: number | null) =>
    v === null ? null : opts.find((o) => o.value === v) ?? null;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-currently-reading", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch books");

        const books: CurrentlyReadingResultType[] = await res.json();
        books.sort((a, b) => {
          if (a.modifiedAt > b.modifiedAt) return -1;
          if (a.modifiedAt < b.modifiedAt) return 1;
          return a.name.localeCompare(b.name);
        });

        const book = books[0];
        if (!book) return;

        setHoursTotal(book.durationHours ?? null);
        setMinutesTotal(book.durationMinutes ?? null);
        setSecondsTotal(null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    const remainingHasAny = hasAnyValue(hoursRemain, minutesRemain, secondsRemain);
    const totalHasAny = hasAnyValue(hoursTotal, minutesTotal, secondsTotal);

    if (!remainingHasAny || !totalHasAny) {
      setPercentComplete(null);
      return;
    }

    const remainingSec = toSeconds(hoursRemain, minutesRemain, secondsRemain);
    const totalSec = toSeconds(hoursTotal, minutesTotal, secondsTotal);

    if (totalSec <= 0) {
      setPercentComplete(null);
      return;
    }

    const completedSec = Math.max(
      0,
      Math.min(totalSec, totalSec - remainingSec)
    );

    setPercentComplete((completedSec / totalSec) * 100);
  }, [
    hoursRemain,
    minutesRemain,
    secondsRemain,
    hoursTotal,
    minutesTotal,
    secondsTotal,
  ]);

  return (
    <div className="developer-module disable-tap-zoom">
      <h2>Calculate Time Complete</h2>

      <div className="flex flex-col w-full md:!w-2/3 mx-auto mt-1 developer-tools-form gap-8">
        {/* Time Remaining */}
        <div className="flex flex-col w-full gap-2">
          <span className="font-semibold text-green-600">Time Remaining</span>

          <div className="flex items-center gap-2">
            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={hoursOptions}
              placeholder="Hours"
              value={optByValue(hoursOptions, hoursRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setHoursRemain(opt?.value ?? null)}
            />

            <span className="text-lg font-bold">:</span>

            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={minSecOptions}
              placeholder="Minutes"
              value={optByValue(minSecOptions, minutesRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setMinutesRemain(opt?.value ?? null)}
            />

            <span className="text-lg font-bold">:</span>

            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={minSecOptions}
              placeholder="Seconds"
              value={optByValue(minSecOptions, secondsRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setSecondsRemain(opt?.value ?? null)}
            />
          </div>
        </div>

        {/* Total Time */}
        <div className="flex flex-col w-full gap-2">
          <span className="font-semibold text-green-600">Total Time</span>

          <div className="flex items-center gap-2">
            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={hoursOptions}
              placeholder="Hours"
              value={optByValue(hoursOptions, hoursTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setHoursTotal(opt?.value ?? null)}
            />

            <span className="text-lg font-bold">:</span>

            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={minSecOptions}
              placeholder="Minutes"
              value={optByValue(minSecOptions, minutesTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setMinutesTotal(opt?.value ?? null)}
            />

            <span className="text-lg font-bold">:</span>

            <Select
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isSearchable={false}
              options={minSecOptions}
              placeholder="Seconds"
              value={optByValue(minSecOptions, secondsTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setSecondsTotal(opt?.value ?? null)}
            />
          </div>
        </div>

        {typeof percentComplete === "number" && (
          <div className="text-lg">
            <span className="font-semibold text-green-600">
              Percent Complete:
            </span>{" "}
            {percentComplete.toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  );
}
