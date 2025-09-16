import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ToastProvider } from "@/components/ui/toast";
import Providers from "@/contexts/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfoliai.app"),
  title: {
    default: "PortfoliAI - AI-Powered Investment Assistant",
    template: "%s | PortfoliAI",
  },
  description:
    "Your conversational AI investment advisor for personalized portfolio management and investment insights.",
  applicationName: "PortfoliAI",
  keywords: [
    "investing",
    "portfolio",
    "AI advisor",
    "risk assessment",
    "personal finance",
  ],
  openGraph: {
    title: "PortfoliAI",
    description:
      "Your conversational AI investment advisor for personalized portfolio management and investment insights.",
    url: "https://portfoliai.app",
    siteName: "PortfoliAI",
    images: [{ url: "/globe.svg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfoliAI",
    description:
      "Your conversational AI investment advisor for personalized portfolio management and investment insights.",
    images: ["/globe.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ToastProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
