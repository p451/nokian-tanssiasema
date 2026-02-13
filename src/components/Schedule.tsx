'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import scheduleData from '../data/schedule.json';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Maanantai');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'week'

  const weeklyClasses = scheduleData;

  const days = Object.keys(weeklyClasses);

  return (
    <section id="schedule" className="section_primary_default" style={{ scrollMarginTop: '110px' }}>
      {/* Strukturoitu data aikataululle */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "@id": "https://nokiantanssiasema.fi#schedule",
            "name": "Aikataulu",
            "description": "Katso tanssituntien aikataulu",
            "url": "https://nokiantanssiasema.fi#schedule"
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
          <h2 className="heading_h2 mb-6">
            Tuntien Aikataulu
          </h2>
          <p className="paragraph_large">
            Tutustu viikko-ohjelmaamme ja löydä sinulle sopivat tunnit
          </p>
        </motion.div>

        {/* View Mode Toggle + Ajankohtaista */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('week')}
            className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
              viewMode === 'week' 
                ? 'btn_accent_solid' 
                : 'btn_ghost'
            }`}
          >
            Viikkonäkymä
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`btn text-sm sm:text-base py-2 sm:py-3 px-4 ${
              viewMode === 'list' 
                ? 'btn_accent_solid' 
                : 'btn_ghost'
            }`}
          >
            Listanäkymä
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

      {/* Week View */}
      {viewMode === 'week' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map((day) => (
              <div
                key={day}
                className="bg-neutral-primary rounded-xl p-6 shadow-lg"
              >
                <div className="text-center mb-6">
                  <h3 className="heading_h5 text_white mb-2 bg-sage/10 py-2 px-4 rounded-lg">
                    {day.toUpperCase()}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {weeklyClasses[day as keyof typeof weeklyClasses].map((classItem, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border-l-4 shadow-sm hover:shadow-md transition-shadow"
                      style={{ 
                        borderLeftColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-bold text-charcoal">
                          {classItem.time}
                        </div>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ 
                            backgroundColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                          }}
                        >
                          {classItem.sali}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-charcoal mb-1">
                        {classItem.class}
                      </h4>
                      
                      <p className="text-xs text-charcoal/70">
                        {classItem.instructor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Day Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8"
          >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`btn text-xs sm:text-sm lg:text-base py-2 sm:py-3 px-2 sm:px-4 ${
                      selectedDay === day
                        ? 'btn_accent_solid shadow-lg transform scale-105'
                        : 'btn_secondary_outlined hover:bg-sage/20'
                    }`}
                  >
                    <span className="block sm:hidden lg:block">
                      {day}
                    </span>
                    <span className="hidden sm:block lg:hidden">
                      {day.substring(0, 2)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Classes for Selected Day */}
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 md:gap-6"
            >
              {/* Regular classes layout */}
              {weeklyClasses[selectedDay as keyof typeof weeklyClasses].map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="card transition-all duration-300 border-l-4"
                    style={{ 
                      borderLeftColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start sm:items-center">
                      <div className="sm:col-span-1">
                        <div className="heading_h5 text-sage">
                          {classItem.time}
                        </div>
                        <div className="paragraph_small text-charcoal/60 mt-1">
                          {classItem.sali}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <h3 className="heading_h5 text-charcoal mb-1">
                          {classItem.class}
                        </h3>
                        <p className="paragraph_default text-charcoal/70">
                          Opettaja: <span className="font-medium">{classItem.instructor}</span>
                        </p>
                      </div>
                      <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                        <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                          <span 
                            className="px-2 py-1 rounded-md text-xs font-medium text-white"
                            style={{ 
                              backgroundColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                            }}
                          >
                            {classItem.sali}
                          </span>
                          <a href="#register" className="btn btn_accent_solid btn_small">Ilmoittaudu</a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        )}
      {/* Ajankohtaista Section */}
      <section
        id="ajankohtaista"
        className="max-w-3xl mx-auto my-16 px-4 py-10 rounded-2xl shadow-lg bg-white border border-accent_primary"
        style={{ scrollMarginTop: '110px' }}
      >
        <h2 className="heading_h2 text-accent_primary mb-4 text-center">Ajankohtaista</h2>

        <div className="space-y-4">
          <div className="bg-accent_primary/10 border-l-4 border-accent_primary p-6 rounded">
            <div className="font-bold text-accent_primary mb-2">🏕️ Kesäleirien ilmoittautuminen nyt auki!</div>
            <div className="space-y-4 text-charcoal/80 text-sm mb-3">
              <div className="bg-white/50 rounded-lg p-3">
                <div className="font-semibold text-charcoal mb-1">NUORTEN TANSSILEIRI (13-16v)</div>
                <p><span className="font-medium">Ajankohta:</span> 1.6.–4.6.2026</p>
                <p><span className="font-medium">Kellonaika:</span> klo 9.30–15.00</p>
                <p><span className="font-medium">Hinta:</span> 200€ (sisältää lounaan)</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <div className="font-semibold text-charcoal mb-1">LASTEN TANSSILEIRI (8-12v)</div>
                <p><span className="font-medium">Ajankohta:</span> 8.6.–10.6.2026</p>
                <p><span className="font-medium">Kellonaika:</span> klo 10.00–14.30</p>
                <p><span className="font-medium">Hinta:</span> 160€ (sisältää lounaan)</p>
              </div>
            </div>
            <a href="#register" className="text-accent_primary underline hover:text-accent_primary/80">Ilmoittaudu kesäleireille →</a>
          </div>

          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded">
            <div className="font-bold text-pink-600 mb-2">🎵 Ilmoittautuminen muskariin nyt auki!</div>
            <div className="font-semibold text-charcoal mb-3">Tanssimuskari Soivat askeleet – yhteistyössä Nokian Tanssiaseman ja Musiikkikoulu Josetten kanssa</div>
            
            <p className="text-charcoal/80 text-sm mb-3 italic">
              Musisoinnin ja tanssin iloa äideille ja vauvoille! Tunnit koostuvat erilaisista tansseista, lauluista, loruista ja soittamisesta.
            </p>
            <p className="text-charcoal/80 text-sm mb-3 font-medium">
              Opettajina Josette Tuomisto ja Tiia-Maria Kivimäki
            </p>
            
            <div className="space-y-2 text-charcoal/80 text-sm mb-3">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-medium">Vauvat 3-7kk:</span>
                <span>klo 12.15-13.00</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-medium">Vauvat 8-12kk:</span>
                <span>klo 13.00-13.45</span>
              </div>
              <div className="mt-2 pt-2 border-t border-pink-300">
                <p><span className="font-medium">Aikataulu:</span> Keskiviikkoisin 4.3.–29.4.26 (Ryhmä ei kokoonnu 1.4.)</p>
                <p><span className="font-medium">Hinta:</span> 180€ (8 krt)</p>
                <p className="font-medium text-pink-600 mt-2">Ilmoittautuminen 20.2.26 mennessä!</p>
              </div>
            </div>
            
            <p className="text-charcoal/70 text-xs mb-3 bg-pink-100 p-2 rounded">
              👕 Pukeuduthan liikkumiseen sopiviin vaatteisiin ja varaat jalkaasi pitävät tossut!
            </p>
            
            <a href="#register" className="text-pink-600 underline hover:text-pink-500 font-medium">Ilmoittaudu muskariin →</a>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <div className="font-bold text-yellow-700 mb-2">❄️ Talviloma</div>
            <div className="font-semibold text-charcoal">23.2.-1.3.2026 – ei tunteja</div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
            <div className="font-bold text-amber-700 mb-2">🌸 Kevätnäytös</div>
            <div className="font-semibold text-charcoal">24.5.2026 Kerholassa</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Schedule;