import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nokian Tanssiasema - Ilmaise itsesi tanssin kautta",
  description: "Nokian Tanssiasema tarjoaa monipuolisia tanssitunteja kaikenikäisille. Tule mukaan balettiin, street tanssiin ja muihin tanssityyleihin Nokialla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
