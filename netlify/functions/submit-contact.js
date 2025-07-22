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

    // Create email content
    const emailContent = `
UUSI YHTEYDENOTTO - Nokian Tanssiasema

LÄHETTÄJÄN TIEDOT:
=================
Nimi: ${data.name}
Sähköposti: ${data.email}
Aihe: ${data.subject}

VIESTI:
=======
${data.message}

Lähetetty: ${new Date().toLocaleString('fi-FI')}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Nokian Tanssiasema Nettisivu" <${process.env.BREVO_SMTP_USER}>`,
      to: 'info@nokiantanssiasema.fi',
      subject: `Yhteydenotto: ${data.subject}`,
      text: emailContent,
      replyTo: data.email
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Viesti lähetetty onnistuneesti!' 
      })
    };

  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Virhe viestin lähetyksessä',
        details: error.message 
      })
    };
  }
};