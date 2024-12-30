import type { Metadata } from "next";
import { LanguageProvider } from './contexts/LanguageContext';
import "./globals.css";
import AOSInitializer from "./components/AOSInitializer";

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
      <AOSInitializer />
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </body>
    </html>
  );
}