import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
                var t = localStorage.getItem('ryos-theme');
                var light = t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches);
                if (light) document.documentElement.classList.add('light');
                document.documentElement.style.background = light ? '#f0f4f8' : '#05070A';
                document.documentElement.style.color = light ? '#0b1220' : '#F5F7FA';
              })();
            `,
          }}
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQ44MMRL0X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQ44MMRL0X');
          `}
        </Script>
      </body>
    </html>
  );
}
