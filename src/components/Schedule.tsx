'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Maanantai');
  const [calendarView, setCalendarView] = useState('week');

  const weeklyClasses = {
    Maanantai: [
      { time: '17:00-18:00', class: 'Lasten Baletti (4-7v)', instructor: 'Anna Virtanen', level: 'Aloittelijat' },
      { time: '18:15-19:15', class: 'Nuorten Street Dance (8-12v)', instructor: 'Mikael Koskinen', level: 'Keskitaso' },
      { time: '19:30-20:30', class: 'Aikuisten Baletti', instructor: 'Anna Virtanen', level: 'Edistyneet' }
    ],
    Tiistai: [
      { time: '16:30-17:30', class: 'Lasten Show Dance (5-8v)', instructor: 'Laura Mäkinen', level: 'Aloittelijat' },
      { time: '18:00-19:00', class: 'Teini-ikäisten Baletti (13-17v)', instructor: 'Anna Virtanen', level: 'Keskitaso' },
      { time: '19:15-20:15', class: 'Aikuisten Contemporary', instructor: 'Sofia Lindberg', level: 'Kaikki tasot' }
    ],
    Keskiviikko: [
      { time: '17:00-18:00', class: 'Lasten Hip-Hop (6-10v)', instructor: 'Mikael Koskinen', level: 'Aloittelijat' },
      { time: '18:15-19:15', class: 'Nuorten Show Dance (11-15v)', instructor: 'Laura Mäkinen', level: 'Keskitaso' },
      { time: '19:30-20:30', class: 'Aikuisten Street Dance', instructor: 'Mikael Koskinen', level: 'Kaikki tasot' }
    ],
    Torstai: [
      { time: '16:45-17:45', class: 'Lasten Baletti (6-9v)', instructor: 'Anna Virtanen', level: 'Keskitaso' },
      { time: '18:00-19:00', class: 'Nuorten Contemporary (12-16v)', instructor: 'Sofia Lindberg', level: 'Edistyneet' },
      { time: '19:15-20:15', class: 'Aikuisten Jazz Dance', instructor: 'Laura Mäkinen', level: 'Kaikki tasot' }
    ],
    Perjantai: [
      { time: '17:00-18:00', class: 'Lasten Show Dance (7-11v)', instructor: 'Laura Mäkinen', level: 'Keskitaso' },
      { time: '18:15-19:15', class: 'Teini-ikäisten Hip-Hop (13-17v)', instructor: 'Mikael Koskinen', level: 'Edistyneet' },
      { time: '19:30-20:30', class: 'Aikuisten Baletti', instructor: 'Anna Virtanen', level: 'Kaikki tasot' }
    ],
    Lauantai: [
      { time: '10:00-11:00', class: 'Perheen Tanssitunti (3v+)', instructor: 'Laura Mäkinen', level: 'Kaikki tasot' },
      { time: '11:15-12:15', class: 'Aikuisten Open Class', instructor: 'Vaihtuvat opettajat', level: 'Kaikki tasot' },
      { time: '13:00-14:30', class: 'Kilparyhmän harjoitukset', instructor: 'Anna Virtanen', level: 'Edistyneet' }
    ]
  };

  const calendarEvents = Object.entries(weeklyClasses).flatMap(([day, classes]) => 
    classes.map((classItem, index) => ({
      id: `${day}-${index}`,
      title: classItem.class,
      start: `2024-01-${getDayNumber(day)}T${classItem.time.split('-')[0]}:00`,
      end: `2024-01-${getDayNumber(day)}T${classItem.time.split('-')[1]}:00`,
      extendedProps: {
        instructor: classItem.instructor,
        level: classItem.level,
        time: classItem.time
      }
    }))
  );

  function getDayNumber(day: string): string {
    const days: { [key: string]: string } = {
      'Maanantai': '08',
      'Tiistai': '09', 
      'Keskiviikko': '10',
      'Torstai': '11',
      'Perjantai': '12',
      'Lauantai': '13'
    };
    return days[day] || '08';
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
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              events={calendarEvents}
              slotMinTime="16:00:00"
              slotMaxTime="21:00:00"
              height="600px"
              eventClick={(info) => {
                alert(`Tunti: ${info.event.title}\nOpettaja: ${info.event.extendedProps.instructor}\nTaso: ${info.event.extendedProps.level}`);
              }}
              locale="fi"
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6],
                startTime: '16:00',
                endTime: '21:00',
              }}
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
                  className="bg-offWhite rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-sage"
                >
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-1">
                      <div className="text-2xl font-bold text-sage font-playfair">
                        {classItem.time}
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
                    <div className="md:col-span-1 flex justify-end">
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