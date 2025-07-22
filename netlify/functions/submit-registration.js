/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransporter({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
      }
    });

    // Format dance classes
    const danceClassesText = data.danceClasses && data.danceClasses.length > 0 
      ? data.danceClasses.join(', ')
      : 'Ei valittuja tunteja';

    // Check if student is minor
    const birthDate = new Date(data.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const isMinor = age < 18;

    // Create email content
    const emailContent = `
UUSI ILMOITTAUTUMINEN - Nokian Tanssiasema

OPPILAAN TIEDOT:
================
Nimi: ${data.firstName} ${data.lastName}
Syntymäaika: ${data.birthDate} (ikä: ${age} vuotta)
Sähköposti: ${data.email}
Puhelinnumero: ${data.phone}

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
Kiinnostuksen kohteet: ${data.danceClasses.join(', ')}
Aiempi kokemus: ${data.previousExperience}
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
      from: `"Nokian Tanssiasema Nettisivu" <${process.env.BREVO_SMTP_USER}>`,
      to: 'info@nokiantanssiasema.fi',
      subject: `Uusi ilmoittautuminen: ${data.firstName} ${data.lastName}`,
      text: emailContent,
      replyTo: data.email
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Ilmoittautuminen lähetetty onnistuneesti!' 
      })
    };

  } catch (error) {
    console.error('Registration submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Virhe ilmoittautumisen lähetyksessä',
        details: error.message 
      })
    };
  }
};