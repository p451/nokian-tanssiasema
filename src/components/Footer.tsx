import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Tietoa meistä', href: '#about' },
      { label: 'Opettajat', href: '#teachers' },
      { label: 'Tilat', href: '#facilities' },
      { label: 'Yhteystiedot', href: '#contact' }
    ],
    classes: [
      { label: 'Baletti', href: '#classes' },
      { label: 'Street Dance', href: '#classes' },
      { label: 'Show Dance', href: '#classes' },
      { label: 'Aikataulu', href: '#schedule' }
    ],
    services: [
      { label: 'Ilmoittautuminen', href: '#register' },
      { label: 'Hinnasto', href: '#pricing' },
      { label: 'Yksityistunnit', href: '#private' },
      { label: 'Kurssitodistukset', href: '#certificates' }
    ]
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/nokiantanssiasema',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/nokiantanssiasema',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM15.856 16.294c-2.3 2.3-6.012 2.3-8.312 0-2.3-2.3-2.3-6.012 0-8.312 2.3-2.3 6.012-2.3 8.312 0 2.3 2.3 2.3 6.012 0 8.312z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@nokiantanssiasema',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@nokiantanssiasema',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-charcoal text-offWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-playfair">
              Nokian Tanssiasema
            </h3>
            <p className="text-offWhite/80 mb-6 leading-relaxed">
              Nokian johtava tanssioppilaitos, jossa kasvatamme tanssin iloa 
              ja ammattitaitoa kaikille ikäryhmille. Liity yhteisöömme ja 
              löydä oma tanssityylisi!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-offWhite/80">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Keskuskatu 5, 37100 Nokia</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+358401234567" className="hover:text-blush transition-colors duration-200">
                  +358 40 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@nokiantanssiasema.fi" className="hover:text-blush transition-colors duration-200">
                  info@nokiantanssiasema.fi
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">
              Yritys
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-offWhite/80 hover:text-blush transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Class Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">
              Tunnit
            </h4>
            <ul className="space-y-2">
              {footerLinks.classes.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-offWhite/80 hover:text-blush transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">
              Palvelut
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-offWhite/80 hover:text-blush transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-offWhite/20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 font-playfair">
                Tilaa uutiskirje
              </h4>
              <p className="text-offWhite/80 text-sm">
                Saat tiedon uusista tunneista, tapahtumista ja tarjouksista!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Sähköpostiosoitteesi"
                className="flex-1 px-4 py-2 rounded-lg bg-offWhite/10 border border-offWhite/20 text-offWhite placeholder-offWhite/60 focus:outline-none focus:ring-2 focus:ring-blush"
              />
              <button className="bg-blush text-charcoal px-6 py-2 rounded-lg font-medium hover:bg-blush/90 transition-colors duration-200 whitespace-nowrap">
                Tilaa
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-offWhite/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-offWhite/80">
              © {currentYear} Nokian Tanssiasema. Kaikki oikeudet pidätetään.
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-offWhite/10 rounded-lg flex items-center justify-center text-offWhite hover:bg-blush hover:text-charcoal transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-4 text-sm">
              <Link
                href="/privacy"
                className="text-offWhite/80 hover:text-blush transition-colors duration-200"
              >
                Tietosuoja
              </Link>
              <Link
                href="/terms"
                className="text-offWhite/80 hover:text-blush transition-colors duration-200"
              >
                Käyttöehdot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;