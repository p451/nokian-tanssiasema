'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    { href: '#lajiesittely', label: 'Lajiesittely' },
    { href: '#schedule', label: 'Aikataulu' },
    { href: '#ajankohtaista', label: 'Ajankohtaista' },
    { href: '/hinnasto', label: 'Hinnasto' },
    { href: '#gallery', label: 'Galleria' },
    { href: '#teachers', label: 'Opettajat' },
    { href: '#contact', label: 'Yhteystiedot' }
  ];

  // Määritellään tekstiväri taustan perusteella
  const navTextColor = scrolled ? 'text_white' : 'text_charcoal';

  // Handle smooth scroll with offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 110; // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    } else {
      // For external links, use normal navigation
      window.location.href = href;
    }
  };

  return (
    <>


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
                    onClick={(e) => handleNavClick(e, item.href)}
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
                className={`inline-flex items-center justify-center p-2 rounded-md bg-black text-white hover:text_accent_primary focus:outline-none`}
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
        {isOpen && (
          <div className="md:hidden bg-white transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-charcoal block px-3 py-2 font-bold rounded-lg transition-colors duration-200 hover:bg-accent_primary/10 hover:text_accent_primary`}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsOpen(false);
                  }}
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
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;