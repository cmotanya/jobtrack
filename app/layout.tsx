import "./globals.css";
import { sora } from "@/data/font";
import { siteMetadata } from "@/data/metadata";
import AppToast from "./components/Toast/appToast";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sora.variable} antialiased`}>
        <AppToast />
        {children}
      </body>
    </html>
  );
}
