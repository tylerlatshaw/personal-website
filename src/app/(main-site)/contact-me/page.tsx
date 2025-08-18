import { Metadata } from "next";

import ContactForm from "../../../components/contact-me/contact-me-form";

export const metadata: Metadata = {
    title: "Contact Me",
};

export default function Page() {
    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>Contact Me</h1>

                <div className="flex flex-col md:flex-row items-stretch w-full md:mt-6">

                    <div className="flex items-center w-full md:w-1/3 mx-auto lg:mx-8 p-6 text-center">
                        <p className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                            Need to send me a message? Want to collaborate on a project? Hear a fun trivia fact? Send me a&nbsp;
                            <span className="md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-green-500 md:via-pink-600 md:to-purple-500 drop-shadow-sm">message</span>!
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 mx-auto bg-gray-800 md:mx-8 p-6 rounded-lg">
                        <ContactForm />
                    </div>

                </div>

            </div>
        </div>
    </>;
}