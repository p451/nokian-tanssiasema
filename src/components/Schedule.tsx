'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const schedule = {
    monday: [
      { time: '16:00-17:00', class: 'Baletti - Aloittelijat', instructor: 'Maria Virtanen', level: 'Aloittelijat' },
      { time: '17:30-18:30', class: 'Street Dance - Nuoret', instructor: 'Jukka Nieminen', level: 'Jatkotaso' },
      { time: '19:00-20:30', class: 'Show Dance - Aikuiset', instructor: 'Anna Korhonen', level: 'Edistyneet' }
    ],
    tuesday: [
      { time: '15:30-16:30', class: 'Baletti - Lapset', instructor: 'Maria Virtanen', level: 'Aloittelijat' },
      { time: '17:00-18:15', class: 'Street Dance - Aloittelijat', instructor: 'Jukka Nieminen', level: 'Aloittelijat' },
      { time: '18:30-20:00', class: 'Baletti - Edistyneet', instructor: 'Elena Saarinen', level: 'Edistyneet' }
    ],
    wednesday: [
      { time: '16:00-17:00', class: 'Show Dance - Nuoret', instructor: 'Anna Korhonen', level: 'Jatkotaso' },
      { time: '17:30-18:30', class: 'Baletti - Jatkotaso', instructor: 'Maria Virtanen', level: 'Jatkotaso' },
      { time: '19:00-20:15', class: 'Street Dance - Aikuiset', instructor: 'Jukka Nieminen', level: 'Jatkotaso' }
    ],
    thursday: [
      { time: '15:30-16:30', class: 'Baletti - Lapset', instructor: 'Elena Saarinen', level: 'Aloittelijat' },
      { time: '17:00-18:00', class: 'Street Dance - Lapset', instructor: 'Jukka Nieminen', level: 'Aloittelijat' },
      { time: '18:30-20:00', class: 'Show Dance - Aikuiset', instructor: 'Anna Korhonen', level: 'Edistyneet' }
    ],
    friday: [
      { time: '16:00-17:15', class: 'Baletti - Jatkotaso', instructor: 'Maria Virtanen', level: 'Jatkotaso' },
      { time: '17:30-19:00', class: 'Street Dance - Edistyneet', instructor: 'Jukka Nieminen', level: 'Edistyneet' },
      { time: '19:15-20:45', class: 'Show Dance - Open Class', instructor: 'Anna Korhonen', level: 'Kaikki tasot' }
    ],
    saturday: [
      { time: '10:00-11:00', class: 'Baletti - Perhetunti', instructor: 'Maria Virtanen', level: 'Kaikki tasot' },
      { time: '11:30-12:30', class: 'Street Dance - Workshop', instructor: 'Jukka Nieminen', level: 'Kaikki tasot' },
      { time: '13:00-14:30', class: 'Show Dance - Intensiivi', instructor: 'Anna Korhonen', level: 'Jatkotaso' }
    ]
  };

  const days = [
    { key: 'monday', label: 'Maanantai' },
    { key: 'tuesday', label: 'Tiistai' },
    { key: 'wednesday', label: 'Keskiviikko' },
    { key: 'thursday', label: 'Torstai' },
    { key: 'friday', label: 'Perjantai' },
    { key: 'saturday', label: 'Lauantai' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Aloittelijat':
        return 'bg-sage/20 text-sage';
      case 'Jatkotaso':
        return 'bg-blush/20 text-blush';
      case 'Edistyneet':
        return 'bg-charcoal/20 text-charcoal';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section id="schedule" className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-offWhite mb-6 font-playfair">
            Aikataulu
          </h2>
          <p className="text-xl text-offWhite/80 max-w-3xl mx-auto">
            Löydä sinulle sopiva aika viikko-ohjelmastamme. Kaikki tunnit pidetään 
            keskustassa sijaitsevassa studiossamme.
          </p>
        </motion.div>

        {/* Day Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDay === day.key
                  ? 'bg-blush text-charcoal'
                  : 'bg-offWhite/10 text-offWhite hover:bg-offWhite/20'
              }`}
            >
              {day.label}
            </button>
          ))}
        </motion.div>

        {/* Schedule Grid */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-4 md:gap-6"
        >
          {schedule[selectedDay as keyof typeof schedule].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-offWhite rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-charcoal font-mono">
                      {item.time}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                      {item.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-1 font-playfair">
                    {item.class}
                  </h3>
                  <p className="text-charcoal/70">
                    Opettaja: {item.instructor}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="bg-charcoal text-offWhite px-6 py-2 rounded-lg font-medium hover:bg-charcoal/90 transition-colors duration-200">
                    Varaa paikka
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-offWhite/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-offWhite mb-3 font-playfair">
              Tärkeää tietoa
            </h3>
            <ul className="text-offWhite/80 space-y-2 text-left">
              <li>• Saavu paikalle 10 minuuttia ennen tunnin alkua</li>
              <li>• Mukaan vesipullo ja pyyhe</li>
              <li>• Ensimmäinen tunti on maksuton</li>
              <li>• Peruutukset viimeistään 2 tuntia ennen tunnin alkua</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;