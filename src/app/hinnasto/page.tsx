'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hinnasto = () => {
  const weeklyPricing = [
    { duration: '30min', price: '44€' },
    { duration: '45min', price: '51€' },
    { duration: '1h', price: '56€' },
    { duration: '1,15h', price: '62€' },
    { duration: '1,30h', price: '76,50€' },
    { duration: '2h', price: '79,50€' },
    { duration: '2,30h', price: '87,00€' },
    { duration: '3h', price: '96,00€' },
    { duration: '4h', price: '107,50€' },
    { duration: '5h', price: '120€' },
    { duration: '6h', price: '129€' },
    { duration: 'Rajaton', price: '140€' }
  ];

  const singleClassPricing = [
    { sessions: '1 krt', price: '17€', duration: '60min' },
    { sessions: '1 krt', price: '21€', duration: '75min' }
  ];

  const cardPricing = [
    { sessions: '5 krt', price: '75€' },
    { sessions: '10 krt', price: '103€' },
    { sessions: '15 krt', price: '127€' }
  ];

  return (
    <div className="min-h-screen pt-24">
      <section className="section_primary_default_fullwidth py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading_h1 mb-6">
              Hinnasto Syksy 2025
            </h1>
            <p className="paragraph_large text_charcoal/70">
              Katso kaikki hinnat viikoittaisille tunneille ja tanssikorteillemme
            </p>
          </motion.div>

          {/* Weekly Classes Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="heading_h2 mb-8 text-center">
              Viikoittaiset tunnit
            </h2>
            <div className="bg-neutral-secondary rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="heading_h6 text-center py-3 bg-accent-primary/10 rounded-lg">
                  Tunnin pituus (h/vko)
                </div>
                <div className="heading_h6 text-center py-3 bg-accent-primary/10 rounded-lg">
                  Maksu/kk
                </div>
              </div>
              <div className="space-y-3">
                {weeklyPricing.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="grid grid-cols-2 gap-4 py-4 border-b border-charcoal/10 last:border-b-0"
                  >
                    <div className="paragraph_default text-center font-medium">
                      {item.duration}
                    </div>
                    <div className="paragraph_default text-center font-bold text-accent-primary">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dance Card Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="heading_h2 mb-8 text-center">
              Tanssikortti
            </h2>
            
            <div className="bg-neutral-secondary rounded-2xl p-8">
              <div className="space-y-3 mb-8">
                {singleClassPricing.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex justify-between items-center py-4 border-b border-charcoal/10"
                  >
                    <div className="paragraph_default font-medium">
                      {item.sessions} ({item.duration})
                    </div>
                    <div className="paragraph_default font-bold text-accent-primary">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                {cardPricing.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex justify-between items-center py-4 border-b border-charcoal/10 last:border-b-0"
                  >
                    <div className="paragraph_default font-medium">
                      {item.sessions}
                    </div>
                    <div className="paragraph_default font-bold text-accent-primary">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="p-4 bg-accent-primary/10 rounded-lg"
              >
                <p className="paragraph_small text-center text_charcoal">
                  Kortti on henkilökohtainen ja voimassa 3kk ostopäivästä
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center space-y-4"
          >
            <Link
              href="/terms-of-use"
              className="btn btn_primary_solid"
            >
              Lue käyttöehdot
            </Link>
            <div>
              <Link
                href="/"
                className="btn btn_secondary_outline"
              >
                Palaa etusivulle
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hinnasto;