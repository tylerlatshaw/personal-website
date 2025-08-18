import { GoogleAnalytics } from "@next/third-parties/google";
import * as Sentry from "@sentry/nextjs";

import type { Metadata } from "next";

const description = "Tyler Latshaw is a professionally-certified Scrum Master with years of experience in project management, web design, leadership, and mentoring.";

const GA_ID = process.env.GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://tylerlatshaw.com/"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Tyler Latshaw",
    default: "Tyler Latshaw | Senior Technical Business Analyst and Scrum Master",
  },
  description: description,
  generator: "Next.js",
  applicationName: "Tyler Latshaw",
  keywords: ["Tyler Latshaw", "Scrum Master", "Technical Business Analyst"],
  authors: [{ name: "Tyler Latshaw", url: "https://tylerlatshaw.com/" }],
  creator: "Tyler J. Latshaw",
  publisher: "Tyler J. Latshaw",
  openGraph: {
    title: "Tyler Latshaw | Senior Technical Business Analyst and Scrum Master",
    description: description,
    url: "https://tylerlatshaw.com/",
    siteName: "Tyler Latshaw",
    images: [{
      url: "https://tylerlatshaw.com/static/tyler-latshaw-meta-cover.png"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Latshaw | Senior Technical Business Analyst and Scrum Master",
    description: description,
    creator: "@tylerlatshaw",
    images: ["tps://tylerlatshaw.com/static/tyler-latshaw-meta-cover.png"]
  },
  other: {
    ...Sentry.getTraceData()
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      {children}
      <GoogleAnalytics gaId={GA_ID!} />
    </html>
  );
}