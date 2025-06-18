import nodemailer from 'nodemailer';

export async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Log email configuration (without sensitive data)
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      // Password omitted for security
    }
  };
  console.log('SMTP Configuration:', smtpConfig);

  // Validate required environment variables
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'CONTACT_EMAIL'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"SecureShip Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `SecureShip Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}
