import { z } from 'zod';

export const registrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'Etunimi on pakollinen'),
  lastName: z.string().min(2, 'Sukunimi on pakollinen'),
  email: z.string().email('Virheellinen sähköpostiosoite'),
  phone: z.string().min(8, 'Puhelinnumero on pakollinen'),
  
  // Dance Class Selection - Multiple selections allowed
  danceClasses: z.array(z.string()).min(1, 'Valitse vähintään yksi tanssiluokka'),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Valitse taitotaso' })
  }),
  
  // Schedule preferences
  preferredDays: z.array(z.string()).optional(),
  preferredTimes: z.array(z.string()).optional(),
  
  // Additional Information
  previousExperience: z.string().optional(),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().min(2, 'Yhteyshenkilö on pakollinen'),
  emergencyPhone: z.string().min(8, 'Yhteyshenkilön puhelinnumero on pakollinen'),
  
  // Terms and Privacy
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Käyttöehdot täytyy hyväksyä'
  }),
  marketingConsent: z.boolean().optional()
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'Nimi on pakollinen'),
  email: z.string().email('Virheellinen sähköpostiosoite'),
  subject: z.string().min(5, 'Aihe on pakollinen'),
  message: z.string().min(10, 'Viesti on liian lyhyt')
});

export type ContactFormData = z.infer<typeof contactSchema>;