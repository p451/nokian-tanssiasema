'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Lazy load raskaimmat komponentit main-thread optimointiin
const ClassOffering = lazy(() => import('@/components/ClassOffering'));
const Schedule = lazy(() => import('@/components/Schedule'));
const Gallery = lazy(() => import('@/components/Gallery'));
const Registration = lazy(() => import('@/components/Registration'));
const Opettajat = lazy(() => import('@/components/Opettajat'));
const Contact = lazy(() => import('@/components/Contact'));

// Parannettu loading fallback komponentti
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
  </div>
);

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible] as const;
};

export default function Home() {
  const [classRef, classVisible] = useIntersectionObserver();
  const [scheduleRef, scheduleVisible] = useIntersectionObserver();
  const [galleryRef, galleryVisible] = useIntersectionObserver();
  const [registrationRef, registrationVisible] = useIntersectionObserver();
  const [opettajatRef, opettajatVisible] = useIntersectionObserver();
  const [contactRef, contactVisible] = useIntersectionObserver();

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

      {/* Lazy load below-the-fold sisältö */}
      <div ref={classRef}>
        {classVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <ClassOffering />
          </Suspense>
        )}
      </div>
      
      <div ref={scheduleRef}>
        {scheduleVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <Schedule />
          </Suspense>
        )}
      </div>
      
      <div ref={galleryRef}>
        {galleryVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <Gallery />
          </Suspense>
        )}
      </div>
      
      <div ref={registrationRef}>
        {registrationVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <Registration />
          </Suspense>
        )}
      </div>
      
      <div ref={opettajatRef}>
        {opettajatVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <Opettajat />
          </Suspense>
        )}
      </div>
      
      <div ref={contactRef}>
        {contactVisible && (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
