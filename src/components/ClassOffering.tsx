'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const classes = [
	{
		id: 1,
		title: 'Lastentanssi',
		description:
			'Lastentanssissa lapset pääsevät tutustumaan tanssin maailmaan hauskojen ja monipuolisten harjoitusten avulla. Tunneilla kehitetään kehonhallintaa, rytmitajua ja luovuutta, sekä opitaan toimimaan sekä yksilönä että osana ryhmää. Baletin perusteisiin tutustutaan leikkien avulla. Tavoitteena on innostaa lapsia tanssin pariin ja antaa hyvät valmiudet jatko-opintoihin.',
		image: '/images/showtanssi.jpg',
		ageGroup: '3-5 vuotta',
		level: 'Aloittelijat',
		duration: '45 min',
	},
	{
		id: 2,
		title: 'Alkeisbaletti',
		description:
			'Alkeisbaletissa syvennetään lastentanssissa opittuja taitoja. Tunneilla lisätään baletin perustekniikan harjoituksia ja edetään luovista leikeistä tarkempiin tekniikoihin. Tanssillisuus, musikaalisuus sekä kehon voima ja ketteryys kehittyvät innostavissa harjoituksissa. Kurssin tavoitteena on valmistaa oppilaat hyvin baletin perusopintoihin.',
		image: '/images/showtanssi.jpg',
		ageGroup: '6-8 vuotta',
		level: 'Alkeet',
		duration: '60 min',
	},
	{
		id: 3,
		title: 'Klassinen baletti',
		description:
			'Klassisen baletin perusopinnot aloitetaan noin 8-vuotiaana ja niitä voi jatkaa aina aikuisikään saakka. Opetus etenee tavoitteellisesti ja tasolta toiselle nousua tukien. Tunti alkaa lihaksia lämmittävällä osiolla, jatkuu tangon ääressä tehtävillä baletin tekniikkaharjoitteilla ja etenee keskilattialle, jossa harjoitellaan mm. hyppyjä, piruetteja ja monipuolisia tanssisarjoja. Baletti tarjoaa iloa ja haastetta kaikenikäisille tanssin harrastajille.',
		image: '/images/showtanssi.jpg',
		ageGroup: '8+ vuotta',
		level: 'Kaikki tasot',
		duration: '75 min',
	},
	{
		id: 4,
		title: 'Jazz-tanssi',
		description:
			'Jazz-tanssi on energinen ja monipuolinen tanssilaji, joka sopii kaiken tasoisille tanssijoille. Tunneilla harjoitellaan jazz-tekniikkaa ja tehdään erilaisia koreografioita. Hypyt, jalanheitot, piruetit, kehon isolaatiot sekä rytmikäs liikekieli ovat lajin tunnusmerkkejä. Tunneilla tutustutaan sekä lyyrisiin että vauhdikkaisiin koreografioihin, showtanssin ja musikaalien hengessä.',
		image: '/images/showtanssi.jpg',
		ageGroup: '10+ vuotta',
		level: 'Kaikki tasot',
		duration: '60 min',
	},
	{
		id: 5,
		title: 'Nykytanssi',
		description:
			'Nykytanssin tunneilla painotetaan oman tanssillisen ilmaisun löytämistä improvisaation sekä vaihtelevien tanssisarjojen avulla. Release- ja lattiatekniikan kautta kehitetään sulavuutta ja ilmaisua. Tunneilla yhdistetään modernin tanssin tekniikoita ja vaikutteita muista tanssilajeista, mikä tekee tunneista monipuolisia ja innostavia.',
		image: '/images/showtanssi.jpg',
		ageGroup: '12+ vuotta',
		level: 'Kaikki tasot',
		duration: '75 min',
	},
	{
		id: 6,
		title: 'Breikki',
		description:
			'Breikki on vauhdikas ja akrobaattinen katutanssilaji, jossa opetellaan lattia- ja ylätason jalkatyöskentelyä, näyttäviä freezejä sekä akrobatiaa. Freestyle-osioissa tanssijat pääsevät kehittämään omaa persoonallista liikekieltään.',
		image: '/images/showtanssi.jpg',
		ageGroup: '8+ vuotta',
		level: 'Aloittelijat',
		duration: '60 min',
	},
	{
		id: 7,
		title: 'Street Dance',
		description:
			'Street dance -tunneilla tanssitaan katutansseille ominaisia, rytmikkäitä koreografioita ja harjoitellaan koordinaatiota sekä erilaisten liikelaatujen hallintaa. Tärkeänä osana on freestylen kautta oman tanssityylin löytäminen ja kehittäminen. Tunneilla korostuu tanssin ilo, energia ja groove!',
		image: '/images/showtanssi.jpg',
		ageGroup: '10+ vuotta',
		level: 'Kaikki tasot',
		duration: '60 min',
	},
	{
		id: 8,
		title: 'Commercial Dance',
		description:
			'Commercial dance yhdistää elementtejä jazzista, showsta ja katutanssista, inspiroituen tunnetuista musiikkivideoista ja musikaaleista. Tunneilla harjoitellaan ilmaisullisia ja tyylikkäitä koreografioita, joissa tanssijat pääsevät nauttimaan suosikkikappaleidensa tahdissa.',
		image: '/images/showtanssi.jpg',
		ageGroup: '13+ vuotta',
		level: 'Keskitaso+',
		duration: '75 min',
	},
	{
		id: 9,
		title: 'Dance Mix',
		description:
			'Dance mix -tunnit tarjoavat monipuolisen kattauksen eri tanssilajeja, kuten musikaalitanssia, contemporary jazzia ja street-tanssia. Tunti alkaa lämmittelyllä ja tekniikkaosiolla, jonka jälkeen keskitytään iloiseen ja energiseen koreografiaan.',
		image: '/images/showtanssi.jpg',
		ageGroup: '15+ vuotta',
		level: 'Kaikki tasot',
		duration: '90 min',
	},
	{
		id: 10,
		title: 'Lasten showtanssi',
		description:
			'Näillä tunneilla ilo, vauhti ja rytmi ovat pääosassa! Lapset harjoittelevat tanssitekniikan alkeita luovien ja hauskojen harjoitusten kautta sekä tutustuvat akrobatian alkeisiin. Tanssisarjat ovat mukaansatempaavia ja energisiä.',
		image: '/images/showtanssi.jpg',
		ageGroup: '5-6 vuotta',
		level: 'Aloittelijat',
		duration: '45 min',
	},
	{
		id: 11,
		title: 'Showtanssi',
		description:
			'Showtanssi yhdistää parhaita puolia jazz-tanssista, nykytanssista ja baletista. Tunneilla kehitetään tekniikkaa, ilmaisua sekä tanssillista energiaa monipuolisten tanssisarjojen avulla. Tunnelma tunneilla on aina innostava ja hyväntuulinen.',
		image: '/images/showtanssi.jpg',
		ageGroup: '8+ vuotta',
		level: 'Kaikki tasot',
		duration: '60 min',
	},
	{
		id: 12,
		title: 'Lyrical',
		description:
			'Lyrical-tanssi yhdistää kauniilla tavalla nykytanssin herkkyyden ja jazz-tanssin tekniikan. Tunneilla keskitytään erityisesti tanssikoreografiaan, jonka kautta tanssijat voivat kehittää tulkintaa ja ilmaisuvoimaansa. Sopii kaikille, jotka haluavat syventää tanssin elämyksellisyyttä.',
		image: '/images/showtanssi.jpg',
		ageGroup: '12+ vuotta',
		level: 'Keskitaso+',
		duration: '75 min',
	},
];

export default function ClassOffering() {
	const [selectedClass, setSelectedClass] = useState<typeof classes[0] | null>(
		null
	);

	return (
		<section
			id="lajiesittely"
			className="section_secondary py-20"
		>
			<div className="container mx-auto px-6 text-center">
				<div className="text-center mb-16">
					<h2 className="heading_h2 mb-6">Lajiesittely</h2>
					          <p className="paragraph_large">
						Tarjoamme monipuolisen valikoiman tanssitunteja kaikenikäisille.
						Jokaisella on mahdollisuus löytää oma tanssityylinsä ja kehittyä
						tanssin parissa inspiroivassa ympäristössä.
					</p>
				</div>

				<div className="relative">
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						navigation={true}
						pagination={{
							clickable: true,
							bulletClass: 'swiper-pagination-bullet opacity-60',
							bulletActiveClass:
								'swiper-pagination-bullet-active opacity-100',
						}}
						autoplay={{
							delay: 10000,
							disableOnInteraction: false,
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
											src="/images/show.jpg"
											alt={danceClass.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
											style={{ objectFit: 'cover' }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-neutral-inverse/40 via-neutral-inverse/20 to-transparent" />
										<div className="absolute bottom-4 left-4">
											<h3 className="heading_h4 text_white drop-shadow-lg">
												{danceClass.title}
											</h3>
										</div>
									</div>

									<div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col top-[240px]">
										<p className="paragraph_default leading-relaxed mb-6 flex-1">
											{danceClass.description}
										</p>

										<button
											onClick={() => setSelectedClass(danceClass)}
											className="btn btn_primary_solid btn_large w-full mt-auto"
										>
											Lue lisää
										</button>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			{selectedClass && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
					<div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
						<div className="relative h-80">
							<Image
								src="/images/show.jpg"
								alt={selectedClass.title}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
							<button
								onClick={() => setSelectedClass(null)}
								className="btn btn_light_solid absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-200 hover:scale-110"
							>
								×
							</button>
							<div className="absolute bottom-6 left-6">
								<h3 className="heading_h3 text_white drop-shadow-lg">
									{selectedClass.title}
								</h3>
							</div>
						</div>

						<div className="p-8">
							<p className="paragraph_large">
								{selectedClass.description}
							</p>

							<div className="flex gap-4">
								<button className="btn btn_primary_solid btn_large flex-1">
									Varaa kokeilutunti
								</button>
								<button className="btn btn_secondary_outlined btn_large flex-1">
									Kysy lisää
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}