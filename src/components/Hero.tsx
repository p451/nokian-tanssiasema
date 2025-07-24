'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-neutral-inverse/50" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex items-center h-full px-8 sm:px-12 lg:px-16"
      >
        <div className="text-left max-w-4xl">
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
              Kausi alkaa 4.8.2025. Katso lisätietoja{' '}
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