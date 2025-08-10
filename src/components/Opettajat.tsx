'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type Teacher = {
  name: string;
  specialties: string;
  image: string;
  bio: string;
};

const Opettajat = () => {
  const teachers: Teacher[] = [
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
      bio: `Karita valmistui vuonna 2015 Turun Taideakatemiasta (AMK) tanssinopettajaksi. Osan opinnoistaan hän suoritti vaihto-opiskelijana Ruotsin Dans- och Cirkushögskolanissa. Valmistumisen jälkeen hän vietti vuoden Härnösandissa, Ruotsissa, opettaen ja tanssien eri tanssilajeja. Vuosien varrella Karita on kartuttanut tanssikokemustaan monipuolisesti eri opettajien johdolla. Hän aloitti tanssin 3-vuotiaana baletilla. Nykyisin hänen päälajinsa on nykytanssi, mutta hänellä on myös pitkä tausta jazztanssissa sekä kokemusta muista lajeista. Karita on innostava ja kannustava opettaja, joka nauttii kaikenikäisten oppilaiden kanssa työskentelystä. Karitan tunneilla vallitsee avoin ja salliva ilmapiiri, jossa oppilaat voivat turvallisesti tutkia ja ilmaista omaa luovuuttaan. Opetuksessa hän korostaa sekä teknisten taitojen että luovien harjoitteiden tärkeyttä, tukien oppilaan kokonaisvaltaista kehittymistä tanssijana.









`
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
      bio: "Tiia-Maria Kivimäki on juuriltaan kaarinalainen tanssinopettaja, joka aloitti tanssin vuonna 2005. Hänellä on vuosien kokemus useista eri tanssilajeista, tanssikollektiivissa työskentelystä sekä kilpailutoiminnasta. Tanssinopettajaksi hän valmistui Oulun ammattikorkeakoulusta vuonna 2024, ja osan opinnoistaan hän suoritti New Yorkissa Peridance Centerillä. Tiia-Marialle omimpia lajeja ovat show- ja nykytanssi, mutta vuosien varrella osaamista on kertynyt myös baletista, akrobatiasta, commercialista sekä heelsistä. Vaihto-opintojen aikana hän pääsi laajentamaan tanssillista repertuaariaan tutustumalla muun muassa waackingiin ja jazz funk -tyyleihin. Opettajana Tiia-Maria on monipuolinen, tarkka ja positiivinen. Hän haluaa haastaa oppilaitaan sekä liikkeellisesti että musikaalisesti, ja hänen opetustyylinsä painottuu aksentoituun ja energiseen liikkeeseen. Tunneilla kehitetään tekniikkaa tanssin iloa unohtamatta, ja Tiia-Maria pyrkii aina luomaan turvallisen ja yhdenvertaisen ilmapiirin kaikille oppilailleen."
    },
    {
      name: "AARO JOKINEN",
      specialties: "Breakdance",
      image: "/images/aaro.jpg",
      bio: "Aaro on monipuolinen tanssija ja opettaja, jonka vahvuuksia ovat rauhallisuus, innostavuus ja yksilöllinen ote opetukseen. Hän aloitti tanssin kolmivuotiaana baletin parissa ja siirtyi myöhemmin katutanssin maailmaan, jossa erityisesti breakdance on muodostunut hänen suosikkilajikseen. Opettajana Aaro luo tunneilleen kannustavan ilmapiirin ja huomioi erilaiset oppijat, mahdollistaen jokaiselle omanlaisen kehityspolun tanssitaustasta riippumatta."
    },
    {
      name: "SIMO SALIM",
      specialties: "Hip Hop",
      image: "/images/simon.jpg",
      bio: "Simo on kansainvälinen hip hop -tanssija ja opettaja, joka yhdistää energisyyden ja rauhallisen läsnäolon. Hän opettaa eri tasoisia tanssijoita useissa maissa intohimolla ja sydämellä. Tanssiuransa Salim aloitti vuonna 2007. Hänen repertuaariinsa kuuluvat krump, hip hop, house, locking ja popping. Hän on syventynyt tyylien juuriin ja kehitykseen Marokossa ja kansainvälisesti – mm. Martiniquella, Tšekissä, Turkissa, Alankomaissa ja Suomessa. Hänen sulava ja rytminen liikekielensä pohjautuu vahvaan tekniikkaan ja kehonhallintaan. Salim on edustanut Marokkoa kolmesti ja saavuttanut kaksi MM-pronssia. Opettajana hän on tarkka, innostava ja lämmin. Hän tukee jokaisen oppimista yksilöllisesti ja jakaa tanssin kulttuurista taustaa osana opetustaan."
    }
  ];

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

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
          <h2 className="heading_h2 mb-6">Opettajat</h2>
          <p className="paragraph_large text_charcoal/70">Tutustu kokeneisiin ja sydämellisiin opettajiimme</p>
        </motion.div>

        {/* Teachers Grid: all teachers shown as image + name only, click to open modal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 cursor-pointer group"
              onClick={() => setSelectedTeacher(teacher)}
            >
              <div className="w-full max-w-xs h-[320px] relative overflow-hidden rounded-2xl bg-neutral-secondary/20 shadow-lg">
                {teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-secondary/20 rounded-2xl flex items-center justify-center">
                    <span className="text_charcoal/50">Kuva tulossa</span>
                  </div>
                )}
              </div>
              <h3 className="heading_h5 text-center mt-2 group-hover:text-accent_primary transition-colors duration-200">{teacher.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Modal for teacher bio */}
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSelectedTeacher(null)}>
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative overflow-y-auto max-h-[90vh] sm:max-h-[80vh] sm:p-8"
              style={{
                boxSizing: 'border-box',
                maxWidth: '95vw',
                margin: '16px',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="fixed sm:absolute top-4 right-4 text-xl text-gray-500 hover:text-accent_primary bg-white/80 rounded-full p-2 z-10 border border-gray-200"
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 10,
                }}
                onClick={() => setSelectedTeacher(null)}
                aria-label="Sulje"
              >
                &times;
              </button>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative overflow-hidden rounded-full bg-neutral-secondary/20 mb-2">
                  {selectedTeacher.image ? (
                    <Image
                      src={selectedTeacher.image}
                      alt={selectedTeacher.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text_charcoal/50">Kuva tulossa</span>
                  )}
                </div>
                <h3 className="heading_h4 text-center">{selectedTeacher.name}</h3>
                {selectedTeacher.specialties && (
                  <p className="paragraph_default text_accent_primary font-medium text-center mb-2">
                    {selectedTeacher.specialties}
                  </p>
                )}
                <div className="space-y-4 mt-2">
                  {selectedTeacher.bio
                    ? selectedTeacher.bio.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="paragraph_default text_charcoal leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    : <p className="paragraph_default text_charcoal/60 italic">Esittely tulossa.</p>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Opettajat;