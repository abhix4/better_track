import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "@/lib/SessionProviderWrapper";
import { QueryClientWrapperProvider } from "@/lib/QueryClientProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Track better",
  description: "To track your fav oss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen `}
      >
      <QueryClientWrapperProvider>
      <SessionProviderWrapper>
      {children}
      <Toaster/>
      </SessionProviderWrapper>
      </QueryClientWrapperProvider>
      </body>
    </html>
  );
}
