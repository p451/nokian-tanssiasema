'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ClassOffering = () => {
  const classes = [
    {
      id: 1,
      title: 'Baletti',
      description: 'Klassista balettia kaikille ikäryhmille. Kehitä voimaa, joustavuutta ja eleganssia.',
      image: '/images/ballet.jpg',
      levels: ['Aloittelijat', 'Jatkotaso', 'Edistyneet'],
      duration: '60 min',
      price: '15€'
    },
    {
      id: 2,
      title: 'Street Dance',
      description: 'Energistä katutyylitanssia nuorille ja aikuisille. Hip-hop, breakdance ja enemmän.',
      image: '/images/street.jpg',
      levels: ['Aloittelijat', 'Jatkotaso'],
      duration: '75 min',
      price: '18€'
    },
    {
      id: 3,
      title: 'Show Dance',
      description: 'Näyttävää tanssiesitystä musikaalien ja showbizin hengessä.',
      image: '/images/show.jpg',
      levels: ['Jatkotaso', 'Edistyneet'],
      duration: '90 min',
      price: '20€'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="classes" className="py-20 bg-offWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
            Tanssitunnit
          </h2>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
            Meillä on monipuolinen valikoima tanssitunteja kaikille ikäryhmille ja taitotasoille. 
            Löydä oma tyylisi ja kehitä taitojasi ammattitaitoisten opettajien kanssa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {classes.map((danceClass) => (
            <motion.div
              key={danceClass.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={danceClass.image}
                  alt={danceClass.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-blush text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                  {danceClass.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-charcoal mb-3 font-playfair">
                  {danceClass.title}
                </h3>
                <p className="text-charcoal/70 mb-4 leading-relaxed">
                  {danceClass.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Kesto:</span>
                    <span className="font-semibold text-charcoal">{danceClass.duration}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-charcoal/60 block mb-2">Tasot:</span>
                    <div className="flex flex-wrap gap-2">
                      {danceClass.levels.map((level, index) => (
                        <span
                          key={index}
                          className="bg-sage/20 text-charcoal text-xs px-2 py-1 rounded-full"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-charcoal text-offWhite py-3 rounded-lg font-semibold hover:bg-charcoal/90 transition-colors duration-200">
                  Ilmoittaudu tunnille
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-charcoal/70 mb-6">
            Haluatko kokeilla useampaa tanssilajia? Kysy meiltä pakettitarjouksista!
          </p>
          <button className="bg-sage text-offWhite px-8 py-3 rounded-full font-semibold hover:bg-sage/90 transition-colors duration-200">
            Ota yhteyttä
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassOffering;