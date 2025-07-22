/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Log data for debugging (remove in production)
    console.log('Registration data received:', JSON.stringify(data, null, 2));
    
    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
      }
    });

    // Format dance classes safely
    const danceClassesText = data.danceClasses && Array.isArray(data.danceClasses) && data.danceClasses.length > 0 
      ? data.danceClasses.join(', ')
      : 'Ei valittuja tunteja';

    // Check if student is minor
    let age = 'Ei tiedossa';
    let isMinor = false;
    if (data.birthDate) {
      const birthDate = new Date(data.birthDate);
      age = new Date().getFullYear() - birthDate.getFullYear();
      isMinor = age < 18;
    }

    // Create email content
    const emailContent = `
UUSI ILMOITTAUTUMINEN - Nokian Tanssiasema

OPPILAAN TIEDOT:
================
Nimi: ${data.firstName || 'Ei annettu'} ${data.lastName || 'Ei annettu'}
Syntymäaika: ${data.birthDate || 'Ei annettu'} (ikä: ${age} vuotta)
Sähköposti: ${data.email || 'Ei annettu'}
Puhelinnumero: ${data.phone || 'Ei annettu'}

${isMinor && data.emergencyContact ? `
HUOLTAJAN TIEDOT:
================
Huoltaja: ${data.emergencyContact}
Huoltajan puhelin: ${data.emergencyPhone}
` : ''}

VALITUT TUNNIT:
==============
${danceClassesText}

${data.isNewStudent ? `
UUSI OPPILAS:
============
Kiinnostuksen kohteet: ${danceClassesText}
Aiempi kokemus: ${data.previousExperience || 'Ei annettu'}
${data.medicalConditions ? `Lisätietoja: ${data.medicalConditions}` : ''}
` : ''}

SUOSTUMUKSET:
============
Käyttöehdot hyväksytty: ${data.termsAccepted ? 'Kyllä' : 'Ei'}
Kuvauslupa: ${data.marketingConsent ? 'Kyllä' : 'Ei'}

Ilmoittautumisaika: ${new Date().toLocaleString('fi-FI')}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Nokian Tanssiasema" <info@nokiantanssiasema.fi>`,
      to: 'info@nokiantanssiasema.fi',
      subject: `Uusi ilmoittautuminen: ${data.firstName || 'Tuntematon'} ${data.lastName || 'Oppilas'}`,
      text: emailContent,
      replyTo: data.email || process.env.BREVO_SMTP_USER
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Ilmoittautuminen lähetetty onnistuneesti!' 
      })
    };

  } catch (error) {
    console.error('Registration submission error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Virhe ilmoittautumisen lähetyksessä',
        details: error.message 
      })
    };
  }
};