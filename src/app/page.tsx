'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Komponentit ladataan normaalisti jotta ankkurilinkit toimivat
import ClassOffering from '@/components/ClassOffering';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import Registration from '@/components/Registration';
import Opettajat from '@/components/Opettajat';
import Contact from '@/components/Contact';

export default function Home() {
  // Strukturoitu data sivun osioille
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nokian Tanssiasema",
    "url": "https://nokiantanssiasema.fi",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nokiantanssiasema.fi/#search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": [
      {
        "@type": "WebPageElement",
        "@id": "https://nokiantanssiasema.fi#lajiesittely",
        "name": "Lajiesittely",
        "description": "Tutustu tanssikoulumme monipuolisiin lajeihin"
      },
      {
        "@type": "WebPageElement", 
        "@id": "https://nokiantanssiasema.fi#schedule",
        "name": "Aikataulu",
        "description": "Katso tanssituntien aikataulu"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://nokiantanssiasema.fi#teachers", 
        "name": "Opettajat",
        "description": "Tutustu ammattitaitoisiin opettajiimme"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://nokiantanssiasema.fi#gallery",
        "name": "Galleria", 
        "description": "Kuvia tanssikoulumme toiminnasta"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://nokiantanssiasema.fi#contact",
        "name": "Yhteystiedot",
        "description": "Ota yhteyttä tanssikouluun"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://nokiantanssiasema.fi#register", 
        "name": "Ilmoittautuminen",
        "description": "Ilmoittaudu tanssitunneille"
      }
    ]
  };

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* Sivun strukturoitu data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      
      <PerformanceMonitor />
      <Navigation />
      <Hero />
      
      {/* Esittelyteksti Section */}
      <section className="bg_neutral_primary py-16">
        <div className="max-w-xl mx-auto text-center space-y-8 px-8 min-h-[300px] flex flex-col justify-center">
          <h2 className="heading_h2">Nokian Tanssiasema</h2>
          <p className="paragraph_large leading-relaxed">
on taiteen perusopetusta tarjoava yksityinen tanssikoulu, jonka juuret ulottuvat vuoteen 1963.
Tanssikoulun perustajana toimi Anneli Suova, joka aloitti Balettikoulun toimintansa Nokian Kerholassa ja johti sitä vuoteen 1991 saakka. Tämän jälkeen vastuun otti hänen tyttärensä, Katja Suova, ja opetusta jatkettiin Myllyhaan koulun tiloissa.
Vuonna 2012 koulu muutti nykyisiin tiloihinsa Teollisuusasemalle, ja samalla nimi vaihtui Balettikoulu Katja Suovasta Nokian Tanssiasemaksi.
Vahva tanssiperinne jatkuu nyt jo kolmannessa polvessa, kun myös Katjan tytär, Karita, on liittynyt mukaan opetustyöhön isoäitinsä ja äitinsä jalanjäljissä.          </p>
          
          {/* Sisäiset linkit Googlen sitelinkkejä varten */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#lajiesittely" className="text-accent-primary hover:underline font-medium">
              Tutustu lajeihin
            </a>
            <span className="text-neutral-400">•</span>
            <a href="#teachers" className="text-accent-primary hover:underline font-medium">
              Opettajat
            </a>
            <span className="text-neutral-400">•</span>
            <a href="#schedule" className="text-accent-primary hover:underline font-medium">
              Aikataulu
            </a>
            <span className="text-neutral-400">•</span>
            <a href="/hinnasto" className="text-accent-primary hover:underline font-medium">
              Hinnasto
            </a>
          </div>
        </div>
      </section>

      <ClassOffering />
      <Schedule />
      <Gallery />
      <Registration />
      <Opettajat />
      <Contact />
      
      <Footer />
    </main>
  );
}
