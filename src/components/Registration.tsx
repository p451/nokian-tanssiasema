'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from '../utils/formValidation';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange'
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['danceClass', 'level'];
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
    { value: 'ballet', label: 'Baletti' },
    { value: 'street', label: 'Street Dance' },
    { value: 'show', label: 'Show Dance' }
  ];

  const levels = [
    { value: 'beginner', label: 'Aloittelija' },
    { value: 'intermediate', label: 'Jatkotaso' },
    { value: 'advanced', label: 'Edistynyt' }
  ];

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
              sähköpostitse vahvistaaksemme paikkasi tunnilla.
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
            Täytä lomake alle ja liity tanssijoidemme joukkoon!
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-charcoal text-offWhite'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-charcoal' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Henkilötiedot
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Etunimi *
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
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
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                      placeholder="+358 40 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Class Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Tanssiluokka
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Valitse tanssilaji *
                    </label>
                    <select
                      {...register('danceClass')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                    >
                      <option value="">Valitse tanssilaji...</option>
                      {danceClasses.map((danceClass) => (
                        <option key={danceClass.value} value={danceClass.value}>
                          {danceClass.label}
                        </option>
                      ))}
                    </select>
                    {errors.danceClass && (
                      <p className="text-red-500 text-sm mt-1">{errors.danceClass.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Taitotaso *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {levels.map((level) => (
                        <label key={level.value} className="flex items-center">
                          <input
                            {...register('level')}
                            type="radio"
                            value={level.value}
                            className="h-4 w-4 text-charcoal focus:ring-charcoal border-gray-300"
                          />
                          <span className="ml-2 text-charcoal">{level.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.level && (
                      <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Aiempi tanssikokemus
                    </label>
                    <textarea
                      {...register('previousExperience')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                      placeholder="Kerro lyhyesti aiemmasta tanssikokemuksestasi..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-playfair">
                  Lisätiedot
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Terveydentila / rajoitteet
                    </label>
                    <textarea
                      {...register('medicalConditions')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                      placeholder="Kerro mahdollisista terveydellisistä rajoitteista..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Yhteyshenkilö hätätapauksessa *
                      </label>
                      <input
                        {...register('emergencyContact')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                        placeholder="Nimi"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent"
                        placeholder="+358 40 123 4567"
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        {...register('acceptTerms')}
                        type="checkbox"
                        className="h-4 w-4 text-charcoal focus:ring-charcoal border-gray-300 rounded mt-1"
                      />
                      <span className="ml-2 text-sm text-charcoal">
                        Hyväksyn <a href="#" className="text-blush hover:underline">käyttöehdot</a> ja 
                        <a href="#" className="text-blush hover:underline ml-1">tietosuojaselosteen</a> *
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
                    )}

                    <label className="flex items-start">
                      <input
                        {...register('allowMarketing')}
                        type="checkbox"
                        className="h-4 w-4 text-charcoal focus:ring-charcoal border-gray-300 rounded mt-1"
                      />
                      <span className="ml-2 text-sm text-charcoal">
                        Haluan vastaanottaa uutiskirjeen ja markkinointiviestejä
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-charcoal hover:bg-gray-300'
              }`}
            >
              Takaisin
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-charcoal text-offWhite px-6 py-3 rounded-lg font-medium hover:bg-charcoal/90 transition-colors duration-200"
              >
                Seuraava
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blush text-charcoal px-6 py-3 rounded-lg font-medium hover:bg-blush/90 transition-colors duration-200"
              >
                Lähetä ilmoittautuminen
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;