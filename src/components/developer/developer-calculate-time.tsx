"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import Select from "react-select";

import { dropdownStyles } from "./dropdown-configuration";
import noDataFound from "../global-components/no-data";

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

  useEffect(() => {
    const remaining = toSeconds(hoursRemain, minutesRemain, secondsRemain);
    const total = toSeconds(hoursTotal, minutesTotal, secondsTotal);

    if (total > 0) {
      const complete = Math.max(0, Math.min(total, total - remaining)); // clamp to [0, total]
      const pct = (complete / total) * 100;
      setPercentComplete(pct);
    } else {
      setPercentComplete(null);
    }
  }, [hoursRemain, minutesRemain, secondsRemain, hoursTotal, minutesTotal, secondsTotal]);

  const optByValue = (opts: SelectOption[], v: number | null) =>
    v === null ? null : opts.find(o => o.value === v) ?? null;

  return (
    <div className="developer-module">
      <h2>Calculate Time Complete</h2>

      <div className="flex flex-col flex-wrap w-full md:!w-2/3 mx-auto mt-1 developer-tools-form gap-8">

        <div className="flex flex-col w-full gap-2">
          <span className="font-semibold text-green-600 pointer-events-none select-none h-full w-full">Time Remaining</span>
          <div className="flex flex-row items-center justify-center gap-2 w-full">
            <Select
              name="hoursRemain"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={hoursOptions}
              placeholder="Hours"
              value={optByValue(hoursOptions, hoursRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setHoursRemain(opt?.value ?? null)}
            />
            <span>:</span>
            <Select
              name="minutesRemain"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={minSecOptions}
              placeholder="Minutes"
              value={optByValue(minSecOptions, minutesRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setMinutesRemain(opt?.value ?? null)}
            />
            <span>:</span>
            <Select
              name="secondsRemain"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={minSecOptions}
              placeholder="Seconds"
              value={optByValue(minSecOptions, secondsRemain)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setSecondsRemain(opt?.value ?? null)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <span className="font-semibold text-green-600 pointer-events-none select-none h-full w-full">Total Time</span>
          <div className="flex flex-row items-center justify-center gap-2 w-full">
            <Select
              name="hoursTotal"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={hoursOptions}
              placeholder="Hours"
              value={optByValue(hoursOptions, hoursTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setHoursTotal(opt?.value ?? null)}
            />
            <span>:</span>
            <Select
              name="minutesTotal"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={minSecOptions}
              placeholder="Minutes"
              value={optByValue(minSecOptions, minutesTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setMinutesTotal(opt?.value ?? null)}
            />
            <span>:</span>
            <Select
              name="secondsTotal"
              className="w-full"
              styles={dropdownStyles}
              isClearable
              isMulti={false}
              options={minSecOptions}
              placeholder="Seconds"
              value={optByValue(minSecOptions, secondsTotal)}
              noOptionsMessage={() => noDataFound("Values")}
              onChange={(opt) => setSecondsTotal(opt?.value ?? null)}
            />
          </div>
        </div>

        {typeof percentComplete === "number" && (
          <span>
            <span className="font-semibold text-green-600">Percent Complete:</span>{" "}
            {percentComplete.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}