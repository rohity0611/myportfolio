import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
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
    default: "Rohit Yadav | Quality Assurance Engineer",
    template: "%s | Rohit Yadav",
  },
  description:
    "Rohit Yadav — Quality Assurance Engineer with expertise in manual testing, API validation, automation engineering, and quality assurance across web and mobile platforms. Based in Howrah, West Bengal.",
  keywords: [
    "Rohit Yadav",
    "QA Engineer",
    "Quality Assurance",
    "Software Testing",
    "Automation Engineer",
    "Manual Testing",
    "API Testing",
    "Selenium",
    "Playwright",
    "SAP S/4HANA",
    "Test Automation",
    "Howrah",
    "West Bengal",
  ],
  authors: [{ name: "Rohit Yadav" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rohit Yadav — QA Engineer",
    title: "Rohit Yadav | Quality Assurance Engineer",
    description:
      "Quality Assurance Engineer with expertise in manual testing, API validation, automation engineering, and quality assurance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Yadav | Quality Assurance Engineer",
    description:
      "Quality Assurance Engineer with expertise in manual testing, API validation, automation engineering, and quality assurance.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else if (theme === 'dark' || !theme) {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
