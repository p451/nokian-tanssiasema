'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from '../utils/formValidation';
import scheduleData from '../data/schedule.json';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previousExperienceError, setPreviousExperienceError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    watch
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      danceClasses: [],
      preferredDays: [],
      preferredTimes: [],
      termsAccepted: false,
      marketingConsent: false,
      previousExperience: ''
    }
  });

  const watchedDanceClasses = watch('danceClasses');
  const isNewStudent = watch('isNewStudent');
  const hasPreviousExperience = watch('previousExperience');

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'birthDate'];
    } else if (currentStep === 2) {
      if (isNewStudent) {
        // For new students, manually validate required fields
        const danceClasses = watch('danceClasses');
        const previousExperience = watch('previousExperience');
        
        if (!danceClasses || danceClasses.length === 0) {
          await trigger(['danceClasses']);
          return;
        }
        if (!previousExperience) {
          // Set error message instead of using alert
          setPreviousExperienceError('Valitse onko sinulla aiempaa tanssikokemusta');
          const radioElement = document.querySelector('input[name="previousExperience"]');
          if (radioElement) {
            radioElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (radioElement as HTMLElement).focus();
          }
          return;
        }
        
        // Clear any previous error
        setPreviousExperienceError('');
        
        // If validation passes, move to next step
        setCurrentStep(currentStep + 1);
        // Scrollaa lomakkeen ylälaitaan
        setTimeout(() => {
          const formElement = document.getElementById('register');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
        return;
      } else {
        fieldsToValidate = ['danceClasses'];
      }
    } else if (currentStep === 3) {
      // Check if guardian fields are needed and validate them manually
      const birthDate = watch('birthDate');
      const isMinor = birthDate ? (new Date().getFullYear() - new Date(birthDate).getFullYear()) < 18 : false;
      
      if (isMinor) {
        const emergencyContact = watch('emergencyContact');
        const emergencyPhone = watch('emergencyPhone');
        
        if (!emergencyContact || emergencyContact.length === 0) {
          // Manually trigger error for emergency contact
          await trigger(['emergencyContact']);
          return;
        }
        if (!emergencyPhone || emergencyPhone.length === 0) {
          // Manually trigger error for emergency phone
          await trigger(['emergencyPhone']);
          return;
        }
      }
      
      // If we get here, validation passed
      setCurrentStep(currentStep + 1);
      // Scrollaa lomakkeen ylälaitaan
      setTimeout(() => {
        const formElement = document.getElementById('register');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scrollaa lomakkeen ylälaitaan
      setTimeout(() => {
        const formElement = document.getElementById('register');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scrollaa lomakkeen ylälaitaan
      setTimeout(() => {
        const formElement = document.getElementById('register');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitError(''); // Clear any previous error
    try {
      const response = await fetch('/.netlify/functions/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registration submitted successfully:', result);
        setIsSubmitted(true);
        // Scroll to the success message
        setTimeout(() => {
          const successElement = document.getElementById('registration-success');
          if (successElement) {
            successElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 100);
      } else {
        console.error('Registration submission failed:', result);
        setSubmitError('Virhe ilmoittautumisen lähetyksessä. Yritä uudelleen.');
      }
    } catch (error) {
      console.error('Registration submission error:', error);
      setSubmitError('Virhe ilmoittautumisen lähetyksessä. Tarkista internet-yhteytesi ja yritä uudelleen.');
    }
  };

  const danceClasses = Object.entries(scheduleData).flatMap(([day, classes]) => 
    classes.map((classItem) => ({
      value: `${day.toLowerCase()}-${classItem.time}-${classItem.class.toLowerCase().replace(/\s+/g, '-')}`,
      label: `${classItem.class} (${day} ${classItem.time})`,
      description: `Opettaja: ${classItem.instructor} - ${classItem.sali}`,
      day: day,
      time: classItem.time,
      instructor: classItem.instructor,
      sali: classItem.sali
    }))
  );

  // Dance style options for new students
  const danceStyleOptions = [
    'Baletti',
    'Show',
    'Nykytanssi',
    'Commercial / Street',
    'Dancemix',
    'Heels',
    'Breikki',
    'Kärkitossut',
    'Lastentanssi',
    'Tanssimuskari'
  ];

  // Kesäleirit
  const summerCamps = [
    {
      id: 'nuorten-tanssileiri',
      name: 'NUORTEN TANSSILEIRI (13-16v)',
      dates: '1.6.-4.6.2026',
      time: 'klo 9.30-15.00',
      price: '200€',
      includes: 'sisältää lounaan'
    },
    {
      id: 'lasten-tanssileiri',
      name: 'LASTEN TANSSILEIRI (8-12v)',
      dates: '8.6.-10.6.2026',
      time: 'klo 10.00-14.30',
      price: '160€',
      includes: 'sisältää lounaan'
    }
  ];

  if (isSubmitted) {
    return (
      <section id="registration-success" className="py-20 bg-neutral-secondary/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="heading_h3 mb-4">
              Kiitos ilmoittautumisesta!
            </h2>
            <p className="paragraph_default text-charcoal/70 mb-6">
              Olemme vastaanottaneet ilmoittautumisesi. Otamme sinuun yhteyttä pian 
              sähköpostitse vahvistaaksemme paikkasi valitsemillasi tunneilla.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="btn btn_secondary_solid"
            >
              Ilmoittaudu uudelleen
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="section_accent_tertiary_fullwidth py-20">
      {/* Strukturoitu data ilmoittautumiselle */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "@id": "https://nokiantanssiasema.fi#register",
            "name": "Ilmoittautuminen",
            "description": "Ilmoittaudu tanssitunneille",
            "url": "https://nokiantanssiasema.fi#register"
          })
        }}
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading_h2 mb-6">
            Ilmoittautuminen
          </h2>
          <p className="paragraph_large text-center">
            Täytä lomake ja valitse haluamasi tunnit
          </p>
          
          {/* Kesäleiri ja muskari -ilmoittautuminen korostus */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-sage/15 border border-sage/30 rounded-xl">
              <p className="text-sage font-semibold text-center">
                🏕️ Ilmoittaudu kesäleireille alla olevalla lomakkeella! Valitse leiri vaiheessa 2.
              </p>
            </div>
            <div className="p-4 bg-pink-50 border border-pink-300 rounded-xl">
              <p className="text-pink-700 font-semibold text-center">
                🎵 Ilmoittaudu Tanssimuskariin alla olevalla lomakkeella! Valitse muskari vaiheessa 2 (Keskiviikko).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-shrink-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                    step <= currentStep
                      ? 'bg-accent-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-4 sm:w-8 h-0.5 ${
                      step < currentStep ? 'bg-accent-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="heading_h3 mb-6">
                  Henkilötiedot
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Oppilaan Etunimi *
                    </label>
                    <input
                      {...register('firstName')}
                      className="input-field"
                      placeholder="Etunimi"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Oppilaan Sukunimi *
                    </label>
                    <input
                      {...register('lastName')}
                      className="input-field"
                      placeholder="Sukunimi"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Sähköposti *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="sähköposti@esimerkki.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.email.message}</p>
                    )}
                    <p className="text-sm text-charcoal/60 mt-2 italic">
                      Huoltajan jos oppilas alaikäinen
                    </p>
                  </div>

                  <div>
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Puhelinnumero *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field"
                      placeholder="040 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Oppilaan syntymäaika *
                    </label>
                    <input
                      {...register('birthDate')}
                      type="date"
                      className="input-field"
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.birthDate.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Piilotettu toistaiseksi
                <div className="mt-4 sm:mt-6">
                  <label className="flex items-center space-x-3">
                    <input
                      {...register('isNewStudent')}
                      type="checkbox"
                      className="w-4 h-4 text-accent-primary bg-gray-100 border-gray-300 rounded focus:ring-accent-primary"
                    />
                    <span className="paragraph_small text-charcoal">
                      En ole koskaan osallistunut Nokian Tanssiaseman tunneille
                    </span>
                  </label>
                </div>
                */}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isNewStudent ? (
                  // New student flow
                  <>
                    <h3 className="heading_h3 mb-6">
                      Kiinnostuksen kohteet
                    </h3>
                    
                    <div className="mb-6 p-4 bg-accent-secondary/10 rounded-lg">
                      <p className="paragraph_default text-charcoal/80">
                        Ihana kuulla että haluat tulla meille tanssimaan! Kerro hieman lisää itsestäsi niin otamme sinuun yhteyttä jotta löydämme sinulle sopivat tunnit. Tämä ei vielä sido sinua mihinkään.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="paragraph_small font-medium text-charcoal mb-4 block">
                          Mistä tanssilajeista olet kiinnostunut? * (Voit valita useita)
                        </label>
                        <Controller
                          name="danceClasses"
                          control={control}
                          render={({ field }) => (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {danceStyleOptions.map((style) => (
                                <label
                                  key={style}
                                  className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                    field.value.includes(style)
                                      ? 'border-accent-primary bg-accent-primary/5'
                                      : 'border-gray-200 hover:border-accent-primary/50'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={field.value.includes(style)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        field.onChange([...field.value, style]);
                                      } else {
                                        field.onChange(field.value.filter((v: string) => v !== style));
                                      }
                                    }}
                                    className="w-4 h-4 text-accent-primary bg-gray-100 border-gray-300 rounded focus:ring-accent-primary"
                                  />
                                  <span className="ml-3 font-medium text-charcoal text-sm sm:text-base">
                                    {style}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        />
                        {errors.danceClasses && (
                          <p className="text-red-500 text-sm mt-2">{errors.danceClasses.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="paragraph_small font-medium text-charcoal mb-4 block">
                          Onko sinulla aiempaa tanssikokemusta? *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              {...register('previousExperience')}
                              type="radio"
                              value="Kyllä"
                              className="w-4 h-4 text-accent-primary bg-gray-100 border-gray-300 focus:ring-accent-primary"
                              onChange={() => setPreviousExperienceError('')}
                            />
                            <span className="ml-3 text-charcoal">Kyllä</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              {...register('previousExperience')}
                              type="radio"
                              value="Ei"
                              className="w-4 h-4 text-accent-primary bg-gray-100 border-gray-300 focus:ring-accent-primary"
                              onChange={() => setPreviousExperienceError('')}
                            />
                            <span className="ml-3 text-charcoal">Ei</span>
                          </label>
                        </div>
                        {previousExperienceError && (
                          <p className="text-red-500 text-sm mt-2">{previousExperienceError}</p>
                        )}
                      </div>

                      {hasPreviousExperience === 'Kyllä' && (
                        <div>
                          <label className="paragraph_small font-medium text-charcoal mb-2 block">
                            Kerro lyhyesti kuinka kauan ja mistä lajeista sinulla on kokemusta
                          </label>
                          <textarea
                            {...register('medicalConditions')}
                            className="input-field min-h-[100px]"
                            placeholder="Kerro tanssikokemuksestasi..."
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // Existing student flow
                  <>
                    <h3 className="heading_h3 mb-6">
                      Valitse tunnit
                    </h3>
                    
                    {/* Kesäleirit - ensimmäisenä */}
                    <div className="mb-6">
                      <label className="paragraph_small font-medium text-charcoal mb-4 block">
                        🏕️ Kesäleirit 2026
                      </label>
                      <Controller
                        name="danceClasses"
                        control={control}
                        render={({ field }) => (
                          <div className="border-2 border-accent_primary rounded-lg p-4 bg-accent_primary/5 mb-6">
                            <div className="grid grid-cols-1 gap-3">
                              {summerCamps.map((camp) => {
                                const campValue = `leiri-${camp.id}`;
                                return (
                                  <label
                                    key={camp.id}
                                    className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                      field.value.includes(campValue)
                                        ? 'border-accent-primary bg-accent-primary/10'
                                        : 'border-gray-200 bg-white hover:border-accent-primary/50'
                                    }`}
                                  >
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        checked={field.value.includes(campValue)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            field.onChange([...field.value, campValue]);
                                          } else {
                                            field.onChange(field.value.filter((v: string) => v !== campValue));
                                          }
                                        }}
                                        className="w-4 h-4 text-accent-primary bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-accent-primary"
                                      />
                                      <span className="ml-2 font-bold text-charcoal">
                                        {camp.name}
                                      </span>
                                    </div>
                                    <p className="paragraph_small text-charcoal/70">
                                      {camp.dates} | {camp.time} | {camp.price} ({camp.includes})
                                    </p>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="paragraph_small font-medium text-charcoal mb-4 block">
                        Tanssilajit * (Voit valita useita)
                      </label>
                      <Controller
                        name="danceClasses"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-6">
                            {Object.entries(scheduleData).map(([day, dayClasses]) => (
                              <div key={day} className={`border rounded-lg p-4 ${
                                day === 'SARKOLAN TANSSITUNNIT' 
                                  ? 'border-red-300 bg-red-50' 
                                  : 'border-gray-200'
                              }`}>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className={`heading_h5 ${
                                    day === 'SARKOLAN TANSSITUNNIT' 
                                      ? 'text-red-800' 
                                      : 'text-charcoal'
                                  }`}>
                                    {day}
                                  </h4>
                                  {day === 'SARKOLAN TANSSITUNNIT' && (
                                    <span className="px-2 py-1 rounded text-xs font-bold text-white bg-red-600">
                                      ERI SIJAINTI
                                    </span>
                                  )}
                                </div>
                                {day === 'SARKOLAN TANSSITUNNIT' && (
                                  <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded">
                                    <p className="text-xs text-red-700 font-medium">
                                      📍 Vahalanden kulttuuritalo, Sarkolantie 476, 37180 Sarkola
                                    </p>
                                  </div>
                                )}
                                <div className="grid grid-cols-1 gap-3">
                                  {dayClasses.map((classItem) => {
                                    const classValue = `${day.toLowerCase()}-${classItem.time}-${classItem.class.toLowerCase().replace(/\s+/g, '-')}`;
                                    const classLabel = day === 'SARKOLAN TANSSITUNNIT' 
                                      ? `${classItem.class} (${classItem.time})` 
                                      : `${classItem.class} (${classItem.time})`;
                                    const classDescription = day === 'SARKOLAN TANSSITUNNIT'
                                      ? `Opettaja: ${classItem.instructor} - Keskiviikkoisin 3.9.–12.12.25`
                                      : `Opettaja: ${classItem.instructor} - ${classItem.sali}`;
                                    
                                    // Tarkista onko muskari-tunti
                                    const isMuskari = classItem.class.toLowerCase().includes('tanssimuskari') || classItem.class.toLowerCase().includes('soivat askeleet');
                                    
                                    return (
                                      <label
                                        key={classValue}
                                        className={`relative flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                          field.value.includes(classValue)
                                            ? day === 'SARKOLAN TANSSITUNNIT'
                                              ? 'border-red-500 bg-red-100'
                                              : isMuskari
                                                ? 'border-pink-500 bg-pink-100'
                                                : 'border-accent-primary bg-accent-primary/5'
                                            : day === 'SARKOLAN TANSSITUNNIT'
                                              ? 'border-red-300 hover:border-red-400'
                                              : isMuskari
                                                ? 'border-pink-300 bg-pink-50 hover:border-pink-400'
                                                : 'border-gray-200 hover:border-accent-primary/50'
                                        }`}
                                      >
                                        {isMuskari && (
                                          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-xs font-bold text-white bg-pink-500">
                                            🎵 UUTTA
                                          </span>
                                        )}
                                        <div className="flex items-center mb-2">
                                          <input
                                            type="checkbox"
                                            checked={field.value.includes(classValue)}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                field.onChange([...field.value, classValue]);
                                              } else {
                                                field.onChange(field.value.filter((v: string) => v !== classValue));
                                              }
                                            }}
                                            className={`w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 ${
                                              day === 'SARKOLAN TANSSITUNNIT'
                                                ? 'text-red-600 focus:ring-red-500'
                                                : isMuskari
                                                  ? 'text-pink-600 focus:ring-pink-500'
                                                  : 'text-accent-primary focus:ring-accent-primary'
                                            }`}
                                          />
                                          <span className={`ml-2 font-medium text-sm ${
                                            day === 'SARKOLAN TANSSITUNNIT' ? 'text-red-800' : isMuskari ? 'text-pink-700' : 'text-charcoal'
                                          }`}>
                                            {isMuskari ? `🎵 ${classLabel}` : classLabel}
                                          </span>
                                        </div>
                                        <p className={`paragraph_small ${
                                          day === 'SARKOLAN TANSSITUNNIT' ? 'text-red-700' : isMuskari ? 'text-pink-600' : 'text-charcoal/70'
                                        }`}>
                                          {classDescription}
                                        </p>
                                        {isMuskari && (
                                          <p className="paragraph_small text-pink-700 font-medium mt-1">
                                            180€ (8 krt) | Keskiviikkoisin 4.3.–29.4.26 | Ilm. 20.2. mennessä
                                          </p>
                                        )}
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      {errors.danceClasses && (
                        <p className="text-red-500 text-sm mt-2">{errors.danceClasses.message}</p>
                      )}
                    </div>

                    {watchedDanceClasses.length > 0 && (
                      <div className="mt-6 p-4 bg-accent-secondary/10 rounded-lg">
                        <h4 className="heading_h6 text-charcoal mb-2">Valitsemasi tunnit:</h4>
                        <ul className="list-disc list-inside paragraph_small text-charcoal/80">
                          {watchedDanceClasses.map((classValue: string) => {
                            // Tarkista onko leiri
                            if (classValue.startsWith('leiri-')) {
                              const camp = summerCamps.find(c => `leiri-${c.id}` === classValue);
                              return camp ? <li key={classValue} className="text-accent-primary font-medium">🏕️ {camp.name} ({camp.dates})</li> : null;
                            }
                            // Tarkista onko muskari
                            const classInfo = danceClasses.find(c => c.value === classValue);
                            if (classInfo && classValue.includes('tanssimuskari')) {
                              return <li key={classValue} className="text-pink-600 font-medium">🎵 {classInfo.label}</li>;
                            }
                            return classInfo ? <li key={classValue}>{classInfo.label}</li> : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="heading_h3 mb-6">
                  Huoltajan tiedot
                </h3>
                
                <div className="space-y-6">
                  {(() => {
                    const birthDate = watch('birthDate');
                    const isMinor = birthDate ? (new Date().getFullYear() - new Date(birthDate).getFullYear()) < 18 : false;
                    
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`paragraph_small font-medium mb-2 block ${isMinor ? 'text-charcoal' : 'text-gray-400'}`}>
                            {isMinor ? 'Huoltaja *' : 'Huoltaja (Jos oppilas on alaikäinen)'}
                          </label>
                          <input
                            {...register('emergencyContact', {
                              required: isMinor ? 'Huoltajan nimi vaaditaan' : false
                            })}
                            className={`input-field ${!isMinor ? 'bg-gray-100 text-gray-400' : ''}`}
                            placeholder="Huoltajan nimi"
                            disabled={!isMinor}
                          />
                          {errors.emergencyContact && (
                            <p className="text-red-500 paragraph_small mt-1">{errors.emergencyContact.message}</p>
                          )}
                        </div>

                        <div>
                          <label className={`paragraph_small font-medium mb-2 block ${isMinor ? 'text-charcoal' : 'text-gray-400'}`}>
                            {isMinor ? 'Huoltajan Puhelinnumero *' : 'Huoltajan Puhelinnumero'}
                          </label>
                          <input
                            {...register('emergencyPhone', {
                              required: isMinor ? 'Huoltajan puhelinnumero vaaditaan' : false
                            })}
                            type="tel"
                            className={`input-field ${!isMinor ? 'bg-gray-100 text-gray-400' : ''}`}
                            placeholder="040 123 4567"
                            disabled={!isMinor}
                          />
                          {errors.emergencyPhone && (
                            <p className="text-red-500 paragraph_small mt-1">{errors.emergencyPhone.message}</p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="heading_h3 mb-6">
                  Yhteenveto ja hyväksyntä
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-charcoal mb-4">Ilmoittautumisen yhteenveto:</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Oppilaan nimi:</strong> {watch('firstName')} {watch('lastName')}</p>
                      <p><strong>Syntymäaika:</strong> {watch('birthDate')}</p>
                      <p><strong>Sähköposti (ensisijainen kommunikointi):</strong> {watch('email')}</p>
                      <p><strong>Puhelinnumero:</strong> {watch('phone')}</p>
                      {(() => {
                        const birthDate = watch('birthDate');
                        const isMinor = birthDate ? (new Date().getFullYear() - new Date(birthDate).getFullYear()) < 18 : false;
                        const emergencyContact = watch('emergencyContact');
                        const emergencyPhone = watch('emergencyPhone');
                        
                        if (isMinor && (emergencyContact || emergencyPhone)) {
                          return (
                            <>
                              <p><strong>Huoltaja:</strong> {emergencyContact}</p>
                              <p><strong>Huoltajan puhelinnumero:</strong> {emergencyPhone}</p>
                            </>
                          );
                        }
                        return null;
                      })()}
                      <div>
                        <strong>Valitut tunnit:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {watch('danceClasses')?.map((classValue: string) => {
                            // Tarkista onko leiri
                            if (classValue.startsWith('leiri-')) {
                              const camp = summerCamps.find(c => `leiri-${c.id}` === classValue);
                              return camp ? <li key={classValue}>{camp.name} ({camp.dates})</li> : null;
                            }
                            // Tarkista onko muskari
                            if (classValue.includes('tanssimuskari')) {
                              const classInfo = danceClasses.find(c => c.value === classValue);
                              return classInfo ? <li key={classValue} className="text-red-600 font-medium">🎵 {classInfo.label}</li> : null;
                            }
                            // Tavallinen tunti
                            const classInfo = danceClasses.find(c => c.value === classValue);
                            return classInfo ? <li key={classValue}>{classInfo.label}</li> : null;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Controller
                      name="termsAccepted"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage mt-1"
                          />
                          <span className="text-sm text-charcoal">
                            Hyväksyn <a href="/terms-of-use" target="_blank" className="text-sage underline">käyttöehdot</a> ja 
                            <a href="/privacy-policy" target="_blank" className="text-sage underline ml-1">tietosuojaselosteen</a> *
                          </span>
                        </label>
                      )}
                    />
                    {errors.termsAccepted && (
                      <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
                    )}

                    <Controller
                      name="marketingConsent"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={field.value || false}
                            onChange={field.onChange}
                            className="w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage mt-1"
                          />
                          <span className="text-sm text-charcoal">
                            Kyllä oppilaasta saa julkaista valokuvia Nokian Tanssiaseman sosiaalisessa mediassa
                          </span>
                        </label>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit error message */}
          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn_secondary_outlined order-2 sm:order-1"
              >
                Takaisin
              </button>
            )}
            
            <div className={`${currentStep === 1 ? 'w-full' : 'order-1 sm:order-2 sm:ml-auto'}`}>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn_accent_solid w-full sm:w-auto"
                >
                  Seuraava
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn_primary_solid w-full sm:w-auto"
                >
                  Lähetä ilmoittautuminen
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;