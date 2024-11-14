import type { Metadata } from "next";
import { LanguageProvider } from './contexts/LanguageContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicky Jovanus | Portfolio",
  description: "Portfolio page by Nicky Jovanus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </body>
    </html>
  );
}