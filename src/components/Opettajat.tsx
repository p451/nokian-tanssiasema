'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Opettajat = () => {
  const teachers = [
    {
      name: "KATJA SUOVA",
      specialties: "Baletti",
      image: "/images/katja.jpg",
      bio: `Katja aloitti tanssimisen 8-vuotiaana äitinsä Anneli Suovan balettikoulussa, jossa hän myös kouluttautui baletinopettajaksi. Katja on opettanut vuodesta 1987. Opettamisen ohella Katja työskenteli tanssijana Tampereen Työväen Teatterissa (1987-1989) mm. teoksissa Kalle Aaltosen morsian ja Tukkijoella. Anneli Suovan balettikoulu siirtyi Katjalle v.1991 josta lähtien hän on toiminut Nokian Tanssiaseman rehtorina.

Opettajana kehittyminen ja ammattitaidon ylläpito on Katjalle tärkeää, siksi hän kouluttautuu säännöllisesti käymällä tanssikursseilla ja tapahtumissa.

Tanssin oppiminen on pitkä ja kokonaisvaltainen prosessi, joten Katjalle on tärkeää kannustaa, tukea ja ohjata oppilaitaan heidän omien tavoitteidensa mukaan. Hän kannustaa oppilaitaan löytämään oman luovuutensa ja tanssillisuutensa.

Katjan vuosien pitkäjänteisen ja tavoitteellisen opetustyönsä ansiosta hänen oppilaitaan on päässyt ammatillisiin koulutuksiin sekä EK-ryhmiin.`
    },
    {
      name: "KARITA SUOVA",
      specialties: "Nykytanssi, Showtanssi, Baletti",
      image: "/images/karita.jpg",
      bio: `Karita on valmistunut tanssinopettajaksi Turun Taideakatemiasta (AMK) v.2015. Toisen opiskeluvuotensa kevätkauden hän oli vaihto-oppilaana Ruotsissa Dans- och Cirkushögskolanissa pääaineenaan jazz-tanssi.

Valmistumisen jälkeen matka jatkui Ruotsin Härnösandiin, jossa Karita opetti vuoden ajan lastentanssia, balettia ja nykytanssia. Omaa tanssitreeniä hän ylläpiti Norrdans-companyn aamutunneilla lukuisien eri opettajien johdolla.

Esiintymiskokemusta on kertynyt vuosien varrelta eri näytöksistä, kilpailuista, omista sooloprojekteista sekä ryhmäkoreografioista.

Karita käy edelleen treenaamassa eri opettajien tunneilla ja kokeilee uusia tanssilajeja, joista hän ammentaa inspiraatiota omaan työhönsä.

Opettajana Karita on kannustava ja energinen. Hän painottaa tunneillaan tanssitekniikan lisäksi omaa ilmaisua. Hän rohkaisee oppilaitaan löytämään oman luovuutensa kannustamalla heitä ennakkoluulottomaan ja uteliaaseen työskentelyyn. Avoin kommunikointi oppilaan ja opettajan välillä luo tunneille miellyttävän ilmapiirin.`
    },
    {
      name: "MILJA LEHTO",
      specialties: "Dance Mix, Commercial Dance",
      image: "/images/milja.jpg",
      bio: ""
    },  
    {
      name: "TIIA-MARIA KIVIMÄKI", 
      specialties: "Heels, Lastentanssi, Kisaryhmät",
      image: "/images/tiia.jpg",
      bio: ""
    },
    {
      name: "AARO JOKINEN",
      specialties: "Breakdance",
      image: "/images/aaro.jpg",
      bio: ""
    },
    {
      name: "SIMO SALIM",
      specialties: "Hip Hop",
      image: "/images/simon.jpg",
      bio: ""
    }
  ];

  return (
    <section id="teachers" className="section_primary_default_fullwidth py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading_h2 mb-6">
            Opettajat
          </h2>
          <p className="paragraph_large text_charcoal/70">
            Tutustu kokeneisiin ja sydämellisiin opettajiimme
          </p>
        </motion.div>

        {/* Teachers Grid */}
        {/* Katja and Karita: full-width single column, others: 2 by 2 grid */}
        <div className="space-y-16">
          {/* Katja and Karita */}
          {teachers.filter(t => t.name === 'KATJA SUOVA' || t.name === 'KARITA SUOVA').map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={'flex flex-col lg:flex-row gap-12 items-start'}
            >
              {/* Teacher Image */}
              <div className="relative w-full max-w-xl h-[400px]">
                {teacher.image ? (
                  <div className="relative overflow-hidden rounded-2xl bg-neutral-secondary/20 w-full h-full">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-neutral-secondary/20 rounded-2xl flex items-center justify-center">
                    <span className="text_charcoal/50">Kuva tulossa</span>
                  </div>
                )}
              </div>
              {/* Teacher Info */}
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="heading_h3 mb-2">
                    {teacher.name}
                  </h3>
                  {teacher.specialties && (
                    <p className="paragraph_default text_accent_primary font-medium">
                      {teacher.specialties}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  {teacher.bio.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="paragraph_default text_charcoal leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          {/* Others: 2 by 2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teachers.filter(t => t.name !== 'KATJA SUOVA' && t.name !== 'KARITA SUOVA').map((teacher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={'flex flex-col items-center gap-6'}
              >
                <h3 className="heading_h4">{teacher.name}</h3>
                {teacher.specialties && (
                  <p className="paragraph_default text_accent_primary font-medium mb-2 text-center">
                    {teacher.specialties}
                  </p>
                )}
                {teacher.image && (
                  <div className="w-full max-w-xl h-[400px] relative overflow-hidden rounded-2xl bg-neutral-secondary/20">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opettajat;