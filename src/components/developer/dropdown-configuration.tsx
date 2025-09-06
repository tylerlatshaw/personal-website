export type DevItems = {
    title: string,
    content: JSX.Element,
}

export type DropdownItem = {
    value: number | undefined,
    label: string | undefined,
}

export const inputStyles = "peer h-full w-full border-b border-gray-500 dark:border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500";

export const inputLabelStyles = "font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100";

export const dropdownLabelStyles = "flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600";

export const selectClassNames = {
    control: ({ isFocused }: any) =>
        [
            "min-h-[43px] rounded-lg border",
            "bg-gray-100 border-gray-300 hover:border-green-500",
            isFocused ? "border-green-500 ring-0" : "",
            // dark
            "dark:bg-gray-700 dark:border-gray-600 dark:hover:border-green-400",
            isFocused ? "dark:border-green-400" : "",
        ].join(" "),
    menu: () => "bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden",
    option: ({ isFocused, isSelected }: any) =>
        [
            "text-gray-900 dark:text-gray-200",
            isSelected
                ? "!bg-green-500 dark:!bg-green-500 !text-white !border-green-500 dark:!border-green-500"
                : isFocused
                    ? "!bg-green-500 dark:!bg-green-500 !text-white !border-green-500 dark:!border-green-500"
                    : "bg-transparent",
            "cursor-pointer",
        ].join(" "),
    singleValue: () => "text-gray-900 dark:text-gray-100",
    input: () => "text-gray-900 dark:text-gray-100",
    placeholder: () => "text-gray-900 dark:text-gray-300 pl-1",
    multiValue: () => "bg-gray-200 dark:bg-gray-600 text-sm mr-1 rounded-md",
    multiValueLabel: () => "text-gray-900 dark:text-gray-100 px-1",
    multiValueRemove: () => "text-gray-900 dark:text-gray-100 px-1",
    indicatorsContainer: () => "text-gray-300 dark:text-gray-300",
    clearIndicator: () => "hover:text-green-600 dark:hover:text-green-400",
    dropdownIndicator: () => "hover:text-green-600 dark:hover:text-green-400",
    noOptionsMessage: () => "text-gray-700 dark:text-gray-100",
    loadingMessage: () => "text-gray-700 dark:text-gray-100",
};
