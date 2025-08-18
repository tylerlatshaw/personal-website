import "../(coming-soon)/components/coming-soon.css";
import "./../globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <body className="leading-normal tracking-normal text-white bg-cover bg-fixed min-h-screen" suppressHydrationWarning={true}>
            <div className="leading-normal tracking-normal text-white bg-cover bg-fixed min-h-screen" style={{ backgroundColor: "background-color: rgb(17, 24, 39)", backgroundImage: "radial-gradient(75% 75% at 50% 50%, #253745FF 0%, #0B111AFF 100%)" }}>
                {children}
            </div>
        </body>
    );
}