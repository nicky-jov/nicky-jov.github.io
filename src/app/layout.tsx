import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from './contexts/LanguageContext';
import "./globals.css";
import AOSInitializer from "./components/AOSInitializer";

const quattrocento = localFont({
  src: [
    {
      path: './fonts/QuattrocentoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/QuattrocentoSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-quattrocento',
});

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
    <html lang="en" className={quattrocento.variable}>
    <body>
      <AOSInitializer />
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </body>
    </html>
  );
}