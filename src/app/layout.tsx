import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nokian Tanssiasema - Jokainen askel kertoo tarinan",
  description: "Nokian Tanssiasema tarjoaa monipuolisia tanssitunteja kaikenikäisille. Tule mukaan balettiin, street tanssiin ja muihin tanssityyleihin Nokialla.",
  keywords: "tanssikoulu, baletti, nykytanssi, Nokia, tanssitunnit, opettajat, aikataulu, hinnasto",
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/logo.png',
        color: '#D4A574'
      }
    ]
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Nokian Tanssiasema - Jokainen askel kertoo tarinan",
    description: "Nokian Tanssiasema tarjoaa monipuolisia tanssitunteja kaikenikäisille. Tule mukaan balettiin, street tanssiin ja muihin tanssityyleihin Nokialla.",
    url: "https://nokiantanssiasema.fi",
    siteName: "Nokian Tanssiasema",
    images: [
      {
        url: "https://nokiantanssiasema.fi/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Nokian Tanssiasema"
      }
    ],
    locale: "fi_FI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nokian Tanssiasema - Jokainen askel kertoo tarinan",
    description: "Nokian Tanssiasema tarjoaa monipuolisia tanssitunteja kaikenikäisille.",
    images: ["https://nokiantanssiasema.fi/images/hero.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K45SZJ6Q');`
          }}
        />
        {/* End Google Tag Manager */}
        
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
        
        {/* Strukturoitu data Googlea varten */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nokian Tanssiasema",
              "url": "https://nokiantanssiasema.fi",
              "logo": "https://nokiantanssiasema.fi/images/logo.png",
              "description": "Nokian Tanssiasema tarjoaa monipuolisia tanssitunteja kaikenikäisille. Tule mukaan balettiin, street tanssiin ja muihin tanssityyleihin Nokialla.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nokia",
                "addressCountry": "FI"
              },
              "sameAs": [
                "https://www.facebook.com/nokiantanssiasema",
                "https://www.instagram.com/nokiantanssiasema"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Tanssitunnit",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Baletti",
                      "url": "https://nokiantanssiasema.fi#lajiesittely"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Nykytanssi",
                      "url": "https://nokiantanssiasema.fi#lajiesittely"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K45SZJ6Q"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
      </body>
    </html>
  );
}
