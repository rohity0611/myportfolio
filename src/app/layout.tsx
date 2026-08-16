import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rohit Yadav | QA Engineer",
    template: "%s | Rohit Yadav",
  },
  description:
    "Rohit Yadav — QA Engineer. Building, testing, and automating reliable digital experiences.",
  keywords: [
    "Rohit Yadav",
    "QA Engineer",
    "Quality Assurance",
    "Software Testing",
    "Automation Engineer",
    "Java",
    "Selenium",
    "Playwright",
    "SAP S/4HANA",
    "Howrah",
    "West Bengal",
  ],
  authors: [{ name: "Rohit Yadav" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rohit Yadav — QA Engineer",
    title: "Rohit Yadav | QA Engineer",
    description: "QA Engineer. Building, testing, and automating reliable digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Yadav | QA Engineer",
    description: "QA Engineer. Building, testing, and automating reliable digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.background = '#05070A';
                document.documentElement.style.color = '#F5F7FA';
              })();
            `,
          }}
        />
      </head>
      <body style={{ background: "#05070A" }}>{children}</body>
    </html>
  );
}
