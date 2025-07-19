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
      marketingConsent: false
    }
  });

  const watchedDanceClasses = watch('danceClasses');

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'birthDate'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['danceClasses'];
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
      return;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Registration data:', data);
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
    // Here you would typically send the data to your backend
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
        </motion.div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? 'bg-accent-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step < currentStep ? 'bg-accent-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-lg">
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
                
                <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="paragraph_small font-medium text-charcoal mb-2 block">
                    Oppilaan Etunimi *
                  </label>
                  <input
                    {...register('firstName')}
                    className="input-field"
                    placeholder="Anna"
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
                    placeholder="Virtanen"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 paragraph_small mt-1">{errors.lastName.message}</p>
                  )}
                </div>                  <div>
                    <label className="paragraph_small font-medium text-charcoal mb-2 block">
                      Sähköposti *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="anna.virtanen@email.com"
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
                      placeholder="050 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 paragraph_small mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
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
                
                <div className="col-span-full">
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
                <h3 className="heading_h3 mb-6">
                  Valitse tunnit
                </h3>
                
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
                            <div className="grid md:grid-cols-2 gap-3">
                              {dayClasses.map((classItem) => {
                                const classValue = `${day.toLowerCase()}-${classItem.time}-${classItem.class.toLowerCase().replace(/\s+/g, '-')}`;
                                const classLabel = day === 'SARKOLAN TANSSITUNNIT' 
                                  ? `${classItem.class} (${classItem.time})` 
                                  : `${classItem.class} (${classItem.time})`;
                                const classDescription = day === 'SARKOLAN TANSSITUNNIT'
                                  ? `Opettaja: ${classItem.instructor} - Keskiviikkoisin 3.9.–12.12.25`
                                  : `Opettaja: ${classItem.instructor} - ${classItem.sali}`;
                                
                                return (
                                  <label
                                    key={classValue}
                                    className={`relative flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                      field.value.includes(classValue)
                                        ? day === 'SARKOLAN TANSSITUNNIT'
                                          ? 'border-red-500 bg-red-100'
                                          : 'border-accent-primary bg-accent-primary/5'
                                        : day === 'SARKOLAN TANSSITUNNIT'
                                          ? 'border-red-300 hover:border-red-400'
                                          : 'border-gray-200 hover:border-accent-primary/50'
                                    }`}
                                  >
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
                                            : 'text-accent-primary focus:ring-accent-primary'
                                        }`}
                                      />
                                      <span className={`ml-2 font-medium text-sm ${
                                        day === 'SARKOLAN TANSSITUNNIT' ? 'text-red-800' : 'text-charcoal'
                                      }`}>
                                        {classLabel}
                                      </span>
                                    </div>
                                    <p className={`paragraph_small ${
                                      day === 'SARKOLAN TANSSITUNNIT' ? 'text-red-700' : 'text-charcoal/70'
                                    }`}>
                                      {classDescription}
                                    </p>
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
                        const classInfo = danceClasses.find(c => c.value === classValue);
                        return classInfo ? <li key={classValue}>{classInfo.label}</li> : null;
                      })}
                    </ul>
                  </div>
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
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`paragraph_small font-medium mb-2 block ${isMinor ? 'text-charcoal' : 'text-gray-400'}`}>
                            {isMinor ? 'Huoltaja *' : 'Huoltaja (Jos oppilas on alaikäinen)'}
                          </label>
                          <input
                            {...register('emergencyContact', {
                              required: isMinor ? 'Huoltajan nimi vaaditaan' : false
                            })}
                            className={`input-field ${!isMinor ? 'bg-gray-100 text-gray-400' : ''}`}
                            placeholder="Matti Virtanen"
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
                            placeholder="050 987 6543"
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

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn_secondary_outlined"
              >
                Takaisin
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn_accent_solid"
                >
                  Seuraava
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn_primary_solid"
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