
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden">
      {/* Staattinen logo headerin yläpuolella */}
      <div
        className="absolute top-4 left-4 z-30 flex items-start pointer-events-none select-none"
      >
        <Image
          src="/images/optimized/logo.avif"
          alt="Nokian Tanssiasema"
          width={200}
          height={40}
          priority
          className="h-10 w-auto md:h-16 max-w-[40vw] md:max-w-[200px] drop-shadow-lg opacity-90"
        />
      </div>

      {/* Parallax Background - optimoitu LCP:lle */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        {/* Preload kriittinen hero-kuva - optimoitu LCP:lle */}
        <Image
          src="/images/optimized/hero.avif?v=20250810-2"
          alt="Nokian Tanssiasema Hero"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-neutral-inverse/50" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex items-center h-full px-8 sm:px-12 lg:px-16"
      >
        <div className="text-left max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.2 }}
            className="font-heading text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '600',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Jokainen askel kertoo 
            tarinan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1 }}
            className="text-white mb-8 font-body"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: '300',
              lineHeight: '1.6',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
              maxWidth: '700px'
            }}
          >
            Tule mukaan yhteisöön, jossa jokainen saa tanssia omalla tavallaan. Meillä opitaan yhdessä – lempeässä ilmapiirissä, jossa saa olla keskeneräinen ja kasvaa rauhassa. Olitpa vasta alussa tai jo pidemmällä, löydät paikkasi joukosta. Aloita oma tanssipolkusi silloin kun se sinulle sopii.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#lajiesittely"
              className="btn btn_accent_solid btn_large"
            >
              Tutustu Lajitarjontaan
            </a>
            <a
              href="#register"
              className="btn btn_light_outlined btn_large"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('register');
                if (element) {
                  // Eri offset mobiilille ja desktopille
                  const isMobile = window.innerWidth < 768;
                  const headerOffset = isMobile ? 20 : 80; // Pienempi offset mobiilille
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Ilmoittaudu
            </a>
          </motion.div>

          {/* Kausi alkaa -info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-6"
          >
            <span className="text-white text-lg font-body" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Kausi alkaa 11.8.2025. Katso lisätietoja{' '}
              <a
                href="#ajankohtaista"
                className="underline text-accent_primary hover:text-accent_primary/80"
                style={{ fontStyle: 'italic' }}
              >
                täältä
              </a>
              .
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;