import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { AppShell } from "@/components/shell/app-shell";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marketplace.local"),
  title: {
    default: "Polymarket Copy-Trading Marketplace",
    template: "%s | Polymarket Copy-Trading Marketplace",
  },
  description:
    "Frontend-first product foundation for a copy-trading marketplace with mocked wallet state, trader discovery, and follower operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
