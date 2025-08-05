'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import scheduleData from '../data/schedule.json';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Maanantai');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'week'

  const weeklyClasses = scheduleData;

  // Type for class items that might have additional Sarkola properties
  type ClassItem = {
    class: string;
    time: string;
    instructor: string;
    sali: string;
    period?: string;
    duration?: string;
  };

  const days = Object.keys(weeklyClasses);

  return (
    <section id="schedule" className="section_primary_default" style={{ scrollMarginTop: '110px' }}>
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
            {days.filter(day => day !== 'SARKOLAN TANSSITUNNIT').map((day) => (
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
                        {classItem.instructor === 'S.S' ? 'Simo' : classItem.instructor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Sarkola Classes - Special Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="heading_h5 text-orange-800 mb-2 bg-orange-200 py-2 px-4 rounded-lg">
                  SARKOLAN TANSSITUNNIT
                </h3>
                <p className="text-xs text-orange-600 font-medium">Keskiviikkoisin • Vahalanden kulttuuritalo</p>
              </div>
              
              <div className="space-y-3">
                {weeklyClasses['SARKOLAN TANSSITUNNIT'].map((classItem, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border-l-4 border-orange-400 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-bold text-orange-700">
                        {classItem.time}
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-bold text-white bg-orange-600">
                        KURSSI
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-orange-800 mb-1">
                      {classItem.class}
                    </h4>
                    
                    <p className="text-xs text-orange-600">
                      {classItem.instructor}
                    </p>
                    
                    {(classItem as ClassItem).period && (
                      <p className="text-xs text-orange-500 mt-1">
                        {(classItem as ClassItem).period}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                      {day === 'SARKOLAN TANSSITUNNIT' ? 'Sarkola' : day}
                    </span>
                    <span className="hidden sm:block lg:hidden">
                      {day === 'SARKOLAN TANSSITUNNIT' ? 'Sarkola' : day.substring(0, 2)}
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
              {selectedDay === 'SARKOLAN TANSSITUNNIT' ? (
                // Special layout for Sarkola courses
                <>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <h3 className="heading_h3 text-orange-800 mb-2">🏛️ SARKOLAN TANSSITUNNIT</h3>
                      <p className="heading_h5 text-orange-700 mb-1">Vahalanden kulttuuritalo</p>
                      <p className="paragraph_default text-orange-600 mb-3">Sarkolantie 476, 37180 Sarkola</p>
                    </div>
                  </div>
                  
                  {weeklyClasses[selectedDay as keyof typeof weeklyClasses].map((classItem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="card transition-all duration-300 border-l-4 border-orange-400 bg-orange-50"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start sm:items-center">
                        <div className="sm:col-span-1">
                          <div className="heading_h5 text-orange-700">
                            {classItem.time}
                          </div>
                          <div className="paragraph_small text-orange-600 mt-1 font-medium">
                            Keskiviikkoisin
                          </div>
                          <div className="paragraph_small text-orange-500 mt-1">
                            {(classItem as ClassItem).period || ''}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <h3 className="heading_h5 text-orange-800 mb-1">
                            {classItem.class}
                          </h3>
                          <p className="paragraph_default text-orange-700 mb-1">
                            Opettaja: <span className="font-medium">{classItem.instructor}</span>
                          </p>
                          <p className="paragraph_small text-orange-600">
                            {(classItem as ClassItem).duration || ''}
                          </p>
                        </div>
                        <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                          <span className="px-3 py-1 rounded-md text-xs font-bold text-white bg-orange-600">
                            KURSSI
                          </span>
                          <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                            <span className="px-2 py-1 rounded-md text-xs font-medium text-orange-800 bg-orange-200">
                              Sarkola
                            </span>
                            <a href="#register" className="btn btn_accent_solid btn_small">Ilmoittaudu</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                // Regular classes layout
                weeklyClasses[selectedDay as keyof typeof weeklyClasses].map((classItem, index) => (
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
                          Opettaja: <span className="font-medium">{classItem.instructor === 'S.S' ? 'Simo' : classItem.instructor}</span>
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
                ))
              )}
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
        <div className="paragraph_large text-center text-charcoal mb-4">
          <span className="font-bold text-charcoal">Kausi alkaa, ilmoittaudu nyt!</span>
        </div>
        {/* Ajankohtaista tiedote */}
        <div className="bg-accent_primary/10 border-l-4 border-accent_primary p-4 rounded mb-2">
          <div className="font-bold text-accent_primary mb-3">Syyskausi 2025 alkaa 11.8.2025</div>
          <div className="font-semibold text-charcoal">Ilmoittautuminen on nyt auki!</div>
        </div>
        <div className="bg-accent_primary/10 border-l-4 border-accent_primary p-4 rounded mb-2">
          <div className="font-bold text-accent_primary mb-3">Uusi ilmoittautuminen!</div>
          <div className="font-semibold text-charcoal">Voit nyt ilmoittautua useammalle tunnille yhdellä ilmoittautumisella.</div>
        </div>
        {/* Lisää tiedotteita tähän */}
      </section>
    </section>
  );
};

export default Schedule;