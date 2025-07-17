'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-charcoal/50" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-offWhite mb-6 font-playfair"
          >
            Nokian Tanssiasema
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-offWhite/90 mb-8 font-montserrat"
          >
            Ilmaise itsesi tanssin kautta
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#classes"
              className="bg-sage text-offWhite px-8 py-4 rounded-lg font-semibold hover:bg-sage/90 transition-all duration-300 transform hover:scale-105"
            >
              Tutustu tuntiimme
            </a>
            <a
              href="#register"
              className="border-2 border-offWhite text-offWhite px-8 py-4 rounded-lg font-semibold hover:bg-offWhite hover:text-charcoal transition-all duration-300 transform hover:scale-105"
            >
              Ilmoittaudu
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-offWhite"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-montserrat">Vieritä alas</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-offWhite rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-offWhite rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;