export default function VinylCollectionLoading() {

    const placeholder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const loadingContainer = placeholder && placeholder.map((index) => {
        return <div key={index}>
            <div className="flex items-stretch bg-gray-900 shadow-lg drop-shadow-lg rounded p-3 flex flex-1 flex-col justify-between w-100">
                <div className="animate-pulse aspect-square w-full rounded bg-gray-500"></div>
            </div>
            <div className="w-full px-1 pt-2 pb-4 divide-y-2 divide-green-900">
                <div className="flex flex-col w-full space-y-2">
                    <div className="animate-pulse bg-gray-500 w-[90%] mx-auto h-5 rounded"></div>
                    <div className="animate-pulse bg-gray-500 w-[40%] mx-auto h-3 rounded"></div>
                </div>
            </div>
        </div>;
    });

    return <>
        {loadingContainer}
    </>;
}