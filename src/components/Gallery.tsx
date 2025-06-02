'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: '/images/ballet.jpg',
      alt: 'Balettitunti käynnissä',
      category: 'Baletti'
    },
    {
      src: '/images/street.jpg',
      alt: 'Street dance -ryhmä',
      category: 'Street Dance'
    },
    {
      src: '/images/show.jpg',
      alt: 'Show dance -esitys',
      category: 'Show Dance'
    },
    {
      src: '/images/hero.jpg',
      alt: 'Tanssijat lavalla',
      category: 'Esitykset'
    },
    // Adding some placeholder images for a fuller gallery
    {
      src: '/images/ballet.jpg',
      alt: 'Balettiesitys',
      category: 'Baletti'
    },
    {
      src: '/images/street.jpg',
      alt: 'Hip-hop workshop',
      category: 'Street Dance'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-sage/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
            Galleria
          </h2>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
            Katso kuvia tunneillamme ja esityksistämme. Meillä on upea yhteisö 
            tanssijoita, jotka kehittyvät jatkuvasti.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300" />
                
                {/* Overlay content */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <span className="inline-block bg-blush text-charcoal px-2 py-1 rounded text-sm font-medium mb-2">
                      {image.category}
                    </span>
                    <p className="text-sm">{image.alt}</p>
                  </div>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram feed section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-charcoal mb-4 font-playfair">
            Seuraa meitä Instagramissa
          </h3>
          <p className="text-charcoal/70 mb-6">
            Löydä lisää kuvia ja videoita päivittäisestä toiminnastamme
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            @nokiantanssiasema
          </button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Suurennettu kuva"
              width={800}
              height={600}
              className="object-contain max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;