import Image from "next/image";

export default function MainInfoSection() {

    return (
        <>
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden px-8 md:px-0">
                <h1 className="my-4 text-4xl md:text-5xl leading-tight font-bold text-center md:text-left">
                    Hello! I&apos;m&nbsp;
                    <span className="logo-first-name bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-pink-500 to-purple-500 dark:from-green-600 dark:via-pink-800 dark:to-purple-700">Tyler</span>, a certified technical business analyst and trivia-lover.
                </h1>
                <span className="homepage-subtext mb-8 leading-normal text-xl text-center md:text-left text-green-700 dark:text-green-500">
                    *The certifications are for being a technical business analyst, not a trivia-lover.
                </span>
            </div>

            <div className="w-full xl:w-3/5 p-6 sm:p-12">
                <Image src="/static/homepage/homepage-headshot.webp" width={709} height={421} alt="Tyler Latshaw" className={"homepage-main-image mx-auto w-full md:w-4/5 transform -rotate-3 transition hover:scale-105 duration-700 ease-in-out hover:rotate-3 homepage-main-image"} id="homepage-main-image" priority={true} />
            </div>
        </>
    );
}