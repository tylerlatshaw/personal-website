import "./../globals.css";

import Footer from "../../components/global-components/footer";
import Navigation from "../../components/global-components/navigation-container";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <body className="leading-normal tracking-normal text-black dark:text-white bg-cover bg-fixed min-h-screen" suppressHydrationWarning={true}>
                <main>
                    <Navigation />
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </body>
        </>
    );
}