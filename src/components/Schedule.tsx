'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import scheduleData from '../data/schedule.json';

type SummerClass = {
  day: string;
  date: string;
  time: string;
  class: string;
  instructor: string;
};

type AutumnClass = {
  time: string;
  class: string;
  instructor: string;
};

const Schedule = () => {
  const summerWeeks = Object.keys(scheduleData.summerClassesByWeek);
  const autumnDays = Object.keys(scheduleData.autumnClassesByDay);

  const [selectedCategory, setSelectedCategory] = useState<'summer' | 'autumn'>('summer');
  const [viewMode, setViewMode] = useState<'all' | 'single'>('single');
  const [selectedWeek, setSelectedWeek] = useState(summerWeeks[0] ?? '');
  const [selectedDay, setSelectedDay] = useState(autumnDays[0] ?? '');

  const summerClassesByWeek = scheduleData.summerClassesByWeek;
  const autumnClassesByDay = scheduleData.autumnClassesByDay;

  return (
    <section id="schedule" className="section_primary_default" style={{ scrollMarginTop: '110px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPageElement',
            '@id': 'https://nokiantanssiasema.fi#schedule',
            name: 'Aikataulu',
            description: 'Katso tanssituntien aikataulu',
            url: 'https://nokiantanssiasema.fi#schedule'
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading_h2 mb-6">Tuntitarjonta</h2>
          <p className="paragraph_large">
            Valitse kesän tai syksyn tuntitarjonta omasta napista ja selaa aikatauluja.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('summer');
                setViewMode('single');
              }}
              className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
                selectedCategory === 'summer' ? 'btn_accent_solid' : 'btn_ghost'
              }`}
            >
              Kesätunnit
            </button>
            <button
              onClick={() => {
                setSelectedCategory('autumn');
                setViewMode('single');
              }}
              className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
                selectedCategory === 'autumn' ? 'btn_accent_solid' : 'btn_ghost'
              }`}
            >
              Syksyn tunnit
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setViewMode('all')}
              className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
                viewMode === 'all' ? 'btn_accent_solid' : 'btn_ghost'
              }`}
            >
              {selectedCategory === 'summer' ? 'Kaikki viikot' : 'Kaikki viikonpäivät'}
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
                viewMode === 'single' ? 'btn_accent_solid' : 'btn_ghost'
              }`}
            >
              {selectedCategory === 'summer' ? 'Yhden viikon näkymä' : 'Yhden päivän näkymä'}
            </button>
            <a
              href="#ajankohtaista"
              className="btn text-sm sm:text-base py-2 sm:py-3 px-4 btn_ghost"
              style={{ minWidth: '120px', textAlign: 'center' }}
            >
              Ajankohtaista
            </a>
          </div>
        </div>
      </div>

      {selectedCategory === 'summer' && viewMode === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summerWeeks.map((week) => (
              <div key={week} className="bg-neutral-primary rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="heading_h5 text_white mb-2 bg-sage/10 py-2 px-4 rounded-lg">{week.toUpperCase()}</h3>
                </div>

                <div className="space-y-3">
                  {(summerClassesByWeek[week as keyof typeof summerClassesByWeek] as SummerClass[]).map((classItem, index) => (
                    <div
                      key={`${classItem.day}-${classItem.date}-${classItem.time}-${classItem.class}-${index}`}
                      className="bg-white rounded-lg p-4 border-l-4 border-accent-primary shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-bold text-charcoal">
                          {classItem.day} {classItem.date}
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium text-white bg-accent-primary">{classItem.time}</span>
                      </div>

                      <h4 className="text-sm font-semibold text-charcoal mb-1">{classItem.class}</h4>

                      <p className="text-xs font-medium text-accent-primary mb-1">Klo {classItem.time}</p>

                      <p className="text-xs text-charcoal/70">Opettaja: {classItem.instructor}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedCategory === 'summer' && viewMode === 'single' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2">
              {summerWeeks.map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`btn text-xs sm:text-sm lg:text-base py-2 sm:py-3 px-2 sm:px-4 ${
                    selectedWeek === week ? 'btn_accent_solid shadow-lg transform scale-105' : 'btn_secondary_outlined hover:bg-sage/20'
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={selectedWeek}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 md:gap-6"
          >
            {(summerClassesByWeek[selectedWeek as keyof typeof summerClassesByWeek] as SummerClass[] | undefined)?.map((classItem, index) => (
              <motion.div
                key={`${classItem.day}-${classItem.date}-${classItem.time}-${classItem.class}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card transition-all duration-300 border-l-4 border-accent-primary"
              >
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start sm:items-center">
                  <div className="sm:col-span-1">
                    <div className="heading_h5 text-sage">{classItem.day}</div>
                    <div className="paragraph_small text-charcoal/60 mt-1">{classItem.date}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="heading_h5 text-charcoal mb-1">{classItem.class}</h3>
                    <p className="paragraph_small text-accent-primary font-medium mb-1">Klo {classItem.time}</p>
                    <p className="paragraph_default text-charcoal/70">
                      Opettaja: <span className="font-medium">{classItem.instructor}</span>
                    </p>
                  </div>
                  <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                    <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                      <span className="px-2 py-1 rounded-md text-xs font-medium text-white bg-accent-primary">{classItem.time}</span>
                      <a href="#register" className="btn btn_accent_solid btn_small">
                        Ilmoittaudu
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {selectedCategory === 'autumn' && viewMode === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="text-center mb-6">
            <p className="paragraph_large">{scheduleData.autumnSeasonLabel}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autumnDays.map((day) => (
              <div key={day} className="bg-neutral-primary rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="heading_h5 text_white mb-2 bg-sage/10 py-2 px-4 rounded-lg">{day.toUpperCase()}</h3>
                </div>

                <div className="space-y-3">
                  {(autumnClassesByDay[day as keyof typeof autumnClassesByDay] as AutumnClass[]).map((classItem, index) => (
                    <div
                      key={`${day}-${classItem.time}-${classItem.class}-${index}`}
                      className="bg-white rounded-lg p-4 border-l-4 border-accent-primary shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-bold text-charcoal">{day}</div>
                        <span className="px-2 py-1 rounded text-xs font-medium text-white bg-accent-primary">{classItem.time}</span>
                      </div>

                      <h4 className="text-sm font-semibold text-charcoal mb-1">{classItem.class}</h4>

                      <p className="text-xs font-medium text-accent-primary mb-1">Klo {classItem.time}</p>

                      <p className="text-xs text-charcoal/70">Opettaja: {classItem.instructor}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedCategory === 'autumn' && viewMode === 'single' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8"
          >
            <div className="text-center mb-6">
              <p className="paragraph_large">{scheduleData.autumnSeasonLabel}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2">
              {autumnDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`btn text-xs sm:text-sm lg:text-base py-2 sm:py-3 px-2 sm:px-4 ${
                    selectedDay === day ? 'btn_accent_solid shadow-lg transform scale-105' : 'btn_secondary_outlined hover:bg-sage/20'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 md:gap-6"
          >
            {(autumnClassesByDay[selectedDay as keyof typeof autumnClassesByDay] as AutumnClass[] | undefined)?.map((classItem, index) => (
              <motion.div
                key={`${selectedDay}-${classItem.time}-${classItem.class}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card transition-all duration-300 border-l-4 border-accent-primary"
              >
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start sm:items-center">
                  <div className="sm:col-span-1">
                    <div className="heading_h5 text-sage">{selectedDay}</div>
                    <div className="paragraph_small text-charcoal/60 mt-1">Lukujärjestys 2026-2027</div>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="heading_h5 text-charcoal mb-1">{classItem.class}</h3>
                    <p className="paragraph_small text-accent-primary font-medium mb-1">Klo {classItem.time}</p>
                    <p className="paragraph_default text-charcoal/70">
                      Opettaja: <span className="font-medium">{classItem.instructor}</span>
                    </p>
                  </div>
                  <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                    <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                      <span className="px-2 py-1 rounded-md text-xs font-medium text-white bg-accent-primary">{classItem.time}</span>
                      <a href="#register" className="btn btn_accent_solid btn_small">
                        Ilmoittaudu
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      )}

      <section
        id="ajankohtaista"
        className="max-w-3xl mx-auto my-16 px-4 py-10 rounded-2xl shadow-lg bg-white border border-accent_primary"
        style={{ scrollMarginTop: '110px' }}
      >
        <h2 className="heading_h2 text-accent_primary mb-4 text-center">Ajankohtaista</h2>

        <div className="space-y-4">
          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded">
            <div className="font-bold text-pink-600 mb-2">Kesäleirit 2026</div>
            <div className="space-y-4 text-charcoal/80 text-sm mb-3">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-semibold text-charcoal mb-1">LASTEN TANSSILEIRI (8-12v)</div>
                <p>
                  <span className="font-medium">Ajankohta:</span> 8.6.-10.6.2026
                </p>
                <p>
                  <span className="font-medium">Kellonaika:</span> klo 10.00-14.30
                </p>
                <p>
                  <span className="font-medium">Hinta:</span> 160€ (sisältää lounaan)
                </p>
              </div>
            </div>
            <a href="#register" className="text-pink-600 underline hover:text-pink-500 font-medium">
              Ilmoittaudu kesäleireille {'->'}
            </a>
          </div>

          <div className="bg-accent_primary/10 border-l-4 border-accent_primary p-6 rounded">
            <div className="font-bold text-accent_primary mb-2">Kesän tunnit nuorille ja aikuisille</div>
            <p className="text-charcoal/80 text-sm mb-3">Kesätunnit järjestetään viikoilla 23, 24, 25, 30 ja 31. Tuntien hinta on 13€/h.</p>
            <a href="#register" className="text-accent_primary underline hover:text-accent_primary/80">
              Ilmoittaudu kesätunneille {'->'}
            </a>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <div className="font-bold text-green-700 mb-2">Syksyn tunnit</div>
            <div className="font-semibold text-charcoal mb-2">Kausi alkaa 10.8.2026.</div>
            <p className="text-charcoal/80 text-sm mb-3">Ilmoittautuminen syksyn tunneille on auki.</p>
            <a href="#register" className="text-green-700 underline hover:text-green-600 font-medium">
              Ilmoittaudu syksyn tunneille {'->'}
            </a>
          </div>

          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded">
            <div className="font-bold text-pink-600 mb-2">Tanssimuskari</div>
            <div className="font-semibold text-charcoal mb-2">Tanssimuskari Soivat Askeleet</div>
            <p className="text-charcoal/80 text-sm mb-3">
              Yhteistyössä Nokian Tanssiaseman ja Musiikkikoulu Josette Tuomiston kanssa. Musisoinnin ja tanssin iloa äideille ja vauvoille! Tunneilla on tanssia, lauluja, loruja sekä soittoa. Opettajina Tiia-Maria (tanssi) ja Josette Tuomisto (säestys). Hinta 180€ (10 krt).
            </p>
            <a href="#contact" className="text-pink-600 underline hover:text-pink-500 font-medium">
              Ota yhteyttä {'->'}
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Schedule;