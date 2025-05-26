export default function CurrentlyReadingLoading() {

    const placeholder = [1, 2, 3];

    const loadingContainer = placeholder && placeholder.map((index) => {
        return <div key={index}>
            <div className="flex flex-row gap-2">
                <div className="flex items-stretch bg-gray-900 shadow-lg shadow-gray-800/80 rounded p-3 flex flex-1 flex-col justify-between w-1/2">
                    <div className="animate-pulse w-full h-80 rounded rounded bg-gray-500"></div>
                </div>
                <div className="flex flex-col w-1/2 px-1 pt-4 mx-auto text-center gap-12">
                    <div className="space-y-2">
                        <div className="animate-pulse bg-gray-500 w-[90%] mx-auto h-6 rounded"></div>
                        <div className="animate-pulse bg-gray-500 w-[40%] mx-auto h-4 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="animate-pulse bg-gray-500 w-[50%] mx-auto h-4 rounded"></div>
                        <div className="animate-pulse bg-gray-500 w-[100%] mx-auto h-4 rounded"></div>
                    </div>
                </div>
            </div>
        </div>;
    });

    return <>
        {loadingContainer}
    </>;

}