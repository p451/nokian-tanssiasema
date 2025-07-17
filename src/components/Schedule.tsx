'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import fiLocale from '@fullcalendar/core/locales/fi';
import scheduleData from '../data/schedule.json';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Maanantai');
  const [calendarView, setCalendarView] = useState('week');

  const weeklyClasses = scheduleData;

  const calendarEvents = Object.entries(weeklyClasses).flatMap(([day, classes]) => {
    const events: Array<{
      id: string;
      title: string;
      start: string;
      end: string;
      classNames: string[];
      extendedProps: {
        instructor: string;
        level: string;
        time: string;
        sali: string;
      };
    }> = [];
    
    // Luodaan tapahtumat elokuusta alkaen useammalle viikolle
    const startDate = new Date(2025, 7, 1); // Elokuu 2025 (kuukausi 0-indeksoitu)
    const endDate = new Date(2026, 5, 30); // Kesäkuu 2026
    
    // Käydään läpi viikot startDate:sta endDate:een
    for (let weekStart = new Date(startDate); weekStart <= endDate; weekStart.setDate(weekStart.getDate() + 7)) {
      // Etsitään viikon ensimmäinen maanantai
      const monday = new Date(weekStart);
      monday.setDate(monday.getDate() - monday.getDay() + 1);
      
      const dayOffset = getDayOffset(day);
      const eventDate = new Date(monday);
      eventDate.setDate(monday.getDate() + dayOffset);
      
      // Lisätään tunnit vain jos päivä on viikon sisällä
      if (eventDate >= startDate && eventDate <= endDate) {
        classes.forEach((classItem, index) => {
          const [startTime, endTime] = classItem.time.split('-');
          const startDateTime = new Date(eventDate);
          startDateTime.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
          const endDateTime = new Date(eventDate);
          endDateTime.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]));
          
          events.push({
            id: `${day}-${index}-${eventDate.getTime()}`,
            title: `${classItem.class} (${classItem.sali})`,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            classNames: classItem.sali === 'Sali 1' ? ['sali-1-event'] : ['sali-2-event'],
            extendedProps: {
              instructor: classItem.instructor,
              level: classItem.level,
              time: classItem.time,
              sali: classItem.sali
            }
          });
        });
      }
    }
    
    return events;
  });

  function getDayOffset(day: string): number {
    const days: { [key: string]: number } = {
      'Maanantai': 0,
      'Tiistai': 1, 
      'Keskiviikko': 2,
      'Torstai': 3,
      'Perjantai': 4,
      'Lauantai': 5
    };
    return days[day] || 0;
  }

  const days = Object.keys(weeklyClasses);

  return (
    <section id="schedule" className="py-20 bg-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
            Tuntien Aikataulu
          </h2>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
            Tutustu viikko-ohjelmaamme ja löydä sinulle sopivat tunnit
          </p>
        </motion.div>

        {/* Calendar View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-offWhite rounded-lg p-1 shadow-md">
            <button
              onClick={() => setCalendarView('week')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                calendarView === 'week' 
                  ? 'bg-sage text-offWhite' 
                  : 'text-charcoal hover:bg-sage/20'
              }`}
            >
              Viikkonäkymä
            </button>
            <button
              onClick={() => setCalendarView('list')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                calendarView === 'list' 
                  ? 'bg-sage text-offWhite' 
                  : 'text-charcoal hover:bg-sage/20'
              }`}
            >
              Listanäkymä
            </button>
          </div>
        </div>

        {calendarView === 'week' ? (
          // FullCalendar View
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-offWhite rounded-xl p-6 shadow-lg"
          >
            <style jsx>{`
              .sali-1-event {
                background-color: #6B5B47 !important;
                border-color: #4A3D2F !important;
                color: #FFFFFF !important;
              }
              .sali-2-event {
                background-color: #B8860B !important;
                border-color: #8B7355 !important;
                color: #FFFFFF !important;
              }
              .fc-event-title {
                color: #FFFFFF !important;
              }
              .fc-event-time {
                color: #FFFFFF !important;
              }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              buttonText={{
                today: 'Tänään',
                month: 'Kuukausi',
                week: 'Viikko',
                day: 'Päivä',
                list: 'Lista',
                prev: 'Edellinen',
                next: 'Seuraava'
              }}
              locale={fiLocale}
              dayHeaderFormat={{ weekday: 'long' }}
              events={calendarEvents}
              slotMinTime="10:00:00"
              slotMaxTime="21:00:00"
              height="600px"
              eventClick={(info) => {
                alert(`Tunti: ${info.event.title}\nOpettaja: ${info.event.extendedProps.instructor}\nTaso: ${info.event.extendedProps.level}\nSali: ${info.event.extendedProps.sali}`);
              }}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6],
                startTime: '10:00',
                endTime: '21:00',
              }}
              firstDay={1}
              weekends={true}
              allDaySlot={false}
              slotDuration="00:15:00"
              slotLabelInterval="01:00:00"
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }}
              eventDisplay="block"
              eventTextColor="#FFFFFF"
            />
          </motion.div>
        ) : (
          // List View
          <>
            {/* Day Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedDay === day
                      ? 'bg-sage text-offWhite shadow-lg transform scale-105'
                      : 'bg-offWhite text-charcoal hover:bg-sage/20 shadow-md'
                  }`}
                >
                  {day}
                </button>
              ))}
            </motion.div>

            {/* Classes for Selected Day */}
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 md:gap-6"
            >
              {weeklyClasses[selectedDay as keyof typeof weeklyClasses].map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-offWhite rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
                  style={{ 
                    borderLeftColor: classItem.sali === 'Sali 1' ? '#8B7355' : '#D4A574'
                  }}
                >
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-1">
                      <div className="text-2xl font-bold text-sage font-playfair">
                        {classItem.time}
                      </div>
                      <div className="text-sm text-charcoal/60 mt-1">
                        {classItem.sali}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold text-charcoal mb-1 font-playfair">
                        {classItem.class}
                      </h3>
                      <p className="text-charcoal/70">
                        Opettaja: <span className="font-medium">{classItem.instructor}</span>
                      </p>
                    </div>
                    <div className="md:col-span-1 flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        classItem.level === 'Aloittelijat' 
                          ? 'bg-blush/20 text-blush' 
                          : classItem.level === 'Keskitaso'
                          ? 'bg-sage/20 text-sage'
                          : classItem.level === 'Edistyneet'
                          ? 'bg-charcoal/20 text-charcoal'
                          : 'bg-offWhite border border-charcoal/20 text-charcoal'
                      }`}>
                        {classItem.level}
                      </span>
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
              ))}
            </motion.div>
          </>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-offWhite rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair text-center">
            Tärkeää tietoa tunneista
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-charcoal mb-2">📅 Aikataulut</h4>
              <p className="text-charcoal/80 text-sm">
                Aikataulut voivat muuttua loma-aikoina. Tarkista aina ajankohtaiset tiedot nettisivuiltamme.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-charcoal mb-2">👥 Ryhmäkoot</h4>
              <p className="text-charcoal/80 text-sm">
                Rajoitamme ryhmäkokoja laadun takaamiseksi. Ilmoittaudu ajoissa!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-charcoal mb-2">💳 Hinnat</h4>
              <p className="text-charcoal/80 text-sm">
                Yksittäinen tunti 25€, kuukausikortit alkaen 80€. Tutustumistunti ilmainen!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-charcoal mb-2">👕 Vaatetus</h4>
              <p className="text-charcoal/80 text-sm">
                Mukavat liikuntavaatteet riittävät. Balettitossut ja tanssijalkineet myytävänä studiolta.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;