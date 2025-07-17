'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from '../utils/formValidation';

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
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['danceClasses', 'level'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['emergencyContact', 'emergencyPhone'];
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
    // Here you would typically send the data to your backend
  };

  const danceClasses = [
    { value: 'ballet-children', label: 'Lasten Baletti (4-12v)', description: 'Klassista balettia lapsille', price: '80€/kk' },
    { value: 'ballet-teen', label: 'Nuorten Baletti (13-17v)', description: 'Teknistä balettia nuorille', price: '90€/kk' },
    { value: 'ballet-adult', label: 'Aikuisten Baletti', description: 'Baletti aikuisille kaikilla tasoilla', price: '95€/kk' },
    { value: 'street-children', label: 'Lasten Street Dance (8-12v)', description: 'Hip-hop ja street dance lapsille', price: '80€/kk' },
    { value: 'street-teen', label: 'Nuorten Street Dance (13-17v)', description: 'Energistä street dancea nuorille', price: '90€/kk' },
    { value: 'street-adult', label: 'Aikuisten Street Dance', description: 'Hip-hop ja urban styles aikuisille', price: '95€/kk' },
    { value: 'show-children', label: 'Lasten Show Dance (5-11v)', description: 'Näyttävää show dancea lapsille', price: '80€/kk' },
    { value: 'show-teen', label: 'Nuorten Show Dance (12-17v)', description: 'Musical ja show dance nuorille', price: '90€/kk' },
    { value: 'contemporary', label: 'Contemporary', description: 'Nykyaikaista ilmaisua kaikille', price: '95€/kk' },
    { value: 'jazz', label: 'Jazz Dance', description: 'Energistä jazz-tanssia', price: '90€/kk' }
  ];

  const levels = [
    { value: 'beginner', label: 'Aloittelija', description: 'Ei aiempaa kokemusta' },
    { value: 'intermediate', label: 'Keskitaso', description: '1-3 vuotta kokemusta' },
    { value: 'advanced', label: 'Edistynyt', description: '3+ vuotta kokemusta' }
  ];

  const availableDays = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
  const availableTimes = ['16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00'];

  if (isSubmitted) {
    return (
      <section id="register" className="py-20 bg-blush/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-playfair">
              Kiitos ilmoittautumisesta!
            </h2>
            <p className="text-charcoal/70 mb-6">
              Olemme vastaanottaneet ilmoittautumisesi. Otamme sinuun yhteyttä pian 
              sähköpostitse vahvistaaksemme paikkasi valitsemillasi tunneilla.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="bg-charcoal text-offWhite px-6 py-2 rounded-lg hover:bg-charcoal/90 transition-colors duration-200"
            >
              Ilmoittaudu uudelleen
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-blush/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
            Ilmoittautuminen
          </h2>
          <p className="text-xl text-charcoal/80">
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
                      ? 'bg-sage text-offWhite'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step < currentStep ? 'bg-sage' : 'bg-gray-200'
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
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Henkilötiedot
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Etunimi *
                    </label>
                    <input
                      {...register('firstName')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="Anna"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Sukunimi *
                    </label>
                    <input
                      {...register('lastName')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="Virtanen"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Sähköposti *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="anna.virtanen@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Puhelinnumero *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="050 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
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
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Valitse tunnit
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal mb-4">
                    Tanssilajit * (Voit valita useita)
                  </label>
                  <Controller
                    name="danceClasses"
                    control={control}
                    render={({ field }) => (
                      <div className="grid md:grid-cols-2 gap-4">
                        {danceClasses.map((danceClass) => (
                          <label
                            key={danceClass.value}
                            className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              field.value.includes(danceClass.value)
                                ? 'border-sage bg-sage/5'
                                : 'border-gray-200 hover:border-sage/50'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                checked={field.value.includes(danceClass.value)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, danceClass.value]);
                                  } else {
                                    field.onChange(field.value.filter((v: string) => v !== danceClass.value));
                                  }
                                }}
                                className="w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage"
                              />
                              <span className="ml-2 font-medium text-charcoal">{danceClass.label}</span>
                            </div>
                            <p className="text-sm text-charcoal/70 mb-1">{danceClass.description}</p>
                            <p className="text-sm font-medium text-sage">{danceClass.price}</p>
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
                  <label className="block text-sm font-medium text-charcoal mb-4">
                    Taitotaso *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {levels.map((level) => (
                      <label
                        key={level.value}
                        className="relative flex flex-col p-4 border-2 rounded-lg cursor-pointer hover:border-sage/50 transition-colors"
                      >
                        <input
                          {...register('level')}
                          type="radio"
                          value={level.value}
                          className="sr-only"
                        />
                        <span className="font-medium text-charcoal mb-1">{level.label}</span>
                        <span className="text-sm text-charcoal/70">{level.description}</span>
                      </label>
                    ))}
                  </div>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-2">{errors.level.message}</p>
                  )}
                </div>

                {watchedDanceClasses.length > 0 && (
                  <div className="mt-6 p-4 bg-sage/10 rounded-lg">
                    <h4 className="font-medium text-charcoal mb-2">Valitsemasi tunnit:</h4>
                    <ul className="list-disc list-inside text-sm text-charcoal/80">
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
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Lisätiedot ja yhteyshenkilö
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Aiempi tanssikokemus
                    </label>
                    <textarea
                      {...register('previousExperience')}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="Kerro aiemmasta tanssikokemuksestasi..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Terveydentila ja rajoitukset
                    </label>
                    <textarea
                      {...register('medicalConditions')}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      placeholder="Kerro mahdollisista terveydellisistä rajoituksista..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Yhteyshenkilö hätätilanteessa *
                      </label>
                      <input
                        {...register('emergencyContact')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                        placeholder="Matti Virtanen"
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Yhteyshenkilön puhelinnumero *
                      </label>
                      <input
                        {...register('emergencyPhone')}
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                        placeholder="050 987 6543"
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-4">
                      Aikatoiveet (valinnainen)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <span className="text-sm font-medium text-charcoal col-span-full">Päivät:</span>
                      {availableDays.map((day) => (
                        <Controller
                          key={day}
                          name="preferredDays"
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.value?.includes(day) || false}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...currentValue, day]);
                                  } else {
                                    field.onChange(currentValue.filter((v: string) => v !== day));
                                  }
                                }}
                                className="w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage"
                              />
                              <span className="text-sm text-charcoal">{day}</span>
                            </label>
                          )}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <span className="text-sm font-medium text-charcoal col-span-full">Ajat:</span>
                      {availableTimes.map((time) => (
                        <Controller
                          key={time}
                          name="preferredTimes"
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.value?.includes(time) || false}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...currentValue, time]);
                                  } else {
                                    field.onChange(currentValue.filter((v: string) => v !== time));
                                  }
                                }}
                                className="w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage"
                              />
                              <span className="text-sm text-charcoal">{time}</span>
                            </label>
                          )}
                        />
                      ))}
                    </div>
                  </div>
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
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Yhteenveto ja hyväksyntä
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-charcoal mb-4">Ilmoittautumisen yhteenveto:</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nimi:</strong> {watch('firstName')} {watch('lastName')}</p>
                      <p><strong>Sähköposti:</strong> {watch('email')}</p>
                      <p><strong>Puhelinnumero:</strong> {watch('phone')}</p>
                      <p><strong>Taitotaso:</strong> {levels.find(l => l.value === watch('level'))?.label}</p>
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
                            Hyväksyn <a href="#" className="text-sage underline">käyttöehdot</a> ja 
                            <a href="#" className="text-sage underline ml-1">tietosuojaselosteen</a> *
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
                            Haluan vastaanottaa sähköpostitse tietoa uusista tunneista ja tapahtumista
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
                className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Takaisin
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-sage text-offWhite rounded-lg hover:bg-sage/90 transition-colors duration-200"
                >
                  Seuraava
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-charcoal text-offWhite rounded-lg hover:bg-charcoal/90 transition-colors duration-200 font-semibold"
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