'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

const classes = [
  {
	id: 1,
	title: 'Lastentanssi',
	description:
	  'Lastentanssissa lapset pääsevät tutustumaan tanssin maailmaan hauskojen ja monipuolisten harjoitusten avulla. Tunneilla kehitetään kehonhallintaa, rytmitajua ja luovuutta, sekä opitaan toimimaan sekä yksilönä että osana ryhmää. Baletin perusteisiin tutustutaan leikkien avulla. Tavoitteena on innostaa lapsia tanssin pariin ja antaa hyvät valmiudet jatko-opintoihin.',
	image: '/images/optimized/lasten.webp',
	imageFallback: '/images/lasten.jpg',
	ageGroup: '3-5 vuotta',
	level: 'Aloittelijat',
	duration: '45 min',
  },
  {
	id: 2,
	title: 'Baletti',
	description:
	  'Baletti on klassinen tanssilaji, jossa yhdistyvät tarkka tekniikka, kehonhallinta ja taiteellinen ilmaisu. Harjoittelu kehittää muun muassa linjauksia, tasapainoa ja liikkuvuutta. Baletti luo vahvan pohjan kaikelle tanssille ja sopii kaikenikäisille – niin aloittelijoille kuin tavoitteellisesti eteneville',
	image: '/images/optimized/ballet.webp',
	imageFallback: '/images/ballet.jpg',
	ageGroup: '6-8 vuotta',
	level: 'Alkeet',
	duration: '60 min',
  },
  {
	id: 3,
	title: 'Showtanssi',
	description:
	  'Showtanssi yhdistää parhaita puolia jazz-tanssista, nykytanssista ja baletista. Tunneilla kehitetään tekniikkaa, ilmaisua sekä tanssillista energiaa monipuolisten tanssisarjojen avulla. Tunneilla yhdistyvät hyvä energia, keskittyminen ja tanssin ilo.',
	image: '/images/optimized/show.webp',
	imageFallback: '/images/show.jpg',
	ageGroup: '8+ vuotta',
	level: 'Kaikki tasot',
	duration: '60 min',
  },
  {
	id: 4,
	title: 'Nykytanssi',
	description:
	  'Nykytanssin tunneilla painotetaan oman tanssillisen ilmaisun löytämistä improvisaation sekä vaihtelevien tanssisarjojen avulla. Release- ja lattiatekniikan kautta kehitetään sulavuutta ja ilmaisua. Tunneilla yhdistetään modernin tanssin tekniikoita ja vaikutteita muista tanssilajeista, mikä tekee tunneista monipuolisia ja innostavia.',
	image: '/images/optimized/nyky.webp',
	imageFallback: '/images/nyky.jpg',
	ageGroup: '12+ vuotta',
	level: 'Kaikki tasot',
	duration: '75 min',
  },
  {
	id: 5,
	title: 'Dance Mix',
	description:
	  'Dance mix -tunnit tarjoavat monipuolisen kattauksen eri tanssilajeja, kuten musikaalitanssia, contemporary jazzia ja street-tanssia. Tunti alkaa lämmittelyllä ja tekniikkaosiolla, jonka jälkeen keskitytään erilaisiin koreografioihin.',
	image: '/images/optimized/dancemix.webp',
	imageFallback: '/images/dancemix.jpg',
	ageGroup: '15+ vuotta',
	level: 'Kaikki tasot',
	duration: '90 min',
  },
  {
	id: 6,
	title: 'Commercial Dance',
	description:
	  'Commercial dance yhdistää elementtejä jazzista, showsta ja katutanssista, inspiroituen musiikkivideoista ja musikaaleista. Tunneilla harjoitellaan ilmaisullisia ja tyylikkäitä koreografioita, jotka kehittävät rytmitajua, kehonhallintaa ja esiintymisvarmuutta.',
	image: '/images/optimized/commercial.webp',
	imageFallback: '/images/commercial.jpg',
	ageGroup: '13+ vuotta',
	level: 'Keskitaso+',
	duration: '75 min',
  },
  {
	id: 7,
	title: 'HipHop',
	description:
	  'Hip hop on katutanssilaji, jossa korostuvat rytmi, liikkeen dynamiikka ja yksilöllinen tyyli. Tunneilla harjoitellaan perusaskeleita, koordinaatiota ja kehonhallintaa sekä rohkaistaan oman liikekielen kehittämiseen. Laji sopii kaikille, jotka haluavat tutustua tanssiin rennossa, mutta tavoitteellisessa ilmapiirissä.',
	image: '/images/optimized/hiphop.webp',
	imageFallback: '/images/hiphop.jpg',
	ageGroup: '10+ vuotta',
	level: 'Kaikki tasot',
	duration: '60 min',
  },
  {
	id: 8,
	title: 'Breakdance',
	description:
	  'Breakdance on vauhdikas ja akrobaattinen katutanssilaji, jossa opetellaan lattia- ja ylätason jalkatyöskentelyä, näyttäviä freezejä sekä akrobatiaa. Freestyle-osioissa tanssijat pääsevät kehittämään omaa persoonallista liikekieltään.',
	image: '/images/optimized/break.webp',
	imageFallback: '/images/break.jpg',
	ageGroup: '8+ vuotta',
	level: 'Aloittelijat',
	duration: '60 min',
  },
  {
	id: 9,
	title: 'Heels',
	description:
	  'Heels-tunnilla tanssitaan korkokengissä ja keskitytään erityisesti kehonhallintaan, linjauksiin ja feminiiniseen ilmaisuun. Tunti kehittää tasapainoa, ryhtiä ja esiintymisvarmuutta. Sopii kaikille, jotka haluavat haastaa itseään ja löytää uudenlaista itsevarmuutta tanssin kautta.',
	image: '/images/optimized/heels.webp',
	imageFallback: '/images/heels.jpg',
	ageGroup: '16+ vuotta',
	level: 'Avoin taso',
	duration: '60 min',
  },
];


export default function ClassOffering() {

	return (
	   <section
		   id="lajiesittely"
		   className="section_secondary py-20"
		   style={{ scrollMarginTop: '110px' }}
	   >
			{/* Strukturoitu data lajiesittelylle */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPageElement",
						"@id": "https://nokiantanssiasema.fi#lajiesittely",
						"name": "Lajiesittely",
						"description": "Tutustu tanssikoulumme monipuolisiin lajeihin",
						"url": "https://nokiantanssiasema.fi#lajiesittely"
					})
				}}
			/>
			
			<div className="container mx-auto px-6 text-center">
				<div className="text-center mb-16">
					<h2 className="heading_h2 mb-6">Lajiesittely</h2>
		  {/* Intro paragraph removed as requested */}
				</div>

				<div className="relative">
		  <Swiper
			modules={[Navigation, Pagination]}
			spaceBetween={30}
			slidesPerView={1}
			navigation={true}
			pagination={{
			  clickable: true,
			  bulletClass: 'swiper-pagination-bullet opacity-60',
			  bulletActiveClass:
				'swiper-pagination-bullet-active opacity-100',
			}}
			breakpoints={{
			  640: {
				slidesPerView: 1,
			  },
			  768: {
				slidesPerView: 2,
			  },
			  1024: {
				slidesPerView: 3,
			  },
			}}
			className="classes-swiper !pb-12 [&_.swiper-button-next]:opacity-30 [&_.swiper-button-prev]:opacity-30 [&_.swiper-button-next]:hover:opacity-60 [&_.swiper-button-prev]:hover:opacity-60 [&_.swiper-button-next]:transition-opacity [&_.swiper-button-prev]:transition-opacity [&_.swiper-button-next]:duration-300 [&_.swiper-button-prev]:duration-300 [&_.swiper-button-next]:right-2 [&_.swiper-button-prev]:left-2"
		  >
						{classes.map((danceClass) => (
							<SwiperSlide key={danceClass.id}>
								<div className="card hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 relative h-[750px] sm:h-[650px]">
									<div className="absolute top-0 left-0 w-full overflow-hidden h-[240px]">
<Image
  src={danceClass.image}
  alt={danceClass.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
  style={{ objectFit: 'cover' }}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  priority={danceClass.id <= 3} // Prioriteetti ensimmäisille kolmelle
  loading={danceClass.id <= 3 ? 'eager' : 'lazy'}
/>
										<div className="absolute inset-0 bg-gradient-to-t from-neutral-inverse/40 via-neutral-inverse/20 to-transparent" />
										<div className="absolute bottom-4 left-4">
											<h3 className="heading_h4 text_white drop-shadow-lg">
												{danceClass.title}
											</h3>
										</div>
									</div>

									<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col top-[240px]">
										<p className="paragraph_default leading-relaxed mb-4 sm:mb-6 flex-1 text-sm sm:text-base">
											{danceClass.description}
										</p>

<Link
  href="#register"
  className="btn btn_primary_solid px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md hover:opacity-90 transition-opacity duration-200 text-center inline-block mt-auto"
>
  Ilmoittaudu
</Link>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

  {/* Poistettu modal kokonaan, koska Ilmoittaudu-nappi vie suoraan ilmoittautumissivulle */}
		</section>
	);
}