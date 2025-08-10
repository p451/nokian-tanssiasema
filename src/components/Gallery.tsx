'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
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
      src: '/images/show.jpg',
      alt: 'Show Dance esitys',
      title: 'Show Dance',
      description: 'Näyttävä show dance -esitys'
    },
    {
      src: '/images/hiphop.jpg',
      alt: 'Hip Hop tunti',
      title: 'Hip Hop',
      description: 'Energinen hip hop -tunti'
    },
       // Duplicate images for smoother loop
    {
      src: '/images/ballet.jpg',
      alt: 'Balettitunti käynnissä',
      title: 'Baletti',
      description: 'Tyylikäs ja tekninen balettitunti'
    },
    {
      src: '/images/show.jpg',
      alt: 'Show Dance esitys',
      title: 'Show Dance',
      description: 'Näyttävä show dance -esitys'
    },
    {
      src: '/images/hiphop.jpg',
      alt: 'Hip Hop tunti',
      title: 'Hip Hop',
      description: 'Energinen hip hop -tunti'
    },
  
  ];

  return (
    <section id="gallery" className="section_secondary_fullwidth py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading_h2 mb-6">
            Galleria
          </h2>
          <p className="paragraph_large">
            Katso kuvia tunneiltamme ja oppilaidemme esityksistä
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <style jsx>{`
            .smooth-gallery {
              overflow: hidden;
              mask-image: linear-gradient(
                to right,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              );
              -webkit-mask-image: linear-gradient(
                to right,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              );
            }
            .smooth-gallery .swiper-slide {
              transition: opacity 0.3s ease-in-out;
            }
            .smooth-gallery .swiper-slide:first-child,
            .smooth-gallery .swiper-slide:last-child {
              opacity: 0.3;
            }
            .smooth-gallery .swiper-slide:nth-child(2),
            .smooth-gallery .swiper-slide:nth-last-child(2) {
              opacity: 0.6;
            }
          `}</style>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            speed={3000}
            freeMode={true}
            allowTouchMove={false}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 3,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 4,
                centeredSlides: true,
              },
            }}
            className="gallery-swiper smooth-gallery"
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
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    {/* Ei tekstiä kuvien päällä */}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-inverse/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Galleria kuva"
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="btn btn_light_solid absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
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