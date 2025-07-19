import { z } from 'zod';

export const registrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'Etunimi vaaditaan'),
  lastName: z.string().min(2, 'Sukunimi vaaditaan'),
  email: z.string().email('Virheellinen sähköpostiosoite'),
  phone: z.string().min(10, 'Virheellinen puhelinnumero'),
  birthDate: z.string().min(1, 'Syntymäaika vaaditaan'),
  isNewStudent: z.boolean().optional(),
  
  // Dance Class Selection - Multiple selections allowed
  danceClasses: z.array(z.string()).min(1, 'Valitse vähintään yksi tanssiluokka'),
  
  // Schedule preferences
  preferredDays: z.array(z.string()).optional(),
  preferredTimes: z.array(z.string()).optional(),
  
  // Additional Information
  previousExperience: z.string().optional(),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  
  // Terms and Privacy
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Käyttöehdot täytyy hyväksyä'
  }),
  marketingConsent: z.boolean().optional()
}).refine((data) => {
  // If student is under 18, emergency contact fields are required
  if (data.birthDate) {
    const birthYear = new Date(data.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const isMinor = (currentYear - birthYear) < 18;
    
    if (isMinor) {
      return data.emergencyContact && data.emergencyContact.length > 0 && 
             data.emergencyPhone && data.emergencyPhone.length > 0;
    }
  }
  return true;
}, {
  message: 'Huoltajan tiedot ovat pakollisia alaikäisille',
  path: ['emergencyContact']
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'Nimi on pakollinen'),
  email: z.string().email('Virheellinen sähköpostiosoite'),
  subject: z.string().min(5, 'Aihe on pakollinen'),
  message: z.string().min(10, 'Viesti on liian lyhyt')
});

export type ContactFormData = z.infer<typeof contactSchema>;