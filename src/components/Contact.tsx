'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../utils/formValidation';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form data:', data);
    setIsSubmitted(true);
    reset();
    // Here you would typically send the data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Osoite',
      content: 'Keskuskatu 5, 37100 Nokia',
      link: 'https://maps.google.com/?q=Keskuskatu+5,+37100+Nokia'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Puhelin',
      content: '+358 40 123 4567',
      link: 'tel:+358401234567'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Sähköposti',
      content: 'info@nokiantanssiasema.fi',
      link: 'mailto:info@nokiantanssiasema.fi'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Aukioloajat',
      content: 'Ma-Pe 15:00-21:00\nLa 10:00-15:00',
      link: null
    }
  ];

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
    <section id="contact" className="section_primary_default_fullwidth py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading_h2 mb-6">
            Ota yhteyttä
          </h2>
          <p className="paragraph_large">
            Onko sinulla kysymyksiä tunneistamme tai haluatko tietää lisää? 
            Otamme mielellämme vastaan viestesi!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="heading_h3 mb-8">
              Yhteystiedot
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center">
                    <div className="text-charcoal">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="heading_h6 mb-1">
                      {item.title}
                    </h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="paragraph_default text-charcoal/70 hover:text-accent-primary transition-colors duration-200 whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="paragraph_default text-charcoal/70 whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="heading_h6 mb-4">
                Seuraa meitä sosiaalisessa mediassa
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-charcoal/10 rounded-lg flex items-center justify-center text-charcoal hover:bg-accent-primary hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="bg-neutral-primary/10 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">📍</div>
                <p className="paragraph_default text-white/80">
                  Sijaitsemme Nokian keskustassa, helposti saavutettavissa 
                  julkisilla kulkuvälineillä ja omalla autolla.
                </p>
                <a
                  href="https://maps.google.com/?q=Keskuskatu+5,+37100+Nokia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn_accent_solid mt-4"
                >
                  Avaa kartta
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-neutral-primary rounded-2xl p-8">
              <h3 className="heading_h3 mb-6">
                Lähetä viesti
              </h3>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-700 p-4 rounded-lg mb-6"
                >
                  Kiitos viestistäsi! Vastaamme sinulle pian.
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="paragraph_small font-medium text-charcoal mb-2 block">
                    Nimi *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="input-field"
                    placeholder="Anna nimesi"
                  />
                  {errors.name && (
                    <p className="text-red-500 paragraph_small mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="paragraph_small font-medium text-charcoal mb-2 block">
                    Sähköposti *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="input-field"
                    placeholder="anna.virtanen@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 paragraph_small mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="paragraph_small font-medium text-charcoal mb-2 block">
                    Aihe *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="input-field"
                    placeholder="Mistä haluat kysyä?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 paragraph_small mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="paragraph_small font-medium text-charcoal mb-2 block">
                    Viesti *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="input-field"
                    placeholder="Kirjoita viestisi tähän..."
                  />
                  {errors.message && (
                    <p className="text-red-500 paragraph_small mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn_primary_solid w-full"
                >
                  Lähetä viesti
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;