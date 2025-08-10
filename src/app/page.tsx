import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

// Lazy load raskaimmat komponentit main-thread optimointiin
const ClassOffering = lazy(() => import('@/components/ClassOffering'));
const Schedule = lazy(() => import('@/components/Schedule'));
const Gallery = lazy(() => import('@/components/Gallery'));
const Registration = lazy(() => import('@/components/Registration'));
const Opettajat = lazy(() => import('@/components/Opettajat'));
const Contact = lazy(() => import('@/components/Contact'));

// Loading fallback komponentti
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
  </div>
);

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
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

      {/* Lazy load below-the-fold sisältö */}
      <Suspense fallback={<LoadingSpinner />}>
        <ClassOffering />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Schedule />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Registration />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Opettajat />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>
      
      <Footer />
    </main>
  );
}
