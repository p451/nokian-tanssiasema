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
    <section id="schedule" className="section_primary_default">
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

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-neutral-primary rounded-lg p-1 shadow-md">
            <div className="flex gap-0">
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
            </div>
          </div>
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
                  <h3 className="heading_h4 text_white mb-2 bg-sage/10 py-2 px-4 rounded-lg">
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
            
            {/* Sarkola Classes - Special Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="heading_h5 text-red-800 mb-2 bg-red-200 py-2 px-4 rounded-lg">
                  SARKOLAN TANSSITUNNIT
                </h3>
                <p className="text-xs text-red-600 font-medium">Keskiviikkoisin • Vahalanden kulttuuritalo</p>
              </div>
              
              <div className="space-y-3">
                {weeklyClasses['SARKOLAN TANSSITUNNIT'].map((classItem, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border-l-4 border-red-400 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-bold text-red-700">
                        {classItem.time}
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-bold text-white bg-red-600">
                        KURSSI
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-red-800 mb-1">
                      {classItem.class}
                    </h4>
                    
                    <p className="text-xs text-red-600">
                      {classItem.instructor}
                    </p>
                    
                    {(classItem as ClassItem).period && (
                      <p className="text-xs text-red-500 mt-1">
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
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <h3 className="heading_h3 text-red-800 mb-2">🏛️ SARKOLAN TANSSITUNNIT</h3>
                      <p className="heading_h5 text-red-700 mb-1">Vahalanden kulttuuritalo</p>
                      <p className="paragraph_default text-red-600 mb-3">Sarkolantie 476, 37180 Sarkola</p>
                      <div className="bg-red-200 rounded-lg p-3 inline-block">
                        <p className="paragraph_small font-bold text-red-800">
                          ⚠️ HUOM: Tämä on eri sijainti! Ilmoittautuminen erillään.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {weeklyClasses[selectedDay as keyof typeof weeklyClasses].map((classItem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="card transition-all duration-300 border-l-4 border-red-400 bg-red-50"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start sm:items-center">
                        <div className="sm:col-span-1">
                          <div className="heading_h5 text-red-700">
                            {classItem.time}
                          </div>
                          <div className="paragraph_small text-red-600 mt-1 font-medium">
                            Keskiviikkoisin
                          </div>
                          <div className="paragraph_small text-red-500 mt-1">
                            {(classItem as ClassItem).period || ''}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <h3 className="heading_h5 text-red-800 mb-1">
                            {classItem.class}
                          </h3>
                          <p className="paragraph_default text-red-700 mb-1">
                            Opettaja: <span className="font-medium">{classItem.instructor}</span>
                          </p>
                          <p className="paragraph_small text-red-600">
                            {(classItem as ClassItem).duration || ''}
                          </p>
                        </div>
                        <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                          <span className="px-3 py-1 rounded-md text-xs font-bold text-white bg-red-600">
                            KURSSI
                          </span>
                          <span className="px-2 py-1 rounded-md text-xs font-medium text-red-800 bg-red-200">
                            Sarkola
                          </span>
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
                          Opettaja: <span className="font-medium">{classItem.instructor}</span>
                        </p>
                      </div>
                      <div className="sm:col-span-1 flex flex-row sm:flex-col items-start sm:items-end gap-2">
                        <span 
                          className="px-2 py-1 rounded-md text-xs font-medium text-white"
                          style={{ 
                            backgroundColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                          }}
                        >
                          {classItem.sali}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        )}
    </section>
  );
};

export default Schedule;