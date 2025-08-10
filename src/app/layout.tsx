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
        {/* Inline kriittinen CSS nopeampaa renderöintiä varten */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --accent-primary: #D4A574;
              --accent-primary-dark: #8B7355;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              color: #665A4E;
              background: #FAF8F5;
              line-height: 1.6;
              margin: 0;
              overflow-x: hidden;
            }
            .hero-section {
              min-height: 100vh;
              position: relative;
            }
          `
        }} />
        
        {/* Font preloading optimointi - tärkeimmät ensin */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Optimoitu font loading vain tärkeimmät painot */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;500;600&family=Manrope:wght@300;400;500&display=swap" 
          rel="stylesheet"
        />
        
        {/* Kriittisten kuvien preloading LCP-optimointiin */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/optimized/hero.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/images/optimized/logo.webp"
          type="image/webp"
        />
        
        {/* DNS prefetch optimointiin */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
