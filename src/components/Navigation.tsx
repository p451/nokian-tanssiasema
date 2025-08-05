'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#teachers', label: 'Opettajat' },
    { href: '#lajiesittely', label: 'Lajiesittely' },
    { href: '#schedule', label: 'Aikataulu' },
    { href: '#ajankohtaista', label: 'Ajankohtaista' },
    { href: '/hinnasto', label: 'Hinnasto' },
    { href: '#gallery', label: 'Galleria' },
    { href: '#contact', label: 'Yhteystiedot' }
  ];

  // Määritellään tekstiväri taustan perusteella
  const navTextColor = scrolled ? 'text_white' : 'text_charcoal';

  return (
    <>
      {/* Floating Logo */}
      <div className="fixed top-2 left-2 z-50 md:top-24 md:left-12">
        <Link href="/" className="block">
          <Image
            src="/images/logo.png"
            alt="Nokian Tanssiasema"
            width={800}
            height={160}
            className="h-16 w-auto drop-shadow-lg md:h-36"
          />
        </Link>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-neutral-inverse/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${navTextColor} transition-colors duration-200 px-2 py-1 paragraph_default font-medium rounded-lg hover:bg-accent_primary\/10 hover:text_accent_primary`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="#register"
                  className="btn btn_accent_solid btn_small"
                >
                  Ilmoittaudu
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${navTextColor} inline-flex items-center justify-center p-2 rounded-md hover:text_accent_primary focus:outline-none`}
              >
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-neutral-inverse/95 backdrop-blur-sm"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-charcoal block px-3 py-2 font-bold rounded-lg transition-colors duration-200 hover:bg-accent_primary/10 hover:text_accent_primary`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="#register"
                  className="btn btn_accent_solid btn_small block mx-3 mt-4 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Ilmoittaudu
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;