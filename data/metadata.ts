import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "JobTrack",
    template: "%s | JobTrack",
  },
  description:
    "JobTrack is an internal dashboard for managing jobs, tracking pending and completed work, and monitoring payments.",
  applicationName: "JobTrack",
  authors: [{ name: "Cornelius Motanya" }],
  generator: "Next.js",
  keywords: [
    "job tracking",
    "work management",
    "service management",
    "payments tracking",
    "internal dashboard",
    "JobTrack",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Cornelius Motanya",
  publisher: "Cornelius Motanya",

  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "JobTrack",
    description:
      "Manage jobs, track work progress, and monitor payments in one private dashboard.",
    siteName: "JobTrack",
    type: "website",
    locale: "en_US",
  },

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
