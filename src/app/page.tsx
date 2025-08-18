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
  return (
    <main className="overflow-x-hidden w-full max-w-full">
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
