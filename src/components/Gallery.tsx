'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: '/images/ballet.jpg',
      alt: 'Balettitunti käynnissä',
      title: 'Baletti',
      description: 'Tyylikäs ja tekninen balettitunti'
    },
    {
      src: '/images/street.jpg',
      alt: 'Street Dance energia',
      title: 'Street Dance',
      description: 'Energinen ja moderni street dance'
    },
    {
      src: '/images/show.jpg',
      alt: 'Show Dance esitys',
      title: 'Show Dance',
      description: 'Näyttävä show dance -esitys'
    },
    {
      src: '/images/hero.jpg',
      alt: 'Tanssijat lavalla',
      title: 'Esiintyminen',
      description: 'Oppilaidemme loistavia esityksiä'
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-offWhite">
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
            Katso kuvia tunneiltamme ja oppilaidemme esityksistä
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="gallery-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-offWhite">
                        <h3 className="text-xl font-bold mb-2 font-playfair">{image.title}</h3>
                        <p className="text-sm">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Grid Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-video relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-offWhite">
                    <h3 className="text-xl font-bold mb-2 font-playfair">{image.title}</h3>
                    <p className="text-sm">{image.description}</p>
                    <div className="mt-4 text-2xl">🔍</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Galleria kuva"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-charcoal/70 text-offWhite w-10 h-10 rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;