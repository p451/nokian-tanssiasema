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
    
    console.log('Contact data received:', JSON.stringify(data, null, 2));
    
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

    // Create email content
    const emailContent = `
UUSI YHTEYDENOTTO - Nokian Tanssiasema

LÄHETTÄJÄN TIEDOT:
=================
Nimi: ${data.name || 'Ei annettu'}
Sähköposti: ${data.email || 'Ei annettu'}
Aihe: ${data.subject || 'Ei aihetta'}

VIESTI:
=======
${data.message || 'Ei viestiä'}

Lähetetty: ${new Date().toLocaleString('fi-FI')}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Nokian Tanssiasema" <info@nokiantanssiasema.fi>`,
      to: 'info@nokiantanssiasema.fi',
      subject: `Yhteydenotto: ${data.subject || 'Ei aihetta'}`,
      text: emailContent,
      replyTo: data.email || process.env.BREVO_SMTP_USER
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Viesti lähetetty onnistuneesti!' 
      })
    };

  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Virhe viestin lähetyksessä',
        details: error.message 
      })
    };
  }
};