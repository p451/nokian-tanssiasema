import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Tietoa meistä', href: '#about' },
      { label: 'Opettajat', href: '#teachers' },
      { label: 'Galleria', href: '#gallery' },
      { label: 'Yhteystiedot', href: '#contact' }
    ],
    classes: [
      { label: 'Lajiesittely', href: '#lajiesittely' },
      { label: 'Aikataulu', href: '#schedule' },
      { label: 'Kokeilutunnit', href: '#register' },
      { label: 'Kurssitiedot', href: '#lajiesittely' }
    ],
    services: [
      { label: 'Ilmoittautuminen', href: '#register' },
      { label: 'Yksityistunnit', href: '#contact' },
      { label: 'Ryhmätunnit', href: '#lajiesittely' },
      { label: 'Esiintymisryhmät', href: '#gallery' }
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
    }
  ];

  return (
    <footer className="section_secondary_fullwidth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="heading_h3 mb-4">
              Nokian Tanssiasema
            </h3>
            <p className="paragraph_default text_charcoal mb-6 leading-relaxed">
              Nokian johtava tanssioppilaitos vuodesta 2010. Tarjoamme laadukasta 
              tanssinopetusta kaikenikäisille aloittelijoista kilpatasolla tanssiviin. 
              Meiltä löydät klassisen baletin, modernin tanssin, street dancen ja paljon muuta!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 paragraph_small text_charcoal">
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
                <a href="tel:+358401234567" className="hover:text_accent_primary transition-colors duration-200">
                  +358 40 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@nokiantanssiasema.fi" className="hover:text_accent_primary transition-colors duration-200">
                  info@nokiantanssiasema.fi
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="heading_h6 mb-4">
              Yritys
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="paragraph_small text_charcoal/70 hover:text_accent_primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Class Links */}
          <div>
            <h4 className="heading_h6 mb-4">
              Tunnit
            </h4>
            <ul className="space-y-2">
              {footerLinks.classes.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="paragraph_small text_charcoal/70 hover:text_accent_primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="heading_h6 mb-4">
              Palvelut
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="paragraph_small text_charcoal/70 hover:text_accent_primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-charcoal/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="paragraph_small text_charcoal/70">
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
                  className="w-8 h-8 bg-charcoal/10 rounded-lg flex items-center justify-center text_charcoal hover:bg-accent-primary hover:text_white transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-4">
              <Link
                href="/privacy-policy"
                className="paragraph_small text_charcoal/70 hover:text_accent_primary transition-colors duration-200"
              >
                Tietosuojakäytännöt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;